"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";

export function ContactCTA() {
  const t = useTranslations("sections");
  const tHero = useTranslations("hero");
  const tCta = useTranslations("contact_cta");

  return (
    <section className="relative mx-auto max-w-[1500px] px-5 sm:px-6 lg:px-12 py-16 sm:py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-background-warm rounded-[24px] sm:rounded-[32px] p-7 sm:p-10 md:p-20 overflow-hidden border border-border-strong/30"
      >
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-50 animate-float-slow"
          style={{
            background:
              "radial-gradient(circle, rgba(210,80,42,0.35), transparent 60%)",
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full opacity-40 animate-float-slow"
          style={{
            background:
              "radial-gradient(circle, rgba(244,167,138,0.4), transparent 60%)",
            animationDelay: "-7s",
          }}
        />

        <div className="relative">
          <p className="font-mono text-[10px] uppercase tracking-widest text-accent mb-6">
            / 04 — Contact
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.92] max-w-4xl">
            {tCta("line1")}
            <br />
            <span className="font-display-italic text-accent">{tCta("italic")}</span>
            <br />
            {tCta("line3")}
          </h2>
          <p className="mt-8 max-w-xl text-foreground-soft text-base md:text-lg leading-relaxed">
            {t("contact_cta_sub")}
          </p>
          <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
            <MagneticButton href="/contact" className="btn-primary w-full sm:w-auto justify-center">
              <span>{tHero("cta_contact")}</span>
              <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>
            <a href="mailto:estebanfichet@icloud.com" className="btn-secondary w-full sm:w-auto justify-center break-all sm:break-normal">
              estebanfichet@icloud.com
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
