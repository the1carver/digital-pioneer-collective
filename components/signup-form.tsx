"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MagneticButton } from "@/components/magnetic-button"
import { Loader2, Globe, AlertCircle, CheckCircle } from "lucide-react"
import { authService, SignUpData } from "@/lib/auth"

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  walletAddress: z.string().optional(),
  role: z.string().min(1, "Please select a role"),
  experience: z.string().optional(),
  interests: z.string().optional(),
  portfolio: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  motivation: z.string().min(20, "Please tell us more about your motivation (at least 20 characters)")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type SignUpFormData = z.infer<typeof signUpSchema>

interface SignupFormProps {
  onSuccess?: (user: any) => void
  onError?: (error: string) => void
}

export function SignupForm({ onSuccess, onError }: SignupFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema)
  })

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const signUpData: SignUpData = {
        email: data.email,
        password: data.password,
        name: data.name,
        walletAddress: data.walletAddress,
        role: data.role,
        experience: data.experience,
        interests: data.interests,
        portfolio: data.portfolio,
        motivation: data.motivation
      }

      const { user, error } = await authService.signUp(signUpData)

      if (error) {
        setError(error.message)
        onError?.(error.message)
        return
      }

      setSuccess(true)
      reset()
      onSuccess?.(user)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <div>
              <h3 className="text-xl font-semibold text-foreground">Welcome to Digital Pioneers!</h3>
              <p className="text-muted-foreground mt-2">
                We've sent you a confirmation email. Please check your inbox and click the link to verify your account.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-sans text-center">Join the Collective</CardTitle>
        <CardDescription className="text-center">
          Create your account and become a digital pioneer
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  {...register("name")}
                  className="mt-1 bg-background/50 border-border/50 focus:border-cyan-400"
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="mt-1 bg-background/50 border-border/50 focus:border-cyan-400"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="mt-1 bg-background/50 border-border/50 focus:border-cyan-400"
                  placeholder="At least 8 characters"
                />
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                  className="mt-1 bg-background/50 border-border/50 focus:border-cyan-400"
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="walletAddress">Wallet Address</Label>
                <Input
                  id="walletAddress"
                  {...register("walletAddress")}
                  className="mt-1 bg-background/50 border-border/50 focus:border-cyan-400"
                  placeholder="0x... (optional)"
                />
                {errors.walletAddress && (
                  <p className="text-sm text-red-500 mt-1">{errors.walletAddress.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="role">Primary Role *</Label>
                <select
                  id="role"
                  {...register("role")}
                  className="mt-1 w-full px-3 py-2 bg-background/50 border border-border/50 rounded-md focus:border-cyan-400 focus:outline-none"
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
                {errors.role && (
                  <p className="text-sm text-red-500 mt-1">{errors.role.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="experience">Web3 Experience</Label>
                <select
                  id="experience"
                  {...register("experience")}
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
                <Label htmlFor="interests">Areas of Interest</Label>
                <Input
                  id="interests"
                  {...register("interests")}
                  className="mt-1 bg-background/50 border-border/50 focus:border-cyan-400"
                  placeholder="NFTs, DeFi, Gaming, etc."
                />
              </div>

              <div>
                <Label htmlFor="portfolio">Portfolio/Website</Label>
                <Input
                  id="portfolio"
                  type="url"
                  {...register("portfolio")}
                  className="mt-1 bg-background/50 border-border/50 focus:border-cyan-400"
                  placeholder="https://your-portfolio.com"
                />
                {errors.portfolio && (
                  <p className="text-sm text-red-500 mt-1">{errors.portfolio.message}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="motivation">Why do you want to join Digital Pioneers Collective? *</Label>
            <Textarea
              id="motivation"
              {...register("motivation")}
              className="mt-1 bg-background/50 border-border/50 focus:border-cyan-400 min-h-[120px]"
              placeholder="Tell us about your goals, what you hope to contribute, and how you align with our mission..."
            />
            {errors.motivation && (
              <p className="text-sm text-red-500 mt-1">{errors.motivation.message}</p>
            )}
          </div>

          <div className="flex justify-center pt-6">
            <MagneticButton
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-lime-400 text-black font-semibold rounded-lg hover:from-cyan-400 hover:to-lime-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <Globe className="w-5 h-5 mr-2" />
                  Join the Collective
                </>
              )}
            </MagneticButton>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}