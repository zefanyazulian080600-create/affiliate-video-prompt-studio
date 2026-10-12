'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  TrendingUp,
  Flame,
  HelpCircle,
  Hash,
  Link as LinkIcon,
  ShoppingBag,
} from 'lucide-react';
import { MarketingCaptionsPackage, MarketingCaptionOption } from '@/types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface MarketingCaptionsViewProps {
  captionsPackage?: MarketingCaptionsPackage;
  productName: string;
}

export const MarketingCaptionsView: React.FC<MarketingCaptionsViewProps> = ({
  captionsPackage,
  productName,
}) => {
  const options = captionsPackage?.options || [];
  const [selectedTag, setSelectedTag] = useState<string>(options[0]?.formulaTag || 'AIDA');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [editableCaptions, setEditableCaptions] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    options.forEach(opt => {
      init[opt.id] = opt.fullCaption;
    });
    return init;
  });

  if (!captionsPackage || options.length === 0) {
    return (
      <div className="bg-studio-surface border border-studio-border rounded-2xl p-8 text-center text-studio-muted">
        <Sparkles className="w-8 h-8 text-violet-400 mx-auto mb-3 opacity-60" />
        <p className="font-semibold text-studio-text">Caption Belum Digenerate</p>
        <p className="text-xs mt-1">Generate prompt ulang untuk mendapatkan 5 rumus master caption copywriting.</p>
      </div>
    );
  }

  const activeOption = options.find(opt => opt.formulaTag === selectedTag) || options[0];
  const currentText = editableCaptions[activeOption.id] || activeOption.fullCaption;

  const handleCopySingle = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyAll = () => {
    const combined = options
      .map(
        opt =>
          `=== ${opt.formulaName} ===\n${editableCaptions[opt.id] || opt.fullCaption}`
      )
      .join('\n\n----------------------------------------\n\n');
    navigator.clipboard.writeText(combined);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-violet-950/60 via-studio-surface to-indigo-950/50 border border-violet-800/40 rounded-2xl p-5 md:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="violet" size="sm">
                <Sparkles className="w-3 h-3 mr-1" />
                Master Marketing Copywriting
              </Badge>
              <Badge variant="emerald" size="sm">
                <LinkIcon className="w-3 h-3 mr-1" />
                Ending: Cek Link di Bio
              </Badge>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" />
              Auto-Generated Caption Viral ({options.length} Rumus Marketing)
            </h3>
            <p className="text-xs md:text-sm text-studio-muted mt-1 max-w-3xl">
              Caption dirancang dengan psikologi konversi direct response untuk Reels, TikTok, dan Shopee Video.
              Setiap variasi secara eksplisit diakhiri dengan ajakan: <span className="text-emerald-300 font-semibold underline">"{captionsPackage.mandatoryEnding}"</span>.
            </p>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopyAll}
            className="text-xs border-violet-700/50 hover:border-violet-500 whitespace-nowrap"
          >
            {copiedAll ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
                Semua 5 Rumus Tersalin!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 mr-1.5 text-violet-400" />
                Salin Semua 5 Variasi
              </>
            )}
          </Button>
        </div>

        {/* Formula Switcher Pills */}
        <div className="flex items-center gap-2 mt-5 overflow-x-auto pb-1">
          {options.map(opt => {
            const isSelected = opt.formulaTag === selectedTag;
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedTag(opt.formulaTag)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/50 border border-violet-400/40'
                    : 'bg-studio-card/80 text-studio-muted hover:text-white border border-studio-border hover:border-violet-800'
                }`}
              >
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/30">
                  {opt.formulaTag}
                </span>
                {opt.formulaName.split('(')[0].replace('Formula ', '')}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Active Caption Card */}
      <div className="bg-studio-surface border border-studio-border rounded-2xl p-5 md:p-7 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-studio-border/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-violet-900/60 text-violet-300 border border-violet-700/40">
                {activeOption.formulaTag}
              </span>
              <h4 className="text-lg font-bold text-white">{activeOption.formulaName}</h4>
            </div>
            <p className="text-xs text-studio-muted mt-1 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              {activeOption.formulaDescription}
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => handleCopySingle(activeOption.id, currentText)}
            className="text-xs shadow-lg shadow-violet-900/40 shrink-0"
          >
            {copiedId === activeOption.id ? (
              <>
                <Check className="w-4 h-4 text-emerald-300 mr-1.5" />
                Caption Berhasil Disalin!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-1.5" />
                Salin Caption Siap Posting
              </>
            )}
          </Button>
        </div>

        {/* Strategy Advice Banner */}
        <div className="mt-4 p-3.5 rounded-xl bg-violet-950/30 border border-violet-800/30 flex items-start gap-2.5 text-xs text-violet-200/90">
          <HelpCircle className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-violet-300">Tips Penggunaan Strategis:</span>{' '}
            {activeOption.copyAdvice}
          </div>
        </div>

        {/* Editable Caption Box */}
        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-studio-muted">
            <span className="font-medium text-studio-text flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              Teks Caption Siap Pakai (Bisa diedit langsung):
            </span>
            <span>{currentText.length} karakter</span>
          </div>

          <textarea
            value={currentText}
            onChange={e => {
              const val = e.target.value;
              setEditableCaptions(prev => ({
                ...prev,
                [activeOption.id]: val,
              }));
            }}
            rows={10}
            className="w-full bg-studio-bg border border-studio-border focus:border-violet-500 rounded-xl p-4 text-sm text-studio-text leading-relaxed font-sans focus:outline-none focus:ring-2 focus:ring-violet-600/30 transition-all resize-y"
            placeholder="Tulis atau edit caption Anda..."
          />
        </div>

        {/* Breakdown Anatomy Cards */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-studio-border/60">
          <div className="p-3 rounded-xl bg-studio-card/60 border border-studio-border/50">
            <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Flame className="w-3 h-3" />
              1. Hook / Kalimat Pembuka
            </div>
            <p className="text-xs text-studio-text line-clamp-3 italic">
              "{activeOption.hookHeadline}"
            </p>
          </div>

          <div className="p-3 rounded-xl bg-studio-card/60 border border-studio-border/50">
            <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <LinkIcon className="w-3 h-3" />
              2. Kunci Akhir (Call To Action)
            </div>
            <p className="text-xs text-emerald-300 font-semibold">
              👉 {captionsPackage.mandatoryEnding} 🛒✨
            </p>
          </div>

          <div className="p-3 rounded-xl bg-studio-card/60 border border-studio-border/50">
            <div className="text-[11px] font-bold text-violet-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Hash className="w-3 h-3" />
              3. Target Hashtag
            </div>
            <p className="text-xs text-studio-muted line-clamp-2">
              {activeOption.hashtags.slice(0, 5).join(' ')} ...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
