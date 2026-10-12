import { GeneratePromptInput, PromptProject } from '@/types';

/**
 * Gemini Provider Adapter: Enhances creative ideation when an authentic API key is available.
 * Fails safely and returns null if the key is absent or network fails, triggering zero-breaking fallback.
 */
export async function callGeminiPromptEnhancer(
  input: GeneratePromptInput,
  baseProject: PromptProject
): Promise<PromptProject | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null; // Transparent fallback to template engine
  }

  try {
    const prompt = `Anda adalah Video Director & Direct Response Affiliate Marketing Strategist untuk Shopee Indonesia.
Analisis produk berikut dan berikan hook yang lebih tajam dan deskripsi adegan yang lebih sinematik:
Produk: ${input.productInput}
Durasi Total: ${input.totalDuration}s (${input.workflowModel})
Kembalikan JSON dengan format:
{
  "enhancedHook": "teks hook singkat",
  "enhancedBigIdea": "ide besar kampanye",
  "callToAction": "CTA khas Shopee"
}`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.7,
          },
        }),
      }
    );

    if (!res.ok) {
      console.warn('[GeminiAdapter] API response not ok, falling back to template engine:', res.status);
      return null;
    }

    const data = await res.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) return null;

    const parsed = JSON.parse(candidateText);

    // Merge enhancements into project
    const enhancedProject: PromptProject = {
      ...baseProject,
      creativeConcept: {
        ...baseProject.creativeConcept,
        bigIdea: parsed.enhancedBigIdea || baseProject.creativeConcept.bigIdea,
        visualHookAngle: parsed.enhancedHook || baseProject.creativeConcept.visualHookAngle,
        callToAction: parsed.callToAction || baseProject.creativeConcept.callToAction,
      },
      generationMode: 'ai-provider',
    };

    return enhancedProject;
  } catch (err) {
    console.warn('[GeminiAdapter] Error calling Gemini API, safely falling back:', err);
    return null;
  }
}
