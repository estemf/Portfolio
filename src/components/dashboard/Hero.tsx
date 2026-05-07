"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  ArrowDown,
  ArrowUpRight,
  Boxes,
  Layout,
  MapPin,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";
import { RevealText } from "@/components/RevealText";

const HeroCanvas = dynamic(
  () => import("@/components/dashboard/HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false },
);

const HeroTerminal = dynamic(
  () => import("@/components/dashboard/HeroTerminal").then((m) => m.HeroTerminal),
  { ssr: false },
);

const FLOATING_STACK = ["TypeScript", "React", "Postgres", "Tailwind", "Stripe"] as const;
const SERVICE_ICONS = [Boxes, ShoppingBag, Layout] as const;

export function Hero() {
  const t = useTranslations("hero");
  const [activeTag, setActiveTag] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveTag((i) => (i + 1) % 3), 2800);
    return () => clearInterval(id);
  }, []);

  const STATS = [
    { value: "6", label: t("stats.projects") },
    { value: "2", label: t("stats.experience") },
    { value: "2026", label: t("stats.available") },
  ] as const;
  const SERVICES = [
    { title: t("services.web.title"), desc: t("services.web.desc") },
    { title: t("services.ecom.title"), desc: t("services.ecom.desc") },
    { title: t("services.site.title"), desc: t("services.site.desc") },
  ] as const;

  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-x-clip">
      <HeroCanvas />

      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background/60 pointer-events-none -z-[5]" />

      <motion.aside
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="hidden xl:flex absolute top-36 right-12 z-10 w-72 flex-col gap-4 rounded-3xl border border-border-strong/40 bg-background/70 backdrop-blur-xl p-5 shadow-[0_30px_60px_-30px_rgba(26,22,18,0.25)]"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
            / {t("identity.label")}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-accent">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse-soft" />
            {t("identity.status")}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-border-strong/60 bg-surface shrink-0">
            <Image
              src="/profile-pic.png"
              alt="Esteban Fichet"
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="font-display text-xl tracking-tight leading-tight truncate">
              Esteban Fichet
            </p>
            <p className="mt-0.5 text-xs text-foreground-soft leading-snug">
              {t("identity.role")}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-border-strong/30 font-mono text-[10px] uppercase tracking-widest text-muted">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-accent" /> Dijon, FR
          </span>
          <span>{t("identity.years")}</span>
        </div>
      </motion.aside>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="hidden lg:flex absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 z-10 flex-col gap-3 items-end font-mono text-[10px] uppercase tracking-widest text-muted-soft"
      >
        {FLOATING_STACK.map((s, i) => (
          <span
            key={s}
            className="px-2 py-1 rounded-full bg-background/40 backdrop-blur-sm border border-border/40"
            style={{ marginRight: `${(i % 2) * 20}px` }}
          >
            {s}
          </span>
        ))}
      </motion.div>

      <div className="relative mx-auto w-full max-w-[1500px] px-5 sm:px-6 lg:px-12 pt-28 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 flex flex-col flex-1 justify-between gap-12 sm:gap-0">
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            {/* Mobile : carousel une bulle à la fois */}
            <div className="md:hidden h-8 flex items-center overflow-hidden">
              <AnimatePresence mode="wait">
                {activeTag === 0 && (
                  <motion.span
                    key="tag-0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="tag tag-accent whitespace-nowrap"
                  >
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse-soft shrink-0" />
                    {t("status")}
                  </motion.span>
                )}
                {activeTag === 1 && (
                  <motion.span
                    key="tag-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="tag tag-accent whitespace-nowrap"
                  >
                    <MapPin className="w-3 h-3 shrink-0" />
                    Dijon, FR
                  </motion.span>
                )}
                {activeTag === 2 && (
                  <motion.span
                    key="tag-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="tag tag-accent whitespace-nowrap"
                  >
                    <Sparkles className="w-3 h-3 shrink-0" />
                    {t("tag_freelance")}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop : toutes les bulles en ligne */}
            <div className="hidden md:flex items-center gap-3">
              <span className="tag tag-accent">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse-soft" />
                {t("status")}
              </span>
              <span className="tag tag-accent">
                <MapPin className="w-3 h-3" />
                Dijon, FR
              </span>
              <span className="hidden lg:inline-flex tag tag-accent">
                <Sparkles className="w-3 h-3" />
                {t("tag_freelance")}
              </span>
            </div>
          </motion.div>

          <h1 className="font-display tracking-tighter leading-[0.9]">
            <span className="block text-[clamp(3.5rem,9vw,9rem)]">
              <RevealText delay={0.05} immediate>{t("title_pre")}</RevealText>
            </span>
            <span className="block text-[clamp(3.5rem,9vw,9rem)] font-display-italic text-accent">
              <RevealText delay={0.18} immediate>{t("title_main")}.</RevealText>
            </span>
          </h1>

          <div className="mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] gap-8 lg:gap-16 items-start">
            <div className="flex flex-col gap-8 max-w-xl">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="text-base md:text-lg text-foreground-soft leading-relaxed"
              >
                {t("lede")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.65 }}
                className="flex flex-wrap items-center gap-3 sm:gap-4"
              >
                <MagneticButton href="/projects" className="btn-primary w-full sm:w-auto justify-center max-sm:!text-sm max-sm:!px-5 max-sm:!py-2.5">
                  <span>{t("cta_projects")}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </MagneticButton>
                <Link href="/contact" className="btn-secondary w-full sm:w-auto justify-center max-sm:!text-sm max-sm:!px-5 max-sm:!py-2.5">
                  {t("cta_contact")}
                </Link>
              </motion.div>
            </div>

            <div className="lg:translate-x-4 xl:translate-x-8 flex justify-center lg:justify-end">
              <HeroTerminal />
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-px bg-border-strong/40 border border-border-strong/40 rounded-2xl overflow-hidden"
        >
          {SERVICES.map((service, i) => {
            const Icon = SERVICE_ICONS[i];
            return (
              <div
                key={service.title}
                className="bg-background/70 backdrop-blur-sm p-5 flex flex-col gap-2"
              >
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted">
                  <Icon className="w-3.5 h-3.5 text-accent" />
                  0{i + 1}
                </div>
                <p className="font-display text-xl tracking-tight leading-tight">
                  {service.title}
                </p>
                <p className="text-xs text-foreground-soft leading-relaxed">
                  {service.desc}
                </p>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-10 sm:mt-12 flex flex-wrap items-stretch border-t border-border-strong/40"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex-1 min-w-0 sm:min-w-[120px] flex flex-col gap-1 pt-5 sm:pt-6 pr-4 sm:pr-8 border-r border-border-strong/40 last:border-r-0 last:pr-0"
            >
              <span className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tighter text-foreground">
                {stat.value}
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-muted leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
          <div className="ml-auto hidden md:flex items-center gap-2 pt-6 pl-8 font-mono text-[10px] uppercase tracking-widest text-muted self-start">
            <ArrowDown className="w-3 h-3 animate-bounce" />
            {t("scroll")}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
