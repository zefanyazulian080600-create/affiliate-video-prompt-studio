# AI PROMPT ENGINE & PIPELINE SPECIFICATION

## 1. Filosofi & Pendekatan
AI Prompt Engine di Affiliate Video Prompt Studio dirancang dengan pipeline multi-tahap modular. Alih-alih membuat satu prompt bebas secara generik, sistem memecah proses pembuatan prompt menjadi 14 langkah deterministik:

1. **Input Validation**: Memvalidasi teks produk, foto referensi, dan parameter durasi menggunakan Zod.
2. **Product Analysis**: Ekstraksi entitas (*Entity Extraction*) untuk nama, kategori, fitur kunci, manfaat terverifikasi, dan batasan klaim.
3. **Visual Reference Analysis**: Pemetaan ciri visual foto produk (warna, bentuk, logo, material) dan identitas karakter jika disediakan.
4. **Audience & Buyer-Intent Analysis**: Identifikasi target demografi pembeli Indonesia, pemicu emosional (*desire*), dan potensi keraguan (*objections*).
5. **Creative Concept Generation**: Penentuan format kampanye (*Problem-Solution, UGC Style, Cinematic Reveal, Unboxing, dll.*) serta *Big Idea*.
6. **Hook Engineering**: Formulasi visual hook (detik 0-3) yang menghentikan scroll di feed Shopee/TikTok/Instagram Reels.
7. **Storyboard Planning**: Alokasi narasi per scene berdasarkan durasi total dan preset workflow yang dipilih.
8. **Scene Duration Allocation**: Distribusi durasi presisi per scene (10 detik atau 15 detik) serta penanganan durasi sisa.
9. **Scene-by-Scene Prompt Generation**: Penyusunan prompt visual sinematik per scene dengan tata bahasa kamera, pencahayaan, aksi talent, dan interaksi produk.
10. **Continuity Injection**: Penyisipan instruksi referensi karakter, produk, lokasi, pencahayaan, dan status aksi dari scene sebelumnya.
11. **Product Fidelity Validation**: Verifikasi bahwa prompt tidak mengubah logo, warna asli, kemasan, atau proporsi produk.
12. **Marketing Claim Validation**: Pemastian bahwa klaim promosi tidak melanggar fakta atau membuat janji palsu/medis tanpa dasar.
13. **Output Formatting**: Penyusunan output dalam format *Human-Readable* (instruksi lengkap) dan *Copy-Ready* (prompt murni sekali klik salin).
14. **Quality Scorer & Warnings**: Audit heuristik otomatis untuk menghasilkan skor kelayakan (0-100) dan peringatan inkonsistensi.

---

## 2. Model AI Video & Preset Workflow

### A. Seedance 2.5
- **Scene Presets**:
  - `Seedance 2.5 — 10s Scene Preset`: Optimal untuk transisi cepat, ritme dinamis, dan produk fashion/lifestyle.
  - `Seedance 2.5 — 15s Scene Preset`: Optimal untuk demonstrasi fungsi kompleks, tutorial unboxing, atau storytelling naratif.
- **Karakteristik Prompt**:
  - Mendukung deskripsi visual kaya dengan rincian sudut kamera (*wide shot, close-up, Dutch angle, tracking shot*).
  - Integrasi instruksi audio / sound design atmosferik.
  - Pergerakan kamera dan talent yang koheren.

### B. Omni Flash
- **Scene Preset**:
  - `Omni Flash — 10s Scene Preset`: Standar durasi scene 10 detik.
- **Karakteristik Prompt**:
  - Fokus pada satu aksi terkontrol dan terfokus tinggi per scene.
  - Penekanan kuat pada detail tekstur material dan pencahayaan studio.
  - Instruksi kontinuitas eksplisit untuk menghindari teleportasi objek atau perubahan wardrobe.

---

## 3. Negative Prompt Architecture
Negative prompt tidak digeneralisasi, melainkan dikelompokkan secara spesifik sesuai potensi risiko kegagalan AI video:

```
[CHARACTER DRIFT]
different face, identity drift, inconsistent facial features, distorted eyes, extra fingers, deformed hands, unnatural limb motion, changing hairstyle, accidental clothing color swap

[PRODUCT WARPING]
product redesign, altered logo, missing brand mark, distorted packaging, changed product color, floating product, duplicated items, unstable geometry, unnatural product deformation

[SCENE INCONSISTENCY]
unintended jump cuts, sudden teleportation of talent, flickering lighting, sudden background change, mismatched time of day, abrupt camera jump, jarring screen direction flip

[UNNATURAL ARTIFACTS]
plastic skin texture, excessive digital smoothing, blurry details, glitchy motion, unrealistic physics, overexposed highlights, washed out shadows
```

---

## 4. Dual Mode Operation: AI Provider vs. Deterministic Template Fallback

### Mode A: AI Provider (Gemini API / LLM Engine)
Jika `GEMINI_API_KEY` dikonfigurasi di server environment:
- Analisis produk mendalam dilakukan menggunakan model AI.
- Membaca konteks teks dan visual secara semantik.
- Menghasilkan variasi hook dan konsep kreatif unik untuk setiap produk.

### Mode B: Structured Template Fallback Engine
Jika tidak ada API key atau koneksi eksternal terputus:
- Sistem beralih secara mulus ke mesin rule-based template terstruktur.
- Menganalisis kata kunci dalam deskripsi produk (misal: "sepatu", "skincare", "tas", "baju", "gadget", "elektronik", "makanan").
- Menghasilkan konsep kreatif, storyboard, continuity state, dan prompt sinematik siap pakai tanpa jeda atau kegagalan sistem.
- Memberikan indikator transparan: `Mode: Deterministic Template Engine (No API Key Required)`.
