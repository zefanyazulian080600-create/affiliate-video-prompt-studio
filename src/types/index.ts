import { z } from 'zod';

// ==========================================
// 1. WORKFLOW & DURATION TYPES
// ==========================================

export type VideoModel = 'seedance-2.5' | 'omni-flash';

export type ScenePresetDuration = 10 | 15;

export interface WorkflowConfig {
  model: VideoModel;
  modelLabel: string;
  presetSceneDuration: ScenePresetDuration;
  supportedTotalDurations: number[]; // e.g. [10, 15, 20, 30, 45, 60]
  description: string;
}

export interface DurationPlan {
  totalDuration: number;
  workflowModel: VideoModel;
  presetSceneDuration: ScenePresetDuration;
  sceneCount: number;
  sceneDurations: number[]; // Exact duration for each scene
  sumDuration: number;
  remainder: number;
  isCustomDuration: boolean;
  durationWarning?: string;
}

// ==========================================
// 2. PRODUCT & REFERENCE TYPES
// ==========================================

export type ImageFunctionLabel =
  | 'front_view'
  | 'side_view'
  | 'back_view'
  | 'material_detail'
  | 'logo_detail'
  | 'packaging'
  | 'in_use'
  | 'unspecified';

export interface ProductImageReference {
  id: string;
  url: string;
  fileName: string;
  fileSize: number;
  isPrimary: boolean;
  functionLabel: ImageFunctionLabel;
  detectedFeatures?: string[];
}

export interface CharacterReference {
  id: string;
  url: string;
  fileName: string;
  name?: string;
  genderAppearance?: string;
  estimatedAgeRange?: string;
  skinTone?: string;
  hairStyleAndColor?: string;
  facialFeatures?: string;
  wardrobe?: string;
  accessories?: string;
  postureAndVibe?: string;
  distinguishingFeatures?: string;
  isCustomProvided: boolean;
}

export interface ProductProfile {
  rawInput: string;
  productName: string;
  category: string;
  brandName?: string;
  statedPrice?: string;
  coreBenefits: string[];
  keyFeatures: string[];
  verifiedStrengths: string[];
  targetAudience: string;
  buyerPainPoints: string[];
  buyerObjections: string[];
  toneOfVoice: string;
  claimBoundaries: string[]; // Batasan klaim (no fake medical/guarantee)
  unspecifiedInfo: string[]; // Info yang tidak tersedia
}

// ==========================================
// 3. CONTINUITY BIBLE TYPES
// ==========================================

export interface CharacterLock {
  visualIdentity: string;
  faceAndHair: string;
  wardrobeAndAccessories: string;
  postureAndVibe: string;
  distinguishingFeatures: string;
  voiceOrTone: string;
}

export interface ProductLock {
  shapeAndProportions: string;
  colorAndFinish: string;
  logoAndBranding: string;
  materialAndTexture: string;
  packagingState: string;
  rules: string[]; // e.g. "Do not alter logo, do not change white sneaker color"
}

export interface EnvironmentLock {
  location: string;
  timeOfDay: string;
  weatherOrAtmosphere: string;
  backgroundElements: string;
  lightingStyle: string;
  colorPalette: string;
}

export interface CinematographyLock {
  aspectRatio: '9:16' | '16:9' | '1:1';
  cameraStyle: string;
  lensCharacteristics: string;
  depthOfField: string;
  lightingTechnique: string;
  realismLevel: string;
}

export interface StoryLock {
  chronologicalFlow: string;
  talentInitialAction: string;
  productInitialPlacement: string;
  movementVector: string;
  emotionalArc: string;
}

export interface ContinuityBible {
  characterLock: CharacterLock;
  productLock: ProductLock;
  environmentLock: EnvironmentLock;
  cinematographyLock: CinematographyLock;
  storyLock: StoryLock;
}

// ==========================================
// 4. PER-SCENE STATE & HANDOFF TYPES
// ==========================================

export interface ContinuityState {
  startingState: string;
  action: string;
  endingState: string;
  characterPosition: string;
  productPosition: string;
  cameraPosition: string;
  cameraMovement: string;
  screenDirection: string;
  environmentState: string;
  lightingState: string;
  propsState: string;
  audioState: string;
  unresolvedAction: string;
  transitionInstruction: string;
  nextSceneHandoff: string;
}

export interface SceneNegativePrompts {
  characterRisks: string[];
  productRisks: string[];
  sceneRisks: string[];
  visualQualityRisks: string[];
  combinedNegativePrompt: string;
}

export interface ScenePlan {
  sceneNumber: number;
  duration: number; // e.g. 10s or 15s
  marketingStage: 'Hook' | 'Context' | 'Product Reveal' | 'Demonstration' | 'Desire/Benefit' | 'Objection Handling' | 'CTA';
  visualHookDescription: string;
  primaryAction: string;
  cameraDescription: string;
  lightingDescription: string;
  dialogueOrVoiceover?: string;
  soundDesign: string;
  
  // Prompt packages
  promptId: string;
  promptIndonesian: string;
  promptEnglish: string;
  negativePrompts: SceneNegativePrompts;
  
  // Continuity
  continuityState: ContinuityState;
  
  // Handoff Block
  nextSceneHandoffPackage: string;
  
  // Metadata & State
  isLocked: boolean;
  requiredImageReferences: string[];
  inconsistencyWarnings: string[];
}

// ==========================================
// 5. MARKETING & CREATIVE CONCEPTS
// ==========================================

