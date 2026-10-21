import { describe, it, expect } from 'vitest';
import {
  DEFAULT_PHOTO_PRESET,
  ANYA_PITALOKA_FACE_LOCK,
  ANYA_PITALOKA_BODY_LOCK,
  IPHONE13_CAMERA_DETAILS,
} from '../src/lib/photo-engine/constants';
import { generateDeterministicPhotoPrompt } from '../src/lib/photo-engine/deterministic-engine';
import { generateIPhone13OpticsGuidance } from '../src/lib/photo-engine/iphone13-engine';
import { generateNaturalHumanGuidance } from '../src/lib/photo-engine/natural-human-engine';
import { buildPhotoNegativePrompt } from '../src/lib/photo-engine/negative-prompt-builder';
import { PhotoGeneratorInputSchema } from '../src/types/photo';

describe('Master Prompt Photo Generator Studio', () => {
  it('1. Validates PhotoGeneratorInputSchema against default Anya Pitaloka preset', () => {
    const parse = PhotoGeneratorInputSchema.safeParse(DEFAULT_PHOTO_PRESET);
    expect(parse.success).toBe(true);
    if (parse.success) {
      expect(parse.data.characterName).toBe('Anya Pitaloka');
      expect(parse.data.faceLock.enabled).toBe(true);
      expect(parse.data.bodyLock.enabled).toBe(true);
    }
  });

  it('2. Enforces Face Lock strictness and micro-detail persistence (freckles, mole, glasses)', () => {
    const result = generateDeterministicPhotoPrompt(DEFAULT_PHOTO_PRESET);

    // Character identity
    expect(result.mainPrompt).toContain('Anya Pitaloka');
    expect(result.mainPrompt).toContain('tahi lalat kecil yang terlihat jelas di pipi kanan bawah');
    expect(result.mainPrompt).toContain('freckles halus di punggung hidung');
    expect(result.mainPrompt).toContain('kacamata tipis gunmetal');
    expect(result.mainPrompt).toContain('loose beach waves');

    // Face lock explicit instruction
    expect(result.faceLockInstruction).toContain('PENGUNCIAN IDENTITAS WAJAH');
    expect(result.faceLockInstruction).toContain('STRICT');
    expect(result.faceLockInstruction).toContain('Jangan merombak bentuk rahang');
  });

  it('3. Enforces Body Lock strictness and true anatomical consistency (169cm, 56kg, bust 42, waist 60cm, no abs)', () => {
    const result = generateDeterministicPhotoPrompt(DEFAULT_PHOTO_PRESET);

    expect(result.mainPrompt).toContain('tinggi 169 cm, berat 56 kg');
    expect(result.mainPrompt).toContain('siluet jam pasir feminin');
    expect(result.mainPrompt).toContain('dada ukuran 42');
    expect(result.mainPrompt).toContain('gravitasi alami');
    expect(result.mainPrompt).toContain('pinggang ramping 60 cm');

    // Body lock explicit instruction
    expect(result.bodyLockInstruction).toContain('PENGUNCIAN PROPORSI TUBUH');
    expect(result.bodyLockInstruction).toContain('STRICT');
    expect(result.bodyLockInstruction).toContain('tidak berotot');
  });

  it('4. Configures iPhone 13 lens perspectives accurately', () => {
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
    expect(ultraOptics.depthOfFieldGuidance).toContain('deep depth of field');

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

  it('5. Generates natural human realism and zero plastic AI filter rules', () => {
    const guidance = generateNaturalHumanGuidance(
      ANYA_PITALOKA_FACE_LOCK,
      ANYA_PITALOKA_BODY_LOCK,
      'raw_unretouched'
    );

    expect(guidance.skinRealismBlock).toContain('DETAIL MIKRO KULIT MANUSIA ASLI');
    expect(guidance.skinRealismBlock).toContain('pori-pori');
    expect(guidance.antiAIEstheticRules).toContain('PANTANGAN VISUAL ANTI-AI');
    expect(guidance.antiAIEstheticRules).toContain('kulit plastik');
  });

  it('6. Builds comprehensive negative prompt adapted to smartphone photography', () => {
    const neg = buildPhotoNegativePrompt(DEFAULT_PHOTO_PRESET);

    expect(neg).toContain('plastic skin');
    expect(neg).toContain('wax figure');
    expect(neg).toContain('bad anatomy');
    expect(neg).toContain('missing mole on right cheek');
    expect(neg).toContain('sixpack abs on soft feminine body');
    expect(neg).toContain('watermark');
  });

  it('7. Output is 100% coherent Indonesian narrative, not loose disjointed keywords', () => {
    const result = generateDeterministicPhotoPrompt(DEFAULT_PHOTO_PRESET);

    expect(result.mainPrompt.startsWith('Foto candid gaya hidup yang sangat realistis')).toBe(true);
    expect(result.mainPrompt).toContain('1. SUBJEK & IDENTITAS KARAKTER');
    expect(result.mainPrompt).toContain('2. PROPORSI ANATOMI & POSTUR TUBUH');
    expect(result.mainPrompt).toContain('3. PAKAIAN & AKSESORIS');
    expect(result.mainPrompt).toContain('4. LOKASI, SUASANA & TATA CAHAYA');
    expect(result.mainPrompt).toContain('5. KARAKTERISTIK KAMERA & OPTIK SMARTPHONE iPHONE 13');
  });

  it('8. Safe handling when custom prompt or empty fields are passed', () => {
    const customInput = {
      ...DEFAULT_PHOTO_PRESET,
      location: '',
      outfit: '',
      lightingCondition: 'Malam hari temaram',
    };
    const result = generateDeterministicPhotoPrompt(customInput);
    expect(result.mainPrompt).toBeDefined();
    expect(result.negativePrompt).toBeDefined();
    expect(result.photoSettings.device).toBe('Apple iPhone 13');
  });
});
