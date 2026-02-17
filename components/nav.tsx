'use client'

import Link from 'next/link'
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
    <nav className="sticky top-0 z-50 bg-stone-50/90 backdrop-blur-md border-b border-stone-200/40">
      <div className="max-w-[680px] mx-auto px-5 flex items-center justify-between h-14">
        <Link
          href="/"
          className="font-serif text-xl text-stone-900 tracking-tight"
        >
          Pepper Potts
        </Link>
        <div className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1.5 text-[13px] rounded-full transition-all duration-150 ${
                isActive(item.href)
                  ? 'text-stone-900 font-medium bg-stone-200/60'
                  : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100/60'
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
