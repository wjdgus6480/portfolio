"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/** "105", "19만+", "1,234", "5회"처럼 숫자로 시작하는 값만 센다. "수상", "PDF · PPTX"는 그대로 둔다. */
const NUMERIC = /^(\d[\d,]*(?:\.\d+)?)(.*)$/;

function format(n: number, template: string) {
  const decimals = template.includes(".") ? template.split(".")[1].length : 0;
  const fixed = n.toFixed(decimals);
  return template.includes(",") ? Number(fixed).toLocaleString("en-US", { minimumFractionDigits: decimals }) : fixed;
}

/**
 * 지표 숫자가 화면에 들어올 때 0에서 실제 값까지 부드럽게 올라간다.
 * - 서버 렌더와 스크린 리더에는 처음부터 실제 값이 들어간다(숫자를 지어내지 않는다).
 * - 실제 값 자리를 미리 차지해 두어 숫자가 바뀌는 동안 레이아웃이 흔들리지 않는다.
 * - 동작 줄이기 설정이면 움직이지 않는다.
 */
export function CountUp({ value }: { value: string }) {
  const match = value.match(NUMERIC);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);

  const numberText = match?.[1] ?? "";
  const suffix = match?.[2] ?? "";
  const target = Number(numberText.replace(/,/g, ""));

  useEffect(() => {
    if (!match || reduce || !inView || !Number.isFinite(target)) return;
    const controls = animate(0, target, {
      duration: 0.9,
      ease: [0.2, 0, 0, 1],
      onUpdate: (n) => setDisplay(format(n, numberText) + suffix),
      onComplete: () => setDisplay(value),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);

  if (!match) return <>{value}</>;

  return (
    <span ref={ref} className="relative inline-block">
      <span className="invisible" aria-hidden>
        {value}
      </span>
      <span className="absolute inset-0" aria-hidden>
        {display}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
