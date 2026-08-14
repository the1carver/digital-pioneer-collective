"use client"

import React from "react"
import { WagmiProvider, http, createConfig, type Config } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {
  RainbowKitProvider,
  getDefaultConfig,
  connectorsForWallets,
  darkTheme,
} from "@rainbow-me/rainbowkit"
import {
  injectedWallet,
  coinbaseWallet,
} from "@rainbow-me/rainbowkit/wallets"
import { polygon, base, mainnet } from "viem/chains"
import type { Chain } from "viem"

import '@rainbow-me/rainbowkit/styles.css'

const appName = 'Digital Pioneers'

const chains = [polygon, base, mainnet] as const satisfies readonly [Chain, ...Chain[]]

const transports = {
  [polygon.id]: http(),
  [base.id]: http(),
  [mainnet.id]: http(),
}

// WalletConnect requires a real project id from https://cloud.reown.com.
// The placeholder "demo" is rejected (HTTP 403) and makes the WalletConnect
// connector re-initialize repeatedly and throw "wallet must has at least one
// account". Only enable WalletConnect when a genuine id is configured;
// otherwise fall back to injected + Coinbase wallets, which need no project id.
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
const hasValidProjectId = Boolean(projectId && projectId !== 'demo')

const wagmiConfig: Config = hasValidProjectId
  ? getDefaultConfig({
      appName,
      projectId: projectId as string,
      chains,
      ssr: true,
      transports,
    })
  : createConfig({
      chains,
      ssr: true,
      transports,
      connectors: connectorsForWallets(
        [
          {
            groupName: 'Recommended',
            wallets: [injectedWallet, coinbaseWallet],
          },
        ],
        { appName, projectId: '' },
      ),
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
