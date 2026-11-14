import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import type { Project } from "@/content/types";
import { BrandMark, titleTransitionName } from "@/components/project/BrandMark";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TechList } from "@/components/ui/TechTag";

type ProjectCardProps = {
  project: Project;
  /** 쇼케이스 순번 (1부터) */
  index: number;
};

/**
 * 대표 프로젝트 카드. 위계: 이름 → 한 줄 설명 → What I built · Problem · Solution · Result → 기술 태그 → 하단 증거 숫자.
 * 숫자는 문제를 이해시키는 보조 증거로만 맨 아래에 둔다. 브랜드 마크와 제목은 상세 헤더로 morph된다.
 */
export function ProjectCard({ project, index }: ProjectCardProps) {
  const { cover, links, brief } = project;
  const evidence = project.evidence ?? project.detail?.metrics?.slice(0, 4);
  const portrait = cover ? cover.height > cover.width : false;
  const href = `/projects/${project.slug}`;

  const rows = brief
    ? [
        { label: "What I built", text: brief.built },
        { label: "Problem", text: brief.problem, strong: true },
        { label: "Solution", text: brief.solution },
        { label: "Result", text: brief.result },
      ]
    : [];

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div
        className={`grid gap-8 p-5 sm:p-7 lg:p-10 ${
          portrait ? "md:grid-cols-[1fr_auto]" : "lg:grid-cols-[1fr_auto]"
        }`}
      >
        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-mono text-xs text-accent">{String(index).padStart(2, "0")}</span>
            {project.track && <span className="font-mono text-xs font-semibold">{project.track}</span>}
            <StatusBadge status={project.status} />
            {project.period && <span className="font-mono text-xs text-subtle">{project.period}</span>}
          </p>

          <Link href={href} transitionTypes={["nav-forward"]} className="group mt-5 flex items-center gap-4">
            <BrandMark project={project} size="card" />
            <ViewTransition name={titleTransitionName(project.slug)} share="morph" default="none">
              <h3 className="text-[1.75rem] font-extrabold tracking-[-0.02em] transition-colors duration-150 group-hover:text-accent md:text-4xl">
                {project.title}
              </h3>
            </ViewTransition>
          </Link>

          {project.summary && <p className="mt-3 text-base leading-relaxed text-muted md:text-lg">{project.summary}</p>}

          {rows.length > 0 && (
            <dl className="mt-7 divide-y divide-border border-y border-border">
              {rows.map((row) => (
                <div key={row.label} className="grid gap-1 py-3.5 sm:grid-cols-[120px_1fr] sm:gap-4">
                  <dt className="font-mono text-xs uppercase tracking-[0.1em] text-subtle sm:pt-1">{row.label}</dt>
                  <dd
                    className={
                      row.strong
                        ? "text-[17px] font-semibold leading-relaxed md:text-lg"
                        : "text-[15px] leading-relaxed md:text-base"
                    }
                  >
                    {row.text}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {project.tech?.length ? (
            <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-2">
              <span className="font-mono text-xs uppercase tracking-[0.1em] text-subtle">Tech</span>
              <TechList items={project.tech} />
            </div>
          ) : null}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={href}>Case Study →</ButtonLink>
            {links?.demo && (
              <ButtonLink href={links.demo} variant="secondary">
                Demo ↗
              </ButtonLink>
            )}
            {links?.blog && (
              <ButtonLink href={links.blog} variant="secondary">
                운영 블로그 ↗
              </ButtonLink>
            )}
            {links?.github && (
              <ButtonLink href={links.github} variant="secondary">
                GitHub ↗
              </ButtonLink>
            )}
          </div>
        </div>

        {cover && (
          <figure className={portrait ? "mx-auto w-44 md:w-48 lg:w-56" : "w-full max-w-xl lg:w-96"}>
            <Image
              src={cover.src}
              alt={cover.alt}
              width={cover.width}
              height={cover.height}
              sizes={portrait ? "224px" : "(min-width: 1024px) 384px, 576px"}
              className={`h-auto w-full border border-border ${portrait ? "rounded-2xl" : "rounded-xl"}`}
            />
            <figcaption className="mt-2 text-center text-xs text-muted">{cover.caption}</figcaption>
          </figure>
        )}
      </div>

      {evidence?.length ? (
        <dl
          aria-label={`${project.title} 검증 근거`}
          className="grid grid-cols-2 gap-px border-t border-border bg-border sm:grid-cols-4"
        >
          {evidence.map(({ value, label }) => (
            <div key={label} className="flex flex-col-reverse bg-surface-weak px-5 py-4 sm:px-7 lg:px-10">
              <dt className="mt-1 text-xs leading-snug text-muted">{label}</dt>
              <dd className="text-lg font-bold tracking-tight md:text-xl">{value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </article>
  );
}
