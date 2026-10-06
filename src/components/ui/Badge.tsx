import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'blue' | 'neutral' | 'subtle';
  className?: string;
}

export function Badge({
  children,
  variant = 'green',
  className = '',
}: BadgeProps) {
  const variantStyles = {
    green: 'bg-[#D7F7E6] text-[#00875A] font-semibold',
    blue: 'bg-[#EBF5FF] text-[#1E40AF] font-semibold',
    neutral: 'bg-slate-100 text-slate-700 font-medium',
    subtle: 'bg-emerald-50/80 text-emerald-800 border border-emerald-100',
  };

  return (
    <span
      className={`inline-flex items-center text-[11px] tracking-wider uppercase px-3 py-1 rounded-full ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
