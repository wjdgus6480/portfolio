import Link from "next/link";
import { ViewTransition } from "react";
import type { Project } from "@/content/types";
import { BrandMark, titleTransitionName } from "@/components/project/BrandMark";

type ProjectCardProps = {
  project: Project;
};

/** 작은 둥근 타일: 아이콘 + 이름 (+ 넓은 화면에서 한 줄 소개). 자세한 내용은 상세 페이지에서 보여준다. */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      transitionTypes={["nav-forward"]}
      className="group flex h-full flex-col items-center gap-2 rounded-2xl border border-border bg-surface px-1.5 py-3 text-center transition-colors duration-150 ease-out hover:border-border-strong sm:rounded-3xl sm:px-3 sm:py-4"
    >
      <div className="transition-transform duration-200 ease-out group-hover:scale-[1.06]">
        <BrandMark project={project} size="card" />
      </div>

      <ViewTransition name={titleTransitionName(project.slug)} share="morph" default="none">
        <h3 className="line-clamp-2 w-full [overflow-wrap:anywhere] [word-break:normal] text-xs font-semibold leading-snug tracking-tight sm:text-sm md:text-base">
          {project.title}
        </h3>
      </ViewTransition>

      {project.category && (
        <p className="-mt-1.5 w-full truncate text-[10px] text-subtle sm:text-xs">{project.category}</p>
      )}

      {project.summary && (
        <p className="hidden text-xs leading-relaxed text-muted md:line-clamp-2">{project.summary}</p>
      )}
    </Link>
  );
}
