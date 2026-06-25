import React from 'react';

// 共通DNA: ネイビータイル #0b1f3a + モノグラム(D/T) + スワイプ ">"
// gradient id "dcMaster" は GradientDefs を一度だけ描画すれば document 全体で参照可能。

export function GradientDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
      <defs>
        <linearGradient id="dcMaster" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7fe3ff" />
          <stop offset=".5" stopColor="#22b8e6" />
          <stop offset="1" stopColor="#1f8fd0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

type LogoProps = {
  size?: number;
  /** "D" or "T" monogram */
  mono?: 'D' | 'T';
  /** stroke color; use "url(#dcMaster)" for the master cyan gradient */
  stroke?: string;
  /** tile fill */
  tile?: string;
  /** add subtle tile border (used for large/footer marks) */
  bordered?: boolean;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
};

export function Logo({
  size = 34,
  mono = 'D',
  stroke = 'url(#dcMaster)',
  tile = '#0b1f3a',
  bordered = false,
  strokeWidth = 2.7,
  className,
  style,
}: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      style={{ display: 'block', ...style }}
      className={className}
      aria-hidden
    >
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="11"
        fill={tile}
        stroke={bordered ? '#1c3252' : 'none'}
        strokeWidth={bordered ? 0.6 : 0}
      />
      {mono === 'T' ? (
        <path
          d="M9 13.5h13M15.5 13.5V27"
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M11 13h6c4 0 7 2.8 7 7s-3 7-7 7h-6z"
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      )}
      <path
        d="M25 20l6-5m-6 5l6 5"
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
