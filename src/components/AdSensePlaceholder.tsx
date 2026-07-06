import React from 'react';

interface AdSensePlaceholderProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
  label?: string;
}

export default function AdSensePlaceholder({
  slot = 'default-slot',
  format = 'auto',
  className = '',
  label = 'Sponsored Advertisement'
}: AdSensePlaceholderProps) {
  return (
    <div 
      className={`relative mx-auto my-6 flex flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-4 transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-900 ${className}`}
      id={`adsense-${slot}`}
    >
      <span className="mb-2 font-mono text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500">
        {label}
      </span>
      
      {/* Visual wireframe representing the ad unit */}
      <div className="flex w-full items-center justify-center rounded-lg border border-slate-100 bg-white/80 py-8 text-center shadow-xs dark:border-slate-800 dark:bg-slate-950/80">
        <div className="space-y-1">
          <p className="font-sans text-xs font-medium text-slate-500 dark:text-slate-400">
            Google AdSense Unit ({format})
          </p>
          <p className="font-mono text-[9px] text-slate-400 dark:text-slate-500">
            Slot ID: ca-pub-XXXXXXXXXXXXXXXX / {slot}
          </p>
        </div>
      </div>
      
      <span className="absolute bottom-1 right-2 font-sans text-[8px] text-slate-300 dark:text-slate-600">
        AdSense Policy Compliant Zone
      </span>
    </div>
  );
}
