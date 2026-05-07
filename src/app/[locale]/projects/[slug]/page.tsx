import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { projects } from "@/data/projects";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  const lang = locale === "en" ? "en" : "fr";
  return {
    title: project.name,
    description: project.tagline[lang],
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projects");
  const lang = locale === "en" ? "en" : "fr";

  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];
  const accent = project.accent ?? "#D2502A";

  return (
    <article className="relative">
      <section className="relative pt-32 md:pt-44 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-50"
          style={{
            background: `radial-gradient(circle at 85% 0%, ${accent}40, transparent 55%)`,
          }}
        />

        <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted hover:text-accent mb-12"
          >
            <ArrowLeft className="w-3 h-3" />
            {t("back")}
          </Link>

          <p className="font-mono text-[10px] uppercase tracking-widest mb-6 flex items-center gap-3">
            <span className="w-8 h-px" style={{ background: accent }} />
            <span style={{ color: accent }}>
              {project.category[lang]} — {project.year}
            </span>
          </p>

          <h1 className="font-display text-6xl md:text-9xl lg:text-[11rem] tracking-tighter leading-[0.88]">
            {project.name}
          </h1>

          <p className="mt-10 max-w-3xl text-xl md:text-2xl text-foreground-soft leading-relaxed">
            {project.tagline[lang]}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {t("live")}
                <ArrowUpRight className="w-4 h-4" />
              </a>
            ) : (
              <span className="tag">{t("internal")}</span>
            )}
          </div>
        </div>
      </section>

      {project.cover && (
        <section className="mx-auto max-w-[1500px] px-6 lg:px-12 pb-8">
          <div className="relative w-full aspect-[16/9] rounded-[20px] overflow-hidden border border-border-strong/30 shadow-[0_20px_50px_-20px_rgba(26,22,18,0.2)]">
            <Image
              src={project.cover}
              alt={t("preview_alt", { name: project.name })}
              fill
              priority
              sizes="(max-width: 1500px) 100vw, 1500px"
              className="object-cover object-top"
            />
          </div>
        </section>
      )}

      <section className="mx-auto max-w-[1500px] px-6 lg:px-12 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-20 border-t border-border-strong/30">
        <div className="flex flex-col gap-14">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent mb-5">
              / {t("overview")}
            </p>
            <p className="text-xl md:text-2xl leading-[1.5] text-foreground font-display tracking-tight">
              {project.description[lang]}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent mb-5">
              / {t("challenge")}
            </p>
            <p className="text-base md:text-lg leading-relaxed text-foreground-soft">
              {project.challenge[lang]}
            </p>
          </div>
        </div>

        <aside className="flex flex-col gap-8 lg:border-l lg:border-border-strong/30 lg:pl-12">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-2">
              / {t("role")}
            </p>
            <p className="text-base">{project.role[lang]}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-2">
              / {t("year")}
            </p>
            <p className="text-base">{project.year}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-3">
              / {t("stack")}
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <li key={s} className="tag">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <section className="border-t border-border-strong/30">
        <Link
          href={`/projects/${next.slug}` as `/projects/${string}`}
          className="block group mx-auto max-w-[1500px] px-6 lg:px-12 py-20 md:py-32"
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-4">
            / {t("next")}
          </p>
          <div className="flex items-center justify-between gap-6 flex-wrap">
            <h2 className="font-display text-5xl md:text-8xl tracking-tighter leading-[0.92] group-hover:text-accent group-hover:font-display-italic transition-all duration-500">
              {next.name}
            </h2>
            <span className="w-14 h-14 md:w-20 md:h-20 rounded-full border border-border-strong flex items-center justify-center transition-all duration-500 group-hover:bg-ink group-hover:border-ink group-hover:text-background group-hover:rotate-45">
              <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8" />
            </span>
          </div>
        </Link>
      </section>
    </article>
  );
}
