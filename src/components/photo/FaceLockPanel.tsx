'use client';

import React, { useState } from 'react';
import { FaceLockConfig, LockPriorityLevel, CharacterReferenceImage } from '@/types/photo';
import { ShieldCheck, Upload, Trash2, CheckCircle2, AlertTriangle, Eye, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface FaceLockPanelProps {
  config: FaceLockConfig;
  onChange: (updated: FaceLockConfig) => void;
}

export const FaceLockPanel: React.FC<FaceLockPanelProps> = ({ config, onChange }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handlePriorityChange = (priority: LockPriorityLevel) => {
    onChange({ ...config, priority });
  };

  const handleToggle = () => {
    onChange({ ...config, enabled: !config.enabled });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} melebihi batas 5MB.`);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const newImg: CharacterReferenceImage = {
          id: `face-ref-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          url: reader.result as string,
          view: 'general',
          caption: file.name,
        };
        onChange({
          ...config,
          referenceImages: [...config.referenceImages, newImg],
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (id: string) => {
    onChange({
      ...config,
      referenceImages: config.referenceImages.filter(img => img.id !== id),
    });
  };

  return (
    <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 space-y-4 shadow-xl">
      {/* Header and Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-violet-600/20 border border-violet-500/40 flex items-center justify-center text-violet-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              FACE LOCK — Penguncian Wajah Karakter
              {config.enabled && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                  LOCKED
                </span>
              )}
            </h3>
            <p className="text-[11px] text-neutral-400">
              Karakter: <strong className="text-violet-300">{config.characterName}</strong> • {config.ethnicityAndAge}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleToggle}
          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
            config.enabled
              ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
              : 'bg-neutral-800 text-neutral-400 hover:text-white'
          }`}
        >
          {config.enabled ? 'Face Lock Aktif' : 'Aktifkan'}
        </button>
      </div>

      {/* Priority Level Buttons */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-neutral-300 flex items-center justify-between">
          <span>Tingkat Prioritas Face Lock:</span>
          <span className="text-[10px] text-neutral-400">Instruksi ke Gemini & model AI</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['strict', 'balanced', 'flexible'] as LockPriorityLevel[]).map(level => {
            const isSelected = config.priority === level;
            const labels: Record<LockPriorityLevel, { title: string; desc: string }> = {
              strict: { title: 'Ketat (Strict)', desc: 'Prioritas tertinggi, fitur wajah tidak boleh berubah' },
              balanced: { title: 'Seimbang', desc: 'Identitas dijaga dengan fleksibilitas ekspresi' },
              flexible: { title: 'Fleksibel', desc: 'Kemiripan umum, adaptasi tinggi' },
            };
            return (
              <button
                key={level}
                type="button"
                onClick={() => handlePriorityChange(level)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-violet-500 bg-violet-950/40 text-white shadow-sm'
                    : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                }`}
              >
                <div className="text-xs font-bold flex items-center justify-between">
                  <span>{labels[level].title}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" />}
                </div>
                <div className="text-[10px] text-neutral-400 mt-0.5 line-clamp-2">
                  {labels[level].desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Visual Reference Gallery */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-neutral-300">
            Foto Referensi Wajah (4 Views: Depan, Samping, 3/4, Belakang)
          </label>
          <span className="text-[10px] text-neutral-400">
            {config.referenceImages.length} Referensi Terpasang
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {config.referenceImages.map((img, idx) => (
            <div
              key={img.id}
              className="relative aspect-square rounded-xl overflow-hidden border border-neutral-700 bg-black group"
            >
              <img
                src={img.url}
                alt={img.caption || `Face reference ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                <button
                  type="button"
                  onClick={() => handleRemoveImage(img.id)}
                  className="self-end p-1 rounded-md bg-red-600/80 text-white hover:bg-red-600 transition-colors"
                  title="Hapus referensi ini"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <span className="text-[9px] text-white font-mono truncate">
                  {img.caption || `Ref #${idx + 1}`}
                </span>
              </div>
            </div>
          ))}

          {/* Upload Button */}
          <label className="relative aspect-square rounded-xl border-2 border-dashed border-neutral-700 hover:border-violet-500/60 bg-neutral-900/40 hover:bg-violet-950/20 flex flex-col items-center justify-center cursor-pointer transition-all p-2 text-center group">
            <Upload className="w-5 h-5 text-neutral-400 group-hover:text-violet-400 transition-colors" />
            <span className="text-[10px] font-semibold text-neutral-300 mt-1 block">
              + Unggah Wajah
            </span>
            <span className="text-[8px] text-neutral-400">Maks 5MB (JPG/PNG)</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Feature Details Inspector (Toggleable) */}
      <div className="border-t border-neutral-800/80 pt-3">
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs font-semibold text-violet-300 hover:text-violet-200 flex items-center gap-1.5 focus:outline-none"
        >
          <Eye className="w-3.5 h-3.5" />
          {showDetails ? 'Tutup Rincian Ciri Wajah' : 'Periksa Ciri Anatomi Wajah Terkunci'}
        </button>

        {showDetails && (
          <div className="mt-3 p-3.5 bg-black/50 border border-neutral-800 rounded-xl space-y-2.5 text-xs">
            <div>
              <span className="text-violet-400 font-bold block">Struktur Tulang & Bentuk Wajah:</span>
              <p className="text-neutral-300 text-[11px] mt-0.5">{config.facialStructure}</p>
            </div>
            <div>
              <span className="text-violet-400 font-bold block">Detail Mikro Kulit (Raw Anti-Plastik):</span>
              <p className="text-neutral-300 text-[11px] mt-0.5">{config.skinDetail}</p>
            </div>
            <div>
              <span className="text-violet-400 font-bold block">Mata & Alis:</span>
              <p className="text-neutral-300 text-[11px] mt-0.5">{config.eyesAndBrows}</p>
            </div>
            <div>
              <span className="text-violet-400 font-bold block">Hidung & Profil Samping:</span>
              <p className="text-neutral-300 text-[11px] mt-0.5">{config.noseProfile}</p>
            </div>
            <div>
              <span className="text-violet-400 font-bold block">Bibir & Senyum:</span>
              <p className="text-neutral-300 text-[11px] mt-0.5">{config.lipsDetail}</p>
            </div>
            {config.glasses && (
              <div>
                <span className="text-violet-400 font-bold block">Kacamata:</span>
                <p className="text-neutral-300 text-[11px] mt-0.5">{config.glasses}</p>
              </div>
            )}
            <div>
              <span className="text-violet-400 font-bold block">Rambut & Anak Rambut (Flyaways):</span>
              <p className="text-neutral-300 text-[11px] mt-0.5">{config.hairAndFlyaways}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
