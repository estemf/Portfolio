"use client";

import { useLocale } from "next-intl";
import { motion } from "motion/react";
import type { TimelineEntry } from "@/data/timeline";

type Props = {
  entries: TimelineEntry[];
};

export function Timeline({ entries }: Props) {
  const locale = useLocale() as "fr" | "en";

  return (
    <div className="relative flex flex-col">
      {entries.map((entry, i) => (
        <motion.div
          key={`${entry.org}-${entry.period}`}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-[100px_1fr] md:grid-cols-[220px_1fr] gap-6 md:gap-12 py-9 border-t border-border-strong/30 last:border-b group"
        >
          <div className="flex flex-col gap-2.5">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
              {entry.period}
            </span>
            {entry.current && (
              <span className="tag tag-accent w-fit">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse-soft" />
                {locale === "fr" ? "En cours" : "Current"}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-2xl md:text-4xl tracking-tighter leading-tight group-hover:text-accent group-hover:font-display-italic transition-all duration-500">
              {entry.title[locale]}
            </h3>
            <p className="font-mono text-[11px] uppercase tracking-widest text-foreground-soft">
              {entry.org}
              {entry.location && ` — ${entry.location}`}
            </p>
            <p className="text-sm md:text-base text-foreground-soft max-w-3xl leading-relaxed mt-1">
              {entry.description[locale]}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
