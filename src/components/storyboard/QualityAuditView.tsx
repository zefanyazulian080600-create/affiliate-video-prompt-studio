'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';
import { QualityAuditReport } from '@/types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface QualityAuditViewProps {
  report: QualityAuditReport;
}

export const QualityAuditView: React.FC<QualityAuditViewProps> = ({ report }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400';
    if (score >= 70) return 'text-amber-400';
    return 'text-rose-400';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return <Badge variant="emerald">Sangat Baik ({score}/100)</Badge>;
    if (score >= 70) return <Badge variant="amber">Cukup Baik ({score}/100)</Badge>;
    return <Badge variant="rose">Perlu Perhatian ({score}/100)</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header with Overall Score Gauge */}
      <div className="bg-gradient-to-r from-violet-950/40 via-studio-surface to-blue-950/40 border border-studio-border rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-violet-400" />
            <h3 className="text-xl font-bold text-studio-text">
              Hasil Audit Kontrol Kualitas Internal
            </h3>
          </div>
          <p className="text-xs text-studio-muted mt-1 max-w-xl">
            Skor dihitung secara objektif berdasarkan verifikasi teknis durasi, kelengkapan continuity handoff, penguncian identitas karakter, dan kepatuhan batasan klaim pemasaran Shopee.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-studio-card/80 border border-studio-border px-5 py-4 rounded-xl">
          <div className="text-center">
            <span className="block text-[11px] text-studio-muted uppercase tracking-wider font-semibold">
              Skor Keseluruhan
            </span>
            <div className={`text-4xl font-extrabold tracking-tight ${getScoreColor(report.overallScore)}`}>
              {report.overallScore}
              <span className="text-base text-studio-muted font-normal">/100</span>
            </div>
          </div>
          <div>{getScoreBadge(report.overallScore)}</div>
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(report.categories).map(([key, cat]) => (
          <Card key={key} className="bg-studio-surface/90 border-studio-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-studio-text">{cat.name}</span>
              <span className={`text-sm font-bold ${getScoreColor(cat.score)}`}>
                {cat.score}%
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-1.5 rounded-full bg-studio-bg overflow-hidden mb-2">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  cat.score >= 90
                    ? 'bg-emerald-500'
                    : cat.score >= 70
                    ? 'bg-amber-500'
                    : 'bg-rose-500'
                }`}
                style={{ width: `${cat.score}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-studio-muted leading-relaxed">{cat.details}</p>
          </Card>
        ))}
      </div>

      {/* Warnings & Suggested Fixes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Warnings */}
        <div className="p-5 rounded-2xl bg-studio-surface border border-studio-border">
          <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            Peringatan & Potensi Masalah ({report.warnings.length})
          </h4>
          {report.warnings.length === 0 ? (
            <div className="flex items-center gap-2 text-xs text-emerald-400 py-3">
              <CheckCircle2 className="w-4 h-4" />
              Tidak ada inkonsistensi yang terdeteksi. Video siap digenerate!
            </div>
          ) : (
            <ul className="space-y-2 text-xs text-slate-300">
              {report.warnings.map((w, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Suggested Fixes */}
        <div className="p-5 rounded-2xl bg-studio-surface border border-studio-border">
          <h4 className="text-sm font-bold text-blue-300 flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-blue-400" />
            Saran Perbaikan & Rekomendasi ({report.suggestedFixes.length})
          </h4>
          {report.suggestedFixes.length === 0 ? (
            <p className="text-xs text-studio-muted">Semua kriteria sudah optimal.</p>
          ) : (
            <ul className="space-y-2 text-xs text-slate-300">
              {report.suggestedFixes.map((f, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">➔</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
