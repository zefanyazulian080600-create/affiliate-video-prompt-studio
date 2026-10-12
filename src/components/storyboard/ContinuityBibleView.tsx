'use client';

import React from 'react';
import { User, Package, MapPin, Camera, BookOpen, ShieldAlert } from 'lucide-react';
import { ContinuityBible } from '@/types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface ContinuityBibleViewProps {
  bible: ContinuityBible;
}

export const ContinuityBibleView: React.FC<ContinuityBibleViewProps> = ({ bible }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-studio-border">
        <div>
          <h3 className="text-lg font-bold text-studio-text flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-violet-400" />
            Continuity Bible — Kontrak Konsistensi Visual
          </h3>
          <p className="text-xs text-studio-muted mt-0.5">
            Pedoman identitas mutlak yang dikunci di seluruh scene agar AI video tidak mengubah karakter, produk, atau suasana ruang.
          </p>
        </div>
        <Badge variant="violet" size="md">
          5 Kunci Terkunci
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. Character Lock */}
        <Card className="border-violet-500/30 bg-studio-surface/80">
          <div className="flex items-center gap-2 text-violet-300 font-semibold text-sm mb-3">
            <User className="w-4 h-4 text-violet-400" />
            1. Character Lock (Kunci Karakter)
          </div>
          <div className="text-xs space-y-2 text-studio-text">
            <div>
              <span className="text-studio-muted font-medium">Identitas Visual:</span>
              <p className="mt-0.5">{bible.characterLock.visualIdentity}</p>
            </div>
            <div>
              <span className="text-studio-muted font-medium">Wajah & Rambut:</span>
              <p className="mt-0.5">{bible.characterLock.faceAndHair}</p>
            </div>
            <div>
              <span className="text-studio-muted font-medium">Wardrobe & Aksesori:</span>
              <p className="mt-0.5 text-violet-200">{bible.characterLock.wardrobeAndAccessories}</p>
            </div>
            <div>
              <span className="text-studio-muted font-medium">Postur & Aura:</span>
              <p className="mt-0.5">{bible.characterLock.postureAndVibe}</p>
            </div>
          </div>
        </Card>

        {/* 2. Product Lock */}
        <Card className="border-blue-500/30 bg-studio-surface/80">
          <div className="flex items-center gap-2 text-blue-300 font-semibold text-sm mb-3">
            <Package className="w-4 h-4 text-blue-400" />
            2. Product Lock (Kunci Produk)
          </div>
          <div className="text-xs space-y-2 text-studio-text">
            <div>
              <span className="text-studio-muted font-medium">Bentuk & Siluet:</span>
              <p className="mt-0.5">{bible.productLock.shapeAndProportions}</p>
            </div>
            <div>
              <span className="text-studio-muted font-medium">Warna & Finishing:</span>
              <p className="mt-0.5 text-blue-200">{bible.productLock.colorAndFinish}</p>
            </div>
            <div>
              <span className="text-studio-muted font-medium">Branding & Logo:</span>
              <p className="mt-0.5">{bible.productLock.logoAndBranding}</p>
            </div>
            <div>
              <span className="text-studio-muted font-medium">Aturan Anti-Mutasi:</span>
              <ul className="mt-1 space-y-1 list-disc list-inside text-slate-300">
                {bible.productLock.rules.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* 3. Environment Lock */}
        <Card className="border-emerald-500/30 bg-studio-surface/80">
          <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm mb-3">
            <MapPin className="w-4 h-4 text-emerald-400" />
            3. Environment Lock (Kunci Ruang)
          </div>
          <div className="text-xs space-y-2 text-studio-text">
            <div>
              <span className="text-studio-muted font-medium">Setting Lokasi:</span>
              <p className="mt-0.5">{bible.environmentLock.location}</p>
            </div>
            <div>
              <span className="text-studio-muted font-medium">Waktu & Suasana:</span>
              <p className="mt-0.5">{bible.environmentLock.timeOfDay} — {bible.environmentLock.weatherOrAtmosphere}</p>
            </div>
            <div>
              <span className="text-studio-muted font-medium">Pencahayaan:</span>
              <p className="mt-0.5 text-emerald-200">{bible.environmentLock.lightingStyle}</p>
            </div>
            <div>
              <span className="text-studio-muted font-medium">Palet Warna Ruang:</span>
              <p className="mt-0.5">{bible.environmentLock.colorPalette}</p>
            </div>
          </div>
        </Card>

        {/* 4. Cinematography Lock */}
        <Card className="border-amber-500/30 bg-studio-surface/80">
          <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm mb-3">
            <Camera className="w-4 h-4 text-amber-400" />
            4. Cinematography Lock (Kunci Kamera)
          </div>
          <div className="text-xs space-y-2 text-studio-text">
            <div>
              <span className="text-studio-muted font-medium">Aspect Ratio:</span>
              <p className="mt-0.5 font-bold text-amber-200">{bible.cinematographyLock.aspectRatio} (Vertikal Shopee/TikTok/Reels)</p>
            </div>
            <div>
              <span className="text-studio-muted font-medium">Gaya Kamera:</span>
              <p className="mt-0.5">{bible.cinematographyLock.cameraStyle}</p>
            </div>
            <div>
              <span className="text-studio-muted font-medium">Karakter Lensa & Depth:</span>
              <p className="mt-0.5">{bible.cinematographyLock.lensCharacteristics} ({bible.cinematographyLock.depthOfField})</p>
            </div>
            <div>
              <span className="text-studio-muted font-medium">Tingkat Realisme:</span>
              <p className="mt-0.5">{bible.cinematographyLock.realismLevel}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* 5. Story Lock Banner */}
      <div className="p-4 rounded-xl bg-studio-card/80 border border-studio-border text-xs">
        <span className="font-semibold text-studio-text flex items-center gap-1.5 mb-1">
          <ShieldAlert className="w-4 h-4 text-violet-400" />
          5. Story Lock (Alur Cerita Kronologis):
        </span>
        <p className="text-studio-muted leading-relaxed">
          {bible.storyLock.chronologicalFlow}
        </p>
      </div>
    </div>
  );
};
