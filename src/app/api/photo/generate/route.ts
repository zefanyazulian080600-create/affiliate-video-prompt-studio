import { NextRequest, NextResponse } from 'next/server';
import { PhotoGeneratorInputSchema } from '@/types/photo';
import { generatePhotoPromptWithGemini } from '@/lib/photo-engine/gemini';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();

    const parseResult = PhotoGeneratorInputSchema.safeParse(rawBody);
    if (!parseResult.success) {
      const errorMsg = (parseResult.error.issues || [])
        .map((e: any) => `${e.path.join('.')}: ${e.message}`)
        .join(', ');
      return NextResponse.json(
        {
          success: false,
          error: `Validasi input gagal: ${errorMsg}`,
        },
        { status: 400 }
      );
    }

    const output = await generatePhotoPromptWithGemini(parseResult.data);

    return NextResponse.json({
      success: true,
      data: output,
    });
  } catch (error: any) {
    console.error('API /api/photo/generate unhandled error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Terjadi kesalahan saat memproses prompt foto.',
      },
      { status: 500 }
    );
  }
}
