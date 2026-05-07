import { setRequestLocale, getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const th = await getTranslations("headings.contact");

  return (
    <section className="relative mx-auto max-w-[1500px] px-5 sm:px-6 lg:px-12 pt-28 sm:pt-32 md:pt-44 pb-16 sm:pb-24">
      <SectionHeading
        index="/ CONTACT"
        title={th("title")}
        italic={th("italic")}
        subtitle={t("subtitle")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 sm:gap-12 lg:gap-20">
        <ContactForm />

        <aside className="flex flex-col gap-6 sm:gap-8 lg:border-l lg:border-border-strong/30 lg:pl-12">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            / {t("or")}
          </p>

          <InfoLine
            icon={<Mail className="w-4 h-4" />}
            label="Email"
            value="estebanfichet@icloud.com"
            href="mailto:estebanfichet@icloud.com"
          />
          <InfoLine
            icon={<Phone className="w-4 h-4" />}
            label={t("phone_label")}
            value="+33 6 80 20 35 57"
            href="tel:+33680203557"
          />
          <InfoLine
            icon={<MapPin className="w-4 h-4" />}
            label={t("location")}
            value={t("location_value")}
          />
          <InfoLine
            icon={<Calendar className="w-4 h-4" />}
            label={t("availability_label")}
            value={t("availability_value")}
            accent
          />
        </aside>
      </div>
    </section>
  );
}

function InfoLine({
  icon,
  label,
  value,
  href,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  accent?: boolean;
}) {
  const content = (
    <>
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted flex items-center gap-2">
        {icon} {label}
      </span>
      <span
        className={
          accent
            ? "text-accent font-display text-lg sm:text-xl tracking-tight break-words"
            : "font-display text-lg sm:text-xl tracking-tight break-words"
        }
      >
        {value}
      </span>
    </>
  );
  if (href) {
    return (
      <a href={href} className="flex flex-col gap-1.5 group hover:text-accent">
        {content}
      </a>
    );
  }
  return <div className="flex flex-col gap-1.5">{content}</div>;
}
