'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  FolderOpen,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Database,
  Cpu,
  Film,
  Zap,
  Camera,
} from 'lucide-react';
import { PromptProject } from '@/types';
import { listProjects } from '@/lib/storage/project-store';
import { isFirebaseConfigured } from '@/lib/firebase/client';
import { LIBRARY_TEMPLATES } from '@/lib/prompt-library-data';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function DashboardPage() {
  const [projects, setProjects] = useState<PromptProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const list = await listProjects();
        setProjects(list);
      } catch (e) {
        console.error('Error fetching projects', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const latestProject = projects.length > 0 ? projects[0] : null;

  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-950/60 via-studio-surface to-blue-950/40 border border-violet-500/30 p-6 md:p-10 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="violet" size="md">
              <Zap className="w-3.5 h-3.5 mr-1 text-violet-400" />
              Production Ready Studio
            </Badge>
            <Badge variant="blue" size="md">
              Workflow Seedance 2.5 & Omni Flash
            </Badge>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Ubah Produk Shopee Menjadi{' '}
            <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent">
              Video Iklan Berkonversi Tinggi
            </span>
          </h1>

          <p className="text-sm md:text-base text-studio-muted leading-relaxed">
            Hasilkan storyboard per scene dengan kontinuitas visual terkunci (*character, product, environment lock*). Siap disalin langsung ke tool video AI tanpa keahlian prompt engineering.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/photo">
              <Button variant="primary" size="lg" className="text-sm bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 font-bold shadow-lg shadow-violet-900/40">
                <Camera className="w-4 h-4 mr-2" />
                Buka Photo Studio (iPhone 13)
              </Button>
            </Link>

            <Link href="/generator">
              <Button variant="secondary" size="lg" className="text-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Buat Video Baru
              </Button>
            </Link>

            {latestProject && (
              <Link href={`/generator?projectId=${latestProject.id}`}>
                <Button variant="secondary" size="lg" className="text-sm">
                  <Film className="w-4 h-4 mr-2" />
                  Lanjutkan Proyek Terakhir ({latestProject.projectName.slice(0, 20)}...)
                </Button>
              </Link>
            )}

            <Link href="/library">
              <Button variant="ghost" size="lg" className="text-sm">
                <BookOpen className="w-4 h-4 mr-2" />
                Buka Prompt Library
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative Glow */}
        <div className="absolute right-0 top-0 -mt-16 -mr-16 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Real Statistics & System Health */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-studio-surface/80">
          <div className="flex items-center justify-between text-studio-muted mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Total Proyek Tersimpan
            </span>
            <FolderOpen className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-2xl font-bold text-studio-text">
            {loading ? '...' : projects.length}
          </div>
          <p className="text-[11px] text-studio-muted mt-1">
            Data tersimpan aman di database lokal / cloud
          </p>
        </Card>

        <Card className="bg-studio-surface/80">
          <div className="flex items-center justify-between text-studio-muted mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Preset Shopee Siap Pakai
            </span>
            <BookOpen className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-studio-text">
            {LIBRARY_TEMPLATES.length} Template
          </div>
          <p className="text-[11px] text-studio-muted mt-1">
            Fashion, Skincare, Gadget, Kuliner, Home
          </p>
        </Card>

        <Card className="bg-studio-surface/80">
          <div className="flex items-center justify-between text-studio-muted mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Status AI Provider
            </span>
            <Cpu className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-sm font-bold text-studio-text">Aktif (Dual-Engine)</span>
          </div>
          <p className="text-[11px] text-studio-muted mt-1">
            Gemini AI + Fallback Deterministik Mandiri
          </p>
        </Card>

        <Card className="bg-studio-surface/80">
          <div className="flex items-center justify-between text-studio-muted mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Status Penyimpanan
            </span>
            <Database className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
            <span className="text-sm font-bold text-studio-text">
              {isFirebaseConfigured ? 'Cloud Firestore' : 'LocalStorage Engine'}
            </span>
          </div>
          <p className="text-[11px] text-studio-muted mt-1">
            {isFirebaseConfigured
              ? 'Tersinkronisasi otomatis ke cloud'
              : 'Resilien offline tanpa konfigurasi'}
          </p>
        </Card>
      </div>

      {/* Two Column Section: Recent Projects & Quick Workflow Guides */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Projects (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-studio-text flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-violet-400" />
              Proyek Terbaru
            </h2>
            <Link
              href="/projects"
              className="text-xs text-violet-400 hover:text-violet-300 font-medium flex items-center gap-1"
            >
              Lihat Semua ({projects.length})
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="p-8 text-center text-xs text-studio-muted rounded-2xl bg-studio-surface border border-studio-border">
              Memuat daftar proyek...
            </div>
          ) : projects.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-studio-surface border border-studio-border space-y-3">
              <Film className="w-8 h-8 text-studio-muted mx-auto" />
              <p className="text-sm font-semibold text-studio-text">
                Belum ada proyek video yang dibuat
              </p>
              <p className="text-xs text-studio-muted max-w-sm mx-auto">
                Mulai buat prompt video pertamamu dengan memasukkan informasi produk di halaman generator.
              </p>
              <Link href="/generator">
                <Button variant="primary" size="sm" className="mt-2 text-xs">
                  <Sparkles className="w-3.5 h-3.5 mr-1" />
                  Mulai Buat Video Pertama
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {projects.slice(0, 4).map(p => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-studio-surface border border-studio-border hover:border-violet-500/40 transition-all group"
                >
                  <div className="min-w-0 pr-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="violet" size="sm">
                        {p.workflowModel.toUpperCase()}
                      </Badge>
                      <Badge variant="blue" size="sm">
                        {p.totalDuration}s ({p.scenes.length} Scene)
                      </Badge>
                      <span className="text-[11px] text-studio-muted">
                        Skor: {p.qualityReport.overallScore}/100
                      </span>
                    </div>
                    <Link
                      href={`/generator?projectId=${p.id}`}
                      className="text-sm font-semibold text-studio-text group-hover:text-violet-300 transition-colors truncate block"
                    >
                      {p.projectName}
                    </Link>
                    <p className="text-xs text-studio-muted truncate mt-0.5">
                      {p.productProfile.productName} — Format: {p.creativeConcept.format}
                    </p>
                  </div>

                  <Link href={`/generator?projectId=${p.id}`}>
                    <Button variant="secondary" size="sm" className="text-xs flex-shrink-0">
                      Buka
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Tutorial & Conversion Rules (1 Col) */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-studio-text flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Aturan Emas Affiliate Shopee
          </h2>

          <Card className="space-y-3.5 bg-studio-surface/90 text-xs text-studio-muted">
            <div className="flex items-start gap-2.5">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-violet-600/30 text-violet-300 font-bold flex-shrink-0 text-[11px]">
                1
              </span>
              <div>
                <span className="font-semibold text-studio-text block">Hook 3 Detik Pertama</span>
                Jangan biarkan video dimulai dengan diam. Tunjukkan aksi atau dilema visual segera.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600/30 text-blue-300 font-bold flex-shrink-0 text-[11px]">
                2
              </span>
              <div>
                <span className="font-semibold text-studio-text block">Kunci Identitas Produk</span>
                Pastikan warna, bentuk, dan logo tidak berubah di antara scene agar penonton percaya.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600/30 text-emerald-300 font-bold flex-shrink-0 text-[11px]">
                3
              </span>
              <div>
                <span className="font-semibold text-studio-text block">Gunakan NEXT SCENE HANDOFF</span>
                Salin blok handoff ke scene berikutnya agar transisi gerakan tidak terjadi lompatan canggung.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-600/30 text-amber-300 font-bold flex-shrink-0 text-[11px]">
                4
              </span>
              <div>
                <span className="font-semibold text-studio-text block">CTA Keranjang Kuning Natural</span>
                Arahkan penonton memeriksa ketersediaan varian di keranjang kuning tanpa klaim palsu.
              </div>
            </div>

            <div className="pt-2 border-t border-studio-border">
              <Link href="/help" className="text-violet-400 hover:underline flex items-center gap-1 font-medium">
                Baca panduan teknis model selengkapnya
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
