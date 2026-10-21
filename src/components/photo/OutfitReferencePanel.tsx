'use client';

import React, { useState } from 'react';
import {
  OutfitReferenceConfig,
  LockPriorityLevel,
  OutfitReferencePreset,
  CharacterReferenceImage,
} from '@/types/photo';
import {
  OUTFIT_REFERENCE_PRESETS,
  OUTFIT_CATEGORIES,
  getOutfitPresetById,
} from '@/lib/photo-engine/outfit-presets';
import {
  Shirt,
  CheckCircle2,
  Upload,
  Trash2,
  Sparkles,
  Sliders,
  ChevronDown,
  ChevronUp,
  Search,
  Tag,
} from 'lucide-react';

interface OutfitReferencePanelProps {
  config: OutfitReferenceConfig;
  onChange: (updated: OutfitReferenceConfig) => void;
  onApplyToSceneOutfit?: (fullText: string, accessoriesText?: string) => void;
}

export const OutfitReferencePanel: React.FC<OutfitReferencePanelProps> = ({
  config,
  onChange,
  onApplyToSceneOutfit,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCustomizer, setShowCustomizer] = useState<boolean>(false);

  const handleToggle = () => {
    onChange({
      ...config,
      enabled: !config.enabled,
    });
  };

  const handlePriorityChange = (priority: LockPriorityLevel) => {
    onChange({ ...config, priority });
  };

  const handleSelectPreset = (preset: OutfitReferencePreset) => {
    const updated: OutfitReferenceConfig = {
      ...config,
      enabled: true,
      presetId: preset.id,
      presetName: preset.name,
      category: preset.category,
      itemDetails: { ...preset.details },
      fullDescription: preset.fullDescription,
    };
    onChange(updated);

    if (onApplyToSceneOutfit) {
      onApplyToSceneOutfit(preset.fullDescription, preset.details.bagAndAccessories);
    }
  };

  const handleItemDetailChange = (field: keyof OutfitReferenceConfig['itemDetails'], val: string) => {
    const updatedDetails = {
      ...config.itemDetails,
      [field]: val,
    };
    onChange({
      ...config,
      itemDetails: updatedDetails,
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
          id: `outfit-ref-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
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

  // Filter presets
  const filteredPresets = OUTFIT_REFERENCE_PRESETS.filter(p => {
    const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  return (
    <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 space-y-5 shadow-xl">
      {/* Header & Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Shirt className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              REFERENSI OUTFIT & BUSANA
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
              Pilih dari katalog referensi outfit lengkap atau racik busana Anda sendiri
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleToggle}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            config.enabled
              ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
              : 'bg-neutral-800 text-neutral-400 hover:text-white'
          }`}
        >
          {config.enabled ? '✓ Outfit Ref Aktif' : '+ Aktifkan Referensi Outfit'}
        </button>
      </div>

      {config.enabled ? (
        <div className="space-y-4">
          {/* Priority Level Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300 flex items-center justify-between">
              <span>Tingkat Kunci Konsistensi Outfit:</span>
              <span className="text-[10px] text-neutral-400">Berapa ketat busana dipertahankan</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'strict', label: 'Ketat (Strict)', desc: 'Warna, bahan & potongan 100% terkunci' },
                { id: 'balanced', label: 'Seimbang (Balanced)', desc: 'Menjaga gaya dengan adaptasi pose' },
                { id: 'flexible', label: 'Fleksibel (Flexible)', desc: 'Inspirasi tema busana bebas' },
              ].map(lvl => (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => handlePriorityChange(lvl.id as LockPriorityLevel)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    config.priority === lvl.id
                      ? 'border-amber-500 bg-amber-950/30 text-white ring-1 ring-amber-500/50'
                      : 'border-neutral-800 bg-neutral-950/40 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                  }`}
                >
                  <div className="text-xs font-bold">{lvl.label}</div>
                  <div className="text-[10px] text-neutral-400 line-clamp-1 mt-0.5">{lvl.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Preset Banner if any */}
          {config.presetName && (
            <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-center justify-between gap-3">
              <div className="text-xs">
                <span className="text-neutral-400">Outfit Terpilih: </span>
                <strong className="text-amber-300">{config.presetName}</strong>
              </div>
              <button
                type="button"
                onClick={() => setShowCustomizer(!showCustomizer)}
                className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <Sliders className="w-3.5 h-3.5" />
                {showCustomizer ? 'Tutup Kustomisasi' : 'Kustomisasi Item'}
              </button>
            </div>
          )}

          {/* Search & Categories Tabs */}
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Cari gaya outfit, bahan, atau kata kunci (misal: denim, blazer, linen, knit)..."
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-amber-600 text-white'
                      : 'bg-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  Semua ({OUTFIT_REFERENCE_PRESETS.length})
                </button>
                {OUTFIT_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-amber-600 text-white'
                        : 'bg-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-[360px] overflow-y-auto pr-1">
              {filteredPresets.map(preset => {
                const isSelected = config.presetId === preset.id;
                return (
                  <div
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-amber-500 bg-amber-950/40 text-white shadow-md ring-1 ring-amber-500/50'
                        : 'border-neutral-800 bg-neutral-950/60 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-amber-300">
                          {preset.categoryLabel}
                        </span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                      </div>
                      <h4 className="text-xs font-bold text-white line-clamp-1">{preset.name}</h4>
                      <p className="text-[11px] text-neutral-400 line-clamp-2 mt-1 leading-snug">
                        {preset.description}
                      </p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-neutral-800/70 flex flex-wrap gap-1">
                      {preset.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Customizer Section (Accordion) */}
          <div className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950/50">
            <button
              type="button"
              onClick={() => setShowCustomizer(!showCustomizer)}
              className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-semibold text-neutral-300 hover:text-white"
            >
              <span className="flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                Rincian Item Pakaian & Unggah Foto Referensi Busana (Opsional)
              </span>
              {showCustomizer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showCustomizer && (
              <div className="p-4 border-t border-neutral-800 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-semibold text-neutral-400 block mb-1">
                      Atasan (Top):
                    </label>
                    <input
                      type="text"
                      value={config.itemDetails.top || ''}
                      onChange={e => handleItemDetailChange('top', e.target.value)}
                      placeholder="misal: Fitted ribbed crop tanktop warna putih"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-neutral-400 block mb-1">
                      Bawahan (Bottom):
                    </label>
                    <input
                      type="text"
                      value={config.itemDetails.bottom || ''}
                      onChange={e => handleItemDetailChange('bottom', e.target.value)}
                      placeholder="misal: Celana jeans relaxed straight-leg biru pudar"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-neutral-400 block mb-1">
                      Luaran / Outer (Opsional):
                    </label>
                    <input
                      type="text"
                      value={config.itemDetails.outer || ''}
                      onChange={e => handleItemDetailChange('outer', e.target.value)}
                      placeholder="misal: Cardigan rajut warna oatmeal lembut"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-neutral-400 block mb-1">
                      Alas Kaki (Footwear / Shoes):
                    </label>
                    <input
                      type="text"
                      value={config.itemDetails.shoes || ''}
                      onChange={e => handleItemDetailChange('shoes', e.target.value)}
                      placeholder="misal: Sneakers kanvas putih bersih bertali katun"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-neutral-400 block mb-1">
                      Tas & Aksesoris Busana:
                    </label>
                    <input
                      type="text"
                      value={config.itemDetails.bagAndAccessories || ''}
                      onChange={e => handleItemDetailChange('bagAndAccessories', e.target.value)}
                      placeholder="misal: Tote bag katun kanvas krem, jam tangan kulit tipis"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-neutral-400 block mb-1">
                      Material / Bahan & Tekstur Kain:
                    </label>
                    <input
                      type="text"
                      value={config.itemDetails.fabricTexture || ''}
                      onChange={e => handleItemDetailChange('fabricTexture', e.target.value)}
                      placeholder="misal: Serat rajutan wol chunky, katun ribbed 100%, denim twill tebal"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Deskripsi Lengkap Naratif */}
                <div>
                  <label className="text-[10px] font-semibold text-neutral-400 block mb-1">
                    Deskripsi Lengkap Narasi Outfit (Bebas / Kustom):
                  </label>
                  <textarea
                    value={config.fullDescription}
                    onChange={e => onChange({ ...config, fullDescription: e.target.value })}
                    rows={2}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Unggah Foto Referensi Outfit */}
                <div className="pt-2 border-t border-neutral-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-neutral-300">
                      Foto Referensi Outfit (Opsional):
                    </span>
                    <label className="cursor-pointer px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-amber-300 text-xs rounded-lg flex items-center gap-1 font-semibold transition-all">
                      <Upload className="w-3.5 h-3.5" />
                      Unggah Foto Outfit
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
                            alt={img.caption || 'Outfit Reference'}
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
                      Belum ada foto referensi outfit yang diunggah. Model akan menggunakan deskripsi tekstual di atas.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-3.5 rounded-xl bg-neutral-950/40 border border-dashed border-neutral-800 text-neutral-400 text-xs flex items-center justify-between">
          <span>Referensi outfit non-aktif. Menggunakan pakaian umum dari pilihan adegan di bawah.</span>
          <button
            type="button"
            onClick={handleToggle}
            className="text-amber-400 font-semibold hover:underline text-xs"
          >
            Aktifkan Sekarang →
          </button>
        </div>
      )}
    </div>
  );
};
