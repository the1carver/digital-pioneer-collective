"use client"

import React, { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase-client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface AILog {
  id: string
  proposal_id: string | null
  prompt: string
  output: string
  sha256: string
  status: 'drafted' | 'approved' | 'rejected'
  created_at: string
}

export default function ModerationPage() {
  const [items, setItems] = useState<AILog[]>([])

  const load = async () => {
    const { data } = await supabase
      .from('ai_logs')
      .select('id, proposal_id, prompt, output, sha256, status, created_at')
      .order('created_at', { ascending: false })
      .limit(50)
    setItems(data || [])
  }

  useEffect(() => {
    load()
  }, [])

  const setStatus = async (id: string, status: 'approved' | 'rejected') => {
    await supabase.from('ai_logs').update({ status }).eq('id', id)
    await load()
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Moderation Queue</h1>
      <div className="space-y-6">
        {items.map((log) => (
          <Card key={log.id} className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-sm font-mono">{log.sha256.slice(0, 16)}...</span>
                <span className="text-xs px-2 py-1 rounded bg-muted text-foreground">{log.status}</span>
              </CardTitle>
              <CardDescription>{new Date(log.created_at).toLocaleString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold mb-1">Prompt</div>
                  <pre className="whitespace-pre-wrap">{log.prompt}</pre>
                </div>
                <div>
                  <div className="font-semibold mb-1">Output</div>
                  <pre className="whitespace-pre-wrap">{log.output}</pre>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3">
                {log.proposal_id && (
                  <Link href={`/proposals/${log.proposal_id}`} className="text-cyan-400 text-sm">view proposal</Link>
                )}
                <div className="flex-1" />
                <Button variant="outline" onClick={() => setStatus(log.id, 'rejected')}>Reject</Button>
                <Button onClick={() => setStatus(log.id, 'approved')}>Approve</Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {items.length === 0 && (
          <Card className="bg-card/50 border-border/50">
            <CardContent className="py-10 text-center text-muted-foreground">Nothing to moderate.</CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}


