export default function GettingStarted() {
  return (
    <main className="max-w-[680px] mx-auto px-6 py-12 md:py-20">
      {/* Header */}
      <div className="mb-12">
        <h1 className="font-serif text-[28px] text-stone-900 tracking-tight mb-3">
          Getting Started
        </h1>
        <p className="text-[15px] text-stone-600 leading-relaxed">
          How to build your own AI chief of staff using Obsidian, Claude Code,
          and a handful of free tools. No coding experience required — just
          follow the steps.
        </p>
      </div>

      {/* What is this */}
      <Section title="What is Pepper Potts?">
        <p className="text-[13px] text-stone-600 leading-relaxed mb-4">
          Pepper Potts is a personal operating system built on top of{' '}
          <A href="https://obsidian.md">Obsidian</A> (a free note-taking app)
          and <A href="https://claude.ai/claude-code">Claude Code</A>{' '}
          (Anthropic&apos;s AI coding assistant). It turns your notes into a
          living system that helps you organize your life, run your business,
          and stay on top of everything.
        </p>
        <p className="text-[13px] text-stone-600 leading-relaxed mb-4">
          Think of it like hiring a chief of staff who lives inside your
          computer. Every morning it reviews your day. Every evening it
          reflects on what happened. It processes your emails, tracks your
          projects, and connects the dots across everything you&apos;re working
          on.
        </p>
        <p className="text-[13px] text-stone-500 leading-relaxed">
          The whole thing is open source. You own all your data. Nothing is
          locked in a proprietary platform.
        </p>
      </Section>

      {/* How it works */}
      <Section title="How it works">
        <div className="space-y-4 mb-6">
          <HowRow
            icon="1"
            title="Obsidian is the brain"
            desc="All your notes, projects, and knowledge live in a simple folder of markdown files on your computer. Organized using the PARA method (Projects, Areas, Resources, Archive)."
          />
          <HowRow
            icon="2"
            title="Claude Code is the conductor"
            desc="You talk to Claude in your terminal. It can read your notes, create new ones, search across everything, and run custom commands — like a morning kickoff or weekly review."
          />
          <HowRow
            icon="3"
            title="Git keeps it synced"
            desc="Your vault is backed up to GitHub. This means it's version-controlled (you can undo anything) and accessible from any device."
          />
          <HowRow
            icon="4"
            title="Pepper Potts connects the pipes"
            desc="A small backend that catches emails and other webhooks, converts them to notes, and pushes them into your vault automatically."
          />
        </div>
      </Section>

      {/* What you'll need */}
      <Section title="What you'll need">
        <div className="space-y-0">
          <ToolRow
            name="Obsidian"
            desc="Free note-taking app"
            link="https://obsidian.md"
            cost="Free"
          />
          <ToolRow
            name="Claude Code"
            desc="AI assistant that runs in your terminal"
            link="https://claude.ai/claude-code"
            cost="Requires Claude subscription"
          />
          <ToolRow
            name="GitHub account"
            desc="For syncing and backing up your vault"
            link="https://github.com"
            cost="Free"
          />
          <ToolRow
            name="Vercel account"
            desc="Hosts the Pepper Potts backend (email webhook)"
            link="https://vercel.com"
            cost="Free tier"
          />
          <ToolRow
            name="Postmark account"
            desc="Receives emails and forwards them to your vault"
            link="https://postmarkapp.com"
            cost="Free tier"
          />
        </div>
      </Section>

      {/* Step by step */}
      <Section title="Setup guide">
        <Step
          number={1}
          title="Install Obsidian and create your vault"
        >
          <p>
            Download <A href="https://obsidian.md">Obsidian</A> and create a
            new vault. This is just a folder on your computer where all your
            notes will live.
          </p>
          <p>
            Create the PARA folder structure inside your vault:
          </p>
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
            <code className="text-[12px] bg-stone-100 px-1.5 py-0.5 rounded">
              my-vault
            </code>
            ).
          </p>
          <p>
            In Obsidian, install the{' '}
            <A href="https://github.com/Vinzent03/obsidian-git">
              obsidian-git
            </A>{' '}
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
            . Once installed, open your terminal, navigate to your vault
            folder, and run:
          </p>
          <Code>claude</Code>
          <p>
            Claude can now see all your notes and help you work with them.
          </p>
        </Step>

        <Step number={4} title="Create your CLAUDE.md">
          <p>
            Create a file called{' '}
            <code className="text-[12px] bg-stone-100 px-1.5 py-0.5 rounded">
              CLAUDE.md
            </code>{' '}
            in the root of your vault. This is the instruction file that tells
            Claude how your vault works, what the folder structure means, and
            how you like to work.
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
            <code className="text-[12px] bg-stone-100 px-1.5 py-0.5 rounded">
              .claude/commands/
            </code>
            . Start with a daily kickoff:
          </p>
          <p>
            Create{' '}
            <code className="text-[12px] bg-stone-100 px-1.5 py-0.5 rounded">
              .claude/commands/daily-kickoff.md
            </code>{' '}
            with a prompt that describes your ideal morning review — what you
            want Claude to check, what questions to ask you, what to surface.
          </p>
          <p>
            Then in Claude Code, just type{' '}
            <code className="text-[12px] bg-stone-100 px-1.5 py-0.5 rounded">
              /daily-kickoff
            </code>{' '}
            and it runs.
          </p>
        </Step>

        <Step number={6} title="Set up email forwarding (optional)">
          <p>
            This is the Pepper Potts backend — a tiny server that catches
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
              Deploy it to{' '}
              <A href="https://vercel.com/new">Vercel</A> (one click — import
              from GitHub)
            </li>
            <li>
              Add your environment variables in Vercel (GitHub token, repo
              name, secret key)
            </li>
            <li>
              Sign up for{' '}
              <A href="https://postmarkapp.com">Postmark</A>, create a server,
              and set the inbound webhook URL to{' '}
              <code className="text-[12px] bg-stone-100 px-1.5 py-0.5 rounded">
                your-app.vercel.app/api/email?token=YOUR_SECRET
              </code>
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
            <code className="text-[12px] bg-stone-100 px-1.5 py-0.5 rounded">
              claude
            </code>{' '}
            in your vault, and type{' '}
            <code className="text-[12px] bg-stone-100 px-1.5 py-0.5 rounded">
              /daily-kickoff
            </code>
            .
          </p>
          <p>
            From there, you build. Add more commands. Integrate your tools.
            Connect your calendar. The system grows with you.
          </p>
        </Step>
      </Section>

      {/* How Tim built it */}
      <Section title="How I built this">
        <p className="text-[13px] text-stone-600 leading-relaxed mb-4">
          I started with a blank Obsidian vault and Claude Code in February
          2026. I&apos;m not a developer — I&apos;m an executive coach. But
          Claude Code lets you build real software through conversation.
        </p>
        <p className="text-[13px] text-stone-600 leading-relaxed mb-4">
          The first thing I built was a daily kickoff ceremony — a morning
          prompt that reviews my day, checks my projects, and asks me what I
          want to focus on. That single command changed how I work.
        </p>
        <p className="text-[13px] text-stone-600 leading-relaxed mb-4">
          From there I added an evening reflection, a weekly review, and then
          started connecting external tools — my coaching platform, my
          invoicing system, email forwarding. Each piece took a conversation
          or two with Claude.
        </p>
        <p className="text-[13px] text-stone-600 leading-relaxed mb-4">
          The whole system is still evolving. I build a little each week,
          always in service of the actual work — not as a project for its own
          sake.
        </p>
        <p className="text-[13px] text-stone-500 italic">
          I&apos;m still building this. Check back — this page will grow as
          the system does.
        </p>
      </Section>

      {/* FAQ */}
      <Section title="Common questions">
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
      </Section>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-stone-200/60">
        <p className="text-[11px] text-stone-400">
          Built by{' '}
          <A href="https://timnoakesmith.com">Tim Noakesmith</A> with Claude
          Code. Open source on{' '}
          <A href="https://github.com/Noakesmith/pepper-potts">GitHub</A>.
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

function A({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
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
    <div className="mb-8 pb-8 border-b border-stone-100 last:border-0">
      <div className="flex items-baseline gap-3 mb-3">
        <span className="text-[11px] font-medium bg-stone-900 text-white w-5 h-5 rounded-full flex items-center justify-center shrink-0 relative top-0.5">
          {number}
        </span>
        <h3 className="text-[15px] font-medium text-stone-900">{title}</h3>
      </div>
      <div className="pl-8 space-y-3 text-[13px] text-stone-600 leading-relaxed">
        {children}
      </div>
    </div>
  )
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <pre className="bg-stone-100 rounded-lg px-4 py-3 text-[12px] text-stone-700 font-mono overflow-x-auto">
      {children}
    </pre>
  )
}

function HowRow({
  icon,
  title,
  desc,
}: {
  icon: string
  title: string
  desc: string
}) {
  return (
    <div className="flex gap-3 py-3 border-b border-stone-100">
      <span className="text-[11px] font-medium bg-stone-200 text-stone-600 w-5 h-5 rounded-full flex items-center justify-center shrink-0 relative top-0.5">
        {icon}
      </span>
      <div>
        <div className="text-[13px] font-medium text-stone-900">{title}</div>
        <div className="text-[12px] text-stone-500 mt-0.5">{desc}</div>
      </div>
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
    <div className="flex items-center justify-between py-3 border-b border-stone-100">
      <div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] text-stone-900 hover:underline underline-offset-2"
        >
          {name}
        </a>
        <div className="text-[11px] text-stone-400 mt-0.5">{desc}</div>
      </div>
      <span className="text-[11px] text-stone-400 shrink-0 ml-4">{cost}</span>
    </div>
  )
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div className="py-3 border-b border-stone-100">
      <div className="text-[13px] font-medium text-stone-900">{q}</div>
      <div className="text-[12px] text-stone-500 mt-1 leading-relaxed">
        {a}
      </div>
    </div>
  )
}
