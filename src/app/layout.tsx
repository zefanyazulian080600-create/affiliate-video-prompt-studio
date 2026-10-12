import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Affiliate Video Prompt Studio — Studio Prompt Video & Continuity Engine',
  description:
    'Alat kerja profesional affiliate Shopee Indonesia untuk menghasilkan prompt video sinematik dengan continuity terkunci untuk Seedance 2.5 dan Omni Flash.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body className="bg-studio-bg text-studio-text min-h-screen flex flex-col font-sans antialiased selection:bg-violet-600 selection:text-white">
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          {children}
        </main>
        <footer className="border-t border-studio-border bg-studio-surface/50 py-6 text-center text-xs text-studio-muted">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="font-semibold text-studio-text">Affiliate Video Prompt Studio</span>{' '}
              — Dirancang untuk Kreator Shopee Indonesia
            </div>
            <div className="flex items-center gap-4">
              <span>Preset: Seedance 2.5 & Omni Flash</span>
              <span>•</span>
              <span>Continuity Lock System</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
