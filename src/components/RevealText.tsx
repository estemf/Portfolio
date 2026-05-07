"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "span" | "div";
  immediate?: boolean;
};

export function RevealText({
  children,
  delay = 0,
  className,
  as = "span",
  immediate = false,
}: Props) {
  const Wrapper = as === "div" ? motion.div : motion.span;

  const animationProps = immediate
    ? { animate: { y: 0 } }
    : {
        whileInView: { y: 0 },
        viewport: { once: true, margin: "-40px" },
      };

  return (
    <span className={`reveal-mask ${className ?? ""}`}>
      <Wrapper
        initial={{ y: "110%" }}
        {...animationProps}
        transition={{
          duration: 0.9,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </Wrapper>
    </span>
  );
}
