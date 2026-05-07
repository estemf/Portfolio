import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://esteban-fichet.dev"),
  title: {
    default: "Esteban Fichet — Full Stack Developer",
    template: "%s — Esteban Fichet",
  },
  description:
    "Full-stack developer based in Dijon. I design and ship complete web products — e-commerce, internal tools, showcase sites.",
  authors: [{ name: "Esteban Fichet" }],
  openGraph: {
    title: "Esteban Fichet — Full Stack Developer",
    description:
      "Full-stack developer based in Dijon. I design and ship complete web products.",
    type: "website",
    siteName: "Esteban Fichet",
  },
  twitter: {
    card: "summary_large_image",
    title: "Esteban Fichet — Full Stack Developer",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="grain antialiased">{children}</body>
    </html>
  );
}
