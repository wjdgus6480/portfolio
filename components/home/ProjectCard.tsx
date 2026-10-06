import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TechList } from "@/components/ui/TechTag";

type ProjectCardProps = {
  project: Project;
  number: string;
};

export function ProjectCard({ project, number }: ProjectCardProps) {
  const facts = [
    { label: "Problem", value: project.problem },
    { label: "Solution", value: project.solution },
  ].filter((fact) => fact.value);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col rounded-xl border border-border bg-surface p-6 transition-colors duration-150 ease-out hover:border-border-strong md:p-8"
    >
      {project.image && (
        <div className="relative -mx-6 -mt-6 mb-6 aspect-[16/9] overflow-hidden rounded-t-xl border-b border-border bg-surface-weak md:-mx-8 md:-mt-8 md:mb-8">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-xs text-subtle">
          {number}
          {project.period && <span className="ml-3">{project.period}</span>}
        </span>
        <StatusBadge status={project.status} />
      </div>

      <h3 className="mt-4 text-xl font-semibold tracking-tight md:text-2xl">
        {project.title}
      </h3>

      {project.summary ? (
        <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>
      ) : (
        <p className="mt-3 text-subtle">설명 준비 중</p>
      )}

      {facts.length > 0 && (
        <dl className="mt-6 space-y-3 border-t border-border pt-6 text-[15px]">
          {facts.map((fact) => (
            <div key={fact.label} className="grid grid-cols-[5.5rem_1fr] gap-3">
              <dt className="pt-0.5 font-mono text-xs uppercase tracking-[0.1em] text-subtle">
                {fact.label}
              </dt>
              <dd className="leading-relaxed">{fact.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {project.tech?.length ? (
        <div className="mt-6">
          <TechList items={project.tech} />
        </div>
      ) : null}

      <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-medium text-foreground transition-colors duration-150 ease-out group-hover:text-accent">
        자세히 보기
        <span
          aria-hidden
          className="transition-transform duration-150 ease-out group-hover:translate-x-1"
        >
          →
        </span>
      </span>
    </Link>
  );
}
