import { GoogleGenAI } from '@google/genai';
import { PhotoGeneratorInput, PhotoGeneratedOutput, PhotoRefinementRequest } from '@/types/photo';
import { generateDeterministicPhotoPrompt } from './deterministic-engine';
import { buildPhotoNegativePrompt } from './negative-prompt-builder';
import { IPHONE13_CAMERA_DETAILS } from './constants';

const MASTER_SYSTEM_INSTRUCTION = `Anda adalah ahli prompt engineering fotografi realistis, fotografer smartphone profesional, analis visual, dan spesialis konsistensi karakter.

Tugas Anda adalah menyusun prompt fotografi yang sangat terperinci dalam Bahasa Indonesia berdasarkan input pengguna, referensi visual yang tersedia, dan parameter fotografi yang dipilih.

Tujuan utama adalah menghasilkan instruksi visual yang koheren untuk menciptakan foto yang secara estetika menyerupai fotografi manusia sungguhan menggunakan iPhone 13.

Anda harus:
1. Mempertahankan identitas wajah sesuai referensi yang diberikan.
2. Mempertahankan proporsi tubuh sesuai referensi yang diberikan.
3. Memisahkan ciri wajah dari ciri tubuh.
4. Tidak mengarang atribut visual yang tidak diketahui.
5. Mengutamakan anatomi manusia yang masuk akal.
6. Menghubungkan pose, ekspresi, pakaian, pencahayaan, perspektif, dan lingkungan secara logis.
7. Menyesuaikan karakter fotografi dengan kamera dan kondisi pemotretan.
8. Menghindari kulit plastik, simetri berlebihan, retouching berlebihan, tekstur artifisial, dan detail visual yang tidak konsisten.
9. Tidak menambahkan cacat fotografis secara acak.
10. Menggunakan Bahasa Indonesia yang natural dan spesifik.
11. Menghindari repetisi kata yang tidak menambah nilai.
12. Tidak mengorbankan konsistensi identitas demi variasi kreatif.
13. Tidak mengubah detail yang sudah dikunci ketika pengguna hanya meminta perubahan pada elemen lain.
14. Menyusun negative prompt yang relevan dengan adegan.
15. Menghasilkan keluaran terstruktur sesuai schema JSON aplikasi.

Jangan menjanjikan hasil yang identik dengan foto asli. Prompt adalah instruksi untuk model gambar, bukan jaminan atas hasil akhirnya.

Jika pengguna memberikan instruksi yang tidak lengkap, isi kekosongan dengan asumsi fotografis yang paling wajar. Jika dua instruksi bertentangan, prioritaskan instruksi eksplisit pengguna, konsistensi identitas, dan kelayakan fisik.

Hasil harus detail, spesifik, koheren, natural, dan siap disalin ke model pembuat gambar.`;

export function checkGeminiConfigStatus(): {
  isConfigured: boolean;
  modelName: string;
} {
  const apiKey = process.env.GEMINI_API_KEY;
  const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  return {
    isConfigured: Boolean(apiKey && apiKey.trim().length > 10),
    modelName,
  };
}

/**
 * Calls authentic Google Gemini API to generate an ultra-realistic Indonesian photography prompt.
 */
