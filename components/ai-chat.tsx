"use client"

import React, { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, AlertCircle, Sparkles, Loader2 } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

interface AIChatProps {
  className?: string
}

export function AIChat({ className }: AIChatProps) {
  const { user } = useAuth()
  const [setupRequired, setSetupRequired] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
    headers: {
      'Authorization': `Bearer ${user?.access_token || ''}`,
    },
    onError: (error) => {
      try {
        const errorData = JSON.parse(error.message)
        if (errorData.requiresSetup) {
          setSetupRequired(true)
        }
      } catch {
        // Not JSON, use as is
      }
    },
  })

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const userName = user?.user_metadata?.name || 'Pioneer'

  // Sample prompts for getting started
  const samplePrompts = [
    "Help me create a Web3 marketing strategy",
    "Ideas for NFT community engagement",
    "How to build a tokenized reward system",
    "Best practices for DeFi marketing"
  ]

  const handleSamplePrompt = (prompt: string) => {
    handleInputChange({ target: { value: prompt } } as any)
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
              To use the AI assistant, please add your OpenAI API key to the environment variables.
              <br />
              <br />
              <strong>Steps:</strong>
              <br />
              1. Get an API key from{' '}
              <a 
                href="https://console.anthropic.com/keys" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline"
              >
                Anthropic Console
              </a>
              <br />
              2. Add <code className="bg-muted px-1 rounded">ANTHROPIC_API_KEY=your_key_here</code> to your <code className="bg-muted px-1 rounded">.env.local</code> file
              <br />
              3. Restart the development server
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
        <p className="text-sm text-muted-foreground">
          Get expert advice on Web3 marketing, campaigns, and community building
        </p>
      </CardHeader>
      <CardContent className="flex flex-col h-[600px]">
        {/* Chat Messages */}
        <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-lime-400 rounded-full flex items-center justify-center mx-auto">
                  <Bot className="w-8 h-8 text-black" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Hello {userName}! 👋</h3>
                  <p className="text-muted-foreground text-sm">
                    I'm your AI assistant for Web3 marketing and community building.
                    How can I help you today?
                  </p>
                </div>
                
                {/* Sample Prompts */}
                <div className="grid grid-cols-1 gap-2 max-w-md mx-auto mt-6">
                  {samplePrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-left justify-start h-auto p-3 text-xs hover:bg-cyan-500/10 hover:border-cyan-500/50"
                      onClick={() => handleSamplePrompt(prompt)}
                    >
                      <Sparkles className="w-3 h-3 mr-2 flex-shrink-0 text-cyan-400" />
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-lime-500 to-green-500'
                        : 'bg-gradient-to-br from-cyan-500 to-blue-500'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <User className="w-4 h-4 text-black" />
                    ) : (
                      <Bot className="w-4 h-4 text-black" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-lime-500/20 to-green-500/20 border border-lime-500/30'
                        : 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))
            )}
            
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

        {/* Chat Input */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            placeholder="Ask about Web3 marketing, campaigns, tokenomics..."
            onChange={handleInputChange}
            className="flex-1 bg-background/50 border-border/50 focus:border-cyan-400"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !(input ?? '').trim()}
            className="bg-gradient-to-r from-cyan-500 to-lime-400 hover:from-cyan-400 hover:to-lime-300"
          >
            <Send className="w-4 h-4 text-black" />
          </Button>
        </form>

        {error && (
          <Alert variant="destructive" className="mt-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error.message || 'An error occurred while sending your message.'}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}