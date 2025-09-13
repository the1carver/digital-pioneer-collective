import { NextResponse } from 'next/server'

// Minimal IPFS pin using web3.storage-compatible API
export async function POST(request: Request) {
  try {
    const token = process.env.WEB3_STORAGE_TOKEN
    if (!token) {
      return NextResponse.json({ error: 'WEB3_STORAGE_TOKEN missing' }, { status: 400 })
    }

    const body = await request.json()
    const { content, name } = body || {}
    if (!content) {
      return NextResponse.json({ error: 'Missing content' }, { status: 400 })
    }

    const file = new File([content], (name || 'document.txt'), { type: 'text/plain' })
    const form = new FormData()
    form.append('file', file)

    const res = await fetch('https://api.web3.storage/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: form as any
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Pin failed' }, { status: 500 })
    }
    const json = await res.json()
    const cid = json?.cid
    return NextResponse.json({ cid })
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}


