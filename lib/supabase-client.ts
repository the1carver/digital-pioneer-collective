"use client"

import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

let supabaseInstance: SupabaseClient | null = null

// Only create supabase client on client side
export function getSupabaseClient(): SupabaseClient | null {
  if (typeof window === 'undefined') {
    // Server-side: return null to avoid SSR errors
    return null
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

// Export a client on the client, a harmless placeholder on the server
export const supabase = (typeof window !== 'undefined'
  ? getSupabaseClient()
  : null) as unknown as SupabaseClient