'use client';

import React, { useState } from 'react';
import { CharacterSheetConfig, CharacterReferenceImage } from '@/types/photo';
import {
  FileSpreadsheet,
  Upload,
  Trash2,
  CheckCircle2,
  Sparkles,
  Layers,
  HelpCircle,
  Image as ImageIcon,
  Copy,
  Check,
} from 'lucide-react';

interface CharacterSheetPanelProps {
  config: CharacterSheetConfig;
  onChange: (updated: CharacterSheetConfig) => void;
  characterName: string;
}

export const CharacterSheetPanel: React.FC<CharacterSheetPanelProps> = ({
  config,
  onChange,
  characterName,
}) => {
  const [copiedTurnaround, setCopiedTurnaround] = useState(false);

  const handleToggle = () => {
    onChange({
      ...config,
      enabled: !config.enabled,
    });
  };

  const handleSheetTypeChange = (sheetType: CharacterSheetConfig['sheetType']) => {
    onChange({
      ...config,
      sheetType,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.size > 8 * 1024 * 1024) {
      alert(`File ${file.name} melebihi batas 8MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      onChange({
        ...config,
        imageUrl: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    onChange({
      ...config,
      imageUrl: '',
    });
  };

  const sampleTurnaroundPrompt = `Character turnaround model sheet of ${characterName || 'the character'}, 4 multiple angles on single image (full front view, side left profile, side right profile, back view), model sheet, turnaround reference sheet, ultra photorealistic, neutral grey studio background, even soft diffuse lighting, identical facial features, consistent hairstyle and clothing, shot on 50mm lens, 8k resolution, raw photo aesthetic --ar 16:9`;

  const copyTurnaround = () => {
    navigator.clipboard.writeText(sampleTurnaroundPrompt);
    setCopiedTurnaround(true);
    setTimeout(() => setCopiedTurnaround(false), 2000);
  };

  return (
    <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 space-y-4 shadow-xl">
      {/* Header and Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              CHARACTER SHEET / LEMBAR KARAKTER
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                Opsional Bila Ada
              </span>
              {config.enabled && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                  AKTIF
                </span>
              )}
            </h3>
            <p className="text-[11px] text-neutral-400">
              Gunakan lembar referensi multiaxis (turnaround 4 sudut) untuk mengunci karakter secara mutlak
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleToggle}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            config.enabled
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
              : 'bg-neutral-800 text-neutral-400 hover:text-white'
          }`}
        >
          {config.enabled ? '✓ Character Sheet Aktif' : '+ Aktifkan Character Sheet'}
        </button>
      </div>

      {config.enabled ? (
        <div className="space-y-4">
          {/* Tipe Lembar Karakter */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300">
              Pilih Format Lembar Karakter:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'turnaround_4views', label: 'Turnaround 4-View', desc: 'Depan, Samping L/R, Belakang' },
                { id: 'expression_sheet', label: 'Expression Sheet', desc: 'Ragam emosi & senyum' },
                { id: 'full_concept_sheet', label: 'Full Concept Sheet', desc: 'Pose, pakaian & detail mikro' },
                { id: 'custom', label: 'Format Bebas', desc: 'Spesifikasi kustom pengguna' },
              ].map(st => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => handleSheetTypeChange(st.id as CharacterSheetConfig['sheetType'])}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    config.sheetType === st.id
                      ? 'border-cyan-500 bg-cyan-950/40 text-white ring-1 ring-cyan-500/50'
                      : 'border-neutral-800 bg-neutral-950/40 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                  }`}
                >
                  <div className="text-xs font-bold">{st.label}</div>
                  <div className="text-[10px] text-neutral-400 line-clamp-1 mt-0.5">{st.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Area Unggah Gambar Character Sheet */}
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/60 space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-cyan-400" />
                  File Gambar Lembar Karakter (Bila Sudah Punya)
                </h4>
                <p className="text-[11px] text-neutral-400">
                  Unggah foto turnaround sheet 4 sudut karakter Anda (PNG, JPG hingga 8MB)
                </p>
              </div>

              <label className="cursor-pointer px-3 py-1.5 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-800/60 text-cyan-200 text-xs rounded-xl flex items-center gap-1.5 font-semibold transition-all">
                <Upload className="w-3.5 h-3.5" />
                Unggah File Sheet
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </div>

            {config.imageUrl ? (
              <div className="relative rounded-xl overflow-hidden border border-cyan-500/40 bg-neutral-950 max-h-64 flex items-center justify-center p-2 group">
                <img
                  src={config.imageUrl}
                  alt="Character Sheet Reference"
                  className="max-h-56 object-contain rounded-lg shadow-lg"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-3 right-3 p-1.5 bg-red-600/90 hover:bg-red-600 text-white rounded-lg shadow-md transition-all flex items-center gap-1 text-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Hapus
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-dashed border-neutral-800 text-center space-y-1.5">
                <p className="text-xs text-neutral-400">
                  Belum ada gambar character sheet yang diunggah.
                </p>
                <p className="text-[11px] text-neutral-500">
                  Jika belum punya, Anda dapat menggunakan prompt turnaround di bawah untuk membuatnya di Midjourney / Flux!
                </p>
              </div>
            )}
          </div>

          {/* Generator Prompt Turnaround Bantuan */}
          <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Prompt Khusus Membuat Turnaround Sheet (Midjourney / Flux / Ideogram):
              </span>
              <button
                type="button"
                onClick={copyTurnaround}
                className="text-[11px] text-neutral-300 hover:text-white flex items-center gap-1 font-semibold px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700"
              >
                {copiedTurnaround ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    Tersalin!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Salin Prompt Sheet
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-neutral-300 font-mono bg-neutral-900/90 p-2.5 rounded-lg border border-neutral-800/80 leading-relaxed">
              {sampleTurnaroundPrompt}
            </p>
          </div>

          {/* Deskripsi & Catatan Tambahan */}
          <div>
            <label className="text-[11px] font-semibold text-neutral-300 block mb-1">
              Catatan Konsistensi Lembar Karakter:
            </label>
            <textarea
              value={config.sheetDescription || ''}
              onChange={e => onChange({ ...config, sheetDescription: e.target.value })}
              rows={2}
              placeholder="Instruksi tambahan mengenai konsistensi ciri fisik, pakaian, atau sudut karakter..."
              className="w-full bg-neutral-950 border border-neutral-800 focus:border-cyan-500 rounded-xl p-2.5 text-xs text-white focus:outline-none"
            />
          </div>
        </div>
      ) : (
        <div className="p-3.5 rounded-xl bg-neutral-950/40 border border-dashed border-neutral-800 text-neutral-400 text-xs flex items-center justify-between">
          <span>Character Sheet non-aktif. Menggunakan prompt bebas tanpa lembar multiaxis terpisah.</span>
          <button
            type="button"
            onClick={handleToggle}
            className="text-cyan-400 font-semibold hover:underline text-xs"
          >
            Aktifkan Sekarang →
          </button>
        </div>
      )}
    </div>
  );
};
