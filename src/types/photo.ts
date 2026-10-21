import { z } from 'zod';

export type PhotoGeneratorMode = 'quick' | 'expert' | 'reference' | 'custom';

export type LockPriorityLevel = 'strict' | 'balanced' | 'flexible';

export type CameraDeviceType =
  | 'iphone13_main_back'
  | 'iphone13_ultra_wide'
  | 'iphone13_front_truedepth'
  | 'iphone13_mirror_back'
  | 'iphone13_mirror_front'
  | 'auto';

export type CameraAngleType =
  | 'eye_level'
  | 'low_angle'
  | 'high_angle'
  | 'slight_tilt'
  | 'candid_overhead';

export type CameraDistanceType =
  | 'close_up'
  | 'medium_shot'
  | 'half_body'
  | 'three_quarter'
  | 'full_length';

export type PhotoAspectRatio = '9:16' | '4:5' | '1:1' | '16:9';

export type PhotoPresetType =
  | 'mirror_selfie'
  | 'casual_selfie'
  | 'candid_street'
  | 'lifestyle'
  | 'indoor_portrait'
  | 'outdoor_portrait'
  | 'cafe'
  | 'travel'
  | 'daily_activity'
  | 'full_body'
  | 'half_body'
  | 'close_up'
  | 'fashion_casual'
  | 'formal'
  | 'custom';

export interface CharacterReferenceImage {
  id: string;
  url: string; // Base64 or URL
  view: 'depan' | 'samping' | 'tiga_perempat' | 'belakang' | 'general';
  caption?: string;
}

export interface CharacterSheetConfig {
  enabled: boolean;
  sheetType: 'turnaround_4views' | 'expression_sheet' | 'full_concept_sheet' | 'custom';
  imageUrl?: string;
  sheetDescription?: string;
  customNotes?: string;
  referenceImages?: CharacterReferenceImage[];
}

export interface OutfitItemDetail {
  top: string;
  bottom: string;
  outer?: string;
  shoes: string;
  bagAndAccessories?: string;
  fabricTexture?: string;
}

export interface OutfitReferencePreset {
  id: string;
  name: string;
  category: 'casual' | 'korean_street' | 'aesthetic_cafe' | 'smart_casual' | 'heritage' | 'summer_resort' | 'sporty' | 'cozy';
  categoryLabel: string;
  description: string;
  details: OutfitItemDetail;
  fullDescription: string;
  tags: string[];
}

export interface OutfitReferenceConfig {
  enabled: boolean;
  priority: LockPriorityLevel;
  presetId?: string;
  presetName?: string;
  category?: string;
  itemDetails: OutfitItemDetail;
  fullDescription: string;
  referenceImages: CharacterReferenceImage[];
  customNotes?: string;
}

export interface FaceLockConfig {
  enabled: boolean;
  priority: LockPriorityLevel;
  characterName: string;
  ethnicityAndAge: string;
  facialStructure: string;
  skinDetail: string;
  eyesAndBrows: string;
  noseProfile: string;
  lipsDetail: string;
  glasses: string;
  hairAndFlyaways: string;
  customNotes?: string;
  referenceImages: CharacterReferenceImage[];
}

export interface BodyLockConfig {
  enabled: boolean;
  priority: LockPriorityLevel;
  heightAndWeight: string;
  bodySilhouette: string;
  skinTexture: string;
  neckAndShoulders: string;
  bustDetail: string;
  waistAndMidriff: string;
  hipsAndGlutes: string;
  legsAndThighs: string;
  customNotes?: string;
  referenceImages: CharacterReferenceImage[];
}

export interface PhotoGeneratorInput {
  mode: PhotoGeneratorMode;
  preset: PhotoPresetType;
  customScenePrompt?: string;
  
  // Character & Identity
  characterName: string;
  faceLock: FaceLockConfig;
  bodyLock: BodyLockConfig;
  characterSheet?: CharacterSheetConfig;
  characterDescription?: string;

