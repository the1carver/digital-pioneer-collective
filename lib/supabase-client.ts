"use client"

import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

let supabaseInstance: SupabaseClient | null = null

// Only create supabase client on client side
export function getSupabaseClient(): SupabaseClient {
  if (typeof window === 'undefined') {
    throw new Error('Supabase client is only available on the client side')
  }

  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
    const supabaseAnonKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
      'placeholder-anon-key'

    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  }

  return supabaseInstance
}

export const supabase: SupabaseClient = getSupabaseClient()