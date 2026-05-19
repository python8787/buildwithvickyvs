"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/",           label: "Home" },
  { href: "/about",      label: "About" },
  { href: "/profile",    label: "Profile" },
  { href: "/projects",   label: "Projects" },
  { href: "/blog",       label: "Devlog" },
  { href: "/ai-tools",   label: "AI Tools" },
  { href: "/games",      label: "Games" },
  { href: "/playground", label: "Playground" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--brand-dim)", border: "1px solid var(--brand-border)" }}
            >
              <Terminal size={15} style={{ color: "var(--brand)" }} />
            </div>
            <span className="text-sm font-bold tracking-tight hidden sm:block">
              <span className="brand-text">buildwith</span>
              <span style={{ color: "var(--text-muted)" }}>vickyvs.ai</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive(href)
                    ? "text-teal-400 bg-teal-400/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* GitHub CTA */}
          <a
            href="https://github.com/vickyvs"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost hidden md:inline-flex text-xs py-2 px-4"
          >
            GitHub
          </a>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t px-4 py-3 space-y-1" style={{ borderColor: "var(--border)" }}>
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                "block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive(href)
                  ? "text-teal-400 bg-teal-400/10"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              )}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
