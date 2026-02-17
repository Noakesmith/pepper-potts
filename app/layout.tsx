import type { Metadata, Viewport } from 'next'
import { Inter, Source_Serif_4 } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/nav'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pepper Potts',
  description:
    'Personal infrastructure backend — the pipes that connect your life to your Obsidian vault',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Pepper Potts',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#fafaf9',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${sourceSerif.variable} font-sans antialiased bg-stone-50 text-stone-900`}
      >
        <Nav />
        {children}
      </body>
    </html>
  )
}
