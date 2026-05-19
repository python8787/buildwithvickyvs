"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Github, Zap } from "lucide-react";

const TYPED = [
  "AI tools & experiments",
  "full-stack web apps",
  "ML demos & pipelines",
  "browser mini-games",
  "developer utilities",
];

export function HeroSection() {
  const [display, setDisplay] = useState("");
  const [si, setSi] = useState(0);
  const [ci, setCi] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = TYPED[si];
    const delay = deleting ? 35 : ci === word.length ? 2000 : 75;

    const t = setTimeout(() => {
      if (!deleting && ci < word.length) {
        setDisplay(word.slice(0, ci + 1));
        setCi((c) => c + 1);
      } else if (!deleting && ci === word.length) {
        setDeleting(true);
      } else if (deleting && ci > 0) {
        setDisplay(word.slice(0, ci - 1));
        setCi((c) => c - 1);
      } else {
        setDeleting(false);
        setSi((s) => (s + 1) % TYPED.length);
      }
    }, delay);

    return () => clearTimeout(t);
  }, [ci, deleting, si]);

  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(20,184,166,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Radial glow */}
      <div
        className="absolute right-0 top-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(20,184,166,0.08) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="max-w-3xl">

          {/* Status pill */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs mb-8"
            style={{
              background: "var(--brand-dim)",
              border: "1px solid var(--brand-border)",
              color: "var(--brand)",
              fontFamily: "var(--font-mono)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            v1.0 · building in public
          </div>

          {/* Headline */}
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-5"
            style={{ fontFamily: "var(--font-display)", color: "var(--text-bright)" }}
          >
            Hi, I&apos;m{" "}
            <span className="brand-text">Vicky VS</span>
          </h1>

          {/* Typewriter */}
          <p
            className="text-lg sm:text-xl mb-4"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
          >
            {"// I build "}
            <span style={{ color: "var(--brand)" }}>
              {display}
              <span className="animate-pulse">▋</span>
            </span>
          </p>

          <p className="text-base leading-relaxed max-w-xl mb-10" style={{ color: "var(--text-muted)" }}>
            This is my digital lab — a living platform where I ship AI tools, web projects,
            experiments, and devlogs. Always something new being built.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link href="/projects" className="btn-primary">
              View Projects <ArrowRight size={15} />
            </Link>
            <Link href="/ai-tools" className="btn-ghost">
              <Zap size={15} /> Try AI Tools
            </Link>
            <a
              href="https://github.com/vickyvs"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <Github size={15} /> GitHub
            </a>
          </div>

          {/* Stats */}
          <div
            className="flex flex-wrap gap-8 mt-16 pt-8"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            {[
              { label: "Projects",  value: "10+" },
              { label: "Blog Posts", value: "5+"  },
              { label: "AI Tools",  value: "6"    },
              { label: "Mini Games", value: "4"   },
            ].map(({ label, value }) => (
              <div key={label}>
                <div
                  className="text-3xl font-bold brand-text"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {value}
                </div>
                <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
