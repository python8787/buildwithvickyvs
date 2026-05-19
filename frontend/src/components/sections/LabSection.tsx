import Link from "next/link";
import { Bot, Gamepad2, FlaskConical, BookOpen, ArrowRight } from "lucide-react";

const ITEMS = [
  {
    icon: Bot,
    title: "AI Tools",
    desc: "Chatbot, PDF summarizer, code explainer, SQL helper — and more coming.",
    href: "/ai-tools",
    color: "#14b8a6",
  },
  {
    icon: Gamepad2,
    title: "Mini Games",
    desc: "Browser-based games: Snake, typing speed test, memory match, coding quiz.",
    href: "/games",
    color: "#818cf8",
  },
  {
    icon: FlaskConical,
    title: "Playground",
    desc: "Live API sandbox. Test any endpoint, explore the backend, experiment freely.",
    href: "/playground",
    color: "#fb923c",
  },
  {
    icon: BookOpen,
    title: "Devlog",
    desc: "Architecture writeups, build stories, and things I learned the hard way.",
    href: "/blog",
    color: "#f472b6",
  },
];

export function LabSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="section-label mb-2">The Lab</p>
          <h2 className="section-title">Explore the platform</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ITEMS.map(({ icon: Icon, title, desc, href, color }) => (
            <Link
              key={title}
              href={href}
              className="card p-6 flex flex-col gap-4 group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: `${color}18`,
                  border: `1px solid ${color}30`,
                }}
              >
                <Icon size={18} style={{ color }} />
              </div>
              <div>
                <h3
                  className="font-semibold mb-1"
                  style={{ color: "var(--text-bright)", fontFamily: "var(--font-display)" }}
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {desc}
                </p>
              </div>
              <div
                className="mt-auto flex items-center gap-1 text-xs font-medium"
                style={{ color }}
              >
                Explore{" "}
                <ArrowRight
                  size={12}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
