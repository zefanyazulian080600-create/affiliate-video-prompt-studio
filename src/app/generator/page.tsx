'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Edit3,
} from 'lucide-react';
import { GeneratePromptInput, PromptProject } from '@/types';
import { executePromptPipeline } from '@/lib/prompt-engine/pipeline';
import { saveProject, getProject } from '@/lib/storage/project-store';
import { LIBRARY_TEMPLATES } from '@/lib/prompt-library-data';
import { GeneratorForm } from '@/components/generator/GeneratorForm';
import { StoryboardView } from '@/components/storyboard/StoryboardView';
import { Button } from '@/components/ui/Button';

function GeneratorContent() {
  const searchParams = useSearchParams();
  const projectIdParam = searchParams.get('projectId');
  const templateIdParam = searchParams.get('templateId');

  const [activeProject, setActiveProject] = useState<PromptProject | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [engineNotification, setEngineNotification] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(true);

  // Template pre-fill if navigated from Library
  const initialTemplate = templateIdParam
    ? LIBRARY_TEMPLATES.find(t => t.id === templateIdParam)
    : undefined;

  // Load existing project if requested in URL
  useEffect(() => {
    async function fetchExisting() {
      if (projectIdParam) {
        setIsLoading(true);
        try {
          const proj = await getProject(projectIdParam);
          if (proj) {
            setActiveProject(proj);
            setShowForm(false);
          }
        } catch (e) {
          console.error('Failed loading existing project', e);
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchExisting();
  }, [projectIdParam]);

  // Main Generation Handler
  const handleGenerate = async (input: GeneratePromptInput) => {
    setIsLoading(true);
    setErrorMessage(null);
    setEngineNotification(null);

    try {
      // Execute the 14-stage prompt pipeline
      const result = await executePromptPipeline(input, 'user-current', activeProject?.id);

      if (!result.success || !result.project) {
        setErrorMessage(result.error || 'Gagal menghasilkan prompt video.');
        return;
      }

      // Auto-save to persistence
      await saveProject(result.project);

      setActiveProject(result.project);
      setShowForm(false);
      setEngineNotification(result.engineStatusMessage);
    } catch (err: any) {
      console.error('Generation pipeline error:', err);
      setErrorMessage(err?.message || 'Terjadi kesalahan sistem saat generasi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Navigation & Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-studio-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-violet-600/20 text-violet-300 border border-violet-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-studio-text tracking-tight">
              {activeProject && !showForm
                ? 'Storyboard & Prompt Studio'
                : 'Generator Video Affiliate Shopee'}
            </h1>
            <p className="text-xs text-studio-muted">
              {activeProject && !showForm
                ? `Proyek: ${activeProject.projectName}`
                : 'Isi input minimal untuk menghasilkan rangkaian scene sinematik dengan continuity terkunci'}
            </p>
          </div>
        </div>

        {/* Action Toggle if Project Exists */}
        {activeProject && (
          <div className="flex items-center gap-2">
            {showForm ? (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowForm(false)}
                className="text-xs"
              >
                Kembali ke Storyboard
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowForm(true)}
                className="text-xs"
              >
                <Edit3 className="w-3.5 h-3.5 mr-1" />
                Ubah Parameter / Buat Baru
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Engine Status Notification */}
      {engineNotification && (
        <div className="p-3.5 rounded-xl bg-violet-950/40 border border-violet-500/40 flex items-center justify-between gap-3 text-xs text-violet-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{engineNotification}</span>
          </div>
          <button
            onClick={() => setEngineNotification(null)}
            className="text-violet-400 hover:text-white text-xs font-semibold"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Error Banner */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/50 flex items-start gap-3 text-xs text-rose-300">
          <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-semibold block">Gagal Melakukan Generasi:</span>
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      {/* Main Views */}
      {showForm ? (
        <div className="max-w-4xl mx-auto">
          <GeneratorForm
            onGenerate={handleGenerate}
            isLoading={isLoading}
            initialTemplate={
              initialTemplate
                ? {
                    sampleInput: initialTemplate.sampleInput,
                    targetModel: initialTemplate.targetModel,
                    presetSceneDuration: initialTemplate.presetSceneDuration,
                    totalDuration: initialTemplate.recommendedTotalDuration,
                  }
                : undefined
            }
          />
        </div>
      ) : activeProject ? (
        <StoryboardView
          initialProject={activeProject}
          onProjectUpdated={updated => setActiveProject(updated)}
        />
      ) : null}
    </div>
  );
}

export default function GeneratorPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-studio-muted">Memuat Studio Generator...</div>}>
      <GeneratorContent />
    </Suspense>
  );
}
