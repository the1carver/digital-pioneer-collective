"use client"

import React from 'react'

// Only show in development and only check public vars
const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID',
]

export function EnvBanner() {
  if (process.env.NODE_ENV === 'production') {
    return null
  }
  const missing = requiredVars.filter((k) => !process.env[k as keyof NodeJS.ProcessEnv])
  if (missing.length === 0) {
    return null
  }
  return (
    <div className="w-full bg-yellow-500/10 border-b border-yellow-500/30 text-yellow-200 text-xs px-3 py-2">
      Missing env vars: {missing.join(', ')} (dev only)
    </div>
  )
}


