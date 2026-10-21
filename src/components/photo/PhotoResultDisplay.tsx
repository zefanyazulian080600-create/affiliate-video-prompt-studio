'use client';

import React, { useState } from 'react';
import { PhotoGeneratedOutput, PhotoRefinementRequest } from '@/types/photo';
import {
  Copy,
  Check,
  Sparkles,
  Download,
  Edit3,
  ShieldCheck,
  User,
  Camera,
  RefreshCw,
  Sun,
  MapPin,
  Shirt,
  Wand2,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface PhotoResultDisplayProps {
  result: PhotoGeneratedOutput;
  onRefine: (action: PhotoRefinementRequest['refinementAction'], customText?: string) => Promise<void>;
  isRefining?: boolean;
}

export const PhotoResultDisplay: React.FC<PhotoResultDisplayProps> = ({
  result,
  onRefine,
  isRefining = false,
}) => {
  const [copiedMain, setCopiedMain] = useState(false);
  const [copiedNegative, setCopiedNegative] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMainPrompt, setEditedMainPrompt] = useState(result.mainPrompt);
  const [activeTab, setActiveTab] = useState<'main' | 'negative' | 'settings'>('main');

  const handleCopyMain = () => {
    navigator.clipboard.writeText(isEditing ? editedMainPrompt : result.mainPrompt);
    setCopiedMain(true);
    setTimeout(() => setCopiedMain(false), 2000);
  };

  const handleCopyNegative = () => {
    navigator.clipboard.writeText(result.negativePrompt);
    setCopiedNegative(true);
    setTimeout(() => setCopiedNegative(false), 2000);
  };

  const handleCopyAll = () => {
    const fullPackage = `=== ${result.title.toUpperCase()} ===
Ringkasan: ${result.summary}
Perangkat: ${result.photoSettings.device} (${result.photoSettings.camera})

[PROMPT UTAMA FOTOGRAFI (BAHASA INDONESIA)]:
${isEditing ? editedMainPrompt : result.mainPrompt}

[NEGATIVE PROMPT (ANTI-AI)]:
${result.negativePrompt}

[PENGUNCIAN WAJAH]:
${result.faceLockInstruction}

[PENGUNCIAN TUBUH]:
${result.bodyLockInstruction}
${result.outfitLockInstruction ? `\n[PENGUNCIAN OUTFIT]:\n${result.outfitLockInstruction}\n` : ''}${result.characterSheetInstruction ? `\n[LEMBAR KARAKTER]:\n${result.characterSheetInstruction}\n` : ''}
[PENGATURAN KAMERA & OPTIK]:
- Lensa: ${result.photoSettings.focalLength} (${result.photoSettings.aperture})
- Pencahayaan: ${result.photoSettings.lighting}
- Komposisi: ${result.photoSettings.composition}
- Rasio Aspek: ${result.photoSettings.aspectRatio}
`;
    navigator.clipboard.writeText(fullPackage);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const markdownContent = `# ${result.title}
> ${result.summary}

- **Perangkat**: ${result.photoSettings.device}
- **Kamera**: ${result.photoSettings.camera}
- **Lensa**: ${result.photoSettings.focalLength} (${result.photoSettings.aperture})
- **Rasio Aspek**: ${result.photoSettings.aspectRatio}
- **Model Engine**: ${result.modelUsed}
- **Waktu Generate**: ${new Date(result.timestamp).toLocaleString('id-ID')}

---

## 📸 Prompt Utama Fotografi (Bahasa Indonesia)

\`\`\`text
${isEditing ? editedMainPrompt : result.mainPrompt}
\`\`\`

---

## 🚫 Negative Prompt (Anti-AI)

\`\`\`text
${result.negativePrompt}
\`\`\`

---

## 🛡️ Instruksi Face Lock & Body Lock

### Face Lock:
${result.faceLockInstruction}

### Body Lock:
${result.bodyLockInstruction}

---

## 💡 Catatan Teknis
${result.technicalNotes.map(n => `- ${n}`).join('\n')}
`;

    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${result.title.replace(/\s+/g, '-').toLowerCase()}-prompt.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
      {/* Header Result */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-violet-600/20 text-violet-300 border border-violet-500/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-violet-400" />
              {result.generationSource === 'gemini-api' ? 'Gemini AI Studio' : 'Deterministic Engine'}
            </span>
            <span className="text-xs text-neutral-400 font-mono">
              {new Date(result.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
            {result.title}
          </h2>
          <p className="text-xs md:text-sm text-neutral-400 mt-1">
            {result.summary}
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <Button
            variant="primary"
            size="sm"
            onClick={handleCopyMain}
            className="text-xs bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 font-bold"
          >
            {copiedMain ? (
              <>
                <Check className="w-3.5 h-3.5 mr-1 text-emerald-300" />
                Prompt Tersalin!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 mr-1" />
                Salin Prompt Utama
              </>
            )}
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopyAll}
            className="text-xs border-neutral-700 text-neutral-300 hover:text-white"
          >
            {copiedAll ? <Check className="w-3.5 h-3.5 mr-1" /> : <FileText className="w-3.5 h-3.5 mr-1" />}
            Salin Semua Paket
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleDownloadMarkdown}
            className="text-xs border-neutral-700 text-neutral-300 hover:text-white"
            title="Download Markdown"
          >
            <Download className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-800">
        <button
          type="button"
          onClick={() => setActiveTab('main')}
          className={`px-4 py-2 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'main'
              ? 'border-violet-500 text-violet-300 bg-violet-600/10'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          Prompt Utama (Bahasa Indonesia)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('negative')}
          className={`px-4 py-2 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'negative'
              ? 'border-violet-500 text-violet-300 bg-violet-600/10'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          Negative Prompt (Anti-AI)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'settings'
              ? 'border-violet-500 text-violet-300 bg-violet-600/10'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          Optik & Identitas Terkunci
        </button>
      </div>

      {/* Tab Content: Main Prompt */}
      {activeTab === 'main' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-neutral-400">
              Siap disalin ke Midjourney / Flux / Stable Diffusion / Ideogram
            </span>
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1 font-semibold"
            >
              <Edit3 className="w-3.5 h-3.5" />
              {isEditing ? 'Selesai Edit' : 'Edit Prompt Manual'}
            </button>
          </div>

          {isEditing ? (
            <textarea
              value={editedMainPrompt}
              onChange={e => setEditedMainPrompt(e.target.value)}
              rows={12}
              className="w-full bg-black/80 border border-violet-500/60 rounded-2xl p-4 text-xs md:text-sm text-neutral-200 font-mono leading-relaxed focus:outline-none"
            />
          ) : (
            <div className="relative group">
              <div className="bg-black/80 border border-neutral-800 rounded-2xl p-5 text-xs md:text-sm text-neutral-200 font-sans leading-relaxed whitespace-pre-wrap selection:bg-violet-600 selection:text-white">
                {editedMainPrompt}
              </div>
              <button
                type="button"
                onClick={handleCopyMain}
                className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-violet-600/80 hover:bg-violet-600 text-white text-xs font-semibold shadow-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5"
              >
                {copiedMain ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedMain ? 'Tersalin' : 'Salin'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab Content: Negative Prompt */}
      {activeTab === 'negative' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-neutral-400">
              Larangan visual untuk mengeliminasi kulit plastik, anatomi rusak, dan efek CGI
            </span>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopyNegative}
              className="text-xs"
            >
              {copiedNegative ? <Check className="w-3.5 h-3.5 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
              Salin Negative Prompt
            </Button>
          </div>
          <div className="bg-black/80 border border-red-950/40 rounded-2xl p-5 text-xs md:text-sm text-neutral-300 font-mono leading-relaxed">
            {result.negativePrompt}
          </div>
        </div>
      )}

      {/* Tab Content: Optics & Locks */}
      {activeTab === 'settings' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-black/60 border border-neutral-800 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-violet-400 flex items-center gap-1.5">
                <Camera className="w-4 h-4" />
                Optik Kamera iPhone 13:
              </span>
              <ul className="text-xs text-neutral-300 space-y-1 list-disc pl-4">
                <li><strong>Perangkat:</strong> {result.photoSettings.device}</li>
                <li><strong>Kamera:</strong> {result.photoSettings.camera}</li>
                <li><strong>Lensa:</strong> {result.photoSettings.focalLength} ({result.photoSettings.aperture})</li>
                <li><strong>Pencahayaan:</strong> {result.photoSettings.lighting}</li>
                <li><strong>Rasio Aspek:</strong> {result.photoSettings.aspectRatio}</li>
              </ul>
            </div>

            <div className="p-4 bg-black/60 border border-neutral-800 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Profil Karakter Terkunci:
              </span>
              <p className="text-xs text-neutral-300">
                <strong>{result.characterProfile.name}</strong> • {result.characterProfile.ethnicityAndAge}
              </p>
              <p className="text-[11px] text-neutral-400">
                {result.characterProfile.bodyProportions}
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {result.characterProfile.keyFacialFeatures.map((f, i) => (
                  <span key={i} className="text-[9px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-2 text-xs">
            <span className="text-neutral-400 font-bold block">Instruksi Face Lock Eksplisit:</span>
            <p className="text-neutral-300 whitespace-pre-wrap">{result.faceLockInstruction}</p>
          </div>

          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-2 text-xs">
            <span className="text-neutral-400 font-bold block">Instruksi Body Lock Eksplisit:</span>
            <p className="text-neutral-300 whitespace-pre-wrap">{result.bodyLockInstruction}</p>
          </div>

          {result.outfitLockInstruction && (
            <div className="p-4 bg-neutral-950 border border-amber-900/40 rounded-2xl space-y-2 text-xs">
              <span className="text-amber-400 font-bold block">Instruksi Referensi Outfit:</span>
              <p className="text-neutral-300 whitespace-pre-wrap">{result.outfitLockInstruction}</p>
            </div>
          )}

          {result.characterSheetInstruction && (
            <div className="p-4 bg-neutral-950 border border-cyan-900/40 rounded-2xl space-y-2 text-xs">
              <span className="text-cyan-400 font-bold block">Instruksi Character Sheet:</span>
              <p className="text-neutral-300 whitespace-pre-wrap">{result.characterSheetInstruction}</p>
            </div>
          )}

          {result.characterSheetPrompt && (
            <div className="p-4 bg-cyan-950/20 border border-cyan-500/40 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-cyan-300 font-bold">Prompt Generate Turnaround 4-Sudut (Midjourney / Flux):</span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(result.characterSheetPrompt || '');
                    alert('Prompt turnaround tersalin!');
                  }}
                  className="px-2 py-0.5 rounded bg-cyan-800 text-white text-[11px] font-semibold"
                >
                  Salin Prompt Sheet
                </button>
              </div>
              <p className="text-neutral-300 font-mono text-[11px] whitespace-pre-wrap">{result.characterSheetPrompt}</p>
            </div>
          )}
        </div>
      )}

      {/* AI Refinement Toolbar (Context-Aware) */}
      <div className="border-t border-neutral-800 pt-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white flex items-center gap-1.5">
            <Wand2 className="w-3.5 h-3.5 text-violet-400" />
            AI Refinement Studio (Sempurnakan Prompt dengan Gemini):
          </span>
          {isRefining && (
            <span className="text-xs text-violet-400 animate-pulse flex items-center gap-1">
              <RefreshCw className="w-3 h-3 animate-spin" />
              Menyempurnakan prompt...
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={isRefining}
            onClick={() => onRefine('strengthen_face_lock')}
            className="px-3 py-1.5 rounded-xl text-xs font-medium bg-neutral-800 hover:bg-violet-950/40 text-neutral-300 hover:text-white border border-neutral-700 hover:border-violet-500/50 transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
            Perkuat Face Lock
          </button>

          <button
            type="button"
            disabled={isRefining}
            onClick={() => onRefine('strengthen_body_lock')}
            className="px-3 py-1.5 rounded-xl text-xs font-medium bg-neutral-800 hover:bg-indigo-950/40 text-neutral-300 hover:text-white border border-neutral-700 hover:border-indigo-500/50 transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <User className="w-3.5 h-3.5 text-indigo-400" />
            Perkuat Body Lock
          </button>

          <button
            type="button"
            disabled={isRefining}
            onClick={() => onRefine('alternative_pose')}
            className="px-3 py-1.5 rounded-xl text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700 transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            Pose Alternatif
          </button>

          <button
            type="button"
            disabled={isRefining}
            onClick={() => onRefine('more_natural_raw')}
            className="px-3 py-1.5 rounded-xl text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700 transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Lebih Natural Raw
          </button>

          <button
            type="button"
            disabled={isRefining}
            onClick={() => onRefine('lighting_variation')}
            className="px-3 py-1.5 rounded-xl text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700 transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <Sun className="w-3.5 h-3.5 text-yellow-400" />
            Variasi Pencahayaan
          </button>

          <button
            type="button"
            disabled={isRefining}
            onClick={() => {
              const loc = prompt('Masukkan lokasi baru yang diinginkan:');
              if (loc) onRefine('change_location', loc);
            }}
            className="px-3 py-1.5 rounded-xl text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700 transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            Ubah Lokasi...
          </button>

          <button
            type="button"
            disabled={isRefining}
            onClick={() => {
              const outfit = prompt('Masukkan pakaian baru yang diinginkan:');
              if (outfit) onRefine('change_outfit', outfit);
            }}
            className="px-3 py-1.5 rounded-xl text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700 transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <Shirt className="w-3.5 h-3.5 text-pink-400" />
            Ganti Pakaian...
          </button>
        </div>
      </div>
    </div>
  );
};
