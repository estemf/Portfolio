import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-20">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-6 lg:px-12 pb-8 sm:pb-10">
        <div className="bg-ink text-background rounded-[24px] sm:rounded-[32px] p-7 sm:p-10 md:p-16 lg:p-20 overflow-hidden relative">
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 90% 10%, rgba(210,80,42,0.4), transparent 50%)",
            }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-background/50 mb-6">
                / {t("connect_label")}
              </p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.9]">
                {t("cta_pre")} <span className="font-display-italic text-accent-warm">{t("cta_italic")}</span>
                <br />
                {t("cta_post")}
              </h2>
              <a
                href="mailto:estebanfichet@icloud.com"
                className="group inline-flex items-center gap-2 sm:gap-3 mt-8 sm:mt-10 text-base sm:text-xl md:text-2xl font-display tracking-tight border-b border-background/30 pb-2 hover:border-accent-warm hover:text-accent-warm transition-colors break-all"
              >
                estebanfichet@icloud.com
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-8 lg:justify-self-end lg:text-right">
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-background/50">
                  {t("sitemap")}
                </span>
                <Link href="/" className="hover:text-accent-warm transition-colors">{tNav("home")}</Link>
                <Link href="/about" className="hover:text-accent-warm transition-colors">{tNav("about")}</Link>
                <Link href="/projects" className="hover:text-accent-warm transition-colors">{tNav("projects")}</Link>
                <Link href="/contact" className="hover:text-accent-warm transition-colors">{tNav("contact")}</Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-background/50">
                  {t("networks")}
                </span>
                <a href="https://linkedin.com/in/esteban-fichet" target="_blank" rel="noopener noreferrer" className="hover:text-accent-warm transition-colors">LinkedIn</a>
                <a href="mailto:estebanfichet@icloud.com" className="hover:text-accent-warm transition-colors">Email</a>
                <a href="tel:+33680203557" className="hover:text-accent-warm transition-colors">+33 6 80 20 35 57</a>
                <a href="/cv-esteban-fichet.pdf" download className="hover:text-accent-warm transition-colors">{tNav("cv")}</a>
              </div>
            </div>
          </div>

          <div className="relative mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-background/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-widest text-background/40">
            <span>© {year} Esteban Fichet — {t("rights")}</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-accent-warm rounded-full animate-pulse-soft" />
              {t("tagline")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
