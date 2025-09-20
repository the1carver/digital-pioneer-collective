import type React from "react"
import type { Metadata } from "next"
import { Poppins, Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"
import { WalletProvider } from "@/components/wallet-provider"
import { WalletConnectNote } from "@/components/wallet-connect-note"
import { EnvBanner } from "@/components/env-banner"

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Digital Pioneers Collective - Marketing Belongs to the Makers",
  description:
    "A community-owned marketing hub where creators, brands, and fans build together using AI and Web3 to share ownership, profits, and success.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} dark`}>
      <body className="antialiased">
        <EnvBanner />
        <WalletProvider>
          <AuthProvider>
            <WalletConnectNote />
            {children}
          </AuthProvider>
        </WalletProvider>
      </body>
    </html>
  )
}
