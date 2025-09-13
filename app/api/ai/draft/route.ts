import { NextResponse } from 'next/server'
import crypto from 'crypto'

// Placeholder AI draft endpoint. Replace with self-hosted LLM later.
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const title: string = body?.title || ''
    const summary: string = body?.summary || ''
    const context: string = body?.context || ''

    const prompt = `Draft a clear, action-oriented governance proposal.\nTitle: ${title}\nSummary: ${summary}\nContext: ${context}\nInclude goals, deliverables, budget, milestones, and success metrics.`

    // Very naive draft stub for MVP
    const draft = [
      `# ${title || 'Proposal'}`,
      '',
      summary ? `Summary: ${summary}` : 'Summary: (to be updated)',
      '',
      '## Goals',
      '- Define the primary objective',
      '',
      '## Deliverables',
      '- Key artifacts and outputs',
      '',
      '## Budget',
      '- Estimated costs and funding source',
      '',
      '## Timeline',
      '- Milestones and dates',
      '',
      '## Success Metrics',
      '- How we will measure impact',
    ].join('\n')

    const sha256 = crypto.createHash('sha256').update(prompt + '\n' + draft).digest('hex')

    return NextResponse.json({ draft, sha256 })
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}


