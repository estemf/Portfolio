"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";

export function FeaturedProjects() {
  const t = useTranslations("sections");
  const th = useTranslations("headings.featured");

  return (
    <section className="relative mx-auto max-w-[1500px] px-6 lg:px-12 py-24 md:py-32">
      <SectionHeading
        index="02 / WORK"
        title={th("title")}
        italic={th("italic")}
        subtitle={t("selected_work_sub")}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {featuredProjects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <Link href="/projects" className="btn-secondary">
          {t("view_all")}
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
