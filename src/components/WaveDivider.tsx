import React from 'react';

interface WaveDividerProps {
  /** The color of the section immediately following the wave */
  toColor?: string;
  /** The color of the section immediately preceding the wave */
  fromColor?: string;
  /** Backward compatibility with legacy fillColor */
  fillColor?: string;
  /** Variation: curve-1, curve-2, or footer */
  type?: 'curve-1' | 'curve-2' | 'curve-down' | 'curve-up' | 'footer' | string;
  flipX?: boolean;
  className?: string;
  variant?: string;
  secondaryColor?: string;
  heightClass?: string;
}

export const WaveDivider: React.FC<WaveDividerProps> = ({
  toColor,
  fromColor,
  fillColor,
  type = 'curve-1',
  className = '',
  heightClass
}) => {
  const targetColor = toColor || fillColor || '#f1f5f9';
  const sourceColor = fromColor || 'transparent';

  // Dark footer transition
  if (targetColor === '#0f172a' || targetColor.includes('slate-900') || type === 'footer') {
    return (
      <div
        className={`relative w-full overflow-hidden leading-none select-none pointer-events-none -my-px ${className}`}
        style={{ backgroundColor: sourceColor }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full ${heightClass || 'h-10 sm:h-14 lg:h-16'} block`}
          preserveAspectRatio="none"
        >
          <path
            d="M0,24 C360,56 720,10 1080,46 C1260,60 1380,26 1440,32 L1440,60 L0,60 Z"
            fill="rgba(30, 41, 59, 0.45)"
          />
          <path
            d="M0,34 C320,12 680,54 1040,22 C1240,8 1360,40 1440,30 L1440,60 L0,60 Z"
            fill="#0f172a"
          />
        </svg>
      </div>
    );
  }

  // Curve 2 (Alternating flowing crest)
  if (type === 'curve-2' || type === 'curve-up') {
    return (
      <div
        className={`relative w-full overflow-hidden leading-none select-none pointer-events-none -my-px ${className}`}
        style={{ backgroundColor: sourceColor }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full ${heightClass || 'h-8 sm:h-11 lg:h-12'} block`}
          preserveAspectRatio="none"
        >
          {/* Ambient blue sheen accent ribbon */}
          <path
            d="M0,26 C360,6 720,46 1080,20 C1280,8 1380,38 1440,30 L1440,50 L0,50 Z"
            fill="rgba(59, 130, 246, 0.08)"
          />
          {/* Main seamless transition wave */}
          <path
            d="M0,18 C280,42 600,12 920,38 C1180,52 1340,24 1440,28 L1440,50 L0,50 Z"
            fill={targetColor}
          />
          {/* Crisp structural contour line */}
          <path
            d="M0,18 C280,42 600,12 920,38 C1180,52 1340,24 1440,28"
            stroke="rgba(148, 163, 184, 0.35)"
            strokeWidth="1.2"
            fill="none"
          />
        </svg>
      </div>
    );
  }

  // Curve 1 (Default gentle flowing wave)
  return (
    <div
      className={`relative w-full overflow-hidden leading-none select-none pointer-events-none -my-px ${className}`}
      style={{ backgroundColor: sourceColor }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full ${heightClass || 'h-8 sm:h-11 lg:h-12'} block`}
        preserveAspectRatio="none"
      >
        {/* Ambient blue sheen accent ribbon */}
        <path
          d="M0,22 C280,44 560,8 840,34 C1120,54 1320,20 1440,26 L1440,50 L0,50 Z"
          fill="rgba(59, 130, 246, 0.08)"
        />
        {/* Main seamless transition wave */}
        <path
          d="M0,30 C320,10 640,46 960,18 C1200,6 1360,34 1440,24 L1440,50 L0,50 Z"
          fill={targetColor}
        />
        {/* Crisp structural contour line */}
        <path
          d="M0,30 C320,10 640,46 960,18 C1200,6 1360,34 1440,24"
          stroke="rgba(148, 163, 184, 0.35)"
          strokeWidth="1.2"
          fill="none"
        />
      </svg>
    </div>
  );
};
