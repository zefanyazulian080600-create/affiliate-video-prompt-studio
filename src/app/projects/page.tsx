'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FolderOpen,
  Search,
  Filter,
  Trash2,
  Copy,
  ExternalLink,
  Clock,
  Plus,
  Check,
} from 'lucide-react';
import { PromptProject } from '@/types';
import {
  listProjects,
  deleteProject,
  duplicateProject,
} from '@/lib/storage/project-store';
import { exportProjectToMarkdown } from '@/lib/prompt-engine/exporter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<PromptProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modelFilter, setModelFilter] = useState<string>('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadAll = async () => {
    try {
      setLoading(true);
      const list = await listProjects();
      setProjects(list);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteProject(id);
    setProjects(prev => prev.filter(p => p.id !== id));
    setDeleteConfirmId(null);
  };

  const handleDuplicate = async (id: string) => {
    const dup = await duplicateProject(id);
    if (dup) {
      setProjects(prev => [dup, ...prev]);
    }
  };

  const handleCopyMarkdown = (p: PromptProject) => {
    const text = exportProjectToMarkdown(p, 'copy-ready');
    navigator.clipboard.writeText(text);
    setCopiedId(p.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch =
      p.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.productProfile.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.productProfile.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesModel = modelFilter === 'all' || p.workflowModel === modelFilter;

    return matchesSearch && matchesModel;
  });

  return (
    <div className="space-y-6">
      {/* Header & New Project CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-studio-border">
        <div>
          <h1 className="text-2xl font-bold text-studio-text flex items-center gap-2">
            <FolderOpen className="w-6 h-6 text-violet-400" />
            Proyek Saya
          </h1>
          <p className="text-xs text-studio-muted mt-0.5">
            Kelola, duplikasi, ekspor, dan edit seluruh storyboard video affiliate yang telah dibuat.
          </p>
        </div>

        <Link href="/generator">
          <Button variant="primary" size="md" className="text-xs">
            <Plus className="w-4 h-4 mr-1.5" />
            Buat Proyek Baru
          </Button>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-studio-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Cari berdasarkan nama proyek, produk, atau kategori..."
            className="w-full bg-studio-surface border border-studio-border rounded-xl pl-10 pr-4 py-2 text-xs text-studio-text placeholder-studio-muted focus:outline-none focus:ring-1 focus:ring-violet-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-studio-muted hidden sm:block" />
          <select
            value={modelFilter}
            onChange={e => setModelFilter(e.target.value)}
            className="w-full sm:w-auto bg-studio-surface border border-studio-border rounded-xl px-3 py-2 text-xs text-studio-text focus:outline-none"
          >
            <option value="all">Semua Model AI</option>
            <option value="seedance-2.5">Seedance 2.5</option>
            <option value="omni-flash">Omni Flash</option>
          </select>
        </div>
      </div>

      {/* Projects List */}
      {loading ? (
        <div className="p-12 text-center text-xs text-studio-muted bg-studio-surface border border-studio-border rounded-2xl">
          Memuat proyek...
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="p-12 text-center bg-studio-surface border border-studio-border rounded-2xl space-y-3">
          <FolderOpen className="w-10 h-10 text-studio-muted mx-auto" />
          <h3 className="text-sm font-semibold text-studio-text">
            Tidak ada proyek yang sesuai
          </h3>
          <p className="text-xs text-studio-muted max-w-sm mx-auto">
            {searchQuery
              ? 'Coba gunakan kata kunci pencarian yang berbeda.'
              : 'Belum ada proyek yang tersimpan. Klik tombol di bawah untuk membuat video pertamamu.'}
          </p>
          <Link href="/generator">
            <Button variant="primary" size="sm" className="text-xs mt-2">
              <Plus className="w-3.5 h-3.5 mr-1" />
              Mulai Buat Video
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map(p => (
            <div
              key={p.id}
              className="bg-studio-surface border border-studio-border rounded-2xl p-5 hover:border-violet-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Badge variant="violet" size="sm">
                      {p.workflowModel.toUpperCase()}
                    </Badge>
                    <Badge variant="blue" size="sm">
                      {p.totalDuration}s ({p.scenes.length} Scene)
                    </Badge>
                    <span className="text-[11px] text-emerald-400 font-semibold">
                      Audit: {p.qualityReport.overallScore}/100
                    </span>
                  </div>

                  <span className="text-[11px] text-studio-muted flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(p.updatedAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </span>
                </div>

                <Link
                  href={`/generator?projectId=${p.id}`}
                  className="font-bold text-base text-studio-text hover:text-violet-300 transition-colors line-clamp-1 block"
                >
                  {p.projectName}
                </Link>

                <p className="text-xs text-studio-muted mt-1 line-clamp-2">
                  {p.productProfile.productName} —{' '}
                  <span className="text-slate-300">{p.creativeConcept.format}</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-studio-border flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopyMarkdown(p)}
                    className="p-2 rounded-xl bg-studio-card border border-studio-border text-studio-muted hover:text-studio-text hover:border-studio-borderHover text-xs transition-colors"
                    title="Salin seluruh prompt"
                  >
                    {copiedId === p.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    onClick={() => handleDuplicate(p.id)}
                    className="p-2 rounded-xl bg-studio-card border border-studio-border text-studio-muted hover:text-studio-text hover:border-studio-borderHover text-xs transition-colors"
                    title="Duplikasi proyek"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>

                  {deleteConfirmId === p.id ? (
                    <div className="flex items-center gap-1 bg-rose-950/60 border border-rose-500/50 rounded-xl px-2 py-1 text-[11px]">
                      <span className="text-rose-300">Hapus?</span>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="font-bold text-rose-400 hover:text-white ml-1"
                      >
                        Ya
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="text-studio-muted hover:text-white ml-1"
                      >
                        Batal
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirmId(p.id)}
                      className="p-2 rounded-xl bg-studio-card border border-studio-border text-studio-muted hover:text-rose-400 hover:border-rose-500/40 text-xs transition-colors"
                      title="Hapus proyek"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <Link href={`/generator?projectId=${p.id}`}>
                  <Button variant="secondary" size="sm" className="text-xs">
                    <ExternalLink className="w-3.5 h-3.5 mr-1" />
                    Buka Editor
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
