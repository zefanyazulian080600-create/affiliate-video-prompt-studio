'use client';

import React, { useState } from 'react';
import {
  PosterInputData,
  PosterOutfitItem,
  PosterGeneratedResult,
} from '@/types/poster';
import {
  generatePosterPrompt,
  DEFAULT_POSTER_PRESET,
} from '@/lib/poster-engine/poster-generator';
import { PosterResultsView } from './PosterResultsView';
import {
  Sparkles,
  Plus,
  Trash2,
  Upload,
  Lock,
  Flame,
  RotateCcw,
  ShoppingBag,
  Tag,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const PosterGeneratorForm: React.FC = () => {
  const [formData, setFormData] = useState<PosterInputData>(DEFAULT_POSTER_PRESET);
  const [result, setResult] = useState<PosterGeneratedResult | null>(() =>
    generatePosterPrompt(DEFAULT_POSTER_PRESET)
  );

  const handleAddItem = () => {
    if (formData.items.length >= 5) return;
    const nextNum = formData.items.length + 1;
    const newItem: PosterOutfitItem = {
      id: `item-${Date.now()}`,
      name: `ITEM 0${nextNum}`,
      detail: 'MATERIAL / WARNA',
      price: 'Rp -',
    };
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  const handleRemoveItem = (id: string) => {
    if (formData.items.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(it => it.id !== id),
    }));
  };

  const handleUpdateItem = (
    id: string,
    field: keyof PosterOutfitItem,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(it => (it.id === id ? { ...it, [field]: value } : it)),
    }));
  };

  const handleFileUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFormData(prev => ({
        ...prev,
        items: prev.items.map(it =>
          it.id === id
            ? {
                ...it,
                photoUrl: reader.result as string,
                photoName: file.name,
              }
            : it
        ),
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const res = generatePosterPrompt(formData);
    setResult(res);
  };

  const handleLoadDefault = () => {
    setFormData(DEFAULT_POSTER_PRESET);
    setResult(generatePosterPrompt(DEFAULT_POSTER_PRESET));
  };

  const handleReset = () => {
    const blank: PosterInputData = {
      subtitle: 'Coba lo liat !!!',
      clickbaitHeadline: '',
      punchlineLine1: 'SEKARANG KERENAN',
      punchlineLine2: 'MONYET INI APA ELU?',
      ctaBadge: 'KUY CEK LINK DI BIO',
      stampText: 'KAMU KEREN',
      shopeeBioLink: '',
      items: [
        {
          id: 'item-1',
          name: '',
          detail: '',
          price: 'Rp ',
        },
      ],
    };
    setFormData(blank);
    setResult(null);
  };

  return (
    <div className="space-y-10">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-amber-950/50 via-studio-surface to-neutral-900 border border-amber-600/30 rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="amber" size="sm">
                <Flame className="w-3 h-3 mr-1 text-amber-400" />
                Fitur Baru: Poster Generator
              </Badge>
              <Badge variant="violet" size="sm">
                Format 4:5 Vertikal
              </Badge>
              <Badge variant="emerald" size="sm">
                Foto Outfit Masuk ➔ Poster Jadi
              </Badge>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight uppercase">
              LOGIKA ANAK BEKASI{' '}
              <span className="text-amber-400 text-lg md:text-2xl font-bold">
                POSTER STUDIO 🐵
              </span>
            </h1>
            <p className="text-xs md:text-sm text-studio-muted max-w-3xl leading-relaxed">
              Ubah foto outfit affiliate Shopee Anda menjadi poster viral katalog profesional
              dengan model monyet macaque streetwear yang ikonik dan kartu breakdown harga yang rapi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleLoadDefault}
              className="text-xs border-amber-500/40 hover:border-amber-400 text-amber-300"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              Muat Contoh Preset (5 Item)
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleReset}
              className="text-xs text-studio-muted hover:text-white"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              Reset Form
            </Button>
          </div>
        </div>
      </div>

      {/* INPUT FORM (BAGIAN A) */}
      <div className="bg-studio-surface border border-studio-border rounded-3xl p-6 md:p-8 shadow-xl space-y-8">
        <div className="flex items-center justify-between border-b border-studio-border pb-4">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              BAGIAN A — Input Data Outfit & Kartu Produk
            </h2>
            <p className="text-xs text-studio-muted mt-0.5">
              Masukkan foto & rincian tiap item outfit (Mendukung 1 sampai 5 item produk fleksibel).
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
            {formData.items.length}/5 Kartu Aktif
          </span>
        </div>

        {/* CHARACTER REFERENCE (LOCKED) NOTICE */}
        <div className="bg-neutral-900/80 border border-neutral-700/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center shrink-0 text-2xl">
              🐵
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">Foto Karakter Talent:</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-950/70 text-red-300 border border-red-700/50 flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" /> LOCKED
                </span>
              </div>
              <p className="text-xs text-studio-muted mt-0.5">
                Model menggunakan foto referensi Long-tailed macaque monkey streetwear pose tegak
                (dikunci agar karakter konsisten di setiap episode).
              </p>
            </div>
          </div>
          <Badge variant="amber" size="sm" className="shrink-0 self-start sm:self-auto">
            Referensi Terkunci
          </Badge>
        </div>

        {/* OUTFIT ITEMS LIST (CARD 01 - CARD 05) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-studio-text uppercase tracking-wider">
              Daftar Kartu Produk Outfit
            </span>
            {formData.items.length < 5 && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleAddItem}
                className="text-xs border-amber-500/40 text-amber-300 hover:bg-amber-400/10"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                Tambah Item (Maks 5)
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.items.map((item, index) => {
              const cardNum = String(index + 1).padStart(2, '0');
              return (
                <div
                  key={item.id}
                  className="bg-studio-card border border-studio-border hover:border-amber-500/40 rounded-2xl p-4 space-y-3 transition-all relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-black text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                      CARD {cardNum}
                    </span>
                    {formData.items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-studio-muted hover:text-red-400 p-1 transition-colors"
                        title="Hapus kartu ini"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-12 gap-3 items-center">
                    {/* PHOTO UPLOAD / PREVIEW */}
                    <div className="col-span-4 sm:col-span-3">
                      <label className="block text-[10px] text-studio-muted mb-1">
                        Foto Item
                      </label>
                      <div className="relative w-full aspect-square rounded-xl bg-neutral-900 border border-dashed border-studio-border hover:border-amber-400/60 flex flex-col items-center justify-center overflow-hidden cursor-pointer group/img">
                        {item.photoUrl ? (
                          <img
                            src={item.photoUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center p-1">
                            <Upload className="w-4 h-4 mx-auto text-studio-muted group-hover/img:text-amber-400 transition-colors" />
                            <span className="text-[8px] text-studio-muted block mt-1">
                              Upload
                            </span>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={e => handleFileUpload(item.id, e)}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* FIELDS: NAMA, DETAIL, HARGA */}
                    <div className="col-span-8 sm:col-span-9 space-y-2">
                      <div>
                        <label className="block text-[10px] text-studio-muted mb-0.5">
                          Nama Item (misal: OVERSIZED TEE)
                        </label>
                        <input
                          type="text"
                          value={item.name}
                          onChange={e =>
                            handleUpdateItem(item.id, 'name', e.target.value.toUpperCase())
                          }
                          placeholder="OVERSIZED TEE"
                          className="w-full bg-studio-bg border border-studio-border focus:border-amber-400 rounded-lg px-2.5 py-1.5 text-xs text-white uppercase font-bold focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] text-studio-muted mb-0.5">
                            Detail/Bahan (misal: BLACK COTTON)
                          </label>
                          <input
                            type="text"
                            value={item.detail}
                            onChange={e =>
                              handleUpdateItem(item.id, 'detail', e.target.value.toUpperCase())
                            }
                            placeholder="BLACK COTTON"
                            className="w-full bg-studio-bg border border-studio-border focus:border-amber-400 rounded-lg px-2.5 py-1.5 text-xs text-white uppercase focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-studio-muted mb-0.5">
                            Harga (misal: Rp 59.000)
                          </label>
                          <input
                            type="text"
                            value={item.price}
                            onChange={e =>
                              handleUpdateItem(item.id, 'price', e.target.value)
                            }
                            placeholder="Rp 59.000"
                            className="w-full bg-studio-bg border border-studio-border focus:border-amber-400 rounded-lg px-2.5 py-1.5 text-xs text-amber-300 font-mono font-bold focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CLICKBAIT & PUNCHLINE CUSTOMIZATION */}
        <div className="pt-4 border-t border-studio-border space-y-4">
          <span className="text-xs font-bold text-studio-text uppercase tracking-wider block">
            Pengaturan Teks & Punchline Poster
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-studio-muted mb-1">
                Judul Clickbait (Opsional)
              </label>
              <input
                type="text"
                value={formData.clickbaitHeadline}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    clickbaitHeadline: e.target.value.toUpperCase(),
                  }))
                }
                placeholder="JANGAN SCROLL DULU!"
                className="w-full bg-studio-bg border border-studio-border focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white uppercase focus:outline-none"
              />
              <span className="text-[10px] text-studio-muted mt-0.5 block">
                Kosongkan jika ingin memakai judul standar.
              </span>
            </div>

            <div>
              <label className="block text-xs text-studio-muted mb-1">
                Subtitle (Default: Coba lo liat !!!)
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={e =>
                  setFormData(prev => ({ ...prev, subtitle: e.target.value }))
                }
                placeholder="Coba lo liat !!!"
                className="w-full bg-studio-bg border border-studio-border focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-studio-muted mb-1">
                Teks Stamp Badge (Default: KAMU KEREN)
              </label>
              <input
                type="text"
                value={formData.stampText}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    stampText: e.target.value.toUpperCase(),
                  }))
                }
                placeholder="KAMU KEREN"
                className="w-full bg-studio-bg border border-studio-border focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-amber-300 uppercase font-bold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-studio-muted mb-1">
                Punchline Baris 1 (Default: SEKARANG KERENAN)
              </label>
              <input
                type="text"
                value={formData.punchlineLine1}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    punchlineLine1: e.target.value.toUpperCase(),
                  }))
                }
                placeholder="SEKARANG KERENAN"
                className="w-full bg-studio-bg border border-studio-border focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white uppercase font-bold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-studio-muted mb-1">
                Punchline Baris 2 (Default: MONYET INI APA ELU?)
              </label>
              <input
                type="text"
                value={formData.punchlineLine2}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    punchlineLine2: e.target.value.toUpperCase(),
                  }))
                }
                placeholder="MONYET INI APA ELU?"
                className="w-full bg-studio-bg border border-studio-border focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-amber-400 uppercase font-black focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-studio-muted mb-1">
                CTA Badge (Default: KUY CEK LINK DI BIO)
              </label>
              <input
                type="text"
                value={formData.ctaBadge}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    ctaBadge: e.target.value.toUpperCase(),
                  }))
                }
                placeholder="KUY CEK LINK DI BIO"
                className="w-full bg-studio-bg border border-studio-border focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-amber-300 uppercase font-bold focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* GENERATE BUTTON */}
        <div className="pt-4">
          <Button
            variant="primary"
            size="lg"
            onClick={handleGenerate}
            className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-sm md:text-base py-4 rounded-2xl shadow-xl shadow-amber-500/20 transform hover:-translate-y-0.5 transition-all"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            GENERATE POSTER PROMPT LOGIKA ANAK BEKASI
          </Button>
        </div>
      </div>

      {/* RESULTS DISPLAY */}
      {result && (
        <div className="space-y-4">
          <PosterResultsView inputData={formData} result={result} />
        </div>
      )}
    </div>
  );
};
