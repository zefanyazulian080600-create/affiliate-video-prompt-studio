import { PhotoGeneratorInput, PhotoGeneratedOutput } from '@/types/photo';
import { generateIPhone13OpticsGuidance } from './iphone13-engine';
import { generateNaturalHumanGuidance } from './natural-human-engine';
import { buildPhotoNegativePrompt } from './negative-prompt-builder';
import { IPHONE13_CAMERA_DETAILS } from './constants';

export function generateDeterministicPhotoPrompt(input: PhotoGeneratorInput): PhotoGeneratedOutput {
  const optics = generateIPhone13OpticsGuidance(
    input.cameraDevice,
    input.cameraAngle,
    input.cameraDistance,
    input.aspectRatio,
    input.lightingCondition
  );

  const humanRealism = generateNaturalHumanGuidance(
    input.faceLock,
    input.bodyLock,
    input.realismIntensity
  );

  const negativePrompt = buildPhotoNegativePrompt(input);

  const actualDeviceKey = input.cameraDevice === 'auto'
    ? (input.cameraDistance === 'close_up' ? 'iphone13_front_truedepth' : 'iphone13_main_back')
    : input.cameraDevice;
  const cameraDetails = IPHONE13_CAMERA_DETAILS[actualDeviceKey];

  // Title generation
  const presetTitleMap: Record<string, string> = {
    mirror_selfie: 'Mirror Selfie Kamar Estetik',
    casual_selfie: 'Casual Selfie Smartphone Natural',
    candid_street: 'Candid Street Photography Jakarta',
    lifestyle: 'Lifestyle Photography Eksplorasi Buku',
    indoor_portrait: 'Potret Natural Cahaya Jendela',
    outdoor_portrait: 'Potret Terbuka Taman Asri',
    cafe: 'Momen Nongkrong Kafe Santai',
    travel: 'Travel Photography Spontan',
    daily_activity: 'Aktivitas Harian Autentik',
    full_body: 'Potret Seluruh Badan Proporsi Nyata',
    half_body: 'Potret Setengah Badan OOTD',
    close_up: 'Potret Close-Up Detail Mikro Wajah',
    fashion_casual: 'Fashion Casual OOTD Modern',
    formal: 'Potret Semi-Formal Profesional',
    custom: 'Foto Realistis Skenario Khusus',
  };

  const title = `${presetTitleMap[input.preset] || 'Foto Realistis'} — ${input.characterName}`;
  const summary = `Foto lifestyle realistis ${input.characterName} dengan penguncian wajah (Face Lock) dan proporsi tubuh (Body Lock) berkarakteristik kamera ${cameraDetails.name}.`;

  // Face lock instructions
  const faceLockInstruction = input.faceLock.enabled
    ? `PENGUNCIAN IDENTITAS WAJAH (FACE LOCK — PRIORITAS ${input.faceLock.priority.toUpperCase()}):
Pertahankan identitas wajah berdasarkan deskripsi dan foto referensi yang disediakan:
- Karakter: ${input.characterName} (${input.faceLock.ethnicityAndAge || 'Wanita muda Asia'}).
- Bentuk Wajah & Tulang: ${input.faceLock.facialStructure || 'Bentuk wajah proporsional alami'}
- Ciri Kulit & Tanda Unik: ${input.faceLock.skinDetail || 'Tekstur kulit manusia asli berpori mikro'}
- Mata & Alis: ${input.faceLock.eyesAndBrows || 'Mata ekspresif alami'}
- Hidung: ${input.faceLock.noseProfile || 'Batang hidung natural'}
- Bibir: ${input.faceLock.lipsDetail || 'Bibir lembut natural'}
- Kacamata: ${input.faceLock.glasses || 'Tidak ada kacamata khusus'}
- Rambut & Anak Rambut: ${input.faceLock.hairAndFlyaways || 'Rambut bervolume alami'}
${input.faceLock.customNotes ? `- Catatan Kustom: ${input.faceLock.customNotes}\n` : ''}Aturan: Pertahankan identitas visual wajah asli. Jangan merombak struktur wajah atau mengubah usia secara drastis.`
    : 'Face Lock dinonaktifkan (Opsional): karakteristik wajah fleksibel mengikuti konsep umum adegan.';

  // Body lock instructions
  const bodyLockInstruction = input.bodyLock.enabled
    ? `PENGUNCIAN PROPORSI TUBUH (BODY LOCK — PRIORITAS ${input.bodyLock.priority.toUpperCase()}):
Pertahankan proporsi tubuh berdasarkan deskripsi dan referensi anatomi yang disediakan:
- Tinggi & Berat Badan: ${input.bodyLock.heightAndWeight || 'Proporsional natural'}
- Siluet Tubuh: ${input.bodyLock.bodySilhouette || 'Siluet tubuh manusia sejati'}
- Tekstur Kulit Tubuh: ${input.bodyLock.skinTexture || 'Tekstur kulit nyata dengan lipatan persendian alami'}
- Leher, Bahu & Lengan: ${input.bodyLock.neckAndShoulders || 'Bahu dan leher proporsional'}
- Dada: ${input.bodyLock.bustDetail || 'Bentuk dada mengikuti gravitasi alami'}
- Pinggang & Perut: ${input.bodyLock.waistAndMidriff || 'Garis pinggang alami tanpa editan berlebihan'}
- Pinggul & Bokong: ${input.bodyLock.hipsAndGlutes || 'Pinggul proporsional'}
- Kaki & Paha: ${input.bodyLock.legsAndThighs || 'Kaki jenjang proporsional'}
${input.bodyLock.customNotes ? `- Catatan Kustom: ${input.bodyLock.customNotes}\n` : ''}Aturan: Pertahankan proporsi tubuh dan berat jaringan lunak alami. Gravitasi tubuh dan jaringan kulit harus masuk akal secara anatomis.`
    : 'Body Lock dinonaktifkan (Opsional): proporsi tubuh fleksibel mengikuti konsep umum adegan.';

  // Outfit lock instructions
  const isOutfitRefActive = Boolean(input.outfitReference && input.outfitReference.enabled);
  const outfitLockInstruction = isOutfitRefActive
    ? `PENGUNCIAN REFERENSI OUTFIT (OUTFIT LOCK — PRIORITAS ${input.outfitReference!.priority.toUpperCase()}):
Pertahankan pakaian persis sesuai referensi yang ditentukan:
- Atasan (Top): ${input.outfitReference!.itemDetails.top || '-'}
- Bawahan (Bottom): ${input.outfitReference!.itemDetails.bottom || '-'}
- Luaran (Outerwear): ${input.outfitReference!.itemDetails.outer || '-'}
- Alas Kaki (Shoes): ${input.outfitReference!.itemDetails.shoes || '-'}
- Tas & Aksesoris Busana: ${input.outfitReference!.itemDetails.bagAndAccessories || '-'}
- Material & Tekstur Kain: ${input.outfitReference!.itemDetails.fabricTexture || 'Serat kain alami realistis'}
${input.outfitReference!.customNotes ? `- Catatan Khusus: ${input.outfitReference!.customNotes}\n` : ''}Aturan: Pertahankan konsistensi warna, model, dan tekstur pakaian di setiap sudut pemotretan.`
    : undefined;

  // Character Sheet instructions
  const isCharSheetActive = Boolean(input.characterSheet && input.characterSheet.enabled);
  const characterSheetInstruction = isCharSheetActive
    ? `REFERENSI LEMBAR KARAKTER (CHARACTER SHEET AKTIF):
Mengacu pada lembar karakter konsisten (${input.characterSheet!.sheetType}):
- Deskripsi Lembar: ${input.characterSheet!.sheetDescription || 'Lembar karakter 4-view multiaxis'}
${input.characterSheet!.imageUrl ? `- Sumber Referensi Gambar: ${input.characterSheet!.imageUrl}\n` : ''}Aturan: Jaga 100% konsistensi fitur wajah, proporsi fisik, dan elemen visual yang tercantum dalam lembar karakter.`
    : undefined;

  // Character Sheet Turnaround Prompt for generation
  const characterSheetPrompt = isCharSheetActive
    ? `Character design turnaround sheet, 4 multiple angles of the same person on a single image (full front view, side left profile, side right profile, back view), model sheet, character reference sheet, ultra photorealistic, neutral grey studio background, even soft diffuse lighting, identical facial features, consistent hairstyle and clothing, captured on 50mm portrait lens, 8k resolution, raw photo aesthetic --ar 16:9`
    : undefined;

  // Build narrative sections
  const faceNarrative = input.faceLock.enabled
    ? `Subjek utama adalah ${input.characterName}, seorang ${input.faceLock.ethnicityAndAge}. Wajah dan kepalanya mengunci identitas visual foto referensi secara konsisten: ${input.faceLock.facialStructure}. Ciri kulit: ${input.faceLock.skinDetail}. Mata dan alis: ${input.faceLock.eyesAndBrows}. Hidung: ${input.faceLock.noseProfile}. Bibir: ${input.faceLock.lipsDetail}. Rambut: ${input.faceLock.hairAndFlyaways}.${input.faceLock.glasses ? ` Aksesoris wajah: ${input.faceLock.glasses}.` : ''}`
    : `Subjek utama adalah ${input.characterName || 'seorang model'}${input.characterDescription ? `, ${input.characterDescription}` : ''}. Karakteristik wajah memiliki daya tarik alami manusia sejati, ekspresi wajah: ${input.facialExpression}, tatapan mata terarah ${input.gazeDirection}. Tekstur kulit wajah mentah menampilkan pori-pori mikro nyata tanpa efek airbrush plastik CGI.`;

  const bodyNarrative = input.bodyLock.enabled
    ? `Bentuk tubuh subjek mengunci proporsi anatomi terstandarisasi (${input.bodyLock.heightAndWeight}): ${input.bodyLock.bodySilhouette}. Dada: ${input.bodyLock.bustDetail}. Pinggang: ${input.bodyLock.waistAndMidriff}. Pinggul & kaki: ${input.bodyLock.hipsAndGlutes}, ${input.bodyLock.legsAndThighs}. Postur tubuh: ${input.bodyPose}, dengan bahu rileks dan distribusi tumpuan berat badan yang natural.`
    : `Proporsi tubuh subjek tampil natural dan harmonis dengan postur: ${input.bodyPose}. Seluruh lekuk tubuh, bahu, dan persendian memiliki kelenturan alami manusia nyata tanpa kekakuan digital.`;

  const outfitNarrative = isOutfitRefActive && input.outfitReference
    ? `Subjek mengenakan setelan busana terkurasi: atasan ${input.outfitReference.itemDetails.top}, dipadukan dengan bawahan ${input.outfitReference.itemDetails.bottom}${input.outfitReference.itemDetails.outer ? `, serta luaran ${input.outfitReference.itemDetails.outer}` : ''}. Alas kaki: ${input.outfitReference.itemDetails.shoes}. Tas & aksesoris busana: ${input.outfitReference.itemDetails.bagAndAccessories || input.accessories}. Tekstur kain: ${input.outfitReference.itemDetails.fabricTexture || 'serat kain alami dengan lipatan dan ketegangan bahan yang realistis mengikuti gerak tubuh'}.`
    : `Subjek mengenakan ${input.outfit}. Tekstur serat kain pakaian tampak nyata dengan lipatan, peregangan kain, serta jahitan tepi pakaian yang presisi mengikuti gerak tubuh secara fisik. Aksesoris pelengkap: ${input.accessories}.`;

  // Construct the narrative main prompt in natural Indonesian
  const mirrorSection = optics.mirrorSelfieRules ? `\n\n${optics.mirrorSelfieRules}` : '';

  const mainPrompt = `Foto candid gaya hidup yang sangat realistis (photorealistic candid lifestyle photography), diambil secara autentik menggunakan kamera ${cameraDetails.name} dalam situasi kehidupan nyata, dengan pencahayaan natural, tekstur kulit mentah tanpa sentuhan airbrush, dan proporsi anatomi manusia sejati.

1. SUBJEK & IDENTITAS KARAKTER:
${faceNarrative}

2. PROPORSI ANATOMI & POSTUR TUBUH:
${bodyNarrative}

3. PAKAIAN & AKSESORIS:
${outfitNarrative}

4. LOKASI, SUASANA & TATA CAHAYA:
Lokasi pemotretan berada di ${input.location}, pada waktu ${input.timeOfDay}. Pencahayaan: ${input.lightingCondition}. Arah cahaya menciptakan bayangan lembut yang masuk akal di lekuk pipi, bawah dagu, dan lantai, tanpa pencahayaan ganda atau kilau buatan yang bertentangan.

5. KARAKTERISTIK KAMERA & OPTIK SMARTPHONE iPHONE 13:
Direkam menggunakan ${optics.deviceDescription}
- Spesifikasi optik: ${optics.lensSpecs}
- Karakter ruang & fokus: ${optics.depthOfFieldGuidance}
- Perilaku sensor: ${optics.lightingAndSensorRolloff}${mirrorSection}
- Komposisi: ${input.composition}. ${optics.aspectRatioInstruction}

6. INTEGRITAS TEKSTUR RAW REALISTIS:
${humanRealism.skinRealismBlock}

Hasil akhir harus memancarkan estetika foto candid smartphone iPhone 13 asli yang diambil oleh seorang teman di dunia nyata — jernih, hangat, penuh kehidupan, dan 100% bebas dari ciri visual generatif AI.`.trim();

  const keyFeatures = input.faceLock.enabled
    ? [
        input.faceLock.facialStructure || 'Struktur wajah alami',
        input.faceLock.eyesAndBrows || 'Mata & alis ekspresif',
        input.faceLock.noseProfile || 'Hidung proporsional',
        input.faceLock.lipsDetail || 'Bibir lembut alami',
        input.faceLock.skinDetail || 'Pori-pori mikro nyata',
      ]
    : ['Fitur wajah fleksibel alami', 'Pori-pori mikro nyata tanpa airbrush', 'Ekspresi ramah natural'];

  return {
    id: `photo-prompt-${Date.now()}`,
    title,
    summary,
    mainPrompt,
    negativePrompt,
    photoSettings: {
      device: 'Apple iPhone 13',
      camera: cameraDetails.name,
      focalLength: cameraDetails.focalLength,
      aperture: cameraDetails.aperture,
      lighting: input.lightingCondition,
      composition: input.composition,
      aspectRatio: input.aspectRatio,
    },
    faceLockInstruction,
    bodyLockInstruction,
    outfitLockInstruction,
    characterSheetInstruction,
    characterSheetPrompt,
    characterProfile: {
      name: input.characterName,
      ethnicityAndAge: input.faceLock.ethnicityAndAge || 'Wanita muda Asia',
      keyFacialFeatures: keyFeatures,
      bodyProportions: input.bodyLock.enabled
        ? `${input.bodyLock.heightAndWeight}, ${input.bodyLock.bodySilhouette}`
        : 'Proporsi tubuh proporsional alami',
    },
    technicalNotes: [
      'Gunakan foto referensi Face Lock dan Body Lock terlampir sebagai panduan visual identitas karakter.',
      'Prompt diformulasikan khusus dengan karakteristik lensa dan pemrosesan gambar Apple iPhone 13.',
      'Negative prompt anti-AI disesuaikan untuk mencegah kulit plastik, tangan terdistorsi, atau efek bokeh palsu.',
    ],
    timestamp: new Date().toISOString(),
    modelUsed: 'Deterministic Natural Human Realism Engine v2.0',
    generationSource: 'deterministic-engine',
  };
}
