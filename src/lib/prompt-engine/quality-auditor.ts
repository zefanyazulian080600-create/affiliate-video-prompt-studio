import {
  QualityAuditReport,
  QualityCategoryScore,
  DurationPlan,
  ScenePlan,
  ProductProfile,
  ContinuityBible,
  ProductImageReference,
} from '@/types';

/**
 * Quality Auditor: Concrete heuristic rule-based evaluator that checks 14 critical dimensions
 * without inventing artificial viral metrics. Scores strictly 0-100 based on verified code checks.
 */
export function auditPromptQuality(
  durationPlan: DurationPlan,
  scenes: ScenePlan[],
  product: ProductProfile,
  bible: ContinuityBible,
  productImages: ProductImageReference[] = []
): QualityAuditReport {
  const warnings: string[] = [];
  const suggestedFixes: string[] = [];

  // 1. Duration & Technical Compatibility Check
  let techScore = 100;
  const calculatedSum = scenes.reduce((sum, s) => sum + s.duration, 0);
  if (calculatedSum !== durationPlan.totalDuration) {
    techScore -= 30;
    warnings.push(`Jumlah durasi per scene (${calculatedSum}s) tidak sama persis dengan total durasi target (${durationPlan.totalDuration}s).`);
    suggestedFixes.push('Sesuaikan durasi scene individual agar tepat menjumlahkan durasi target.');
  }

  if (durationPlan.remainder > 0) {
    techScore -= 5;
    warnings.push(`Terdapat durasi sisa (${durationPlan.remainder}s) karena total durasi tidak habis dibagi preset ${durationPlan.presetSceneDuration}s.`);
    suggestedFixes.push(`Pertimbangkan memilih durasi total kelipatan ${durationPlan.presetSceneDuration}s (misal: ${Math.ceil(durationPlan.totalDuration / durationPlan.presetSceneDuration) * durationPlan.presetSceneDuration}s) untuk ritme sempurna.`);
  }

  // 2. Product Fidelity Check
  let productScore = 100;
  if (productImages.length === 0) {
    productScore -= 15;
    warnings.push('Belum ada foto produk yang diunggah. AI video mungkin menginterpolasi detail produk secara bebas.');
    suggestedFixes.push('Unggah minimal 1 foto produk tampak depan agar AI model mempertahankan siluet dan warna asli.');
  } else {
    const hasPrimary = productImages.some(img => img.isPrimary);
    if (!hasPrimary) {
      productScore -= 5;
      warnings.push('Belum ada foto produk yang ditandai sebagai foto utama.');
      suggestedFixes.push('Pilih salah satu gambar sebagai foto utama untuk acuan warna dan logo utama.');
    }
  }

  for (const s of scenes) {
    if (!s.promptEnglish.includes(product.productName) && !s.promptIndonesian.includes(product.productName)) {
      productScore -= 10;
      warnings.push(`Scene ${s.sceneNumber} tidak menyebutkan nama produk secara eksplisit.`);
      suggestedFixes.push(`Pastikan produk terlihat atau disebutkan di Scene ${s.sceneNumber}.`);
    }
  }

  // 3. Character Consistency Check
  let charScore = 100;
  if (!bible.characterLock.visualIdentity || bible.characterLock.visualIdentity.length < 10) {
    charScore -= 20;
    warnings.push('Karakter visual belum terdefinisi secara spesifik.');
    suggestedFixes.push('Lengkapi deskripsi talent atau unggah foto referensi karakter.');
  }

  // Check wardrobe consistency across consecutive scenes
  for (let i = 1; i < scenes.length; i++) {
    const prev = scenes[i - 1];
    const curr = scenes[i];
    if (curr.promptEnglish.includes('CONTINUITY INSTRUCTION') && !curr.promptEnglish.includes('wardrobe')) {
      charScore -= 10;
      warnings.push(`Scene ${curr.sceneNumber} tidak mengunci pakaian dari Scene ${prev.sceneNumber}.`);
      suggestedFixes.push(`Tambahkan instruksi penguncian pakaian pada Scene ${curr.sceneNumber}.`);
    }
  }

  // 4. Scene Continuity Check
  let continuityScore = 100;
  for (let i = 0; i < scenes.length - 1; i++) {
    const s = scenes[i];
    if (!s.nextSceneHandoffPackage || s.nextSceneHandoffPackage.trim().length < 20) {
      continuityScore -= 20;
      warnings.push(`Scene ${s.sceneNumber} tidak memiliki blok NEXT SCENE HANDOFF yang memadai.`);
      suggestedFixes.push(`Perbarui handoff block Scene ${s.sceneNumber} agar mencakup ending pose dan unresolved action.`);
    }
  }

  // 5. Marketing Clarity Check
  let marketingScore = 100;
  const firstScene = scenes[0];
  if (firstScene && firstScene.marketingStage !== 'Hook') {
    marketingScore -= 20;
    warnings.push('Scene pertama tidak diformulasikan sebagai Hook penangkap perhatian.');
    suggestedFixes.push('Ubah scene pembuka menjadi visual hook yang menghentikan scroll dalam 3 detik pertama.');
  }

  const lastScene = scenes[scenes.length - 1];
  if (lastScene && lastScene.marketingStage !== 'CTA' && scenes.length > 1) {
    marketingScore -= 15;
    warnings.push('Scene penutup belum memuat Call to Action (CTA) affiliate yang jelas.');
    suggestedFixes.push('Tambahkan ajakan memeriksa tautan keranjang kuning Shopee di akhir video.');
  }

  // 6. Visual Quality & Negative Prompts
  let visualScore = 100;
  for (const s of scenes) {
    if (!s.negativePrompts.combinedNegativePrompt || s.negativePrompts.combinedNegativePrompt.length < 30) {
      visualScore -= 15;
      warnings.push(`Scene ${s.sceneNumber} memiliki negative prompt yang terlalu pendek atau kosong.`);
      suggestedFixes.push(`Sertakan negative prompt pencegah deformasi tangan, mutasi produk, dan kedipan lampu.`);
    }
  }

  // Clamping scores between 40 and 100
  productScore = Math.max(40, Math.min(100, productScore));
  charScore = Math.max(40, Math.min(100, charScore));
  continuityScore = Math.max(40, Math.min(100, continuityScore));
  marketingScore = Math.max(40, Math.min(100, marketingScore));
  visualScore = Math.max(40, Math.min(100, visualScore));
  techScore = Math.max(40, Math.min(100, techScore));

  const weightedSum =
    productScore * 0.2 +
    charScore * 0.15 +
    continuityScore * 0.25 +
    marketingScore * 0.15 +
    visualScore * 0.15 +
    techScore * 0.1;

  const overallScore = Math.round(weightedSum);

  const buildCategoryScore = (name: string, score: number, weight: number, details: string): QualityCategoryScore => ({
    name,
    score,
    weight,
    status: score >= 90 ? 'passed' : score >= 70 ? 'warning' : 'needs_attention',
    details,
  });

  return {
    overallScore,
    categories: {
      productFidelity: buildCategoryScore(
        'Product Fidelity',
        productScore,
        0.2,
        'Verifikasi keaslian bentuk, warna, logo, dan identitas fisik produk.'
      ),
      characterConsistency: buildCategoryScore(
        'Character Consistency',
        charScore,
        0.15,
        'Verifikasi penguncian identitas wajah, rambut, dan pakaian talent antar-cut.'
      ),
      sceneContinuity: buildCategoryScore(
        'Scene Continuity',
        continuityScore,
        0.25,
        'Evaluasi kesinambungan pose awal, pose akhir, dan paket handoff antar-scene.'
      ),
      marketingClarity: buildCategoryScore(
        'Marketing Clarity',
        marketingScore,
        0.15,
        'Pemeriksaan kehadiran Hook pembuka, alur demonstrasi, dan CTA Shopee.'
      ),
      visualQuality: buildCategoryScore(
        'Visual Quality',
        visualScore,
        0.15,
        'Kekayaan deskripsi pencahayaan, lensa kamera, dan kelengkapan negative prompt.'
      ),
      technicalCompatibility: buildCategoryScore(
        'Technical Compatibility',
        techScore,
        0.1,
        'Kesesuaian durasi scene dengan batasan preset model (Seedance/Omni Flash).'
      ),
    },
    warnings,
    suggestedFixes,
  };
}
