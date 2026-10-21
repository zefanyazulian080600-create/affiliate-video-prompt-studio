import { NextRequest, NextResponse } from 'next/server';
import { PhotoRefinementRequest } from '@/types/photo';
import { refinePhotoPromptWithGemini } from '@/lib/photo-engine/gemini';

export async function POST(req: NextRequest) {
  try {
    const body: PhotoRefinementRequest = await req.json();

    if (!body || !body.currentPrompt || !body.refinementAction) {
      return NextResponse.json(
        {
          success: false,
          error: 'Parameter request perbaikan (refinement) tidak lengkap.',
        },
        { status: 400 }
      );
    }

    const updated = await refinePhotoPromptWithGemini(body);

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    console.error('API /api/photo/refine unhandled error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Gagal melakukan perbaikan prompt.',
      },
      { status: 500 }
    );
  }
}
