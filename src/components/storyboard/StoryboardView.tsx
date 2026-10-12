'use client';

import React, { useState } from 'react';
import {
  Film,
  BookOpen,
  ShieldCheck,
  Download,
  Copy,
  Check,
  FileJson,
  FileText,
  Clock,
  Sparkles,
  Flame,
} from 'lucide-react';
import { PromptProject } from '@/types';
import { SceneCard } from './SceneCard';
import { ContinuityBibleView } from './ContinuityBibleView';
import { QualityAuditView } from './QualityAuditView';
import { MarketingCaptionsView } from './MarketingCaptionsView';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import {
  exportProjectToMarkdown,
  exportProjectToJSON,
} from '@/lib/prompt-engine/exporter';
import {
  toggleSceneLock,
  improveScene,
  SceneImprovementType,
} from '@/lib/prompt-engine/scene-manipulator';
import { saveProject } from '@/lib/storage/project-store';

interface StoryboardViewProps {
  initialProject: PromptProject;
  onProjectUpdated?: (updated: PromptProject) => void;
}

export const StoryboardView: React.FC<StoryboardViewProps> = ({
  initialProject,
  onProjectUpdated,
}) => {
  const [project, setProject] = useState<PromptProject>(initialProject);
  const [activeTab, setActiveTab] = useState<'scenes' | 'captions' | 'bible' | 'audit' | 'export'>('scenes');
  const [copiedAll, setCopiedAll] = useState(false);
  const saveStatus = 'Tersimpan di Penyimpanan';

  const handleToggleLock = (sceneNumber: number) => {
    const updated = toggleSceneLock(project, sceneNumber);
    setProject(updated);
    saveProject(updated);
    onProjectUpdated?.(updated);
  };

  const handleImprove = (sceneNumber: number, type: SceneImprovementType) => {
    const updated = improveScene(project, sceneNumber, type);
    setProject(updated);
    saveProject(updated);
    onProjectUpdated?.(updated);
  };

  const handleCopyAll = (mode: 'copy-ready' | 'human-readable') => {
    const text = exportProjectToMarkdown(project, mode);
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const text = exportProjectToMarkdown(project, 'human-readable');
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${project.projectName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_prompts.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJSON = () => {
    const text = exportProjectToJSON(project);
    const blob = new Blob([text], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${project.projectName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_project.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Project Meta Bar */}
      <div className="bg-studio-surface border border-studio-border rounded-2xl p-5 md:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <Badge variant="violet" size="sm">
                {project.workflowModel.toUpperCase()}
              </Badge>
              <Badge variant="blue" size="sm">
                Preset {project.presetSceneDuration}s/scene
              </Badge>
              <Badge variant="emerald" size="sm">
                Durasi Total: {project.totalDuration}s ({project.scenes.length} Scene)
              </Badge>
              <span className="text-xs text-studio-muted flex items-center gap-1 ml-1">
                <Clock className="w-3 h-3 text-studio-muted" />
                {saveStatus}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-studio-text tracking-tight">
              {project.projectName}
            </h2>
            <p className="text-xs text-studio-muted mt-1 max-w-2xl">
              Format: <span className="text-violet-300 font-medium">{project.creativeConcept.format}</span> —{' '}
              {project.creativeConcept.bigIdea}
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleCopyAll('copy-ready')}
              className="text-xs"
            >
              {copiedAll ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                  Semua Prompt Tersalin!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1" />
                  Salin Seluruh Prompt
                </>
              )}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleDownloadMarkdown}
              className="text-xs"
            >
              <Download className="w-3.5 h-3.5 mr-1" />
              Download Markdown
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 border-t border-studio-border pt-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('scenes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'scenes'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-900/40'
                : 'text-studio-muted hover:text-studio-text hover:bg-studio-card'
            }`}
          >
            <Film className="w-4 h-4" />
            Storyboard & Scene ({project.scenes.length})
          </button>

          <button
            onClick={() => setActiveTab('captions')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'captions'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-900/40'
                : 'text-studio-muted hover:text-studio-text hover:bg-studio-card'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            Caption Marketing ({project.marketingCaptions?.options.length || 5} Rumus)
          </button>

          <button
            onClick={() => setActiveTab('bible')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'bible'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-900/40'
                : 'text-studio-muted hover:text-studio-text hover:bg-studio-card'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Continuity Bible (5 Kunci)
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'audit'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-900/40'
                : 'text-studio-muted hover:text-studio-text hover:bg-studio-card'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Audit Kualitas ({project.qualityReport.overallScore}/100)
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'export'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-900/40'
                : 'text-studio-muted hover:text-studio-text hover:bg-studio-card'
            }`}
          >
            <Download className="w-4 h-4" />
            Export & Integrasi
          </button>
        </div>
      </div>

      {/* Quick Caption Bar above scenes */}
      {project.marketingCaptions && project.marketingCaptions.options.length > 0 && activeTab === 'scenes' && (
        <div className="bg-gradient-to-r from-violet-950/40 via-studio-surface to-studio-card border border-violet-800/40 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">Auto Caption Siap Posting:</span>
                <Badge variant="emerald" size="sm">Ending: Cek Link di Bio</Badge>
              </div>
              <p className="text-xs text-studio-muted line-clamp-1 mt-0.5">
                "{project.marketingCaptions.options[0].hookHeadline}"
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                const topCaption = project.marketingCaptions?.options[0]?.fullCaption || '';
                navigator.clipboard.writeText(topCaption);
                setCopiedAll(true);
                setTimeout(() => setCopiedAll(false), 2000);
              }}
              className="text-xs"
            >
              <Copy className="w-3.5 h-3.5 mr-1 text-violet-400" />
              Salin Caption
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setActiveTab('captions')}
              className="text-xs"
            >
              Buka 5 Rumus
            </Button>
          </div>
        </div>
      )}

      {/* Tab Panels */}
      {activeTab === 'scenes' && (
        <div className="space-y-4">
          {project.scenes.map(scene => (
            <SceneCard
              key={scene.sceneNumber}
              scene={scene}
              totalScenes={project.scenes.length}
              onToggleLock={handleToggleLock}
              onImprove={handleImprove}
            />
          ))}
        </div>
      )}

      {activeTab === 'captions' && (
        <MarketingCaptionsView
          captionsPackage={project.marketingCaptions}
          productName={project.productProfile.productName}
        />
      )}

      {activeTab === 'bible' && <ContinuityBibleView bible={project.continuityBible} />}

      {activeTab === 'audit' && <QualityAuditView report={project.qualityReport} />}

      {activeTab === 'export' && (
        <div className="bg-studio-surface border border-studio-border rounded-2xl p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-studio-text">Opsi Ekspor & Integrasi Video</h3>
            <p className="text-xs text-studio-muted mt-0.5">
              Salin atau simpan hasil seluruh prompt yang telah dikurasi ke format teks atau JSON.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-studio-card border border-studio-border space-y-3">
              <div className="flex items-center gap-2 text-violet-300 font-semibold text-sm">
                <FileText className="w-4 h-4 text-violet-400" />
                Dokumen Ringkasan (.MD / .TXT)
              </div>
              <p className="text-xs text-studio-muted leading-relaxed">
                Ekspor seluruh prompt per scene, arahan kamera, voiceover Shopee, dan blok continuity handoff dalam format Markdown.
              </p>
              <div className="flex items-center gap-2 pt-2">
                <Button variant="primary" size="sm" onClick={handleDownloadMarkdown} className="text-xs">
                  <Download className="w-3.5 h-3.5 mr-1" />
                  Unduh .MD
                </Button>
                <Button variant="secondary" size="sm" onClick={() => handleCopyAll('human-readable')} className="text-xs">
                  <Copy className="w-3.5 h-3.5 mr-1" />
                  Salin Teks Lengkap
                </Button>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-studio-card border border-studio-border space-y-3">
              <div className="flex items-center gap-2 text-blue-300 font-semibold text-sm">
                <FileJson className="w-4 h-4 text-blue-400" />
                Data Proyek JSON Lengkap
              </div>
              <p className="text-xs text-studio-muted leading-relaxed">
                Simpan seluruh arsitektur proyek, continuity state, dan profil produk dalam format JSON untuk backup atau import di masa mendatang.
              </p>
              <div className="pt-2">
                <Button variant="secondary" size="sm" onClick={handleDownloadJSON} className="text-xs">
                  <Download className="w-3.5 h-3.5 mr-1" />
                  Unduh File JSON
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
