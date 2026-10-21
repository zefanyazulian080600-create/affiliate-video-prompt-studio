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
Pertahankan identitas wajah berdasarkan 4 sudut foto referensi (Depan, Samping, 3/4, Belakang) yang telah disediakan.
- Karakter: ${input.faceLock.characterName} (${input.faceLock.ethnicityAndAge}).
- Bentuk Wajah & Tulang: ${input.faceLock.facialStructure}
- Ciri Kulit & Tanda Unik: ${input.faceLock.skinDetail}
- Mata & Alis: ${input.faceLock.eyesAndBrows}
- Hidung: ${input.faceLock.noseProfile}
- Bibir: ${input.faceLock.lipsDetail}
- Kacamata: ${input.faceLock.glasses || 'Sesuai instruksi aksesoris'}
- Rambut & Anak Rambut: ${input.faceLock.hairAndFlyaways}
Aturan: Pertahankan identitas visual wajah asli. Jangan merombak bentuk rahang, jangan menghilangkan tahi lalat khas di pipi kanan bawah atau freckles alami hidung.`
    : 'Face Lock dinonaktifkan: karakteristik wajah fleksibel mengikuti deskripsi umum.';

  // Body lock instructions
  const bodyLockInstruction = input.bodyLock.enabled
    ? `PENGUNCIAN PROPORSI TUBUH (BODY LOCK — PRIORITAS ${input.bodyLock.priority.toUpperCase()}):
Pertahankan proporsi tubuh berdasarkan foto referensi tubuh headless (Depan, Samping, Belakang, 3/4):
- Tinggi & Berat Badan: ${input.bodyLock.heightAndWeight}
- Siluet Tubuh: ${input.bodyLock.bodySilhouette}
- Tekstur Kulit Tubuh: ${input.bodyLock.skinTexture}
- Leher, Bahu & Lengan: ${input.bodyLock.neckAndShoulders}
- Dada: ${input.bodyLock.bustDetail}
- Pinggang & Perut: ${input.bodyLock.waistAndMidriff}
- Pinggul & Bokong: ${input.bodyLock.hipsAndGlutes}
- Kaki & Paha: ${input.bodyLock.legsAndThighs}
Aturan: Pertahankan siluet tubuh jam pasir alami yang lembut, berisi, dan tidak berotot. Gravitasi payudara dan jaringan kulit harus masuk akal secara anatomis.`
    : 'Body Lock dinonaktifkan: proporsi tubuh fleksibel mengikuti deskripsi umum.';

  // Construct the narrative main prompt in natural Indonesian
  const mirrorSection = optics.mirrorSelfieRules ? `\n\n${optics.mirrorSelfieRules}` : '';

  const mainPrompt = `Foto candid gaya hidup yang sangat realistis (photorealistic candid lifestyle photography), diambil secara autentik menggunakan kamera ${cameraDetails.name} dalam situasi kehidupan nyata, dengan pencahayaan natural, tekstur kulit mentah tanpa sentuhan airbrush, dan proporsi anatomi manusia sejati.

1. SUBJEK & IDENTITAS KARAKTER (KONSISTENSI REFERENSI):
Subjek utama adalah ${input.characterName}, seorang ${input.faceLock.ethnicityAndAge}. Wajah dan kepalanya mengunci identitas visual foto referensi secara ketat: bentuk wajah oval dengan pipi lembut berisi, sepasang mata almond cokelat gelap ekspresif berbingkai kacamata tipis gunmetal, hidung mancung natural berujung membulat manis dengan taburan freckles halus di punggung hidung, serta satu tahi lalat kecil yang terlihat jelas di pipi kanan bawah. Bibir penuh kemerahan koral lembut dengan lipatan alami, membingkai senyum tipis tertutup yang hangat. Rambut panjang berwarna cokelat espresso gelap bergelombang longgar bervolume alami (loose beach waves) terbelah tengah, dengan anak rambut halus (baby hairs & flyaways) yang berkilau lembut terkena cahaya matahari.

2. PROPORSI ANATOMI & POSTUR TUBUH (BODY LOCK):
Bentuk tubuh subjek mengikuti siluet jam pasir feminin yang proporsional (tinggi 169 cm, berat 56 kg), lembut dan berisi alami tanpa definisi otot binaraga. Proporsi dada ukuran 42 yang padat dan bervolume jatuh mengikuti gravitasi alami tubuh, pinggang ramping 60 cm yang melengkung mulus ke pinggul feminin yang bulat dan berisi, serta sepasang kaki jenjang yang ramping memanjang secara harmonis. Postur tubuh: ${input.bodyPose}, dengan bahu rileks dan distribusi tumpuan berat badan yang natural.

3. PAKAIAN & AKSESORIS:
Subjek mengenakan ${input.outfit}. Tekstur serat kain pakaian tampak nyata dengan lipatan, peregangan kain di area dada dan pinggul, serta jahitan tepi pakaian yang presisi mengikuti gerak tubuh secara fisik. Aksesoris pelengkap: ${input.accessories}.

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
    characterProfile: {
      name: input.characterName,
      ethnicityAndAge: input.faceLock.ethnicityAndAge,
      keyFacialFeatures: [
        'Oval lembut, pipi berisi sehat',
        'Mata almond cokelat gelap dengan aegyo-sal',
        'Freckles alami di hidung dan pipi atas',
        'Tahi lalat kecil di pipi kanan bawah',
        'Kacamata bingkai logam tipis gunmetal',
        'Bibir koral lembut dengan garis vertikal mikro',
        'Rambut panjang dark espresso bergelombang alami & flyaways',
      ],
      bodyProportions: 'Tinggi 169 cm, berat 56 kg, siluet jam pasir lembut, bust 42, pinggang 60 cm, tidak berotot, jaringan lembut manusia nyata.',
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
