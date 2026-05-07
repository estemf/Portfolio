import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const base = "https://esteban-fichet.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/projects", "/contact"];
  const projectRoutes = projects.map((p) => `/projects/${p.slug}`);
  const all = [...routes, ...projectRoutes];

  const entries: MetadataRoute.Sitemap = [];
  for (const path of all) {
    entries.push({
      url: `${base}${path}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          fr: `${base}${path}`,
          en: `${base}/en${path}`,
        },
      },
    });
  }
  return entries;
}
