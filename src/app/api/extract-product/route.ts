import { NextRequest, NextResponse } from 'next/server';
import { extractProductFromUrl } from '@/lib/poster-engine/url-extractor';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url || typeof url !== 'string' || url.trim().length < 5) {
      return NextResponse.json(
        {
          success: false,
          error: 'URL produk tidak valid. Masukkan tautan lengkap (misal: https://shopee.co.id/...).',
        },
        { status: 400 }
      );
    }

    const data = await extractProductFromUrl(url);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error('Error in /api/extract-product:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Gagal mengekstrak data dari URL produk.',
      },
      { status: 500 }
    );
  }
}
