'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Video,
  Sparkles,
  FolderOpen,
  BookOpen,
  Settings,
  HelpCircle,
  Menu,
  X,
  Zap,
  Flame,
} from 'lucide-react';
import { Badge } from './ui/Badge';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Video Studio', href: '/generator', icon: Sparkles },
    { label: 'Poster Monyet 🐵', href: '/poster', icon: Flame, badge: 'Viral' },
    { label: 'Proyek Saya', href: '/projects', icon: FolderOpen },
    { label: 'Prompt Library', href: '/library', icon: BookOpen },
    { label: 'Bantuan', href: '/help', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-50 bg-studio-bg/90 backdrop-blur-md border-b border-studio-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-blue-500 flex items-center justify-center shadow-lg shadow-violet-900/40 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-base md:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-violet-300 bg-clip-text text-transparent">
                AFFILIATE VIDEO
              </span>
              <span className="block text-[10px] tracking-widest text-violet-400 font-semibold uppercase -mt-1">
                PROMPT STUDIO
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-violet-600/15 text-violet-300 border border-violet-500/30'
                      : 'text-studio-muted hover:text-studio-text hover:bg-studio-surface'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                  {item.badge && (
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-amber-400 text-black ml-0.5 tracking-tight">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Preset Engine Badge & CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Badge variant="blue" size="sm" className="hidden xl:inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse mr-1"></span>
              Seedance 2.5 & Omni Flash
            </Badge>

            <Link
              href="/generator"
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white shadow-md shadow-violet-900/30 transition-all active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Buat Video Baru
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-studio-surface border border-studio-border text-studio-muted hover:text-studio-text focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-studio-border bg-studio-surface/95 backdrop-blur-xl px-4 pt-2 pb-5 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-violet-600/20 text-violet-300 border border-violet-500/40'
                    : 'text-studio-muted hover:text-studio-text hover:bg-studio-card'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-amber-400 text-black tracking-tight">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              href="/generator"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-medium text-sm shadow-lg shadow-violet-900/30"
            >
              <Sparkles className="w-4 h-4" />
              Mulai Buat Prompt
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
