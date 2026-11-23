"use client";

import Link from "next/link";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import type { AboutStep } from "@/content/types";
import { Container } from "@/components/ui/Container";

/**
 * 고정(sticky) + 세로 스크롤 진행에 따라 가로 타임라인이 움직이는 모드의 조건.
 * app/globals.css의 `pin` variant와 반드시 같은 조건이어야 한다.
 * 터치 기기 · 좁은 화면 · 낮은 화면 · 동작 줄이기 설정에서는 고정 없이 스와이프와 버튼으로 넘긴다.
 */
const PIN_QUERY =
  "(min-width: 768px) and (min-height: 640px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
/** sticky Header 높이(h-16) */
const HEADER_PX = 64;
/** 고정 모드에서 노드 사이 간격 */
const NODE_GAP = 300;
/** 단계 하나를 넘기는 데 필요한 세로 스크롤 양(화면 높이 대비) */
const SCROLL_PER_STEP_SVH = 70;

export type TimelineStep = Omit<AboutStep, "projects"> & {
  projects: { slug: string; title: string }[];
};

type AboutTimelineProps = {
  id: string;
  label: string;
  title: string;
  lead?: string;
  paragraphs: string[];
  steps: TimelineStep[];
};

function usePinned() {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(PIN_QUERY);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    () => window.matchMedia(PIN_QUERY).matches,
    () => false,
  );
}

