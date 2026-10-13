'use client';

import React from 'react';
import { PosterInputData } from '@/types/poster';
import { Check, Sparkles, Tag, ShoppingBag } from 'lucide-react';

interface PosterPreviewCardProps {
  data: PosterInputData;
}

export const PosterPreviewCard: React.FC<PosterPreviewCardProps> = ({ data }) => {
  const subtitle = data.subtitle || 'Coba lo liat !!!';
  const stamp = data.stampText || 'KAMU KEREN';
  const punchline1 = data.punchlineLine1 || 'SEKARANG KERENAN';
  const punchline2 = data.punchlineLine2 || 'MONYET INI APA ELU?';
  const cta = data.ctaBadge || 'KUY CEK LINK DI BIO';

  return (
    <div className="relative mx-auto w-full max-w-[420px] aspect-[4/5] bg-[#18181b] text-white rounded-2xl overflow-hidden shadow-2xl border-2 border-neutral-700 flex flex-col justify-between p-5 select-none font-sans">
      {/* Background subtle studio vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-neutral-800/40 via-transparent to-black pointer-events-none" />

      {/* TOP HEADER SECTION */}
      <div className="relative z-10 flex justify-between items-start">
        <div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight text-white uppercase drop-shadow-md">
            LOGIKA ANAK BEKASI
          </h1>
          <p className="text-xs font-semibold text-neutral-300 mt-0.5 tracking-wide">
            {subtitle}
          </p>
          {data.clickbaitHeadline?.trim() && (
            <div className="mt-1 px-2 py-0.5 bg-red-600/90 text-white font-extrabold text-[11px] tracking-wider uppercase rounded inline-block shadow">
              {data.clickbaitHeadline}
            </div>
          )}
        </div>

        {/* TOP-RIGHT STAMP BADGE */}
        <div className="relative transform rotate-12 transition-transform hover:rotate-6">
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-amber-400 bg-amber-400/10 flex flex-col items-center justify-center p-1 shadow-lg shadow-amber-500/20">
            <div className="w-6 h-6 rounded-full bg-amber-400 text-black flex items-center justify-center font-black">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <span className="text-[8px] font-black tracking-tighter text-amber-400 uppercase text-center leading-tight mt-0.5">
              {stamp}
            </span>
          </div>
        </div>
      </div>

      {/* MIDDLE SECTION: MONKEY MODEL (LEFT) + BREAKDOWN CARDS (RIGHT) */}
      <div className="relative z-10 grid grid-cols-12 gap-3 my-auto items-center">
        {/* LEFT: CHARACTER REFERENCE (MONKEY MODEL) */}
        <div className="col-span-5 flex flex-col items-center justify-center relative">
          <div className="w-full h-56 rounded-xl border border-neutral-700 bg-neutral-900/90 overflow-hidden flex flex-col items-center justify-center relative shadow-inner group">
            {/* Monkey Model Silhouette Graphic */}
            <div className="relative flex flex-col items-center justify-center">
              <span className="text-5xl filter drop-shadow">🐵</span>
              <div className="mt-2 text-center px-1">
                <span className="text-[9px] font-mono font-bold text-amber-400 tracking-wider uppercase block">
                  CHARACTER LOCKED
                </span>
                <span className="text-[8px] text-neutral-400 line-clamp-2 mt-0.5">
                  Long-Tailed Macaque Streetwear Pose
                </span>
              </div>
            </div>

            <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[7px] text-neutral-400 font-mono">
              REF LOCKED
            </div>
          </div>
        </div>

        {/* RIGHT: NEAT PRODUCT BREAKDOWN CARDS (WHITE CARDS) */}
        <div className="col-span-7 flex flex-col gap-1.5 justify-center">
          {data.items.slice(0, 5).map((item, idx) => (
            <div
              key={item.id}
              className="bg-white text-neutral-900 rounded-lg p-2 shadow-md flex items-center justify-between border-l-4 border-amber-400 transform transition-all hover:translate-x-1"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="w-8 h-8 rounded bg-neutral-100 border border-neutral-300 flex items-center justify-center shrink-0 text-neutral-600 text-xs">
                  {item.photoUrl ? (
                    <img
                      src={item.photoUrl}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <ShoppingBag className="w-4 h-4 text-neutral-500" />
                  )}
                </div>
                <div className="overflow-hidden">
                  <div className="text-[10px] font-black uppercase tracking-tight text-neutral-900 truncate">
                    {item.name || `ITEM 0${idx + 1}`}
                  </div>
                  <div className="text-[8px] font-semibold text-neutral-500 uppercase truncate">
                    {item.detail || 'DETAIL'}
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0 ml-1">
                <span className="text-[10px] font-black text-neutral-900 block font-mono">
                  {item.price || 'Rp -'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM PUNCHLINE & CTA SECTION */}
      <div className="relative z-10 pt-2 border-t border-neutral-800 text-center">
        <div className="leading-tight mb-2">
          <div className="text-base md:text-lg font-black tracking-tight text-white uppercase drop-shadow">
            {punchline1}
          </div>
          <div className="text-lg md:text-xl font-black tracking-tight text-amber-400 uppercase drop-shadow">
            {punchline2}
          </div>
        </div>

        {/* CTA BADGE */}
        <div className="inline-block px-5 py-2 rounded-xl bg-amber-400 text-black font-black text-xs md:text-sm uppercase tracking-wider shadow-lg shadow-amber-500/30 transform hover:scale-105 transition-transform">
          {cta}
        </div>
      </div>
    </div>
  );
};
