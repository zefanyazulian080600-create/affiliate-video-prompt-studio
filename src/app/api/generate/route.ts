import { NextRequest, NextResponse } from 'next/server';
import { executePromptPipeline } from '@/lib/prompt-engine/pipeline';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = req.headers.get('x-user-id') || 'local-user';

    const result = await executePromptPipeline(body, userId);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          engineStatusMessage: result.engineStatusMessage,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      project: result.project,
      generationMode: result.generationMode,
      engineStatusMessage: result.engineStatusMessage,
    });
  } catch (error: any) {
    console.error('API /api/generate unhandled error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Terjadi kesalahan internal server saat memproses prompt.',
      },
      { status: 500 }
    );
  }
}
