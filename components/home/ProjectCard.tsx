import Link from "next/link";
import { ViewTransition } from "react";
import type { Project } from "@/content/types";
import { BrandMark, titleTransitionName } from "@/components/project/BrandMark";
import { AiRole } from "@/components/ui/AiRole";
import { StatusBadge } from "@/components/ui/StatusBadge";

type ProjectCardProps = {
  project: Project;
};

/**
 * 프로젝트 카드 (회색 띠 위 흰 카드): 로고 · 이름 · 상태 + 한 줄 소개 + AI가 맡은 일.
 * 카드 전체가 상세 페이지 링크이고(제목 링크를 카드 크기로 늘림), links.demo가 있으면 공개 서비스로 바로 가는 버튼을 함께 둔다.
 * 링크 안에 링크를 넣을 수 없어 카드 자체는 div다.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const demo = project.links?.demo;

  return (
    <div className="pressable card-interactive relative flex h-full flex-col rounded-card bg-surface p-6 md:p-7">
      <div className="flex items-center gap-4">
        <BrandMark project={project} size="card" />
        <div className="min-w-0 flex-1">
          <ViewTransition name={titleTransitionName(project.slug)} share="morph" default="none">
            <h4 className="w-fit text-lg font-bold tracking-tight md:text-xl">
              <Link
                href={`/projects/${project.slug}`}
                transitionTypes={["nav-forward"]}
                className="after:absolute after:inset-0 after:rounded-3xl"
              >
                {project.title}
              </Link>
            </h4>
          </ViewTransition>
          {project.category && <p className="text-sm text-subtle">{project.category}</p>}
        </div>
        <StatusBadge status={project.status} />
      </div>

      {project.summary && (
        <p className="mt-5 leading-relaxed text-muted">{project.summary}</p>
      )}

      {project.aiRole && (
        <div className="mt-4">
          <AiRole role={project.aiRole} size="sm" />
        </div>
      )}

      <div className="mt-auto flex gap-2 pt-6">
        {demo && (
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} 바로 실행하기 (새 창)`}
            className="relative z-10 inline-flex h-12 flex-1 items-center justify-center gap-1.5 rounded-2xl bg-accent px-4 text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-accent-hover"
          >
            바로 실행하기
            <span aria-hidden>↗</span>
          </a>
        )}
        <span
          aria-hidden
          className="inline-flex h-12 flex-1 items-center justify-center rounded-2xl bg-surface-weak px-4 text-[15px] font-semibold text-muted"
        >
          자세히 보기
        </span>
      </div>
    </div>
  );
}
