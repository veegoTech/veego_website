import React from 'react';

interface WaveDividerProps {
  fillColor?: string;
  type?: 'curve-down' | 'curve-up' | 'footer' | string;
  flipX?: boolean;
  className?: string;
  variant?: string;
  secondaryColor?: string;
  heightClass?: string;
}

export const WaveDivider: React.FC<WaveDividerProps> = ({
  fillColor,
  type,
  className = ''
}) => {
  // If transitioning to dark footer:
  if (fillColor === '#0f172a' || fillColor?.includes('slate-900') || type === 'footer') {
    return (
      <div className={`w-full h-10 sm:h-12 bg-gradient-to-b from-transparent to-[#0f172a] ${className}`} aria-hidden="true" />
    );
  }

  return (
    <div className={`relative w-full flex items-center justify-center my-0 py-0 select-none pointer-events-none z-10 ${className}`} aria-hidden="true">
      {/* Full-width crisp boundary line with subtle gradient */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

      {/* Centered Feel-Good Wave Accent Pill */}
      <div className="absolute flex items-center justify-center">
        <div className="px-3.5 py-1 rounded-full bg-white border border-slate-200/90 shadow-xs flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500/80" />
          {/* Elegant miniature wave ribbon */}
          <svg
            className="w-5 h-2.5 text-blue-600"
            viewBox="0 0 20 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 5 Q 5.5 0, 10 5 T 19 5" />
          </svg>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/80" />
        </div>
      </div>
    </div>
  );
};
