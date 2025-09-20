"use client"

import type React from "react"

import { useRef, type MouseEvent } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}

export function MagneticButton({
  children,
  className,
  variant = "default",
  size = "default",
  onClick,
  type = "button",
  disabled,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    const moveX = x * 0.1
    const moveY = y * 0.1

    buttonRef.current.style.setProperty("--mouse-x", `${moveX}px`)
    buttonRef.current.style.setProperty("--mouse-y", `${moveY}px`)
  }

  const handleMouseLeave = () => {
    if (!buttonRef.current) return
    buttonRef.current.style.setProperty("--mouse-x", "0px")
    buttonRef.current.style.setProperty("--mouse-y", "0px")
  }

  return (
    <Button
      ref={buttonRef}
      variant={variant}
      size={size}
      className={cn("magnetic-button", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </Button>
  )
}
