"use client"

import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { supabase } from '@/lib/supabase-client'

export function WalletConnectNote() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <WalletConnectNoteInner />
}

function WalletConnectNoteInner() {
  const { address, isConnected } = useAccount()

  useEffect(() => {
    const run = async () => {
      if (!isConnected || !address) {
        return
      }
      // Store wallet address in user metadata (best-effort)
      try {
        const { error } = await supabase.auth.updateUser({
          data: { wallet_address: address }
        })
        if (error) {
          console.error('Failed to update user wallet address:', error)
        }
      } catch (err) {
        console.error('Unexpected error updating user wallet address:', err)
      }
    }
    run()
  }, [isConnected, address])

  return null
}


