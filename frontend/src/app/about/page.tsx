import type { Metadata } from "next";
import Link from "next/link";
import {
  Terminal, Layers, BookOpen, Wrench, Gamepad2,
  FlaskConical, User, Rocket, Github,
} from "lucide-react";

export const metadata: Metadata = { title: "About – buildwithvickyvs.ai" };

const PAGES = [
  {
    icon: Layers,
    href: "/projects",
    label: "Projects",
    desc: "A showcase of things built — personal tools, AI experiments, side products, and open-source work. Each entry covers what it does, why it was built, and the tech behind it.",
  },
  {
    icon: BookOpen,
    href: "/blog",
    label: "Devlog",
    desc: "A running journal of builds, decisions, bugs, and lessons. Less polished article, more honest log of what it actually looks like to ship things.",
  },
  {
    icon: Wrench,
    href: "/ai-tools",
    label: "AI Tools",
    desc: "Live, usable AI-powered utilities built on top of LLMs and APIs. Things that solve real problems — text processing, data extraction, smart assistants, and more.",
  },
  {
    icon: Gamepad2,
    href: "/games",
    label: "Games",
    desc: "Mini games built from scratch — Snake, typing speed tests, memory match, and code puzzles. A low-stakes space to experiment with canvas, state, and interactivity.",
  },
  {
    icon: FlaskConical,
    href: "/playground",
    label: "Playground",
    desc: "Rough demos, UI experiments, and proof-of-concept ideas that aren't ready for the Projects page yet. Work in progress, always.",
  },
  {
    icon: User,
    href: "/profile",
    label: "Profile",
    desc: "Vignesh's professional background — work experience, skills, education, certifications, and a downloadable resume. The person behind the site.",
  },
];

const STACK = [
  { layer: "Frontend",  items: ["Next.js 14", "TypeScript", "Tailwind CSS"] },
  { layer: "Backend",   items: ["FastAPI", "Python", "PostgreSQL"] },
  { layer: "AI",        items: ["OpenAI API", "LangChain", "Hugging Face"] },
  { layer: "Infra",     items: ["Docker", "AWS", "Vercel"] },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

      {/* Header */}
      <div className="mb-12">
        <p className="section-label mb-2">About this site</p>
        <h1 className="section-title">buildwithvickyvs.ai</h1>
        <p className="mt-4 text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          A living digital lab — built to ship things, learn in public, and keep everything in one place.
        </p>
      </div>

      {/* Why */}
      <div className="card p-7 mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Rocket size={15} style={{ color: "var(--brand)" }} />
          <p className="section-label">Why this site exists</p>
        </div>
        <div className="space-y-3" style={{ color: "var(--text)" }}>
          <p className="leading-relaxed">
            Most portfolios are static. A list of past work, a few links, a contact form.
            This site is different — it&apos;s meant to be used, not just browsed.
          </p>
          <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Every page is a working product: real AI tools, playable games, an honest devlog.
            The goal is to build useful things in public and document the process honestly —
            including the parts that don&apos;t work first time.
          </p>
          <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>
            It&apos;s also a technical playground. The stack, the design, the backend — all of it
            is built and maintained by{" "}
            <Link href="/profile" className="text-teal-400 hover:underline">Vignesh Udhayakumar</Link>,
            a backend and AI engineer based in Bangalore.
          </p>
        </div>
      </div>

      {/* Pages */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-5">
          <Terminal size={14} style={{ color: "var(--brand)" }} />
          <p className="section-label">What&apos;s inside</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {PAGES.map(({ icon: Icon, href, label, desc }) => (
            <Link key={href} href={href} className="card p-5 hover:border-teal-400/30 transition-colors group">
              <div className="flex items-center gap-2 mb-2">
                <Icon size={14} className="text-teal-400" />
                <span
                  className="font-semibold text-sm group-hover:text-teal-400 transition-colors"
                  style={{ color: "var(--text-bright)" }}
                >
                  {label}
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Stack */}
      <div className="card p-7 mb-10">
        <p className="section-label mb-5">Tech stack</p>
        <div className="grid sm:grid-cols-2 gap-5">
          {STACK.map(({ layer, items }) => (
            <div key={layer}>
              <p className="text-xs font-medium text-teal-400 mb-2">{layer}</p>
              <div className="flex flex-wrap gap-1.5">
                {items.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="flex flex-wrap gap-3">
        <a
          href="https://github.com/python8787"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost text-sm gap-2"
        >
          <Github size={14} /> View on GitHub
        </a>
        <Link href="/profile" className="btn-primary text-sm gap-2">
          <User size={14} /> Meet the builder
        </Link>
      </div>
    </div>
  );
}
