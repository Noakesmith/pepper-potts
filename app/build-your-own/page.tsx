'use client'

import { useState, useEffect, FormEvent } from 'react'

const NAV_SECTIONS = [
  { id: 'intro', label: 'Introduction' },
  { id: 'backstory', label: 'Backstory' },
  { id: 'vision', label: 'My Vision' },
  { id: 'day-in-life', label: 'How I Use This' },
  { id: 'features', label: 'Current Features' },
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
              follow the steps.
            </p>
            <p className="text-[13px] text-stone-900/55 leading-relaxed">
              I&apos;m not a developer. I&apos;m an executive coach. Everything
              you see here was built through conversation with Claude &mdash; describing
              what I wanted in plain English and letting it write the code.
            </p>
          </section>

          {/* Backstory */}
          <section className="mb-14" id="backstory">
            <SectionLabel>Backstory</SectionLabel>
            <p className="text-[13px] text-stone-600 leading-relaxed mb-3">
              I heard <A href="https://github.com/heyitsnoah">Noah Brier</A> on a
              podcast talking about using Claude Code with Obsidian. He&apos;d built
              an open source starter kit called{' '}
              <A href="https://github.com/heyitsnoah/claudesidian">Claudesidian</A>{' '}
              &mdash; a pre-configured vault template designed to be driven by AI. That
              was the spark.
            </p>
            <p className="text-[13px] text-stone-600 leading-relaxed mb-3">
              I started with Noah&apos;s template and quickly realized this could be
              something much bigger. Not just a note-taking setup, but a full
              personal operating system &mdash; one that manages my coaching business,
              tracks my finances, processes my emails, and runs my daily
              ceremonies. All through conversation with Claude.
            </p>
            <p className="text-[13px] text-stone-900/55 leading-relaxed">
              Pepper Potts is what emerged. I&apos;m still building it &mdash; a little
              each week, always in service of the actual work, not as a project
              for its own sake. This guide is everything you need to build your
              own version.
            </p>
          </section>

          {/* Vision */}
          <section className="mb-14" id="vision">
            <SectionLabel>My vision for Pepper Potts</SectionLabel>
            <p className="text-[13px] text-stone-600 leading-relaxed mb-3">
              I want an intelligence layer that wraps around every domain of my
              life &mdash; coaching, finances, health, relationships, creativity,
              logistics &mdash; and orchestrates them the way a world-class chief of
              staff would. Structure that feels like liberation, not control.
            </p>
            <p className="text-[13px] text-stone-600 leading-relaxed mb-3">
              The morning kickoff already shapes my day. The evening reflection
              captures what happened. The weekly review closes open loops. Email
              forwarding means important messages land in my vault without me
              lifting a finger. And it&apos;s all connected &mdash; coaching actions,
              financial data, project status &mdash; surfaced exactly when I need it.
            </p>
            <p className="text-[13px] text-stone-600 leading-relaxed mb-3">
              Eventually, I want health data flowing in (HRV, sleep), calendar
              integration for time-aware decisions, pattern detection that notices
              recurring themes across weeks of notes, and client prep briefs
              generated automatically before every coaching session.
            </p>
            <p className="font-serif text-[15px] text-stone-600 italic">
              The coaching clients will eventually ask: &ldquo;How do you stay so
              organized?&rdquo; And I&apos;ll say: &ldquo;Let me show you.&rdquo;
              That is the product.
            </p>
          </section>

          {/* A day in the life */}
          <section className="mb-14" id="day-in-life">
            <SectionLabel>How I actually use this</SectionLabel>
            <p className="text-[13px] text-stone-600 leading-relaxed mb-3">
              I open my laptop in the morning, fire up the terminal, and type{' '}
              <Cmd>/daily-kickoff</Cmd>. Claude reads my daily note, checks
              my coaching actions, pulls in any forwarded emails that arrived
              overnight, and asks me: &ldquo;What are your three wins for
              today?&rdquo; We have a quick conversation and I&apos;m locked in
              for the day in about five minutes.
            </p>
            <p className="text-[13px] text-stone-600 leading-relaxed mb-3">
              During the day, I can say &ldquo;check my email for updates on X&rdquo;
              and Claude searches my Gmail directly, reads the threads, and gives me
              the full picture. Important emails get forwarded to my vault automatically.
              When I need to research something, Claude searches across my entire
              vault &mdash; hundreds of notes, meeting transcripts, project docs &mdash;
              and synthesizes what it finds.
            </p>
            <p className="text-[13px] text-stone-600 leading-relaxed mb-3">
              Between coaching calls, I have buffer blocks &mdash; 30-minute windows
              for knocking off small tasks. I ask Claude &ldquo;what&apos;s in
              my buffer?&rdquo; and it pulls up the running list. I pick a few
              things, knock them out, move on.
            </p>
            <p className="text-[13px] text-stone-600 leading-relaxed mb-3">
              In the evening, I run <Cmd>/daily-reflection</Cmd>. Claude
              walks me through what I actually did versus what I intended, captures
              the key insights, and plants a seed for tomorrow. It&apos;s a
              five-minute conversation that replaces what used to be fifteen
              minutes of scattered journaling.
            </p>
            <p className="text-[13px] text-stone-600 leading-relaxed mb-3">
              On Sundays, <Cmd>/weekly-review</Cmd> closes the week &mdash; what
              went well, what didn&apos;t, what&apos;s carrying forward. It
              processes the inbox, archives completed projects, and sets up the
              week ahead.
            </p>
            <p className="text-[13px] text-stone-900/55 leading-relaxed">
              The magic isn&apos;t any one feature. It&apos;s that everything
              talks to everything. My coaching actions show up in my morning
              kickoff. My forwarded emails land in the right place. My weekly
              review catches things I would have dropped. The system holds what
              my brain can&apos;t.
            </p>
          </section>

          {/* ====== GATED CONTENT ====== */}
          <div className="relative">
            {!unlocked && (
              <div className="absolute inset-0 z-20 pointer-events-none" style={{ top: '-20px' }}>
                {/* Gradient fade from visible to blurred */}
                <div className="h-32 bg-gradient-to-b from-transparent to-stone-50" />
                {/* Capture form overlay */}
                <div className="bg-stone-50 pointer-events-auto">
                  <div className="max-w-md mx-auto px-6 py-12 text-center">
                    <div className="inline-flex items-center gap-2 bg-red-500/[0.06] border border-red-500/15 text-red-600 text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-6">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                      Full guide below
                    </div>
                    <h3 className="font-serif text-[24px] text-stone-900 tracking-[-0.02em] mb-3">
                      Get the full setup guide
                    </h3>
                    <p className="text-[13px] text-stone-500 leading-relaxed mb-8">
                      Features, tools, step-by-step setup, and everything you need to
                      build your own AI chief of staff. Free &mdash; just drop your name
                      and email.
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
                          {submitting ? 'Unlocking...' : 'Unlock the guide'}
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
            <div className={!unlocked ? 'blur-sm select-none' : ''} style={!unlocked ? { maxHeight: '600px', overflow: 'hidden' } : undefined}>

          {/* Current features */}
          <section className="mb-14" id="features">
            <SectionLabel>Current features</SectionLabel>

            <CategoryLabel>Daily Ceremonies</CategoryLabel>
            <div className="space-y-0">
              <FeatureDetail
                name="Daily Kickoff"
                command="/daily-kickoff"
                desc="Interactive morning ceremony. Claude checks your daily note, surfaces coaching actions, reviews your schedule, and helps you set intentions for the day. Takes about 5 minutes."
              />
              <FeatureDetail
                name="Daily Reflection"
                command="/daily-reflection"
                desc="Evening wind-down. Reviews what you did versus what you planned, captures insights, and plants a seed for tomorrow."
              />
              <FeatureDetail
                name="Weekly Review"
                command="/weekly-review"
                desc="Sunday ritual. Closes out the week with a headline, wins, patterns, and energy assessment. Clears open loops, processes the inbox, and sets up the week ahead."
              />
              <FeatureDetail
                name="Wrap Up"
                command="/wrap-up"
                desc="End-of-session command. Commits your changes to git, pushes to remote, and closes out cleanly."
              />
            </div>

            <CategoryLabel>Thinking & Research</CategoryLabel>
            <div className="space-y-0">
              <FeatureDetail
                name="Thinking Partner"
                command="/thinking-partner"
                desc="Collaborative exploration mode. Claude asks clarifying questions, searches your vault for related notes, tracks insights as they emerge, and resists jumping to solutions. Great for working through complex decisions."
              />
              <FeatureDetail
                name="Research Assistant"
                command="/research-assistant"
                desc="Deep research across your entire vault. Reads all relevant notes, extracts insights, maps connections between ideas, identifies contradictions and gaps, and suggests next steps."
              />
              <FeatureDetail
                name="Inbox Processor"
                command="/inbox-processor"
                desc="Scans your inbox folder and helps categorize everything into the right PARA destination — Projects, Areas, Resources, or Archive. Identifies patterns and suggests notes to combine."
              />
              <FeatureDetail
                name="Process Conversations"
                command="/process-conversations"
                desc="Processes conversation transcripts and extracts key insights, action items, and themes into structured notes."
              />
            </div>

            <CategoryLabel>Integrations</CategoryLabel>
            <div className="space-y-0">
              <FeatureDetail
                name="Gmail MCP"
                desc="Claude can read, search, send, and manage your email natively. Ask 'what's the latest on X?' and it searches your inbox, reads the threads, and gives you the full picture. No copy-pasting email content into chat."
              />
              <FeatureDetail
                name="Google Calendar MCP"
                desc="Claude can read your calendar directly — time-aware kickoffs, meeting prep, and scheduling decisions based on your actual day."
              />
              <FeatureDetail
                name="Email → Vault"
                desc="Forward any email to your Postmark address and it appears in your vault as a markdown note. Sender name is included in the filename so emails with the same subject don't overwrite each other."
              />
              <FeatureDetail
                name="Coach Tools Integration"
                desc="Open coaching actions are fetched from the Coach Tools API and surfaced during the daily kickoff. You can mark actions as done directly from the ceremony."
              />
              <FeatureDetail
                name="Voice Captures"
                desc="Quick captures via Siri land in the inbox and get processed during the daily kickoff."
              />
            </div>

            <CategoryLabel>Utilities</CategoryLabel>
            <div className="space-y-0">
              <FeatureDetail
                name="De-AI-ify"
                command="/de-ai-ify"
                desc="Strips AI-generated writing patterns from any text — the overused transitions, hedging language, corporate buzzwords. Makes AI-assisted writing sound like you."
              />
              <FeatureDetail
                name="Add Frontmatter"
                command="/add-frontmatter"
                desc="Analyzes notes and adds intelligent YAML frontmatter — detects note type and generates appropriate properties like title, date, tags, and status."
              />
              <FeatureDetail
                name="Download Attachment"
                command="/download-attachment"
                desc="Downloads files from URLs, analyzes the content, generates descriptive filenames, and organizes them into your attachments folder."
              />
              <FeatureDetail
                name="Pragmatic Review"
                command="/pragmatic-review"
                desc="Interactive code review focusing on YAGNI and KISS principles. Keeps your system lean and avoids over-engineering."
              />
            </div>

            <CategoryLabel>Knowledge Skills (auto-triggered)</CategoryLabel>
            <div className="space-y-0">
              <FeatureDetail
                name="Obsidian Markdown"
                desc="Complete reference for Obsidian-flavored markdown. Auto-loads when you're working with notes — wikilinks, embeds, callouts, properties, Mermaid diagrams."
              />
              <FeatureDetail
                name="JSON Canvas"
                desc="Full spec reference for Obsidian Canvas files. Auto-loads when creating visual canvases, mind maps, or flowcharts."
              />
              <FeatureDetail
                name="Obsidian Bases"
                desc="Reference for Obsidian Bases — database-like views of your notes with filters, formulas, and summaries."
              />
              <FeatureDetail
                name="Systematic Debugging"
                desc="When something breaks, this skill auto-loads a 4-phase debugging methodology. Investigate root cause first, never jump to fixes."
              />
            </div>
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
              <ToolRow name="Vercel" desc="Hosts the Pepper Potts backend" link="https://vercel.com" cost="Free tier" />
              <ToolRow name="Postmark" desc="Receives emails and forwards them to your vault" link="https://postmarkapp.com" cost="Free tier" />
            </div>
          </section>

          {/* Setup guide */}
          <section className="mb-14" id="setup">
            <SectionLabel>Setup guide</SectionLabel>

            <Step number={1} title="Install Obsidian and create your vault">
              <p>
                Download <A href="https://obsidian.md">Obsidian</A> and create a
                new vault. This is just a folder on your computer where all your
                notes will live.
              </p>
              <p>Create the PARA folder structure inside your vault:</p>
              <Code>{`00_Inbox/
01_Projects/
02_Areas/
03_Resources/
04_Archive/
05_Attachments/
06_Metadata/`}</Code>
              <p>
                <strong>00_Inbox</strong> is where new stuff lands.{' '}
                <strong>01_Projects</strong> is for active work with deadlines.{' '}
                <strong>02_Areas</strong> is for ongoing responsibilities (health,
                finances). <strong>03_Resources</strong> is reference material.{' '}
                <strong>04_Archive</strong> is for completed stuff.
              </p>
            </Step>

            <Step number={2} title="Set up Git sync">
              <p>
                Create a <strong>private</strong> repository on{' '}
                <A href="https://github.com/new">GitHub</A> (e.g.,{' '}
                <Inline>my-vault</Inline>).
              </p>
              <p>
                In Obsidian, install the{' '}
                <A href="https://github.com/Vinzent03/obsidian-git">obsidian-git</A>{' '}
                community plugin. This automatically syncs your vault to GitHub
                every few minutes.
              </p>
              <p>
                Configure it to auto-pull and auto-push. Now your notes are backed
                up and accessible from anywhere.
              </p>
            </Step>

            <Step number={3} title="Install Claude Code">
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
                Claude can now see all your notes and help you work with them.
              </p>
            </Step>

            <Step number={4} title="Create your CLAUDE.md">
              <p>
                Create a file called <Inline>CLAUDE.md</Inline> in the root of your
                vault. This is the instruction file that tells Claude how your vault
                works, what the folder structure means, and how you like to work.
              </p>
              <p>
                You can start with the{' '}
                <A href="https://github.com/Noakesmith/pepper-potts">
                  template from this repo
                </A>{' '}
                and customize it. The more context you give Claude about your
                workflow, the better it works.
              </p>
            </Step>

            <Step number={5} title="Add your first commands">
              <p>
                Commands are reusable prompts that live in{' '}
                <Inline>.claude/commands/</Inline>. Start with a daily kickoff:
              </p>
              <p>
                Create <Inline>.claude/commands/daily-kickoff.md</Inline> with a
                prompt that describes your ideal morning review &mdash; what you want
                Claude to check, what questions to ask you, what to surface.
              </p>
              <p>
                Then in Claude Code, just type <Cmd>/daily-kickoff</Cmd> and
                it runs.
              </p>
            </Step>

            <Step number={6} title="Set up email forwarding (optional)">
              <p>
                This is the Pepper Potts backend &mdash; a tiny server that catches
                emails and turns them into vault notes.
              </p>
              <ol className="list-decimal list-inside space-y-2 text-[13px] text-stone-600">
                <li>
                  Fork the{' '}
                  <A href="https://github.com/Noakesmith/pepper-potts">
                    pepper-potts repo
                  </A>
                </li>
                <li>
                  Deploy it to <A href="https://vercel.com/new">Vercel</A> (one
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

            <Step number={7} title="Start using it">
              <p>
                That&apos;s it. Open your terminal each morning, run{' '}
                <Inline>claude</Inline> in your vault, and type{' '}
                <Cmd>/daily-kickoff</Cmd>.
              </p>
              <p>
                From there, you build. Add more commands. Integrate your tools.
                Connect your calendar. The system grows with you.
              </p>
            </Step>
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
            <p className="text-[13px] text-stone-600 leading-relaxed mb-3">
              &ldquo;What is Git?&rdquo; &ldquo;How do I create a GitHub
              repo?&rdquo; &ldquo;What does PARA mean?&rdquo; &ldquo;Help me
              write a daily kickoff command.&rdquo;
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

            </div>{/* end blur wrapper */}
          </div>{/* end gated content */}

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

function CategoryLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold text-stone-900/25 uppercase tracking-[0.5px] mb-3 mt-8 first:mt-0">
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
    <pre className="bg-stone-900/[0.04] rounded-xl px-4 py-3 text-[12px] text-stone-700 font-mono overflow-x-auto">
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

function FeatureDetail({
  name,
  command,
  desc,
}: {
  name: string
  command?: string
  desc: string
}) {
  return (
    <div className="py-3.5 border-b border-stone-900/[0.04]">
      <div className="flex items-baseline gap-2.5">
        <span className="text-[15px] font-semibold text-stone-900">{name}</span>
        {command && (
          <code className="text-[11px] font-mono font-semibold text-red-600 bg-red-500/[0.08] px-1.5 py-0.5 rounded-md">
            {command}
          </code>
        )}
      </div>
      <div className="text-[13px] text-stone-900/55 mt-1 leading-relaxed">{desc}</div>
    </div>
  )
}
