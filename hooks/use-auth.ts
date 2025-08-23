"use client"

import { useEffect, useState } from 'react'
import { User, AuthError } from '@supabase/supabase-js'
import { authService } from '@/lib/auth'
import { useRouter } from 'next/navigation'

interface UseAuthReturn {
  user: User | null
  loading: boolean
  signUp: typeof authService.signUp
  signIn: typeof authService.signIn
  signOut: () => Promise<void>
  isAuthenticated: boolean
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    let mounted = true

    // Get initial session
    const getInitialUser = async () => {
      try {
        const { user: initialUser } = await authService.getCurrentUser()
        if (mounted) {
          setUser(initialUser)
          setLoading(false)
        }
      } catch (error) {
        console.error('Error getting initial user:', error)
        if (mounted) {
          setLoading(false)
        }
      }
    }

    getInitialUser()

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange((user) => {
      if (mounted) {
        setUser(user)
        setLoading(false)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    try {
      setLoading(true)
      await authService.signOut()
      setUser(null)
      router.push('/')
    } catch (error) {
      console.error('Sign out error:', error)
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    loading,
    signUp: authService.signUp,
    signIn: authService.signIn,
    signOut,
    isAuthenticated: !!user
  }
}