export function AboutTimeline({ id, label, title, lead, paragraphs, steps }: AboutTimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeRef = useRef(0);
  /** 부드러운 스크롤로 이동 중인 목표 단계. 이동 중 연속 입력은 이 값을 기준으로 계산한다. */
  const pendingRef = useRef<number | null>(null);
  const pinned = usePinned();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const last = steps.length - 1;

  // Header 아래에 섹션 위쪽이 닿을 때 0, 섹션 아래쪽이 화면 아래에 닿을 때 1 = 정확히 sticky가 걸려 있는 구간
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: [`start ${HEADER_PX}px`, "end end"],
  });
  const railX = useTransform(scrollYProgress, (p) => -p * last * NODE_GAP);
  const railFill = useTransform(scrollYProgress, (p) => p * last * NODE_GAP);
  const percentText = useTransform(scrollYProgress, (p) => `${Math.round(p * 100)}%`);

  const change = (next: number) => {
    if (next === activeRef.current) return;
    setDirection(next > activeRef.current ? 1 : -1);
    activeRef.current = next;
    setActive(next);
  };

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!pinned) return;
    const index = Math.min(last, Math.max(0, Math.round(p * last)));
    if (pendingRef.current !== null && Math.abs(p * last - pendingRef.current) < 0.02) pendingRef.current = null;
    change(index);
  });

  /** 버튼 · 키보드의 이전/다음 기준 단계 */
  const current = () => pendingRef.current ?? activeRef.current;

  const go = (index: number) => {
    const next = Math.min(last, Math.max(0, index));
    const section = sectionRef.current;
    if (pinned && section && last > 0) {
      // 고정 모드에서는 그 단계에 해당하는 세로 스크롤 위치로 이동한다 (휠을 가로채지 않는다)
      const start = window.scrollY + section.getBoundingClientRect().top - HEADER_PX;
      const distance = section.offsetHeight - (window.innerHeight - HEADER_PX);
      pendingRef.current = next;
      // 사용자가 중간에 직접 스크롤해 목표에 닿지 않아도 기준이 남지 않게 한다
      window.setTimeout(() => {
        if (pendingRef.current === next) pendingRef.current = null;
      }, 1500);
      window.scrollTo({ top: start + (distance * next) / last, behavior: "smooth" });
    } else {
      change(next);
    }
  };

  const onRailKeyDown = (event: React.KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowRight: current() + 1,
      ArrowLeft: current() - 1,
      Home: 0,
      End: last,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const next = Math.min(last, Math.max(0, keys[event.key]));
    go(next);
    nodeRefs.current[next]?.focus({ preventScroll: true });
  };

  const step = steps[active];
  if (!step) return null;

  const nodes = steps.map((item, index) => (
    <TimelineNode
      key={item.id}
      step={item}
      index={index}
      isActive={index === active}
      isDone={index < active}
      onSelect={() => go(index)}
      buttonRef={(el) => {
        nodeRefs.current[index] = el;
      }}
    />
  ));

  return (
    <MotionConfig reducedMotion="user">
      <section
        id={id}
        ref={sectionRef}
        aria-labelledby={`${id}-title`}
        className="relative bg-background pin:h-(--pin-height)"
        style={{ "--pin-height": `${100 + last * SCROLL_PER_STEP_SVH}svh` } as CSSProperties}
      >
        <div className="py-20 md:py-28 pin:sticky pin:top-16 pin:flex pin:h-[calc(100svh-4rem)] pin:flex-col pin:justify-center pin:py-0">
          <Container>
            <p className="text-[15px] font-bold text-accent">{label}</p>
            <h2 id={`${id}-title`} className="mt-2 text-[28px] font-bold leading-snug tracking-tight md:text-4xl">
              {title}
            </h2>
            {lead && <p className="mt-3 text-lg font-semibold leading-snug md:text-xl">{lead}</p>}
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-2 max-w-[40em] leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}

            {/* 단계 노드 + 진행선 */}
            <nav aria-label="성장 타임라인 단계" onKeyDown={onRailKeyDown} className="mt-10 md:mt-12">
              {pinned ? (
                <div className="relative h-36 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent)]">
                  <motion.ol style={{ x: railX }} className="absolute inset-y-0 left-1/2">
                    <li aria-hidden className="absolute top-[26px] h-1 rounded-full bg-border" style={{ width: last * NODE_GAP }} />
                    <motion.li aria-hidden className="absolute top-[26px] h-1 rounded-full bg-accent-vivid" style={{ width: railFill }} />
                    {nodes.map((node, index) => (
                      <li key={steps[index].id} className="absolute top-0 -translate-x-1/2" style={{ left: index * NODE_GAP }}>
                        {node}
                      </li>
                    ))}
                  </motion.ol>
                </div>
              ) : (
                <div className="relative">
                  <div
                    aria-hidden
                    className="absolute top-[26px] h-1 rounded-full bg-border"
                    style={{ left: `${50 / steps.length}%`, right: `${50 / steps.length}%` }}
                  />
                  <motion.div
                    aria-hidden
                    className="absolute top-[26px] h-1 rounded-full bg-accent-vivid"
                    style={{ left: `${50 / steps.length}%` }}
                    initial={false}
                    animate={{ width: `${last > 0 ? (active / last) * (100 - 100 / steps.length) : 0}%` }}
                    transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
                  />
                  <ol className="relative grid" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
                    {nodes.map((node, index) => (
                      <li key={steps[index].id} className="flex justify-center">
                        {node}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </nav>

            {/* 현재 단계 상세: 모바일에서는 좌우로 밀어 넘긴다 */}
            <motion.div
              drag={pinned ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              dragSnapToOrigin
              onDragEnd={(_, info) => {
                if (info.offset.x < -60 || info.velocity.x < -400) go(active + 1);
                else if (info.offset.x > 60 || info.velocity.x > 400) go(active - 1);
              }}
              style={{ touchAction: "pan-y" }}
              className="mt-6 overflow-hidden rounded-3xl bg-surface-weak p-6 md:mt-8 md:p-8"
            >
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={step.id}
                  custom={direction}
                  variants={{
                    enter: (d: number) => ({ opacity: 0, x: d * 32 }),
                    center: { opacity: 1, x: 0 },
                    exit: (d: number) => ({ opacity: 0, x: d * -32 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
                  className="md:min-h-[188px]"
                >
                  <p className="text-[13px] font-bold text-accent">
                    {String(active + 1).padStart(2, "0")} · {step.label}
                  </p>
                  <ul className="mt-3 grid gap-x-8 gap-y-2 md:grid-cols-2">
                    {step.points.map((point) => (
                      <li key={point} className="flex gap-2.5 leading-snug">
                        <span aria-hidden className="mt-[0.5em] size-1.5 shrink-0 rounded-full bg-accent-vivid" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  {step.projects.length > 0 && (
                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-subtle">관련 프로젝트</span>
                      {step.projects.map((project) => (
                        <Link
                          key={project.slug}
                          href={`/projects/${project.slug}`}
                          transitionTypes={["nav-forward"]}
                          draggable={false}
                          className="pressable card-interactive inline-flex min-h-9 items-center gap-1 rounded-xl bg-surface px-3 text-sm font-semibold hover:text-accent"
                        >
                          {project.title}
                          <span aria-hidden className="text-subtle">
                            ›
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* 이전 · 현재 위치 · 다음 */}
            <div className="mt-4 flex items-center justify-between gap-3">
              <StepButton direction="prev" disabled={active === 0} onClick={() => go(current() - 1)} />
              <div className="flex min-w-0 flex-1 items-center justify-center gap-3 text-sm text-subtle">
                <span className="font-bold text-foreground">
                  {String(active + 1).padStart(2, "0")}
                  <span className="font-medium text-subtle"> / {String(steps.length).padStart(2, "0")}</span>
                </span>
                <span aria-hidden className="h-3 w-px bg-border" />
                <span>
                  진행률{" "}
                  {pinned ? (
                    <motion.span className="font-semibold text-muted tabular-nums">{percentText}</motion.span>
                  ) : (
                    <span className="font-semibold text-muted tabular-nums">
                      {last > 0 ? Math.round((active / last) * 100) : 100}%
                    </span>
                  )}
                </span>
              </div>
              <StepButton direction="next" disabled={active === last} onClick={() => go(current() + 1)} />
            </div>
            <p aria-live="polite" className="sr-only">
              {`${active + 1}단계 ${step.label}, 전체 ${steps.length}단계`}
            </p>
          </Container>
        </div>
      </section>
    </MotionConfig>
  );
}

type TimelineNodeProps = {
  step: TimelineStep;
  index: number;
  isActive: boolean;
  isDone: boolean;
  onSelect: () => void;
  buttonRef: (el: HTMLButtonElement | null) => void;
};

function TimelineNode({ step, index, isActive, isDone, onSelect, buttonRef }: TimelineNodeProps) {
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onSelect}
      aria-current={isActive ? "step" : undefined}
      aria-label={`${index + 1}단계 ${step.label} — ${step.caption}`}
      tabIndex={isActive ? 0 : -1}
      className="group flex w-28 flex-col items-center rounded-2xl text-center md:w-40"
    >
      <span className="flex h-14 items-center justify-center">
        <span
          className={`flex items-center justify-center rounded-full transition-[width,height,background-color,color,box-shadow] duration-200 ease-out ${
            isActive
              ? "size-14 bg-accent-vivid text-white ring-[6px] ring-accent-soft"
              : isDone
                ? "size-11 bg-accent-soft text-accent"
                : "size-11 border-2 border-border bg-surface text-subtle group-hover:border-border-strong"
          }`}
        >
          <motion.span
            key={isActive ? "active" : "idle"}
            initial={isActive ? { scale: 0.6, rotate: -12 } : false}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 18 }}
            className="flex"
          >
            <StepIcon name={step.icon} />
          </motion.span>
        </span>
      </span>
      <span
        className={`mt-2.5 text-[13px] font-bold leading-tight transition-colors duration-200 md:text-[15px] ${
          isActive ? "text-accent" : "text-muted"
        }`}
      >
        {step.label}
      </span>
      <span className="mt-0.5 hidden text-[13px] text-subtle sm:block">{step.caption}</span>
    </button>
  );
}

function StepButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "이전 단계" : "다음 단계"}
      className="pressable flex size-11 shrink-0 items-center justify-center rounded-full bg-surface-weak text-muted hover:bg-border disabled:pointer-events-none disabled:opacity-40"
    >
      <svg aria-hidden viewBox="0 0 20 20" className={`size-5 ${direction === "prev" ? "rotate-180" : ""}`}>
        <path d="M7.5 4.5 13 10l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

const iconPaths: Record<AboutStep["icon"], string> = {
  healthcare: "M3 12h4l2.5-5 4 10 2.5-5H21",
  problem: "M11 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM20 20l-4.2-4.2",
  development: "m8 7-5 5 5 5M16 7l5 5-5 5",
  growth: "m3 17 6-6 4 4 8-8M15 7h6v6",
};

function StepIcon({ name }: { name: AboutStep["icon"] }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-5">
      <path d={iconPaths[name]} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
