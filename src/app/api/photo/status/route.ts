import { NextResponse } from 'next/server';
import { checkGeminiConfigStatus } from '@/lib/photo-engine/gemini';

export async function GET() {
  const status = checkGeminiConfigStatus();
  return NextResponse.json({
    success: true,
    isConfigured: status.isConfigured,
    modelName: status.modelName,
  });
}
