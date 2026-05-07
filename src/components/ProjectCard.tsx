"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: Props) {
  const locale = useLocale() as "fr" | "en";
  const t = useTranslations("projects");
  const accent = project.accent ?? "#D2502A";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link
        href={`/projects/${project.slug}` as `/projects/${string}`}
        className="block relative overflow-hidden rounded-3xl bg-surface border border-border-strong/30 transition-all duration-500 hover:border-foreground hover:shadow-[0_30px_60px_-30px_rgba(26,22,18,0.25)]"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-surface">
          {project.cover ? (
            <Image
              src={project.cover}
              alt={project.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-105"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${accent}30, transparent 65%), radial-gradient(circle at 70% 80%, ${accent}1a, transparent 55%), var(--surface-elevated)`,
              }}
            >
              <span
                className="font-display text-[clamp(3rem,9vw,7rem)] tracking-tighter leading-none"
                style={{ color: accent }}
              >
                {project.name}
              </span>
            </div>
          )}
          <div className="absolute top-5 left-5 font-mono text-[10px] uppercase tracking-widest text-foreground-soft drop-shadow-sm">
            {String(index + 1).padStart(2, "0")} — {project.year}
          </div>
          <div className="absolute top-5 right-5">
            {project.internal ? (
              <span className="tag">{t("internal")}</span>
            ) : (
              <span className="tag tag-accent">
                <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                Live
              </span>
            )}
          </div>
        </div>

        <div className="p-5 sm:p-7 md:p-9 flex flex-col gap-3 sm:gap-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-2">
                {project.category[locale]}
              </p>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-tighter break-words">
                {project.name}
              </h3>
            </div>
            <span className="shrink-0 mt-1 w-10 h-10 rounded-full border border-border-strong/50 flex items-center justify-center transition-all duration-500 group-hover:bg-ink group-hover:border-ink group-hover:text-background group-hover:rotate-45">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>

          <p className="text-sm sm:text-base text-foreground-soft leading-relaxed">
            {project.tagline[locale]}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.stack.slice(0, 5).map((s) => (
              <span key={s} className="tag">
                {s}
              </span>
            ))}
            {project.stack.length > 5 && (
              <span className="tag opacity-70">+{project.stack.length - 5}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
