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

export const FaceLockConfigSchema = z.object({
  enabled: z.boolean().default(true),
  priority: z.enum(['strict', 'balanced', 'flexible']).default('strict'),
  characterName: z.string().default('Anya Pitaloka'),
  ethnicityAndAge: z.string().default('Wanita muda Indonesia-Asia Timur (22-24 tahun)'),
  facialStructure: z.string(),
  skinDetail: z.string(),
  eyesAndBrows: z.string(),
  noseProfile: z.string(),
  lipsDetail: z.string(),
  glasses: z.string().default(''),
  hairAndFlyaways: z.string(),
  customNotes: z.string().optional(),
  referenceImages: z.array(CharacterReferenceImageSchema).default([]),
});

export const BodyLockConfigSchema = z.object({
  enabled: z.boolean().default(true),
  priority: z.enum(['strict', 'balanced', 'flexible']).default('strict'),
  heightAndWeight: z.string().default('169 cm, 56 kg'),
  bodySilhouette: z.string(),
  skinTexture: z.string(),
  neckAndShoulders: z.string(),
  bustDetail: z.string(),
  waistAndMidriff: z.string(),
  hipsAndGlutes: z.string(),
  legsAndThighs: z.string(),
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
  characterName: z.string().default('Anya Pitaloka'),
  faceLock: FaceLockConfigSchema,
  bodyLock: BodyLockConfigSchema,
  characterDescription: z.string().optional(),
  location: z.string().default('Kafe semi-outdoor di Jakarta Selatan'),
  timeOfDay: z.string().default('Sore hari menjelang golden hour (16:30 WIB)'),
  lightingCondition: z.string().default('Cahaya matahari sore hangat alami dari samping'),
  bodyPose: z.string().default('Berdiri santai bahu rileks, tangan memegang tali tas totebag'),
  facialExpression: z.string().default('Senyum tipis hangat natural, tatapan ramah ke arah kamera'),
  gazeDirection: z.string().default('Melihat ke arah lensa kamera'),
  outfit: z.string().default('Cardigan rajut warna oatmeal, tanktop katun putih, celana jeans relaxed cut'),
  accessories: z.string().default('Kacamata optik bingkai logam tipis gunmetal, tote bag kain krem'),
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
