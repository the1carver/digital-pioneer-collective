import { NextResponse } from 'next/server'

// IPFS pin using Pinata (pinJSONToIPFS with JWT)
export async function POST(request: Request) {
  try {
    const pinataJwt = process.env.PINATA_JWT
    if (!pinataJwt) {
      return NextResponse.json({ error: 'PINATA_JWT missing (set in env)' }, { status: 503 })
    }

    const body = await request.json()
    const { content, name } = body || {}
    if (!content) {
      return NextResponse.json({ error: 'Missing content' }, { status: 400 })
    }

    const payload = {
      pinataOptions: { cidVersion: 1 },
      pinataMetadata: { name: name || 'proposal.txt' },
      pinataContent: { content }
    }

    const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${pinataJwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      return NextResponse.json({ error: 'Pin failed', details: text }, { status: 500 })
    }
    const json = await res.json()
    const cid = json?.IpfsHash
    return NextResponse.json({ cid })
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}


