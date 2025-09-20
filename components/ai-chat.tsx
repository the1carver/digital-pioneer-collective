"use client"

import React, { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, AlertCircle, Sparkles, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase-client"

interface AIChatProps {
  className?: string
}

type ChatMessage = {
  id: string
  role: "user" | "assistant" | "system"
  content: string
}

export function AIChat({ className }: AIChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [setupRequired, setSetupRequired] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) {
      return
    }
    setError(null)

    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: 'user', content: input }
    const assistantMsg: ChatMessage = { id: crypto.randomUUID(), role: 'assistant', content: '' }
    setMessages(prev => [...prev, userMsg, assistantMsg])
    setInput("")
    setIsLoading(true)

    try {
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token ?? ''}`
        },
        body: JSON.stringify({ messages: messages.concat(userMsg).map(m => ({ role: m.role, content: m.content })) })
      })

      if (!res.ok || !res.body) {
        const text = await res.text().catch(() => '')
        try {
          const json = JSON.parse(text)
          if (json?.requiresSetup) setSetupRequired(true)
          setError(json?.error || text || 'Failed to get response')
        } catch {
          setError(text || 'Failed to get response')
        }
        setIsLoading(false)
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let done = false
      while (!done) {
        const { value, done: d } = await reader.read()
        done = d
        const chunk = decoder.decode(value || new Uint8Array())
        if (chunk) {
          setMessages(prev => prev.map(m => m.id === assistantMsg.id ? { ...m, content: m.content + chunk } : m))
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unexpected error')
    } finally {
      setIsLoading(false)
    }
  }

  if (setupRequired) {
    return (
      <Card className={`bg-card/50 border-border/50 backdrop-blur-sm ${className}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-cyan-400" />
            Digital Pioneers AI Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>AI Service Setup Required</strong>
              <br />
              Add your Anthropic API key in environment variables and restart the server.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`bg-card/50 border-border/50 backdrop-blur-sm ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-cyan-400" />
          Digital Pioneers AI Assistant
          <Badge variant="secondary" className="text-xs">
            <Sparkles className="w-3 h-3 mr-1" />
            Claude-Powered
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col h-[600px]">
        <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-8 space-y-2 text-muted-foreground text-sm">
                Ask about Web3 marketing, governance, or community growth.
              </div>
            )}
            {messages.map((m) => (
              <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${m.role === 'user' ? 'bg-gradient-to-br from-lime-500 to-green-500' : 'bg-gradient-to-br from-cyan-500 to-blue-500'}`}>
                  {m.role === 'user' ? <User className="w-4 h-4 text-black" /> : <Bot className="w-4 h-4 text-black" />}
                </div>
                <div className={`max-w-[80%] rounded-lg px-4 py-2 ${m.role === 'user' ? 'bg-gradient-to-br from-lime-500/20 to-green-500/20 border border-lime-500/30' : 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30'}`}>
                  <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-black" />
                </div>
                <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <Separator className="my-4" />

        <form onSubmit={(e) => { e.preventDefault(); handleSend() }} className="flex gap-2">
          <Input
            value={input}
            placeholder="Ask about Web3 marketing, campaigns, tokenomics..."
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-background/50 border-border/50 focus:border-cyan-400"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-cyan-500 to-lime-400 hover:from-cyan-400 hover:to-lime-300"
          >
            <Send className="w-4 h-4 text-black" />
          </Button>
        </form>

        {error && (
          <Alert variant="destructive" className="mt-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}