export async function generatePhotoPromptWithGemini(
  input: PhotoGeneratorInput
): Promise<PhotoGeneratedOutput> {
  const apiKey = process.env.GEMINI_API_KEY;
  const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

  // Fallback if API key is not configured in environment
  if (!apiKey || apiKey.trim().length === 0) {
    return generateDeterministicPhotoPrompt(input);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    // Prepare contents payload
    const userPromptText = `Berikut adalah instruksi penyusunan prompt fotografi untuk subjek ${input.characterName}:

DATA SPESIFIKASI:
- Karakter: ${input.characterName} (${input.faceLock.ethnicityAndAge})
- Mode: ${input.mode} | Preset: ${input.preset}
- Penguncian Wajah (Face Lock): ${input.faceLock.enabled ? `AKTIF (${input.faceLock.priority})` : 'NON-AKTIF'}
  * Struktur Tulang & Wajah: ${input.faceLock.facialStructure}
  * Tekstur Kulit Wajah & Tanda Khusus: ${input.faceLock.skinDetail}
  * Mata & Alis: ${input.faceLock.eyesAndBrows}
  * Hidung: ${input.faceLock.noseProfile}
  * Bibir: ${input.faceLock.lipsDetail}
  * Kacamata: ${input.faceLock.glasses}
  * Rambut & Anak Rambut: ${input.faceLock.hairAndFlyaways}
- Penguncian Tubuh (Body Lock): ${input.bodyLock.enabled ? `AKTIF (${input.bodyLock.priority})` : 'NON-AKTIF'}
  * Tinggi & Berat: ${input.bodyLock.heightAndWeight}
  * Siluet Tubuh: ${input.bodyLock.bodySilhouette}
  * Kulit Tubuh: ${input.bodyLock.skinTexture}
  * Dada & Leher: ${input.bodyLock.bustDetail}, ${input.bodyLock.neckAndShoulders}
  * Pinggang & Perut: ${input.bodyLock.waistAndMidriff}
  * Pinggul, Bokong & Kaki: ${input.bodyLock.hipsAndGlutes}, ${input.bodyLock.legsAndThighs}
- Lokasi & Waktu: ${input.location}, ${input.timeOfDay}
- Pencahayaan: ${input.lightingCondition}
- Pose & Bahasa Tubuh: ${input.bodyPose}
- Ekspresi & Pandangan: ${input.facialExpression}, arah pandangan ${input.gazeDirection}
- Pakaian & Aksesoris: ${input.outfit}. Aksesoris: ${input.accessories}
- Kamera iPhone 13: ${input.cameraDevice} (${input.cameraAngle}, ${input.cameraDistance})
- Komposisi & Aspek Rasio: ${input.composition}, rasio ${input.aspectRatio}
- Intensitas Realisme: ${input.realismIntensity}
- Detail Tambahan: ${input.additionalDetails || 'Tidak ada'}
${input.customScenePrompt ? `- Instruksi Skenario Khusus: ${input.customScenePrompt}` : ''}

Susunlah hasil keluaran dalam JSON valid persis dengan struktur berikut:
{
  "title": "Judul foto yang menarik dalam Bahasa Indonesia",
  "summary": "Ringkasan konsep foto dalam 1-2 kalimat",
  "mainPrompt": "Narasi prompt fotografi lengkap, sangat detail, kaya informasi visual, dan natural dalam Bahasa Indonesia (mencakup subjek, konsistensi wajah, anatomi tubuh, pakaian, pencahayaan alami, kamera iPhone 13, dan tekstur raw unretouched)",
  "negativePrompt": "Daftar larangan visual anti-AI spesifik yang relevan",
  "faceLockInstruction": "Instruksi eksplisit untuk model gambar mengenai fitur wajah yang wajib dikunci",
  "bodyLockInstruction": "Instruksi eksplisit mengenai proporsi tubuh dan anatomi yang wajib dijaga",
  "technicalNotes": ["Catatan teknis 1", "Catatan teknis 2"]
}`;

    const contents: any[] = [{ role: 'user', parts: [{ text: userPromptText }] }];

    // If base64 reference images exist in input, attach them to the request
    if (input.faceLock.referenceImages && input.faceLock.referenceImages.length > 0) {
      for (const img of input.faceLock.referenceImages.slice(0, 2)) {
        if (img.url.startsWith('data:image/')) {
          const match = img.url.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
          if (match) {
            contents[0].parts.push({
              inlineData: {
                mimeType: match[1],
                data: match[2],
              },
            });
          }
        }
      }
    }

    const response = await ai.models.generateContent({
      model: modelName,
      contents,
      config: {
        systemInstruction: MASTER_SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        temperature: input.creativityLevel || 0.7,
      },
    });

    const responseText = response.text;
    if (!responseText) {
      console.warn('[GeminiPhoto] Empty response from Gemini, falling back to deterministic.');
      return generateDeterministicPhotoPrompt(input);
    }

    const parsed = JSON.parse(responseText.trim());

    const actualDeviceKey = input.cameraDevice === 'auto'
      ? (input.cameraDistance === 'close_up' ? 'iphone13_front_truedepth' : 'iphone13_main_back')
      : input.cameraDevice;
    const cameraDetails = IPHONE13_CAMERA_DETAILS[actualDeviceKey];

    return {
      id: `photo-prompt-${Date.now()}`,
      title: parsed.title || `${input.preset} — ${input.characterName}`,
      summary: parsed.summary || `Foto lifestyle realistis ${input.characterName} dengan penguncian wajah dan tubuh.`,
      mainPrompt: parsed.mainPrompt || generateDeterministicPhotoPrompt(input).mainPrompt,
      negativePrompt: parsed.negativePrompt || buildPhotoNegativePrompt(input),
      photoSettings: {
        device: 'Apple iPhone 13',
        camera: cameraDetails.name,
        focalLength: cameraDetails.focalLength,
        aperture: cameraDetails.aperture,
        lighting: input.lightingCondition,
        composition: input.composition,
        aspectRatio: input.aspectRatio,
      },
      faceLockInstruction: parsed.faceLockInstruction || generateDeterministicPhotoPrompt(input).faceLockInstruction,
      bodyLockInstruction: parsed.bodyLockInstruction || generateDeterministicPhotoPrompt(input).bodyLockInstruction,
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
      technicalNotes: parsed.technicalNotes || [
        'Dihasilkan secara cerdas oleh Google Gemini AI dengan Master Photography System Instruction.',
        'Menerapkan iPhone 13 Optical Realism & Anti-AI Human Consistency.',
      ],
      timestamp: new Date().toISOString(),
      modelUsed: `Google Gemini (${modelName})`,
      generationSource: 'gemini-api',
    };
  } catch (error: any) {
    console.error('[GeminiPhoto] Error executing Gemini API:', error);
    // Safe deterministic fallback with note
    const fallback = generateDeterministicPhotoPrompt(input);
    return {
      ...fallback,
      technicalNotes: [
        `Catatan: Koneksi Gemini API mengalami kendala (${error?.message || 'timeout/rate-limit'}). Prompt disusun menggunakan High-Fidelity Deterministic Engine.`,
        ...fallback.technicalNotes,
      ],
    };
  }
}

