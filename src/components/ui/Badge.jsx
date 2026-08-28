import React from 'react';

export default function Badge({
  children,
  variant = 'default',
  size = 'sm',
  withDot = false,
  className = '',
}) {
  const variants = {
    Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Verified: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    High: 'bg-rose-50 text-rose-700 border-rose-200',
    Rejected: 'bg-rose-50 text-rose-700 border-rose-200',
    Critical: 'bg-rose-50 text-rose-700 border-rose-200',
    'In Progress': 'bg-blue-50 text-blue-700 border-blue-200',
    'Under Review': 'bg-indigo-50 text-indigo-700 border-indigo-200',
    Submitted: 'bg-sky-50 text-sky-700 border-sky-200',
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
    Upcoming: 'bg-amber-50 text-amber-700 border-amber-200',
    Information: 'bg-slate-100 text-slate-700 border-slate-200',
    default: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  const dotColors = {
    Completed: 'bg-emerald-500',
    Approved: 'bg-emerald-500',
    Verified: 'bg-emerald-500',
    Active: 'bg-emerald-500',
    High: 'bg-rose-500',
    Rejected: 'bg-rose-500',
    Critical: 'bg-rose-500',
    'In Progress': 'bg-blue-500',
    'Under Review': 'bg-indigo-500',
    Submitted: 'bg-sky-500',
    Pending: 'bg-amber-500',
    Upcoming: 'bg-amber-500',
    Information: 'bg-slate-400',
    default: 'bg-slate-400',
  };

  const sizes = {
    xs: 'px-2 py-0.5 text-[10px]',
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs sm:text-sm',
  };

  const currentVariant = variants[variant] || variants.default;
  const currentDotColor = dotColors[variant] || dotColors.default;

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full border ${currentVariant} ${sizes[size] || sizes.sm} ${className}`}
    >
      {withDot && (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${currentDotColor}`} />
      )}
      <span>{children}</span>
    </span>
  );
}
