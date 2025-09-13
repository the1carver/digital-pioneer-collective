"use client"

import React from "react"
import { WagmiProvider, http } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RainbowKitProvider, getDefaultConfig, darkTheme } from "@rainbow-me/rainbowkit"
import { polygon, base, mainnet } from "viem/chains"
import type { Chain } from "viem"

import '@rainbow-me/rainbowkit/styles.css'

const chains = [polygon, base, mainnet] as const satisfies readonly [Chain, ...Chain[]]

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo"

const wagmiConfig = getDefaultConfig({
  appName: 'Digital Pioneers',
  projectId,
  chains,
  transports: {
    [polygon.id]: http(),
    [base.id]: http(),
    [mainnet.id]: http(),
  },
})

const queryClient = new QueryClient()

export function WalletProvider({ children }: { children: React.ReactNode }) {
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


