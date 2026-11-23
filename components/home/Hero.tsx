import { profile } from "@/content/profile";
import { sections } from "@/content/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import type { JSX } from "react";

interface ProjectCardProps {
  project: { slug: string; label: string; contribution: string };
  index: number;
}

/**
 * 인터랙티브 히어로 컴포넌트
 * 
 * - 6 개 직무 선택 (라디오 버튼 방식, 단일 선택)
 * - 기본값: Backend
 * - 직무 변경 시 관련 역량/기술/프로젝트 자동 전환
 * - 프로젝트 카드 클릭 → 실제 상세 페이지 (/projects/[slug]) 로 이동
 */

export function Hero() {
  // ────────────────────────────────────────────────────────
  // State Management
  // ────────────────────────────────────────────────────────
  const [selectedRoleId, setSelectedRoleId] = React.useState<string>("backend");
  
  const selectedRole = profile.roles[selectedRoleId];

  // ────────────────────────────────────────────────────────
  // Navigation Helper
  // ────────────────────────────────────────────────────────
  function navigateToProject(slug: string) {
    // Next.js 서버 컴포넌트 환경에서 클라이언트 측 이동 처리
    window.open(`/projects/${slug}`, "_self");
  }

  return (
    <section id="top" className="pb-20 pt-20 md:pb-32 md:pt-36">
      <Container>
        {/* 로고 및 네비게이션 (기존 포트폴리오 헤더 스타일 재사용 권장) */}
        <div className="flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-subtle">YJH.</p>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <ButtonLink href={`#${sections.about.id}`}>About</ButtonLink>
            <ButtonLink href={`#${sections.work.id}`}>Projects</ButtonLink>
            <ButtonLink href={`#${sections.contact.id}`}>Contact</ButtonLink>
          </nav>
        </div>

        {/* 메인 소개 (직무 선택과 관계없이 고정) */}
        <div className="mt-10 md:mt-16">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-subtle">
            SOFTWARE DEVELOPER
          </p>
          <h1 className="mt-6 max-w-[14em] text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.1] tracking-[-0.035em] text-foreground">
            문제를 발견하고,<br />직접 구현합니다.
          </h1>
          <p className="mt-6 max-w-[34em] text-lg leading-relaxed text-muted md:whitespace-pre-line md:text-xl">
            데이터로 원인을 분석하고 기술로 해결하는 개발자, 윤정현입니다.
          </p>
        </div>

        {/* 직무 선택 UI */}
        <div className="mt-12 md:mt-16">
          <p className="mb-5 text-sm font-semibold text-subtle">어떤 역량을 찾고 계신가요?</p>
          
          <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="직무 선택">
            {(["backend", "fullstack", "fde", "ax", "productpm", "growth"] as const).map((roleId) => (
              <RoleButton
                key={roleId}
                roleId={roleId}
                label={profile.roles[roleId].label}
                selectedRoleId={selectedRoleId}
                onSelect={setSelectedRoleId}
              />
            ))}
          </div>
        </div>

        {/* 직무별 콘텐츠 전환 */}
        {selectedRole && (
          <div className="mt-8 md:mt-12">
            <div className="mb-6 max-w-[34em] text-lg leading-relaxed">
              {selectedRole.intro}
            </div>

            {/* 관련 기술 */}
            <div className="mb-8">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-subtle">관련 기술</p>
              <div className="flex flex-wrap gap-2">
                {selectedRole.tech.length > 0 ? (
                  selectedRole.tech.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-muted hover:border-accent cursor-default"
                    >
                      {tech}
                    </span>
                  ))
                ) : (
                  <span className="text-subtle italic">관련 기술 스택 정의 중</span>
                )}
              </div>
            </div>

            {/* 관련 프로젝트 */}
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-subtle">관련 프로젝트</p>
              
              {selectedRole.projects.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {selectedRole.projects.map((project, index) => (
                    <ProjectCard
                      key={project.slug}
                      project={project}
                      index={index}
                      onClick={() => navigateToProject(project.slug)}
                    />
                  ))}
                </div>
              ) : (
                <p className="italic text-subtle">
                  {roleId === "fde" 
                    ? "현재 해당 직무의 프로젝트는 없습니다."
                    : "관련 프로젝트 준비 중입니다."}
                </p>
              )}
            </div>
          </div>
        )}

        {/* 공통 기술 스택 (하단) */}
        <div className="mt-16 border-t border-border pt-10">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-subtle">TECH STACK</p>
          <div className="flex flex-wrap gap-2">
            <TechBadge tech="TypeScript" />
            <TechBadge tech="JavaScript" />
            <TechBadge tech="Node.js" />
            <TechBadge tech="Next.js" />
            <TechBadge tech="React" />
            <TechBadge tech="MySQL" />
            <TechBadge tech="Supabase" />
            <TechBadge tech="Python" />
            <TechBadge tech="Git / GitHub" />
          </div>
        </div>
      </Container>
    </section>
  );
}

