# PANDUAN SETUP FIREBASE & KEAMANAN DATA

Dokumen ini menjelaskan langkah konfigurasi Firebase Authentication, Cloud Firestore, dan Firebase Storage untuk **Affiliate Video Prompt Studio**.

---

## 1. Arsitektur Keamanan Firebase

Aplikasi ini menggunakan pola otentikasi dan isolasi data per pengguna (*multi-tenant user isolation*):
- Setiap pengguna memiliki User ID unik (`auth.uid`).
- Dokumen proyek disimpan di sub-koleksi atau koleksi bertanda kepemilikan: `/projects/{projectId}` di mana field `userId == request.auth.uid`.
- File aset gambar produk & karakter disimpan di Google Cloud Storage pada path: `users/{userId}/projects/{projectId}/{fileName}`.
- Mode fallback offline tersedia secara bawaan (*localStorage storage engine*) jika kredensial Firebase belum dimasukkan.

---

## 2. Konfigurasi Firebase Console

1. Kunjungi [Firebase Console](https://console.firebase.google.com/) dan buat proyek baru (misal: `affiliate-video-studio`).
2. **Aktifkan Firebase Authentication**:
   - Buka menu **Authentication** > **Sign-in method**.
   - Aktifkan provider **Email/Password** dan/atau **Google**.
3. **Aktifkan Cloud Firestore**:
   - Buka menu **Firestore Database** > **Create database**.
   - Pilih mode produksi (*Production Mode*).
   - Pilih lokasi server terdekat (misal: `asia-southeast2` Jakarta atau `asia-southeast1` Singapura).
4. **Aktifkan Firebase Storage**:
   - Buka menu **Storage** > **Get started**.
   - Pilih lokasi bucket yang sama.
5. **Dapatkan Web App Credentials**:
   - Masuk ke **Project Settings** > **General** > **Your apps** > Tambahkan Web App (`</>`).
   - Salin nilai konfigurasi ke file `.env.local`.

---

## 3. Firestore Security Rules (`firestore.rules`)

Salin aturan berikut ke menu **Firestore Database > Rules** atau deploy via Firebase CLI:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Fungsi pembantu keamanan
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    // Aturan koleksi Projects
    match /projects/{projectId} {
      // Izinkan baca & hapus hanya jika pengguna adalah pemilik
      allow read, delete: if isAuthenticated() && resource.data.userId == request.auth.uid;
      
      // Izinkan buat jika field userId sama dengan UID autentikasi
      allow create: if isAuthenticated() && request.resource.data.userId == request.auth.uid;
      
      // Izinkan update jika pemilik dan tidak mengubah kepemilikan userId
      allow update: if isAuthenticated() 
                    && resource.data.userId == request.auth.uid 
                    && request.resource.data.userId == request.auth.uid;
    }
    
    // Aturan template publik / read-only library
    match /templates/{templateId} {
      allow read: if true; // Publik dapat membaca template bawaan
      allow write: if false; // Hanya diubah via admin console
    }
  }
}
```

---

## 4. Firebase Storage Security Rules (`storage.rules`)

Salin aturan berikut ke menu **Storage > Rules**:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    function isValidImage() {
      return request.resource.contentType.matches('image/(jpeg|png|webp)')
             && request.resource.size < 10 * 1024 * 1024; // Maksimal 10MB
    }
    
    match /users/{userId}/projects/{projectId}/{allPaths=**} {
      allow read: if isOwner(userId);
      allow write: if isOwner(userId) && isValidImage();
      allow delete: if isOwner(userId);
    }
  }
}
```

---

## 5. Environment Variables

Letakkan variabel berikut pada `.env.local` di lingkungan pengembangan, atau di pengaturan Environment Variables pada Vercel saat deployment:

```env
# Client-side Firebase Config (Aman diekspos ke browser)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=affiliate-video-studio.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=affiliate-video-studio
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=affiliate-video-studio.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abcdef123456

# Server-Side Only (Opsional untuk AI Provider)
GEMINI_API_KEY=your_gemini_api_key_here
```