export type MarketingAngleFormat =
  | 'Problem-Solution'
  | 'Product Demonstration'
  | 'Before & After (Realistic)'
  | 'Daily Life POV'
  | 'UGC Testimonial'
  | 'Unboxing & First Impression'
  | 'Material & Detail Focus'
  | 'Comparison'
  | 'Outfit Styling / Transformation'
  | 'Gift Idea'
  | 'Objection Handling'
  | 'Lifestyle Integration'
  | 'Soft Selling'
  | 'Direct Response Shopee'
  | 'Cinematic Commercial'
  | 'Satisfying Reveal';

export type AudioDirection =
  | 'voiceover'
  | 'music_only'
  | 'dialogue_onscreen'
  | 'asmr_foley';

export type ContentFormatChoice =
  | 'auto'
  | 'ugc_review'
  | 'problem_solution'
  | 'product_showcase'
  | 'unboxing'
  | 'outfit_styling'
  | 'satisfying_asmr'
  | 'pov_daily'
  | 'cinematic_ad'
  | 'relatable_comedy'
  | 'soft_selling';

export type VideoMoodChoice =
  | 'relatable'
  | 'premium'
  | 'upbeat'
  | 'aesthetic'
  | 'cozy';

export interface CreativeConcept {
  bigIdea: string;
  format: MarketingAngleFormat;
  contentFormatChoice: ContentFormatChoice;
  audioDirection: AudioDirection;
  videoMoodChoice: VideoMoodChoice;
  creativeAngle: string;
  visualHookAngle: string;
  productRevealMoment: string;
  pacingAndRhythm: string;
  cameraLanguage: string;
  lightingMood: string;
  callToAction: string;
  shopeeAffiliateAnchor: string; // e.g. "Cek link keranjang kuning sekarang untuk klaim promo"
}

// ==========================================
// 6. QUALITY AUDIT & PROJECT PERSISTENCE
// ==========================================

export interface QualityCategoryScore {
  name: string;
  score: number; // 0 - 100
  weight: number;
  status: 'passed' | 'warning' | 'needs_attention';
  details: string;
}

export interface QualityAuditReport {
  overallScore: number; // 0 - 100
  categories: {
    productFidelity: QualityCategoryScore;
    characterConsistency: QualityCategoryScore;
    sceneContinuity: QualityCategoryScore;
    marketingClarity: QualityCategoryScore;
    visualQuality: QualityCategoryScore;
    technicalCompatibility: QualityCategoryScore;
  };
  warnings: string[];
  suggestedFixes: string[];
}

export interface ResearchReference {
  topic: string;
  sourceUrl?: string;
  accessDate?: string;
  insight: string;
  isFactualVerified: boolean;
}

export interface MarketingCaptionOption {
  id: string;
  formulaName: string;
  formulaTag: 'PAS' | 'AIDA' | 'BAB' | 'STORY' | 'FOMO';
  formulaDescription: string;
  hookHeadline: string;
  bodyText: string;
  callToAction: string;
  hashtags: string[];
  fullCaption: string;
  copyAdvice: string;
}

export interface MarketingCaptionsPackage {
  mandatoryEnding: string;
  options: MarketingCaptionOption[];
}

export interface PromptProject {
  id: string;
  userId: string;
  projectName: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'completed';
  
  // Input Data
  rawProductInput: string;
  totalDuration: number;
  workflowModel: VideoModel;
  presetSceneDuration: ScenePresetDuration;
  
  // Generated Pipeline Data
  productProfile: ProductProfile;
  characterReference?: CharacterReference;
  productImages: ProductImageReference[];
  durationPlan: DurationPlan;
  creativeConcept: CreativeConcept;
  continuityBible: ContinuityBible;
  scenes: ScenePlan[];
  qualityReport: QualityAuditReport;
  researchReferences: ResearchReference[];
  marketingCaptions?: MarketingCaptionsPackage;
  
  // Engine Metadata
  generationMode: 'ai-provider' | 'deterministic-template';
  engineVersion: string;
}

// ==========================================
// 7. ZOD SCHEMAS FOR API VALIDATION
// ==========================================

export const GeneratePromptInputSchema = z.object({
  productInput: z.string().min(10, 'Informasi produk minimal 10 karakter'),
  totalDuration: z.number().int().min(5).max(120).default(30),
  workflowModel: z.enum(['seedance-2.5', 'omni-flash']).default('seedance-2.5'),
  presetSceneDuration: z.union([z.literal(10), z.literal(15)]).default(10),
  characterReference: z.object({
    id: z.string(),
    url: z.string(),
    fileName: z.string(),
    name: z.string().optional(),
    isCustomProvided: z.boolean(),
  }).optional(),
  productImages: z.array(z.object({
    id: z.string(),
    url: z.string(),
    fileName: z.string(),
    fileSize: z.number(),
    isPrimary: z.boolean(),
    functionLabel: z.string(),
  })).default([]),
  languagePreference: z.enum(['id', 'en', 'bilingual']).default('bilingual'),
  enableWebResearch: z.boolean().default(false),
  contentFormatChoice: z.enum([
    'auto',
    'ugc_review',
    'problem_solution',
    'product_showcase',
    'unboxing',
    'outfit_styling',
    'satisfying_asmr',
    'pov_daily',
    'cinematic_ad',
    'relatable_comedy',
    'soft_selling',
  ]).default('auto'),
  audioDirection: z.enum([
    'voiceover',
    'music_only',
    'dialogue_onscreen',
    'asmr_foley',
  ]).default('voiceover'),
  videoMoodChoice: z.enum([
    'relatable',
    'premium',
    'upbeat',
    'aesthetic',
    'cozy',
  ]).default('relatable'),
});

export type GeneratePromptInput = z.infer<typeof GeneratePromptInputSchema>;
