"use client"

import React from 'react'

const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID',
]

export function EnvBanner() {
  const missing = requiredVars.filter((k) => !process.env[k as keyof NodeJS.ProcessEnv])
  if (missing.length === 0) return null
  return (
    <div className="w-full bg-yellow-500/10 border-b border-yellow-500/30 text-yellow-200 text-xs px-3 py-2">
      Missing env vars: {missing.join(', ')} (dev only)
    </div>
  )
}


