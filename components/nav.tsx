'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/', label: 'Dashboard' },
  { href: '/getting-started', label: 'Getting Started' },
]

export function Nav() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-50/80 backdrop-blur-3xl border-b border-stone-900/[0.08]">
      <div className="max-w-[1200px] mx-auto px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Pepper Potts"
            width={36}
            height={36}
            className="rounded-full shadow-sm border border-red-200/50"
          />
          <span className="font-serif text-xl text-stone-900 tracking-tight">
            Pepper <span className="text-red-600">Potts</span>
          </span>
        </Link>
        <div className="flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3.5 py-2 text-[13px] font-medium rounded-[10px] transition-all duration-200 ${
                isActive(item.href)
                  ? 'text-stone-900 bg-stone-200/60'
                  : 'text-stone-900/55 hover:text-stone-900 hover:bg-red-500/[0.05]'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
