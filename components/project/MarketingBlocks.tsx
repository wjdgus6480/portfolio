import Image from "next/image";
import type { ProjectDetail } from "@/content/types";

type Detail = Required<ProjectDetail>;

/** 헤더 아래 핵심 숫자 띠 */
export function MetricStrip({ metrics }: { metrics: Detail["metrics"] }) {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
      {metrics.map(({ value, label }) => (
        <div key={label} className="flex flex-col-reverse bg-surface p-5 md:p-6">
          <dt className="mt-1 text-sm text-muted">{label}</dt>
          <dd className="text-2xl font-bold tracking-tight md:text-3xl">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** 라벨: 값 형태의 짧은 정의 목록 (타깃·목표 등) */
export function LabeledList({ rows }: { rows: Detail["target"] }) {
  return (
    <dl className="space-y-4">
      {rows.map(({ label, value }) => (
        <div key={label} className="grid gap-1 sm:grid-cols-[6rem_1fr] sm:gap-4">
          <dt className="font-semibold text-accent">{label}</dt>
          <dd className="text-lg leading-relaxed">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** 3C 분석 카드 + 차별점 한 줄 */
export function MarketAnalysisBlock({ market }: { market: Detail["market"] }) {
  const cardClass = "rounded-xl border border-border bg-surface p-5";
  const headClass = "font-mono text-xs uppercase tracking-[0.14em] text-subtle";

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className={cardClass}>
          <p className={headClass}>Customer · 고객</p>
          <BulletList items={market.customer} />
        </div>
        <div className={cardClass}>
          <p className={headClass}>Competitor · 기존 대안</p>
          <ul className="mt-3 space-y-3 text-[15px] leading-relaxed">
            {market.competitor.map(({ name, limit }) => (
              <li key={name}>
                <span className="font-semibold">{name}</span>
                <span className="block text-muted">{limit}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={cardClass}>
          <p className={headClass}>Company · 나의 강점</p>
          <BulletList items={market.company} />
        </div>
      </div>
      <p className="rounded-xl bg-accent-soft px-5 py-4 text-lg font-semibold leading-relaxed">
        → {market.insight}
      </p>
    </div>
  );
}

/** 문제(Before)와 해결(After) 나란히 비교 */
export function BeforeAfterBlock({ data }: { data: Detail["beforeAfter"] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-xl border border-border bg-surface-weak p-5">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-subtle">Before</p>
        <BulletList items={data.before} />
      </div>
      <div className="rounded-xl border border-accent/40 bg-surface p-5">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">After · 다누비 AI</p>
        <BulletList items={data.after} />
      </div>
    </div>
  );
}

/** 번호 매긴 사용 흐름 */
export function FlowSteps({ steps }: { steps: Detail["flow"] }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <li key={step} className="rounded-xl border border-border bg-surface p-4">
          <span className="font-mono text-xs text-accent">STEP {i + 1}</span>
          <p className="mt-1.5 leading-relaxed">{step}</p>
        </li>
      ))}
    </ol>
  );
}

/** 모바일 화면 캡처. 세로로 긴 화면이라 모든 폭에서 한 줄 가로 스크롤 */
export function ScreenGallery({ screens }: { screens: Detail["screens"] }) {
  return (
    <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3">
      {screens.map(({ src, alt, caption }, i) => (
        <li key={src} className="w-52 shrink-0 snap-start md:w-56">
          <figure>
            <div className="relative aspect-[750/1624] overflow-hidden rounded-2xl border border-border bg-surface-weak">
              <Image src={src} alt={alt} fill sizes="224px" className="object-cover object-top" />
            </div>
            <figcaption className="mt-2 text-sm leading-relaxed text-muted">
              <span className="mr-1.5 font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
              {caption}
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

/** 추후 계획: 번호 매긴 짧은 카드 */
export function RoadmapList({ steps }: { steps: Detail["roadmap"] }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map(({ title, desc }, i) => (
        <li key={title} className="rounded-xl border border-border bg-surface p-4">
          <span className="font-mono text-xs text-accent">NEXT {i + 1}</span>
          <p className="mt-1.5 font-semibold">{title}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">{desc}</p>
        </li>
      ))}
    </ol>
  );
}

/** 처리 파이프라인: 단계를 화살표로 잇는다 */
export function PipelineChain({ stages }: { stages: Detail["architecture"] }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
      {stages.map((stage, i) => (
        <li key={stage} className="flex items-center gap-1.5">
          <span className="rounded-lg border border-border bg-surface px-2.5 py-1 font-mono text-xs">{stage}</span>
          {i < stages.length - 1 && <span aria-hidden className="text-subtle">→</span>}
        </li>
      ))}
    </ol>
  );
}

/** 기술 결정과 이유 */
export function DecisionList({ decisions }: { decisions: Detail["decisions"] }) {
  return (
    <dl className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
      {decisions.map(({ decision, why }) => (
        <div key={decision} className="grid gap-1 p-4 md:grid-cols-[15rem_1fr] md:gap-6">
          <dt className="font-semibold">{decision}</dt>
          <dd className="leading-relaxed text-muted">{why}</dd>
        </div>
      ))}
    </dl>
  );
}

/** 테스트·품질: 숫자 띠 + 설명 목록 */
export function TestingBlock({ testing }: { testing: Detail["testing"] }) {
  return (
    <div className="space-y-5">
      <MetricStrip metrics={testing.metrics} />
      <BulletList items={testing.items} />
    </div>
  );
}

/** AARRR 퍼널 표 */
export function FunnelTable({ funnel }: { funnel: Detail["funnel"] }) {
  return (
    <div className="space-y-3">
      <ol className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
        {funnel.stages.map(({ stage, tactic, metric }) => (
          <li key={stage} className="grid gap-1 p-4 md:grid-cols-[9rem_1fr_13rem] md:gap-4">
            <span className="font-semibold text-accent">{stage}</span>
            <span className="leading-relaxed">{tactic}</span>
            <span className="text-sm leading-relaxed text-muted md:text-right">{metric}</span>
          </li>
        ))}
      </ol>
      {funnel.note && <p className="text-sm text-subtle">{funnel.note}</p>}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2 text-[15px] leading-relaxed">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span aria-hidden className="text-subtle">·</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
