"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MagneticButton } from "@/components/magnetic-button"
import { Loader2, LogIn, AlertCircle } from "lucide-react"
import { authService, SignInData } from "@/lib/auth"
import Link from "next/link"

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required")
})

type SignInFormData = z.infer<typeof signInSchema>

interface LoginFormProps {
  onSuccess?: (user: any) => void
  onError?: (error: string) => void
}

export function LoginForm({ onSuccess, onError }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema)
  })

  const onSubmit = async (data: SignInFormData) => {
    try {
      setIsLoading(true)
      setError(null)
      
      console.log('Login attempt:', data.email)
      
      const signInData: SignInData = {
        email: data.email,
        password: data.password
      }

      const { user, error } = await authService.signIn(signInData)
      
      console.log('Login result:', { user: !!user, error: error?.message })

      if (error) {
        console.error('Login error:', error)
        setError(error.message)
        onError?.(error.message)
        return
      }

      if (user) {
        console.log('Login successful, calling onSuccess')
        onSuccess?.(user)
      } else {
        console.warn('No user returned from signIn')
        setError('Login failed - no user returned')
      }
    } catch (err) {
      console.error('Login exception:', err)
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-sans text-center">Welcome Back</CardTitle>
        <CardDescription className="text-center">
          Sign in to your Digital Pioneers account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div>
            <Label htmlFor="email">Email Address</Label>
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
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              className="mt-1 bg-background/50 border-border/50 focus:border-cyan-400"
              placeholder="Your password"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="flex justify-center pt-4">
            <MagneticButton
              type="submit"
              disabled={isLoading}
              className="w-full px-8 py-3 bg-gradient-to-r from-cyan-500 to-lime-400 text-black font-semibold rounded-lg hover:from-cyan-400 hover:to-lime-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In
                </>
              )}
            </MagneticButton>
          </div>

          <div className="text-center pt-4">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link 
                href="/join" 
                className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
              >
                Join the collective
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}