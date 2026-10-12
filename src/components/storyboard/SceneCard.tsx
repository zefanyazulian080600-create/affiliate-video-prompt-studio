'use client';

import React, { useState } from 'react';
import {
  Copy,
  Check,
  Lock,
  Unlock,
  Sparkles,
  Camera,
  Film,
  Volume2,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ScenePlan } from '@/types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { copyFullScenePackage } from '@/lib/prompt-engine/exporter';
import { SceneImprovementType } from '@/lib/prompt-engine/scene-manipulator';

interface SceneCardProps {
  scene: ScenePlan;
  totalScenes: number;
  onToggleLock: (sceneNumber: number) => void;
  onImprove: (sceneNumber: number, type: SceneImprovementType) => void;
}

export const SceneCard: React.FC<SceneCardProps> = ({
  scene,
  totalScenes,
  onToggleLock,
  onImprove,
}) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showImproveMenu, setShowImproveMenu] = useState(false);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const getStageBadgeVariant = (stage: string): 'violet' | 'blue' | 'emerald' | 'amber' | 'neutral' => {
    switch (stage) {
      case 'Hook':
        return 'violet';
      case 'Demonstration':
        return 'blue';
      case 'CTA':
        return 'emerald';
      case 'Product Reveal':
        return 'amber';
      default:
        return 'neutral';
    }
  };

  return (
    <div
      className={`relative bg-studio-surface border rounded-2xl p-5 md:p-6 transition-all duration-200 ${
        scene.isLocked
          ? 'border-amber-500/40 bg-studio-surface/80 shadow-md shadow-amber-950/20'
          : 'border-studio-border hover:border-studio-borderHover shadow-lg shadow-black/30'
      }`}
    >
      {/* Header: Scene Number, Duration, Stage & Lock */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-studio-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-violet-600/20 border border-violet-500/40 font-bold text-sm text-violet-300">
            #{scene.sceneNumber}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-base text-studio-text">
                Scene {scene.sceneNumber}
              </span>
              <Badge variant="blue" size="sm">
                {scene.duration} Detik
              </Badge>
              <Badge variant={getStageBadgeVariant(scene.marketingStage)} size="sm">
                {scene.marketingStage}
              </Badge>
            </div>
            <p className="text-xs text-studio-muted line-clamp-1 mt-0.5">
              {scene.visualHookDescription}
            </p>
          </div>
        </div>

        {/* Lock & Improve Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleLock(scene.sceneNumber)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
              scene.isLocked
                ? 'bg-amber-950/40 border-amber-500/50 text-amber-300 hover:bg-amber-900/40'
                : 'bg-studio-card border-studio-border text-studio-muted hover:text-studio-text hover:border-studio-borderHover'
            }`}
            title={scene.isLocked ? 'Buka kunci scene ini' : 'Kunci scene agar tidak berubah'}
          >
            {scene.isLocked ? (
              <>
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                Terkunci
              </>
            ) : (
              <>
                <Unlock className="w-3.5 h-3.5" />
                Kunci Scene
              </>
            )}
          </button>

          {/* Quick Improve Dropdown */}
          {!scene.isLocked && (
            <div className="relative">
              <button
                onClick={() => setShowImproveMenu(!showImproveMenu)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium bg-violet-600/15 border border-violet-500/30 text-violet-300 hover:bg-violet-600/25 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Optimasi
                <ChevronDown className="w-3 h-3 ml-0.5" />
              </button>

              {showImproveMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-studio-card border border-studio-border shadow-2xl py-1.5 z-30 space-y-0.5">
                  <button
                    onClick={() => {
                      onImprove(scene.sceneNumber, 'cinematic');
                      setShowImproveMenu(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs text-studio-text hover:bg-violet-600/20 hover:text-violet-200 transition-colors"
                  >
                    🎬 Jadikan Lebih Sinematik
                  </button>
                  <button
                    onClick={() => {
                      onImprove(scene.sceneNumber, 'natural');
                      setShowImproveMenu(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs text-studio-text hover:bg-violet-600/20 hover:text-violet-200 transition-colors"
                  >
                    🌿 Jadikan Natural (Gaya UGC)
                  </button>
                  <button
                    onClick={() => {
                      onImprove(scene.sceneNumber, 'strengthen_hook');
                      setShowImproveMenu(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs text-studio-text hover:bg-violet-600/20 hover:text-violet-200 transition-colors"
                  >
                    ⚡ Perkuat Hook Pembuka
                  </button>
                  <button
                    onClick={() => {
                      onImprove(scene.sceneNumber, 'product_visibility');
                      setShowImproveMenu(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs text-studio-text hover:bg-violet-600/20 hover:text-violet-200 transition-colors"
                  >
                    🔍 Tonjolkan Detail & Logo Produk
                  </button>
                  {scene.sceneNumber > 1 && (
                    <button
                      onClick={() => {
                        onImprove(scene.sceneNumber, 'continue_previous');
                        setShowImproveMenu(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs text-studio-text hover:bg-violet-600/20 hover:text-violet-200 transition-colors border-t border-studio-border/50"
                    >
                      🔗 Sambungkan Ending Scene Sebelumnya
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content: Primary Action & Camera */}
      <div className="py-4 space-y-3">
        <div>
          <span className="text-xs font-semibold text-studio-muted uppercase tracking-wider">
            Aksi Utama Talent & Produk
          </span>
          <p className="text-sm text-studio-text mt-1 leading-relaxed">
            {scene.primaryAction}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="bg-studio-card/80 border border-studio-border/60 rounded-xl p-3">
            <span className="flex items-center gap-1.5 font-medium text-studio-muted mb-1">
              <Camera className="w-3.5 h-3.5 text-blue-400" />
              Tata Kamera
            </span>
            <p className="text-studio-text text-xs leading-normal">
              {scene.cameraDescription}
            </p>
          </div>

          <div className="bg-studio-card/80 border border-studio-border/60 rounded-xl p-3">
            <span className="flex items-center gap-1.5 font-medium text-studio-muted mb-1">
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
              Voiceover (Shopee ID) & Audio
            </span>
            <p className="text-studio-text text-xs italic leading-normal">
              {scene.dialogueOrVoiceover || 'Background upbeat music foley'}
            </p>
          </div>
        </div>

        {/* Copy-Ready AI Video Prompt */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-violet-300 flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-violet-400" />
              Copy-Ready Prompt (Siap Salin ke Tool AI Video)
            </span>
            <button
              onClick={() => handleCopy(scene.promptEnglish, 'prompt')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-violet-600/20 border border-violet-500/30 text-violet-300 hover:bg-violet-600/30 transition-all active:scale-95"
            >
              {copiedType === 'prompt' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Salin Prompt
                </>
              )}
            </button>
          </div>

          <pre className="w-full bg-studio-bg border border-studio-border/80 rounded-xl p-3 text-xs text-studio-text font-mono whitespace-pre-wrap leading-relaxed select-all max-h-36 overflow-y-auto">
            {scene.promptEnglish}
          </pre>
        </div>

        {/* Negative Prompt */}
        <div className="pt-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-rose-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
              Negative Prompt (Khusus Pencegah Deformasi & Inkonsistensi)
            </span>
            <button
              onClick={() => handleCopy(scene.negativePrompts.combinedNegativePrompt, 'negative')}
              className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-medium text-rose-300 hover:bg-rose-950/40 border border-rose-500/30 transition-all active:scale-95"
            >
              {copiedType === 'negative' ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-300">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Salin Negatif
                </>
              )}
            </button>
          </div>
          <p className="text-[11px] font-mono text-studio-muted bg-studio-bg/60 border border-studio-border/50 rounded-lg p-2 line-clamp-2">
            {scene.negativePrompts.combinedNegativePrompt}
          </p>
        </div>

        {/* Mandatory NEXT SCENE HANDOFF Block */}
        <div className="pt-2">
          <div className="bg-gradient-to-r from-violet-950/40 via-indigo-950/30 to-blue-950/40 border border-violet-500/40 rounded-xl p-3.5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-violet-300 flex items-center gap-1.5 uppercase tracking-wide">
                <ArrowRight className="w-3.5 h-3.5 text-violet-400" />
                {scene.sceneNumber < totalScenes
                  ? `NEXT SCENE HANDOFF (SCENE ${scene.sceneNumber} ➔ ${scene.sceneNumber + 1})`
                  : 'FINAL SCENE COMPLETION'}
              </span>
              <button
                onClick={() => handleCopy(scene.nextSceneHandoffPackage, 'handoff')}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-violet-600/30 border border-violet-500/50 text-violet-200 hover:bg-violet-600/50 transition-all active:scale-95"
              >
                {copiedType === 'handoff' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Salin Handoff
                  </>
                )}
              </button>
            </div>
            <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed bg-studio-bg/70 border border-violet-500/20 rounded-lg p-2.5 max-h-32 overflow-y-auto">
              {scene.nextSceneHandoffPackage}
            </pre>
          </div>
        </div>

        {/* Collapsible Starting & Ending States */}
        <div className="pt-1">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-1.5 text-xs text-studio-muted hover:text-studio-text font-medium transition-colors"
          >
            {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            {showDetails ? 'Sembunyikan Rincian State' : 'Lihat Rincian Starting & Ending State'}
          </button>

          {showDetails && (
            <div className="mt-2.5 p-3 rounded-xl bg-studio-card/60 border border-studio-border/60 text-xs space-y-2">
              <div>
                <span className="text-studio-muted font-medium">Starting State:</span>
                <p className="text-studio-text mt-0.5">{scene.continuityState.startingState}</p>
              </div>
              <div>
                <span className="text-studio-muted font-medium">Ending State:</span>
                <p className="text-studio-text mt-0.5">{scene.continuityState.endingState}</p>
              </div>
              <div>
                <span className="text-studio-muted font-medium">Unresolved Action:</span>
                <p className="text-studio-text mt-0.5">{scene.continuityState.unresolvedAction}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer: Copy Full Package Button */}
      <div className="pt-3 border-t border-studio-border flex items-center justify-end">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => handleCopy(copyFullScenePackage(scene), 'full')}
          className="text-xs"
        >
          {copiedType === 'full' ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400 mr-1" />
              Paket Lengkap Tersalin!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 mr-1" />
              Salin Paket Lengkap Scene {scene.sceneNumber}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
