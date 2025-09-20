"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { supabase } from "@/lib/supabase-client"
import Link from "next/link"

interface AILog {
  id: string
  proposal_id: string | null
  sha256: string
  created_at: string
}

interface Publication {
  id: string
  proposal_id: string
  ipfs_cid: string
  sha256: string
  created_at: string
}

export default function TransparencyPage() {
  const [aiLogs, setAiLogs] = useState<AILog[]>([])
  const [pubs, setPubs] = useState<Publication[]>([])

  useEffect(() => {
    const load = async () => {
      const { data: logs } = await supabase
        .from('ai_logs')
        .select('id, proposal_id, sha256, created_at')
        .order('created_at', { ascending: false })
        .limit(25)

      const { data: publications } = await supabase
        .from('publications')
        .select('id, proposal_id, ipfs_cid, sha256, created_at')
        .order('created_at', { ascending: false })
        .limit(25)

      setAiLogs(logs || [])
      setPubs(publications || [])
    }
    load()
  }, [])

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Transparency</h1>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>AI Prompts & Outputs (hashes)</CardTitle>
            <CardDescription>Recent AI drafting events with verifiable hashes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {aiLogs.map((l) => (
              <div key={l.id} className="flex items-center justify-between gap-4 border-b border-border/50 pb-2">
                <div>
                  <div className="font-mono text-xs break-all">{l.sha256}</div>
                  <div className="text-muted-foreground text-xs">{new Date(l.created_at).toLocaleString()}</div>
                </div>
                {l.proposal_id ? (
                  <Link href={`/proposals/${l.proposal_id}`} className="text-cyan-400 text-xs">view proposal</Link>
                ) : null}
              </div>
            ))}
            {aiLogs.length === 0 && <div className="text-muted-foreground">No AI activity yet.</div>}
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Published Documents</CardTitle>
            <CardDescription>Pinned to IPFS with content hashes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {pubs.map((p) => (
              <div key={p.id} className="flex items-center justify-between gap-4 border-b border-border/50 pb-2">
                <div>
                  <div className="font-mono text-xs break-all">{p.sha256}</div>
                  <div className="text-muted-foreground text-xs">{new Date(p.created_at).toLocaleString()}</div>
                </div>
                <a target="_blank" rel="noreferrer" href={`https://ipfs.io/ipfs/${p.ipfs_cid}`} className="text-cyan-400 text-xs">view on IPFS</a>
              </div>
            ))}
            {pubs.length === 0 && <div className="text-muted-foreground">Nothing published yet.</div>}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


