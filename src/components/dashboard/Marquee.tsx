import { useTranslations } from "next-intl";

export function Marquee() {
  const t = useTranslations("marquee");
  const items = t("items").split(" / ");

  return (
    <section className="relative py-8 sm:py-12 md:py-16 overflow-hidden border-y border-border-strong/30 bg-background-warm">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-tighter px-4 sm:px-8 flex items-center gap-4 sm:gap-8"
          >
            <span className={i % 3 === 1 ? "font-display-italic text-accent" : "text-foreground"}>
              {item}
            </span>
            <span className="text-accent text-2xl sm:text-3xl">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
