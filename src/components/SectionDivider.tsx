import React from "react";

export default function SectionDivider() {
  return (
    <div className="relative w-full select-none" aria-hidden>
      {/* Layer 1: Golden ornamental line with center mark */}
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative">
          <div className="h-[1px] sm:h-[2px] w-full bg-[linear-gradient(90deg,transparent,rgba(168,135,90,0.9)_20%,rgba(232,217,181,1)_50%,rgba(168,135,90,0.9)_80%,transparent)]" />
          {/* Center ornament (simple interlocking motif) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[color:var(--accent-bronze)]">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_0_4px_rgba(232,217,181,0.25)]"
            >
              {/* two interlocking rings */}
              <circle cx="12" cy="14" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="16" cy="14" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              {/* small diamond at center */}
              <path d="M14 10.8 L16.2 14 L14 17.2 L11.8 14 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
              {/* short horizontal ticks */}
              <path d="M2 14 H9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M19 14 H26" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Layer 2: Torn-edge seam below the line */}
      <div className="mt-3 h-8 w-full overflow-hidden">
        <svg
          viewBox="0 0 100 20"
          preserveAspectRatio="none"
          className="block h-full w-full text-[color:var(--bg-base)]/85"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Irregular torn silhouette: asymmetric, non-uniform */}
          <path
            d="M0,2 C5,4 8,1 12,3 C16,5 20,2 24,4 C28,6 32,3 36,5 C40,7 44,4 48,6 C52,8 56,4 60,6 C64,8 68,5 72,7 C76,9 80,6 84,8 C88,10 92,7 96,9 L100,12 L100,20 L0,20 Z"
            fill="currentColor"
            opacity="0.85"
          />
        </svg>
      </div>
    </div>
  );
}
