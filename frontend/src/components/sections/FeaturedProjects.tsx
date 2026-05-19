import Link from "next/link";
import { ArrowRight, Github, ExternalLink } from "lucide-react";

const PROJECTS = [
  {
    title: "buildwithvickyvs.ai",
    desc: "This platform — full-stack digital lab built with Next.js + FastAPI + PostgreSQL. Modular and always growing.",
    tags: ["Next.js", "FastAPI", "PostgreSQL", "Docker"],
    category: "Platform",
    github: "https://github.com/vickyvs",
    demo: "/",
  },
  {
    title: "AI Chat Assistant",
    desc: "Context-aware chatbot powered by OpenAI with streaming responses, conversation history, and demo mode.",
    tags: ["OpenAI", "FastAPI", "React", "WebSockets"],
    category: "AI",
    github: "https://github.com/vickyvs",
    demo: "/ai-tools",
  },
  {
    title: "PDF Summarizer",
    desc: "Upload any PDF and get an AI-powered summary + key points in seconds. Built with LangChain + GPT-4.",
    tags: ["LangChain", "Python", "Next.js", "OpenAI"],
    category: "AI",
    github: "https://github.com/vickyvs",
    demo: "/ai-tools",
  },
];

export function FeaturedProjects() {
  return (
    <section className="py-24" style={{ background: "rgba(255,255,255,0.01)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-label mb-2">Projects</p>
            <h2 className="section-title">Featured work</h2>
          </div>
          <Link
            href="/projects"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-teal-400 hover:underline"
          >
            All projects <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {PROJECTS.map((p) => (
            <div key={p.title} className="card p-6 flex flex-col">
              <span className="tag w-fit mb-4">{p.category}</span>
              <h3
                className="text-base font-semibold mb-2"
                style={{ color: "var(--text-bright)", fontFamily: "var(--font-display)" }}
              >
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: "var(--text-muted)" }}>
                {p.desc}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
              <div className="flex gap-4 mt-auto">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs transition-colors hover:text-teal-400"
                  style={{ color: "var(--text-muted)" }}
                >
                  <Github size={13} /> Source
                </a>
                <Link
                  href={p.demo}
                  className="flex items-center gap-1.5 text-xs transition-colors hover:text-teal-400"
                  style={{ color: "var(--text-muted)" }}
                >
                  <ExternalLink size={13} /> Demo
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 sm:hidden">
          <Link href="/projects" className="btn-ghost w-full justify-center">
            All projects <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
