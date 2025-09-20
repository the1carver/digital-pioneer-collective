"use client"

import React, { useEffect, useState } from 'react'
import { fetchSnapshotProposals, SnapshotProposal } from '@/lib/snapshot'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export function SnapshotProposals({ space }: { space: string }) {
  const [items, setItems] = useState<SnapshotProposal[]>([])

  useEffect(() => {
    const load = async () => {
      const data = await fetchSnapshotProposals(space, 'active')
      setItems(data)
    }
    load()
  }, [space])

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Active Snapshot Proposals</CardTitle>
        <CardDescription>Votes happen on Snapshot; connect wallet to participate</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        {items.map((p) => (
          <div key={p.id} className="border-b border-border/50 pb-3">
            <div className="font-medium">{p.title}</div>
            <div className="text-xs text-muted-foreground">Ends: {new Date(p.end * 1000).toLocaleString()}</div>
            <a
              href={`https://snapshot.org/#/${space}/proposal/${p.id}`}
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 text-xs"
            >
              View on Snapshot
            </a>
          </div>
        ))}
        {items.length === 0 && <div className="text-muted-foreground">No active proposals.</div>}
      </CardContent>
    </Card>
  )
}


