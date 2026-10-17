import Image from "next/image";
import { ViewTransition } from "react";
import type { Project } from "@/content/types";

/** 카드와 상세 헤더가 같은 name을 공유해야 페이지 이동 시 morph된다. */
export const brandTransitionName = (slug: string) => `project-brand-${slug}`;
export const titleTransitionName = (slug: string) => `project-title-${slug}`;

const sizes = {
  card: "size-14 rounded-2xl text-2xl md:size-16 md:text-3xl",
  hero: "size-24 rounded-3xl text-4xl md:size-32 md:text-5xl",
};

type BrandMarkProps = {
  project: Pick<Project, "slug" | "title" | "logo">;
  size: keyof typeof sizes;
};

/** 프로젝트 로고. 로고가 없으면 제목 첫 글자 모노그램을 표시한다. */
export function BrandMark({ project, size }: BrandMarkProps) {
  return (
    <ViewTransition name={brandTransitionName(project.slug)} share="morph" default="none">
      <div
        className={`relative flex shrink-0 items-center justify-center overflow-hidden border border-border bg-surface font-bold tracking-tight text-accent ${sizes[size]}`}
      >
        {project.logo ? (
          <Image
            src={project.logo.src}
            alt={project.logo.alt}
            fill
            sizes="128px"
            className="object-cover"
          />
        ) : (
          <span aria-hidden>{Array.from(project.title)[0]?.toUpperCase()}</span>
        )}
      </div>
    </ViewTransition>
  );
}
