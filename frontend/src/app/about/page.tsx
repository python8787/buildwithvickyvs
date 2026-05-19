import type { Metadata } from "next";
import { MapPin, Briefcase, GraduationCap, Github, Linkedin, Mail } from "lucide-react";

export const metadata: Metadata = { title: "About" };

const EXPERIENCE = [
  {
    role: "Full-Stack Developer",
    company: "Self / Freelance",
    period: "2023 – Present",
    desc: "Building AI-powered products, tools, and personal projects full-time.",
  },
  {
    role: "Backend Developer",
    company: "Previous Company",
    period: "2021 – 2023",
    desc: "Python/FastAPI microservices, REST APIs, PostgreSQL, CI/CD pipelines.",
  },
];

const EDUCATION = [
  { degree: "B.E. Computer Science", school: "Your University", year: "2021" },
];

const INTERESTS = [
  "AI / ML engineering", "Developer tooling", "Open source",
  "Building in public", "System design", "Indie hacking",
];

const TECH = [
  "Python", "TypeScript", "Next.js", "FastAPI",
  "PostgreSQL", "Docker", "OpenAI API", "LangChain",
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="mb-12">
        <p className="section-label mb-2">About</p>
        <h1 className="section-title">Hey, I&apos;m Vicky 👋</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {/* Bio column */}
        <div className="md:col-span-2 space-y-6">
          <p className="leading-relaxed" style={{ color: "var(--text)" }}>
            I&apos;m a full-stack developer focused on AI tools and developer experiences.
            I built <strong style={{ color: "var(--brand)" }}>buildwithvickyvs.ai</strong> as a
            living digital lab — a place to ship things, learn in public, and collect everything I build.
          </p>
          <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>
            My stack is Python, TypeScript, Next.js, FastAPI, and PostgreSQL. I&apos;m interested in making
            AI practical and accessible through well-designed tools. When I&apos;m not coding,
            I&apos;m writing devlogs, playing games I built, or reading about system design.
          </p>

          {/* Experience */}
          <div className="pt-4">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase size={14} style={{ color: "var(--brand)" }} />
              <p className="section-label">Experience</p>
            </div>
            <div className="space-y-3">
              {EXPERIENCE.map((e) => (
                <div key={e.role} className="card p-4">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <span className="font-semibold text-sm" style={{ color: "var(--text-bright)" }}>{e.role}</span>
                    <span className="text-xs flex-shrink-0" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{e.period}</span>
                  </div>
                  <p className="text-xs mb-1 text-teal-400">{e.company}</p>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>{e.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap size={14} style={{ color: "var(--brand)" }} />
              <p className="section-label">Education</p>
            </div>
            {EDUCATION.map((e) => (
              <div key={e.degree} className="card p-4">
                <p className="font-semibold text-sm" style={{ color: "var(--text-bright)" }}>{e.degree}</p>
                <p className="text-xs text-teal-400 mt-0.5">{e.school} · {e.year}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="card p-5 space-y-3">
            {[
              { icon: MapPin, text: "India" },
              { icon: Briefcase, text: "Full-Stack + AI" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5 text-sm" style={{ color: "var(--text-muted)" }}>
                <Icon size={14} className="text-teal-400 flex-shrink-0" />
                {text}
              </div>
            ))}
          </div>

          <div className="card p-5">
            <p className="section-label mb-3">Core Tech</p>
            <div className="flex flex-wrap gap-1.5">
              {TECH.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>

          <div className="card p-5">
            <p className="section-label mb-3">Interests</p>
            <div className="flex flex-wrap gap-1.5">
              {INTERESTS.map((i) => <span key={i} className="tag">{i}</span>)}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <a href="https://github.com/vickyvs" target="_blank" rel="noopener noreferrer" className="btn-ghost justify-center text-sm">
              <Github size={14} /> GitHub
            </a>
            <a href="https://linkedin.com/in/vickyvs" target="_blank" rel="noopener noreferrer" className="btn-ghost justify-center text-sm">
              <Linkedin size={14} /> LinkedIn
            </a>
            <a href="mailto:hello@buildwithvickyvs.ai" className="btn-primary justify-center text-sm">
              <Mail size={14} /> Say Hello
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
