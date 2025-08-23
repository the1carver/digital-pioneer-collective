"use client"

export const dynamic = 'force-dynamic'

import React from "react"
import { AIChat } from "@/components/ai-chat"
import { AnimatedLogo } from "@/components/animated-logo"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"

export default function ChatPage() {
  const { signOut } = useAuth()

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated mesh gradient background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-background to-lime-400/20 animate-gradient-shift" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6 border-b border-border/50">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-foreground hover:text-cyan-400 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Dashboard</span>
          </Link>
          <AnimatedLogo size={40} />
          <h1 className="text-xl font-bold">AI Assistant</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <AIChat className="h-auto" />
        </div>
      </div>
    </div>
  )
}