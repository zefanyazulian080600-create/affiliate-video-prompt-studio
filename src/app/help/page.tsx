'use client';

import React from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  Sparkles,
  ShieldCheck,
  Film,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function HelpPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-studio-border">
        <h1 className="text-2xl font-bold text-studio-text flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-violet-400" />
          Pusat Bantuan & Panduan Model AI Video
        </h1>
        <p className="text-xs text-studio-muted mt-1 max-w-2xl">
          Pelajari cara memaksimalkan Seedance 2.5, Omni Flash, dan mekanisme kesinambungan (continuity) untuk membuat video iklan produk Shopee yang menarik perhatian pembeli.
        </p>
      </div>

      {/* Section 1: Perbedaan Seedance 2.5 vs Omni Flash */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-studio-text flex items-center gap-2">
          <Film className="w-5 h-5 text-blue-400" />
          1. Karakteristik Seedance 2.5 vs. Omni Flash
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-studio-surface/90 border-blue-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-base text-blue-300">Seedance 2.5</span>
              <Badge variant="blue">Preset 10s & 15s</Badge>
            </div>
            <p className="text-xs text-studio-muted leading-relaxed">
              Sangat unggul untuk adegan dengan gerakan dinamis, transisi fashion, demonstrasi langkah kaki, dan ritme cepat.
            </p>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Mendukung preset scene 10 detik atau 15 detik.</li>
              <li>Pilihan 15 detik sangat ideal untuk unboxing bertahap dan tutorial mendalam.</li>
              <li>Sangat responsif terhadap deskripsi sudut kamera dan pergerakan sinematik.</li>
            </ul>
          </Card>

          <Card className="bg-studio-surface/90 border-violet-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-base text-violet-300">Omni Flash</span>
              <Badge variant="violet">Preset 10s</Badge>
            </div>
            <p className="text-xs text-studio-muted leading-relaxed">
              Sangat optimal untuk aksi tunggal terfokus, penonjolan detail material fisik, dan kontrol tekstur permukaan.
            </p>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Preset resmi 10 detik per scene.</li>
              <li>Fokus pada satu rangkaian aksi jelas dan terkontrol per cut.</li>
              <li>Menghasilkan ketajaman detail logo dan kemasan produk yang stabil.</li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Section 2: Cara Menggunakan Blok NEXT SCENE HANDOFF */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-studio-text flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          2. Cara Memakai Blok NEXT SCENE HANDOFF
        </h2>

        <Card className="bg-studio-surface/90 space-y-3">
          <p className="text-xs text-studio-muted leading-relaxed">
            Karena sebagian besar tool video AI tidak memiliki ingatan otomatis dari video sebelumnya, blok <strong>NEXT SCENE HANDOFF</strong> dibuat untuk menjamin transisi yang mulus:
          </p>

          <div className="p-3.5 rounded-xl bg-studio-bg border border-violet-500/30 font-mono text-xs text-violet-200">
            {`[NEXT SCENE HANDOFF — SCENE 1 TO SCENE 2]
• Expected Ending Frame: Talent stands next to oak table, holding white sneaker in right hand...
• Unresolved Action: Talent's left hand is reaching toward the sneaker cushioning...
• Continuity Mandate: DO NOT change wardrobe. DO NOT alter sneaker silhouette...`}
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            <strong>Cara Pakai:</strong> Saat men-generate Scene 2 pada tool AI video pilihan Anda, tempelkan blok instruksi ini bersama dengan prompt Scene 2. Jika tool mendukung gambar akhir, gunakan tangkapan layar detik terakhir dari Scene 1 sebagai gambar referensi Scene 2!
          </p>
        </Card>
      </div>

      {/* Section 3: Tips Affiliate Shopee Indonesia */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-studio-text flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          3. Formula Konversi Affiliate Shopee
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-studio-surface border border-studio-border space-y-1.5">
            <span className="font-bold text-studio-text block">1. Hook Tanpa Basa-Basi</span>
            <p className="text-studio-muted">
              Jangan mulai dengan perkenalan nama atau logo berdurasi lama. Penonton Shopee akan swipe jika produk tidak terlihat dalam 3 detik pertama.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-studio-surface border border-studio-border space-y-1.5">
            <span className="font-bold text-studio-text block">2. Tunjukkan Bukti Fisik</span>
            <p className="text-studio-muted">
              Perlihatkan elastisitas sol, kerapian jahitan, atau kekentalan serum. Sentuhan fisik membangun kepercayaan pembeli lebih dari sekadar klaim verbal.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-studio-surface border border-studio-border space-y-1.5">
            <span className="font-bold text-studio-text block">3. Gesture Keranjang Kuning</span>
            <p className="text-studio-muted">
              Di scene terakhir, talent harus menunjuk ke arah kiri bawah layar di mana ikon keranjang kuning Shopee Video muncul secara native.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-4 text-center">
        <Link href="/generator">
          <Button variant="primary" size="lg" className="text-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Mulai Buat Prompt Sekarang
          </Button>
        </Link>
      </div>
    </div>
  );
}
