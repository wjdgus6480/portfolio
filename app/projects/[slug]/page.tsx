import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Project } from "@/content/types";
import { getAdjacentProjects, getAllProjects, getProjectBySlug } from "@/lib/projects";
import { Container } from "@/components/ui/Container";
import { DetailSection } from "@/components/project/DetailSection";
import {
  AiOutputBlock,
  AiUsageGrid,
  BeforeAfterBlock,
  DecisionList,
  FlowSteps,
  FunnelTable,
  LabeledList,
  MarketAnalysisBlock,
  MetricStrip,
  ModelEvalTable,
  PipelineChain,
  RoadmapList,
  ScreenGallery,
  TestingBlock,
} from "@/components/project/MarketingBlocks";
import { ProjectHeader } from "@/components/project/ProjectHeader";
import { PageTransition } from "@/components/ui/PageTransition";
import { TechList } from "@/components/ui/TechTag";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

/**
 * 상세 섹션의 표시 순서와 제목 (design-theme SKILL.md §14).
 * 헤더 · metrics · AI 활용 방식(첫 화면) 다음, 모델 실험과 기술을 먼저 보이고
 * 마케팅 사례 흐름: 개요 → 타깃 → 3C → 문제/해결 → 작동 방식 → 기능 → 퍼널 → 결과 → 회고.
 * 새 섹션은 ProjectDetail 타입과 이 배열에 추가한다.
 */
const detailSections: { title: string; render: (project: Project) => React.ReactNode }[] = [
  { title: "모델 선정 실험", render: (p) => p.detail?.modelEval && <ModelEvalTable data={p.detail.modelEval} /> },
  { title: "사용한 기술", render: (p) => p.tech?.length && <TechList items={p.tech} /> },
  { title: "한눈에 보기", render: (p) => list(p.detail?.overview) },
  { title: "누구를 위해, 무엇을", render: (p) => p.detail?.target?.length && <LabeledList rows={p.detail.target} /> },
  { title: "3C 분석", render: (p) => p.detail?.market && <MarketAnalysisBlock market={p.detail.market} /> },
  { title: "이렇게 바뀌어요", render: (p) => p.detail?.beforeAfter && <BeforeAfterBlock data={p.detail.beforeAfter} name={p.title} /> },
  { title: "문제", render: (p) => list(p.detail?.problem) },
  { title: "배경", render: (p) => list(p.detail?.background) },
  { title: "해결", render: (p) => list(p.detail?.solution) },
  { title: "이렇게 써요", render: (p) => p.detail?.flow?.length && <FlowSteps steps={p.detail.flow} /> },
  { title: "AI가 만든 결과물", render: (p) => p.detail?.aiOutput && <AiOutputBlock output={p.detail.aiOutput} /> },
  { title: "실제 화면", render: (p) => p.detail?.screens?.length && <ScreenGallery screens={p.detail.screens} /> },
  { title: "접근 방식", render: (p) => list(p.detail?.approach) },
  { title: "주요 기능", render: (p) => list(p.highlights) },
  { title: "성장 퍼널 · AARRR", render: (p) => p.detail?.funnel && <FunnelTable funnel={p.detail.funnel} /> },
  { title: "측정 방법", render: (p) => p.detail?.analytics?.length && <DecisionList decisions={p.detail.analytics} /> },
  { title: "어려웠던 점", render: (p) => list(p.detail?.challenges) },
  { title: "결과", render: (p) => list(p.detail?.results) },
  { title: "처리 구조", render: (p) => p.detail?.architecture?.length && <PipelineChain stages={p.detail.architecture} /> },
  { title: "기술 결정과 이유", render: (p) => p.detail?.decisions?.length && <DecisionList decisions={p.detail.decisions} /> },
  { title: "구현", render: (p) => list(p.detail?.implementation) },
  { title: "테스트와 품질", render: (p) => p.detail?.testing && <TestingBlock testing={p.detail.testing} /> },
  { title: "한계와 다음 단계", render: (p) => list(p.detail?.limits) },
  { title: "배운 점", render: (p) => list(p.detail?.learnings) },
  { title: "앞으로의 계획", render: (p) => p.detail?.roadmap?.length && <RoadmapList steps={p.detail.roadmap} /> },
];

function list(items?: string[]) {
  return items?.length ? <ListItems items={items} /> : null;
}

function ListItems({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-lg leading-relaxed">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);
  const filledSections = detailSections
    .map(({ title, render }) => ({ title, content: render(project) }))
    .filter((section) => section.content);
  const metrics = project.detail?.metrics;
  const aiUsage = project.detail?.aiUsage;

  return (
    <PageTransition>
      <article className="pb-10 pt-8 md:pb-14 md:pt-10">
        <Container>
          <ProjectHeader project={project} />

          {metrics?.length ? (
            <div className="reveal mt-8">
              <MetricStrip metrics={metrics} />
            </div>
          ) : null}

          {aiUsage?.length ? (
            <section aria-labelledby="ai-usage" className="reveal mt-8">
              <h2 id="ai-usage" className="mb-3 text-[15px] font-bold text-accent">
                AI를 이렇게 썼어요
              </h2>
              <AiUsageGrid items={aiUsage} />
            </section>
          ) : null}

          <div className="reveal-group mt-8 border-t-8 border-surface-weak md:mt-10">
            {filledSections.map(({ title, content }) => (
              <DetailSection key={title} title={title}>
                {content}
              </DetailSection>
            ))}
            {filledSections.length === 0 && (
              <p className="py-14 text-subtle">상세 내용을 준비하고 있어요.</p>
            )}
          </div>

          <nav aria-label="다른 프로젝트" className="mt-4 grid grid-cols-2 gap-3">
            <AdjacentLink project={prev} direction="prev" />
            <AdjacentLink project={next} direction="next" />
          </nav>
        </Container>
      </article>
    </PageTransition>
  );
}

function AdjacentLink({
  project,
  direction,
}: {
  project?: Project;
  direction: "prev" | "next";
}) {
  if (!project) return <span />;
  const isNext = direction === "next";

  return (
    <Link
      href={`/projects/${project.slug}`}
      transitionTypes={[isNext ? "nav-forward" : "nav-back"]}
      className={`pressable flex flex-col gap-0.5 rounded-3xl bg-surface-weak p-5 ${isNext ? "col-start-2 items-end text-right" : ""}`}
    >
      <span className="text-[13px] font-bold text-subtle">
        {isNext ? "다음 프로젝트 →" : "← 이전 프로젝트"}
      </span>
      <span className="font-bold tracking-tight">
        {project.title}
      </span>
    </Link>
  );
}
