# AFFILIATE VIDEO PROMPT STUDIO

Studio Pembuat Prompt Video Sinematik, Continuity Engine & Master Marketing Caption Generator untuk Affiliate Shopee Indonesia.

[![Live Website](https://img.shields.io/badge/Live-affiliate--video--studio.vercel.app-7928CA?style=flat&logo=vercel)](https://affiliate-video-studio.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-zefanyazulian080600--create%2Faffiliate--video--prompt--studio-181717?style=flat&logo=github)](https://github.com/zefanyazulian080600-create/affiliate-video-prompt-studio)
[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Vitest-13%20Passed-brightgreen?style=flat&logo=vitest)](https://vitest.dev/)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

🌐 **Production Website**: [https://affiliate-video-studio.vercel.app](https://affiliate-video-studio.vercel.app)  
✨ **Direct Generator**: [https://affiliate-video-studio.vercel.app/generator](https://affiliate-video-studio.vercel.app/generator)  
📦 **GitHub Repository**: [https://github.com/zefanyazulian080600-create/affiliate-video-prompt-studio](https://github.com/zefanyazulian080600-create/affiliate-video-prompt-studio)

---

## 1. PENGANTAR & PRINSIP UTAMA

**Affiliate Video Prompt Studio** adalah platform SaaS yang dirancang khusus untuk satu orang kreator affiliate Shopee di Indonesia. Platform ini memecahkan masalah inkonsistensi video AI (*identity drift*, wajah berubah, produk bermutasi, atau jump cuts) dengan menghasilkan rangkaian prompt per scene yang terkunci secara visual dan sinematik.

Prinsip Fondasi:
```
INPUT MINIMAL ➔ ANALISIS CERDAS ➔ PROMPT PROFESIONAL ➔ SCENE KONSISTEN ➔ SIAP DIGENERATE
```

### Model AI Video & Workflow yang Didukung:
1. **Seedance 2.5**:
   - Preset Scene 10 Detik: Optimal untuk transisi dinamis, video pendek, dan ritme cepat.
   - Preset Scene 15 Detik: Optimal untuk demonstrasi fungsi kompleks, unboxing mendalam, dan storytelling naratif.
2. **Omni Flash**:
   - Preset Scene 10 Detik: Optimal untuk satu aksi terfokus, detail tekstur produk tajam, dan kesinambungan terkontrol.

---

## 2. FITUR UTAMA

- **Input Minimal 4 Kelompok**:
  1. *Informasi Produk*: Textarea bebas bahasa Indonesia dengan ekstraksi entitas otomatis (nama, kategori, fitur, manfaat, target pembeli, batasan klaim).
  2. *Character Reference*: Unggah foto karakter untuk mengunci wajah, rambut, dan pakaian (*wardrobe lock*).
  3. *Foto Produk (Multi-Upload)*: Drag & drop, preview, penanda foto utama, dan pelabelan fungsi (*tampak depan, detail bahan, logo, kemasan*).
  4. *Durasi & Workflow*: Penghitung alokasi scene dan durasi sisa (*remainder*) transparan (10s, 15s, 20s, 30s, 45s, 60s, custom).
- **Scene Continuity Engine**:
  - *Continuity Bible*: Mengunci 5 pilar visual (*Character Lock, Product Lock, Environment Lock, Cinematography Lock, Story Lock*).
  - *Per-Scene State Transitions*: Melacak `startingState`, `action`, `endingState`, dan `unresolvedAction`.
  - *Blok NEXT SCENE HANDOFF*: Blok ringkasan transisi pada setiap scene untuk disalin ke generasi scene berikutnya.
- **Scene Builder & Storyboard Interaktif**:
  - Kartu scene interaktif dengan tombol: *Salin Prompt*, *Salin Negatif*, *Salin Paket Lengkap*, *Kunci Scene*, dan *Optimasi* (Jadikan Lebih Sinematik, Jadikan Natural/UGC, Perkuat Hook, Tonjolkan Produk, Sambungkan Scene Sebelumnya).
- **Categorized Negative Prompts**:
  - Pencegah risiko spesifik: *Character drift, Product warping, Scene inconsistency, Visual artifacts*.
- **Audit Kontrol Mutu Objektif (0-100)**:
  - Verifikasi otomatis 6 kategori: *Product fidelity, Character consistency, Scene continuity, Marketing clarity, Visual quality, Technical compatibility*.
- **Penyimpanan Hibrida & Isolasi Pengguna**:
  - Cloud Firestore & Google Storage jika kredensial aktif, dengan fallback otomatis ke *LocalStorage Engine* untuk pemakaian instan tanpa konfigurasi.
- **Dual-Engine Operation**:
  - Menggunakan *Deterministic Template Engine* (100% offline dan gratis), serta terintegrasi mulus dengan *Google Gemini AI* jika `GEMINI_API_KEY` disediakan.

---

## 3. STRUKTUR DIREKTORI

```
affiliate-video-studio/
├── docs/                        # Dokumentasi arsitektur dan spesifikasi teknis
│   ├── ARCHITECTURE.md          # Arsitektur sistem dan data flow
│   ├── AI_PROMPT_ENGINE.md      # Pipeline prompt engine 14 tahap
│   ├── CONTINUITY_SYSTEM.md     # Spesifikasi 5 kunci continuity & handoff
│   ├── FIREBASE_SETUP.md        # Panduan auth, firestore, storage & security rules
│   ├── DEPLOYMENT.md            # Panduan publish ke GitHub & Vercel
│   └── TESTING.md               # Matriks skenario pengujian kualitas
├── src/
│   ├── app/                     # Next.js App Router (Dashboard, Generator, Projects, Library, Settings, Help)
│   ├── components/              # Komponen UI (Navbar, GeneratorForm, SceneCard, StoryboardView, dll.)
│   ├── lib/
│   │   ├── duration-calculator.ts   # Mesin hitung durasi dan preset
│   │   ├── prompt-library-data.ts   # Preset template affiliate Shopee terverifikasi
│   │   ├── firebase/client.ts       # Inisialisasi Firebase Client SDK
│   │   ├── storage/project-store.ts # Persistensi Firestore + LocalStorage
│   │   └── prompt-engine/           # Pipeline AI Prompt Engine
│   └── types/                   # Model data TypeScript & Zod schemas
├── tests/                       # Unit & integration tests Vitest (12 passing tests)
├── firestore.rules              # Aturan keamanan database Cloud Firestore
├── storage.rules                # Aturan keamanan file upload Firebase Storage
└── .env.example                 # Template variabel lingkungan
```

---

## 4. CARA MENJALANKAN SECARA LOKAL

### Prasyarat
- Node.js versi 18 ke atas (Direkomendasikan Node.js 20 atau 24).
- npm atau pnpm.

### Langkah Instalasi
1. Masuk ke direktori proyek:
   ```bash
   cd affiliate-video-studio
   ```
2. Instal dependensi:
   ```bash
   npm install
   ```
3. Salin file environment:
   ```bash
   cp .env.example .env.local
   ```
   *(Opsional: Isi `GEMINI_API_KEY` atau kredensial Firebase jika ingin mengaktifkan sinkronisasi cloud).*
4. Jalankan server pengembangan lokal:
   ```bash
   npm run dev
   ```
5. Buka di browser Anda: [http://localhost:3000](http://localhost:3000)

---

## 5. PENGUJIAN OTOMATIS & BUILD PRODUKSI

Menjalankan pengujian fungsional unit & integrasi:
```bash
npm run test
```
*Hasil: 12 skenario pengujian utama (durasi 10s, 30s preset 10s/15s, 45s remainder, continuity handoff, scene lock, audit mutu, validasi Zod) lulus 100%.*

Menjalankan kompilasi build produksi:
```bash
npm run build
```

---

## 6. PANDUAN DEPLOYMENT (VERCEL & GITHUB)

1. **Inisialisasi Git**:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit of Affiliate Video Prompt Studio"
   ```
2. **Push ke GitHub**:
   ```bash
   git remote add origin https://github.com/<username>/affiliate-video-studio.git
   git branch -M main
   git push -u origin main
   ```
3. **Impor ke Vercel**:
   - Buka [Vercel Dashboard](https://vercel.com/new).
   - Hubungkan repository GitHub `affiliate-video-studio`.
   - Tambahkan Environment Variables dari `.env.example`.
   - Klik **Deploy**.

---

## 7. LISENSI
Didistribusikan di bawah Lisensi MIT. Bebas digunakan dan dimodifikasi untuk kebutuhan afiliasi dan komersial.
