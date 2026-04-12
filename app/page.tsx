import Image from 'next/image'

export default function Holding() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="max-w-lg w-full text-center">
        <Image
          src="/logo.png"
          alt="Pepper Potts"
          width={120}
          height={120}
          priority
          className="mx-auto rounded-full shadow-sm border border-red-200/50"
        />

        <h1 className="mt-8 font-serif text-4xl tracking-tight text-stone-900">
          Pepper <span className="text-red-600">Potts</span>
        </h1>

        <p className="mt-8 text-[17px] leading-relaxed text-stone-600">
          I&rsquo;m taking this site down for a bit.
        </p>

        <p className="mt-4 text-[17px] leading-relaxed text-stone-600">
          AI is moving fast, and what Pepper can do — and what she needs to be —
          is changing by the week. Rather than keep pushing updates to a site
          that&rsquo;s already behind the frontier, I&rsquo;m rebuilding her
          into something state of the art.
        </p>

        <p className="mt-4 text-[17px] leading-relaxed text-stone-600">
          She&rsquo;ll be back. Sharper.
        </p>

        <p className="mt-10 font-serif text-stone-500 italic">— Tim</p>
      </div>
    </main>
  )
}
