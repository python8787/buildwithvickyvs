const SKILLS: Record<string, string[]> = {
  Languages:  ["Python", "TypeScript", "JavaScript", "SQL", "Bash"],
  Frontend:   ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
  Backend:    ["FastAPI", "Node.js", "REST APIs", "WebSockets"],
  "AI / ML":  ["OpenAI API", "LangChain", "PyTorch", "scikit-learn"],
  Database:   ["PostgreSQL", "Supabase", "Redis", "SQLAlchemy"],
  DevOps:     ["Docker", "GitHub Actions", "Vercel", "Render"],
};

export function SkillsSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="section-label mb-2">Tech Stack</p>
          <h2 className="section-title">What I work with</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(SKILLS).map(([cat, items]) => (
            <div key={cat} className="card p-4">
              <p
                className="text-xs mb-3 uppercase tracking-wider"
                style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
              >
                {cat}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {items.map((s) => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
