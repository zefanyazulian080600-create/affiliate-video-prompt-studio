import { describe, it, expect } from 'vitest';
import { calculateDurationPlan } from '@/lib/duration-calculator';
import { analyzeProductInput } from '@/lib/prompt-engine/analyzer';
import { buildContinuityBible } from '@/lib/prompt-engine/continuity-bible-builder';
import { generateScenePlans } from '@/lib/prompt-engine/scene-generator';
import { generateCreativeConcept } from '@/lib/prompt-engine/creative-director';
import { auditPromptQuality } from '@/lib/prompt-engine/quality-auditor';
import { generateDeterministicPrompts } from '@/lib/prompt-engine/template-fallback';
import { improveScene, toggleSceneLock } from '@/lib/prompt-engine/scene-manipulator';
import { GeneratePromptInputSchema } from '@/types';

describe('Affiliate Video Prompt Studio — Automated Test Suite', () => {
  // Skenario 1: Video 10 detik dengan satu scene
  it('1. Generates 10-second video with exactly 1 scene', () => {
    const plan = calculateDurationPlan(10, 'seedance-2.5', 10);
    expect(plan.sceneCount).toBe(1);
    expect(plan.sceneDurations).toEqual([10]);
    expect(plan.sumDuration).toBe(10);
    expect(plan.remainder).toBe(0);
  });

  // Skenario 2: Video 30 detik dengan preset 10 detik
  it('2. Generates 30-second video with 10s preset (3 scenes @ 10s)', () => {
    const plan = calculateDurationPlan(30, 'seedance-2.5', 10);
    expect(plan.sceneCount).toBe(3);
    expect(plan.sceneDurations).toEqual([10, 10, 10]);
    expect(plan.sumDuration).toBe(30);
    expect(plan.remainder).toBe(0);
  });

  // Skenario 3: Video 30 detik dengan preset 15 detik
  it('3. Generates 30-second video with 15s preset (2 scenes @ 15s)', () => {
    const plan = calculateDurationPlan(30, 'seedance-2.5', 15);
    expect(plan.sceneCount).toBe(2);
    expect(plan.sceneDurations).toEqual([15, 15]);
    expect(plan.sumDuration).toBe(30);
    expect(plan.remainder).toBe(0);
  });

  // Skenario 4: Video 45 detik dengan alokasi durasi presisi
  it('4. Generates 45-second video with exact allocation (15s preset -> 3 scenes; 10s preset -> 4x10s + 1x5s remainder)', () => {
    // 15s preset
    const plan15 = calculateDurationPlan(45, 'seedance-2.5', 15);
    expect(plan15.sceneCount).toBe(3);
    expect(plan15.sceneDurations).toEqual([15, 15, 15]);
    expect(plan15.remainder).toBe(0);

    // 10s preset (with remainder)
    const plan10 = calculateDurationPlan(45, 'seedance-2.5', 10);
    expect(plan10.sceneCount).toBe(5);
    expect(plan10.sceneDurations).toEqual([10, 10, 10, 10, 5]);
    expect(plan10.remainder).toBe(5);
    expect(plan10.durationWarning).toContain('tidak habis dibagi');
  });

  // Skenario 5: Video tanpa character reference
  it('5. Generates video without character reference using contextual default talent', () => {
    const product = analyzeProductInput('Sepatu sneakers pria warna putih, bahan knit empuk');
    const bible = buildContinuityBible(product, undefined, []);
    expect(bible.characterLock.visualIdentity).toBeDefined();
    expect(bible.characterLock.visualIdentity.length).toBeGreaterThan(15);
  });

  // Skenario 6: Video dengan character reference khusus
  it('6. Generates video with custom character reference preserving specific traits', () => {
    const product = analyzeProductInput('Serum glowing wajah botol kaca 30ml');
    const customChar = {
      id: 'char-1',
      url: '/char.jpg',
      fileName: 'talent.jpg',
      name: 'Rina Model UGC',
      estimatedAgeRange: '24',
      wardrobe: 'Blazer lilac pastel dan inner putih',
      isCustomProvided: true,
    };
    const bible = buildContinuityBible(product, customChar, []);
    expect(bible.characterLock.wardrobeAndAccessories).toContain('Blazer lilac');
    expect(bible.characterLock.visualIdentity).toContain('Rina Model UGC');
  });

  // Skenario 7: Video dengan beberapa foto produk
  it('7. Generates video with multiple product photos locking primary image', () => {
    const product = analyzeProductInput('Sepatu sneakers putih');
    const images = [
      {
        id: 'img-1',
        url: '/front.jpg',
        fileName: 'sneaker_front.jpg',
        fileSize: 500000,
        isPrimary: true,
        functionLabel: 'front_view' as const,
      },
      {
        id: 'img-2',
        url: '/sole.jpg',
        fileName: 'sneaker_sole.jpg',
        fileSize: 400000,
        isPrimary: false,
        functionLabel: 'material_detail' as const,
      },
    ];
    const bible = buildContinuityBible(product, undefined, images);
    expect(bible.productLock.colorAndFinish).toContain('sneaker_front.jpg');
  });

  // Skenario 8: Lanjutkan scene kedua dari ending scene pertama (Continuity Handoff)
  it('8. Links Scene 2 startingState directly to Scene 1 endingState with NEXT SCENE HANDOFF block', () => {
    const project = generateDeterministicPrompts({
      productInput: 'Sepatu sneakers pria putih desain minimalis harian',
      totalDuration: 20,
      workflowModel: 'seedance-2.5',
      presetSceneDuration: 10,
      productImages: [],
      languagePreference: 'bilingual',
      enableWebResearch: false,
    });

    expect(project.scenes.length).toBe(2);
    const scene1 = project.scenes[0];
    const scene2 = project.scenes[1];

    // Scene 2 starts with Scene 1's ending state
    expect(scene2.continuityState.startingState).toBe(scene1.continuityState.endingState);
    expect(scene1.nextSceneHandoffPackage).toContain('NEXT SCENE HANDOFF — SCENE 1 TO SCENE 2');
    expect(scene2.promptEnglish).toContain('CONTINUITY INSTRUCTION');
  });

  // Skenario 9: Regenerate/improve scene kedua tanpa mengubah scene pertama yang terkunci
  it('9. Modifies unlocked Scene 2 while keeping locked Scene 1 strictly unchanged', () => {
    let project = generateDeterministicPrompts({
      productInput: 'Sepatu sneakers pria putih desain minimalis harian',
      totalDuration: 20,
      workflowModel: 'seedance-2.5',
      presetSceneDuration: 10,
      productImages: [],
      languagePreference: 'bilingual',
      enableWebResearch: false,
    });

    // Lock Scene 1
    project = toggleSceneLock(project, 1);
    expect(project.scenes[0].isLocked).toBe(true);

    const originalScene1Prompt = project.scenes[0].promptEnglish;

    // Improve Scene 2 (Cinematic)
    project = improveScene(project, 2, 'cinematic');

    // Verify Scene 1 remains 100% intact
    expect(project.scenes[0].promptEnglish).toBe(originalScene1Prompt);

    // Verify Scene 2 received cinematic polish
    expect(project.scenes[1].promptEnglish).toContain('CINEMATIC POLISH');
  });

  // Skenario 10: Input validation rejects invalid data via Zod
  it('10. Validates inputs and rejects too short product description', () => {
    const invalidInput = {
      productInput: 'pendek', // < 10 characters
      totalDuration: 30,
      workflowModel: 'seedance-2.5',
      presetSceneDuration: 10,
    };
    const result = GeneratePromptInputSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
  });

  // Skenario 11: Quality Auditor evaluates concrete heuristics and scores 0-100
  it('11. Audits project and generates comprehensive quality score and warnings', () => {
    const project = generateDeterministicPrompts({
      productInput: 'Sepatu sneakers pria warna putih bersih untuk kuliah dan nongkrong',
      totalDuration: 30,
      workflowModel: 'seedance-2.5',
      presetSceneDuration: 10,
      productImages: [],
      languagePreference: 'bilingual',
      enableWebResearch: false,
    });

    expect(project.qualityReport.overallScore).toBeGreaterThanOrEqual(40);
    expect(project.qualityReport.overallScore).toBeLessThanOrEqual(100);
    expect(project.qualityReport.categories.productFidelity).toBeDefined();
    expect(project.qualityReport.categories.sceneContinuity).toBeDefined();
    expect(project.qualityReport.categories.marketingClarity).toBeDefined();
  });

  // Skenario 12: Omni Flash presets strictly enforce 10s scene limit
  it('12. Omni Flash resets 15s preset to 10s with clear notification', () => {
    const plan = calculateDurationPlan(30, 'omni-flash', 15);
    expect(plan.presetSceneDuration).toBe(10);
    expect(plan.durationWarning).toContain('Omni Flash hanya mendukung preset scene 10 detik');
  });
});
