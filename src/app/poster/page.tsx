import React from 'react';
import { PosterGeneratorForm } from '@/components/poster/PosterGeneratorForm';

export const metadata = {
  title: 'Poster Generator — Logika Anak Bekasi | Affiliate Video Prompt Studio',
  description:
    'Generator Poster Outfit Affiliate Shopee: Foto outfit masuk, prompt poster katalog photorealistic monyet streetwear keluar.',
};

export default function PosterPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <PosterGeneratorForm />
    </div>
  );
}
