import { NextRequest, NextResponse } from 'next/server'
import { commitFileToVault } from '@/lib/github'

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json()

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 },
      )
    }

    const date = new Date().toISOString().split('T')[0]
    const time = new Date().toISOString()
    const content = `---
name: "${name}"
email: "${email}"
date: ${time}
type: subscriber
---

# Pepper Potts Subscriber

- **Name**: ${name}
- **Email**: ${email}
- **Signed up**: ${time}
- **Source**: Build Your Own page
`

    const filename = `Subscriber - ${name} - ${date}.md`

    await commitFileToVault({
      folder: '/Subscribers',
      filename,
      content,
    })

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json(
      { status: 'error', message: 'Failed to subscribe' },
      { status: 500 },
    )
  }
}