  // Scene & Setting
  location: string;
  timeOfDay: string;
  lightingCondition: string;
  bodyPose: string;
  facialExpression: string;
  gazeDirection: string;
  outfit: string;
  accessories: string;

  // Outfit Reference (Optional)
  outfitReference?: OutfitReferenceConfig;

  // Camera & iPhone 13 Realism
  cameraDevice: CameraDeviceType;
  cameraAngle: CameraAngleType;
  cameraDistance: CameraDistanceType;
  composition: string;
  aspectRatio: PhotoAspectRatio;
  realismIntensity: 'natural_iphone' | 'raw_unretouched' | 'subtle_warmth';
  creativityLevel: number; // 0.2 - 0.9

  // Negative & Additional
  additionalDetails?: string;
  customNegativePrompt?: string;
}

export interface PhotoGeneratedOutput {
  id: string;
  title: string;
  summary: string;
  mainPrompt: string; // Narasi deskriptif lengkap Bahasa Indonesia
  negativePrompt: string; // Larangan visual anti-AI
  photoSettings: {
    device: string;
    camera: string;
    focalLength: string;
    aperture: string;
    lighting: string;
    composition: string;
    aspectRatio: string;
  };
  faceLockInstruction: string;
  bodyLockInstruction: string;
  outfitLockInstruction?: string;
  characterSheetInstruction?: string;
  characterSheetPrompt?: string;
  characterProfile: {
    name: string;
    ethnicityAndAge: string;
    keyFacialFeatures: string[];
    bodyProportions: string;
  };
  technicalNotes: string[];
  timestamp: string;
  modelUsed: string;
  generationSource: 'gemini-api' | 'deterministic-engine';
}

export interface PhotoRefinementRequest {
  currentPrompt: PhotoGeneratedOutput;
  refinementAction:
    | 'strengthen_face_lock'
    | 'strengthen_body_lock'
    | 'alternative_pose'
    | 'change_location'
    | 'change_outfit'
    | 'lighting_variation'
    | 'more_natural_raw'
    | 'fix_anatomy_perspective'
    | 'custom';
  customInstruction?: string;
}

// Zod Validation Schemas
export const CharacterReferenceImageSchema = z.object({
  id: z.string(),
  url: z.string().min(1),
  view: z.enum(['depan', 'samping', 'tiga_perempat', 'belakang', 'general']),
  caption: z.string().optional(),
});

export const OutfitItemDetailSchema = z.object({
  top: z.string().default(''),
  bottom: z.string().default(''),
  outer: z.string().optional().default(''),
  shoes: z.string().default(''),
  bagAndAccessories: z.string().optional().default(''),
  fabricTexture: z.string().optional().default(''),
});

export const OutfitReferenceConfigSchema = z.object({
  enabled: z.boolean().default(false),
  priority: z.enum(['strict', 'balanced', 'flexible']).default('balanced'),
  presetId: z.string().optional(),
  presetName: z.string().optional(),
  category: z.string().optional(),
  itemDetails: OutfitItemDetailSchema.default({
    top: '',
    bottom: '',
    outer: '',
    shoes: '',
    bagAndAccessories: '',
    fabricTexture: '',
  }),
  fullDescription: z.string().default(''),
  referenceImages: z.array(CharacterReferenceImageSchema).default([]),
  customNotes: z.string().optional(),
});

export const CharacterSheetConfigSchema = z.object({
  enabled: z.boolean().default(false),
  sheetType: z.enum(['turnaround_4views', 'expression_sheet', 'full_concept_sheet', 'custom']).default('turnaround_4views'),
  imageUrl: z.string().optional(),
  sheetDescription: z.string().optional(),
  customNotes: z.string().optional(),
  referenceImages: z.array(CharacterReferenceImageSchema).default([]),
});

