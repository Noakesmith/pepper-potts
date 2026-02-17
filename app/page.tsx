export default function Dashboard() {
  return (
    <main className="max-w-[680px] mx-auto px-6 py-12 md:py-20">
      {/* Header */}
      <div className="mb-12">
        <h1 className="font-serif text-[28px] text-stone-900 tracking-tight mb-3">
          Pepper Potts
        </h1>
        <p className="text-[15px] text-stone-600 leading-relaxed">
          A living intelligence layer that wraps around every domain of your
          life and orchestrates them the way a world-class chief of staff would
          — except it never sleeps, never forgets, and learns more about you
          with every interaction.
        </p>
      </div>

      {/* Vision */}
      <Section title="Vision">
        <p className="text-[13px] text-stone-600 leading-relaxed mb-4">
          Structure that feels like liberation, not control. When you wake up,
          the day is already shaped — not rigidly, but the way a river is
          shaped by its banks. Direction with flow.
        </p>
        <p className="text-[13px] text-stone-500 italic">
          &ldquo;How do you stay so organized?&rdquo; — &ldquo;Let me show
          you.&rdquo; That is the product.
        </p>
      </Section>

      {/* Architecture */}
      <Section title="Architecture">
        <div className="space-y-3">
          <ArchRow
            label="Brain"
            desc="Obsidian vault — commands, skills, ceremonies, notes"
          />
          <ArchRow
            label="Pipes"
            desc="Pepper Potts backend — webhooks, email ingestion, integrations"
          />
          <ArchRow
            label="Coaching"
            desc="Coach Tools — clients, sessions, actions, experiments"
          />
          <ArchRow
            label="Money"
            desc="Pindari — invoices, tax, cash, expenses"
          />
          <ArchRow
            label="Glue"
            desc="Claude Code — the conductor that ties it all together"
          />
        </div>
      </Section>

      {/* Live Features */}
      <Section title="Live">
        <div className="space-y-0">
          <FeatureRow
            name="Email → Vault"
            desc="Forward any email and it lands in your vault as a markdown note"
            status="live"
          />
          <FeatureRow
            name="Daily Kickoff"
            desc="Morning ceremony — state check, work landscape, intentions"
            status="live"
          />
          <FeatureRow
            name="Daily Reflection"
            desc="Evening review — progress accounting, tomorrow's seed"
            status="live"
          />
          <FeatureRow
            name="Weekly Review"
            desc="Close the week, clear the deck, set up next week"
            status="live"
          />
          <FeatureRow
            name="Thinking Partner"
            desc="Collaborative exploration — questions before solutions"
            status="live"
          />
          <FeatureRow
            name="Research Assistant"
            desc="Deep dive into any topic across your entire vault"
            status="live"
          />
          <FeatureRow
            name="Coach Tools Integration"
            desc="Coaching actions surfaced in daily kickoff"
            status="live"
          />
        </div>
      </Section>

      {/* Backlog */}
      <Section title="Backlog">
        <div className="space-y-0">
          <FeatureRow
            name="Pindari Financial Pulse"
            desc="Cash position, revenue trend, overdue invoices in kickoff"
            status="next"
          />
          <FeatureRow
            name="Google Calendar Integration"
            desc="Time-aware kickoffs and smart scheduling"
            status="planned"
          />
          <FeatureRow
            name="Client Prep Briefs"
            desc="Auto-generated coaching session prep from all sources"
            status="planned"
          />
          <FeatureRow
            name="Pattern Detection"
            desc="Scan daily notes for recurring themes and energy patterns"
            status="planned"
          />
          <FeatureRow
            name="Health Data Ingestion"
            desc="Apple Watch / Oura Ring data flowing into kickoff"
            status="future"
          />
          <FeatureRow
            name="Voice Capture Processing"
            desc="Siri captures auto-processed and filed"
            status="future"
          />
          <FeatureRow
            name="Apple Shortcuts Webhooks"
            desc="Trigger Claude Code workflows from your phone"
            status="future"
          />
        </div>
      </Section>

      {/* Design Principles */}
      <Section title="Design Principles">
        <div className="space-y-3">
          <Principle
            title="Automate the boring"
            desc="If it requires sustained manual discipline, it will fail within 14 days. Everything must be automated or frictionless."
          />
          <Principle
            title="Dialogue over dashboards"
            desc="Interactive conversations beat passive displays. The terminal is the interface."
          />
          <Principle
            title="Mirror, not cheerleader"
            desc="Reflect what's actually happening, not what you want to hear. Truth over comfort."
          />
          <Principle
            title="Novelty or death"
            desc="Systems that become routine get abandoned. The system must evolve or be replaced."
          />
          <Principle
            title="Serve the life"
            desc="The system exists to make the life better, not to be a project. 90 minutes building, then do the actual work."
          />
        </div>
      </Section>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-stone-200/60">
        <p className="text-[11px] text-stone-400">
          Built by Tim Noakesmith with Claude Code. Open source on{' '}
          <a
            href="https://github.com/Noakesmith/pepper-potts"
            className="text-stone-500 hover:text-stone-800 transition-colors underline underline-offset-2"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </main>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-12">
      <h2 className="font-serif text-[20px] text-stone-900 tracking-tight mb-4">
        {title}
      </h2>
      {children}
    </section>
  )
}

function ArchRow({ label, desc }: { label: string; desc: string }) {
  return (
    <div className="flex items-baseline gap-3 py-2 border-b border-stone-100">
      <span className="text-[13px] font-medium text-stone-900 w-20 shrink-0">
        {label}
      </span>
      <span className="text-[13px] text-stone-500">{desc}</span>
    </div>
  )
}

function FeatureRow({
  name,
  desc,
  status,
}: {
  name: string
  desc: string
  status: 'live' | 'next' | 'planned' | 'future'
}) {
  const statusStyles = {
    live: 'bg-emerald-100 text-emerald-700',
    next: 'bg-amber-100 text-amber-700',
    planned: 'bg-stone-100 text-stone-500',
    future: 'bg-stone-50 text-stone-400',
  }

  return (
    <div className="flex items-center justify-between py-3 border-b border-stone-100 group">
      <div className="min-w-0">
        <div className="text-[13px] text-stone-900">{name}</div>
        <div className="text-[11px] text-stone-400 mt-0.5">{desc}</div>
      </div>
      <span
        className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ml-4 ${statusStyles[status]}`}
      >
        {status}
      </span>
    </div>
  )
}

function Principle({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="py-2 border-b border-stone-100">
      <div className="text-[13px] font-medium text-stone-900">{title}</div>
      <div className="text-[12px] text-stone-500 mt-1">{desc}</div>
    </div>
  )
}
