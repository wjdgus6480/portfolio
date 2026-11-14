import Link from "next/link";
import { sections } from "@/content/site";
import { getBackendProject } from "@/lib/projects";
import { Section } from "@/components/ui/Section";

/** 레이어 한 줄 역할. 상세 역할 · 코드 위치는 detail.backend.layers (Case Study 페이지) */
const layerRoles = ["요청 입구", "비즈니스 규칙과 판정", "DB 접근", "스키마와 데이터 저장"];

/** 06 Backend Architecture. 대표 백엔드 프로젝트(집플랜)의 실제 데이터 흐름과 4개 계층. */
export function Architecture() {
  const source = getBackendProject();
  if (!source) return null;
  const { project, backend } = source;
  const tableTotal = backend.tables.reduce((sum, t) => sum + t.count, 0);

  return (
    <Section
      {...sections.architecture}
      title={`${project.title}의 서버는 이렇게 흐릅니다`}
      description="Next.js Route Handler · Server Actions → 서버 전용 도메인 로직 → 저장소 → MySQL. 코드에 있는 실제 구조입니다."
    >
      <ol aria-label="데이터 흐름" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-0">
        {backend.dataFlow.map((step, i) => (
          <li key={step} className="relative flex lg:pr-6">
            <div
              className={`flex w-full flex-col justify-between rounded-xl border px-4 py-4 ${
                i === backend.dataFlow.length - 1 ? "border-accent bg-accent-soft" : "border-border bg-surface"
              }`}
            >
              <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
              <span className="mt-3 font-semibold leading-tight">{step}</span>
            </div>
            {i < backend.dataFlow.length - 1 && (
              <span aria-hidden className="absolute right-1.5 top-1/2 hidden -translate-y-1/2 text-placeholder lg:block">
                →
              </span>
            )}
          </li>
        ))}
      </ol>

      <ol aria-label="계층" className="mt-10 overflow-hidden rounded-2xl border border-border">
        {backend.layers.map((layer, i) => (
          <li
            key={layer.name}
            className="grid gap-2 border-b border-border bg-surface px-5 py-5 last:border-b-0 md:grid-cols-[72px_280px_1fr] md:items-baseline md:gap-6 md:px-6"
          >
            <span className="font-mono text-2xl font-bold text-accent">L{i + 1}</span>
            <div>
              <p className="text-lg font-bold tracking-tight">{layer.name}</p>
              {layerRoles[i] && <p className="text-sm font-medium text-muted">{layerRoles[i]}</p>}
            </div>
            <p className="text-[15px] leading-relaxed text-muted">{layer.role}</p>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex flex-col gap-3 text-sm md:flex-row md:items-baseline md:justify-between">
        <p className="text-muted">
          <span className="font-semibold text-foreground">테이블 {tableTotal}개</span> —{" "}
          {backend.tables.map((t) => `${t.domain} ${t.count}`).join(" · ")}
        </p>
        <Link
          href={`/projects/${project.slug}`}
          transitionTypes={["nav-forward"]}
          className="shrink-0 font-medium text-accent hover:text-accent-hover"
        >
          API {backend.api.length}개 · Server Actions {backend.actions.length}개 목록 →
        </Link>
      </div>
    </Section>
  );
}
