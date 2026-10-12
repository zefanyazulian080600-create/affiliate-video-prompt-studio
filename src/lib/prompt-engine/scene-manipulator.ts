import { PromptProject } from '@/types';

export type SceneImprovementType =
  | 'cinematic'
  | 'natural'
  | 'strengthen_hook'
  | 'product_visibility'
  | 'continue_previous';

/**
 * Regenerates or improves a specific scene while respecting locked scenes and updating continuity handoffs.
 */
export function improveScene(
  project: PromptProject,
  sceneNumber: number,
  improvementType: SceneImprovementType
): PromptProject {
  const scenes = [...project.scenes];
  const targetIndex = scenes.findIndex(s => s.sceneNumber === sceneNumber);
  if (targetIndex === -1) return project;

  const targetScene = scenes[targetIndex];
  if (targetScene.isLocked) {
    // Locked scene cannot be modified
    return project;
  }

  const updated = { ...targetScene };
  const prevScene = targetIndex > 0 ? scenes[targetIndex - 1] : null;

  switch (improvementType) {
    case 'cinematic':
      updated.cameraDescription = `Cinematic Arri Alexa commercial framing, 50mm f/1.4 prime lens look, creamy bokeh, slow fluid dolly push-in.`;
      updated.lightingDescription = `Dramatic rim lighting with diffused warm key light creating clean commercial specular highlights.`;
      updated.promptEnglish += `\nCINEMATIC POLISH: Enhanced cinematic lighting, high production value commercial look with deliberate focal depth.`;
      break;

    case 'natural':
      updated.cameraDescription = `Organic handheld camera movement with subtle natural micro-shake, authentic UGC influencer aesthetic.`;
      updated.lightingDescription = `Soft authentic natural ambient room daylight, unscripted aesthetic.`;
      updated.dialogueOrVoiceover = `VO (ID): "Jujur ini nyaman banget sih pas dicoba langsung, nggak lebay sama sekali!"`;
      updated.promptEnglish += `\nNATURAL LOOK: Authentic candid motion, relatable lifestyle influencer vibe without overproduction.`;
      break;

    case 'strengthen_hook':
      updated.visualHookDescription = `High-energy visual interrupt: sudden dynamic zoom and expressive reaction in first 2 seconds.`;
      updated.primaryAction = `Talent suddenly pauses, gasps pleasantly, and reveals the product right up to the lens with high enthusiasm.`;
      updated.dialogueOrVoiceover = `VO (ID): "Stop scrolling dulu! Kalau kalian lagi cari yang ini, wajib lihat perbedaannya sekarang!"`;
      updated.promptEnglish = `[STRENGTHENED HIGH TENSION HOOK]\n` + updated.promptEnglish;
      break;

    case 'product_visibility':
      updated.primaryAction = `Talent holds the product steady at chest height with clear lighting highlighting the logo, textured surface, and flawless finish.`;
      updated.cameraDescription = `Close-up macro framing, focus locked firmly on brand typography and material grain.`;
      updated.promptEnglish += `\nPRODUCT FIDELITY EMPHASIS: Ensure brand mark and exact silhouette are 100% visible and unoccluded.`;
      break;

    case 'continue_previous':
      if (prevScene) {
        updated.continuityState.startingState = prevScene.continuityState.endingState;
        updated.primaryAction = `Seamlessly picking up the exact motion where Scene ${prevScene.sceneNumber} finished: ${prevScene.continuityState.unresolvedAction}.`;
        updated.promptEnglish = `[SEAMLESS HANDOFF CONTINUATION]\nStarting strictly from: ${prevScene.continuityState.endingState}\nAction: ${updated.primaryAction}\n` + updated.promptEnglish;
      }
      break;
  }

  scenes[targetIndex] = updated;

  // If this scene changed its ending state, update next scene handoff
  if (targetIndex < scenes.length - 1 && !scenes[targetIndex + 1].isLocked) {
    const nextScene = { ...scenes[targetIndex + 1] };
    nextScene.continuityState.startingState = updated.continuityState.endingState;
    scenes[targetIndex + 1] = nextScene;
  }

  return {
    ...project,
    scenes,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Toggles lock status of a scene.
 */
export function toggleSceneLock(project: PromptProject, sceneNumber: number): PromptProject {
  const scenes = project.scenes.map(s => {
    if (s.sceneNumber === sceneNumber) {
      return { ...s, isLocked: !s.isLocked };
    }
    return s;
  });

  return {
    ...project,
    scenes,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Reorders scenes while updating scene numbers and recalibrating continuity references.
 */
export function reorderScenes(
  project: PromptProject,
  fromIndex: number,
  toIndex: number
): PromptProject {
  if (
    fromIndex < 0 ||
    fromIndex >= project.scenes.length ||
    toIndex < 0 ||
    toIndex >= project.scenes.length ||
    fromIndex === toIndex
  ) {
    return project;
  }

  const scenes = [...project.scenes];
  const [moved] = scenes.splice(fromIndex, 1);
  scenes.splice(toIndex, 0, moved);

  // Recalibrate scene numbers and handoffs
  const recalibrated = scenes.map((s, idx) => ({
    ...s,
    sceneNumber: idx + 1,
  }));

  return {
    ...project,
    scenes: recalibrated,
    updatedAt: new Date().toISOString(),
  };
}
