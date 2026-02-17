import { NextRequest, NextResponse } from 'next/server'
import TurndownService from 'turndown'

import { PostmarkInboundEmail } from '@/types/email'
import { commitFileToVault, sanitizeFilename } from '@/lib/github'

export async function POST(req: NextRequest) {
  const searchParams = new URLSearchParams(req.url.split('?')[1])

  if (
    !searchParams.has('token') ||
    searchParams.get('token') !== process.env.SECRET_KEY
  ) {
    return new Response('Unauthorized', { status: 401 })
  }

  try {
    const body: PostmarkInboundEmail = await req.json()

    const turndownService = new TurndownService()
    const markdown = turndownService.turndown(body.HtmlBody || body.TextBody)

    const subject = body.Subject || 'Untitled Email'
    const fromName = body.FromName || body.From?.split('@')[0] || ''
    const suffix = fromName ? ` - ${fromName}` : ''
    const filename = `${sanitizeFilename(subject + suffix)}.md`

    const fileId = await commitFileToVault({
      folder: '/Clippings',
      filename,
      content: markdown,
    })

    return NextResponse.json({ status: 'ok', fileId }, { status: 200 })
  } catch (error) {
    console.error('Email handler error:', error)
    return NextResponse.json(
      { status: 'error', message: 'Failed to process email' },
      { status: 500 },
    )
  }
}
