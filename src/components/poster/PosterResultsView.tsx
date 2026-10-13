'use client';

import React, { useState } from 'react';
import { PosterInputData, PosterGeneratedResult } from '@/types/poster';
import { PosterPreviewCard } from './PosterPreviewCard';
import {
  Copy,
  Check,
  Download,
  Sparkles,
  FileText,
  ShieldAlert,
  Flame,
  Share2,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface PosterResultsViewProps {
  inputData: PosterInputData;
  result: PosterGeneratedResult;
}

export const PosterResultsView: React.FC<PosterResultsViewProps> = ({
  inputData,
  result,
}) => {
  const [activeTab, setActiveTab] = useState<'prompt' | 'negative' | 'caption' | 'inputA'>('prompt');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadAll = () => {
    const content = `# LOGIKA ANAK BEKASI — POSTER OUTFIT AFFILIATE PACKAGE
Generated: ${new Date(result.timestamp).toLocaleString('id-ID')}

==================================================
BAGIAN A — INPUT RINGKASAN
==================================================
${result.formattedBagianA}

==================================================
BAGIAN B — PROMPT UTAMA (AI IMAGE GENERATOR)
==================================================
${result.mainPrompt}

==================================================
BAGIAN C — NEGATIVE PROMPT
==================================================
${result.negativePrompt}

==================================================
BAGIAN D — CAPTION SOCIAL MEDIA (TIKTOK / REELS / SHOPEE)
==================================================
${result.socialCaption}
`;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `poster_logika_anak_bekasi_${Date.now()}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT: POSTER VISUAL PREVIEW (4:5) */}
      <div className="lg:col-span-5 flex flex-col items-center">
        <div className="w-full">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Visual Output Mockup (4:5)
            </span>
            <Badge variant="violet" size="sm">
              Model Monyet Locked
            </Badge>
          </div>
          <PosterPreviewCard data={inputData} />
          <p className="text-[11px] text-center text-studio-muted mt-3">
            Mockup di atas merepresentasikan struktur tata letak yang akan dihasilkan AI Image Generator.
          </p>
        </div>
      </div>

      {/* RIGHT: PROMPT TABS & COPY TOOLS */}
      <div className="lg:col-span-7 space-y-5">
        {/* ACTION HEADER */}
        <div className="bg-studio-surface border border-studio-border rounded-2xl p-5 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="amber" size="sm">
                  <Flame className="w-3 h-3 mr-1 text-amber-400" />
                  Logika Anak Bekasi Engine
                </Badge>
                <Badge variant="emerald" size="sm">
                  Siap Generate
                </Badge>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Paket Prompt Poster Siap Pakai
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleCopy('main-top', result.mainPrompt)}
                className="text-xs bg-amber-500 hover:bg-amber-400 text-black font-bold shadow-lg shadow-amber-500/20"
              >
                {copiedKey === 'main-top' ? (
                  <>
                    <Check className="w-3.5 h-3.5 mr-1" />
                    Tersalin!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 mr-1" />
                    Salin Prompt Utama
                  </>
                )}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleDownloadAll}
                className="text-xs"
              >
                <Download className="w-3.5 h-3.5 mr-1" />
                Unduh .MD
              </Button>
            </div>
          </div>

          {/* TAB BUTTONS */}
          <div className="flex items-center gap-2 mt-5 border-t border-studio-border pt-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab('prompt')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'prompt'
                  ? 'bg-amber-400 text-black shadow-md shadow-amber-500/20'
                  : 'text-studio-muted hover:text-white bg-studio-card'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Bagian B: Prompt Utama
            </button>

            <button
              onClick={() => setActiveTab('negative')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'negative'
                  ? 'bg-amber-400 text-black shadow-md shadow-amber-500/20'
                  : 'text-studio-muted hover:text-white bg-studio-card'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              Bagian C: Negative Prompt
            </button>

            <button
              onClick={() => setActiveTab('caption')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'caption'
                  ? 'bg-amber-400 text-black shadow-md shadow-amber-500/20'
                  : 'text-studio-muted hover:text-white bg-studio-card'
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              Caption Medsos
            </button>

            <button
              onClick={() => setActiveTab('inputA')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'inputA'
                  ? 'bg-amber-400 text-black shadow-md shadow-amber-500/20'
                  : 'text-studio-muted hover:text-white bg-studio-card'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Bagian A: Ringkasan
            </button>
          </div>
        </div>

        {/* TAB PANELS */}
        {activeTab === 'prompt' && (
          <div className="bg-studio-surface border border-studio-border rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">
                  Prompt Utama AI Image Generator (Bahasa Inggris)
                </span>
                <span className="text-[11px] text-studio-muted">
                  Salin dan tempel ke Midjourney, Stable Diffusion, Ideogram, Flux, atau generator AI Anda.
                </span>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleCopy('main-inner', result.mainPrompt)}
                className="text-xs"
              >
                {copiedKey === 'main-inner' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                    Tersalin!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 mr-1" />
                    Salin
                  </>
                )}
              </Button>
            </div>
            <pre className="w-full bg-studio-bg border border-studio-border rounded-xl p-4 text-xs text-neutral-200 font-mono whitespace-pre-wrap leading-relaxed max-h-[380px] overflow-y-auto">
              {result.mainPrompt}
            </pre>
          </div>
        )}

        {activeTab === 'negative' && (
          <div className="bg-studio-surface border border-studio-border rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">
                  Bagian C — Negative Prompt (Wajib Disertakan)
                </span>
                <span className="text-[11px] text-studio-muted">
                  Mencegah mutasi anatomi, efek neon kartun, dan typo harga di kartu produk.
                </span>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleCopy('neg-inner', result.negativePrompt)}
                className="text-xs"
              >
                {copiedKey === 'neg-inner' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                    Tersalin!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 mr-1" />
                    Salin
                  </>
                )}
              </Button>
            </div>
            <pre className="w-full bg-studio-bg border border-studio-border rounded-xl p-4 text-xs text-neutral-200 font-mono whitespace-pre-wrap leading-relaxed max-h-[380px] overflow-y-auto">
              {result.negativePrompt}
            </pre>
          </div>
        )}

        {activeTab === 'caption' && (
          <div className="bg-studio-surface border border-studio-border rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">
                  Caption Medsos Viral (TikTok / IG Reels / Shopee Video)
                </span>
                <span className="text-[11px] text-studio-muted">
                  Siap di-copy-paste untuk posting bersama poster affiliate Anda.
                </span>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleCopy('cap-inner', result.socialCaption)}
                className="text-xs"
              >
                {copiedKey === 'cap-inner' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                    Tersalin!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 mr-1" />
                    Salin Caption
                  </>
                )}
              </Button>
            </div>
            <pre className="w-full bg-studio-bg border border-studio-border rounded-xl p-4 text-xs text-neutral-200 font-sans whitespace-pre-wrap leading-relaxed max-h-[380px] overflow-y-auto">
              {result.socialCaption}
            </pre>
          </div>
        )}

        {activeTab === 'inputA' && (
          <div className="bg-studio-surface border border-studio-border rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">
                  Bagian A — Ringkasan Data Input
                </span>
                <span className="text-[11px] text-studio-muted">
                  Format teks arsip isian data outfit.
                </span>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleCopy('input-inner', result.formattedBagianA)}
                className="text-xs"
              >
                {copiedKey === 'input-inner' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                    Tersalin!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 mr-1" />
                    Salin
                  </>
                )}
              </Button>
            </div>
            <pre className="w-full bg-studio-bg border border-studio-border rounded-xl p-4 text-xs text-neutral-200 font-mono whitespace-pre-wrap leading-relaxed max-h-[380px] overflow-y-auto">
              {result.formattedBagianA}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
