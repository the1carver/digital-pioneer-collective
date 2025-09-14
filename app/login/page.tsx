"use client"

import React from "react"
import { LoginForm } from "@/components/login-form"
import { AnimatedLogo } from "@/components/animated-logo"
import { ArrowLeft, Users, Zap, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  const handleLoginSuccess = (user: any) => {
    router.push('/dashboard')
  }

  const handleLoginError = (error: string) => {
    console.error('Login error:', error)
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
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Benefits */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <AnimatedLogo size={80} className="mx-auto lg:mx-0 mb-6" />
                <h1 className="text-4xl md:text-5xl font-bold font-sans mb-4">
                  Welcome Back, <span className="text-cyan-400">Pioneer</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Continue your journey in the decentralized marketing frontier. Your community is waiting.
                </p>
              </div>

              {/* Benefits Cards */}
              <div className="space-y-4">
                <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300">
                  <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                    <Users className="w-6 h-6 text-cyan-400 mr-3" />
                    <div>
                      <CardTitle className="text-lg">Community Access</CardTitle>
                      <CardDescription className="text-sm">
                        Connect with your fellow pioneers and collaborators
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300">
                  <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                    <Zap className="w-6 h-6 text-lime-400 mr-3" />
                    <div>
                      <CardTitle className="text-lg">Active Projects</CardTitle>
                      <CardDescription className="text-sm">
                        Continue working on your campaigns and collaborations
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300">
                  <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                    <Shield className="w-6 h-6 text-cyan-400 mr-3" />
                    <div>
                      <CardTitle className="text-lg">Token Rewards</CardTitle>
                      <CardDescription className="text-sm">
                        Track your earnings and community contributions
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <LoginForm 
                  onSuccess={handleLoginSuccess}
                  onError={handleLoginError}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}