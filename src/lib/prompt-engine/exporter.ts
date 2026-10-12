import { PromptProject, ScenePlan } from '@/types';

/**
 * Formats full project prompt collection into Markdown or plain text.
 */
export function exportProjectToMarkdown(
  project: PromptProject,
  mode: 'human-readable' | 'copy-ready' = 'human-readable'
): string {
  if (mode === 'copy-ready') {
    return project.scenes
      .map(
        s => `=== SCENE ${s.sceneNumber} (${s.duration}s - ${s.marketingStage}) ===
PROMPT:
${s.promptEnglish}

NEGATIVE PROMPT:
${s.negativePrompts.combinedNegativePrompt}

${s.nextSceneHandoffPackage}
`
      )
      .join('\n----------------------------------------\n\n');
  }

  // Human readable detailed report
  let md = `# ${project.projectName}
**Model Target:** ${project.workflowModel.toUpperCase()} | **Preset Durasi:** ${project.presetSceneDuration}s/scene | **Total Durasi:** ${project.totalDuration}s
**Format Kampanye:** ${project.creativeConcept.format}
**Skor Kualitas Internal:** ${project.qualityReport.overallScore}/100

---

## 1. BIG IDEA & KONSEP KREATIF
- **Big Idea:** ${project.creativeConcept.bigIdea}
- **Angle Hook:** ${project.creativeConcept.visualHookAngle}
- **Target Pembeli:** ${project.productProfile.targetAudience}
- **Shopee CTA:** ${project.creativeConcept.callToAction}

---

## 2. CONTINUITY BIBLE
### Character Lock
${project.continuityBible.characterLock.visualIdentity}
Wardrobe: ${project.continuityBible.characterLock.wardrobeAndAccessories}

### Product Lock
${project.continuityBible.productLock.shapeAndProportions}
Warna & Finishing: ${project.continuityBible.productLock.colorAndFinish}

### Environment & Cinematography Lock
Lokasi: ${project.continuityBible.environmentLock.location} (${project.continuityBible.environmentLock.timeOfDay})
Kamera: ${project.continuityBible.cinematographyLock.cameraStyle} (${project.continuityBible.cinematographyLock.aspectRatio})

---

## 3. STORYBOARD & PROMPT PER SCENE

`;

  for (const s of project.scenes) {
    md += `### SCENE ${s.sceneNumber} — ${s.marketingStage.toUpperCase()} (${s.duration} Detik)
**Aksi Utama:** ${s.primaryAction}
**Kamera & Cahaya:** ${s.cameraDescription} | ${s.lightingDescription}
**Voiceover (Bahasa Indonesia):** ${s.dialogueOrVoiceover || '-'}
**Sound Design:** ${s.soundDesign}

#### Copy-Ready AI Video Prompt (English):
\`\`\`
${s.promptEnglish}
\`\`\`

#### Negative Prompt:
\`\`\`
${s.negativePrompts.combinedNegativePrompt}
\`\`\`

#### ${s.nextSceneHandoffPackage}

---
`;
  }

  return md;
}

/**
 * Exports complete project entity as downloadable JSON string.
 */
export function exportProjectToJSON(project: PromptProject): string {
  return JSON.stringify(project, null, 2);
}

/**
 * Formats a single scene into a complete copy package.
 */
export function copyFullScenePackage(scene: ScenePlan): string {
  return `=== SCENE ${scene.sceneNumber} (${scene.duration}s - ${scene.marketingStage}) ===

[POSITIVE PROMPT - ENGLISH]
${scene.promptEnglish}

[NEGATIVE PROMPT]
${scene.negativePrompts.combinedNegativePrompt}

[AUDIO & VOICEOVER]
${scene.dialogueOrVoiceover}
Sound Design: ${scene.soundDesign}

${scene.nextSceneHandoffPackage}`;
}
