'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Search,
  Sparkles,
} from 'lucide-react';
import { LIBRARY_TEMPLATES } from '@/lib/prompt-library-data';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

export default function LibraryPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'all',
    'Fashion & Alas Kaki',
    'Kecantikan & Skincare',
    'Gadget & Elektronik',
    'Tas & Aksesori',
    'Perlengkapan Rumah',
    'Makanan & Minuman',
  ];

  const filtered = LIBRARY_TEMPLATES.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));

    const matchesCat =
      selectedCategory === 'all' || item.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-studio-border">
        <h1 className="text-2xl font-bold text-studio-text flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-violet-400" />
          Prompt Library — Shopee Affiliate Indonesia
        </h1>
        <p className="text-xs text-studio-muted mt-1 max-w-2xl">
          Koleksi template prompt terverifikasi dengan struktur direct-response marketing dan format video berkonversi tinggi. Klik pada template untuk langsung menggunakannya di generator.
        </p>
      </div>

      {/* Search & Category Tabs */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-studio-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari template berdasarkan produk, kata kunci, atau format..."
            className="w-full bg-studio-surface border border-studio-border rounded-xl pl-10 pr-4 py-2 text-xs text-studio-text placeholder-studio-muted focus:outline-none focus:ring-1 focus:ring-violet-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-violet-600 text-white'
                  : 'bg-studio-surface border border-studio-border text-studio-muted hover:text-studio-text'
              }`}
            >
              {cat === 'all' ? 'Semua Kategori' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(template => (
          <Card
            key={template.id}
            className="flex flex-col justify-between bg-studio-surface/90 border-studio-border hover:border-violet-500/50 hover:shadow-xl transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <Badge variant="violet" size="sm">
                  {template.category}
                </Badge>
                <Badge variant="blue" size="sm">
                  {template.targetModel.toUpperCase()} ({template.presetSceneDuration}s/scene)
                </Badge>
              </div>

              <h3 className="font-bold text-base text-studio-text mt-1">
                {template.title}
              </h3>

              <div className="text-xs text-violet-300 font-medium mt-1">
                Format: {template.format}
              </div>

              <p className="text-xs text-studio-muted mt-2 leading-relaxed">
                {template.description}
              </p>

              {/* Sample Product Input Snippet */}
              <div className="mt-3 p-2.5 rounded-xl bg-studio-bg border border-studio-border/60 text-[11px] text-slate-300 italic line-clamp-3">
                &ldquo;{template.sampleInput}&rdquo;
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5 mt-3">
                {template.tags.map(t => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md bg-studio-card text-[10px] text-studio-muted border border-studio-border"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Load Button */}
            <div className="pt-4 mt-4 border-t border-studio-border">
              <Link href={`/generator?templateId=${template.id}`}>
                <Button variant="primary" size="sm" className="w-full text-xs">
                  <Sparkles className="w-3.5 h-3.5 mr-1" />
                  Gunakan Template Ini
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
