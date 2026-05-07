export type Project = {
  slug: string;
  name: string;
  tagline: { fr: string; en: string };
  description: { fr: string; en: string };
  challenge: { fr: string; en: string };
  year: string;
  role: { fr: string; en: string };
  stack: string[];
  url?: string;
  internal?: boolean;
  cover?: string;
  accent?: string;
  category: { fr: string; en: string };
};

export const projects: Project[] = [
  {
    slug: "nupreva",
    name: "Nupreva",
    year: "2025",
    accent: "#D4FF00",
    category: { fr: "E-commerce", en: "E-commerce" },
    role: {
      fr: "Conception & développement full-stack",
      en: "Design & full-stack development",
    },
    tagline: {
      fr: "Boutique en ligne pour une marque de compléments alimentaires.",
      en: "Online store for a dietary supplement brand.",
    },
    description: {
      fr: "Plateforme e-commerce complète conçue de zéro : vitrine produit pensée pour la conversion, back-office sur mesure pour la gestion du catalogue et des commandes, tunnel d’achat sécurisé via Stripe, et envoi automatisé des confirmations par e-mail.",
      en: "Complete e-commerce platform built from scratch: conversion-focused storefront, custom back-office for catalog and order management, secure Stripe checkout, and automated e-mail confirmations.",
    },
    challenge: {
      fr: "Concevoir un back-office capable de gérer simultanément le catalogue, les stocks et le suivi des commandes Stripe, tout en gardant une interface admin lisible pour un client non-technique. La synchronisation temps réel entre webhook Stripe et base Postgres a demandé une logique idempotente côté API.",
      en: "Designing a back-office able to manage catalog, inventory and Stripe order tracking simultaneously, while keeping the admin UI readable for a non-technical client. Real-time sync between Stripe webhooks and the Postgres DB required an idempotent server logic.",
    },
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "Postgres (Neon)", "Stripe", "Resend"],
    url: "https://laboratoire-nupreva.fr",
    cover: "/Screenshot-Nupreva.png",
  },
  {
    slug: "yogamatata",
    name: "Yogamatata",
    year: "2025",
    accent: "#A78BFA",
    category: { fr: "E-commerce", en: "E-commerce" },
    role: {
      fr: "Conception & développement full-stack",
      en: "Design & full-stack development",
    },
    tagline: {
      fr: "E-shop d’équipement de yoga, du tapis aux accessoires.",
      en: "E-shop for yoga gear, from mats to accessories.",
    },
    description: {
      fr: "Site marchand développé entièrement sur mesure : design éditorial inspiré de l’univers du yoga, fiches produit riches, gestion des variantes (taille, couleur), paiement par Stripe et e-mails transactionnels. Un back-office permet au client de piloter son catalogue sans dépendre du dev.",
      en: "Custom-built online shop: editorial design rooted in the yoga world, rich product pages, variant management (size, color), Stripe checkout and transactional e-mails. A back-office lets the client manage the catalog autonomously.",
    },
    challenge: {
      fr: "Modéliser proprement les variantes produit (taille × couleur × stock) dans Prisma tout en gardant une interface client fluide. J’ai mis en place une architecture où chaque combinaison est traitée comme une entité indexée pour conserver des recherches et filtres instantanés.",
      en: "Cleanly modeling product variants (size × color × stock) in Prisma while keeping the client-facing UX fluid. Each combination is treated as an indexed entity, allowing instant search and filtering.",
    },
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "Postgres (Neon)", "Stripe", "Resend"],
    url: "https://yogamatata.fr",
    cover: "/Screenshot-Yogamatata.png",
  },
  {
    slug: "vault-docs",
    name: "Vault Docs",
    year: "2025",
    accent: "#60A5FA",
    category: { fr: "Outil métier", en: "Internal tool" },
    role: {
      fr: "Conception & développement full-stack",
      en: "Design & full-stack development",
    },
    tagline: {
      fr: "Drive interne sécurisé pour le partage de documents en entreprise.",
      en: "Secure internal drive for company document sharing.",
    },
    description: {
      fr: "Plateforme de stockage et de partage de fichiers pensée comme un Google Drive privé pour l’entreprise : arborescence de dossiers, gestion fine des permissions, prévisualisation, et contrôle d’accès par équipe. Hébergée et déployée sur l’infrastructure interne.",
      en: "File storage and sharing platform designed as a private Google Drive for the company: folder hierarchy, granular permissions, previews and team-based access control. Hosted and deployed on internal infrastructure.",
    },
    challenge: {
      fr: "Construire un système de permissions hiérarchique (utilisateur → équipe → dossier) capable de répondre en quelques millisecondes même sur des arborescences profondes. La résolution des droits a été optimisée via une matrice de permissions calculée à l’écriture plutôt qu’à la lecture.",
      en: "Building a hierarchical permission system (user → team → folder) able to answer in milliseconds even on deep trees. Permission resolution was optimized via a permission matrix computed on write rather than on read.",
    },
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "Postgres (Neon)", "Docker"],
    internal: true,
    cover: "/Screenshot-VaultDocs.png",
  },
  {
    slug: "leads-admin",
    name: "Leads Admin",
    year: "2025",
    accent: "#F472B6",
    category: { fr: "Outil métier", en: "Internal tool" },
    role: {
      fr: "Conception & développement full-stack",
      en: "Design & full-stack development",
    },
    tagline: {
      fr: "CRM de gestion de leads connecté aux landing pages.",
      en: "Lead management CRM connected to landing pages.",
    },
    description: {
      fr: "Logiciel interne qui centralise les leads remontant des landing pages : capture des informations (nom, prénom, e-mail, source), qualification, suivi commercial et notifications e-mail. Une API permet aux landing pages externes d’y connecter leurs formulaires en quelques lignes.",
      en: "Internal tool centralizing leads coming from landing pages: information capture (name, e-mail, source), qualification, sales follow-up and e-mail notifications. An API allows external landing pages to plug their forms in a few lines.",
    },
    challenge: {
      fr: "Sécuriser une API publique exposée à n’importe quelle landing page sans la surcharger : j’ai mis en place un système de tokens d’origine, un rate-limiting par site et une déduplication automatique des leads pour éviter les doublons quand un visiteur soumet plusieurs fois le même formulaire.",
      en: "Securing a public API exposed to any landing page without overloading it: I implemented origin tokens, per-site rate limiting and automatic lead deduplication to handle multiple submissions of the same form.",
    },
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "Postgres (Neon)", "Resend"],
    internal: true,
    cover: "/Screenshot-Leads-Admin.png",
  },
  {
    slug: "terrenature",
    name: "TerreNature",
    year: "2024",
    accent: "#34D399",
    category: { fr: "Site vitrine", en: "Showcase site" },
    role: {
      fr: "Design & développement",
      en: "Design & development",
    },
    tagline: {
      fr: "Vitrine éditoriale pour une marque proche de la nature.",
      en: "Editorial showcase for a nature-driven brand.",
    },
    description: {
      fr: "Site vitrine sur mesure mettant en valeur l’univers de la marque : direction artistique organique, animations subtiles au scroll, optimisation SEO technique et temps de chargement minimal. Pensé pour rester maintenable par le client sur le long terme.",
      en: "Custom showcase site highlighting the brand’s identity: organic art direction, subtle scroll animations, technical SEO and minimal load time. Designed to remain maintainable by the client over time.",
    },
    challenge: {
      fr: "Atteindre un score Lighthouse parfait sans sacrifier la richesse visuelle : optimisation des images via le composant Next/Image, lazy-loading sélectif des animations et préchargement intelligent des routes les plus visitées.",
      en: "Hitting a perfect Lighthouse score without sacrificing visual richness: image optimization via Next/Image, selective animation lazy-loading and smart prefetching of the most visited routes.",
    },
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    internal: true,
    cover: "/Screenshot-Terre-Nature.png",
  },
  {
    slug: "villa-miko",
    name: "Villa Miko",
    year: "2024",
    accent: "#FBBF24",
    category: { fr: "Site vitrine", en: "Showcase site" },
    role: {
      fr: "Design & développement",
      en: "Design & development",
    },
    tagline: {
      fr: "Vitrine immersive pour une villa d’exception.",
      en: "Immersive showcase for an upscale villa.",
    },
    description: {
      fr: "Site de présentation pour une villa de standing : galerie immersive, transitions soignées, formulaire de réservation et intégration cartographique. L’objectif était de retranscrire l’expérience du lieu dès la home page.",
      en: "Showcase site for an upscale villa: immersive gallery, polished transitions, booking form and map integration. The goal was to convey the on-site experience right from the home page.",
    },
    challenge: {
      fr: "Faire ressentir l’ambiance du lieu en quelques secondes : j’ai construit un hero animé en parallaxe avec préchargement progressif des médias pour qu’aucune image ne casse le rythme de la première visite.",
      en: "Conveying the place’s atmosphere in seconds: I built a parallax hero with progressive media preloading so that no image ever breaks the rhythm of the first visit.",
    },
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    internal: true,
    cover: "/Screenshot-Villa-Miko.png",
  },
];

export const featuredProjects = projects.slice(0, 4);
