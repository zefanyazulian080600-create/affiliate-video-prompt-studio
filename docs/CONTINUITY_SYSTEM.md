# CONTINUITY SYSTEM SPECIFICATION

## 1. Urgensi & Masalah Utama
Model video AI generatif masa kini (termasuk Seedance 2.5 dan Omni Flash) sering kali memperlakukan setiap scene sebagai generasi independen (*stateless generation*). Akibatnya:
- Wajah karakter berubah drastis antar-scene (*identity drift*).
- Pakaian, warna baju, atau aksesori berganti tanpa alasan.
- Desain, warna, kemasan, atau logo produk bermutasi.
- Aksi terputus secara mendadak (*jump cuts / teleportation*).
- Sudut pencahayaan dan lokasi berubah acak.

Sistem **Continuity Engine** di Affiliate Video Prompt Studio dirancang untuk menyelesaikan masalah ini secara sistematis melalui *Continuity Bible* dan *Per-Scene State Handoff*.

---

## 2. Lima Pilar Continuity Bible

Sebelum scene pertama digenerate, sistem membuat **Continuity Bible** yang bertindak sebagai "kontrak visual":

### A. Character Lock (Kunci Karakter)
- **Identitas**: Usia visual, etnis/ciri penampilan khas Indonesia/Asia, bentuk wajah, dan warna kulit.
- **Rambut & Wajah**: Model rambut, panjang, tekstur, warna, ekspresi default.
- **Wardrobe & Styling**: Pakaian spesifik (contoh: kemeja katun broken white, celana chino abu-abu, jam tangan kulit hitam). Wardrobe ini dikunci di seluruh scene kecuali ada transisi wardrobe eksplisit.
- **Postur & Aura**: Gaya bahasa tubuh (misal: kasual, percaya diri, profesional).

### B. Product Lock (Kunci Produk)
- **Bentuk & Proporsi**: Dimensi geometris asli produk.
- **Warna & Finishing**: Kode warna dan jenis permukaan (matte, glossy, metallic, woven fabric).
- **Branding & Logo**: Penempatan logo, tipografi merek, dan label yang terlihat jelas pada foto referensi.
- **Kemasan**: Kondisi kemasan (kotak baru, botol tertutup, kemasan terbuka).
- **Aturan Permanen**: Tidak mengizinkan perubahan warna atau mutasi desain pada scene mana pun.

### C. Environment Lock (Kunci Lingkungan)
- **Lokasi**: Setting ruang spesifik (contoh: kafe minimalis dengan tanaman indoor, meja kayu oak, jendela kaca besar).
- **Waktu & Pencahayaan**: Golden hour natural sunlight dari arah kiri, soft diffused indoor fill light.
- **Palet Warna Ruang**: Warm neutral tone (krem, cokelat kayu, sage green).

### D. Cinematography Lock (Kunci Sinematografi)
- **Aspect Ratio**: 9:16 (Vertikal optimal untuk video Shopee, TikTok, Reels).
- **Lensa & Depth**: 35mm atau 50mm f/1.8 lens look dengan shallow depth of field, bokeh latar belakang yang lembut.
- **Color Grading**: Clean, contrasty, modern commercial grading, natural skin tones.

### E. Story Lock (Kunci Alur Cerita)
- **Kontinuitas Kronologis**: Urutan kejadian logis (Scene 1 -> Scene 2 -> Scene 3).
- **Vektor Gerakan**: Jika talent bergerak ke kanan di akhir Scene 1, Scene 2 tidak boleh tiba-tiba memperlihatkannya bergerak dari kanan ke kiri tanpa motivasi blocking.

---

## 3. Struktur Per-Scene Continuity State

Setiap scene memiliki objek state terstruktur:

```typescript
interface ContinuityState {
  startingState: string;        // Posisi & aksi talent saat scene dimulai
  action: string;               // Aksi spesifik yang berlangsung selama scene
  endingState: string;          // Posisi persis talent & produk saat frame terakhir
  characterPosition: string;    // Posisi talent dalam frame (screen center, frame left, dll.)
  productPosition: string;      // Posisi produk (dipegang tangan kanan, di atas meja, dll.)
  cameraPosition: string;       // Sudut pandang kamera (eye-level medium close up, dll.)
  cameraMovement: string;       // Gerakan kamera (slow push-in, smooth orbit, static)
  screenDirection: string;      // Arah pandang & gerakan (looking 15° right, facing camera)
  environmentState: string;     // Kondisi ruang (meja tertata rapi, jendela di latar)
  lightingState: string;        // Pencahayaan (warm window light from camera left)
  unresolvedAction: string;     // Gerakan yang belum selesai dan harus diteruskan
  transitionInstruction: string;// Cara menyambungkan frame ini ke scene berikutnya
}
```

---

## 4. Mekanisme "NEXT SCENE HANDOFF"

Pada akhir setiap scene card, dihasilkan blok teks siap pakai:

```
[NEXT SCENE HANDOFF — SCENE 1 TO SCENE 2]
• Expected Ending Frame: Talent stands next to oak coffee table, holding the white sneaker in right hand at chest height, inspecting the outsole texture.
• Character Pose: Standing, relaxed posture, body angled 30 degrees towards camera, warm subtle smile.
• Product Position: White sneaker held horizontally, sole facing slightly upward, brand tag visible.
• Unresolved Action: Talent's left hand is reaching toward the sneaker cushioning to press the insole.
• Camera & Lighting: Medium close-up, eye level, 50mm f/2.0 look. Warm afternoon sunlight streaming from left frame.
• Continuity Enforcement: DO NOT change wardrobe. DO NOT alter sneaker silhouette or colors. Seamlessly continue the finger press motion from the exact ending pose of Scene 1.
```

Blok ini dapat disalin secara terpisah atau otomatis diinjeksi ke prompt scene berikutnya jika pengguna melakukan regenerasi atau edit.