// ────────────────────────────────────────────────────────
/** 직무 선택 버튼 (라디오 버튼 방식) */
interface RoleButtonProps {
  roleId: string;
  label: string;
  selectedRoleId: string;
  onSelect: (id: string) => void;
}

function RoleButton({ roleId, label, selectedRoleId, onSelect }: RoleButtonProps): JSX.Element {
  const isSelected = roleId === selectedRoleId;

  return (
    <label className="relative flex cursor-pointer">
      <input
        type="radio"
        name="role"
        aria-checked={isSelected}
        readOnly
        checked={isSelected}
        onChange={() => onSelect(roleId)}
        className="sr-only"
      />
      <div
        className={`flex h-24 min-w-[10rem] flex-col rounded-xl border p-4 transition-all duration-200 ${
          isSelected
            ? "border-accent bg-accent-soft shadow-sm"
            : "border-border hover:border-accent/70"
        }`}
      >
        <span
          className={`mb-auto text-left font-semibold ${
            isSelected ? "text-foreground" : "text-muted"
          }`}
        >
          {label}
        </span>
        
        {/* 선택 시 체크 아이콘 */}
        {isSelected && (
          <svg
            aria-hidden="true"
            className="h-6 w-6 text-accent ml-auto flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M20.285 6.707a1 1 0 0 1 0 1.414l-8.586 8.586a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L11 17.172l7.293-7.293a1 1 0 0 1 1.414 0z"
              fill="currentColor"
            />
          </svg>
        )}
      </div>
    </label>
  );
}

// ────────────────────────────────────────────────────────
/** 프로젝트 카드 */
interface ProjectCardProps {
  project: { slug: string; label: string; contribution: string };
  index: number;
  onClick: () => void;
}

function ProjectCard({ project, index, onClick }: ProjectCardProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      className="group relative flex w-full items-start justify-between rounded-lg border border-border bg-surface p-3 text-left transition-all duration-200 hover:border-accent hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      aria-label={`${project.label} 프로젝트로 이동`}
    >
      <div className="flex min-w-0 gap-3">
        <span className="flex-shrink-0 text-accent font-semibold group-hover:text-accent">{index + 1}.</span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-foreground group-hover:text-accent">
            {project.label}
          </p>
          <p className="truncate text-sm text-muted">{project.contribution}</p>
        </div>
      </div>
      
      {/* 화살표 아이콘 (우측) */}
      <svg
        aria-hidden="true"
        className="h-5 w-5 flex-shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path d="M9.55 5.00006L15 10.45l-5.45 5.45L9.55 10.45 15 5.00006Z" fill="currentColor" />
      </svg>
    </button>
  );
}

// ────────────────────────────────────────────────────────
/** 기술 태그 (공통) */
function TechBadge({ tech }: { tech: string }): JSX.Element {
  return (
    <span className="inline-flex items-center rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-medium text-muted">
      {tech}
    </span>
  );
}
