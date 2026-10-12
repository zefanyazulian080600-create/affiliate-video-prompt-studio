# ARSITEKTUR SISTEM — AFFILIATE VIDEO PROMPT STUDIO

## 1. Ikhtisar Sistem
**Affiliate Video Prompt Studio** adalah platform SaaS video prompt engineering cerdas yang dirancang khusus untuk affiliate creator (khususnya pasar Shopee Indonesia). Aplikasi ini memproses input produk minimalis menjadi rangkaian prompt multi-scene dengan kesinambungan visual tinggi (*continuity*), struktur direct response marketing, dan kepatuhan terhadap batasan model AI video tujuan (khususnya Seedance 2.5 dan Omni Flash).

Prinsip Fondasi:
```
INPUT MINIMAL → ANALISIS CERDAS → PROMPT PROFESIONAL → SCENE KONSISTEN → SIAP DIGENERATE
```

---

## 2. Diagram Arsitektur Tingkat Tinggi

```
+-----------------------------------------------------------------------------------------+
|                                    PRESENTATION LAYER                                   |
|  - Next.js 14 App Router (Tailwind CSS, Dark Mode Default: Violet/Electric Blue Accent) |
|  - Responsive Mobile-First & Desktop Dashboard                                          |
|  - Generator Form (Product Textarea, Image Dropzone, Duration/Workflow Selector)        |
|  - Storyboard Scene Builder (Cards, Reorder, Lock, Regenerate, Copy, Export)            |
+-----------------------------------------------------------------------------------------+
                                             |
                                     (Actions & APIs)
                                             v
+-----------------------------------------------------------------------------------------+
|                                    APPLICATION LAYER                                    |
|  - /api/generate (Zod Validated Pipeline Execution)                                     |
|  - /api/projects (CRUD & Auto-save Endpoints)                                           |
|  - /api/research (Trend Intelligence & Market Angle Search)                             |
|  - Session / Auth Guard (Firebase Token Verification & Ownership Enforcement)           |
+-----------------------------------------------------------------------------------------+
                                             |
                                             v
+-----------------------------------------------------------------------------------------+
|                                  CORE DOMAIN ENGINES                                    |
|                                                                                         |
|  [ Duration & Workflow Engine ]  --> [ Creative Director Engine ]                       |
|   - Scene calculation                 - Big Idea, Angle, Hook, Pacing                   |
|   - Remainder / Modulo handling       - Direct response Shopee marketing                |
|                                                                                         |
|  [ Scene Continuity Engine ]     --> [ Negative Prompt Engine ]                         |
|   - Character / Product Locks         - Categorized risk mitigation                     |
|   - Per-scene state transitions       - Character drift, logo warp, jump cuts           |
|   - NEXT SCENE HANDOFF blocks                                                           |
|                                                                                         |
|  [ AI Provider Adapter ]         --> [ Quality Control Auditor ]                        |
|   - Gemini API (Multi-turn/Vision)    - 0-100 real heuristic scoring                    |
|   - Deterministic Template Fallback   - Actionable warnings & fixes                     |
+-----------------------------------------------------------------------------------------+
                                             |
                                             v
+-----------------------------------------------------------------------------------------+
|                                  INFRASTRUCTURE LAYER                                   |
|  - Firebase Authentication (User Session & Token Isolation)                             |
|  - Cloud Firestore (Projects, Continuity Bibles, Storyboards, Template Library)         |
|  - Firebase Storage (Product Reference Photos, Character Identity Assets)               |
|  - LocalStorage / Demo Store Fallback (Zero Setup Barrier Mode)                         |
|  - Production Deployment: Vercel + GitHub CI/CD                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 3. Komponen Utama & Tanggung Jawab

### A. Generator & Input Pipeline
- **Product Textarea Analyzer**: Mengurai teks bebas bahasa Indonesia menjadi metadata terstruktur (*Nama, Kategori, Fitur Kunci, Keunggulan, Target Pembeli, Pain Points, Tone of Voice, Batasan Klaim*).
- **Visual Assets Processor**: Validasi tipe file (JPG, PNG, WebP < 10MB), tagging fungsi gambar (*front_view, material_detail, packaging, in_use*), dan pengenalan fitur visual produk.
- **Workflow & Duration Calculator**:
  - `Seedance 2.5 - 10s Scene Preset`: Mendukung durasi per scene 10 detik.
  - `Seedance 2.5 - 15s Scene Preset`: Mendukung durasi per scene 15 detik.
  - `Omni Flash - 10s Scene Preset`: Mendukung durasi per scene 10 detik.
  - Menangani pembagian durasi dan sisa waktu (*remainder*) secara transparan.

### B. Continuity Engine (Komponen Inti)
- **Continuity Bible Generator**: Membentuk pedoman identitas mutlak (*Character Lock, Product Lock, Environment Lock, Cinematography Lock, Story Lock*).
- **Per-Scene State Transitions**: Melacak `startingState`, `action`, `endingState`, `screenDirection`, `cameraMovement`, dan `unresolvedAction`.
- **Handoff Generator**: Menghasilkan blok `NEXT SCENE HANDOFF` pada setiap scene untuk menjamin transisi mulus saat digenerate secara sekuensial.

### C. Creative Director & Marketing Strategy
- Menerapkan format video affiliate berkonversi tinggi: *Problem-Solution, Product Demo, Before-After, POV Harian, UGC Testimonial, Unboxing, Outfit Styling, Satisfying Reveal, dll.*
- Struktur copywriting natural Indonesia: Hook (0-3s), Context, Reveal, Demo, Objection Handling, CTA (ajakan cek keranjang kuning / deskripsi).

### D. Provider Adapter & Offline Fallback
- Mendukung pemanggilan model AI (Google Gemini API) untuk analisis teks & gambar mutakhir.
- **Fallback Template Engine Terstruktur**: Jika API key tidak dikonfigurasi, sistem secara otomatis beralih ke engine template deterministik berbasis aturan tanpa crashing, tanpa data palsu, dan tetap menghasilkan prompt berkualitas tinggi.

### E. Persistence & Security
- Data disimpan di Firestore dengan isolasi kepemilikan berdasarkan `userId`.
- Keamanan divalidasi ganda: di Application Layer (API route checks) dan Database Layer (Firestore & Storage Security Rules).
- Fallback LocalStorage memungkinkan eksplorasi offline instan sebelum mengaktifkan konfigurasi cloud Firebase.

---

## 4. Pola Data & Format Pertukaran

Semua entitas data utama didefinisikan dengan TypeScript Interface dan divalidasi dengan Zod:
1. `ProductProfile`: Data ekstraksi produk & klaim.
2. `VisualReferenceSheet`: Referensi karakter & foto produk.
3. `ContinuityBible`: Kunci konsistensi multi-dimensi.
4. `ScenePlan` & `ScenePrompt`: Prompt, negative prompt, audio cue, and handoff.
5. `PromptProject`: Entitas proyek penuh yang disimpan ke Firestore/LocalStorage.
6. `QualityAuditReport`: Metrik skor kualitas objektif (0-100) dan daftar perbaikan.
