"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "@/components/magnetic-button"
import { AnimatedLogo } from "@/components/animated-logo"
import { ArrowRight, LogIn, User } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"

interface NavigationProps {
  className?: string
}

export function Navigation({ className }: NavigationProps) {
  const { user, loading } = useAuth()

  return (
    <nav className={`sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${className}`}>
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <AnimatedLogo size={32} />
          <span className="text-xl font-semibold">Digital Pioneers</span>
        </Link>
        
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          ) : user ? (
            <Link href="/dashboard">
              <Button variant="ghost" className="gap-2">
                <User className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
              <Link href="/join">
                <MagneticButton className="liquid-fill hover-glow-cyan">
                  Join the Collective
                  <ArrowRight className="ml-2 h-4 w-4" />
                </MagneticButton>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}