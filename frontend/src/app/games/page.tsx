"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Gamepad2, RefreshCw, ArrowLeft } from "lucide-react";

// ── Snake ─────────────────────────────────────────────────────────────────────
const G = 20, S = 20;
type P = { x: number; y: number };
type D = "UP" | "DOWN" | "LEFT" | "RIGHT";
const OPP: Record<D, D> = { UP: "DOWN", DOWN: "UP", LEFT: "RIGHT", RIGHT: "LEFT" };
const rand = (snake: P[]): P => {
  let p: P;
  do { p = { x: Math.floor(Math.random() * G), y: Math.floor(Math.random() * G) }; }
  while (snake.some((s) => s.x === p.x && s.y === p.y));
  return p;
};

function Snake() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [best, setBest]   = useState(0);
  const [over, setOver]   = useState(false);
  const [going, setGoing] = useState(false);
  const st = useRef({ snake: [{ x: 10, y: 10 }], dir: "RIGHT" as D, next: "RIGHT" as D, food: { x: 15, y: 10 }, score: 0 });

  const draw = useCallback(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    const { snake, food } = st.current;

    ctx.fillStyle = "#060b14"; ctx.fillRect(0, 0, G * S, G * S);

    ctx.strokeStyle = "rgba(20,184,166,0.05)"; ctx.lineWidth = 0.5;
    for (let i = 0; i <= G; i++) {
      ctx.beginPath(); ctx.moveTo(i * S, 0); ctx.lineTo(i * S, G * S); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * S); ctx.lineTo(G * S, i * S); ctx.stroke();
    }

    // Food
    ctx.fillStyle = "#f472b6"; ctx.shadowColor = "#f472b6"; ctx.shadowBlur = 12;
    ctx.beginPath(); ctx.arc(food.x * S + S / 2, food.y * S + S / 2, S / 2 - 3, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;

    // Snake
    snake.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? "#14b8a6" : `rgba(20,184,166,${Math.max(0.15, 0.9 - i * 0.025)})`;
      ctx.shadowColor = i === 0 ? "#14b8a6" : "transparent"; ctx.shadowBlur = i === 0 ? 10 : 0;
      const r = 4, x = seg.x * S + 1, y = seg.y * S + 1, w = S - 2, h = S - 2;
      ctx.beginPath();
      ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath(); ctx.fill();
      ctx.shadowBlur = 0;
    });
  }, []);

  const reset = useCallback(() => {
    st.current = { snake: [{ x: 10, y: 10 }], dir: "RIGHT", next: "RIGHT", food: { x: 15, y: 10 }, score: 0 };
    setScore(0); setOver(false); setGoing(true);
  }, []);

  useEffect(() => {
    if (!going || over) return;
    const id = setInterval(() => {
      const s = st.current;
      s.dir = s.next;
      const h = { ...s.snake[0] };
      if (s.dir === "UP") h.y--; else if (s.dir === "DOWN") h.y++;
      else if (s.dir === "LEFT") h.x--; else h.x++;
      if (h.x < 0 || h.x >= G || h.y < 0 || h.y >= G || s.snake.some((b) => b.x === h.x && b.y === h.y)) {
        setOver(true); setBest((b) => Math.max(b, s.score)); return;
      }
      const ate = h.x === s.food.x && h.y === s.food.y;
      s.snake = [h, ...s.snake.slice(0, ate ? undefined : -1)];
      if (ate) { s.score++; setScore(s.score); s.food = rand(s.snake); }
      draw();
    }, 115);
    return () => clearInterval(id);
  }, [going, over, draw]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const map: Record<string, D> = { ArrowUp: "UP", ArrowDown: "DOWN", ArrowLeft: "LEFT", ArrowRight: "RIGHT" };
      const d = map[e.key];
      if (d && d !== OPP[st.current.dir]) { st.current.next = d; e.preventDefault(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => { draw(); }, [draw]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-8 text-sm" style={{ fontFamily: "var(--font-mono)" }}>
        <span style={{ color: "var(--text-muted)" }}>Score <span className="text-teal-400 font-bold">{score}</span></span>
        <span style={{ color: "var(--text-muted)" }}>Best <span className="text-teal-400 font-bold">{best}</span></span>
      </div>
      <div className="relative rounded-xl overflow-hidden" style={{ border: "1px solid var(--brand-border)" }}>
        <canvas ref={ref} width={G * S} height={G * S} />
        {(!going || over) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4" style={{ background: "rgba(6,11,20,0.88)", backdropFilter: "blur(4px)" }}>
            {over && <p className="text-2xl font-bold text-teal-400" style={{ fontFamily: "var(--font-display)" }}>Game Over · {score} pts</p>}
            {!going && <p className="text-2xl font-bold" style={{ color: "var(--text-bright)", fontFamily: "var(--font-display)" }}>Snake 🐍</p>}
            <button onClick={reset} className="btn-primary gap-2">
              <RefreshCw size={14} /> {over ? "Play Again" : "Start Game"}
            </button>
          </div>
        )}
      </div>
      <p className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
        Use arrow keys · eat the pink dot
      </p>
    </div>
  );
}

// ── Games Page ────────────────────────────────────────────────────────────────
const GAME_CARDS = [
  { id: "snake",  title: "Snake",        desc: "Eat, grow, don't crash.",            status: "live"  },
  { id: "typing", title: "Typing Speed", desc: "How many WPM can you hit?",          status: "soon"  },
  { id: "memory", title: "Memory Match", desc: "Flip cards, find pairs.",             status: "soon"  },
  { id: "quiz",   title: "Code Quiz",    desc: "Guess the output — coding puzzles.",  status: "soon"  },
];

export default function GamesPage() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="mb-10">
        <p className="section-label mb-2">Arcade</p>
        <h1 className="section-title">Mini Games</h1>
        <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>Take a break. Play something.</p>
      </div>

      {active === "snake" ? (
        <div>
          <button
            onClick={() => setActive(null)}
            className="btn-ghost text-sm mb-8"
          >
            <ArrowLeft size={14} /> Back to games
          </button>
          <Snake />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {GAME_CARDS.map(({ id, title, desc, status }) => (
            <div
              key={id}
              className="card p-6 flex flex-col cursor-pointer"
              style={{ opacity: status === "soon" ? 0.6 : 1 }}
              onClick={() => status === "live" && setActive(id)}
            >
              <Gamepad2 size={22} className="text-teal-400 mb-4" />
              <h3
                className="font-semibold mb-1"
                style={{ color: "var(--text-bright)", fontFamily: "var(--font-display)" }}
              >
                {title}
              </h3>
              <p className="text-sm flex-1" style={{ color: "var(--text-muted)" }}>{desc}</p>
              <div className="mt-4">
                {status === "live"
                  ? <span className="tag cursor-pointer">Play now →</span>
                  : <span className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Coming soon</span>
                }
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
