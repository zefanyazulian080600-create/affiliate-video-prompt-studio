'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Upload,
  Image as ImageIcon,
  X,
  CheckCircle2,
  AlertCircle,
  Info,
} from 'lucide-react';
import {
  GeneratePromptInput,
  VideoModel,
  ScenePresetDuration,
  ImageFunctionLabel,
  ProductImageReference,
  CharacterReference,
} from '@/types';
import { calculateDurationPlan, WORKFLOW_CONFIGS } from '@/lib/duration-calculator';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface GeneratorFormProps {
  onGenerate: (data: GeneratePromptInput) => void;
  isLoading: boolean;
  initialTemplate?: {
    sampleInput: string;
    targetModel: VideoModel;
    presetSceneDuration: ScenePresetDuration;
    totalDuration: number;
  };
}

export const GeneratorForm: React.FC<GeneratorFormProps> = ({
  onGenerate,
  isLoading,
  initialTemplate,
}) => {
  // A. Product Info State
  const [productInput, setProductInput] = useState<string>(
    initialTemplate?.sampleInput ||
      'Sepatu sneakers pria warna putih, desain minimalis, nyaman untuk aktivitas harian, cocok untuk kuliah dan nongkrong. Target pembeli mahasiswa dan pekerja muda.'
  );

  // B. Character Reference State
  const [hasCharacterRef, setHasCharacterRef] = useState<boolean>(false);
  const [characterName, setCharacterName] = useState<string>('Talent Kreator Shopee');
  const [characterImagePreview, setCharacterImagePreview] = useState<string | null>(null);

  // C. Product Photos State
  const [productImages, setProductImages] = useState<ProductImageReference[]>([
    {
      id: 'mock-1',
      url: '/placeholder-sneaker.jpg',
      fileName: 'sneaker_putih_tampak_depan.jpg',
      fileSize: 1024 * 450,
      isPrimary: true,
      functionLabel: 'front_view',
    },
  ]);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // D. Duration & Workflow State
  const [workflowKey, setWorkflowKey] = useState<string>(
    initialTemplate?.targetModel === 'omni-flash' ? 'omni-10s' : 'seedance-10s'
  );
  const [totalDuration, setTotalDuration] = useState<number>(
    initialTemplate?.totalDuration || 30
  );
  const [isCustomDuration, setIsCustomDuration] = useState<boolean>(false);
  const [customDurationInput, setCustomDurationInput] = useState<number>(30);

  // Derived Workflow & Duration Calculations
  const currentWorkflow = WORKFLOW_CONFIGS[workflowKey] || WORKFLOW_CONFIGS['seedance-10s'];
  const activeTotalDuration = isCustomDuration ? customDurationInput : totalDuration;
  const durationPlan = calculateDurationPlan(
    activeTotalDuration,
    currentWorkflow.model,
    currentWorkflow.presetSceneDuration
  );

  // Handle Product Images Upload (Client-side object URL)
  const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImages: ProductImageReference[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validate type
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        setUploadError(`File '${file.name}' tidak didukung. Harap gunakan format JPEG, PNG, atau WebP.`);
        return;
      }

      // Validate size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        setUploadError(`File '${file.name}' melebihi batas maksimal 10MB.`);
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      newImages.push({
        id: `img-${Date.now()}-${i}`,
        url: previewUrl,
        fileName: file.name,
        fileSize: file.size,
        isPrimary: productImages.length === 0 && i === 0,
        functionLabel: i === 0 ? 'front_view' : 'material_detail',
      });
    }

    setProductImages(prev => [...prev, ...newImages]);
  };

  const removeProductImage = (id: string) => {
    setProductImages(prev => {
      const filtered = prev.filter(img => img.id !== id);
      if (filtered.length > 0 && !filtered.some(img => img.isPrimary)) {
        filtered[0].isPrimary = true;
      }
      return filtered;
    });
  };

  const setPrimaryImage = (id: string) => {
    setProductImages(prev =>
      prev.map(img => ({
        ...img,
        isPrimary: img.id === id,
      }))
    );
  };

  const updateImageLabel = (id: string, label: ImageFunctionLabel) => {
    setProductImages(prev =>
      prev.map(img => (img.id === id ? { ...img, functionLabel: label } : img))
    );
  };

  // Handle Character Upload
  const handleCharacterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setUploadError('Foto karakter harus format JPEG, PNG, atau WebP.');
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setCharacterImagePreview(previewUrl);
    setHasCharacterRef(true);
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productInput.trim()) return;

    let characterReference: CharacterReference | undefined = undefined;
    if (hasCharacterRef && characterImagePreview) {
      characterReference = {
        id: `char-${Date.now()}`,
        url: characterImagePreview,
        fileName: 'character_ref.jpg',
        name: characterName,
        isCustomProvided: true,
      };
    }

    const payload: GeneratePromptInput = {
      productInput: productInput.trim(),
      totalDuration: activeTotalDuration,
      workflowModel: currentWorkflow.model,
      presetSceneDuration: currentWorkflow.presetSceneDuration,
      characterReference,
      productImages,
      languagePreference: 'bilingual',
      enableWebResearch: false,
    };

    onGenerate(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ========================================================
          A. INFORMASI PRODUK
      ======================================================== */}
      <Card className="border-studio-border bg-studio-surface/90">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-violet-600/30 text-violet-300 font-bold text-xs">
              A
            </span>
            <h3 className="font-bold text-base text-studio-text">
              Informasi Produk (Bahasa Bebas)
            </h3>
          </div>
          <span className="text-xs text-studio-muted">Wajib Diisi</span>
        </div>
        <p className="text-xs text-studio-muted mb-3">
          Tulis informasi produk apa adanya. Sistem otomatis mengekstrak nama, kategori, fitur utama, target pembeli, dan batasan klaim.
        </p>

        <textarea
          rows={4}
          value={productInput}
          onChange={e => setProductInput(e.target.value)}
          placeholder="Contoh: Sepatu sneakers pria warna putih, bahan knit breathable, nyaman dipakai jalan seharian, sol empuk anti-licin. Cocok untuk kuliah dan nongkrong. Target mahasiswa dan pekerja muda."
          className="w-full bg-studio-bg border border-studio-border rounded-xl p-3.5 text-sm text-studio-text placeholder-studio-muted focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all resize-y"
          required
        />

        <div className="flex flex-wrap items-center gap-2 mt-2.5 text-[11px] text-studio-muted">
          <span className="text-violet-400 font-semibold">💡 Tips Cerdas:</span>
          <span>Sebutkan warna, fungsi harian, dan siapa target pembelinya untuk hook yang lebih tajam.</span>
        </div>
      </Card>

      {/* ========================================================
          B. CHARACTER REFERENCE (OPSIONAL)
      ======================================================== */}
      <Card className="border-studio-border bg-studio-surface/90">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-blue-600/30 text-blue-300 font-bold text-xs">
              B
            </span>
            <h3 className="font-bold text-base text-studio-text">
              Character Reference (Opsional)
            </h3>
          </div>
          <Badge variant="neutral" size="sm">
            Opsional
          </Badge>
        </div>
        <p className="text-xs text-studio-muted mb-4">
          Unggah foto karakter atau model jika Anda ingin menjaga wajah, rambut, dan pakaian tetap konsisten di setiap scene. Jika dikosongkan, sistem memakai talent default yang sesuai dengan produk.
        </p>

        {!hasCharacterRef ? (
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-studio-card border border-studio-border hover:border-violet-500/50 text-studio-text cursor-pointer transition-colors">
              <Upload className="w-3.5 h-3.5 text-violet-400" />
              Unggah Foto Karakter
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleCharacterUpload}
                className="hidden"
              />
            </label>
            <span className="text-xs text-studio-muted">
              Belum ada foto karakter (Mode default talent aktif)
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-4 bg-studio-bg border border-studio-border rounded-xl p-3">
            {characterImagePreview && (
              <img
                src={characterImagePreview}
                alt="Character Ref"
                className="w-14 h-14 object-cover rounded-lg border border-studio-border"
              />
            )}
            <div className="flex-1 min-w-0">
              <span className="text-xs font-semibold text-studio-text block truncate">
                Foto Karakter Terunggah
              </span>
              <input
                type="text"
                value={characterName}
                onChange={e => setCharacterName(e.target.value)}
                placeholder="Nama / Label Talent"
                className="mt-1 bg-studio-surface border border-studio-border rounded-lg px-2 py-1 text-xs text-studio-text w-full max-w-xs focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setHasCharacterRef(false);
                setCharacterImagePreview(null);
              }}
              className="p-1.5 rounded-lg text-studio-muted hover:text-rose-400 hover:bg-rose-950/20"
              title="Hapus referensi karakter"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </Card>

      {/* ========================================================
          C. FOTO PRODUK
      ======================================================== */}
      <Card className="border-studio-border bg-studio-surface/90">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-600/30 text-emerald-300 font-bold text-xs">
              C
            </span>
            <h3 className="font-bold text-base text-studio-text">
              Foto Produk (Multi-Upload)
            </h3>
          </div>
          <span className="text-xs text-emerald-400 font-medium">
            {productImages.length} Foto Siap
          </span>
        </div>
        <p className="text-xs text-studio-muted mb-4">
          Unggah satu atau beberapa foto produk nyata. Tandai foto utama dan label sudut pandang agar AI video tidak mengubah bentuk, warna, atau logo produk.
        </p>

        {uploadError && (
          <div className="mb-3 p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {uploadError}
          </div>
        )}

        {/* Upload Dropzone */}
        <label className="border-2 border-dashed border-studio-border hover:border-violet-500/60 bg-studio-bg/60 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all group">
          <Upload className="w-6 h-6 text-studio-muted group-hover:text-violet-400 transition-colors mb-1.5" />
          <span className="text-xs font-semibold text-studio-text">
            Klik atau seret foto produk ke sini
          </span>
          <span className="text-[11px] text-studio-muted mt-0.5">
            Format JPEG, PNG, atau WebP (Maks. 10MB per file)
          </span>
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            onChange={handleProductImageUpload}
            className="hidden"
          />
        </label>

        {/* Uploaded List */}
        {productImages.length > 0 && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {productImages.map(img => (
              <div
                key={img.id}
                className={`relative flex items-center gap-3 p-2.5 rounded-xl border bg-studio-bg transition-all ${
                  img.isPrimary
                    ? 'border-violet-500/70 ring-1 ring-violet-500/40'
                    : 'border-studio-border'
                }`}
              >
                <div className="relative w-12 h-12 rounded-lg bg-studio-card border border-studio-border flex items-center justify-center overflow-hidden flex-shrink-0">
                  <ImageIcon className="w-6 h-6 text-studio-muted" />
                </div>

                <div className="flex-1 min-w-0 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-studio-text truncate block">
                      {img.fileName}
                    </span>
                    {img.isPrimary && (
                      <Badge variant="violet" size="sm">
                        Foto Utama
                      </Badge>
                    )}
                  </div>

                  {/* Function Label Selector */}
                  <div className="mt-1 flex items-center gap-2">
                    <select
                      value={img.functionLabel}
                      onChange={e => updateImageLabel(img.id, e.target.value as ImageFunctionLabel)}
                      className="bg-studio-surface border border-studio-border rounded-md px-1.5 py-0.5 text-[11px] text-studio-text focus:outline-none"
                    >
                      <option value="front_view">Tampak Depan</option>
                      <option value="side_view">Tampak Samping</option>
                      <option value="material_detail">Detail Bahan</option>
                      <option value="logo_detail">Detail Logo</option>
                      <option value="packaging">Kemasan / Box</option>
                      <option value="in_use">Penggunaan</option>
                    </select>

                    {!img.isPrimary && (
                      <button
                        type="button"
                        onClick={() => setPrimaryImage(img.id)}
                        className="text-[11px] text-violet-400 hover:underline"
                      >
                        Jadikan Utama
                      </button>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeProductImage(img.id)}
                  className="p-1 rounded-lg text-studio-muted hover:text-rose-400 hover:bg-rose-950/20"
                  title="Hapus foto"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* ========================================================
          D. DURASI VIDEO & WORKFLOW
      ======================================================== */}
      <Card className="border-studio-border bg-studio-surface/90">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-amber-600/30 text-amber-300 font-bold text-xs">
              D
            </span>
            <h3 className="font-bold text-base text-studio-text">
              Durasi Video & Workflow AI Model
            </h3>
          </div>
          <span className="text-xs text-studio-muted">Preset Terverifikasi</span>
        </div>
        <p className="text-xs text-studio-muted mb-4">
          Pilih tool AI video tujuan dan durasi total keseluruhan video. Sistem menghitung pembagian scene dan durasi sisa secara transparan.
        </p>

        {/* Workflow Model Preset Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {Object.entries(WORKFLOW_CONFIGS).map(([key, config]) => (
            <div
              key={key}
              onClick={() => setWorkflowKey(key)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                workflowKey === key
                  ? 'border-violet-500 bg-violet-950/30 shadow-md shadow-violet-950/40 ring-1 ring-violet-500'
                  : 'border-studio-border bg-studio-bg/70 hover:border-studio-borderHover'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-studio-text">
                  {config.modelLabel}
                </span>
                {workflowKey === key && <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" />}
              </div>
              <p className="text-[11px] text-studio-muted leading-relaxed line-clamp-2">
                {config.description}
              </p>
            </div>
          ))}
        </div>

        {/* Total Duration Selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-studio-muted uppercase tracking-wider block">
            Pilih Durasi Total Video (Detik):
          </label>
          <div className="flex flex-wrap items-center gap-2">
            {[10, 15, 20, 30, 45, 60].map(dur => (
              <button
                type="button"
                key={dur}
                onClick={() => {
                  setTotalDuration(dur);
                  setIsCustomDuration(false);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  !isCustomDuration && totalDuration === dur
                    ? 'bg-violet-600 text-white border-violet-500 shadow-md shadow-violet-900/30'
                    : 'bg-studio-bg border-studio-border text-studio-muted hover:text-studio-text'
                }`}
              >
                {dur} Detik
              </button>
            ))}

            <button
              type="button"
              onClick={() => setIsCustomDuration(true)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isCustomDuration
                  ? 'bg-violet-600 text-white border-violet-500 shadow-md shadow-violet-900/30'
                  : 'bg-studio-bg border-studio-border text-studio-muted hover:text-studio-text'
              }`}
            >
              Custom Durasi
            </button>
          </div>

          {/* Custom Duration Input */}
          {isCustomDuration && (
            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs text-studio-muted">Masukkan detik (5 - 120s):</span>
              <input
                type="number"
                min={5}
                max={120}
                value={customDurationInput}
                onChange={e => setCustomDurationInput(parseInt(e.target.value) || 10)}
                className="w-24 bg-studio-bg border border-studio-border rounded-xl px-3 py-1.5 text-xs text-studio-text focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
            </div>
          )}
        </div>

        {/* Transparent Calculation Display */}
        <div className="mt-4 p-3.5 rounded-xl bg-studio-card/80 border border-studio-border text-xs space-y-1.5">
          <div className="flex flex-wrap items-center justify-between text-studio-text font-medium">
            <span>Rincian Alokasi Scene:</span>
            <span className="text-violet-300 font-bold">
              {durationPlan.sceneCount} Scene (Total: {durationPlan.sumDuration} Detik)
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {durationPlan.sceneDurations.map((dur, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-studio-bg border border-studio-border text-[11px] text-slate-300"
              >
                Scene {idx + 1}: {dur}s
              </span>
            ))}
          </div>
          {durationPlan.durationWarning && (
            <p className="text-[11px] text-amber-300/90 pt-1 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              {durationPlan.durationWarning}
            </p>
          )}
        </div>
      </Card>

      {/* ========================================================
          BIG ACTION CTA BUTTON
      ======================================================== */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          className="w-full shadow-2xl shadow-violet-900/50 py-4 text-base font-bold tracking-wide"
        >
          <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
          GENERATE AFFILIATE VIDEO PROMPTS
        </Button>
        <p className="text-center text-xs text-studio-muted mt-2">
          Pipeline otomatis: Analisis Produk ➔ Creative Concept ➔ Continuity Bible ➔ Storyboard Scene ➔ Kontrol Kualitas
        </p>
      </div>
    </form>
  );
};
