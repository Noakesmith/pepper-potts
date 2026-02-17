import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="max-w-[680px] mx-auto px-6 py-12 md:py-20">
      {/* Header */}
      <div className="mb-14">
        <h1 className="font-serif text-[28px] text-stone-900">
          Pepper Potts
        </h1>
        <p className="text-[13px] text-stone-400 mt-1">
          by <a href="https://timnoakesmith.com" className="text-stone-500 hover:text-stone-800 transition-colors">Tim Noakesmith</a>
        </p>
      </div>

      {/* Vision */}
      <section className="mb-14">
        <p className="text-[11px] font-medium text-stone-400 uppercase tracking-widest mb-5">
          Vision
        </p>
        <p className="text-[15px] text-stone-700 leading-relaxed mb-4">
          A living intelligence layer that wraps around every domain of your
          life — work, health, finances, relationships, creativity — and
          orchestrates them the way a world-class chief of staff would.
          Except it never sleeps, never forgets, and learns more about you
          with every interaction.
        </p>
        <p className="text-[13px] text-stone-500 leading-relaxed mb-4">
          Structure that feels like liberation, not control. When you wake up,
          the day is already shaped — not rigidly, but the way a river is
          shaped by its banks. Direction with flow.
        </p>
        <p className="font-serif text-[15px] text-stone-600 italic">
          &ldquo;How do you stay so organized?&rdquo; — &ldquo;Let me show
          you.&rdquo;
        </p>
      </section>

      {/* Origin */}
      <section className="mb-14">
        <p className="text-[11px] font-medium text-stone-400 uppercase tracking-widest mb-5">
          Origin
        </p>
        <p className="text-[13px] text-stone-600 leading-relaxed mb-3">
          I&apos;m an executive coach, not a developer. I heard{' '}
          <A href="https://github.com/heyitsnoah">Noah Brier</A> on a podcast
          talking about using Claude Code with Obsidian — how he&apos;d built{' '}
          <A href="https://github.com/heyitsnoah/claudesidian">Claudesidian</A>{' '}
          as an open source starter kit for exactly this. That was the spark.
        </p>
        <p className="text-[13px] text-stone-600 leading-relaxed mb-3">
          I started with his template and quickly realized this could be
          something much bigger — not just a note-taking setup, but a full
          personal operating system. So I started building on top of it.
          Custom ceremonies, API integrations, a backend for email
          ingestion. All through conversation with Claude.
        </p>
        <p className="text-[13px] text-stone-500 leading-relaxed">
          Pepper Potts is what emerged. It&apos;s still evolving — I build
          a little each week, always in service of the actual work, not as
          a project for its own sake.
        </p>
      </section>

      {/* Architecture */}
      <section className="mb-14">
        <p className="text-[11px] font-medium text-stone-400 uppercase tracking-widest mb-5">
          Architecture
        </p>
        <div className="space-y-0">
          <Row label="Brain" value="Obsidian vault — commands, skills, ceremonies, notes" />
          <Row label="Pipes" value="Pepper Potts backend — webhooks, email ingestion, integrations" />
          <Row label="Coaching" value="Coach Tools — clients, sessions, actions, experiments" />
          <Row label="Money" value="Pindari — invoices, tax, cash, expenses" />
          <Row label="Glue" value="Claude Code — the conductor that ties it all together" />
        </div>
      </section>

      {/* Live */}
      <section className="mb-14">
        <div className="flex items-baseline justify-between mb-5">
          <p className="text-[11px] font-medium text-stone-400 uppercase tracking-widest">
            Live
          </p>
          <span className="text-[11px] text-emerald-600">7 features</span>
        </div>
        <div className="space-y-0">
          <Feature name="Email → Vault" desc="Forward any email and it lands as a markdown note" status="live" />
          <Feature name="Daily Kickoff" desc="Morning ceremony — state check, work landscape, intentions" status="live" />
          <Feature name="Daily Reflection" desc="Evening review — progress accounting, tomorrow's seed" status="live" />
          <Feature name="Weekly Review" desc="Close the week, clear the deck, set up next week" status="live" />
          <Feature name="Thinking Partner" desc="Collaborative exploration — questions before solutions" status="live" />
          <Feature name="Research Assistant" desc="Deep dive into any topic across your entire vault" status="live" />
          <Feature name="Coach Tools Integration" desc="Coaching actions surfaced in daily kickoff" status="live" />
        </div>
      </section>

      {/* Backlog */}
      <section className="mb-14">
        <p className="text-[11px] font-medium text-stone-400 uppercase tracking-widest mb-5">
          Backlog
        </p>
        <div className="space-y-0">
          <Feature name="Pindari Financial Pulse" desc="Cash position, revenue trend, overdue invoices in kickoff" status="next" />
          <Feature name="Google Calendar" desc="Time-aware kickoffs and smart scheduling" status="planned" />
          <Feature name="Client Prep Briefs" desc="Auto-generated coaching session prep from all sources" status="planned" />
          <Feature name="Pattern Detection" desc="Scan daily notes for recurring themes and energy patterns" status="planned" />
          <Feature name="Health Data" desc="Apple Watch / Oura Ring data flowing into kickoff" status="future" />
          <Feature name="Voice Captures" desc="Siri captures auto-processed and filed" status="future" />
          <Feature name="Mobile Webhooks" desc="Trigger workflows from your phone via Apple Shortcuts" status="future" />
        </div>
      </section>

      {/* Principles */}
      <section className="mb-14">
        <p className="text-[11px] font-medium text-stone-400 uppercase tracking-widest mb-5">
          Design Principles
        </p>
        <div className="space-y-0">
          <Row label="Automate" value="If it requires sustained manual discipline, it will fail within 14 days" />
          <Row label="Dialogue" value="Interactive conversations beat passive dashboards" />
          <Row label="Mirror" value="Reflect what's actually happening, not what you want to hear" />
          <Row label="Evolve" value="Systems that become routine get abandoned — keep it fresh" />
          <Row label="Serve" value="The system exists to make the life better, not to be a project" />
        </div>
      </section>

      {/* Footer */}
      <div className="flex items-baseline gap-6 text-[13px] text-stone-400">
        <Link
          href="/getting-started"
          className="text-stone-500 hover:text-stone-800 transition-colors"
        >
          Getting started guide →
        </Link>
        <a
          href="https://github.com/Noakesmith/pepper-potts"
          className="text-stone-500 hover:text-stone-800 transition-colors"
        >
          GitHub
        </a>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline py-3.5 border-b border-stone-100">
      <span className="text-[13px] font-medium text-stone-900 w-24 shrink-0">
        {label}
      </span>
      <span className="text-[13px] text-stone-500">{value}</span>
    </div>
  )
}

function Feature({
  name,
  desc,
  status,
}: {
  name: string
  desc: string
  status: 'live' | 'next' | 'planned' | 'future'
}) {
  const dot = {
    live: 'bg-emerald-500',
    next: 'bg-amber-500',
    planned: 'bg-stone-300',
    future: 'bg-stone-200',
  }

  return (
    <div className="flex items-center justify-between py-3.5 border-b border-stone-100 group">
      <div className="flex items-baseline gap-3 min-w-0">
        <span className="text-[15px] font-medium text-stone-900 group-hover:text-stone-600 transition-colors">
          {name}
        </span>
        <span className="text-[13px] text-stone-400 truncate hidden sm:inline">
          {desc}
        </span>
      </div>
      <div className="flex items-center gap-2 shrink-0 ml-4">
        <span className="text-[11px] text-stone-400">{status}</span>
        <span className={`w-1.5 h-1.5 rounded-full ${dot[status]}`} />
      </div>
    </div>
  )
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-stone-700 hover:text-stone-900 underline underline-offset-2 transition-colors"
    >
      {children}
    </a>
  )
}
