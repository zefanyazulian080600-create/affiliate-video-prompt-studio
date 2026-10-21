import React from 'react';
import { Metadata } from 'next';
import { PhotoGeneratorForm } from '@/components/photo/PhotoGeneratorForm';

export const metadata: Metadata = {
  title: 'Master Prompt Photo Generator — AI Photography Studio',
  description:
    'Studio prompt engineering fotografi realistis dengan Face Lock & Body Lock konsisten, karakteristik kamera iPhone 13, dan teks Bahasa Indonesia naratif.',
};

export default function PhotoStudioPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <PhotoGeneratorForm />
    </div>
  );
}
