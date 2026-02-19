'use client'

import { useState, useEffect, FormEvent } from 'react'

const NAV_SECTIONS = [
  { id: 'intro', label: 'Introduction' },
  { id: 'what-is', label: 'What Is Pepper Potts?' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'what-you-need', label: "What You'll Need" },
  { id: 'setup', label: 'Setup Guide' },
  { id: 'faq', label: 'Common Questions' },
  { id: 'reading', label: 'Recommended Reading' },
  { id: 'credits', label: 'Credits' },
]

export default function BuildYourOwn() {
  const [activeSection, setActiveSection] = useState('intro')
  const [unlocked, setUnlocked] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('pp_unlocked') === 'true') {
      setUnlocked(true)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      { threshold: 0.2, rootMargin: '-80px 0px -60% 0px' }
    )

    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  async function handleSubscribe(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    setSubmitting(true)
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      })
      localStorage.setItem('pp_unlocked', 'true')
      setSubmitted(true)
      setTimeout(() => setUnlocked(true), 600)
    } catch {
      setUnlocked(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-[1200px] mx-auto px-8 pt-24 pb-16">
      <div className="flex gap-16">
        {/* Left Nav */}
        <aside className="hidden lg:block w-52 shrink-0">
          <nav className="sticky top-24">
            <p className="text-[11px] font-bold text-stone-900/35 uppercase tracking-[0.5px] mb-4">
              On this page
            </p>
            <ul className="space-y-0.5">
              {NAV_SECTIONS.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }}
                    className={`block px-3 py-1.5 text-[13px] rounded-lg transition-all duration-200 ${
                      activeSection === id
                        ? 'text-red-600 font-medium bg-red-500/[0.06]'
                        : 'text-stone-900/45 hover:text-stone-900 hover:bg-stone-100/60'
                    }`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0 max-w-[680px]">
          {/* Header */}
          <div className="mb-14 pt-8" id="intro">
            <h1 className="font-serif text-[36px] text-stone-900 tracking-[-0.02em] mb-2">
              Build Your Own
            </h1>
            <p className="text-[13px] text-stone-900/45 mt-1">
              by{' '}
              <a
                href="https://timnoakesmith.com"
                className="text-stone-900/55 hover:text-red-600 transition-colors"
              >
                Tim Noakesmith
              </a>
            </p>
          </div>

          {/* Intro */}
          <section className="mb-14">
            <p className="text-[15px] text-stone-700 leading-relaxed mb-4">
              How to build your own AI chief of staff using Obsidian, Claude Code,
              and a handful of free tools. No coding experience required &mdash; just
              fork, configure, and start talking.
            </p>
            <p className="text-[13px] text-stone-900/55 leading-relaxed">
              I&apos;m not a developer. I&apos;m an executive coach. Everything
              you see here was built through conversation with Claude &mdash; describing
              what I wanted in plain English and letting it write the code.
            </p>
          </section>

          {/* What is this */}
          <section className="mb-14" id="what-is">
            <SectionLabel>What is Pepper Potts?</SectionLabel>
            <p className="text-[13px] text-stone-600 leading-relaxed mb-3">
              A personal operating system built on top of{' '}
              <A href="https://obsidian.md">Obsidian</A> (a free note-taking app)
              and <A href="https://docs.anthropic.com/en/docs/claude-code">Claude Code</A>{' '}
              (Anthropic&apos;s AI coding assistant). It turns your notes into a
              living system that helps you organize your life, run your business,
              and stay on top of everything.
            </p>
            <p className="text-[13px] text-stone-600 leading-relaxed mb-3">
              Think of it like hiring a chief of staff who lives inside your
              computer. Every morning it reviews your day. Every evening it
              reflects on what happened. It processes your emails, tracks your
              projects, and connects the dots across everything you&apos;re working
              on.
            </p>
            <p className="text-[13px] text-stone-900/55 leading-relaxed">
              The whole thing is open source. You own all your data. Nothing is
              locked in a proprietary platform.
            </p>
          </section>

          {/* How it works */}
          <section className="mb-14" id="how-it-works">
            <SectionLabel>How it works</SectionLabel>
            <div className="space-y-0">
              <Row label="Brain" value="Obsidian — all your notes, projects, and knowledge live in a simple folder of markdown files on your computer" />
              <Row label="Conductor" value="Claude Code — you talk to it in your terminal and it reads, creates, and connects your notes" />
              <Row label="Sync" value="Git — your vault is backed up to GitHub, version-controlled, accessible from any device" />
              <Row label="Pipes" value="Pepper Potts — a small backend that catches emails and webhooks and pushes them into your vault" />
              <Row label="Method" value="PARA — Projects, Areas, Resources, Archive. Everything has a clear home based on actionability" />
            </div>
          </section>

          {/* What you'll need */}
          <section className="mb-14" id="what-you-need">
            <SectionLabel>What you&apos;ll need</SectionLabel>
            <div className="space-y-0">
              <ToolRow name="Obsidian" desc="Free note-taking app" link="https://obsidian.md" cost="Free" />
              <ToolRow name="Claude Code" desc="AI assistant that runs in your terminal" link="https://docs.anthropic.com/en/docs/claude-code" cost="Subscription" />
              <ToolRow name="GitHub" desc="For syncing and backing up your vault" link="https://github.com" cost="Free" />
            </div>
            <p className="text-[11px] text-stone-900/35 mt-4 italic">
              Optional: Vercel (free tier) and Postmark (free tier) for the email-to-vault pipeline.
            </p>
          </section>

          {/* Setup guide */}
          <section className="mb-14" id="setup">
            <SectionLabel>Setup guide</SectionLabel>

            <Step number={1} title="Fork the repository">
              <p>
                Go to the{' '}
                <A href="https://github.com/Noakesmith/pepper-potts">
                  Pepper Potts GitHub repo
                </A>{' '}
                and click <strong>Fork</strong>. This gives you your own copy of the
                entire system &mdash; folder structure, commands, configuration, everything.
              </p>
              <p>
                Clone your fork to your computer. This folder becomes your Obsidian vault.
              </p>
              <Code>git clone https://github.com/YOUR-USERNAME/pepper-potts.git my-vault</Code>
            </Step>

            <Step number={2} title="Open it in Obsidian">
              <p>
                Download <A href="https://obsidian.md">Obsidian</A> if you haven&apos;t already.
                Open it, choose &ldquo;Open folder as vault&rdquo;, and select the folder
                you just cloned.
              </p>
              <p>
                You&apos;ll see the PARA folder structure already set up &mdash; Inbox, Projects,
                Areas, Resources, Archive. Everything is ready to go.
              </p>
            </Step>

            {/* ====== PAYWALL STARTS HERE ====== */}
            <div className="relative">
              {!unlocked && (
                <div className="absolute inset-0 z-20 pointer-events-none" style={{ top: '-20px' }}>
                  <div className="h-32 bg-gradient-to-b from-transparent to-stone-50" />
                  <div className="bg-stone-50 pointer-events-auto">
                    <div className="max-w-md mx-auto px-6 py-12 text-center">
                      <div className="inline-flex items-center gap-2 bg-red-500/[0.06] border border-red-500/15 text-red-600 text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-6">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                        5 more steps below
                      </div>
                      <h3 className="font-serif text-[24px] text-stone-900 tracking-[-0.02em] mb-3">
                        Get the full setup guide
                      </h3>
                      <p className="text-[13px] text-stone-500 leading-relaxed mb-8">
                        The remaining steps cover Claude Code setup, personalizing your
                        CLAUDE.md, creating your first commands, and connecting email.
                        Free &mdash; just drop your details.
                      </p>
                      {submitted ? (
                        <div className="text-[15px] font-medium text-green-700 animate-fade-in">
                          You&apos;re in. Enjoy the guide.
                        </div>
                      ) : (
                        <form onSubmit={handleSubscribe} className="space-y-3">
                          <input
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-3 text-[14px] bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-300 transition-all placeholder:text-stone-400"
                          />
                          <input
                            type="email"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 text-[14px] bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-300 transition-all placeholder:text-stone-400"
                          />
                          <button
                            type="submit"
                            disabled={submitting}
                            className="w-full px-4 py-3 text-[14px] font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-all disabled:opacity-50"
                          >
                            {submitting ? 'Unlocking...' : 'Unlock the full guide'}
                          </button>
                        </form>
                      )}
                      <p className="text-[11px] text-stone-400 mt-4">
                        No spam. Just the guide and occasional updates on the project.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div className={!unlocked ? 'blur-sm select-none' : ''} style={!unlocked ? { maxHeight: '500px', overflow: 'hidden' } : undefined}>

            <Step number={3} title="Install and run Claude Code">
              <p>
                Follow the{' '}
                <A href="https://docs.anthropic.com/en/docs/claude-code">
                  Claude Code installation guide
                </A>
                . Once installed, open your terminal, navigate to your vault folder,
                and run:
              </p>
              <Code>claude</Code>
              <p>
                Claude will automatically read the <Inline>CLAUDE.md</Inline> file in your
                vault. This is the brain &mdash; it tells Claude how your system works, what
                the folders mean, and how you like to operate.
              </p>
            </Step>

            <Step number={4} title="Personalize your CLAUDE.md">
              <p>
                The <Inline>CLAUDE.md</Inline> that came with the fork is a starter template.
                Open it and make it yours. Tell Claude:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-[13px] text-stone-600">
                <li>What you do for work</li>
                <li>What projects you&apos;re focused on</li>
                <li>How you like to organize your time</li>
                <li>Any tools or services you use (calendar, email, etc.)</li>
              </ul>
              <p>
                The more context you give, the better Claude works. You can also just tell Claude
                to update it: &ldquo;Add a section about my coaching business to the CLAUDE.md&rdquo;.
              </p>
            </Step>

            <Step number={5} title="Let Claude make it yours">
              <p>
                The folder structure is already there from the fork. Now tell Claude
                to personalize it:
              </p>
              <Code>Read my CLAUDE.md and set up the vault for me — create a profile note, add templates, set up my daily note, and configure anything that needs my context.</Code>
              <p>
                Claude will read your instructions, fill in the gaps, and connect
                everything based on what you told it in step 4. This is the magic &mdash;
                you describe your life, Claude wires the system.
              </p>
            </Step>

            <Step number={6} title="Try your first command">
              <p>
                The fork comes with pre-built commands in <Inline>.claude/commands/</Inline>.
                Try the daily kickoff:
              </p>
              <Code>/daily-kickoff</Code>
              <p>
                Claude will walk you through a morning check-in &mdash; how you&apos;re feeling,
                what&apos;s on your plate, what your focus is for the day. It takes about five
                minutes and sets the tone for everything that follows.
              </p>
              <p>
                Other commands to try: <Cmd>/daily-reflection</Cmd>,{' '}
                <Cmd>/thinking-partner</Cmd>, <Cmd>/weekly-review</Cmd>.
              </p>
            </Step>

            <Step number={7} title="Set up email forwarding (optional)">
              <p>
                This is the Pepper Potts backend &mdash; a tiny server that catches
                emails and turns them into vault notes.
              </p>
              <ol className="list-decimal list-inside space-y-2 text-[13px] text-stone-600">
                <li>
                  Deploy your fork to <A href="https://vercel.com/new">Vercel</A> (one
                  click &mdash; import from GitHub)
                </li>
                <li>
                  Add your environment variables in Vercel (GitHub token, repo name,
                  secret key)
                </li>
                <li>
                  Sign up for <A href="https://postmarkapp.com">Postmark</A>,
                  create a server, and set the inbound webhook URL to{' '}
                  <Inline>your-app.vercel.app/api/email?token=YOUR_SECRET</Inline>
                </li>
                <li>
                  Forward any email to your Postmark address and it appears in your
                  vault
                </li>
              </ol>
            </Step>

              </div>{/* end blur wrapper */}
            </div>{/* end paywall container */}
          </section>

          {/* Just ask Claude */}
          <section className="mb-14 bg-red-500/[0.04] border border-red-500/10 rounded-[20px] px-7 py-7">
            <p className="text-[15px] font-semibold text-stone-900 mb-2">
              Stuck on something?
            </p>
            <p className="text-[13px] text-stone-600 leading-relaxed mb-3">
              If anything in this guide doesn&apos;t make sense &mdash; a term, a step,
              a concept &mdash; just ask Claude. That&apos;s the whole point. Open your
              terminal, type <Inline>claude</Inline>, and ask it in plain English.
            </p>
            <p className="text-[13px] text-stone-900/55 leading-relaxed">
              Claude Code is patient, thorough, and doesn&apos;t judge. It built
              this entire website. It can walk you through any step. You
              don&apos;t need to understand everything upfront &mdash; just start, and
              ask as you go.
            </p>
          </section>

          {/* FAQ */}
          <section className="mb-14" id="faq">
            <SectionLabel>Common questions</SectionLabel>
            <div className="space-y-0">
              <Faq
                q="Do I need to know how to code?"
                a="No. Claude Code writes the code for you. You describe what you want in plain English, and it builds it. I built this entire system through conversation."
              />
              <Faq
                q="Is this free?"
                a="Mostly. Obsidian is free. GitHub is free. Vercel and Postmark have free tiers. The only cost is a Claude subscription (for Claude Code)."
              />
              <Faq
                q="Can I use this on my phone?"
                a="The vault syncs via Git, so you can read notes on mobile using Obsidian's mobile app. Running commands requires a terminal (laptop/desktop), though phone-based workflows are on the roadmap."
              />
              <Faq
                q="What if I already have an Obsidian vault?"
                a="Perfect — just add the CLAUDE.md file, the .claude/commands/ folder, and start building commands. No need to restructure what you already have."
              />
              <Faq
                q="Is my data private?"
                a="Yes. Your vault is a folder on your computer, backed up to a private GitHub repo you control. The email webhook runs on your own Vercel deployment. Nothing goes through third-party services you don't control."
              />
            </div>
          </section>

          {/* Recommended Reading */}
          <section className="mb-14" id="reading">
            <SectionLabel>Recommended reading</SectionLabel>
            <div className="space-y-0">
              <ReadingItem
                title="A Guide to Which AI to Use in the Agentic Era"
                author="Ethan Mollick"
                date="Feb 2026"
                href="https://www.oneusefulthing.org/p/a-guide-to-which-ai-to-use-in-the"
                desc="Explains the shift from chatbot conversations to autonomous agents. Breaks down the three layers you need to understand: Models (the AI brains), Apps (the interfaces), and Harnesses (systems that let AI use tools and take actions). Essential context for understanding what Pepper Potts is actually doing under the hood."
              />
            </div>
            <p className="text-[11px] text-stone-900/35 mt-4 italic">
              AI moves fast. These recommendations were accurate when added but may
              become outdated. Check publication dates.
            </p>
          </section>

          {/* Credits */}
          <section className="mb-14" id="credits">
            <SectionLabel>Credits</SectionLabel>
            <div className="space-y-0">
              <Row label="Inspiration" value="Noah Brier and the Claudesidian project" />
              <Row label="Method" value="Tiago Forte's PARA method for organization" />
              <Row label="Built with" value="Claude Code by Anthropic" />
              <Row label="Vault" value="Obsidian with obsidian-git sync" />
              <Row label="Hosting" value="Vercel" />
            </div>
          </section>

          {/* Footer */}
          <div className="flex items-baseline gap-6 text-[13px] text-stone-900/45">
            <a
              href="https://timnoakesmith.com"
              className="text-stone-900/55 hover:text-red-600 transition-colors"
            >
              Tim Noakesmith
            </a>
            <a
              href="https://github.com/Noakesmith/pepper-potts"
              className="text-stone-900/55 hover:text-red-600 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ====== COMPONENTS ====== */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold text-stone-900/35 uppercase tracking-[0.5px] mb-5">
      {children}
    </p>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline py-3.5 border-b border-stone-900/[0.04]">
      <span className="text-[13px] font-semibold text-stone-900 w-24 shrink-0">
        {label}
      </span>
      <span className="text-[13px] text-stone-900/55">{value}</span>
    </div>
  )
}

function ToolRow({
  name,
  desc,
  link,
  cost,
}: {
  name: string
  desc: string
  link: string
  cost: string
}) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-stone-900/[0.04]">
      <div className="flex items-baseline gap-3 min-w-0">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[15px] font-semibold text-stone-900 hover:text-red-600 transition-colors"
        >
          {name}
        </a>
        <span className="text-[13px] text-stone-900/45 hidden sm:inline">{desc}</span>
      </div>
      <span className="text-[11px] text-stone-900/35 shrink-0 ml-4">{cost}</span>
    </div>
  )
}

