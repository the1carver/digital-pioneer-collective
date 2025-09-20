"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MagneticButton } from "@/components/magnetic-button"
import { AnimatedLogo } from "@/components/animated-logo"
import { ArrowLeft, Users, Zap, Shield, Globe } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SignupForm } from "@/components/signup-form"

export default function JoinPage() {
  const router = useRouter()
  const handleSignUpSuccess = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated mesh gradient background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-background to-lime-400/20 animate-gradient-shift" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6">
        <Link href="/" className="flex items-center gap-2 text-foreground hover:text-cyan-400 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Home</span>
        </Link>
        <AnimatedLogo size={40} />
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <AnimatedLogo size={80} className="mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold font-sans mb-4">
              Join the <span className="text-cyan-400">Digital Frontier</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Become a pioneer in the future of decentralized marketing. Connect with creators, brands, and innovators
              shaping the web3 landscape.
            </p>
          </div>

          {/* Benefits Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <Users className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <CardTitle className="text-lg">Community Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Connect with like-minded creators and brands in our exclusive community
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <Zap className="w-8 h-8 text-lime-400 mx-auto mb-2" />
                <CardTitle className="text-lg">Early Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Get first access to new features, tools, and opportunities
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <Shield className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <CardTitle className="text-lg">Token Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Earn tokens for your contributions and participation
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sign Up Form */}
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-sans text-center">Join the Collective</CardTitle>
              <CardDescription className="text-center">
                Create your account to become a Digital Pioneer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-2xl mx-auto">
                <SignupForm onSuccess={handleSignUpSuccess} />
              </div>
            </CardContent>
          </Card>

          {/* Footer Note */}
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Applications are reviewed within 48 hours. You'll receive an email with next steps.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
