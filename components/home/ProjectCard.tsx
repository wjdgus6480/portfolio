import Link from "next/link";
import { ViewTransition } from "react";
import type { Project } from "@/content/types";
import { BrandMark, titleTransitionName } from "@/components/project/BrandMark";
import { AiRole } from "@/components/ui/AiRole";
import { StatusBadge } from "@/components/ui/StatusBadge";

type ProjectCardProps = {
  project: Project;
};

/** 프로젝트 카드: 로고 · 이름 · 상태 + 한 줄 소개 + AI 역할. 자세한 내용은 상세 페이지에서 보여준다. */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      transitionTypes={["nav-forward"]}
      className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors duration-150 ease-out hover:border-border-strong md:p-8"
    >
      <div className="flex items-center gap-4">
        <BrandMark project={project} size="card" />
        <div className="min-w-0 flex-1">
          <ViewTransition name={titleTransitionName(project.slug)} share="morph" default="none">
            <h4 className="w-fit text-xl font-bold tracking-tight">{project.title}</h4>
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

      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-foreground transition-colors duration-150 group-hover:text-accent">
        자세히 보기
        <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-0.5">→</span>
      </span>
    </Link>
  );
}
