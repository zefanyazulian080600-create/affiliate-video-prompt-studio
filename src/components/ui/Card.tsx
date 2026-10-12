import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverEffect = false,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'bg-studio-surface border border-studio-border rounded-2xl p-5 md:p-6 transition-all duration-200',
          hoverEffect && 'hover:border-studio-borderHover hover:shadow-xl hover:shadow-violet-950/20',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};
