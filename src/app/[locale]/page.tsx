import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/dashboard/Hero";
import { Marquee } from "@/components/dashboard/Marquee";
import { FeaturedProjects } from "@/components/dashboard/FeaturedProjects";
import { Skills } from "@/components/dashboard/Skills";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedProjects />
      <Skills />
    </>
  );
}