/**
 * Context-aware refinement using Gemini API.
 */
export async function refinePhotoPromptWithGemini(
  request: PhotoRefinementRequest
): Promise<PhotoGeneratedOutput> {
  const apiKey = process.env.GEMINI_API_KEY;
  const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

  const actionDescriptions: Record<PhotoRefinementRequest['refinementAction'], string> = {
    strengthen_face_lock: 'Perkuat penguncian wajah (Face Lock) agar deskripsi fitur wajah dan detail mikro pori-pori/tahi lalat/kacamata menjadi lebih dominan dan tidak bisa diubah oleh AI pembuat gambar.',
    strengthen_body_lock: 'Perkuat penguncian tubuh (Body Lock) agar siluet jam pasir 169cm/56kg, dada 42 berbobot alami, dan pinggang 60cm tanpa otot benar-benar terjaga.',
    alternative_pose: 'Ciptakan variasi pose tubuh baru yang tetap santai, anatomis masuk akal, dan rileks tanpa mengubah identitas karakter, wajah, atau pakaian.',
    change_location: `Ubah lokasi pemotretan menjadi: ${request.customInstruction || 'lingkungan baru yang estetik'}, sambil mempertahankan wajah, tubuh, dan pakaian yang sudah ada.`,
    change_outfit: `Ubah pakaian subjek menjadi: ${request.customInstruction || 'gaya busana baru yang serasi'}, tanpa mengubah bentuk tubuh atau identitas wajah.`,
    lighting_variation: `Ciptakan variasi tata cahaya baru: ${request.customInstruction || 'pencahayaan yang lebih dramatis dan natural'}, tetap sesuai karakter kamera iPhone 13.`,
    more_natural_raw: 'Tingkatkan kadar realisme mentah (raw unretouched): perjelas ketidaksempurnaan optik alami, hilangkan kesan retouching, dan pertegas tekstur pori-pori serta serat kain.',
    fix_anatomy_perspective: 'Periksa dan sempurnakan kesesuaian anatomi persendian tangan, jari, dan perspektif kamera smartphone agar 100% bebas dari cacat AI.',
    custom: request.customInstruction || 'Lakukan penyesuaian sesuai instruksi khusus pengguna.',
  };

  const instruction = actionDescriptions[request.refinementAction];

  if (!apiKey) {
    // Local modification without API call
    return {
      ...request.currentPrompt,
      id: `photo-prompt-${Date.now()}`,
      title: `${request.currentPrompt.title} (Revisi: ${request.refinementAction})`,
      mainPrompt: `${request.currentPrompt.mainPrompt}\n\n[REVISI KHUSUS]: ${instruction}`,
      timestamp: new Date().toISOString(),
      generationSource: 'deterministic-engine',
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Anda memiliki prompt fotografi berikut:
---
JUDUL: ${request.currentPrompt.title}
PROMPT UTAMA SEBELUMNYA:
${request.currentPrompt.mainPrompt}

NEGATIVE PROMPT SEBELUMNYA:
${request.currentPrompt.negativePrompt}
---

INSTRUKSI PERBAIKAN:
${instruction}

Aturan penting: Pertahankan bagian prompt yang tidak diminta untuk diubah (misal: jika hanya diminta mengubah lokasi, JANGAN mengubah identitas wajah, bentuk tubuh, kacamata, atau ciri fisik karakter).

Keluarkan hasil perbaikan dalam format JSON:
{
  "title": "Judul revisi baru",
  "summary": "Ringkasan perubahan",
  "mainPrompt": "Narasi prompt fotografi yang telah direvisi secara komprehensif dalam Bahasa Indonesia",
  "negativePrompt": "Negative prompt yang diperbarui jika diperlukan",
  "technicalNotes": ["Catatan perubahan yang telah dilakukan"]
}`;

    const response = await ai.models.generateContent({
      model: modelName,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: MASTER_SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');

    return {
      ...request.currentPrompt,
      id: `photo-prompt-${Date.now()}`,
      title: parsed.title || `${request.currentPrompt.title} (Revisi)`,
      summary: parsed.summary || request.currentPrompt.summary,
      mainPrompt: parsed.mainPrompt || request.currentPrompt.mainPrompt,
      negativePrompt: parsed.negativePrompt || request.currentPrompt.negativePrompt,
      technicalNotes: parsed.technicalNotes || [
        `Berhasil diperbarui melalui Gemini Refinement Engine: ${request.refinementAction}`,
      ],
      timestamp: new Date().toISOString(),
      generationSource: 'gemini-api',
    };
  } catch (err: any) {
    console.error('[GeminiPhotoRefine] Error refining prompt:', err);
    return {
      ...request.currentPrompt,
      id: `photo-prompt-${Date.now()}`,
      title: `${request.currentPrompt.title} (Revisi Manual)`,
      mainPrompt: `${request.currentPrompt.mainPrompt}\n\n[CATATAN REVISI]: ${instruction}`,
      timestamp: new Date().toISOString(),
      generationSource: 'deterministic-engine',
    };
  }
}
