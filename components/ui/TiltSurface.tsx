"use client";

import { useRef } from "react";

type TiltSurfaceProps = {
  children: React.ReactNode;
  className?: string;
};

const canTilt = () =>
  window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches;

/**
 * 포인터 위치에 따라 살짝 기우는 카드 면. 실제 기울기 · 빛 · 미리보기 시차는 globals.css의
 * .tilt-surface / .tilt-glare / .tilt-media가 --tilt-x · --tilt-y로 계산한다.
 * 터치 기기와 동작 줄이기 설정에서는 아무것도 하지 않는다.
 */
export function TiltSurface({ children, className = "" }: TiltSurfaceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || event.pointerType !== "mouse" || !canTilt()) return;
    const { clientX, clientY } = event;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((clientY - rect.top) / rect.height) * 2 - 1;
      el.style.setProperty("--tilt-x", x.toFixed(3));
      el.style.setProperty("--tilt-y", y.toFixed(3));
      el.dataset.tilting = "";
    });
  };

  const onPointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    el.style.removeProperty("--tilt-x");
    el.style.removeProperty("--tilt-y");
    delete el.dataset.tilting;
  };

  return (
    <div ref={ref} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} className={`tilt-surface ${className}`}>
      <span aria-hidden className="tilt-glare" />
      {children}
    </div>
  );
}
