'use client'

import { useState, useEffect, type ReactNode } from 'react'
import Link from 'next/link'

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const toggle = (id: string) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <main className="max-w-[1200px] mx-auto px-8 pt-24 pb-16">
      {/* ====== HERO ====== */}
      <div className="pt-16 pb-14 mb-16 relative">
        <div className="absolute bottom-0 -left-24 -right-24 h-px bg-gradient-to-r from-transparent via-stone-200/80 to-transparent" />

        <div className="inline-flex items-center gap-2.5 bg-red-500/[0.08] border border-red-500/15 text-red-600 text-[11px] font-bold px-[18px] py-[7px] rounded-full mb-7 uppercase tracking-[1px]">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-glow-pulse shadow-[0_0_8px_rgba(220,38,38,0.4)]" />
          Active Development
        </div>

        <h1 className="font-serif text-[52px] font-normal tracking-[-0.03em] leading-[1.1] mb-5 text-stone-900 max-md:text-4xl">
          Personal Operating System
        </h1>

        <p className="text-[17px] text-stone-900/55 max-w-[700px] leading-[1.7] mb-10">
          A living intelligence layer that wraps around every domain of your
          life &mdash;{' '}
          <strong className="text-stone-900 font-semibold">
            work, health, finances, coaching
          </strong>{' '}
          &mdash; and orchestrates them the way a world-class chief of staff
          would. Built by{' '}
          <strong className="text-stone-900 font-semibold">
            <a
              href="https://timnoakesmith.com"
              className="hover:text-red-600 transition-colors"
            >
              Tim Noakesmith
            </a>
          </strong>
          , an executive coach, entirely through conversation with Claude.
        </p>

        <div className="grid grid-cols-4 gap-3.5 max-md:grid-cols-2">
          <StatCard value="7" label="Live Features" />
          <StatCard value="14" label="Commands" />
          <StatCard value="6" label="Skills" />
          <StatCard value="6" label="Integrations" />
        </div>
      </div>

      {/* ====== 01: PROJECT OVERVIEW ====== */}
      <Section
        id="overview"
        number="01"
        title="Project Overview"
        isCollapsed={collapsed.overview}
        onToggle={() => toggle('overview')}
      >
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-baseline mb-3">
            <span className="text-sm font-semibold text-stone-900/55">
              Overall Progress
            </span>
            <span className="font-serif text-[32px] font-normal text-red-600 tracking-[-0.02em]">
              35%
            </span>
          </div>
          <div className="w-full h-2 bg-red-500/[0.06] rounded overflow-hidden">
            <div
              className="h-full rounded bg-red-600 progress-fill transition-[width] duration-800 ease-out"
              style={{ width: '35%' }}
            />
          </div>
        </div>

        {/* Release Log */}
        <div className="mb-7 space-y-3">
          <ReleaseEntry
            date="Feb 18"
            title="Email & Calendar Intelligence"
            items={[
              'Gmail MCP — search, read, send, and manage emails natively from any session',
              'Google Calendar MCP — time-aware kickoffs with direct calendar access',
              'MCP reliability — packages globally installed, config auto-documented for every session',
              'Daily AI learning time — 30 min non-negotiable built into every plan',
              'Living daily plan — HTML dashboard updates in real-time as the day shifts',
              'Deadline scanning — kickoffs read every project and flag deadlines within 7 days',
              'Operational patterns — reflections track schedule drift and evolve against it',
              'Relationship tracking — actionable follow-through items surfaced in ceremonies',
            ]}
          />
          <ReleaseEntry
            date="Feb 17"
            title="Dashboard & Open Source"
            items={[
              'Product dashboard live at pepperpotts.co',
              'Getting started guide for newcomers',
              'Open source GitHub repository',
              'Logo and brand identity',
            ]}
          />
          <ReleaseEntry
            date="Feb 17"
            title="Pepper Potts Backend"
            items={[
              'Email webhook ported with filename dedup fix',
              'Vercel deployment with custom domain',
              'Postmark inbound email processing',
            ]}
          />
          <ReleaseEntry
            date="Feb 11"
            title="Coach Integration"
            items={[
              'Coach Tools API integration (X-Coach-Secret auth)',
              'Coaching actions surfaced in daily kickoff',
              'Action completion directly from vault ceremonies',
            ]}
          />
          <ReleaseEntry
            date="Feb 6"
            title="Ceremonies & Research"
            items={[
              '/daily-kickoff — state check, work landscape, intentions',
              "/daily-reflection — progress accounting, tomorrow's seed",
              '/weekly-review — close the week, clear the deck',
              '/thinking-partner — collaborative exploration',
              '/research-assistant — deep dive across vault',
            ]}
          />
          <ReleaseEntry
            date="Jan 30"
            title="Foundation"
            items={[
              'Claudesidian fork — /inbox-processor, /process-conversations, /wrap-up, /de-ai-ify, and more',
              'PARA folder structure (Projects, Areas, Resources, Archive)',
              'Obsidian vault setup with obsidian-git sync',
              'Email → Vault pipeline via Postmark',
            ]}
          />
        </div>

        {/* Not Yet Built */}
        <Card>
          <h3 className="text-[15px] font-bold mb-[18px] flex items-center gap-2.5">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(28,25,23,0.35)"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            Not Yet Built
          </h3>
          <ul className="space-y-0">
            {[
              'Pindari financial pulse — cash position, revenue trend in kickoff',
              'Client prep briefs — auto-generated session prep from all sources',
              'Pattern detection — recurring themes and energy patterns across daily notes',
              'Health data — Apple Watch / Oura Ring data flowing into kickoff',
              'Voice captures — Siri captures auto-processed and filed',
              'Mobile webhooks — trigger workflows from phone via Apple Shortcuts',
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-[13px] text-stone-900/55 py-[7px] border-b border-stone-900/[0.04] last:border-b-0 leading-relaxed"
              >
                <span className="text-stone-900/35 font-bold shrink-0 text-[15px]">
                  &ndash;
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </Section>

      {/* ====== 02: VISION & PHILOSOPHY ====== */}
      <Section
        id="vision"
        number="02"
        title="Vision & Philosophy"
        isCollapsed={collapsed.vision}
        onToggle={() => toggle('vision')}
      >
        <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
          <PhilosophyCard
            title="&ldquo;Structure as liberation&rdquo;"
            desc="Direction with flow, not rigid control. When you wake up, the day is already shaped — not rigidly, but the way a river is shaped by its banks."
          />
          <PhilosophyCard
            title="Automate or it dies"
            desc="If it requires sustained manual discipline, it will fail within 14 days. Every workflow must be automated at the point of capture, not maintained by willpower."
          />
          <PhilosophyCard
            title="Dialogue over dashboards"
            desc="Interactive conversations beat passive information displays. The system talks with you, not at you. Questions before solutions, always."
          />
          <PhilosophyCard
            title="The system serves the life"
            desc="Built in service of actual work, not as a project for its own sake. If it doesn't make the day better, it gets cut. No feature worship."
          />
        </div>
      </Section>

      {/* ====== 03: WHAT'S NEXT ====== */}
      <Section
        id="roadmap"
        number="03"
        title="What&rsquo;s Next"
        isCollapsed={collapsed.roadmap}
        onToggle={() => toggle('roadmap')}
      >
        <div className="flex flex-col gap-4">
          <RoadmapItem badge="V1 — Foundation" status="done" title="Ceremonies & Intelligence">
            Claudesidian fork, PARA setup, daily kickoff &amp; reflection, weekly
            review, thinking partner, research assistant, email → vault pipeline,
            Coach Tools integration. <strong>Done.</strong>
          </RoadmapItem>
          <RoadmapItem badge="V2 — Integrations" status="current" title="Connected Intelligence">
            Gmail and Google Calendar MCP integrations live. Operational pattern
            tracking active. Next: Pindari financial pulse in kickoff, client
            prep briefs from all sources, pattern detection across daily notes.
          </RoadmapItem>
          <RoadmapItem badge="V3 — Ambient" status="future" title="Always-On Intelligence">
            Health data from Apple Watch / Oura Ring, voice captures via Siri,
            mobile webhooks via Apple Shortcuts, predictive scheduling,
            cross-domain pattern recognition.
          </RoadmapItem>
        </div>
      </Section>

      {/* ====== 04: ARCHITECTURE ====== */}
      <Section
        id="architecture"
        number="04"
        title="Architecture"
        isCollapsed={collapsed.architecture}
        onToggle={() => toggle('architecture')}
      >
        <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
          <ArchCard title="Ecosystem">
            <ArchRow label="Brain" value="Obsidian vault" />
            <ArchRow label="Pipes" value="Pepper Potts backend" />
            <ArchRow label="Coaching" value="Coach Tools" />
            <ArchRow label="Money" value="Pindari" />
            <ArchRow label="Glue" value="Claude Code" />
          </ArchCard>
          <ArchCard title="Tech Stack">
            <ArchRow label="Vault" value="Obsidian" mono />
            <ArchRow label="Backend" value="Next.js 14" mono />
            <ArchRow label="Hosting" value="Vercel" mono />
            <ArchRow label="Email" value="Postmark" mono />
            <ArchRow label="AI" value="Anthropic Claude" mono />
            <ArchRow label="Sync" value="GitHub + obsidian-git" mono />
          </ArchCard>
          <ArchCard title="Daily Workflows">
            <ArchRow label="Morning" value="Daily kickoff — state, landscape, intentions" />
            <ArchRow label="During" value="Thinking partner, research, email capture" />
            <ArchRow label="Evening" value="Daily reflection — progress, tomorrow's seed" />
            <ArchRow label="Friday" value="Weekly review — close, clear, set up" />
          </ArchCard>
          <ArchCard title="Data Flow">
            <ArchRow label="Email in" value="Postmark → Vercel → GitHub → vault" />
            <ArchRow label="Gmail" value="Gmail MCP → read, search, send natively" />
            <ArchRow label="Calendar" value="Google Calendar MCP → events, scheduling" />
            <ArchRow label="Vault sync" value="obsidian-git auto pull/push" />
            <ArchRow label="Coach data" value="Coach Tools API → kickoff ceremony" />
            <ArchRow label="Commands" value=".claude/commands/ → Claude Code" />
          </ArchCard>
          <div className="fade-in bg-white border border-stone-900/[0.08] rounded-[20px] p-7 shadow-[0_1px_3px_rgba(28,25,23,0.04)] transition-all duration-200 hover:border-red-600/25 hover:shadow-[0_4px_24px_rgba(28,25,23,0.06)] col-span-2 max-md:col-span-1">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.5px] text-stone-900/35 mb-4">
              Organization Method
            </h4>
            <p className="text-[13px] text-stone-900/55 leading-[1.7] mb-3">
              Everything in the vault is organized using Tiago Forte&apos;s{' '}
              <a
                href="https://www.youtube.com/watch?v=MyWmGDnWhjE&t=541s"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 font-medium hover:text-red-700 underline underline-offset-2 transition-colors"
              >
                PARA method
              </a>
              {' '}&mdash; Projects, Areas, Resources, Archive. It gives every note a clear home based on actionability, not topic.
            </p>
            <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
              {[
                { name: 'Projects', desc: 'Time-bound initiatives with clear outcomes' },
                { name: 'Areas', desc: 'Ongoing responsibilities without end dates' },
                { name: 'Resources', desc: 'Topics of interest for future reference' },
                { name: 'Archive', desc: 'Completed or inactive items' },
              ].map((p) => (
                <div key={p.name} className="text-center">
                  <div className="text-sm font-bold text-stone-900 mb-1">{p.name}</div>
                  <div className="text-[11px] text-stone-900/45 leading-snug">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ====== 05: PRODUCT BACKLOG ====== */}
      <Section
        id="backlog"
        number="05"
        title="Product Backlog"
        isCollapsed={collapsed.backlog}
        onToggle={() => toggle('backlog')}
      >
        <div className="space-y-4">
          <BacklogCategory title="Next Up" badge="Next" badgeColor="amber">
            <BacklogItem
              badge="Feature"
              color="amber"
              text={
                <>
                  <strong>Pindari financial pulse</strong> — cash position,
                  revenue trend, overdue invoices surfaced in daily kickoff
                </>
              }
            />
            <BacklogItem
              badge="Done"
              color="amber"
              text={
                <>
                  <strong>Gmail &amp; Google Calendar</strong> — native email
                  access and time-aware kickoffs via MCP integrations.{' '}
                  <em>Shipped Feb 18.</em>
                </>
              }
            />
          </BacklogCategory>

          <BacklogCategory title="Planned" badge="Planned" badgeColor="stone">
            <BacklogItem
              badge="Feature"
              color="stone"
              text={
                <>
                  <strong>Client prep briefs</strong> — auto-generated coaching
                  session prep from Coach Tools + vault + calendar
                </>
              }
            />
            <BacklogItem
              badge="Feature"
              color="stone"
              text={
                <>
                  <strong>Pattern detection</strong> — scan daily notes for
                  recurring themes, energy patterns, and behavioral trends
                </>
              }
            />
            <BacklogItem
              badge="Feature"
              color="stone"
              text={
                <>
                  <strong>Cross-project intelligence</strong> — coach, financial,
                  and personal data synthesized in one view
                </>
              }
            />
          </BacklogCategory>

          <BacklogCategory title="Ideas" badge="Future" badgeColor="muted">
            <BacklogItem
              badge="Idea"
              color="muted"
              text={
                <>
                  <strong>Health data</strong> — Apple Watch / Oura Ring data
                  flowing into kickoff for energy-aware scheduling
                </>
              }
            />
            <BacklogItem
              badge="Idea"
              color="muted"
              text={
                <>
                  <strong>Voice captures</strong> — Siri quick-capture
                  auto-processed, tagged, and filed into vault
                </>
              }
            />
            <BacklogItem
              badge="Idea"
              color="muted"
              text={
                <>
                  <strong>Mobile webhooks</strong> — trigger any workflow from
                  your phone via Apple Shortcuts
                </>
              }
            />
            <BacklogItem
              badge="Idea"
              color="muted"
              text={
                <>
                  <strong>Predictive scheduling</strong> — AI suggests optimal
                  times for deep work, meetings, admin based on patterns
                </>
              }
            />
          </BacklogCategory>
        </div>
      </Section>

      {/* ====== 06: KEY LINKS ====== */}
      <Section
        id="links"
        number="06"
        title="Key Links"
        isCollapsed={collapsed.links}
        onToggle={() => toggle('links')}
      >
        <div className="grid grid-cols-5 gap-3.5 max-md:grid-cols-2">
          <LinkCard
            label="Production"
            value="pepperpotts.co"
            href="https://pepperpotts.co"
          />
          <LinkCard
            label="Getting Started"
            value="Setup Guide"
            href="/getting-started"
            internal
          />
          <LinkCard
            label="GitHub"
            value="Noakesmith/pepper-potts"
            href="https://github.com/Noakesmith/pepper-potts"
          />
          <LinkCard
            label="Inspired By"
            value="Claudesidian"
            href="https://github.com/heyitsnoah/claudesidian"
          />
          <LinkCard
            label="Organization"
            value="PARA Method"
            href="https://www.youtube.com/watch?v=MyWmGDnWhjE&t=541s"
          />
        </div>
      </Section>

      {/* ====== FOOTER ====== */}
      <footer className="pt-10 pb-16 text-center text-xs text-stone-900/35">
        Pepper Potts &mdash; by Tim Noakesmith &middot; Last updated Feb 2026
      </footer>
    </main>
  )
}

/* ====== COMPONENTS ====== */

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="fade-in bg-white border border-stone-900/[0.08] rounded-[20px] p-6 shadow-[0_1px_3px_rgba(28,25,23,0.04)] relative overflow-hidden transition-all duration-200 hover:border-red-600/25 hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(28,25,23,0.06)] group">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      <div className="font-serif text-4xl font-normal tracking-[-0.02em] text-red-600">
        {value}
      </div>
      <div className="text-[11px] font-semibold text-stone-900/35 mt-1 uppercase tracking-[0.5px]">
        {label}
      </div>
    </div>
  )
}

