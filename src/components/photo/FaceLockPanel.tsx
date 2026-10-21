'use client';

import React, { useState } from 'react';
import { FaceLockConfig, LockPriorityLevel, CharacterReferenceImage } from '@/types/photo';
import {
  CHARACTER_PRESETS,
  BLANK_CUSTOM_FACE_LOCK,
  ANYA_PITALOKA_FACE_LOCK,
} from '@/lib/photo-engine/constants';
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

interface FaceLockPanelProps {
  config: FaceLockConfig;
  onChange: (updated: FaceLockConfig) => void;
  onCharacterNameChange?: (name: string) => void;
}

export const FaceLockPanel: React.FC<FaceLockPanelProps> = ({
  config,
  onChange,
  onCharacterNameChange,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const handlePriorityChange = (priority: LockPriorityLevel) => {
    onChange({ ...config, priority });
  };

  const handleToggle = () => {
    onChange({ ...config, enabled: !config.enabled });
  };

  const handleSelectCharacterPreset = (presetId: string) => {
    const found = CHARACTER_PRESETS.find(p => p.id === presetId);
    if (!found) return;

    const newConfig: FaceLockConfig = {
      ...found.faceConfig,
      enabled: true,
    };
    onChange(newConfig);

    if (onCharacterNameChange) {
      onCharacterNameChange(newConfig.characterName);
    }
  };

  const handleFieldChange = (field: keyof FaceLockConfig, val: any) => {
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
              Karakter: <strong className="text-violet-300">{config.characterName || 'Karakter Kustom'}</strong> • Bebas masukkan karakter sendiri
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleToggle}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            config.enabled
              ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
              : 'bg-neutral-800 text-neutral-400 hover:text-white'
          }`}
        >
          {config.enabled ? '✓ Face Lock Aktif' : '+ Aktifkan Face Lock'}
        </button>
      </div>

      {config.enabled ? (
        <div className="space-y-4">
          {/* Preset Karakter Cepat */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300 flex items-center justify-between">
              <span>Pilih Karakter atau Masukkan Sendiri:</span>
              <span className="text-[10px] text-neutral-400">Pilih template awal</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {CHARACTER_PRESETS.map(p => {
                const isActive = config.characterName === p.faceConfig.characterName;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelectCharacterPreset(p.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'border-violet-500 bg-violet-950/50 text-white ring-1 ring-violet-500/50'
                        : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                    }`}
                  >
                    <span>{p.name}</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-300">
                      {p.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Nama Karakter & Etnis/Usia */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-neutral-950/50 border border-neutral-800">
            <div>
              <label className="text-[10px] font-semibold text-neutral-400 block mb-1">
                Nama Karakter:
              </label>
              <input
                type="text"
                value={config.characterName}
                onChange={e => {
                  handleFieldChange('characterName', e.target.value);
                  if (onCharacterNameChange) onCharacterNameChange(e.target.value);
                }}
                placeholder="misal: Sarah / Rian / Model Pilihan"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="text-[10px] font-semibold text-neutral-400 block mb-1">
                Etnis & Rentang Usia:
              </label>
              <input
                type="text"
                value={config.ethnicityAndAge}
                onChange={e => handleFieldChange('ethnicityAndAge', e.target.value)}
                placeholder="misal: Wanita muda Indonesia (usia 21 tahun)"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          {/* Area Input Prompt Wajah Sendiri (Bebas / Kustom) */}
          <div className="p-3.5 rounded-xl bg-violet-950/20 border border-violet-500/30 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-violet-300 flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5" />
                Prompt Wajah Kustom Sendiri (Bebas Masukkan Deskripsi Wajah):
              </label>
              <span className="text-[10px] text-neutral-400">Langsung dimasukkan ke instruksi</span>
            </div>
            <textarea
              value={config.customNotes || ''}
              onChange={e => handleFieldChange('customNotes', e.target.value)}
              rows={3}
              placeholder="Tulis deskripsi wajah karakter Anda sendiri di sini... (misal: Bentuk wajah oval tirus, lesung pipi di kiri, mata cokelat besar berbinar, alis tebal alami, hidung mancung kecil, bibir ranum, rambut hitam lurus sebahu)."
              className="w-full bg-neutral-950 border border-neutral-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-violet-500 leading-relaxed"
            />
          </div>

          {/* Priority Level Buttons */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300 flex items-center justify-between">
              <span>Tingkat Kunci Face Lock:</span>
              <span className="text-[10px] text-neutral-400">Instruksi ke Gemini & AI</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'strict', label: 'Ketat (Strict)', desc: 'Identitas wajah 100% prioritas utama' },
                { id: 'balanced', label: 'Seimbang (Balanced)', desc: 'Identitas terjaga, ekspresi fleksibel' },
                { id: 'flexible', label: 'Fleksibel (Flexible)', desc: 'Kemiripan umum tanpa mengunci total' },
              ].map(level => {
                const isSelected = config.priority === level.id;
                return (
                  <button
                    key={level.id}
                    type="button"
                    onClick={() => handlePriorityChange(level.id as LockPriorityLevel)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-violet-500 bg-violet-950/40 text-white ring-1 ring-violet-500/50'
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

          {/* Area Unggah Foto Referensi Wajah */}
          <div className="p-3.5 rounded-xl border border-neutral-800 bg-neutral-950/50 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-300">
                Foto Referensi Wajah (Bila Ada / Opsional):
              </span>
              <label className="cursor-pointer px-2.5 py-1 bg-violet-950/70 hover:bg-violet-900 border border-violet-800/50 text-violet-200 text-xs rounded-lg flex items-center gap-1 font-semibold transition-all">
                <Upload className="w-3.5 h-3.5" />
                Unggah Foto Wajah
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
                      alt={img.caption || 'Face Reference'}
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
                Belum ada foto referensi wajah yang diunggah. Prompt akan mengandalkan deskripsi teks di atas.
              </p>
            )}
          </div>

          {/* Accordion Rincian Anatomi Wajah Lengkap */}
          <div className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950/30">
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-semibold text-neutral-300 hover:text-white"
            >
              <span className="flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-violet-400" />
                Rincian Fitur Wajah Spesifik (Mata, Hidung, Bibir, Rambut)
              </span>
              {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showDetails && (
              <div className="p-4 border-t border-neutral-800 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-semibold text-neutral-400 block mb-1">
                      Struktur Tulang & Bentuk Wajah:
                    </label>
                    <input
                      type="text"
                      value={config.facialStructure}
                      onChange={e => handleFieldChange('facialStructure', e.target.value)}
                      placeholder="Bentuk oval, rahang lembut, pipi berisi proporsional"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-violet-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-neutral-400 block mb-1">
                      Detail Kulit & Tanda Unik:
                    </label>
                    <input
                      type="text"
                      value={config.skinDetail}
                      onChange={e => handleFieldChange('skinDetail', e.target.value)}
                      placeholder="Pori-pori mikro nyata, tahi lalat, freckles alami"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-violet-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-neutral-400 block mb-1">
                      Mata & Alis:
                    </label>
                    <input
                      type="text"
                      value={config.eyesAndBrows}
                      onChange={e => handleFieldChange('eyesAndBrows', e.target.value)}
                      placeholder="Mata almond cokelat gelap, kelopak ganda, alis rapi"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-violet-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-neutral-400 block mb-1">
                      Hidung:
                    </label>
                    <input
                      type="text"
                      value={config.noseProfile}
                      onChange={e => handleFieldChange('noseProfile', e.target.value)}
                      placeholder="Batang hidung lurus, ujung hidung membulat halus"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-violet-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-neutral-400 block mb-1">
                      Bibir:
                    </label>
                    <input
                      type="text"
                      value={config.lipsDetail}
                      onChange={e => handleFieldChange('lipsDetail', e.target.value)}
                      placeholder="Bibir penuh lembut kemerahan alami, garis vertikal mikro"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-violet-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-neutral-400 block mb-1">
                      Kacamata (Opsional):
                    </label>
                    <input
                      type="text"
                      value={config.glasses || ''}
                      onChange={e => handleFieldChange('glasses', e.target.value)}
                      placeholder="Kosongkan bila tanpa kacamata, atau isi model kacamata"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-neutral-400 block mb-1">
                    Gaya Rambut & Anak Rambut (Flyaways):
                  </label>
                  <input
                    type="text"
                    value={config.hairAndFlyaways}
                    onChange={e => handleFieldChange('hairAndFlyaways', e.target.value)}
                    placeholder="Rambut hitam/cokelat bergelombang santai dengan helaian anak rambut alami"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-3.5 rounded-xl bg-neutral-950/40 border border-dashed border-neutral-800 text-neutral-400 text-xs flex items-center justify-between">
          <span>Face Lock non-aktif. Karakteristik wajah fleksibel mengikuti deskripsi umum adegan.</span>
          <button
            type="button"
            onClick={handleToggle}
            className="text-violet-400 font-semibold hover:underline text-xs"
          >
            Aktifkan Sekarang →
          </button>
        </div>
      )}
    </div>
  );
};
