import { describe, it, expect } from 'vitest';
import {
  DEFAULT_PHOTO_PRESET,
  ANYA_PITALOKA_FACE_LOCK,
  ANYA_PITALOKA_BODY_LOCK,
  BLANK_CUSTOM_FACE_LOCK,
  BLANK_CUSTOM_BODY_LOCK,
  IPHONE13_CAMERA_DETAILS,
} from '../src/lib/photo-engine/constants';
import {
  OUTFIT_REFERENCE_PRESETS,
  DEFAULT_OUTFIT_CONFIG,
  getOutfitPresetById,
} from '../src/lib/photo-engine/outfit-presets';
import { generateDeterministicPhotoPrompt } from '../src/lib/photo-engine/deterministic-engine';
import { generateIPhone13OpticsGuidance } from '../src/lib/photo-engine/iphone13-engine';
import { generateNaturalHumanGuidance } from '../src/lib/photo-engine/natural-human-engine';
import { buildPhotoNegativePrompt } from '../src/lib/photo-engine/negative-prompt-builder';
import { PhotoGeneratorInputSchema, PhotoGeneratorInput } from '../src/types/photo';

describe('Master Prompt Photo Generator Studio', () => {
  const anyaPresetInput: PhotoGeneratorInput = {
    ...DEFAULT_PHOTO_PRESET,
    characterName: 'Anya Pitaloka',
    faceLock: ANYA_PITALOKA_FACE_LOCK,
    bodyLock: ANYA_PITALOKA_BODY_LOCK,
  };

  it('1. Validates PhotoGeneratorInputSchema with optional Face Lock & Body Lock defaults', () => {
    const parse = PhotoGeneratorInputSchema.safeParse(DEFAULT_PHOTO_PRESET);
    expect(parse.success).toBe(true);
    if (parse.success) {
      expect(parse.data.faceLock.enabled).toBe(false);
      expect(parse.data.bodyLock.enabled).toBe(false);
    }
  });

  it('2. Enforces Face Lock strictness when enabled with custom or demo character', () => {
    const result = generateDeterministicPhotoPrompt(anyaPresetInput);

    // Character identity
    expect(result.mainPrompt).toContain('Anya Pitaloka');
    expect(result.mainPrompt).toContain('tahi lalat');
    expect(result.mainPrompt).toContain('freckles');

    // Face lock explicit instruction
    expect(result.faceLockInstruction).toContain('PENGUNCIAN IDENTITAS WAJAH');
    expect(result.faceLockInstruction).toContain('STRICT');
    expect(result.faceLockInstruction).toContain('Jangan merombak struktur wajah');
  });

  it('3. Supports custom character input and user-defined face & body prompt', () => {
    const customCharacterInput: PhotoGeneratorInput = {
      ...DEFAULT_PHOTO_PRESET,
      characterName: 'Siti Rahma',
      faceLock: {
        ...BLANK_CUSTOM_FACE_LOCK,
        enabled: true,
        priority: 'balanced',
        characterName: 'Siti Rahma',
        ethnicityAndAge: 'Wanita Sunda (usia 22 tahun)',
        customNotes: 'Wajah tirus manis dengan lesung pipi di kiri, mata bundar berbinar, rambut hitam sebahu.',
      },
      bodyLock: {
        ...BLANK_CUSTOM_BODY_LOCK,
        enabled: true,
        priority: 'balanced',
        heightAndWeight: '162 cm, 48 kg',
        customNotes: 'Tubuh mungil ramping proporsional alami, bahu rileks santun.',
      },
    };

    const result = generateDeterministicPhotoPrompt(customCharacterInput);
    expect(result.mainPrompt).toContain('Siti Rahma');
    expect(result.faceLockInstruction).toContain('Siti Rahma');
    expect(result.faceLockInstruction).toContain('lesung pipi di kiri');
    expect(result.bodyLockInstruction).toContain('162 cm, 48 kg');
    expect(result.bodyLockInstruction).toContain('Tubuh mungil');
  });

  it('4. Face Lock and Body Lock operate safely when disabled (optional mode)', () => {
    const disabledLocksInput: PhotoGeneratorInput = {
      ...DEFAULT_PHOTO_PRESET,
      characterName: 'Model Bebas',
      faceLock: { ...BLANK_CUSTOM_FACE_LOCK, enabled: false },
      bodyLock: { ...BLANK_CUSTOM_BODY_LOCK, enabled: false },
    };

    const result = generateDeterministicPhotoPrompt(disabledLocksInput);
    expect(result.faceLockInstruction).toContain('Face Lock dinonaktifkan (Opsional)');
    expect(result.bodyLockInstruction).toContain('Body Lock dinonaktifkan (Opsional)');
    expect(result.mainPrompt).toContain('Model Bebas');
  });

  it('5. Integrates rich Outfit Reference library (optional) with itemized breakdown', () => {
    expect(OUTFIT_REFERENCE_PRESETS.length).toBeGreaterThanOrEqual(15);

    const preset = getOutfitPresetById('hongdae_oversized_blazer');
    expect(preset).toBeDefined();

    const outfitInput: PhotoGeneratorInput = {
      ...DEFAULT_PHOTO_PRESET,
      outfitReference: {
        ...DEFAULT_OUTFIT_CONFIG,
        enabled: true,
        priority: 'strict',
        presetId: preset!.id,
        presetName: preset!.name,
        itemDetails: preset!.details,
        fullDescription: preset!.fullDescription,
      },
    };

    const result = generateDeterministicPhotoPrompt(outfitInput);
    expect(result.outfitLockInstruction).toBeDefined();
    expect(result.outfitLockInstruction).toContain('PENGUNCIAN REFERENSI OUTFIT');
    expect(result.outfitLockInstruction).toContain('Blazer tailored');
    expect(result.mainPrompt).toContain('Blazer');
  });

  it('6. Supports Character Sheet turnaround prompt generation (optional bila ada)', () => {
    const sheetInput: PhotoGeneratorInput = {
      ...DEFAULT_PHOTO_PRESET,
      characterName: 'Alya',
      characterSheet: {
        enabled: true,
        sheetType: 'turnaround_4views',
        sheetDescription: 'Lembar turnaround 4 sudut tampak depan, samping kiri, samping kanan, belakang',
      },
    };

    const result = generateDeterministicPhotoPrompt(sheetInput);
    expect(result.characterSheetInstruction).toBeDefined();
    expect(result.characterSheetInstruction).toContain('CHARACTER SHEET AKTIF');
    expect(result.characterSheetPrompt).toBeDefined();
    expect(result.characterSheetPrompt).toContain('turnaround');
    expect(result.characterSheetPrompt).toContain('--ar 16:9');
  });

  it('7. Configures iPhone 13 lens perspectives accurately', () => {
    // Main back camera 26mm
    const mainOptics = generateIPhone13OpticsGuidance(
      'iphone13_main_back',
      'eye_level',
      'three_quarter',
      '4:5',
      'Cahaya matahari sore'
    );
    expect(mainOptics.lensSpecs).toContain('26mm equivalent focal length');
    expect(mainOptics.lensSpecs).toContain('f/1.6');
    expect(mainOptics.depthOfFieldGuidance).toContain('BUKAN bokeh ekstrem');

    // Ultra-wide 13mm
    const ultraOptics = generateIPhone13OpticsGuidance(
      'iphone13_ultra_wide',
      'low_angle',
      'full_length',
      '9:16',
      'Siang hari'
    );
    expect(ultraOptics.lensSpecs).toContain('13mm equivalent focal length');
    expect(ultraOptics.lensSpecs).toContain('f/2.4');

    // Mirror selfie camera
    const mirrorOptics = generateIPhone13OpticsGuidance(
      'iphone13_mirror_back',
      'eye_level',
      'half_body',
      '4:5',
      'Lampu kamar tidur'
    );
    expect(mirrorOptics.mirrorSelfieRules).toBeDefined();
    expect(mirrorOptics.mirrorSelfieRules).toContain('ponsel pintar iPhone 13');
  });

  it('8. Generates natural human realism and builds comprehensive negative prompt', () => {
    const guidance = generateNaturalHumanGuidance(
      ANYA_PITALOKA_FACE_LOCK,
      ANYA_PITALOKA_BODY_LOCK,
      'raw_unretouched'
    );
    expect(guidance.skinRealismBlock).toContain('DETAIL MIKRO KULIT MANUSIA ASLI');
    expect(guidance.antiAIEstheticRules).toContain('PANTANGAN VISUAL ANTI-AI');

    const neg = buildPhotoNegativePrompt(anyaPresetInput);
    expect(neg).toContain('plastic skin');
    expect(neg).toContain('bad anatomy');
    expect(neg).toContain('watermark');
  });

  it('9. Output is 100% coherent Indonesian narrative with proper structure', () => {
    const result = generateDeterministicPhotoPrompt(anyaPresetInput);
    expect(result.mainPrompt.startsWith('Foto candid gaya hidup yang sangat realistis')).toBe(true);
    expect(result.mainPrompt).toContain('1. SUBJEK & IDENTITAS KARAKTER');
    expect(result.mainPrompt).toContain('2. PROPORSI ANATOMI & POSTUR TUBUH');
    expect(result.mainPrompt).toContain('3. PAKAIAN & AKSESORIS');
    expect(result.mainPrompt).toContain('4. LOKASI, SUASANA & TATA CAHAYA');
    expect(result.mainPrompt).toContain('5. KARAKTERISTIK KAMERA & OPTIK SMARTPHONE iPHONE 13');
  });
});
