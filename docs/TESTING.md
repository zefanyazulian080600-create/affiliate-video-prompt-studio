# RENCANA & SPESIFIKASI PENGUJIAN KUALITAS (TESTING SUITE)

Dokumen ini memetakan seluruh skenario pengujian wajib untuk menjamin keandalan sistem **Affiliate Video Prompt Studio** sesuai dengan standar kualitas produksi.

---

## 1. Matriks Skenario Pengujian Wajib (Prompt Section 20)

| No | Skenario Pengujian | Target Komponen | Ekspektasi Hasil |
|---|---|---|---|
| 1 | Generate video 10 detik dengan satu scene | Duration Engine | 1 scene, 10 detik tepat, durasi sisa 0 detik. |
| 2 | Generate video 30 detik menggunakan preset 10 detik | Duration Engine & Storyboard | 3 scene masing-masing 10 detik, durasi total 30 detik. |
| 3 | Generate video 30 detik menggunakan preset 15 detik | Duration Engine & Storyboard | 2 scene masing-masing 15 detik, durasi total 30 detik. |
| 4 | Generate video 45 detik dengan alokasi durasi presisi | Duration Engine | Preset 15 detik menghasilkan 3 scene @ 15 detik; Preset 10 detik menghasilkan 4 scene @ 10 detik + 1 scene 5 detik remainder. |
| 5 | Generate video tanpa referensi karakter | Continuity Engine | Menggunakan konsep visual fokus produk (*product-only*) atau talent generik tanpa pelanggaran identitas. |
| 6 | Generate video dengan referensi karakter | Continuity Bible | Menghasilkan *Character Lock* konsisten (usia, wajah, rambut, pakaian) di setiap scene. |
| 7 | Generate video dengan multi-foto produk | Visual Reference Engine | Menjaga warna, siluet, dan logo produk di seluruh scene tanpa mutasi. |
| 8 | Lanjutkan scene kedua dari ending scene pertama | Handoff Engine | `startingState` Scene 2 mengambil persis pose dan posisi objek dari `endingState` Scene 1. |
| 9 | Regenerate scene kedua tanpa mengubah scene pertama yang terkunci | Scene Lock Manager | Scene 1 yang terkunci tetap utuh, Scene 2 diperbarui dengan tetap menghormati ending state Scene 1. |
| 10 | Simpan proyek dan refresh halaman | Persistence Layer | Proyek dipulihkan dari Firestore / LocalStorage dengan state utuh. |
| 11 | Logout lalu login kembali | Auth Session Guard | Sesi dibersihkan saat logout, state user dipulihkan saat login ulang. |
| 12 | Isolasi data multi-pengguna | Security Rules | Pengguna A tidak dapat membaca atau memodifikasi dokumen milik Pengguna B. |
| 13 | Uji upload file tidak valid | File Validator | Menolak file selain JPEG/PNG/WebP atau ukuran melebihi 10MB dengan pesan kesalahan yang ramah. |
| 14 | Uji pemanggilan API provider gagal | Provider Adapter | Fallback otomatis ke Template Engine tanpa aplikasi crash. |
| 15 | Uji mode template offline tanpa API key | Template Fallback | Menghasilkan prompt sinematik terstruktur dan continuity bible lengkap. |
| 16 | Uji responsivitas mobile smartphone | Responsive Layout | Form dan storyboard card nyaman dioperasikan satu tangan di viewport 375px+. |
| 17 | Uji build produksi | Next.js Build Pipeline | `npm run build` selesai dengan status 0 error dan validasi tipe TypeScript sempurna. |

---

## 2. Menjalankan Pengujian Otomatis

Untuk menjalankan unit dan integration tests dengan Vitest:
```bash
npm run test
```

Untuk menjalankan pemeriksaan tipe TypeScript dan linter:
```bash
npm run lint
npm run build
```
