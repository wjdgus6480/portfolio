"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { NetworkScene } from "@/components/three/network-scene";

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

type Status = "loading" | "ready" | "fallback";

/**
 * Hero 오른쪽 3D 네트워크. 텍스트가 먼저 그려진 뒤(브라우저가 한가할 때) three.js를 불러온다.
 * - WebGL 미지원 · 데이터 절약 모드 · 로드 실패: 정적 SVG로 대체
 * - 화면 밖이거나 탭이 숨겨지면 렌더링을 멈추고, 떠날 때 GPU 자원을 정리한다
 * - 스크롤하면 장면이 뒤로 물러나며 흐려져 다음 섹션으로 넘어간다
 */
export function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("loading");
  const reduceMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 140]);
  const scale = useTransform(scrollY, [0, 700], [1, 0.86]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lite = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;

    let disposed = false;
    let scene: NetworkScene | null = null;
    let visible = true;

    const sync = () => scene?.setActive(visible && document.visibilityState === "visible");

    const load = () => {
      if (saveData || !supportsWebGL()) {
        setStatus("fallback");
        return;
      }
      import("@/components/three/network-scene")
        .then(({ createNetworkScene }) => {
          if (disposed) return;
          scene = createNetworkScene(mount, { lite, reducedMotion: reduced });
          sync();
          setStatus("ready");
        })
        .catch(() => {
          if (!disposed) setStatus("fallback");
        });
    };

    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(load, { timeout: 1200 })
      : window.setTimeout(load, 200);

    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    visibility.observe(mount);
    document.addEventListener("visibilitychange", sync);

    // 마우스 위치를 -1 ~ 1로 바꿔 장면을 미세하게 기울인다 (마우스 · 트랙패드에서만)
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const onPointerMove = (event: PointerEvent) => {
      scene?.setPointer((event.clientX / window.innerWidth) * 2 - 1, (event.clientY / window.innerHeight) * 2 - 1);
    };
    if (finePointer && !reduced) window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      disposed = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      visibility.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("pointermove", onPointerMove);
      scene?.dispose();
    };
  }, []);

  return (
    <motion.div
      aria-hidden
      className="relative size-full"
      style={reduceMotion ? undefined : { y, scale, opacity }}
    >
      {/* 장면 뒤 은은한 빛: 3D가 늦게 뜨거나 없어도 첫 화면이 비어 보이지 않는다 */}
      <div className="hero-glow absolute inset-[8%] rounded-full" />
      {status === "fallback" && <StaticNetwork />}
      <div
        ref={mountRef}
        className={`absolute inset-0 transition-opacity duration-700 ease-out ${
          status === "ready" ? "opacity-100" : "opacity-0"
        }`}
      />
    </motion.div>
  );
}

/** WebGL을 쓸 수 없을 때의 정적 대체 그림: 같은 구조(연결된 노드 + 안쪽 골격 + 궤도)를 2D로 */
function StaticNetwork() {
  const nodes = Array.from({ length: 22 }, (_, i) => {
    const angle = (i / 22) * Math.PI * 2;
    const r = i % 2 === 0 ? 150 : 112;
    return [200 + Math.cos(angle) * r, 200 + Math.sin(angle) * r * 0.92] as const;
  });
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 m-auto size-[88%] text-accent-vivid">
      <ellipse cx="200" cy="200" rx="190" ry="70" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeDasharray="3 5" transform="rotate(-18 200 200)" />
      {nodes.map(([x, y], i) => {
        const [nx, ny] = nodes[(i + 1) % nodes.length];
        const [ox, oy] = nodes[(i + 5) % nodes.length];
        return (
          <g key={i}>
            <line x1={x} y1={y} x2={nx} y2={ny} stroke="currentColor" strokeOpacity="0.3" />
            {i % 3 === 0 && <line x1={x} y1={y} x2={ox} y2={oy} stroke="currentColor" strokeOpacity="0.18" />}
            <circle cx={x} cy={y} r={i % 4 === 0 ? 5 : 3} className="fill-accent" />
          </g>
        );
      })}
      <polygon points="200,140 252,170 252,230 200,260 148,230 148,170" fill="none" className="stroke-accent" strokeOpacity="0.5" />
      <polygon points="200,140 252,230 148,230" fill="none" className="stroke-accent" strokeOpacity="0.3" />
    </svg>
  );
}
