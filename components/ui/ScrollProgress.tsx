"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** 페이지 맨 위의 얇은 읽기 진행 막대. 장식이 아니라 "얼마나 남았는지"를 알려 준다. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 260, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent-vivid"
      style={{ scaleX }}
    />
  );
}
