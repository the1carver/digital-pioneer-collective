"use client"

import React from 'react'

export function EnvBanner() {
  if (process.env.NODE_ENV === 'production') {
    return null
  }
  // NOTE: Next.js only inlines NEXT_PUBLIC_* vars on the client when they are
  // referenced statically. Dynamic access (process.env[key]) is NOT inlined and
  // would always read as undefined in the browser, producing false positives.
  const missing = [
    ['NEXT_PUBLIC_SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL],
    ['NEXT_PUBLIC_SUPABASE_ANON_KEY', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY],
    ['NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID', process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID],
  ]
    .filter(([, value]) => !value)
    .map(([key]) => key)

  if (missing.length === 0) {
    return null
  }
  return (
    <div className="w-full bg-yellow-500/10 border-b border-yellow-500/30 text-yellow-200 text-xs px-3 py-2">
      Missing env vars: {missing.join(', ')} (dev only)
    </div>
  )
}


