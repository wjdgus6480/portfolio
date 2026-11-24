"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import type { JourneyStep } from "@/content/types";

type JourneyFlowProps = {
  steps: JourneyStep[];
  /** 섹션 톤에 맞춘 카드 면 색 클래스 */
  cardClassName: string;
};

/**
 * 개발 흐름: 스크롤에 따라 단계를 잇는 선이 그려지고, 선이 닿은 단계가 강조된다.
 * 데스크톱은 가로, 모바일은 세로 선. 스크롤을 붙잡지 않고 지나가는 위치만 읽는다.
 * 동작 줄이기 설정이면 선과 단계가 처음부터 모두 채워져 있다.
 */
export function JourneyFlow({ steps, cardClassName }: JourneyFlowProps) {
  const ref = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [reached, setReached] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setReached(Math.min(steps.length, Math.floor(value * steps.length + 0.35)));
  });

  const active = (i: number) => reduceMotion || i < reached;

  return (
    <ol ref={ref} className="relative grid gap-3 lg:grid-cols-5">
      {/* 연결선 바탕 + 진행 */}
      <span aria-hidden className="absolute bottom-8 left-8 top-8 z-[1] w-px bg-border lg:bottom-auto lg:right-[calc((100%-3rem)/5-2rem)] lg:h-px lg:w-auto" />
      <motion.span
        aria-hidden
        className="absolute bottom-8 left-8 top-8 z-[1] w-px origin-top bg-accent-vivid lg:hidden"
        style={{ scaleY: reduceMotion ? 1 : progress }}
      />
      <motion.span
        aria-hidden
        className="absolute left-8 right-[calc((100%-3rem)/5-2rem)] top-8 z-[1] hidden h-px origin-left bg-accent-vivid lg:block"
        style={{ scaleX: reduceMotion ? 1 : progress }}
      />

      {steps.map((step, i) => {
        const on = active(i);
        return (
          <li key={step.label}>
            <div
              className={`flex h-full gap-4 rounded-card p-5 transition-shadow duration-500 ease-[cubic-bezier(0.2,0,0,1)] lg:flex-col lg:gap-0 ${cardClassName} ${
                on ? "shadow-[0_14px_30px_-20px_rgb(27_100_218/0.45)]" : ""
              }`}
            >
              <span
                aria-label={`${i + 1}단계`}
                className={`relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-bold transition-colors duration-500 ${
                  on ? "border-accent-vivid bg-accent-vivid text-white" : "border-border-strong bg-surface text-subtle"
                }`}
              >
                {i + 1}
              </span>
              <div className="lg:mt-5">
                <p className="text-lg font-bold tracking-tight">{step.label}</p>
                {step.description && (
                  <p className="mt-0.5 text-[15px] leading-relaxed text-muted">{step.description}</p>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
