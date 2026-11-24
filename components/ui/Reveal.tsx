"use client";

import { motion } from "motion/react";

type RevealProps = {
  children: React.ReactNode;
  /** 목록 안 순서. 앞에서부터 60ms씩 늦게 나타난다(최대 5칸) */
  index?: number;
  className?: string;
};

/**
 * 화면에 처음 들어올 때 아래에서 위로 한 번만 나타난다(opacity · translateY만 사용).
 * 이동 거리는 --reveal-distance(모바일에서 더 짧음), 동작 줄이기 설정이면 이동 없이 바로 보인다.
 */
export function Reveal({ children, index = 0, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: "var(--reveal-distance)" }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: [0.2, 0, 0, 1], delay: Math.min(index, 5) * 0.06 }}
    >
      {children}
    </motion.div>
  );
}
