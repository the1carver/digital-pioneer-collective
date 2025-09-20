"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { supabase } from "@/lib/supabase-client"
import { useRouter } from "next/navigation"
import { Loader2, Wand2 } from "lucide-react"

const schema = z.object({
  title: z.string().min(4, "Title is too short"),
  summary: z.string().optional(),
  content: z.string().min(20, "Provide more detail for the community"),
})

type FormData = z.infer<typeof schema>

export default function NewProposalPage() {
  const router = useRouter()
  const [isSubmitting, setSubmitting] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (values: FormData) => {
    setSubmitting(true)
    const { data, error } = await supabase
      .from('proposals')
      .insert({ title: values.title, summary: values.summary, content: values.content })
      .select('id')
      .single()
    setSubmitting(false)
    if (!error && data) {
      router.push(`/proposals/${data.id}`)
    }
  }

  const draftWithAI = async () => {
    try {
      setAiLoading(true)
      const res = await fetch('/api/ai/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: watch('title'),
          summary: watch('summary'),
          context: watch('content')
        })
      })
      const json = await res.json()
      if (json?.draft) {
        setValue('content', json.draft)
        // Best-effort: store hash in ai_logs for transparency (no RLS bypass)
        await supabase.from('ai_logs').insert({
          proposal_id: null,
          prompt: `title:${watch('title')}\nsummary:${watch('summary')}`,
          output: json.draft,
          sha256: json.sha256,
        })
      }
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-6 py-10 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">New Proposal</h1>

      <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Describe your proposal</CardTitle>
          <CardDescription>Draft clearly. AI can help you structure the content.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register('title')} className="mt-1" placeholder="Campaign: Support XYZ launch" />
              {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
            </div>
            <div>
              <Label htmlFor="summary">Summary</Label>
              <Input id="summary" {...register('summary')} className="mt-1" placeholder="One-line summary" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="content">Details</Label>
                <Button type="button" variant="outline" size="sm" onClick={draftWithAI} disabled={aiLoading}>
                  {aiLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Wand2 className="w-4 h-4 mr-2" />}
                  Draft with AI
                </Button>
              </div>
              <Textarea id="content" {...register('content')} className="mt-1 min-h-[240px]" placeholder="Goals, deliverables, budget, timeline..." />
              {errors.content && <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>}
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Create Proposal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


