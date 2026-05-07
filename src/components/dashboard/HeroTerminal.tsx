"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

type Token = { text: string; className?: string };
type Line = { tokens: Token[]; pause?: number };

const CHAR_MS = 22;

export function HeroTerminal() {
  const t = useTranslations("hero.terminal");

  const k = "text-foreground/90";
  const p = "text-muted-soft/70";
  const a = "text-accent-warm";
  const s = "text-accent";
  const n = "text-accent-soft";

  const lines: Line[] = [
    {
      tokens: [
        { text: "> ", className: s },
        { text: "const", className: a },
        { text: " esteban ", className: k },
        { text: "=", className: p },
        { text: " {", className: k },
      ],
      pause: 220,
    },
    {
      tokens: [
        { text: "    role", className: k },
        { text: ": ", className: p },
        { text: `"${t("role")}"`, className: s },
        { text: ",", className: p },
      ],
    },
    {
      tokens: [
        { text: "    location", className: k },
        { text: ": ", className: p },
        { text: `"Dijon, FR"`, className: s },
        { text: ",", className: p },
      ],
    },
    {
      tokens: [
        { text: "    stack", className: k },
        { text: ": [", className: p },
        { text: `"Next.js"`, className: s },
        { text: ", ", className: p },
        { text: `"TypeScript"`, className: s },
        { text: ", ", className: p },
        { text: `"Postgres"`, className: s },
        { text: "],", className: p },
      ],
    },
    {
      tokens: [
        { text: "    open", className: k },
        { text: ": ", className: p },
        { text: "2026", className: n },
        { text: ",", className: p },
      ],
      pause: 220,
    },
    {
      tokens: [{ text: "  }", className: k }],
      pause: 380,
    },
    {
      tokens: [
        { text: "> ", className: s },
        { text: "esteban", className: k },
        { text: ".", className: p },
        { text: "build", className: a },
        { text: "()", className: p },
      ],
      pause: 320,
    },
    {
      tokens: [
        { text: "✓ ", className: s },
        { text: `"${t("output")}"`, className: a },
      ],
    },
  ];

  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    if (lineIdx >= lines.length) {
      setDone(true);
      return;
    }
    const total = lines[lineIdx].tokens.reduce((sum, tok) => sum + tok.text.length, 0);
    if (charIdx < total) {
      const id = setTimeout(() => setCharIdx((c) => c + 1), CHAR_MS);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => {
      setLineIdx((i) => i + 1);
      setCharIdx(0);
    }, lines[lineIdx].pause ?? 90);
    return () => clearTimeout(id);
  }, [lineIdx, charIdx, lines, done]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-[560px] rounded-xl overflow-hidden border border-black/30 bg-[#15110d] shadow-[0_40px_80px_-30px_rgba(26,22,18,0.55)]"
      style={{ contain: "paint" }}
    >
      <div className="relative flex items-center px-4 py-2.5 bg-[#1f1a14] border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <span className="absolute left-1/2 -translate-x-1/2 font-mono text-[10px] sm:text-[11px] text-white/40 tracking-wide whitespace-nowrap">
          esteban@portfolio — node
        </span>
      </div>

      <div className="p-4 sm:p-5 font-mono text-[10.5px] sm:text-[12.5px] leading-relaxed min-h-[240px] sm:min-h-[260px] text-white/85 overflow-x-auto">
        {lines.slice(0, lineIdx + 1).map((line, i) => {
          const isCurrent = i === lineIdx && !done;
          const totalLen = line.tokens.reduce((sum, tok) => sum + tok.text.length, 0);
          const remaining = isCurrent ? charIdx : totalLen;
          let consumed = 0;
          return (
            <div key={i} className="whitespace-pre">
              {line.tokens.map((tok, j) => {
                const start = consumed;
                consumed += tok.text.length;
                if (start >= remaining) return null;
                const slice = tok.text.slice(0, Math.min(tok.text.length, remaining - start));
                return (
                  <span key={j} className={tok.className}>
                    {slice}
                  </span>
                );
              })}
              {isCurrent && (
                <span className="inline-block w-[7px] h-[14px] -mb-[2px] ml-0.5 bg-accent animate-pulse-soft align-middle" />
              )}
            </div>
          );
        })}
        {done && (
          <div className="whitespace-pre">
            <span className={s}>&gt; </span>
            <span className="inline-block w-[7px] h-[14px] -mb-[2px] bg-accent animate-pulse-soft align-middle" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
