import { DurationPlan, VideoModel, ScenePresetDuration, WorkflowConfig } from '@/types';

export const WORKFLOW_CONFIGS: Record<string, WorkflowConfig> = {
  'seedance-10s': {
    model: 'seedance-2.5',
    modelLabel: 'Seedance 2.5 — Preset 10 Detik',
    presetSceneDuration: 10,
    supportedTotalDurations: [10, 20, 30, 40, 50, 60],
    description: 'Optimal untuk transisi dinamis, video Shopee pendek, dan pacing cepat (10s/scene).',
  },
  'seedance-15s': {
    model: 'seedance-2.5',
    modelLabel: 'Seedance 2.5 — Preset 15 Detik',
    presetSceneDuration: 15,
    supportedTotalDurations: [15, 30, 45, 60],
    description: 'Optimal untuk demonstrasi fitur mendalam, unboxing lengkap, dan storytelling naratif (15s/scene).',
  },
  'omni-10s': {
    model: 'omni-flash',
    modelLabel: 'Omni Flash — Preset 10 Detik',
    presetSceneDuration: 10,
    supportedTotalDurations: [10, 20, 30, 40, 50, 60],
    description: 'Optimal untuk aksi tunggal terfokus, detail produk tajam, dan kesinambungan terkontrol (10s/scene).',
  },
};

/**
 * Calculates exact scene distribution based on user total duration and workflow preset.
 * Transparently manages any remainder without secretly modifying total duration.
 */
export function calculateDurationPlan(
  totalDuration: number,
  workflowModel: VideoModel,
  presetSceneDuration: ScenePresetDuration
): DurationPlan {
  // Validate model capability
  let actualPreset: ScenePresetDuration = presetSceneDuration;
  let durationWarning: string | undefined = undefined;

  if (workflowModel === 'omni-flash' && presetSceneDuration === 15) {
    actualPreset = 10;
    durationWarning =
      'Omni Flash hanya mendukung preset scene 10 detik secara resmi. Preset dialihkan ke 10 detik per scene.';
  }

  // Ensure minimum duration is at least 5s
  const safeTotal = Math.max(5, Math.round(totalDuration));

  const standardScenes = Math.floor(safeTotal / actualPreset);
  const remainder = safeTotal % actualPreset;

  const sceneDurations: number[] = [];

  if (standardScenes === 0) {
    // Total duration is smaller than preset
    sceneDurations.push(safeTotal);
    durationWarning = `Durasi total (${safeTotal}s) lebih pendek dari durasi preset standar (${actualPreset}s). Menghasilkan 1 scene @ ${safeTotal}s.`;
  } else {
    for (let i = 0; i < standardScenes; i++) {
      sceneDurations.push(actualPreset);
    }
    if (remainder > 0) {
      sceneDurations.push(remainder);
      durationWarning = `Durasi total ${safeTotal}s tidak habis dibagi ${actualPreset}s: ${standardScenes} scene standar @ ${actualPreset}s + 1 scene penutup @ ${remainder}s.`;
    }
  }

  const sumDuration = sceneDurations.reduce((acc, curr) => acc + curr, 0);

  const isCustomDuration = ![10, 15, 20, 30, 45, 60].includes(safeTotal);

  return {
    totalDuration: safeTotal,
    workflowModel,
    presetSceneDuration: actualPreset,
    sceneCount: sceneDurations.length,
    sceneDurations,
    sumDuration,
    remainder,
    isCustomDuration,
    durationWarning,
  };
}
