import Link from "next/link";
import { ViewTransition } from "react";
import type { Project } from "@/content/types";
import { BrandMark, titleTransitionName } from "@/components/project/BrandMark";
import { StatusBadge } from "@/components/ui/StatusBadge";

type ProjectCardProps = {
  project: Project;
  number: string;
};

/** 아이콘 + 이름 + 한 줄 소개. 자세한 내용은 상세 페이지에서 보여준다. */
export function ProjectCard({ project, number }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      transitionTypes={["nav-forward"]}
      className="group flex h-full items-center gap-5 rounded-xl border border-border bg-surface p-5 transition-colors duration-150 ease-out hover:border-border-strong md:p-6"
    >
      <div className="transition-transform duration-200 ease-out group-hover:scale-[1.04]">
        <BrandMark project={project} size="card" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-subtle">{number}</span>
          <StatusBadge status={project.status} />
        </div>

        <ViewTransition name={titleTransitionName(project.slug)} share="morph" default="none">
          <h3 className="mt-1 w-fit text-lg font-semibold tracking-tight md:text-xl">
            {project.title}
          </h3>
        </ViewTransition>

        {project.summary ? (
          <p className="mt-1 text-[15px] leading-relaxed text-muted">{project.summary}</p>
        ) : (
          <p className="mt-1 text-[15px] text-subtle">설명 준비 중</p>
        )}
      </div>

      <span
        aria-hidden
        className="shrink-0 text-subtle transition-[color,transform] duration-150 ease-out group-hover:translate-x-1 group-hover:text-accent"
      >
        →
      </span>
    </Link>
  );
}
