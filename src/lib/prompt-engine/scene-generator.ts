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

  const hasCharacter = true;
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

    // 1. Stage-based action synthesis
    if (stage === 'Hook') {
      visualHookDesc = `${concept.visualHookAngle} — Menghentikan scroll penonton dalam 3 detik pertama dengan visual langsung dan kemunculan produk.`;
      primaryAction = `Talent ${bible.characterLock.visualIdentity} berada di setting ${bible.environmentLock.location}. Talent menunjukkan rasa antusias spontan, mengangkat ${product.productName} ke dekat lensa kamera dengan senyum percaya diri dan gestur mengundang penonton.`;
      cameraDesc = 'Dynamic eye-level medium close-up, smooth push-in stabil, 50mm f/1.8 lens look dengan shallow depth of field.';
      startingState = `Talent berdiri santai di setting ${bible.environmentLock.location}, postur rileks, tangan memegang produk setinggi dada.`;
      endingState = `Talent mengarahkan produk ke kamera, tangan kanan memegang sisi utama produk, tangan kiri mulai menunjuk ke fitur detail.`;
      unresolvedAction = `Jari telunjuk tangan kiri talent sedang bergerak mengarah ke tekstur permukaan produk untuk menunjukkan detail.`;
      transitionInstruction = 'Lanjutkan gerakan penunjukan fitur tanpa memotong posisi tangan atau merubah sudut pandang.';

      if (concept.audioDirection === 'music_only') {
        dialogueVO = 'Tanpa Dialog / No Spoken Words (Visual Storytelling Murni)';
        soundDesign = 'Crisp whoosh sound effect on dynamic camera zoom, energetic modern instrumental beat drops in.';
      } else if (concept.audioDirection === 'asmr_foley') {
        dialogueVO = 'Suara Taktil ASMR (Zero Spoken Words) — Suara Gerakan Halus & Sentuhan';
        soundDesign = 'Crisp close-mic ASMR sound: gentle friction of talent fingers touching the pristine product surface.';
      } else if (concept.audioDirection === 'dialogue_onscreen') {
        dialogueVO = `Talent Bicara Langsung (Vlog Style): "Sumpah kalian harus lihat ini! Racun Shopee yang beneran ngebantu banget!"`;
        soundDesign = 'Clear direct microphone vocal audio, subtle upbeat acoustic background music.';
      } else {
        dialogueVO = `VO (ID): "Kalian sering ngerasa ribet nyari yang pas? Nih, kenalin ${product.productName} yang lagi viral di Shopee!"`;
        soundDesign = 'Crisp whoosh sound effect on camera zoom-in, upbeat modern lo-fi pop background music starting with upbeat bassline.';
      }
    } else if (stage === 'Context' || stage === 'Product Reveal') {
      visualHookDesc = `Reveal estetika dan fisik ${product.productName} dari jarak dekat.`;
      primaryAction = `Melanjutkan dari adegan sebelumnya: Talent memutar perlahan ${product.productName} untuk memperlihatkan sudut 360 derajat. Detail ${product.keyFeatures[0] || 'finishing'} terlihat sangat jernih dan mewah di bawah pantulan cahaya alami.`;
      cameraDesc = 'Silky smooth orbit camera movement 45 derajat mengitari produk, close-up macro focal length 85mm f/2.0.';
      startingState = previousEndingState || `Talent memegang produk setinggi dada di setting ${bible.environmentLock.location}.`;
      endingState = `Produk terpasang atau diletakkan di posisi siap pakai, talent tersenyum puas mengagumi hasil fisik produk.`;
      unresolvedAction = `Talent bersiap menguji penggunaan produk secara langsung dalam aktivitas nyata.`;
      transitionInstruction = 'Seamless match cut atau direct motion continuation ke aksi demonstrasi fungsional.';

      if (concept.audioDirection === 'music_only') {
        dialogueVO = 'Tanpa Dialog (Fokus Musik & Detail Visual)';
        soundDesign = 'Silky smooth melodious instrumental chords, subtle tactile product rotation foley.';
      } else if (concept.audioDirection === 'asmr_foley') {
        dialogueVO = 'Suara ASMR Gesekan Bahan & Finishing Produk';
        soundDesign = 'Hyper-detailed tactile audio: soothing crisp surface texture sound, zero speech.';
      } else if (concept.audioDirection === 'dialogue_onscreen') {
        dialogueVO = `Talent Bicara Langsung: "Lihat deh jahitannya sama detail bahannya, rapi banget kan? Nggak ada minusnya!"`;
        soundDesign = 'Clear vocal presence, cozy room acoustic ambient.';
      } else {
        dialogueVO = `VO (ID): "Lihat deh detail bahannya, bener-bener rapi dan kokoh banget. Kualitasnya jauh melampaui harganya!"`;
        soundDesign = 'Subtle satisfying texture sound, gentle ASMR tactile friction sound, warm melodious acoustic chords.';
      }
    } else if (stage === 'Demonstration') {
      visualHookDesc = `Demonstrasi nyata manfaat ${product.coreBenefits[0] || 'keunggulan produk'} saat digunakan.`;
      primaryAction = `Talent memperagakan fungsi utama ${product.productName} dalam aksi nyata: ${product.coreBenefits[0] || 'kenyamanan pemakaian'}. Gerakan terasa natural, lentur, dan memperlihatkan keunggulan produk tanpa rekayasa berlebihan.`;
      cameraDesc = 'Tracking shot medium framing mengikuti ritme gerakan talent, diselingi insert shot close-up aksi produk.';
      startingState = previousEndingState || `Talent memegang produk dan bersiap melakukan demonstrasi.`;
      endingState = `Demonstrasi selesai dengan gestur puas, talent menoleh kembali ke arah lensa kamera dengan tatapan meyakinkan.`;
      unresolvedAction = `Talent mengangkat kedua alis dengan ekspresi terkesima dan mengacungkan jempol ke arah kamera.`;
      transitionInstruction = 'Lanjutkan kontak mata talent ke audiens langsung menuju kesimpulan rekomendasi.';

      if (concept.audioDirection === 'music_only') {
        dialogueVO = 'Tanpa Dialog (Aksi Nyata & Ritme Musik)';
        soundDesign = 'Dynamic energetic beat progression, natural ambient sound of product in active use.';
      } else if (concept.audioDirection === 'asmr_foley') {
        dialogueVO = 'Suara Fungsional Produk (ASMR Flex / Click / Swish)';
        soundDesign = 'Deep satisfying tactile audio: flex, click, or smooth glide sound effect.';
      } else if (concept.audioDirection === 'dialogue_onscreen') {
        dialogueVO = `Talent Bicara Langsung: "Dipakai seharian beneran seringan dan seempuk ini. Kalian wajib coba sendiri!"`;
        soundDesign = 'Natural vocal audio with friendly inflections, lively background beat.';
      } else {
        dialogueVO = `VO (ID): "Dipakai seharian buat aktivitas padat tetep berasa enteng dan nyaman. Nggak bikin pegal sama sekali!"`;
        soundDesign = 'Natural ambient foley of product in active use, energetic dynamic beat elevation.';
      }
    } else if (stage === 'Desire/Benefit' || stage === 'Objection Handling') {
      visualHookDesc = `Menghilangkan keraguan calon pembeli mengenai daya tahan dan kesesuaian harga.`;
      primaryAction = `Talent memperlihatkan ketahanan fisik atau fleksibilitas ${product.productName}. Menjawab pertanyaan umum audiens dengan gestur meyakinkan dan perbandingan visual yang jujur.`;
      cameraDesc = 'Over-the-shoulder medium shot shifting smoothly into tight eye-level portrait.';
      startingState = previousEndingState || `Talent menatap kamera dengan gestur meyakinkan.`;
      endingState = `Talent menunjuk ke arah kiri bawah layar (lokasi keranjang kuning Shopee) dengan senyum mengajak.`;
      unresolvedAction = `Tangan talent menunjuk ke posisi keranjang kuning dengan ritme ajakan ramah.`;
      transitionInstruction = 'Sambungkan langsung ke adegan penutup Call to Action tanpa jeda visual.';

      if (concept.audioDirection === 'music_only') {
        dialogueVO = 'Tanpa Dialog (Gesture Rekomendasi Terpercaya)';
        soundDesign = 'Positive swelling melody, bright uplifting harmony.';
      } else if (concept.audioDirection === 'asmr_foley') {
        dialogueVO = 'Suara Taktil Ketahanan Produk';
        soundDesign = 'Solid durable tap sound on product surface, satisfying acoustic resonance.';
      } else if (concept.audioDirection === 'dialogue_onscreen') {
        dialogueVO = `Talent Bicara Langsung: "Banyak yang ragu soal keawetannya, nih aku buktiin langsung build quality-nya tebal banget!"`;
        soundDesign = 'Confident voice recording, encouraging beat.';
      } else {
        dialogueVO = `VO (ID): "Banyak yang nanya awet nggak? Tenang, build quality-nya udah teruji banget buat pemakaian jangka panjang."`;
        soundDesign = 'Gentle positive harp chime, supportive energetic rhythm.';
      }
    } else {
      // CTA stage
      visualHookDesc = `Panggilan bertindak tegas dan jelas mengarahkan penonton ke link affiliate keranjang kuning Shopee.`;
      primaryAction = `Talent memegang ${product.productName} di satu tangan sambil tersenyum ceria, tangan lainnya menunjuk antusias ke arah pojok kiri bawah layar di mana ikon keranjang kuning Shopee berada. Banner promo visual terpancar natural.`;
      cameraDesc = 'High-impact medium close-up, slight upward Dutch angle 5 derajat, razor-sharp focus pada wajah dan produk.';
      startingState = previousEndingState || `Talent menunjuk ke arah kiri bawah frame.`;
      endingState = `Pose akhir terkunci: Talent tersenyum ramah sambil memperlihatkan produk dengan jelas di samping wajah, siap untuk looping video.`;
      unresolvedAction = 'None (End of video, natural loopable pause).';
      transitionInstruction = 'Final hold frame for video loop / platform replay.';

      if (concept.audioDirection === 'music_only') {
        dialogueVO = 'Teks Layar: "Cek Keranjang Kuning Shopee Sekarang!" (Tanpa Suara Bicara)';
        soundDesign = 'Uplifting celebratory outro beat, friendly chime notification sound.';
      } else if (concept.audioDirection === 'asmr_foley') {
        dialogueVO = 'Bisikan Lembut / Teks Visual: "Cek Keranjang Kuning"';
        soundDesign = 'Subtle melodic chime, satisfying soft loop chime.';
      } else if (concept.audioDirection === 'dialogue_onscreen') {
        dialogueVO = `Talent Bicara Langsung: "Langsung klik keranjang kuning di kiri bawah sekarang ya sebelum kehabisan voucher!"`;
        soundDesign = 'Cheerful outro speech with Shopee notification bell tone.';
      } else {
        dialogueVO = `VO (ID): "${concept.callToAction}"`;
        soundDesign = 'Uplifting crescendo finale, friendly Shopee notification bell chime, celebratory beat outro.';
      }
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
• Continuity Mandate: DO NOT change wardrobe. DO NOT alter product design. Seamlessly continue the unfinished motion from Scene ${sceneNumber}'s ending frame without teleportation or jump cuts.`;
    } else {
      nextSceneHandoffPackage = `[FINAL SCENE COMPLETION]
• Final Hold Pose: ${endingState}
• Seamless Loop Capability: Posed for smooth transition back to Scene 1 hook.
• Platform CTA: Shopee yellow basket overlay anchor intact.`;
    }

    // Audio Instruction Prompt String in English
    let audioEnglishInstruction = '';
    if (concept.audioDirection === 'music_only') {
      audioEnglishInstruction = 'AUDIO DIRECTION: Pure instrumental background music only (NO spoken dialogue, NO voiceover). Narrative is driven entirely by visual storytelling, camera pacing, and synchronized sound effects.';
    } else if (concept.audioDirection === 'asmr_foley') {
      audioEnglishInstruction = 'AUDIO DIRECTION: Sensory ASMR foley sound capture (Zero spoken words). Prioritize crisp tactile sounds of hands touching product material, physical texture interactions, and ambient tranquility.';
    } else if (concept.audioDirection === 'dialogue_onscreen') {
      audioEnglishInstruction = `AUDIO DIRECTION: On-screen talent vlog speech spoken directly into camera. Spoken Indonesian speech: "${dialogueVO.replace(/^Talent Bicara Langsung.*:\s*"?/, '').replace(/"?$/, '')}". Accompanied by cheerful background music.`;
    } else {
      audioEnglishInstruction = `AUDIO DIRECTION: Persuasive Indonesian Voiceover narration overlay: "${dialogueVO.replace(/^VO \(ID\):\s*"?/, '').replace(/"?$/, '')}". Accompanied by upbeat modern lo-fi/commercial background track.`;
    }

    // Build Ultra-Rich English Cinematic Prompt for Seedance 2.5 / Omni Flash
    const continuationHeader = isFirstScene
      ? `[ESTABLISHING SCENE 1 - DURATION: ${duration}s - ${workflowModel.toUpperCase()} - FORMAT: ${concept.format.toUpperCase()} - MOOD: ${concept.videoMoodChoice.toUpperCase()}]`
      : `[CONTINUATION SCENE ${sceneNumber} FROM SCENE ${sceneNumber - 1} - DURATION: ${duration}s - ${workflowModel.toUpperCase()} - FORMAT: ${concept.format.toUpperCase()}]
CONTINUITY INSTRUCTION: Seamless cut directly from Scene ${sceneNumber - 1} final frame. Lock exact talent facial structure, haircut, skin tone, and wardrobe (${bible.characterLock.wardrobeAndAccessories}). Maintain setting (${bible.environmentLock.location}) and lighting (${lightingDesc}). Seamlessly pick up the unfinished motion: ${previousUnresolvedAction || 'natural physical momentum'}. Strictly zero jump cuts or spontaneous wardrobe alterations.`;

    const promptEnglish = `${continuationHeader}
CINEMATOGRAPHY & VISUAL LANGUAGE: 9:16 vertical commercial format, hyper-photorealistic advertising aesthetic. ${cameraDesc}. ${lightingDesc}. Setting: ${bible.environmentLock.location}, ${bible.environmentLock.timeOfDay}, atmospheric color palette: ${bible.environmentLock.colorPalette}. Commercial high-contrast color grading, natural skin textures, optical lens bokeh.
SUBJECT BLOCKING & ACTION: ${bible.characterLock.visualIdentity}. Talent initial position: ${startingState}. Concrete talent action: ${primaryAction}. Final pose: ${endingState}. Authentic Southeast Asian lifestyle creator demeanor, confident and spontaneous.
PRODUCT FIDELITY & PHYSICAL INTERACTION: Featuring ${product.productName}. Physical characteristics strictly locked: ${bible.productLock.shapeAndProportions}, colorway: ${bible.productLock.colorAndFinish}. Preserve exact physical details, textures, and brand insignia from reference image '${primaryImgName}'. Strictly avoid product shape deformation, floating objects, or logo alteration.
${audioEnglishInstruction}`;

    // Build Indonesian Explanatory Prompt
    const promptIndonesian = `[SCENE ${sceneNumber} (${duration} Detik) — Preset ${workflowModel} — Format: ${concept.format}]
• Arahan Audio: ${concept.audioDirection === 'music_only' ? 'Musik Latar Saja (Tanpa Dialog)' : concept.audioDirection === 'asmr_foley' ? 'ASMR Suara Taktil' : concept.audioDirection === 'dialogue_onscreen' ? 'Talent Bicara ke Kamera' : 'Voiceover Shopee ID'}
• Tujuan Pemasaran: ${stage} (${visualHookDesc})
• Aksi Utama Talent: ${primaryAction}
• Panduan Kamera & Visual: ${cameraDesc} dengan pencahayaan ${lightingDesc} di lokasi ${bible.environmentLock.location}.
• Interaksi Produk: ${product.productName} dipertahankan warna, logo, dan bentuknya sesuai foto referensi '${primaryImgName}'.
• Audio / Narasi: ${dialogueVO}
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
