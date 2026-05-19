"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

const METHODS = ["GET", "POST", "PUT", "DELETE"] as const;
const QUICK   = ["/api/v1/health", "/api/v1/projects", "/api/v1/blog"];
const BASE    = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export default function PlaygroundPage() {
  const [method,   setMethod]   = useState<string>("GET");
  const [endpoint, setEndpoint] = useState("/api/v1/health");
  const [body,     setBody]     = useState("");
  const [res,      setRes]      = useState<{ status: number; data: unknown } | null>(null);
  const [loading,  setLoading]  = useState(false);
  const [err,      setErr]      = useState("");

  const run = async () => {
    setLoading(true); setErr(""); setRes(null);
    try {
      const r = await fetch(`${BASE}${endpoint}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: method !== "GET" && body ? body : undefined,
      });
      const data = await r.json();
      setRes({ status: r.status, data });
    } catch (e: unknown) {
      setErr((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="mb-10">
        <p className="section-label mb-2">Lab</p>
        <h1 className="section-title">Playground</h1>
        <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
          Live API sandbox — test any backend endpoint directly from the browser.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Request panel */}
        <div className="card p-6 space-y-4">
          <p className="section-label">Request</p>

          {/* Method + endpoint */}
          <div className="flex gap-2">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="input w-28 flex-shrink-0"
              style={{ color: "var(--brand)" }}
            >
              {METHODS.map((m) => <option key={m}>{m}</option>)}
            </select>
            <input
              className="input flex-1"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              placeholder="/api/v1/..."
              style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}
            />
          </div>

          {/* Body (non-GET) */}
          {method !== "GET" && (
            <textarea
              className="input resize-none"
              rows={5}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder='{"key": "value"}'
              style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}
            />
          )}

          <button onClick={run} disabled={loading} className="btn-primary w-full justify-center disabled:opacity-50">
            <Play size={13} /> {loading ? "Running…" : "Run"}
          </button>

          {/* Quick picks */}
          <div>
            <p className="text-xs mb-2" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              Quick endpoints:
            </p>
            <div className="flex flex-wrap gap-2">
              {QUICK.map((ep) => (
                <button
                  key={ep}
                  onClick={() => { setEndpoint(ep); setMethod("GET"); }}
                  className={cn(
                    "tag cursor-pointer hover:border-teal-400 transition-colors",
                    endpoint === ep && "border-teal-400"
                  )}
                  style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem" }}
                >
                  {ep}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Response panel */}
        <div className="card p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <p className="section-label">Response</p>
            {res && (
              <span
                className="text-xs px-2 py-0.5 rounded"
                style={{
                  background: res.status < 300 ? "rgba(20,184,166,0.12)" : "rgba(239,68,68,0.12)",
                  color:      res.status < 300 ? "var(--brand)" : "#ef4444",
                  border:     `1px solid ${res.status < 300 ? "var(--brand-border)" : "rgba(239,68,68,0.3)"}`,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {res.status}
              </span>
            )}
          </div>
          <pre
            className="flex-1 text-xs overflow-auto"
            style={{
              color: err ? "#ef4444" : "var(--text)",
              fontFamily: "var(--font-mono)",
              minHeight: "280px",
            }}
          >
            {err
              ? `Error: ${err}`
              : res
              ? JSON.stringify(res.data, null, 2)
              : "// Hit Run to see the response"}
          </pre>
        </div>
      </div>
    </div>
  );
}
