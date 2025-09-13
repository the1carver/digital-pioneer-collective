"use client"

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

interface SafeTx {
  safe: string
  to: string
  value: string
  data: string | null
  executedAt: string | null
  submissionDate: string
  transactionHash: string | null
}

async function fetchSafeTxs(safeAddress: string, chain: 'mainnet' | 'polygon' | 'base' = 'polygon') {
  const baseUrl = chain === 'mainnet'
    ? 'https://safe-transaction-mainnet.safe.global'
    : chain === 'base'
    ? 'https://safe-transaction-base.safe.global'
    : 'https://safe-transaction-polygon.safe.global'
  const url = `${baseUrl}/api/v1/safes/${safeAddress}/multisig-transactions/?limit=10&ordering=-submissionDate`
  const res = await fetch(url)
  if (!res.ok) {
    return [] as SafeTx[]
  }
  const json = await res.json()
  return (json?.results ?? []) as SafeTx[]
}

export function SafeWidget({ safeAddress, chain = 'polygon' }: { safeAddress: string, chain?: 'mainnet' | 'polygon' | 'base' }) {
  const [txs, setTxs] = useState<SafeTx[]>([])

  useEffect(() => {
    const load = async () => {
      if (!safeAddress) {
        return
      }
      const data = await fetchSafeTxs(safeAddress, chain)
      setTxs(data)
    }
    load()
  }, [safeAddress, chain])

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Community Treasury</CardTitle>
        <CardDescription>Read-only recent Safe transactions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {txs.map((t, i) => (
          <div key={i} className="border-b border-border/50 pb-2">
            <div className="text-xs text-muted-foreground">{new Date(t.submissionDate).toLocaleString()}</div>
            <div className="truncate">To: {t.to}</div>
            <div>Value: {t.value}</div>
            {t.transactionHash && (
              <a
                className="text-cyan-400 text-xs"
                target="_blank"
                rel="noreferrer"
                href={`https://app.safe.global/transactions/tx?id=${t.transactionHash}`}
              >
                View in Safe
              </a>
            )}
          </div>
        ))}
        {txs.length === 0 && <div className="text-muted-foreground">No transactions found.</div>}
      </CardContent>
    </Card>
  )
}


