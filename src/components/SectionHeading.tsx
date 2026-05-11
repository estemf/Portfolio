"use client";

import { motion } from "motion/react";

type Props = {
  index: string;
  title: string;
  italic?: string;
  subtitle?: string;
};

export function SectionHeading({ index, title, italic, subtitle }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-4 sm:gap-5 mb-10 sm:mb-14 md:mb-20"
    >
      <span className="font-mono text-[10px] uppercase tracking-widest text-accent flex items-center gap-3">
        <span className="w-8 h-px bg-accent" />
        {index}
      </span>
      <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.92] break-words">
        {title}
        {italic && (
          <span className="font-display-italic text-accent">{italic}</span>
        )}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-foreground-soft text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
