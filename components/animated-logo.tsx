"use client"

import { useState } from "react"
import Image from "next/image"

interface AnimatedLogoProps {
  className?: string
  size?: number
}

export function AnimatedLogo({ className = "", size = 40 }: AnimatedLogoProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative logo-pulse overflow-hidden">
        <Image
          src="/images/crypto-shield-logo.png"
          alt="Digital Pioneer Collective"
          width={size}
          height={size}
          className="relative z-10 transition-all duration-300"
        />

        <div className="absolute inset-0 z-20 shimmer-overlay pointer-events-none" />
      </div>

      <style jsx>{`
        .logo-pulse {
          animation: gentlePulse 4s ease-in-out infinite;
        }
        
        .shimmer-overlay {
          background: linear-gradient(
            90deg,
            transparent 0%,
            transparent 40%,
            rgba(50, 205, 50, 0.6) 50%,
            transparent 60%,
            transparent 100%
          );
          animation: shimmerSweep 4s ease-in-out infinite;
          transform: translateX(-100%);
        }
        
        @keyframes gentlePulse {
          0%, 100% { 
            transform: scale(1); 
          }
          50% { 
            transform: scale(1.03); 
          }
        }
        
        @keyframes shimmerSweep {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
