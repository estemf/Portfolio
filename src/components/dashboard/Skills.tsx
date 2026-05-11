"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { skillGroups } from "@/data/skills";
import { SectionHeading } from "@/components/SectionHeading";

export function Skills() {
  const locale = useLocale() as "fr" | "en";
  const t = useTranslations("sections");
  const th = useTranslations("headings.skills");

  return (
    <section className="relative mx-auto max-w-[1500px] px-5 sm:px-6 lg:px-12 py-16 sm:py-24 md:py-32">
      <SectionHeading
        index={th("index")}
        title={th("title")}
        italic={th("italic")}
        subtitle={t("skills_sub")}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.label.fr}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: gi * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-border-strong/30 bg-surface p-6 sm:p-7 flex flex-col gap-4 sm:gap-5 group hover:bg-surface-elevated hover:border-foreground transition-all duration-500"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                0{gi + 1}
              </span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl tracking-tighter group-hover:text-accent transition-colors">
              {group.label[locale]}
            </h3>
            <ul className="flex flex-col gap-1 mt-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="font-mono text-sm text-foreground-soft flex items-center gap-2 py-1.5 border-b border-border last:border-0"
                >
                  <span className="text-accent">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
