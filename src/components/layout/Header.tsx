"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import clsx from "clsx";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const otherLocale = locale === "fr" ? "en" : "fr";

  const links = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/projects", label: t("projects") },
    { href: "/contact", label: t("contact") },
  ];

  const activeIndex = links.findIndex((l) =>
    l.href === "/" ? pathname === "/" : pathname.startsWith(l.href),
  );

  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  const [pillReady, setPillReady] = useState(false);

  useLayoutEffect(() => {
    const updatePill = () => {
      const el = linkRefs.current[activeIndex];
      const nav = navRef.current;
      if (!el || !nav) {
        setPill(null);
        return;
      }
      const navRect = nav.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      setPill({ left: r.left - navRect.left, width: r.width });
    };
    updatePill();
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [activeIndex, locale]);

  useEffect(() => {
    if (pill) {
      const id = requestAnimationFrame(() => setPillReady(true));
      return () => cancelAnimationFrame(id);
    }
  }, [pill]);

  return (
    <header
      className={clsx(
        "fixed top-4 inset-x-4 lg:inset-x-8 z-50",
        "transition-[background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        open ? "rounded-[28px]" : "rounded-full",
        scrolled || open
          ? "backdrop-blur-xl bg-background/70 border border-border-strong/40 shadow-[0_8px_30px_-12px_rgba(26,22,18,0.18)]"
          : "bg-transparent border border-transparent",
      )}
    >
      <div className="mx-auto max-w-[1500px] px-5 lg:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="relative w-9 h-9 rounded-full bg-ink overflow-hidden flex items-center justify-center">
            <span className="font-display text-background text-[13px] leading-none tracking-tight">
              EF
            </span>
          </span>
          <span className="font-display text-lg tracking-tight hidden sm:inline">
            Esteban Fichet
          </span>
        </Link>

        <nav
          ref={navRef}
          className="hidden md:flex items-center gap-2 text-sm relative"
        >
          {pill && (
            <span
              aria-hidden
              className={clsx(
                "absolute inset-y-0 my-auto h-7 rounded-full bg-ink pointer-events-none",
                pillReady
                  ? "transition-[transform,width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  : "opacity-0",
              )}
              style={{
                transform: `translateX(${pill.left}px)`,
                width: pill.width,
              }}
            />
          )}
          {links.map((l, i) => {
            const active = i === activeIndex;
            return (
              <Link
                key={l.href}
                href={l.href}
                ref={(el) => {
                  linkRefs.current[i] = el;
                }}
                style={{ animationDelay: `${i * 60}ms` }}
                className={clsx(
                  "animate-nav-item-in px-4 py-1.5 rounded-full relative z-10 transition-colors duration-300",
                  active
                    ? "text-background"
                    : "text-foreground-soft hover:text-foreground",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link
            href={pathname}
            locale={otherLocale}
            className="font-mono text-[10px] uppercase tracking-widest border border-border-strong/50 rounded-full px-3 py-1.5 hover:border-ink hover:text-ink transition-colors"
          >
            {otherLocale}
          </Link>
          <a
            href="/cv-esteban-fichet.pdf"
            download
            className="font-mono text-[10px] uppercase tracking-widest flex items-center gap-1 bg-ink text-background rounded-full px-3.5 py-1.5 hover:bg-accent transition-colors"
          >
            CV <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div
        className={clsx(
          "md:hidden overflow-hidden",
          "transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none",
        )}
      >
        <nav className="flex flex-col px-6 pb-6 pt-1 gap-4 text-base">
          {links.map((l, i) => (
            <Link
              key={`${l.href}-${open}`}
              href={l.href}
              onClick={() => setOpen(false)}
              className="animate-nav-item-in hover:text-accent transition-colors"
              style={{ animationDelay: `${60 + i * 60}ms` }}
            >
              {l.label}
            </Link>
          ))}
          <div
            key={`actions-${open}`}
            className="animate-nav-item-in flex gap-3 pt-4 border-t border-border"
            style={{ animationDelay: `${60 + links.length * 60}ms` }}
          >
            <Link
              href={pathname}
              locale={otherLocale}
              onClick={() => setOpen(false)}
              className="border border-border-strong/50 rounded-full px-3 py-1.5 text-xs font-mono uppercase tracking-widest hover:border-ink hover:text-ink transition-colors"
            >
              {otherLocale}
            </Link>
            <a
              href="/cv-esteban-fichet.pdf"
              download
              className="bg-ink text-background rounded-full px-3.5 py-1.5 text-xs font-mono uppercase tracking-widest flex items-center gap-1 hover:bg-accent transition-colors"
            >
              CV <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
