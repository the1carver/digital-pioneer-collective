"use client"

import { useId, useState } from "react"

interface AnimatedLogoProps {
  className?: string
  size?: number
}

export function AnimatedLogo({ className = "", size = 40 }: AnimatedLogoProps) {
  const [isHovered, setIsHovered] = useState(false)
  const gradientId = useId()
  const glowId = useId()

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 256 256"
        width={size}
        height={size}
        className="relative z-10 drop-shadow-[0_0_12px_rgba(0,180,255,0.35)]"
        aria-label="Digital Pioneer Collective"
        role="img"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8">
              <animate attributeName="stop-color" values="#38bdf8;#22d3ee;#38bdf8" dur="6s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#2563eb">
              <animate attributeName="stop-color" values="#2563eb;#06b6d4;#2563eb" dur="6s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Shield base */}
        <path
          d="M128 12 L208 48 V120 C208 176 170 226 128 236 C86 226 48 176 48 120 V48 Z"
          fill="#0b1220"
          stroke="#94a3b8"
          strokeWidth="4"
          opacity="0.95"
        />

        {/* Inner shield with animated gradient */}
        <path
          d="M128 28 L192 58 V118 C192 166 160 206 128 214 C96 206 64 166 64 118 V58 Z"
          fill={`url(#${gradientId})`}
          stroke="#38bdf8"
          strokeWidth="3"
          filter={`url(#${glowId})`}
          className="inner-shield"
        />

        {/* Hex grid */}
        <g stroke="#0ea5e9" strokeWidth="3" fill="rgba(255,255,255,0.06)">
          <polygon points="128,74 144,83 144,101 128,110 112,101 112,83" />
          <polygon points="96,92 112,101 112,119 96,128 80,119 80,101" />
          <polygon points="160,92 176,101 176,119 160,128 144,119 144,101" />
          <polygon points="128,110 144,119 144,137 128,146 112,137 112,119" />
          <polygon points="96,128 112,137 112,155 96,164 80,155 80,137" />
          <polygon points="160,128 176,137 176,155 160,164 144,155 144,137" />
          <polygon points="128,146 144,155 144,173 128,182 112,173 112,155" />
        </g>

        {/* Circuit-like accents */}
        <g fill="none" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round">
          <path className="circuit" d="M72 92 C72 60, 100 52, 128 44" />
          <circle cx="86" cy="88" r="3" fill="#94a3b8" />
          <path className="circuit" d="M184 92 C184 60, 156 52, 128 44" />
          <circle cx="170" cy="88" r="3" fill="#94a3b8" />
        </g>

        {/* Shield outline animated stroke */}
        <path
          d="M128 12 L208 48 V120 C208 176 170 226 128 236 C86 226 48 176 48 120 V48 Z"
          fill="transparent"
          stroke="#38bdf8"
          strokeWidth="3"
          strokeDasharray="8 8"
          className="outline-animation"
        />
      </svg>

      <style jsx>{`
        .inner-shield { animation: subtlePulse 5s ease-in-out infinite; }
        .outline-animation { animation: dashMove 8s linear infinite; }
        .circuit { stroke-dasharray: 4 6; animation: dashMove 6s linear infinite; }

        @keyframes subtlePulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.25)); }
          50% { transform: scale(1.02); filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.55)); }
        }

        @keyframes dashMove {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 64; }
        }
      `}</style>
    </div>
  )
}
