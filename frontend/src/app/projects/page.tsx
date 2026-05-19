"use client";

import { useState } from "react";
import { Github, ExternalLink, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

const CATS = ["All", "AI", "Web", "Game", "Tool"] as const;

const PROJECTS = [
  { title: "buildwithvickyvs.ai", slug: "platform", desc: "Full-stack personal platform — Next.js + FastAPI + PostgreSQL.", category: "Web",  tags: ["Next.js","FastAPI","PostgreSQL","Docker"], github: "#", demo: "/",          featured: true  },
  { title: "AI Chat Assistant",   slug: "ai-chat",  desc: "Context-aware chatbot with streaming and conversation history.",  category: "AI",   tags: ["OpenAI","FastAPI","React"],              github: "#", demo: "/ai-tools",  featured: true  },
  { title: "PDF Summarizer",      slug: "pdf",      desc: "Drag-and-drop PDF → AI summary via LangChain + GPT-4.",          category: "AI",   tags: ["LangChain","Python","React"],            github: "#", demo: "/ai-tools",  featured: false },
  { title: "SQL Helper",          slug: "sql",      desc: "Describe a query in English → get optimised SQL.",               category: "Tool", tags: ["OpenAI","FastAPI","React"],              github: "#", demo: "/ai-tools",  featured: false },
  { title: "Code Explainer",      slug: "code",     desc: "Paste code → plain-English explanation powered by GPT.",          category: "Tool", tags: ["OpenAI","React"],                        github: "#", demo: "/ai-tools",  featured: false },
  { title: "Snake Game",          slug: "snake",    desc: "Classic Snake with smooth canvas rendering and high score.",      category: "Game", tags: ["React","Canvas","TypeScript"],           github: "#", demo: "/games",     featured: false },
  { title: "Typing Speed Test",   slug: "typing",   desc: "Measure your WPM in real-time with accuracy tracking.",          category: "Game", tags: ["React","TypeScript"],                    github: "#", demo: "/games",     featured: false },
];

export default function ProjectsPage() {
  const [cat, setCat] = useState<string>("All");
  const [q, setQ]     = useState("");

  const shown = PROJECTS.filter((p) => {
    const matchCat = cat === "All" || p.category === cat;
    const matchQ   = !q || p.title.toLowerCase().includes(q.toLowerCase()) ||
                     p.tags.some((t) => t.toLowerCase().includes(q.toLowerCase()));
    return matchCat && matchQ;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="mb-10">
        <p className="section-label mb-2">Work</p>
        <h1 className="section-title">Projects</h1>
        <p className="text-sm mt-2 max-w-lg" style={{ color: "var(--text-muted)" }}>
          Everything I&apos;ve built — AI tools, web apps, games, and experiments.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="flex gap-2 flex-wrap">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all",
                cat === c
                  ? "bg-teal-500 text-[#090e1a]"
                  : "text-slate-400 border border-white/10 hover:text-slate-200 hover:border-white/20"
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="relative sm:ml-auto">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="input pl-8 w-full sm:w-52"
          />
        </div>
      </div>

      {/* Grid */}
      {shown.length === 0 ? (
        <div className="text-center py-24" style={{ color: "var(--text-muted)" }}>
          <p>No projects match that filter.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {shown.map((p) => (
            <div key={p.slug} className="card p-6 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <span className="tag">{p.category}</span>
                {p.featured && (
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(20,184,166,0.12)",
                      color: "var(--brand)",
                      border: "1px solid var(--brand-border)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    Featured
                  </span>
                )}
              </div>
              <h3
                className="font-semibold mb-2"
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
              <div className="flex gap-4">
                <a href={p.github} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-1.5 text-xs transition-colors hover:text-teal-400"
                   style={{ color: "var(--text-muted)" }}>
                  <Github size={13} /> Source
                </a>
                <a href={p.demo}
                   className="flex items-center gap-1.5 text-xs transition-colors hover:text-teal-400"
                   style={{ color: "var(--text-muted)" }}>
                  <ExternalLink size={13} /> Demo
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
