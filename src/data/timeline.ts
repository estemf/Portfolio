export type TimelineEntry = {
  period: string;
  title: { fr: string; en: string };
  org: string;
  location?: string;
  description: { fr: string; en: string };
  current?: boolean;
};

export const education: TimelineEntry[] = [
  {
    period: "2025 — 2027",
    title: {
      fr: "Mastère Expert en Architecture et Développement Logiciel",
      en: "Master’s — Software Architecture & Engineering",
    },
    org: "DIIAGE (CUCDB)",
    current: true,
    description: {
      fr: "Spécialisation en architecture logicielle, conception et développement d’applications complexes.",
      en: "Specialization in software architecture, design and development of complex applications.",
    },
  },
  {
    period: "2024 — 2025",
    title: {
      fr: "Bachelor Développeur CPI — parcours Full Stack",
      en: "Bachelor’s — Full Stack Developer",
    },
    org: "DIIAGE (CUCDB)",
    description: {
      fr: "Cursus complet de développement web full-stack, méthodes agiles, conception logicielle.",
      en: "Full curriculum on web development, agile methodologies and software design.",
    },
  },
  {
    period: "2022 — 2024",
    title: {
      fr: "BTS Systèmes Numériques — option IR (Informatique & Réseaux)",
      en: "Higher Technician’s Diploma — IT & Networks",
    },
    org: "Lycée Gustave Eiffel",
    description: {
      fr: "Formation sur les systèmes informatiques, le réseau et le développement bas-niveau.",
      en: "Training in computer systems, networks and low-level development.",
    },
  },
  {
    period: "2019 — 2022",
    title: {
      fr: "BAC PRO Systèmes Numériques — option ARED",
      en: "Vocational Bachelor — Digital Systems",
    },
    org: "Lycée Claudie Haigneré",
    description: {
      fr: "Audiovisuel, réseau et équipements domestiques — premières bases techniques.",
      en: "Audiovisual, network and home equipment — first technical foundations.",
    },
  },
];

export const experience: TimelineEntry[] = [
  {
    period: "2025 — 2026",
    title: {
      fr: "Développeur full-stack",
      en: "Full-stack developer",
    },
    org: "Chain Maestro",
    location: "Dijon",
    current: true,
    description: {
      fr: "Développement full-stack en autonomie d’applications web (e-commerce, outils métiers, vitrines), de l’analyse du besoin à la mise en production. Maintenance d’un CRM interne pour un acteur de l’assurance, mise en place d’une stratégie de déploiement multi-branches et proposition d’une organisation de gestion de projet adaptée à l’équipe.",
      en: "Full-stack development of web applications (e-commerce, internal tools, showcase sites), from discovery to production. Maintenance of an internal insurance CRM, multi-branch deployment strategy and tailored project management organization for the team.",
    },
  },
  {
    period: "2023",
    title: {
      fr: "Stagiaire informatique",
      en: "IT trainee",
    },
    org: "Boulanger",
    location: "Chalon-sur-Saône",
    description: {
      fr: "Diagnostic, réparation et tests de matériel informatique et électroménager. Pose de protections d’écran, gestion clients au comptoir, conseil et suivi des réparations.",
      en: "Diagnosis, repair and testing of computer and home appliance hardware. Screen protection installation, in-store customer service, advice and repair tracking.",
    },
  },
  {
    period: "2023",
    title: {
      fr: "Employé libre-service",
      en: "Retail associate",
    },
    org: "Intermarché Super",
    location: "Chalon-sur-Saône",
    description: {
      fr: "Job saisonnier : approvisionnement et mise en rayon (sodas, jus, alcools).",
      en: "Seasonal job: stocking and shelving (sodas, juices, spirits).",
    },
  },
];
