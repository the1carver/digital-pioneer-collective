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

function makeWagmiConfig() {
  return getDefaultConfig({
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

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  })
}

let browserWagmiConfig: ReturnType<typeof makeWagmiConfig> | undefined
let browserQueryClient: QueryClient | undefined

function getWagmiConfig() {
  if (typeof window === "undefined") {
    return makeWagmiConfig()
  }
  if (!browserWagmiConfig) {
    browserWagmiConfig = makeWagmiConfig()
  }
  return browserWagmiConfig
}

function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient()
  }
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient()
  }
  return browserQueryClient
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [wagmiConfig] = useState(() => getWagmiConfig())
  const [queryClient] = useState(() => getQueryClient())

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


