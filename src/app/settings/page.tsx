'use client';

import React, { useState } from 'react';
import {
  Settings,
  Cpu,
  Database,
  Download,
  Trash2,
  CheckCircle2,
  Key,
} from 'lucide-react';
import { isFirebaseConfigured } from '@/lib/firebase/client';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function SettingsPage() {
  const [cleared, setCleared] = useState(false);

  const handleClearCache = () => {
    if (confirm('Apakah Anda yakin ingin menghapus data cache proyek lokal di browser ini?')) {
      localStorage.removeItem('affiliate_video_studio_projects');
      setCleared(true);
      setTimeout(() => setCleared(false), 3000);
    }
  };

  const handleExportBackup = () => {
    const raw = localStorage.getItem('affiliate_video_studio_projects') || '[]';
    const blob = new Blob([raw], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `affiliate_video_studio_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-studio-border">
        <h1 className="text-2xl font-bold text-studio-text flex items-center gap-2">
          <Settings className="w-6 h-6 text-violet-400" />
          Pengaturan Studio
        </h1>
        <p className="text-xs text-studio-muted mt-1">
          Pantau status integrasi layanan, kunci keamanan data, dan pencadangan proyek.
        </p>
      </div>

      {/* Service Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* AI Provider Status */}
        <Card className="bg-studio-surface/90">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-sm text-studio-text flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              AI Prompt Engine Status
            </span>
            <Badge variant="emerald" size="sm">
              Aktif
            </Badge>
          </div>
          <div className="text-xs space-y-2 text-studio-muted">
            <p>
              Mode Operasi:{' '}
              <span className="text-emerald-300 font-semibold">Dual-Engine Resilien</span>
            </p>
            <p>
              Sistem menggunakan <strong>Deterministic Rule-Based Template Engine</strong> secara mandiri tanpa memerlukan API key eksternal. Jika variabel <code className="text-violet-300">GEMINI_API_KEY</code> disetel di server, sistem otomatis meningkatkan kedalaman narasi dengan Google Gemini.
            </p>
          </div>
        </Card>

        {/* Database Status */}
        <Card className="bg-studio-surface/90">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-sm text-studio-text flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-400" />
              Database & File Storage
            </span>
            <Badge variant={isFirebaseConfigured ? 'emerald' : 'blue'} size="sm">
              {isFirebaseConfigured ? 'Firebase Cloud' : 'LocalStorage Offline'}
            </Badge>
          </div>
          <div className="text-xs space-y-2 text-studio-muted">
            <p>
              Mesin Penyimpanan:{' '}
              <span className="text-studio-text font-medium">
                {isFirebaseConfigured ? 'Cloud Firestore & Google Storage' : 'Browser LocalStorage Engine'}
              </span>
            </p>
            <p>
              {isFirebaseConfigured
                ? 'Kredensial Firebase aktif. Proyek disinkronisasikan ke Cloud Firestore dengan isolasi kepemilikan pengguna.'
                : 'Proyek disimpan secara lokal di browser Anda. Anda dapat langsung menggunakan seluruh fitur tanpa registrasi cloud.'}
            </p>
          </div>
        </Card>
      </div>

      {/* Security & Env Variables Guide */}
      <Card className="bg-studio-surface/90 space-y-4">
        <h3 className="font-bold text-base text-studio-text flex items-center gap-2">
          <Key className="w-4 h-4 text-violet-400" />
          Konfigurasi Kredensial (.env.local)
        </h3>
        <p className="text-xs text-studio-muted leading-relaxed">
          Untuk mengaktifkan sinkronisasi Cloud Firestore dan Google Gemini AI pada deployment Vercel atau komputer lokal, salin file <code className="text-violet-300">.env.example</code> menjadi <code className="text-violet-300">.env.local</code>:
        </p>
        <pre className="p-3.5 rounded-xl bg-studio-bg border border-studio-border text-xs text-studio-muted font-mono leading-relaxed overflow-x-auto">
{`# Client-side Firebase (Opsional)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-app.appspot.com

# Server-side Gemini AI (Opsional)
GEMINI_API_KEY=your_gemini_api_key_here`}
        </pre>
      </Card>

      {/* Local Storage & Cache Management */}
      <Card className="bg-studio-surface/90 space-y-4">
        <h3 className="font-bold text-base text-studio-text flex items-center gap-2">
          <Download className="w-4 h-4 text-blue-400" />
          Pencadangan & Pembersihan Data
        </h3>
        <p className="text-xs text-studio-muted leading-relaxed">
          Unduh seluruh data proyek Anda sebagai file JSON untuk backup, atau bersihkan penyimpanan lokal.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={handleExportBackup} className="text-xs">
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Unduh Cadangan JSON
          </Button>

          <Button variant="danger" size="sm" onClick={handleClearCache} className="text-xs">
            <Trash2 className="w-3.5 h-3.5 mr-1.5" />
            Bersihkan Cache Lokal
          </Button>

          {cleared && (
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Cache lokal berhasil dibersihkan!
            </span>
          )}
        </div>
      </Card>
    </div>
  );
}
