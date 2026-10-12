import {
  DurationPlan,
  ProductProfile,
  CreativeConcept,
  ContinuityBible,
  CharacterReference,
  ProductImageReference,
  ScenePlan,
} from '@/types';
import { buildSceneNegativePrompts } from './negative-prompt-builder';

/**
 * Scene Generator: Synthesizes individual scene plans, linking ending states to starting states,
 * and generating the critical "NEXT SCENE HANDOFF" package for seamless video continuity.
 */
export function generateScenePlans(
  durationPlan: DurationPlan,
  product: ProductProfile,
  concept: CreativeConcept,
  bible: ContinuityBible,
  characterRef?: CharacterReference,
  productImages: ProductImageReference[] = []
): ScenePlan[] {
  const { sceneDurations, sceneCount, workflowModel } = durationPlan;
  const scenes: ScenePlan[] = [];

  const hasCharacter = true; // By default talent-driven affiliate content or UGC
  const primaryImg = productImages.find(img => img.isPrimary) || productImages[0];
  const primaryImgName = primaryImg ? primaryImg.fileName : 'product_reference.jpg';

  // Determine stage mapping based on sceneCount
  const stages: ('Hook' | 'Context' | 'Product Reveal' | 'Demonstration' | 'Desire/Benefit' | 'Objection Handling' | 'CTA')[] = [];
  if (sceneCount === 1) {
    stages.push('Hook');
  } else if (sceneCount === 2) {
    stages.push('Hook', 'CTA');
  } else if (sceneCount === 3) {
    stages.push('Hook', 'Demonstration', 'CTA');
  } else if (sceneCount === 4) {
    stages.push('Hook', 'Product Reveal', 'Demonstration', 'CTA');
  } else if (sceneCount === 5) {
    stages.push('Hook', 'Context', 'Product Reveal', 'Demonstration', 'CTA');
  } else {
    // 6 or more
    stages.push('Hook', 'Context', 'Product Reveal', 'Demonstration', 'Objection Handling', 'CTA');
    while (stages.length < sceneCount) {
      stages.splice(stages.length - 1, 0, 'Desire/Benefit');
    }
  }

  let previousEndingState = '';
  let previousUnresolvedAction = '';

  for (let i = 0; i < sceneCount; i++) {
    const sceneNumber = i + 1;
    const duration = sceneDurations[i];
    const stage = stages[i] || 'Demonstration';
    const isFirstScene = i === 0;
    const isLastScene = i === sceneCount - 1;

    // Narrative generation per stage
    let primaryAction = '';
    let visualHookDesc = '';
    let cameraDesc = '';
    const lightingDesc = bible.environmentLock.lightingStyle;
    let dialogueVO = '';
    let soundDesign = '';
    const screenDirection = 'Center facing camera, moving slightly right';
    const charPosition = 'Screen center, seated or standing in mid-ground';
    const prodPosition = 'Held naturally in hands or positioned prominently on foreground surface';
    let startingState = '';
    let endingState = '';
    let unresolvedAction = '';
    let transitionInstruction = '';

    if (stage === 'Hook') {
      visualHookDesc = `${concept.visualHookAngle} — Menghentikan scroll penonton dalam 3 detik pertama dengan ekspresi spontan dan kemunculan produk.`;
      primaryAction = `Talent ${bible.characterLock.visualIdentity} berada di ${bible.environmentLock.location}. Talent menunjukkan rasa antusias, mengangkat ${product.productName} ke dekat lensa kamera dengan senyum percaya diri dan gestur mengundang.`;
      cameraDesc = 'Dynamic eye-level medium close-up, smooth push-in stabil, 50mm f/1.8 lens look dengan shallow depth of field.';
      dialogueVO = `VO (ID): "Kalian sering ngerasa ribet nyari yang pas? Nih, kenalin ${product.productName} yang lagi viral di Shopee!"`;
      soundDesign = 'Crisp whoosh sound effect on camera zoom-in, upbeat modern lo-fi pop background music starting with upbeat bassline.';
      startingState = `Talent berdiri santai di setting ${bible.environmentLock.location}, postur rileks, tangan memegang produk setinggi dada.`;
      endingState = `Talent mengarahkan produk ke kamera, tangan kanan memegang sisi utama produk, tangan kiri mulai menunjuk ke fitur detail.`;
      unresolvedAction = `Jari telunjuk tangan kiri talent sedang bergerak mengarah ke tekstur permukaan produk untuk menunjukkan detail.`;
      transitionInstruction = 'Lanjutkan gerakan penunjukan fitur tanpa memotong posisi tangan atau merubah sudut pandang.';
    } else if (stage === 'Context' || stage === 'Product Reveal') {
      visualHookDesc = `Reveal dramatis estetika dan fisik ${product.productName} dari dekat.`;
      primaryAction = `Melanjutkan dari adegan sebelumnya: Talent memutar perlahan ${product.productName} untuk memperlihatkan sudut 360 derajat. Detail ${product.keyFeatures[0] || 'finishing'} terlihat sangat jernih dan mewah di bawah pantulan cahaya alami.`;
      cameraDesc = 'Silky smooth orbit camera movement 45 derajat mengitari produk, close-up macro focal length 85mm f/2.0.';
      dialogueVO = `VO (ID): "Lihat deh detail bahannya, bener-bener rapi dan kokoh banget. Kualitasnya jauh melampaui harganya!"`;
      soundDesign = 'Subtle satisfying texture sound, gentle ASMR tactile friction sound, warm melodious acoustic chords.';
      startingState = previousEndingState || `Talent memegang produk setinggi dada di setting ${bible.environmentLock.location}.`;
      endingState = `Produk terpasang atau diletakkan di posisi siap pakai, talent tersenyum puas mengagumi hasil fisik produk.`;
      unresolvedAction = `Talent bersiap menguji penggunaan produk secara langsung dalam aktivitas nyata.`;
      transitionInstruction = 'Seamless match cut atau direct motion continuation ke aksi demonstrasi fungsional.';
    } else if (stage === 'Demonstration') {
      visualHookDesc = `Demonstrasi nyata manfaat ${product.coreBenefits[0] || 'keunggulan produk'} saat digunakan.`;
      primaryAction = `Talent memperagakan fungsi utama ${product.productName} dalam aksi nyata: ${product.coreBenefits[0] || 'kenyamanan pemakaian'}. Gerakan terasa natural, lentur, dan memperlihatkan keunggulan produk tanpa rekayasa berlebihan.`;
      cameraDesc = 'Tracking shot medium framing mengikuti ritme gerakan talent, diselingi insert shot close-up aksi produk.';
      dialogueVO = `VO (ID): "Dipakai seharian buat aktivitas padat tetep berasa enteng dan nyaman. Nggak bikin pegal sama sekali!"`;
      soundDesign = 'Natural ambient foley of product in active use, energetic dynamic beat elevation.';
      startingState = previousEndingState || `Talent memegang produk dan bersiap melakukan demonstrasi.`;
      endingState = `Demonstrasi selesai dengan gestur puas, talent menoleh kembali ke arah lensa kamera dengan tatapan meyakinkan.`;
      unresolvedAction = `Talent mengangkat kedua alis dengan ekspresi terkesima dan mengacungkan jempol ke arah kamera.`;
      transitionInstruction = 'Lanjutkan kontak mata talent ke audiens langsung menuju kesimpulan rekomendasi.';
    } else if (stage === 'Desire/Benefit' || stage === 'Objection Handling') {
      visualHookDesc = `Menghilangkan keraguan calon pembeli mengenai daya tahan dan kesesuaian harga.`;
      primaryAction = `Talent memperlihatkan ketahanan fisik atau fleksibilitas ${product.productName}. Menjawab pertanyaan umum audiens dengan gestur meyakinkan dan perbandingan visual yang jujur.`;
      cameraDesc = 'Over-the-shoulder medium shot shifting smoothly into tight eye-level portrait.';
      dialogueVO = `VO (ID): "Banyak yang nanya awet nggak? Tenang, build quality-nya udah teruji banget buat pemakaian jangka panjang."`;
      soundDesign = 'Gentle positive harp chime, supportive energetic rhythm.';
      startingState = previousEndingState || `Talent menatap kamera dengan gestur meyakinkan.`;
      endingState = `Talent menunjuk ke arah kiri bawah layar (lokasi keranjang kuning Shopee) dengan senyum mengajak.`;
      unresolvedAction = `Tangan talent menunjuk ke posisi keranjang kuning dengan ritme ajakan ramah.`;
      transitionInstruction = 'Sambungkan langsung ke adegan penutup Call to Action tanpa jeda visual.';
    } else {
      // CTA stage
      visualHookDesc = `Panggilan bertindak tegas dan jelas mengarahkan penonton ke link affiliate keranjang kuning Shopee.`;
      primaryAction = `Talent memegang ${product.productName} di satu tangan sambil tersenyum ceria, tangan lainnya menunjuk antusias ke arah pojok kiri bawah layar di mana ikon keranjang kuning Shopee berada. Banner promo visual terpancar natural.`;
      cameraDesc = 'High-impact medium close-up, slight upward Dutch angle 5 derajat, razor-sharp focus pada wajah dan produk.';
      dialogueVO = `VO (ID): "${concept.callToAction}"`;
      soundDesign = 'Uplifting crescendo finale, friendly Shopee notification bell chime, celebratory beat outro.';
      startingState = previousEndingState || `Talent menunjuk ke arah kiri bawah frame.`;
      endingState = `Pose akhir terkunci: Talent tersenyum ramah sambil memperlihatkan produk dengan jelas di samping wajah, siap untuk looping video.`;
      unresolvedAction = 'None (End of video, natural loopable pause).';
      transitionInstruction = 'Final hold frame for video loop / platform replay.';
    }

    // Save states for next scene chaining
    previousEndingState = endingState;
    previousUnresolvedAction = unresolvedAction;

    // Build NEXT SCENE HANDOFF package block
    let nextSceneHandoffPackage = '';
    if (!isLastScene) {
      nextSceneHandoffPackage = `[NEXT SCENE HANDOFF — SCENE ${sceneNumber} TO SCENE ${sceneNumber + 1}]
• Expected Ending Frame: ${endingState}
• Talent Pose & Blocking: ${charPosition}, body language confident, authentic Indonesian creator appearance.
• Product Position & State: ${prodPosition}, strictly preserving exact shape, color, and logo from '${primaryImgName}'.
• Unfinished Motion to Continue: ${unresolvedAction}
• Camera & Lighting Baseline: ${cameraDesc} | ${lightingDesc}
• Continuity Mandate: DO NOT change wardrobe. DO NOT alter sneaker/product design. Seamlessly continue the unfinished motion from Scene ${sceneNumber}'s ending frame without teleportation or jump cuts.`;
    } else {
      nextSceneHandoffPackage = `[FINAL SCENE COMPLETION]
• Final Hold Pose: ${endingState}
• Seamless Loop Capability: Posed for smooth transition back to Scene 1 hook.
• Platform CTA: Shopee yellow basket overlay anchor intact.`;
    }

    // Build English Cinematic Prompt for Seedance 2.5 / Omni Flash
    const continuationHeader = isFirstScene
      ? `[ESTABLISHING SCENE 1 - DURATION: ${duration}s - ${workflowModel.toUpperCase()}]`
      : `[CONTINUATION SCENE ${sceneNumber} FROM SCENE ${sceneNumber - 1} - DURATION: ${duration}s - ${workflowModel.toUpperCase()}]
CONTINUITY INSTRUCTION: Continue directly from Scene ${sceneNumber - 1} final frame. Maintain exact character identity, wardrobe (${bible.characterLock.wardrobeAndAccessories}), environment (${bible.environmentLock.location}), and product fidelity (${product.productName}). Seamlessly pick up the unresolved action: ${previousUnresolvedAction || 'natural momentum'}.`;

    const promptEnglish = `${continuationHeader}
CINEMATOGRAPHY & SETTING: 9:16 vertical video format, photorealistic commercial aesthetic. ${cameraDesc}. ${lightingDesc}. Setting: ${bible.environmentLock.location}, ${bible.environmentLock.timeOfDay}, ${bible.environmentLock.colorPalette}.
SUBJECT & ACTION: ${bible.characterLock.visualIdentity}. Talent starts from: ${startingState}. Talent action: ${primaryAction}. Ends with: ${endingState}.
PRODUCT INTERACTION & LOCK: Featuring ${product.productName}. Product characteristics: ${bible.productLock.shapeAndProportions}, ${bible.productLock.colorAndFinish}. Preserve exact physical details from reference image '${primaryImgName}'. Strictly avoid product morphing or logo changes.
AUDIO CUE: ${dialogueVO} | Ambient audio: ${soundDesign}.`;

    // Build Indonesian Explanatory Prompt
    const promptIndonesian = `[SCENE ${sceneNumber} (${duration} Detik) — Preset ${workflowModel}]
• Tujuan Pemasaran: ${stage} (${visualHookDesc})
• Aksi Utama Talent: ${primaryAction}
• Panduan Kamera & Visual: ${cameraDesc} dengan pencahayaan ${lightingDesc} di lokasi ${bible.environmentLock.location}.
• Interaksi Produk: ${product.productName} dipertahankan warna, logo, dan bentuknya sesuai foto referensi '${primaryImgName}'.
• Voiceover / Narasi: ${dialogueVO}
• Desain Tata Suara: ${soundDesign}
• Status Awal: ${startingState}
• Status Akhir: ${endingState}
• Handoff ke Scene Berikutnya: ${isLastScene ? 'Selesai (Siap Looping)' : `Lanjutkan gerakan '${unresolvedAction}' pada Scene ${sceneNumber + 1}`}`;

    const negativePrompts = buildSceneNegativePrompts(i, sceneCount > 1, hasCharacter, workflowModel);

    scenes.push({
      sceneNumber,
      duration,
      marketingStage: stage,
      visualHookDescription: visualHookDesc,
      primaryAction,
      cameraDescription: cameraDesc,
      lightingDescription: lightingDesc,
      dialogueOrVoiceover: dialogueVO,
      soundDesign,
      promptId: `scene-${sceneNumber}-${Date.now().toString().slice(-4)}`,
      promptIndonesian,
      promptEnglish,
      negativePrompts,
      continuityState: {
        startingState,
        action: primaryAction,
        endingState,
        characterPosition: charPosition,
        productPosition: prodPosition,
        cameraPosition: cameraDesc,
        cameraMovement: 'Controlled smooth cinematic motion',
        screenDirection,
        environmentState: bible.environmentLock.location,
        lightingState: lightingDesc,
        propsState: 'Authentic minimal props matching setting',
        audioState: soundDesign,
        unresolvedAction,
        transitionInstruction,
        nextSceneHandoff: nextSceneHandoffPackage,
      },
      nextSceneHandoffPackage,
      isLocked: false,
      requiredImageReferences: primaryImg ? [primaryImg.fileName] : [],
      inconsistencyWarnings: [],
    });
  }

  return scenes;
}
