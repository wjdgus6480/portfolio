import Link from "next/link";
import type { Project } from "@/content/types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TechTag } from "@/components/ui/TechTag";

type ProjectListProps = {
  projects: Project[];
  startNumber: number;
};

export function ProjectList({ projects, startNumber }: ProjectListProps) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {projects.map((project, i) => (
        <li key={project.slug}>
          <Link
            href={`/projects/${project.slug}`}
            className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-5 md:grid-cols-[3rem_14rem_1fr_auto] md:gap-x-6"
          >
            <span className="font-mono text-xs text-subtle">
              {String(startNumber + i).padStart(2, "0")}
            </span>
            <span className="font-semibold tracking-tight transition-colors duration-150 group-hover:text-accent">
              {project.title}
            </span>
            <span className="col-start-2 mt-1 text-sm text-muted md:col-start-auto md:mt-0">
              {project.summary ?? <span className="text-subtle">설명 준비 중</span>}
            </span>
            <span className="col-start-3 row-start-1 flex items-center gap-3 md:col-start-auto">
              <span className="hidden gap-1.5 lg:flex">
                {project.tech?.slice(0, 3).map((item) => (
                  <TechTag key={item}>{item}</TechTag>
                ))}
              </span>
              <StatusBadge status={project.status} />
              <span
                aria-hidden
                className="text-subtle transition-transform duration-150 group-hover:translate-x-1 group-hover:text-foreground"
              >
                →
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