function Section({
  id,
  number,
  title,
  isCollapsed,
  onToggle,
  children,
}: {
  id: string
  number: string
  title: string
  isCollapsed?: boolean
  onToggle: () => void
  children: ReactNode
}) {
  return (
    <div className="mb-14" id={id}>
      <div
        className="flex items-center justify-between cursor-pointer py-5 mb-7 select-none relative group"
        onClick={onToggle}
      >
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-stone-900/[0.12] to-transparent" />
        <div className="text-xl font-bold tracking-[-0.02em] flex items-center gap-3 transition-colors duration-200 group-hover:text-red-600">
          <span className="text-[11px] font-bold bg-stone-900 text-stone-50 px-3 py-1 rounded-lg tracking-[0.5px]">
            {number}
          </span>
          <span dangerouslySetInnerHTML={{ __html: title }} />
        </div>
        <svg
          className={`w-[22px] h-[22px] stroke-stone-900/35 stroke-2 fill-none transition-transform duration-300 ${
            isCollapsed ? '-rotate-90' : ''
          }`}
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      <div
        className={`overflow-hidden transition-all duration-400 ${
          isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[12000px] opacity-100'
        }`}
      >
        {children}
      </div>
    </div>
  )
}

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white border border-stone-900/[0.08] rounded-[20px] p-7 shadow-[0_1px_3px_rgba(28,25,23,0.04)] transition-all duration-200 hover:border-red-600/25 hover:shadow-[0_4px_24px_rgba(28,25,23,0.06)]">
      {children}
    </div>
  )
}

