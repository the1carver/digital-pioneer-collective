import { supabase } from './supabase-client'
import type { User, AuthError } from '@supabase/supabase-js'

export interface AuthState {
  user: User | null
  loading: boolean
}

export interface SignUpData {
  email: string
  password: string
  name: string
  walletAddress?: string
  role: string
  experience?: string
  interests?: string
  portfolio?: string
  motivation: string
}

export interface SignInData {
  email: string
  password: string
}

export const authService = {
  async signUp({ email, password, name, walletAddress, role, experience, interests, portfolio, motivation }: SignUpData) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            wallet_address: walletAddress,
            role,
            experience,
            interests,
            portfolio,
            motivation
          }
        }
      })

      if (error) throw error

      return { user: data.user, error: null }
    } catch (error) {
      return { user: null, error: error as AuthError }
    }
  },

  async signIn({ email, password }: SignInData) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      return { user: data.user, error: null }
    } catch (error) {
      return { user: null, error: error as AuthError }
    }
  },

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error: error as AuthError }
    }
  },

  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error
      return { user, error: null }
    } catch (error) {
      return { user: null, error: error as AuthError }
    }
  },

  onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange((_event, session) => {
      callback(session?.user ?? null)
    })
  }
}