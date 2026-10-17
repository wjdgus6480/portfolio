import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import type { Project } from "@/content/types";
import { sections } from "@/content/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TechList } from "@/components/ui/TechTag";
import { BrandMark, titleTransitionName } from "./BrandMark";

export function ProjectHeader({ project }: { project: Project }) {
  const { links } = project;

  return (
    <header>
      <Link
        href={`/#${sections.work.id}`}
        transitionTypes={["nav-back"]}
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-150 hover:text-foreground"
      >
        <span aria-hidden>←</span> All projects
      </Link>

      <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-8">
        <BrandMark project={project} size="hero" />
        <div>
          {(project.status || project.period) && (
            <div className="reveal flex items-center gap-3">
              <StatusBadge status={project.status} />
              {project.status && project.period && <span className="text-subtle">·</span>}
              {project.period && (
                <span className="font-mono text-xs text-muted">{project.period}</span>
              )}
            </div>
          )}

          <ViewTransition name={titleTransitionName(project.slug)} share="morph" default="none">
            <h1 className="mt-4 w-fit text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.15] tracking-[-0.03em]">
              {project.title}
            </h1>
          </ViewTransition>
        </div>
      </div>

      {project.summary ? (
        <p className="reveal mt-8 max-w-[36em] text-lg leading-relaxed text-muted md:text-xl">
          {project.summary}
        </p>
      ) : (
        <p className="reveal mt-8 text-lg text-subtle">설명 준비 중</p>
      )}

      {project.tech?.length ? (
        <div className="reveal mt-8">
          <TechList items={project.tech} />
        </div>
      ) : null}

      {(links?.github || links?.demo) && (
        <div className="reveal mt-8 flex flex-col gap-3 sm:flex-row">
          {links.demo && <ButtonLink href={links.demo}>Demo</ButtonLink>}
          {links.github && (
            <ButtonLink href={links.github} variant="secondary">
              GitHub
            </ButtonLink>
          )}
        </div>
      )}

      {project.image && (
        <div className="reveal relative mt-12 aspect-[16/9] overflow-hidden rounded-xl border border-border bg-surface-weak">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            priority
            sizes="(min-width: 1200px) 1120px, 100vw"
            className="object-cover"
          />
        </div>
      )}
    </header>
  );
}
