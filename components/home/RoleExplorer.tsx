"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import type { HeroRole } from "@/content/types";
import { TechList } from "@/components/ui/TechTag";

/** Hero가 projects.ts에서 찾아 넘겨 주는 프로젝트 정보. 찾지 못한 slug는 미리 빠진다. */
export type RoleProject = {
  slug: string;
  title: string;
  category?: string;
  contributions: string[];
};

export type RoleView = Omit<HeroRole, "projects"> & { projects: RoleProject[] };

type RoleExplorerProps = {
  title: string;
  description: string;
  roles: RoleView[];
};

/**
 * 직무 선택(단일 선택 라디오) + 선택한 직무의 소개 · 역량 · 기술 · 프로젝트.
 * 방향키로 직무를 옮기면 그 직무가 바로 선택된다(WAI-ARIA radio group 패턴).
 * 선택해도 포커스는 직무 버튼에 그대로 둔다.
 */
export function RoleExplorer({ title, description, roles }: RoleExplorerProps) {
  const [selectedId, setSelectedId] = useState(roles[0]?.id);
  const radioRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const headingId = `${baseId}-heading`;
  const panelId = `${baseId}-panel`;

  const selectedIndex = Math.max(
    0,
    roles.findIndex((role) => role.id === selectedId),
  );
  const role = roles[selectedIndex];
  if (!role) return null;

  const select = (index: number) => {
    const next = (index + roles.length) % roles.length;
    setSelectedId(roles[next].id);
    radioRefs.current[next]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowRight: selectedIndex + 1,
      ArrowDown: selectedIndex + 1,
      ArrowLeft: selectedIndex - 1,
      ArrowUp: selectedIndex - 1,
      Home: 0,
      End: roles.length - 1,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    select(keys[event.key]);
  };

  return (
    <div>
      <h2 id={headingId} className="text-[22px] font-bold tracking-tight md:text-[26px]">
        {title}
      </h2>
      <p className="mt-2 text-muted">{description}</p>

      <div
        role="radiogroup"
        aria-labelledby={headingId}
        aria-controls={panelId}
        onKeyDown={onKeyDown}
        className="mt-6 grid grid-cols-1 gap-2 min-[360px]:grid-cols-2 md:grid-cols-4 md:gap-2.5"
      >
        {roles.map((item, index) => {
          const checked = index === selectedIndex;
          return (
            <button
              key={item.id}
              ref={(el) => {
                radioRefs.current[index] = el;
              }}
              type="button"
              role="radio"
              aria-checked={checked}
              tabIndex={checked ? 0 : -1}
              onClick={() => setSelectedId(item.id)}
              className={`pressable flex min-h-14 items-center gap-3 rounded-2xl border px-4 text-left text-[15px] font-semibold transition-colors duration-150 md:text-base ${
                checked
                  ? "border-accent-vivid bg-accent-soft text-accent"
                  : "border-border bg-surface text-muted hover:bg-surface-weak"
              }`}
            >
              <span
                aria-hidden
                className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  checked ? "border-accent-vivid" : "border-border-strong"
                }`}
              >
                {checked && <span className="size-2.5 rounded-full bg-accent-vivid" />}
              </span>
              <span className="min-w-0">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div
        id={panelId}
        role="region"
        aria-label={`${role.label} 직무 역량과 프로젝트`}
        className="mt-4 rounded-3xl bg-surface-weak p-5 md:p-8"
      >
        <div key={role.id} className="role-fade">
          <p className="text-[13px] font-bold text-accent">{role.label}</p>
          <p aria-live="polite" className="mt-1.5 text-lg font-bold leading-snug tracking-tight md:text-xl">
            {role.intro}
          </p>

          {Boolean(role.competencies?.length || role.tech?.length) && (
            <dl className="mt-6 grid gap-5 md:grid-cols-2 md:gap-8">
              {role.competencies?.length ? (
                <div>
                  <dt className="text-sm font-bold text-subtle">핵심 역량</dt>
                  <dd className="mt-2.5">
                    <ul className="flex flex-wrap gap-2">
                      {role.competencies.map((item) => (
                        <li key={item.name}>
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[13px] font-semibold ${
                              item.learned
                                ? "border-dashed border-border-strong bg-transparent text-muted"
                                : "border-border bg-surface text-foreground"
                            }`}
                          >
                            {item.name}
                            {item.learned && <span className="text-[12px] font-medium text-subtle">학습</span>}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {role.competencies.some((item) => item.learned) && (
                      <p className="mt-2 text-[13px] text-subtle">
                        점선 표시는 학습한 개념이에요. 실제 적용 경험과 구분했어요.
                      </p>
                    )}
                  </dd>
                </div>
              ) : null}

              {role.tech?.length ? (
                <div>
                  <dt className="text-sm font-bold text-subtle">관련 기술</dt>
                  <dd className="mt-2.5">
                    <TechList items={role.tech} withIcon tone="accent" />
                  </dd>
                </div>
              ) : null}
            </dl>
          )}

          <h3 className="mt-7 text-sm font-bold text-subtle">관련 프로젝트</h3>
          {role.projects.length > 0 ? (
            <ul className="mt-2.5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {role.projects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    transitionTypes={["nav-forward"]}
                    className="pressable card-interactive group flex h-full items-start gap-3 rounded-2xl bg-surface p-5"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-[17px] font-bold tracking-tight">{project.title}</p>
                      {project.category && <p className="text-[13px] text-subtle">{project.category}</p>}
                      <ul className="mt-3 space-y-1">
                        {project.contributions.map((item) => (
                          <li key={item} className="flex gap-2 text-[15px] leading-snug text-muted">
                            <span aria-hidden className="mt-[0.55em] size-1 shrink-0 rounded-full bg-placeholder" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <svg
                      aria-hidden
                      viewBox="0 0 20 20"
                      className="mt-1 size-5 shrink-0 text-placeholder transition-[color,translate] duration-150 group-hover:translate-x-0.5 group-hover:text-accent-vivid"
                    >
                      <path d="M7.5 4.5 13 10l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2.5 rounded-2xl bg-surface p-5 text-[15px] text-muted">
              관련 프로젝트를 준비하고 있습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
