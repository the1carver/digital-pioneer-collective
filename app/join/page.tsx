"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MagneticButton } from "@/components/magnetic-button"
import { AnimatedLogo } from "@/components/animated-logo"
import { ArrowLeft, Users, Zap, Shield, Globe } from "lucide-react"
import Link from "next/link"

export default function JoinPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    walletAddress: "",
    role: "",
    experience: "",
    interests: "",
    portfolio: "",
    motivation: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submitted:", formData)
    // Handle form submission here
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

          {/* Join Form */}
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-sans text-center">Application Form</CardTitle>
              <CardDescription className="text-center">
                Tell us about yourself and how you'd like to contribute to the collective
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1 bg-background/50 border-border/50 focus:border-cyan-400"
                        placeholder="Your full name"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1 bg-background/50 border-border/50 focus:border-cyan-400"
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="walletAddress" className="text-sm font-medium">
                        Wallet Address
                      </Label>
                      <Input
                        id="walletAddress"
                        name="walletAddress"
                        value={formData.walletAddress}
                        onChange={handleInputChange}
                        className="mt-1 bg-background/50 border-border/50 focus:border-cyan-400"
                        placeholder="0x... (optional)"
                      />
                    </div>

                    <div>
                      <Label htmlFor="role" className="text-sm font-medium">
                        Primary Role *
                      </Label>
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-3 py-2 bg-background/50 border border-border/50 rounded-md focus:border-cyan-400 focus:outline-none"
                        required
                      >
                        <option value="">Select your role</option>
                        <option value="creator">Content Creator</option>
                        <option value="artist">Digital Artist</option>
                        <option value="brand">Brand/Business</option>
                        <option value="developer">Developer</option>
                        <option value="marketer">Marketer</option>
                        <option value="investor">Investor</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="experience" className="text-sm font-medium">
                        Web3 Experience
                      </Label>
                      <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-3 py-2 bg-background/50 border border-border/50 rounded-md focus:border-cyan-400 focus:outline-none"
                      >
                        <option value="">Select experience level</option>
                        <option value="beginner">Beginner (0-1 years)</option>
                        <option value="intermediate">Intermediate (1-3 years)</option>
                        <option value="advanced">Advanced (3+ years)</option>
                        <option value="expert">Expert (5+ years)</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="interests" className="text-sm font-medium">
                        Areas of Interest
                      </Label>
                      <Input
                        id="interests"
                        name="interests"
                        value={formData.interests}
                        onChange={handleInputChange}
                        className="mt-1 bg-background/50 border-border/50 focus:border-cyan-400"
                        placeholder="NFTs, DeFi, Gaming, etc."
                      />
                    </div>

                    <div>
                      <Label htmlFor="portfolio" className="text-sm font-medium">
                        Portfolio/Website
                      </Label>
                      <Input
                        id="portfolio"
                        name="portfolio"
                        type="url"
                        value={formData.portfolio}
                        onChange={handleInputChange}
                        className="mt-1 bg-background/50 border-border/50 focus:border-cyan-400"
                        placeholder="https://your-portfolio.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Motivation */}
                <div>
                  <Label htmlFor="motivation" className="text-sm font-medium">
                    Why do you want to join Digital Pioneers Collective? *
                  </Label>
                  <Textarea
                    id="motivation"
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    className="mt-1 bg-background/50 border-border/50 focus:border-cyan-400 min-h-[120px]"
                    placeholder="Tell us about your goals, what you hope to contribute, and how you align with our mission..."
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <MagneticButton
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-lime-400 text-black font-semibold rounded-lg hover:from-cyan-400 hover:to-lime-300 transition-all duration-300"
                  >
                    <Globe className="w-5 h-5 mr-2" />
                    Join the Collective
                  </MagneticButton>
                </div>
              </form>
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
