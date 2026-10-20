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

      {/* 제목 줄 폭을 한 줄 소개 폭에 맞춰, QR이 소개 문장 끝 위에 오게 한다 */}
      <div className="w-fit max-w-full">
      <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-8">
        <BrandMark project={project} size="hero" />
        <div className="min-w-0 flex-1">
          {(project.status || project.period) && (
            <div className="reveal flex items-center gap-3">
              <StatusBadge status={project.status} />
              {project.status && project.period && <span className="text-subtle">·</span>}
              {project.period && (
                <span className="font-mono text-xs text-muted">{project.period}</span>
              )}
            </div>
          )}

          <div className="mt-4 flex items-center justify-between gap-4">
            <ViewTransition name={titleTransitionName(project.slug)} share="morph" default="none">
              <h1 className="w-fit text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.15] tracking-[-0.03em]">
                {project.title}
              </h1>
            </ViewTransition>
            {project.qr && (
              <figure className="reveal flex shrink-0 flex-col items-center gap-1">
                <Image
                  src={project.qr.src}
                  alt={project.qr.alt}
                  width={80}
                  height={80}
                  unoptimized
                  className="size-16 sm:size-20"
                />
                <figcaption className="text-[10px] text-subtle sm:text-xs">QR로 직접 이용하기</figcaption>
              </figure>
            )}
          </div>
        </div>
      </div>

      {project.summary ? (
        <p className="reveal mt-8 max-w-[36em] text-lg leading-relaxed text-muted md:text-xl">
          {project.summary}
        </p>
      ) : (
        <p className="reveal mt-8 text-lg text-subtle">설명 준비 중</p>
      )}
      </div>

      {project.tech?.length ? (
        <div className="reveal mt-8">
          <TechList items={project.tech} />
        </div>
      ) : null}

      {(links?.github || links?.demo || links?.blog) && (
        <div className="reveal mt-8 flex flex-col gap-3 sm:flex-row">
          {links.demo && <ButtonLink href={links.demo}>Demo</ButtonLink>}
          {links.blog && <ButtonLink href={links.blog}>운영 블로그</ButtonLink>}
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
