import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'violet' | 'blue' | 'emerald' | 'amber' | 'rose' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'violet',
  size = 'sm',
  className,
}) => {
  const variants = {
    violet: 'bg-violet-950/60 border border-violet-500/30 text-violet-300',
    blue: 'bg-blue-950/60 border border-blue-500/30 text-blue-300',
    emerald: 'bg-emerald-950/60 border border-emerald-500/30 text-emerald-300',
    amber: 'bg-amber-950/60 border border-amber-500/30 text-amber-300',
    rose: 'bg-rose-950/60 border border-rose-500/30 text-rose-300',
    neutral: 'bg-studio-surface border border-studio-border text-studio-muted',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm font-medium',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1 rounded-full font-medium tracking-wide',
          variants[variant],
          sizes[size],
          className
        )
      )}
    >
      {children}
    </span>
  );
};
