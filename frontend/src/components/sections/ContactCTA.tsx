"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";

export function ContactCTA() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.contact({ ...form, subject: "Message from buildwithvickyvs.ai" });
      setSent(true);
      toast.success("Message sent! I'll reply soon 🙌");
    } catch {
      toast.error("Failed to send. Email me directly instead.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24" style={{ background: "rgba(255,255,255,0.01)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-10">
            <p className="section-label mb-2">Contact</p>
            <h2 className="section-title">Let&apos;s build something</h2>
            <p className="text-sm mt-3" style={{ color: "var(--text-muted)" }}>
              Have an idea, want to collaborate, or just want to say hi?
            </p>
          </div>

          <div className="card p-8">
            {sent ? (
              <div className="text-center py-8">
                <CheckCircle size={44} className="mx-auto mb-4 text-teal-400" />
                <p className="font-semibold" style={{ color: "var(--text-bright)" }}>Message received!</p>
                <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>I&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <input
                  className="input"
                  type="text"
                  placeholder="Your name"
                  required
                  value={form.name}
                  onChange={set("name")}
                />
                <input
                  className="input"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={form.email}
                  onChange={set("email")}
                />
                <textarea
                  className="input resize-none"
                  rows={4}
                  placeholder="What's on your mind?"
                  required
                  value={form.message}
                  onChange={set("message")}
                />
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                  {loading ? "Sending…" : <><Send size={14} /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
