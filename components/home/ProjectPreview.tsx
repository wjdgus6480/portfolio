import Image from "next/image";
import type { Project } from "@/content/types";

type Shot = { src: string; alt: string; width?: number; height?: number };

/**
 * 카드 위쪽 미리보기: 상세 페이지에 이미 있는 실제 화면 캡처만 쓴다.
 * - 모바일 화면 캡처(detail.screens)가 있으면 두 장을 겹쳐 세운다
 * - 없으면 AI 결과물 이미지(detail.aiOutput)를 겹쳐 놓는다
 * - 둘 다 없으면 아무것도 그리지 않는다 (가짜 화면을 만들지 않는다)
 */
function pickShots(project: Project): { layout: "portrait" | "landscape"; shots: Shot[] } | null {
  const screens = project.detail?.screens;
  if (screens?.length) return { layout: "portrait", shots: screens.slice(0, 2) };

  const output = project.detail?.aiOutput;
  if (output) return { layout: "landscape", shots: [output.more?.[0] ?? output.result, output.result] };

  return null;
}

export function ProjectPreview({ project }: { project: Project }) {
  const picked = pickShots(project);
  if (!picked) return null;
  const [back, front] = picked.shots.length > 1 ? picked.shots : [null, picked.shots[0]];

  return (
    <div className="relative mb-6 h-52 overflow-hidden rounded-2xl bg-linear-to-br from-accent-soft via-surface-weak to-surface-weak md:h-60">
      <div className="tilt-media absolute inset-0">
        {picked.layout === "portrait" ? (
          <>
            {back && (
              <Shot
                shot={back}
                depth="back"
                className="left-[16%] top-9 w-[30%] -rotate-6 opacity-90 md:w-[27%]"
                aspect="aspect-[9/19.5]"
                sizes="160px"
              />
            )}
            <Shot
              shot={front}
              depth="front"
              className="right-[18%] top-5 w-[34%] rotate-3 md:w-[30%]"
              aspect="aspect-[9/19.5]"
              sizes="180px"
            />
          </>
        ) : (
          <>
            {back && back.src !== front.src && (
              <Shot
                shot={back}
                depth="back"
                className="left-[7%] top-7 w-[44%] -rotate-3"
                sizes="240px"
              />
            )}
            <Shot
              shot={front}
              depth="front"
              className="right-[6%] top-12 w-[64%] rotate-2"
              sizes="360px"
            />
          </>
        )}
      </div>
    </div>
  );
}

type ShotProps = {
  shot: Shot;
  depth: "back" | "front";
  className: string;
  /** 세로 화면 캡처처럼 크기 정보가 없는 이미지의 비율 클래스. 없으면 이미지의 width/height를 쓴다 */
  aspect?: string;
  sizes: string;
};

function Shot({ shot, depth, className, aspect, sizes }: ShotProps) {
  return (
    <div
      data-depth={depth}
      className={`preview-shot absolute overflow-hidden rounded-xl border border-white/80 bg-surface shadow-[0_18px_40px_-18px_rgb(25_31_40/0.35)] ${aspect ?? ""} ${className}`}
      style={!aspect && shot.width && shot.height ? { aspectRatio: `${shot.width} / ${shot.height}` } : undefined}
    >
      <Image src={shot.src} alt={shot.alt} fill sizes={sizes} className="object-cover object-top" />
    </div>
  );
}
