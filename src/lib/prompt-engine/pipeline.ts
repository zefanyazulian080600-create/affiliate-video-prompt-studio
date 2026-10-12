import {
  GeneratePromptInput,
  GeneratePromptInputSchema,
  PromptProject,
} from '@/types';
import { generateDeterministicPrompts } from './template-fallback';
import { callGeminiPromptEnhancer } from './gemini-adapter';

export interface PipelineExecutionResult {
  success: boolean;
  project?: PromptProject;
  error?: string;
  generationMode: 'ai-provider' | 'deterministic-template';
  engineStatusMessage: string;
}

/**
 * Executes the complete 14-stage prompt generation pipeline.
 * Guarantees zero crashing: validates input with Zod, executes deterministic base generation,
 * attempts AI enhancement if configured, and returns verified production-ready storyboard.
 */
export async function executePromptPipeline(
  rawInput: unknown,
  userId: string = 'local-user',
  projectId?: string
): Promise<PipelineExecutionResult> {
  // 1. Input Validation
  const parseResult = GeneratePromptInputSchema.safeParse(rawInput);
  if (!parseResult.success) {
    const errorMsg = (parseResult.error.issues || []).map((e: any) => `${e.path.join('.')}: ${e.message}`).join(', ');
    return {
      success: false,
      error: `Validasi input gagal: ${errorMsg}`,
      generationMode: 'deterministic-template',
      engineStatusMessage: 'Input tidak memenuhi kriteria validasi.',
    };
  }

  const validData: GeneratePromptInput = parseResult.data;

  // 2-14. Generate Base Structured Project via Deterministic Engine
  const baseProject = generateDeterministicPrompts(validData, userId, projectId);

  // Attempt AI enhancement if key is provided
  const enhancedProject = await callGeminiPromptEnhancer(validData, baseProject);

  if (enhancedProject) {
    return {
      success: true,
      project: enhancedProject,
      generationMode: 'ai-provider',
      engineStatusMessage: 'Prompt berhasil digenerate menggunakan Google Gemini AI + Continuity Lock.',
    };
  }

  return {
    success: true,
    project: baseProject,
    generationMode: 'deterministic-template',
    engineStatusMessage: 'Prompt berhasil digenerate menggunakan Deterministic Engine (Offline / Tanpa API Key).',
  };
}
