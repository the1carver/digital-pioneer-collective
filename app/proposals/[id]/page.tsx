"use client"

import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabase-client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import CryptoJS from 'crypto-js'

interface Proposal {
  id: string
  title: string
  summary: string | null
  content: string | null
  status: "draft" | "under_review" | "published"
  created_at: string
}

export default function ProposalDetailPage() {
  const params = useParams()
  const id = params?.id as string
  const [loading, setLoading] = useState(true)
  const [proposal, setProposal] = useState<Proposal | null>(null)

  const submitForReview = async () => {
    if (!id) {
      return
    }
    await supabase.from('proposals').update({ status: 'under_review' }).eq('id', id)
    await load()
  }

  const load = async () => {
    if (!id) {
      return
    }
    setLoading(true)
    const { data } = await supabase
      .from('proposals')
      .select('id, title, summary, content, status, created_at')
      .eq('id', id)
      .single()
    setProposal(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [id])

  const publishToIPFS = async () => {
    if (!proposal) {
      return
    }
    const content = `# ${proposal.title}\n\n${proposal.summary || ''}\n\n${proposal.content || ''}`
    const res = await fetch('/api/ipfs/pin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, name: `${proposal.id}.md` })
    })
    const json = await res.json()
    const cid = json?.cid
    if (cid) {
      const sha256 = CryptoJS.SHA256(content).toString()
      await supabase.from('publications').insert({ proposal_id: proposal.id, ipfs_cid: cid, sha256 })
      await supabase.from('proposals').update({ status: 'published' }).eq('id', proposal.id)
      await load()
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-10 flex items-center text-muted-foreground">
        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Loading...
      </div>
    )
  }

  if (!proposal) {
    return (
      <div className="container mx-auto px-6 py-10">Proposal not found.</div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-10 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{proposal.title}</h1>
        <span className="text-xs px-2 py-1 rounded bg-muted text-foreground">{proposal.status}</span>
      </div>

      <Card className="bg-card/50 border-border/50 backdrop-blur-sm mb-6">
        <CardHeader>
          <CardTitle>Summary</CardTitle>
          <CardDescription>{proposal.summary || 'No summary'}</CardDescription>
        </CardHeader>
      </Card>

      <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap text-sm">{proposal.content}</pre>
        </CardContent>
      </Card>

      <div className="mt-6 flex gap-3">
        <Link href="/proposals">
          <Button variant="outline">Back</Button>
        </Link>
        {proposal.status === 'draft' && (
          <Button onClick={submitForReview}>Submit for review</Button>
        )}
        {proposal.status === 'under_review' && (
          <Button onClick={publishToIPFS}>Publish</Button>
        )}
        {/* Future: link to Snapshot vote if published */}
      </div>
    </div>
  )
}


