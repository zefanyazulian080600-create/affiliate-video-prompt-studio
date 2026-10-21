import { PhotoGeneratorInput } from '@/types/photo';

export function buildPhotoNegativePrompt(input: PhotoGeneratorInput): string {
  const baseProhibitions = [
    // Anti-AI and skin plastic artifacts
    'plastic skin',
    'wax figure',
    'porcelain doll texture',
    'excessive airbrush',
    'over-smoothed face',
    'blur filter',
    'beauty camera filter',
    'cgi sheen',
    'render 3d',
    'illustration',
    'anime',
    'cartoon',
    'unreal engine',
    'octane render',
    
    // Anatomy errors
    'bad anatomy',
    'distorted limbs',
    'extra fingers',
    'fused fingers',
    'missing fingers',
    'malformed hands',
    'poorly drawn hands',
    'abnormal joints',
    'impossible human pose',
    'dislocated shoulder',
    'sixpack abs on soft feminine body',
    'overly muscular arms',
    'bodybuilder physique',
    
    // Face & Eyes inconsistency
    'deviating facial identity from reference',
    'different jawline',
    'missing mole on right cheek',
    'removing glasses',
    'missing freckles',
    'asymmetrical cross-eyed irises',
    'hyper-symmetric fake face',
    'glowing eyes',
    'unnatural teeth',
    
    // Camera & Lens artifacts
    'fake cinematic bloom',
    'extreme dslr bokeh blur',
    'neon color grading',
    'unrealistic lens flare',
    'oversaturated chromatic aberration',
    'warped background',
    'melting furniture',
    'floating items',
    'inconsistent shadows',
    
    // Watermarks & Junk
    'watermark',
    'text logo',
    'username signature',
    'cropped feet when full body requested',
    'duplicate character',
  ];

  // Specific additions for mirror selfies
  if (input.cameraDevice.includes('mirror')) {
    baseProhibitions.push(
      'missing smartphone in hand',
      'distorted phone silhouette',
      'impossible hand grip on phone',
      'mirror reflection showing different outfit',
      'mirror reflection showing wrong pose'
    );
  }

  // Include user custom negative if provided
  if (input.customNegativePrompt && input.customNegativePrompt.trim()) {
    baseProhibitions.unshift(input.customNegativePrompt.trim());
  }

  return baseProhibitions.join(', ');
}
