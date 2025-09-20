"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase-client"
import { Loader2, Plus } from "lucide-react"
import { SnapshotProposals } from "@/components/snapshot-proposals"

interface Proposal {
  id: string
  title: string
  summary: string | null
  status: "draft" | "under_review" | "published"
  created_at: string
}

export default function ProposalsListPage() {
  const [loading, setLoading] = useState(true)
  const [proposals, setProposals] = useState<Proposal[]>([])

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const { data } = await supabase
        .from("proposals")
        .select("id, title, summary, status, created_at")
        .order("created_at", { ascending: false })
      setProposals(data || [])
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Proposals</h1>
          <p className="text-muted-foreground">Create and review governance proposals</p>
        </div>
        <Link href="/proposals/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" /> New Proposal
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center text-muted-foreground">
          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Loading proposals...
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {proposals.map((p) => (
            <Link key={p.id} href={`/proposals/${p.id}`}>
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/70 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {p.title}
                    <span className="text-xs px-2 py-1 rounded bg-muted text-foreground">{p.status}</span>
                  </CardTitle>
                  <CardDescription>{p.summary || "No summary provided"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">{new Date(p.created_at).toLocaleString()}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
          {proposals.length === 0 && (
            <Card className="bg-card/50 border-border/50">
              <CardContent className="py-10 text-center text-muted-foreground">No proposals yet.</CardContent>
            </Card>
          )}
        </div>
      )}

      <div className="mt-10">
        <SnapshotProposals space={process.env.NEXT_PUBLIC_SNAPSHOT_SPACE || 'demo.eth'} />
      </div>
    </div>
  )
}


