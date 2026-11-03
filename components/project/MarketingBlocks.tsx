import Image from "next/image";
import type { ProjectDetail } from "@/content/types";

type Detail = Required<ProjectDetail>;

const metricColumns = {
  3: "grid-cols-1 sm:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
};

/** 흰 배경 위 기본 카드: 테두리 없는 회색 면 */
const card = "rounded-3xl bg-surface-weak";
const cardHead = "text-[13px] font-bold text-accent";

/**
 * 핵심 숫자 카드. columns=3은 라벨이 긴 Hero 근거 띠용 (모바일 1열)
 * surface: 카드를 놓는 면의 색. 흰 배경이면 회색 카드, 회색 띠 위면 흰 카드
 */
export function MetricStrip({
  metrics,
  columns = 4,
  surface = "plain",
}: {
  metrics: Detail["metrics"];
  columns?: keyof typeof metricColumns;
  surface?: "plain" | "tinted";
}) {
  return (
    <dl className={`grid gap-3 ${metricColumns[columns]}`}>
      {metrics.map(({ value, label }) => (
        <div
          key={label}
          className={`flex flex-col-reverse rounded-3xl p-5 md:p-6 ${surface === "plain" ? "bg-surface-weak" : "bg-surface"}`}
        >
          <dt className="mt-1 text-sm leading-snug text-muted">{label}</dt>
          <dd className="text-2xl font-bold tracking-tight md:text-[28px]">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** AI 활용 방식: 번호 매긴 카드. 상세 첫 화면에 들어가도록 넓은 화면에서 한 줄로 놓는다 */
export function AiUsageGrid({ items }: { items: Detail["aiUsage"] }) {
  return (
    <ol className={`grid gap-3 sm:grid-cols-2 ${items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
      {items.map(({ title, desc }, i) => (
        <li key={title} className={`${card} p-5`}>
          <span className="inline-flex size-7 items-center justify-center rounded-full bg-accent-soft text-[13px] font-bold text-accent">
            {i + 1}
          </span>
          <p className="mt-3 font-bold tracking-tight">{title}</p>
          <p className="mt-1 text-[15px] leading-relaxed text-muted">{desc}</p>
        </li>
      ))}
    </ol>
  );
}

/** 모델 비교 표. 좁은 화면에서는 가로 스크롤 없이 행마다 카드로 바뀐다 */
export function ModelEvalTable({ data }: { data: Detail["modelEval"] }) {
  const result = (row: Detail["modelEval"]["rows"][number]) => (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-bold ${
        row.adopted ? "bg-accent text-white" : "bg-surface text-subtle"
      }`}
    >
      {row.adopted ? "✓ " : "✕ "}
      {row.result}
    </span>
  );

  return (
    <div className="space-y-3">
      <div className={`hidden overflow-hidden md:block ${card}`}>
      <table className="w-full text-left">
        <thead className="text-[13px] font-bold text-subtle">
          <tr>
            <th scope="col" className="px-5 pb-2 pt-4">모델</th>
            <th scope="col" className="px-5 pb-2 pt-4">결과</th>
            <th scope="col" className="px-5 pb-2 pt-4">이유</th>
          </tr>
        </thead>
        <tbody className="divide-y-2 divide-surface">
          {data.rows.map((row) => (
            <tr key={row.model} className={row.adopted ? "bg-accent-soft" : undefined}>
              <th scope="row" className="px-5 py-4 font-bold">{row.model}</th>
              <td className="whitespace-nowrap px-5 py-4">{result(row)}</td>
              <td className="px-5 py-4 leading-relaxed text-muted">{row.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <ul className="space-y-3 md:hidden">
        {data.rows.map((row) => (
          <li
            key={row.model}
            className={`rounded-3xl p-5 ${row.adopted ? "bg-accent-soft" : "bg-surface-weak"}`}
          >
            <p className="flex items-center justify-between gap-3">
              <span className="font-bold">{row.model}</span>
              {result(row)}
            </p>
            <p className="mt-1 text-[15px] leading-relaxed text-muted">{row.reason}</p>
          </li>
        ))}
      </ul>

      {data.note && <p className="text-sm leading-relaxed text-subtle">{data.note}</p>}
    </div>
  );
}

/** 라벨: 값 형태의 짧은 정의 목록 (타깃·목표 등) */
export function LabeledList({ rows }: { rows: Detail["target"] }) {
  return (
    <dl className="space-y-4">
      {rows.map(({ label, value }) => (
        <div key={label} className="grid gap-1 sm:grid-cols-[6rem_1fr] sm:gap-4">
          <dt className="font-bold text-accent">{label}</dt>
          <dd className="text-lg leading-relaxed">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** 3C 분석 카드 + 차별점 한 줄 */
export function MarketAnalysisBlock({ market }: { market: Detail["market"] }) {
  const cardClass = `${card} p-5`;
  const headClass = cardHead;

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
      <p className="rounded-3xl bg-accent-soft px-5 py-4 text-lg font-bold leading-relaxed">
        → {market.insight}
      </p>
    </div>
  );
}

/** 문제(Before)와 해결(After) 나란히 비교 */
export function BeforeAfterBlock({ data, name }: { data: Detail["beforeAfter"]; name: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className={`${card} p-5`}>
        <p className="text-[13px] font-bold text-subtle">이전에는</p>
        <BulletList items={data.before} />
      </div>
      <div className="rounded-3xl bg-accent-soft p-5">
        <p className={cardHead}>{name}에서는</p>
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
        <li key={step} className={`${card} p-5`}>
          <span className={cardHead}>{i + 1}단계</span>
          <p className="mt-1.5 font-medium leading-relaxed">{step}</p>
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
              <span className="mr-1.5 text-[13px] font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
              {caption}
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

/** 생성형 AI 결과물: AI가 쓴 명세 → 완성 이미지, 그 아래 다른 결과 이미지 */
export function AiOutputBlock({ output }: { output: Detail["aiOutput"] }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <figure className="min-w-0">
          <pre className="max-h-80 overflow-auto rounded-3xl bg-surface-weak p-5 font-mono text-xs leading-relaxed">
            <code>{output.spec}</code>
          </pre>
          <figcaption className="mt-2 text-sm text-muted">
            <span className="mr-1.5 text-[13px] font-bold text-accent">AI</span>
            {output.specCaption}
          </figcaption>
        </figure>
        <OutputFigure image={output.result} label="결과" />
      </div>
      {output.more?.length ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {output.more.map((image) => (
            <OutputFigure key={image.src} image={image} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function OutputFigure({ image, label }: { image: Detail["aiOutput"]["result"]; label?: string }) {
  return (
    <figure className="min-w-0">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(min-width: 1024px) 420px, 100vw"
        className="h-auto w-full rounded-xl border border-border"
      />
      <figcaption className="mt-2 text-sm text-muted">
        {label && <span className="mr-1.5 text-[13px] font-bold text-accent">{label}</span>}
        {image.caption}
      </figcaption>
    </figure>
  );
}

/** 추후 계획: 번호 매긴 짧은 카드 */
export function RoadmapList({ steps }: { steps: Detail["roadmap"] }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map(({ title, desc }, i) => (
        <li key={title} className={`${card} p-5`}>
          <span className={cardHead}>다음 {i + 1}</span>
          <p className="mt-1.5 font-bold">{title}</p>
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
          <span className="rounded-xl bg-surface-weak px-3 py-1.5 text-sm font-medium">{stage}</span>
          {i < stages.length - 1 && <span aria-hidden className="text-subtle">→</span>}
        </li>
      ))}
    </ol>
  );
}

/** 기술 결정과 이유 */
export function DecisionList({ decisions }: { decisions: Detail["decisions"] }) {
  return (
    <dl className="space-y-3">
      {decisions.map(({ decision, why }) => (
        <div key={decision} className={`grid gap-1 p-5 md:grid-cols-[15rem_1fr] md:gap-6 ${card}`}>
          <dt className="font-bold">{decision}</dt>
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
      {testing.metrics?.length ? <MetricStrip metrics={testing.metrics} /> : null}
      <BulletList items={testing.items} />
    </div>
  );
}

/** AARRR 퍼널 표 */
export function FunnelTable({ funnel }: { funnel: Detail["funnel"] }) {
  return (
    <div className="space-y-3">
      <ol className={`divide-y divide-surface overflow-hidden ${card}`}>
        {funnel.stages.map(({ stage, tactic, metric }) => (
          <li key={stage} className="grid gap-1 p-5 md:grid-cols-[9rem_1fr_13rem] md:gap-4">
            <span className="font-bold text-accent">{stage}</span>
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
