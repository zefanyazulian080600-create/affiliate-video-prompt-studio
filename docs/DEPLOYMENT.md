# PANDUAN DEPLOYMENT & CI/CD — VERCEL & GITHUB

Dokumen ini memandu langkah-langkah mempublikasikan **Affiliate Video Prompt Studio** ke Vercel dan GitHub.

---

## 1. Arsitektur Deployment
- **Frontend & Serverless Functions**: Dihosting di Vercel (Edge & Node.js Serverless runtime).
- **Source Control**: GitHub Repository.
- **Database & Auth**: Cloud Firestore & Firebase Auth.
- **File Storage**: Firebase Storage Bucket.
- **Domain**: Domain gratis Vercel (`*.vercel.app`) atau custom domain milik Anda.

---

## 2. Persiapan Repositori Git Lokal

Pastikan file sensitif terabaikan dengan memeriksa `.gitignore`:
```gitignore
node_modules
.next
.env*.local
.env
*.log
```

Langkah inisialisasi Git:
```bash
git init
git add .
git commit -m "feat: complete initial implementation of Affiliate Video Prompt Studio"
```

---

## 3. Menghubungkan ke GitHub

1. Buat repository baru di [GitHub](https://github.com/new), misalnya `affiliate-video-prompt-studio`.
2. Hubungkan remote repository:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<username>/affiliate-video-prompt-studio.git
   git push -u origin main
   ```

---

## 4. Konfigurasi Deployment di Vercel

1. Buka [Vercel Dashboard](https://vercel.com/dashboard).
2. Klik **Add New...** > **Project**.
3. Hubungkan akun GitHub Anda dan pilih repository `affiliate-video-prompt-studio`.
4. Konfigurasi Framework Preset: **Next.js**.
5. Di bagian **Environment Variables**, tambahkan:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `GEMINI_API_KEY` (Opsional, untuk AI generation lanjutan)
6. Klik **Deploy**.

Vercel akan secara otomatis membangun aplikasi dengan perintah:
```bash
npm run build
```
Dan menyediakan URL produksi publik dalam hitungan detik.

---

## 5. Verifikasi Smoke Test Pasca Deployment

Setelah proses deployment selesai:
1. Buka URL produksi yang diberikan oleh Vercel.
2. Uji alur otentikasi (Daftar / Masuk).
3. Buat proyek video baru: Masukkan deskripsi produk, upload foto produk, pilih durasi 30 detik.
4. Klik **GENERATE AFFILIATE VIDEO PROMPTS**.
5. Pastikan storyboard cards, handoff blok, dan skor kualitas muncul sempurna.
6. Periksa browser developer tools console untuk memastikan tidak ada kesalahan JavaScript atau mixed content warning.