export const FaceLockConfigSchema = z.object({
  enabled: z.boolean().default(false),
  priority: z.enum(['strict', 'balanced', 'flexible']).default('balanced'),
  characterName: z.string().default('Karakter Kustom'),
  ethnicityAndAge: z.string().default('Wanita muda Asia (usia 20-25 tahun)'),
  facialStructure: z.string().default(''),
  skinDetail: z.string().default(''),
  eyesAndBrows: z.string().default(''),
  noseProfile: z.string().default(''),
  lipsDetail: z.string().default(''),
  glasses: z.string().default(''),
  hairAndFlyaways: z.string().default(''),
  customNotes: z.string().optional(),
  referenceImages: z.array(CharacterReferenceImageSchema).default([]),
});

export const BodyLockConfigSchema = z.object({
  enabled: z.boolean().default(false),
  priority: z.enum(['strict', 'balanced', 'flexible']).default('balanced'),
  heightAndWeight: z.string().default('Proporsional natural (165-170 cm)'),
  bodySilhouette: z.string().default(''),
  skinTexture: z.string().default(''),
  neckAndShoulders: z.string().default(''),
  bustDetail: z.string().default(''),
  waistAndMidriff: z.string().default(''),
  hipsAndGlutes: z.string().default(''),
  legsAndThighs: z.string().default(''),
  customNotes: z.string().optional(),
  referenceImages: z.array(CharacterReferenceImageSchema).default([]),
});

export const PhotoGeneratorInputSchema = z.object({
  mode: z.enum(['quick', 'expert', 'reference', 'custom']).default('quick'),
  preset: z.enum([
    'mirror_selfie',
    'casual_selfie',
    'candid_street',
    'lifestyle',
    'indoor_portrait',
    'outdoor_portrait',
    'cafe',
    'travel',
    'daily_activity',
    'full_body',
    'half_body',
    'close_up',
    'fashion_casual',
    'formal',
    'custom',
  ]).default('candid_street'),
  customScenePrompt: z.string().optional(),
  characterName: z.string().default('Karakter Model'),
  faceLock: FaceLockConfigSchema,
  bodyLock: BodyLockConfigSchema,
  characterSheet: CharacterSheetConfigSchema.optional(),
  characterDescription: z.string().optional(),
  location: z.string().default('Kafe semi-outdoor di Jakarta Selatan'),
  timeOfDay: z.string().default('Sore hari menjelang golden hour (16:30 WIB)'),
  lightingCondition: z.string().default('Cahaya matahari sore hangat alami dari samping'),
  bodyPose: z.string().default('Berdiri santai bahu rileks, tangan memegang tali tas totebag'),
  facialExpression: z.string().default('Senyum tipis hangat natural, tatapan ramah ke arah kamera'),
  gazeDirection: z.string().default('Melihat ke arah lensa kamera'),
  outfit: z.string().default('Cardigan rajut warna oatmeal, tanktop katun putih, celana jeans relaxed cut'),
  accessories: z.string().default('Kacamata optik bingkai logam tipis gunmetal, tote bag kain krem'),
  outfitReference: OutfitReferenceConfigSchema.optional(),
  cameraDevice: z.enum([
    'iphone13_main_back',
    'iphone13_ultra_wide',
    'iphone13_front_truedepth',
    'iphone13_mirror_back',
    'iphone13_mirror_front',
    'auto',
  ]).default('iphone13_main_back'),
  cameraAngle: z.enum([
    'eye_level',
    'low_angle',
    'high_angle',
    'slight_tilt',
    'candid_overhead',
  ]).default('eye_level'),
  cameraDistance: z.enum([
    'close_up',
    'medium_shot',
    'half_body',
    'three_quarter',
    'full_length',
  ]).default('three_quarter'),
  composition: z.string().default('Subjek di sepertiga kanan bingkai (rule of thirds), latar jalanan kafe dengan kedalaman alami'),
  aspectRatio: z.enum(['9:16', '4:5', '1:1', '16:9']).default('4:5'),
  realismIntensity: z.enum(['natural_iphone', 'raw_unretouched', 'subtle_warmth']).default('raw_unretouched'),
  creativityLevel: z.number().min(0.1).max(1.0).default(0.7),
  additionalDetails: z.string().optional(),
  customNegativePrompt: z.string().optional(),
});