function Step({
  number,
  title,
  children,
}: {
  number: number
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-10 pb-10 border-b border-stone-900/[0.04] last:border-0">
      <div className="flex items-baseline gap-3 mb-4">
        <span className="text-[11px] font-bold bg-stone-900 text-stone-50 w-5 h-5 rounded-full flex items-center justify-center shrink-0 relative top-0.5">
          {number}
        </span>
        <h3 className="text-[15px] font-semibold text-stone-900">{title}</h3>
      </div>
      <div className="pl-8 space-y-3 text-[13px] text-stone-600 leading-relaxed">
        {children}
      </div>
    </div>
  )
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <pre className="bg-stone-900/[0.04] rounded-xl px-4 py-3 text-[12px] text-stone-700 font-mono overflow-x-auto whitespace-pre-wrap">
      {children}
    </pre>
  )
}

function Inline({ children }: { children: React.ReactNode }) {
  return (
    <code className="text-[12px] bg-stone-900/[0.06] px-1.5 py-0.5 rounded-md font-mono">
      {children}
    </code>
  )
}

function Cmd({ children }: { children: React.ReactNode }) {
  return (
    <code className="text-[12px] font-mono font-semibold text-red-600 bg-red-500/[0.08] px-1.5 py-0.5 rounded-md">
      {children}
    </code>
  )
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-red-600 hover:text-red-700 underline underline-offset-2 transition-colors"
    >
      {children}
    </a>
  )
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div className="py-3.5 border-b border-stone-900/[0.04]">
      <div className="text-[15px] font-semibold text-stone-900">{q}</div>
      <div className="text-[13px] text-stone-900/55 mt-1 leading-relaxed">{a}</div>
    </div>
  )
}

function ReadingItem({
  title,
  author,
  date,
  href,
  desc,
}: {
  title: string
  author: string
  date: string
  href: string
  desc: string
}) {
  return (
    <div className="py-3.5 border-b border-stone-900/[0.04]">
      <div className="flex items-baseline gap-2.5 flex-wrap">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[15px] font-semibold text-red-600 hover:text-red-700 underline underline-offset-2 transition-colors"
        >
          {title}
        </a>
        <span className="text-[11px] text-stone-900/35">
          {author} &middot; {date}
        </span>
      </div>
      <div className="text-[13px] text-stone-900/55 mt-1 leading-relaxed">{desc}</div>
    </div>
  )
}
