'use client';

import React, { useState, useEffect } from 'react';
import {
  PhotoGeneratorInput,
  PhotoGeneratedOutput,
  PhotoPresetType,
  PhotoGeneratorMode,
  PhotoRefinementRequest,
} from '@/types/photo';
import {
  DEFAULT_PHOTO_PRESET,
  PHOTO_PRESET_TEMPLATES,
  ANYA_PITALOKA_FACE_LOCK,
  ANYA_PITALOKA_BODY_LOCK,
} from '@/lib/photo-engine/constants';
import { FaceLockPanel } from './FaceLockPanel';
import { BodyLockPanel } from './BodyLockPanel';
import { IPhone13CameraSelector } from './IPhone13CameraSelector';
import { PhotoResultDisplay } from './PhotoResultDisplay';
import {
  Sparkles,
  Camera,
  MapPin,
  Clock,
  Sun,
  Smile,
  Shirt,
  Sliders,
  RotateCcw,
  Zap,
  Loader2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  UserCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const PhotoGeneratorForm: React.FC = () => {
  const [formData, setFormData] = useState<PhotoGeneratorInput>(DEFAULT_PHOTO_PRESET);
  const [result, setResult] = useState<PhotoGeneratedOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [serverStatus, setServerStatus] = useState<{
    isConfigured: boolean;
    modelName: string;
  } | null>(null);

  // Check server Gemini configuration status on mount
  useEffect(() => {
    async function checkStatus() {
      try {
        const res = await fetch('/api/photo/status');
        const json = await res.json();
        if (json.success) {
          setServerStatus({
            isConfigured: json.isConfigured,
            modelName: json.modelName,
          });
        }
      } catch {
        setServerStatus({ isConfigured: false, modelName: 'gemini-2.5-flash' });
      }
    }
    checkStatus();
  }, []);

  // Preset switch handler
  const handlePresetSelect = (presetKey: PhotoPresetType) => {
    const tmpl = PHOTO_PRESET_TEMPLATES[presetKey];
    setFormData(prev => ({
      ...prev,
      preset: presetKey,
      location: tmpl.defaultLocation,
      lightingCondition: tmpl.defaultLighting,
      bodyPose: tmpl.defaultPose,
      outfit: tmpl.defaultOutfit,
      cameraDevice: tmpl.defaultCamera,
      cameraDistance: tmpl.defaultDistance,
    }));
  };

  // Reset to default
  const handleResetToDefault = () => {
    setFormData(DEFAULT_PHOTO_PRESET);
    setErrorMessage(null);
  };

  // Generate Prompt execution
  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/photo/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Gagal memproses prompt fotografi.');
      }

      setResult(json.data);

      // Save to localStorage history
      try {
        const existing = JSON.parse(localStorage.getItem('photo_prompt_history') || '[]');
        const updated = [json.data, ...existing.slice(0, 19)];
        localStorage.setItem('photo_prompt_history', JSON.stringify(updated));
      } catch {
        // ignore localStorage errors
      }

      // Smooth scroll to result
      setTimeout(() => {
        const el = document.getElementById('photo-result-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      console.error('Error generating photo prompt:', err);
      setErrorMessage(err.message || 'Terjadi kesalahan jaringan.');
    } finally {
      setIsLoading(false);
    }
  };

  // Refine handler
  const handleRefine = async (
    action: PhotoRefinementRequest['refinementAction'],
    customText?: string
  ) => {
    if (!result || isRefining) return;
    setIsRefining(true);

    try {
      const res = await fetch('/api/photo/refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPrompt: result,
          refinementAction: action,
          customInstruction: customText,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Gagal menyempurnakan prompt.');
      }

      setResult(json.data);
    } catch (err: any) {
      alert(`Gagal perbaikan: ${err.message}`);
    } finally {
      setIsRefining(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Top Banner / System Status */}
      <div className="bg-gradient-to-r from-violet-950/60 via-neutral-900 to-indigo-950/50 border border-violet-500/30 rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/40">
                MASTER PROMPT PHOTO GENERATOR
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800/60 flex items-center gap-1">
                <Camera className="w-3 h-3" /> iPhone 13 Realism
              </span>
              {serverStatus && (
                <span
                  className={`text-xs font-mono px-2 py-0.5 rounded flex items-center gap-1 border ${
                    serverStatus.isConfigured
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60'
                      : 'bg-amber-950/80 text-amber-300 border-amber-800/60'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      serverStatus.isConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                    }`}
                  />
                  {serverStatus.isConfigured ? `Gemini Online (${serverStatus.modelName})` : 'Offline Deterministic'}
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
              AI Photography Prompt Studio{' '}
              <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-pink-300 bg-clip-text text-transparent">
                Natural & Konsisten
              </span>
            </h1>

            <p className="text-xs md:text-sm text-neutral-300 leading-relaxed">
              Rancang prompt fotografi ultra-realistis dengan penguncian wajah (Face Lock) dan proporsi tubuh (Body Lock).
              Estetika autentik smartphone iPhone 13 — 100% bebas dari kulit plastik AI!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleResetToDefault}
              className="text-xs border-violet-500/40 text-violet-300 hover:bg-violet-950/30"
            >
              <UserCheck className="w-3.5 h-3.5 mr-1" />
              Muat Preset Anya Pitaloka
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleResetToDefault}
              className="text-xs text-neutral-400 hover:text-white"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-neutral-900/90 border border-neutral-800 rounded-2xl">
        {[
          { key: 'quick', label: '⚡ Quick Generate', desc: 'Pilih preset & langsung jadi' },
          { key: 'expert', label: '🎛️ Expert Mode', desc: 'Kendali mendalam optik & adegan' },
          { key: 'reference', label: '🛡️ Reference-Based Mode', desc: 'Fokus penguncian karakter' },
          { key: 'custom', label: '✍️ Custom Scene', desc: 'Konsep bebas Bahasa Indonesia' },
        ].map(m => (
          <button
            key={m.key}
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, mode: m.key as PhotoGeneratorMode }))}
            className={`flex-1 min-w-[140px] px-4 py-2.5 rounded-xl text-left transition-all ${
              formData.mode === m.key
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold shadow-lg shadow-violet-900/30'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <div className="text-xs font-bold">{m.label}</div>
            <div className="text-[10px] text-neutral-300 mt-0.5 line-clamp-1 opacity-80">{m.desc}</div>
          </button>
        ))}
      </div>

      {/* Preset Carousel / Grid */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
          Pilih Preset Jenis Foto:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {Object.entries(PHOTO_PRESET_TEMPLATES).map(([key, item]) => {
            const isSelected = formData.preset === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handlePresetSelect(key as PhotoPresetType)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-violet-500 bg-violet-950/40 text-white shadow-sm ring-1 ring-violet-500/50'
                    : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                }`}
              >
                <div className="text-xs font-bold flex items-center justify-between">
                  <span>{item.label}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" />}
                </div>
                <div className="text-[10px] text-neutral-400 mt-1 line-clamp-2">
                  {item.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* FORM INPUT SECTIONS */}
      <form onSubmit={handleGenerate} className="space-y-8">
        {/* FACE LOCK PANEL (BAGIAN D) */}
        <FaceLockPanel
          config={formData.faceLock}
          onChange={updated => setFormData(prev => ({ ...prev, faceLock: updated }))}
        />

        {/* BODY LOCK PANEL (BAGIAN E) */}
        <BodyLockPanel
          config={formData.bodyLock}
          onChange={updated => setFormData(prev => ({ ...prev, bodyLock: updated }))}
        />

        {/* iPHONE 13 CAMERA & OPTICS ENGINE (BAGIAN H) */}
        <IPhone13CameraSelector
          cameraDevice={formData.cameraDevice}
          cameraAngle={formData.cameraAngle}
          cameraDistance={formData.cameraDistance}
          aspectRatio={formData.aspectRatio}
          realismIntensity={formData.realismIntensity}
          onChange={fields => setFormData(prev => ({ ...prev, ...fields }))}
        />

        {/* SCENE & ENVIRONMENT DETAILS (BAGIAN G) */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 space-y-5 shadow-xl">
          <div className="flex items-center gap-2.5 border-b border-neutral-800 pb-3">
            <div className="w-9 h-9 rounded-xl bg-pink-600/20 border border-pink-500/40 flex items-center justify-center text-pink-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Pengaturan Adegan, Pakaian & Tata Cahaya
              </h3>
              <p className="text-[11px] text-neutral-400">
                Tentukan lingkungan, ekspresi, pakaian, dan interaksi karakter
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Lokasi */}
            <div>
              <label className="text-[11px] font-semibold text-neutral-300 block mb-1">
                Lokasi Pemotretan:
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="misal: Kafe semi-outdoor di Jakarta Selatan"
                className="w-full bg-neutral-950 border border-neutral-700 focus:border-violet-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>

            {/* Waktu & Tata Cahaya */}
            <div>
              <label className="text-[11px] font-semibold text-neutral-300 block mb-1">
                Waktu & Tata Cahaya (Lighting):
              </label>
              <input
                type="text"
                value={formData.lightingCondition}
                onChange={e => setFormData(prev => ({ ...prev, lightingCondition: e.target.value }))}
                placeholder="misal: Cahaya matahari sore hangat (golden hour) dari samping"
                className="w-full bg-neutral-950 border border-neutral-700 focus:border-violet-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>

            {/* Pose Tubuh */}
            <div>
              <label className="text-[11px] font-semibold text-neutral-300 block mb-1">
                Pose & Bahasa Tubuh:
              </label>
              <input
                type="text"
                value={formData.bodyPose}
                onChange={e => setFormData(prev => ({ ...prev, bodyPose: e.target.value }))}
                placeholder="misal: Berdiri santai bahu rileks, tangan memegang tali tas"
                className="w-full bg-neutral-950 border border-neutral-700 focus:border-violet-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>

            {/* Ekspresi Wajah & Pandangan */}
            <div>
              <label className="text-[11px] font-semibold text-neutral-300 block mb-1">
                Ekspresi Wajah & Arah Pandangan:
              </label>
              <input
                type="text"
                value={formData.facialExpression}
                onChange={e => setFormData(prev => ({ ...prev, facialExpression: e.target.value }))}
                placeholder="misal: Senyum manis tipis tertutup, tatapan ramah ke arah kamera"
                className="w-full bg-neutral-950 border border-neutral-700 focus:border-violet-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>

            {/* Pakaian (Outfit) */}
            <div>
              <label className="text-[11px] font-semibold text-neutral-300 block mb-1">
                Pakaian (Outfit):
              </label>
              <input
                type="text"
                value={formData.outfit}
                onChange={e => setFormData(prev => ({ ...prev, outfit: e.target.value }))}
                placeholder="misal: Cardigan rajut oatmeal, tanktop katun putih, celana jeans relaxed"
                className="w-full bg-neutral-950 border border-neutral-700 focus:border-violet-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>

            {/* Aksesoris */}
            <div>
              <label className="text-[11px] font-semibold text-neutral-300 block mb-1">
                Aksesoris & Properti:
              </label>
              <input
                type="text"
                value={formData.accessories}
                onChange={e => setFormData(prev => ({ ...prev, accessories: e.target.value }))}
                placeholder="misal: Kacamata optik bingkai logam tipis gunmetal, tote bag kain krem"
                className="w-full bg-neutral-950 border border-neutral-700 focus:border-violet-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Skenario Khusus (Custom Mode) */}
          {formData.mode === 'custom' && (
            <div className="pt-2 border-t border-neutral-800">
              <label className="text-[11px] font-semibold text-violet-300 block mb-1">
                Instruksi Skenario Kustom (Bahasa Indonesia Bebas):
              </label>
              <textarea
                value={formData.customScenePrompt || ''}
                onChange={e => setFormData(prev => ({ ...prev, customScenePrompt: e.target.value }))}
                rows={3}
                placeholder="Jelaskan konsep pemotretan Anda secara rinci dalam Bahasa Indonesia..."
                className="w-full bg-neutral-950 border border-violet-500/50 rounded-xl p-3 text-xs text-white focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Error notification if any */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* SUBMIT / GENERATE BUTTON */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className="text-xs text-neutral-400">
            Prompt dihasilkan dalam Bahasa Indonesia naratif terstruktur, siap disalin ke Midjourney / Flux / Ideogram.
          </p>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isLoading}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-black text-sm shadow-xl shadow-violet-900/40 rounded-2xl"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Merancang Prompt Fotografi...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Photo Prompt
              </>
            )}
          </Button>
        </div>
      </form>

      {/* RESULT SECTION */}
      {result && (
        <div id="photo-result-section" className="pt-6">
          <PhotoResultDisplay
            result={result}
            onRefine={handleRefine}
            isRefining={isRefining}
          />
        </div>
      )}
    </div>
  );
};
