export type SkillGroup = {
  label: { fr: string; en: string };
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: { fr: "Front-end", en: "Front-end" },
    items: ["Next.js", "React", "Vue.js", "TypeScript", "Tailwind CSS"],
  },
  {
    label: { fr: "Back-end", en: "Back-end" },
    items: ["Node.js", "API REST", "Prisma", "Postgres (Neon)"],
  },
  {
    label: { fr: "Mobile & autres", en: "Mobile & other" },
    items: ["Kotlin", "Stripe", "Resend", "Docker"],
  },
  {
    label: { fr: "Méthodologie", en: "Methodology" },
    items: ["Agile / Scrum", "SEO technique", "Architecture logicielle"],
  },
];
