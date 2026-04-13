"use client"

import React, { useState } from "react"
import { WagmiProvider, http } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RainbowKitProvider, getDefaultConfig, darkTheme } from "@rainbow-me/rainbowkit"
import { polygon, base, mainnet } from "viem/chains"
import type { Chain } from "viem"

import '@rainbow-me/rainbowkit/styles.css'

const chains = [polygon, base, mainnet] as const satisfies readonly [Chain, ...Chain[]]

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo"

// Create config once at module level but with a getter to prevent re-init issues
let wagmiConfigInstance: ReturnType<typeof getDefaultConfig> | null = null

function getWagmiConfig() {
  if (!wagmiConfigInstance) {
    wagmiConfigInstance = getDefaultConfig({
      appName: 'Digital Pioneers',
      projectId,
      chains,
      transports: {
        [polygon.id]: http(),
        [base.id]: http(),
        [mainnet.id]: http(),
      },
    })
  }
  return wagmiConfigInstance
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  // Use useState with initializer to ensure single instance per component lifecycle
  const [queryClient] = useState(() => new QueryClient())
  const [wagmiConfig] = useState(() => getWagmiConfig())

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}


