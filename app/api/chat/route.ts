import { anthropic } from '@ai-sdk/anthropic'
import { streamText, convertToCoreMessages } from 'ai'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    // Get the authorization header
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response('Unauthorized', { status: 401 })
    }

    const token = authHeader.substring(7)

    // Verify the user with Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const { messages } = await req.json()

    // Check if Anthropic API key is configured
    if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your_anthropic_api_key_here') {
      return new Response(JSON.stringify({
        error: 'AI service not configured. Please add your Anthropic API key to environment variables.',
        requiresSetup: true
      }), { 
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Get user metadata for context
    const userName = user.user_metadata?.name || 'Pioneer'
    const userRole = user.user_metadata?.role || 'member'
    const userInterests = user.user_metadata?.interests || ''

    // Create system message with context about Digital Pioneers Collective
    const systemMessage = {
      role: 'system' as const,
      content: `You are the AI assistant for Digital Pioneers Collective, a community-owned marketing hub where creators, brands, and fans build together using AI and Web3.

Current user: ${userName} (Role: ${userRole})
${userInterests ? `Interests: ${userInterests}` : ''}

As the Digital Pioneers AI, you should:
- Help with Web3 marketing strategies and campaigns
- Provide guidance on decentralized marketing approaches  
- Suggest ways to leverage AI in marketing
- Offer advice on community building and engagement
- Help with NFT, DeFi, and blockchain marketing topics
- Provide creative campaign ideas
- Assist with tokenomics and community incentives

Keep responses helpful, engaging, and aligned with Web3 and decentralized marketing principles. Be encouraging and supportive of the pioneer spirit.`
    }

    const result = await streamText({
      model: anthropic('claude-3-5-sonnet-20241022'),
      messages: [systemMessage, ...convertToCoreMessages(messages)],
      temperature: 0.7,
      maxTokens: 1000,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error('Chat API Error:', error)
    return new Response(JSON.stringify({
      error: 'An error occurred while processing your request.',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}