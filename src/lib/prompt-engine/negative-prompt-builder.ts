import { SceneNegativePrompts, VideoModel } from '@/types';

/**
 * Builds risk-specific negative prompts tailored to AI video models (Seedance 2.5 & Omni Flash).
 * Avoids blanket generic lists; focuses on high-risk failure modes per video category.
 */
export function buildSceneNegativePrompts(
  sceneIndex: number,
  isMultiScene: boolean,
  hasCharacter: boolean,
  model: VideoModel
): SceneNegativePrompts {
  const characterRisks: string[] = [];
  if (hasCharacter) {
    characterRisks.push(
      'different face',
      'face morphing',
      'identity drift',
      'deformed eyes',
      'distorted hands',
      'extra fingers',
      'missing fingers',
      'abnormal limb anatomy',
      'unintended wardrobe change',
      'clothes color changing mid-cut'
    );
  }

  const productRisks: string[] = [
    'product redesign',
    'distorted product silhouette',
    'altered brand logo',
    'hallucinated text on packaging',
    'product color mutating',
    'warped geometry',
    'floating objects',
    'duplicated product items',
    'collapsing packaging shape',
  ];

  const sceneRisks: string[] = [
    'flickering lighting',
    'strobing artifacts',
    'sudden background teleportation',
    'mismatched room environment',
    'disorienting camera jump cuts',
    'unnatural jitter',
    'abrupt screen direction flips',
  ];

  if (isMultiScene && sceneIndex > 0) {
    sceneRisks.push('breaking scene continuity', 'restart story from scratch', 'ignoring previous pose handoff');
  }

  const visualQualityRisks: string[] = [
    'plastic waxy skin',
    'oversmoothed textures',
    'uncanny valley expressions',
    'overexposed blown-out highlights',
    'crushed noisy shadows',
    'cgi video game rendering look',
    'blurry low-res compression artifacts',
    'distorted motion physics',
  ];

  // Tailored additions for specific model architectures
  if (model === 'omni-flash') {
    visualQualityRisks.push('motion blur smearing', 'inconsistent frame rate');
  } else if (model === 'seedance-2.5') {
    visualQualityRisks.push('temporal ghosting', 'unmotivated morphing transitions');
  }

  const allNegativeTerms = [
    ...characterRisks,
    ...productRisks,
    ...sceneRisks,
    ...visualQualityRisks,
  ];

  const combinedNegativePrompt = allNegativeTerms.join(', ');

  return {
    characterRisks,
    productRisks,
    sceneRisks,
    visualQualityRisks,
    combinedNegativePrompt,
  };
}
