"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AnimatedLogo } from "@/components/animated-logo"
import { Users, Zap, Shield, LogOut, Settings, Loader2, Bot } from "lucide-react"
import { MagneticButton } from "@/components/magnetic-button"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth()

  const handleLogout = async () => {
    await signOut()
  }

  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Pioneer'

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-cyan-400" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
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
          <AnimatedLogo size={40} />
          <h1 className="text-xl font-bold">Digital Pioneers Dashboard</h1>
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
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Welcome back, {userName}! 🚀</h2>
            <p className="text-muted-foreground text-lg">
              Ready to continue shaping the future of decentralized marketing?
            </p>
            {user?.user_metadata?.role && (
              <p className="text-sm text-cyan-400 mt-2">
                Role: {user.user_metadata.role.charAt(0).toUpperCase() + user.user_metadata.role.slice(1)}
              </p>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Community Score</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-cyan-400">85</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-lime-400">3</div>
                <p className="text-xs text-muted-foreground">
                  2 campaigns, 1 collaboration
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Token Balance</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-cyan-400">1,247</div>
                <p className="text-xs text-muted-foreground">
                  DPC tokens earned
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest contributions and interactions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Joined "Web3 Marketing Collective" project</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-lime-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Earned 50 DPC tokens for campaign completion</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Updated profile with new portfolio link</p>
                    <p className="text-xs text-muted-foreground">3 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Start something new or continue your work</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/chat">
                  <MagneticButton className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400">
                    <Bot className="w-4 h-4 mr-2" />
                    AI Assistant
                  </MagneticButton>
                </Link>
                <MagneticButton className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400">
                  <Users className="w-4 h-4 mr-2" />
                  Explore Projects
                </MagneticButton>
                <MagneticButton className="w-full bg-gradient-to-r from-lime-500 to-green-500 hover:from-lime-400 hover:to-green-400">
                  <Zap className="w-4 h-4 mr-2" />
                  Start Campaign
                </MagneticButton>
                <MagneticButton className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400">
                  <Shield className="w-4 h-4 mr-2" />
                  View Rewards
                </MagneticButton>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}