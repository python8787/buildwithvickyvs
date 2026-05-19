import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, Terminal } from "lucide-react";

const NAV = ["/projects", "/blog", "/ai-tools", "/games", "/playground"];
const SOCIAL = [
  { icon: Github,   href: "https://github.com/vickyvs",       label: "GitHub" },
  { icon: Twitter,  href: "https://twitter.com/vickyvs",      label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/in/vickyvs",  label: "LinkedIn" },
  { icon: Mail,     href: "mailto:hello@buildwithvickyvs.ai", label: "Email" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

          {/* Brand */}
          <div className="sm:col-span-2">
            <Link href="/" className="flex items-center gap-2 w-fit mb-3">
              <Terminal size={15} style={{ color: "var(--brand)" }} />
              <span className="text-sm font-bold">
                <span className="brand-text">buildwith</span>
                <span style={{ color: "var(--text-muted)" }}>vickyvs.ai</span>
              </span>
            </Link>
            <p className="text-sm max-w-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
              A living digital lab. Building AI tools, projects, and experiments in public.
            </p>
            <div className="flex gap-2 mt-4">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:text-teal-400"
                  style={{
                    border: "1px solid var(--border)",
                    color: "var(--text-muted)",
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="section-label mb-3">Explore</p>
            <ul className="space-y-2">
              {NAV.map((href) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm transition-colors hover:text-teal-400 capitalize"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {href.slice(1).replace("-", " ")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
            © {new Date().getFullYear()} buildwithvickyvs.ai
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <p className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              Next.js · FastAPI · PostgreSQL
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
