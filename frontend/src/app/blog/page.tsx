import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Devlog" };

const POSTS = [
  {
    slug: "building-buildwithvickyvs",
    title: "Building buildwithvickyvs.ai — Stack Decisions & Architecture",
    excerpt: "Why I chose Next.js + FastAPI + Supabase, how I structured the monorepo, Docker CI/CD, and what I learned shipping v1.",
    category: "Devlog",
    tags: ["Next.js", "FastAPI", "Docker"],
    read_time: 8,
    views: 0,
    published_at: new Date().toISOString(),
  },
  {
    slug: "fastapi-async-sqlalchemy",
    title: "FastAPI + Async SQLAlchemy — Production Patterns",
    excerpt: "Session management, dependency injection, connection pooling, and the async pitfalls I hit so you don't have to.",
    category: "Backend",
    tags: ["Python", "FastAPI", "SQLAlchemy"],
    read_time: 6,
    views: 0,
    published_at: new Date().toISOString(),
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="mb-12">
        <p className="section-label mb-2">Writing</p>
        <h1 className="section-title">Devlog</h1>
        <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
          Build logs, architecture breakdowns, and things I learned the hard way.
        </p>
      </div>

      <div className="space-y-4">
        {POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="card p-6 block group"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="tag">{post.category}</span>
            </div>
            <h2
              className="text-lg font-semibold mb-2 group-hover:text-teal-400 transition-colors"
              style={{ color: "var(--text-bright)", fontFamily: "var(--font-display)" }}
            >
              {post.title}
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              {post.excerpt}
            </p>
            <div
              className="flex items-center gap-4 text-xs"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
            >
              <span>{post.published_at ? formatDate(post.published_at) : ""}</span>
              <span className="flex items-center gap-1"><Clock size={11} /> {post.read_time} min</span>
              <span className="flex items-center gap-1"><Eye size={11} /> {post.views}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