function ReleaseEntry({
  date,
  title,
  items,
}: {
  date: string
  title: string
  items: string[]
}) {
  return (
    <div className="fade-in bg-white border border-stone-900/[0.08] rounded-[20px] px-7 py-6 shadow-[0_1px_3px_rgba(28,25,23,0.04)] transition-all duration-200 hover:border-red-600/25 hover:shadow-[0_4px_24px_rgba(28,25,23,0.06)]">
      <div className="flex items-baseline gap-3.5 mb-3.5">
        <span className="font-mono text-xs font-semibold text-red-600 bg-red-500/[0.08] px-2.5 py-0.5 rounded-md shrink-0">
          {date}
        </span>
        <span className="text-[15px] font-bold text-stone-900">{title}</span>
      </div>
      <ul className="space-y-0">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 text-[13px] text-stone-900/55 py-1 leading-relaxed"
          >
            <span className="text-red-600 font-bold shrink-0 text-[15px]">
              +
            </span>
            <span>
              {item.split(/(\/[\w-]+)/g).map((part, j) =>
                part.startsWith('/') ? (
                  <code key={j} className="font-mono text-xs font-semibold text-red-600 bg-red-500/[0.08] px-1.5 py-0.5 rounded">
                    {part}
                  </code>
                ) : (
                  <span key={j}>{part}</span>
                )
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function PhilosophyCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="fade-in bg-white border border-stone-900/[0.08] rounded-[20px] p-7 shadow-[0_1px_3px_rgba(28,25,23,0.04)] transition-all duration-200 hover:border-red-600/25 hover:shadow-[0_4px_24px_rgba(28,25,23,0.06)]">
      <h4
        className="font-serif text-[17px] font-normal mb-3 text-stone-900"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <p className="text-[13px] text-stone-900/55 leading-[1.7]">{desc}</p>
    </div>
  )
}

function RoadmapItem({
  badge,
  status,
  title,
  children,
}: {
  badge: string
  status: 'done' | 'current' | 'future'
  title: string
  children: ReactNode
}) {
  const badgeStyles = {
    done: 'bg-emerald-500/[0.08] text-emerald-600 border-emerald-500/15',
    current: 'bg-amber-500/[0.08] text-amber-600 border-amber-500/15',
    future: 'bg-stone-900/[0.06] text-stone-900/55 border-stone-900/[0.08]',
  }

  return (
    <div className="fade-in bg-white border border-stone-900/[0.08] rounded-[20px] px-7 py-6 shadow-[0_1px_3px_rgba(28,25,23,0.04)] transition-all duration-200 hover:border-red-600/25 hover:shadow-[0_4px_24px_rgba(28,25,23,0.06)] flex items-start gap-5">
      <span
        className={`text-[11px] font-bold px-3.5 py-1.5 rounded-[10px] tracking-[0.5px] uppercase whitespace-nowrap shrink-0 border ${badgeStyles[status]}`}
      >
        {badge}
      </span>
      <div>
        <h4 className="text-[15px] font-bold mb-1.5">{title}</h4>
        <p className="text-[13px] text-stone-900/55 leading-relaxed">
          {children}
        </p>
      </div>
    </div>
  )
}

function ArchCard({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="fade-in bg-white border border-stone-900/[0.08] rounded-[20px] p-7 shadow-[0_1px_3px_rgba(28,25,23,0.04)] transition-all duration-200 hover:border-red-600/25 hover:shadow-[0_4px_24px_rgba(28,25,23,0.06)]">
      <h4 className="text-[11px] font-bold uppercase tracking-[0.5px] text-stone-900/35 mb-4">
        {title}
      </h4>
      {children}
    </div>
  )
}

function ArchRow({
  label,
  value,
  mono,
}: {
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div className="flex justify-between items-baseline py-2 border-b border-stone-900/[0.04] last:border-b-0 text-[13px]">
      <span className="text-stone-900/55 font-medium">{label}</span>
      <span
        className={`text-stone-900 font-semibold text-right ${
          mono
            ? 'font-mono text-xs bg-stone-900/[0.06] px-2 py-0.5 rounded-md'
            : ''
        }`}
      >
        {value}
      </span>
    </div>
  )
}

function BacklogCategory({
  title,
  badge,
  badgeColor,
  children,
}: {
  title: string
  badge: string
  badgeColor: 'amber' | 'stone' | 'muted'
  children: ReactNode
}) {
  const colors = {
    amber: 'bg-amber-500/[0.08] text-amber-600',
    stone: 'bg-stone-900/[0.06] text-stone-900/55',
    muted: 'bg-stone-900/[0.06] text-stone-900/35',
  }

  return (
    <div className="fade-in bg-white border border-stone-900/[0.08] rounded-[20px] p-7 shadow-[0_1px_3px_rgba(28,25,23,0.04)] transition-all duration-200 hover:border-red-600/25 hover:shadow-[0_4px_24px_rgba(28,25,23,0.06)]">
      <h4 className="text-[15px] font-bold mb-4 flex items-center gap-2.5">
        {title}
        <span
          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md tracking-[0.5px] uppercase ${colors[badgeColor]}`}
        >
          {badge}
        </span>
      </h4>
      {children}
    </div>
  )
}

function BacklogItem({
  badge,
  color,
  text,
}: {
  badge: string
  color: 'amber' | 'stone' | 'muted'
  text: ReactNode
}) {
  const colors = {
    amber: 'bg-amber-500/[0.08] text-amber-600',
    stone: 'bg-stone-900/[0.06] text-stone-900/55',
    muted: 'bg-stone-900/[0.06] text-stone-900/35',
  }

  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-stone-900/[0.04] last:border-b-0 text-[13px] text-stone-900/55 leading-relaxed">
      <span
        className={`shrink-0 mt-0.5 text-[10px] font-bold px-2.5 py-0.5 rounded-md tracking-[0.5px] uppercase ${colors[color]}`}
      >
        {badge}
      </span>
      <span>{text}</span>
    </div>
  )
}

function LinkCard({
  label,
  value,
  href,
  internal,
}: {
  label: string
  value: string
  href: string
  internal?: boolean
}) {
  const className =
    'fade-in bg-white border border-stone-900/[0.08] rounded-[20px] p-6 shadow-[0_1px_3px_rgba(28,25,23,0.04)] transition-all duration-200 hover:border-red-600/25 hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(28,25,23,0.06)] block no-underline'

  const content = (
    <>
      <div className="text-[11px] font-semibold text-stone-900/35 uppercase tracking-[0.5px] mb-2">
        {label}
      </div>
      <div className="text-sm font-semibold text-red-600">{value}</div>
    </>
  )

  if (internal) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {content}
    </a>
  )
}
