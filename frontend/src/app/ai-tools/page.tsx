"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, FileText, Code, Database, Terminal, FileSearch } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";

interface Msg { role: "user" | "assistant"; text: string }

const TOOLS = [
  { icon: FileText,   title: "PDF Summarizer",  desc: "Upload PDF → AI summary + key points",     status: "soon" },
  { icon: Code,       title: "Code Explainer",   desc: "Paste code → plain-English explanation",    status: "soon" },
  { icon: Database,   title: "SQL Helper",       desc: "Describe query in English → get SQL",       status: "soon" },
  { icon: Terminal,   title: "Linux Helper",     desc: "Ask any Linux command — instant answer",    status: "soon" },
  { icon: FileSearch, title: "Resume Analyzer",  desc: "Upload resume → ATS score + tips",          status: "soon" },
];

export default function AIToolsPage() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", text: "Hi! I'm Vicky's AI assistant. Ask me anything about the platform, coding, AI, or anything else 🚀" },
  ]);
  const [input, setInput]   = useState("");
  const [convId, setConvId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMsgs((m) => [...m, { role: "user", text }]);
    setLoading(true);
    try {
      const res = await api.ai.chat(text, convId);
      setConvId(res.conversation_id);
      setMsgs((m) => [...m, { role: "assistant", text: res.reply }]);
    } catch {
      toast.error("Backend not connected. Start the FastAPI server.");
      setMsgs((m) => [...m, { role: "assistant", text: "⚠️ Backend offline. Run `docker-compose up` locally." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="mb-10">
        <p className="section-label mb-2">AI Lab</p>
        <h1 className="section-title">AI Tools</h1>
        <p className="text-sm mt-2 max-w-lg" style={{ color: "var(--text-muted)" }}>
          Practical AI utilities. The chatbot is live — more tools coming soon.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Chatbot */}
        <div className="card overflow-hidden flex flex-col" style={{ height: 520 }}>
          {/* Header */}
          <div
            className="flex items-center gap-3 px-5 py-4"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "var(--brand-dim)", border: "1px solid var(--brand-border)" }}
            >
              <Bot size={15} style={{ color: "var(--brand)" }} />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--text-bright)" }}>AI Assistant</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>GPT-4o-mini</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-xs text-teal-400">Live</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[80%] px-4 py-2.5 rounded-xl text-sm leading-relaxed"
                  style={
                    m.role === "user"
                      ? { background: "var(--brand)", color: "#090e1a" }
                      : { background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)" }
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div
                  className="px-4 py-2.5 rounded-xl text-sm"
                  style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
                >
                  <span className="text-teal-400 animate-pulse">Thinking…</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-4 flex gap-2" style={{ borderTop: "1px solid var(--border)" }}>
            <input
              className="input flex-1"
              type="text"
              placeholder="Ask anything…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <button onClick={send} disabled={loading} className="btn-primary px-4 disabled:opacity-50">
              <Send size={14} />
            </button>
          </div>
        </div>

        {/* Tool cards */}
        <div className="space-y-3">
          <p className="section-label mb-4">More Tools</p>
          {TOOLS.map(({ icon: Icon, title, desc, status }) => (
            <div
              key={title}
              className="card p-4 flex items-center gap-4"
              style={{ opacity: status === "soon" ? 0.65 : 1 }}
            >
              <div
                className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center"
                style={{ background: "var(--brand-dim)", border: "1px solid var(--brand-border)" }}
              >
                <Icon size={15} style={{ color: "var(--brand)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium" style={{ color: "var(--text-bright)" }}>{title}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{desc}</p>
              </div>
              <span
                className="text-xs px-2 py-0.5 rounded flex-shrink-0"
                style={{
                  background: "rgba(251,146,60,0.12)",
                  color: "#fb923c",
                  border: "1px solid rgba(251,146,60,0.25)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                Soon
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
