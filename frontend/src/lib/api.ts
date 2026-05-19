const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.detail ?? `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  health: () => req<{ status: string }>("/api/v1/health"),

  projects: {
    list: (params?: { category?: string; featured?: boolean }) => {
      const q = new URLSearchParams();
      if (params?.category) q.set("category", params.category);
      if (params?.featured !== undefined) q.set("featured", String(params.featured));
      return req<Project[]>(`/api/v1/projects?${q}`);
    },
    get: (slug: string) => req<Project>(`/api/v1/projects/${slug}`),
  },

  blog: {
    list: (params?: { category?: string; limit?: number }) => {
      const q = new URLSearchParams();
      if (params?.category) q.set("category", params.category);
      if (params?.limit) q.set("limit", String(params.limit));
      return req<BlogSummary[]>(`/api/v1/blog?${q}`);
    },
    get: (slug: string) => req<BlogPost>(`/api/v1/blog/${slug}`),
  },

  contact: (payload: ContactPayload) =>
    req<{ success: boolean; message: string }>("/api/v1/contact", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  ai: {
    chat: (message: string, conversation_id?: string) =>
      req<{ reply: string; conversation_id: string }>("/api/v1/ai/chat", {
        method: "POST",
        body: JSON.stringify({ message, conversation_id }),
      }),
  },
};

// ── Types ─────────────────────────────────────────────────────────────────────
export interface Project {
  id: string; title: string; slug: string; description: string;
  category: string; tags: string[]; github_url?: string; demo_url?: string;
  image_url?: string; featured: boolean; created_at: string;
}

export interface BlogSummary {
  id: string; title: string; slug: string; excerpt?: string;
  category: string; tags: string[]; views: number; read_time: number;
  created_at: string; published_at?: string;
}

export interface BlogPost extends BlogSummary {
  content: string;
}

export interface ContactPayload {
  name: string; email: string; subject?: string; message: string;
}
