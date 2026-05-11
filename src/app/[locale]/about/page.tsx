import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Timeline } from "@/components/Timeline";
import { SectionHeading } from "@/components/SectionHeading";
import { education, experience } from "@/data/timeline";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title") };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const th = await getTranslations("headings");

  return (
    <>
      <section className="relative pt-28 sm:pt-32 md:pt-44 pb-12 sm:pb-16 md:pb-24 mx-auto max-w-[1500px] px-5 sm:px-6 lg:px-12">
        <SectionHeading index={th("about.index")} title={th("about.title")} italic={th("about.italic")} />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 sm:gap-12 lg:gap-20 items-start">
          <div className="flex flex-col gap-10 sm:gap-14 order-2 lg:order-1">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-accent mb-5">
                / {t("intro_label")}
              </p>
              <p className="text-xl sm:text-2xl md:text-3xl leading-[1.4] text-foreground font-display tracking-tight whitespace-pre-line">
                {t("intro")}
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-accent mb-5">
                / {t("approach_label")}
              </p>
              <p className="text-base md:text-lg leading-relaxed text-foreground-soft whitespace-pre-line">
                {t("approach")}
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-accent mb-5">
                / {t("interests")}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {t("interests_list").split(",").map((item) => (
                  <span key={item} className="tag">{item.trim()}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative lg:sticky lg:top-32 order-1 lg:order-2 max-w-sm sm:max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] rounded-[28px] border border-border-strong/40 bg-surface overflow-hidden shadow-[0_30px_60px_-30px_rgba(26,22,18,0.3)]">
              <div
                className="absolute inset-0 -z-0"
                style={{
                  background:
                    "radial-gradient(circle at 50% 35%, rgba(210,80,42,0.22), transparent 65%)",
                }}
              />
              <Image
                src="/profile-pic.png"
                alt="Esteban Fichet"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 380px"
                className="object-cover object-top relative z-10 scale-[1.02]"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest z-20 text-foreground-soft">
                <span>Esteban Fichet</span>
                <span className="text-accent">/ 22</span>
              </div>
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest z-20 text-foreground-soft">
                <span>FR — Dijon</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse-soft" />
                  Live
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[1500px] px-5 sm:px-6 lg:px-12 py-14 sm:py-20">
        <SectionHeading index={th("experience.index")} title={th("experience.title")} italic={th("experience.italic")} />
        <Timeline entries={experience} />
      </section>

      <section className="relative mx-auto max-w-[1500px] px-5 sm:px-6 lg:px-12 py-14 sm:py-20">
        <SectionHeading index={th("education.index")} title={th("education.title")} italic={th("education.italic")} />
        <Timeline entries={education} />
      </section>
    </>
  );
}
