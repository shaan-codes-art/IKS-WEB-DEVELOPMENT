import React from "react";

export default function PaniniLogo({ size = 96 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className="drop-shadow-[0_0_12px_rgba(179,134,34,0.35)]"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="bg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#2D6A4D" />
          <stop offset="100%" stopColor="#0F2D1F" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="url(#bg)" />
      <circle cx="60" cy="60" r="56" fill="none" stroke="#D4AF37" strokeWidth="3" />
      <circle cx="60" cy="60" r="50" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.6" />
      <text x="60" y="62" textAnchor="middle" dominantBaseline="middle" fontSize="46" fontFamily="serif" fill="#FAF7F2">
        प
      </text>
      <path d="M35 82 Q60 70 85 82" fill="none" stroke="#FAF7F2" strokeWidth="2" opacity="0.7" />
      {/* circuit lines */}
      <g stroke="#D4AF37" strokeWidth="1.2" fill="none" opacity="0.9">
        <path d="M95 45 h8 v8" />
        <circle cx="103" cy="53" r="1.5" fill="#D4AF37" />
        <path d="M95 75 h8 v-8" />
        <circle cx="103" cy="67" r="1.5" fill="#D4AF37" />
      </g>
      {/* leaf ornament */}
      <g transform="translate(18,48)" fill="#D4AF37" opacity="0.9">
        <path d="M0 0 C6 -6 12 0 6 8 C0 14 -6 8 0 0 Z" />
      </g>
    </svg>
  );
}
