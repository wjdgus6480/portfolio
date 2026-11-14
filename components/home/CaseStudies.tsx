import Link from "next/link";
import { cases } from "@/content/cases";
import { sections } from "@/content/site";
import type { EngineeringCase } from "@/content/types";
import { codeHref, getProjectBySlug } from "@/lib/projects";
import { CodePath } from "@/components/ui/CodePath";
import { Section } from "@/components/ui/Section";

/** 05 Engineering Case Study. Problem · Cause · Decision · Implementation · Verification · Result 고정 순서. */
export function CaseStudies() {
  if (cases.length === 0) return null;

  return (
    <Section
      {...sections.cases}
      title="어떤 문제를, 왜 이렇게 풀었는가"
      description="코드 설명보다 설계를 고른 이유에 집중했습니다. 모든 내용은 저장소 코드 · 테스트에서 확인한 것입니다."
    >
      <ol className="space-y-6 md:space-y-8">
        {cases.map((item, i) => (
          <li key={item.title}>
            <CaseCard item={item} index={i + 1} />
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Cell({ label, children, accent }: { label: string; children: React.ReactNode; accent?: boolean }) {
  return (
    <div className={`p-5 md:p-6 ${accent ? "bg-accent-soft" : "bg-surface"}`}>
      <p className={`font-mono text-xs uppercase tracking-[0.12em] ${accent ? "text-accent" : "text-subtle"}`}>
        {label}
      </p>
      <div className="mt-2 text-[15px] leading-relaxed">{children}</div>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((text) => (
        <li key={text} className="flex gap-2">
          <span aria-hidden className="text-placeholder">
            –
          </span>
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}

function CaseCard({ item, index }: { item: EngineeringCase; index: number }) {
  const project = getProjectBySlug(item.project);

  return (
    <article className="overflow-hidden rounded-2xl border border-border">
      <header className="flex flex-col gap-2 border-b border-border bg-surface px-5 py-5 md:flex-row md:items-baseline md:gap-6 md:px-6">
        <p className="shrink-0 font-mono text-xs uppercase tracking-[0.14em]">
          <span className="text-accent">Case {String(index).padStart(2, "0")}</span>
          {project && <span className="text-subtle"> · {project.title}</span>}
        </p>
        <h3 className="text-xl font-bold tracking-tight md:text-2xl">{item.title}</h3>
      </header>

      <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
        <Cell label="Problem">
          <p className="font-semibold">{item.problem}</p>
        </Cell>
        <Cell label="Cause">
          <p>{item.cause}</p>
        </Cell>
        <Cell label="Decision">
          <p className="font-semibold">{item.decision.chosen}</p>
          {item.decision.alternative && (
            <p className="mt-2 text-sm text-muted">
              대안: {item.decision.alternative}
              {item.decision.whyNot && <> — {item.decision.whyNot}</>}
            </p>
          )}
        </Cell>
        <Cell label="Implementation">
          <Bullets items={item.implementation} />
        </Cell>
        <Cell label="Verification">
          <Bullets items={item.verification} />
        </Cell>
        <Cell label="Result" accent>
          <p className="text-base font-bold md:text-lg">{item.result}</p>
        </Cell>
      </div>

      {(item.evidence.length > 0 || project) && (
        <footer className="flex flex-col gap-3 border-t border-border bg-surface px-5 py-4 md:flex-row md:items-center md:justify-between md:px-6">
          {item.evidence.length > 0 && (
            <details className="min-w-0 text-sm">
              <summary className="cursor-pointer text-subtle hover:text-foreground">
                코드 근거 {item.evidence.length}곳
              </summary>
              <ul className="mt-2 space-y-1">
                {item.evidence.map((path) => (
                  <li key={path}>
                    <CodePath path={path} href={project ? codeHref(project, path) : undefined} />
                  </li>
                ))}
              </ul>
            </details>
          )}
          {project && (
            <Link
              href={`/projects/${project.slug}`}
              transitionTypes={["nav-forward"]}
              className="shrink-0 text-sm font-medium text-accent hover:text-accent-hover"
            >
              {project.title} Case Study →
            </Link>
          )}
        </footer>
      )}
    </article>
  );
}
