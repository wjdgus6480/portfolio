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
 * 프로젝트 카드: 로고 · 이름 · 상태 + 한 줄 소개 + AI 역할.
 * 카드 전체가 상세 페이지 링크이고(제목 링크를 카드 크기로 늘림), links.demo가 있으면 공개 서비스로 바로 가는 버튼을 함께 둔다.
 * 링크 안에 링크를 넣을 수 없어 카드 자체는 div다.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const demo = project.links?.demo;

  return (
    <div className="group relative flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors duration-150 ease-out hover:border-border-strong md:p-8">
      <div className="flex items-center gap-4">
        <BrandMark project={project} size="card" />
        <div className="min-w-0 flex-1">
          <ViewTransition name={titleTransitionName(project.slug)} share="morph" default="none">
            <h4 className="w-fit text-xl font-bold tracking-tight">
              <Link
                href={`/projects/${project.slug}`}
                transitionTypes={["nav-forward"]}
                className="after:absolute after:inset-0 after:rounded-2xl"
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

      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6">
        {demo && (
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} 바로 실행 (새 창)`}
            className="relative z-10 inline-flex h-11 items-center gap-1.5 rounded-lg bg-accent px-4 text-sm font-medium text-white transition-colors duration-150 hover:bg-accent-hover"
          >
            바로 실행
            <span aria-hidden>↗</span>
          </a>
        )}
        <span
          aria-hidden
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors duration-150 group-hover:text-accent"
        >
          자세히 보기
          <span className="transition-transform duration-150 group-hover:translate-x-0.5">→</span>
        </span>
      </div>
    </div>
  );
}
