'use client';

import React, { useState } from 'react';
import { BodyLockConfig, LockPriorityLevel, CharacterReferenceImage } from '@/types/photo';
import {
  ShieldCheck,
  Upload,
  Trash2,
  CheckCircle2,
  Sliders,
  ChevronDown,
  ChevronUp,
  User,
  Sparkles,
  Edit3,
} from 'lucide-react';

interface BodyLockPanelProps {
  config: BodyLockConfig;
  onChange: (updated: BodyLockConfig) => void;
}

export const BodyLockPanel: React.FC<BodyLockPanelProps> = ({ config, onChange }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handlePriorityChange = (priority: LockPriorityLevel) => {
    onChange({ ...config, priority });
  };

  const handleToggle = () => {
    onChange({ ...config, enabled: !config.enabled });
  };

  const handleFieldChange = (field: keyof BodyLockConfig, val: any) => {
    onChange({
      ...config,
      [field]: val,
    });
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
          id: `body-ref-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
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
          <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              BODY LOCK — Penguncian Proporsi Tubuh (Headless)
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                Opsional
              </span>
              {config.enabled && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                  AKTIF ({config.priority.toUpperCase()})
                </span>
              )}
            </h3>
            <p className="text-[11px] text-neutral-400">
              Proporsi: <strong className="text-indigo-300">{config.heightAndWeight || 'Proporsional'}</strong> • Menjaga gravitasi & anatomi alami
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleToggle}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            config.enabled
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-neutral-800 text-neutral-400 hover:text-white'
          }`}
        >
          {config.enabled ? '✓ Body Lock Aktif' : '+ Aktifkan Body Lock'}
        </button>
      </div>

      {config.enabled ? (
        <div className="space-y-4">
          {/* Tinggi & Berat Badan */}
          <div className="p-3 rounded-xl bg-neutral-950/50 border border-neutral-800">
            <label className="text-[10px] font-semibold text-neutral-400 block mb-1">
              Tinggi & Berat Badan:
            </label>
            <input
              type="text"
              value={config.heightAndWeight}
              onChange={e => handleFieldChange('heightAndWeight', e.target.value)}
              placeholder="misal: Tinggi 168 cm, berat 54 kg / Proporsional natural"
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Area Input Prompt Tubuh Sendiri (Bebas / Kustom) */}
          <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/30 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5" />
                Prompt Tubuh Kustom Sendiri (Bebas Masukkan Proporsi & Bentuk Tubuh):
              </label>
              <span className="text-[10px] text-neutral-400">Dimasukkan langsung ke model</span>
            </div>
            <textarea
              value={config.customNotes || ''}
              onChange={e => handleFieldChange('customNotes', e.target.value)}
              rows={3}
              placeholder="Tulis deskripsi proporsi tubuh karakter Anda sendiri... (misal: Siluet tubuh feminin ramping berisi alami, bahu rileks, pinggang ramping 62 cm, kaki jenjang proporsional, tanpa otot kekar berlebihan, tekstur kulit tubuh sehat alami)."
              className="w-full bg-neutral-950 border border-neutral-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>

          {/* Priority Level Buttons */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300 flex items-center justify-between">
              <span>Tingkat Kunci Body Lock:</span>
              <span className="text-[10px] text-neutral-400">Instruksi ke Gemini & AI</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'strict', label: 'Ketat (Strict)', desc: 'Proporsi tubuh dikunci ketat 100%' },
                { id: 'balanced', label: 'Seimbang (Balanced)', desc: 'Siluet dijaga dengan adaptasi pose' },
                { id: 'flexible', label: 'Fleksibel (Flexible)', desc: 'Proporsi umum tanpa angka mutlak' },
              ].map(level => {
                const isSelected = config.priority === level.id;
                return (
                  <button
                    key={level.id}
                    type="button"
                    onClick={() => handlePriorityChange(level.id as LockPriorityLevel)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-950/40 text-white ring-1 ring-indigo-500/50'
                        : 'border-neutral-800 bg-neutral-950/40 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                    }`}
                  >
                    <div className="text-xs font-bold">{level.label}</div>
                    <div className="text-[10px] text-neutral-400 mt-0.5 line-clamp-1">{level.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Area Unggah Foto Referensi Tubuh */}
          <div className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-950/50 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-300">
                Foto Referensi Tubuh / Headless (Bila Ada / Opsional):
              </span>
              <label className="cursor-pointer px-2.5 py-1 bg-indigo-950/70 hover:bg-indigo-900 border border-indigo-800/50 text-indigo-200 text-xs rounded-lg flex items-center gap-1 font-semibold transition-all">
                <Upload className="w-3.5 h-3.5" />
                Unggah Foto Tubuh
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </div>

            {config.referenceImages.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {config.referenceImages.map(img => (
                  <div
                    key={img.id}
                    className="relative w-20 h-24 rounded-lg overflow-hidden border border-neutral-700 group bg-black"
                  >
                    <img
                      src={img.url}
                      alt={img.caption || 'Body Reference'}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(img.id)}
                      className="absolute top-1 right-1 p-1 bg-red-600/80 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[10px] text-neutral-500 italic">
                Belum ada foto referensi tubuh yang diunggah. Prompt akan mengandalkan deskripsi teks di atas.
              </p>
            )}
          </div>

          {/* Accordion Rincian Anatomi Tubuh Lengkap */}
          <div className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950/30">
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-semibold text-neutral-300 hover:text-white"
            >
              <span className="flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                Rincian Siluet & Anatomi Spesifik (Dada, Pinggang, Pinggul, Kaki)
              </span>
              {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showDetails && (
              <div className="p-4 border-t border-neutral-800 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-semibold text-neutral-400 block mb-1">
                      Siluet Tubuh:
                    </label>
                    <input
                      type="text"
                      value={config.bodySilhouette}
                      onChange={e => handleFieldChange('bodySilhouette', e.target.value)}
                      placeholder="Siluet jam pasir alami, ramping berisi tanpa otot kekar"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-neutral-400 block mb-1">
                      Tekstur Kulit Tubuh:
                    </label>
                    <input
                      type="text"
                      value={config.skinTexture}
                      onChange={e => handleFieldChange('skinTexture', e.target.value)}
                      placeholder="Tekstur organik alami dengan lipatan persendian wajar"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-neutral-400 block mb-1">
                      Leher, Bahu & Lengan:
                    </label>
                    <input
                      type="text"
                      value={config.neckAndShoulders}
                      onChange={e => handleFieldChange('neckAndShoulders', e.target.value)}
                      placeholder="Bahu membulat rileks, lengan lembut feminin"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-neutral-400 block mb-1">
                      Dada:
                    </label>
                    <input
                      type="text"
                      value={config.bustDetail}
                      onChange={e => handleFieldChange('bustDetail', e.target.value)}
                      placeholder="Bentuk dada alami proporsional mengikuti gravitasi nyata"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-neutral-400 block mb-1">
                      Pinggang & Perut:
                    </label>
                    <input
                      type="text"
                      value={config.waistAndMidriff}
                      onChange={e => handleFieldChange('waistAndMidriff', e.target.value)}
                      placeholder="Pinggang ramping melengkung mulus, perut rata lembut alami"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-neutral-400 block mb-1">
                      Pinggul, Bokong & Kaki:
                    </label>
                    <input
                      type="text"
                      value={config.hipsAndGlutes}
                      onChange={e => handleFieldChange('hipsAndGlutes', e.target.value)}
                      placeholder="Pinggul proporsional membulat halus, paha lembut berisi"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-3.5 rounded-xl bg-neutral-950/40 border border-dashed border-neutral-800 text-neutral-400 text-xs flex items-center justify-between">
          <span>Body Lock non-aktif. Proporsi tubuh fleksibel mengikuti konsep umum adegan.</span>
          <button
            type="button"
            onClick={handleToggle}
            className="text-indigo-400 font-semibold hover:underline text-xs"
          >
            Aktifkan Sekarang →
          </button>
        </div>
      )}
    </div>
  );
};
