import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Project } from "@/content/types";
import { getAdjacentProjects, getAllProjects, getProjectBySlug } from "@/lib/projects";
import { Container } from "@/components/ui/Container";
import { DetailSection } from "@/components/project/DetailSection";
import {
  AiOutputBlock,
  BeforeAfterBlock,
  DecisionList,
  FlowSteps,
  FunnelTable,
  LabeledList,
  MarketAnalysisBlock,
  MetricStrip,
  PipelineChain,
  RoadmapList,
  ScreenGallery,
  StoryBlock,
  TestingBlock,
} from "@/components/project/MarketingBlocks";
import {
  ActionList,
  ApiTable,
  DataFlow,
  LayerStack,
  ProofGrid,
  TableDomains,
} from "@/components/project/BackendBlocks";
import { ProjectHeader } from "@/components/project/ProjectHeader";
import { PageTransition } from "@/components/ui/PageTransition";

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
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: `${project.title} — 윤정현`, description: project.summary, type: "article" },
  };
}

/**
 * 상세 섹션의 표시 순서와 제목.
 * 순서: 개요 → 엔지니어링 요약(문제 → 원인 → 해결 → 검증 → 결과) → 백엔드 구조 · API · DB → 결정 · 구현 · 테스트
 *      → 화면 · 기능 → 타깃 · 시장 · 그로스 → 한계 · 회고.
 * 값이 없는 섹션은 숨겨진다. 새 섹션은 ProjectDetail 타입과 이 배열에 추가한다.
 */
const detailSections: { title: string; render: (project: Project) => React.ReactNode }[] = [
  { title: "Overview", render: (p) => list(p.detail?.overview) },
  { title: "Engineering Summary", render: (p) => p.detail?.story && <StoryBlock story={p.detail.story} /> },
  {
    title: "Backend Proof",
    render: (p) =>
      p.detail?.backend && (
        <div className="space-y-3">
          <ProofGrid proof={p.detail.backend.proof} project={p} />
          <p className="text-sm text-subtle">기준: {p.detail.backend.asOf}</p>
        </div>
      ),
  },
  {
    title: "Backend Architecture",
    render: (p) =>
      p.detail?.backend && (
        <div className="space-y-6">
          <DataFlow steps={p.detail.backend.dataFlow} />
          <LayerStack layers={p.detail.backend.layers} project={p} />
        </div>
      ),
  },
  { title: "API Design", render: (p) => p.detail?.backend?.api.length && <ApiTable api={p.detail.backend.api} /> },
  {
    title: "Server Actions",
    render: (p) => p.detail?.backend?.actions.length && <ActionList actions={p.detail.backend.actions} project={p} />,
  },
  { title: "Database", render: (p) => p.detail?.backend?.tables.length && <TableDomains tables={p.detail.backend.tables} /> },
  { title: "Pipeline", render: (p) => p.detail?.architecture?.length && <PipelineChain stages={p.detail.architecture} /> },
  { title: "Tech Decisions", render: (p) => p.detail?.decisions?.length && <DecisionList decisions={p.detail.decisions} /> },
  { title: "Implementation", render: (p) => list(p.detail?.implementation) },
  { title: "Challenges", render: (p) => list(p.detail?.challenges) },
  { title: "Testing", render: (p) => p.detail?.testing && <TestingBlock testing={p.detail.testing} /> },
  { title: "Result", render: (p) => list(p.detail?.results) },
  { title: "Problem", render: (p) => list(p.detail?.problem) },
  { title: "Background", render: (p) => list(p.detail?.background) },
  { title: "Solution", render: (p) => list(p.detail?.solution) },
  { title: "Approach", render: (p) => list(p.detail?.approach) },
  { title: "Screens", render: (p) => p.detail?.screens?.length && <ScreenGallery screens={p.detail.screens} /> },
  { title: "How It Works", render: (p) => p.detail?.flow?.length && <FlowSteps steps={p.detail.flow} /> },
  { title: "AI Output", render: (p) => p.detail?.aiOutput && <AiOutputBlock output={p.detail.aiOutput} /> },
  { title: "Key Features", render: (p) => list(p.highlights) },
  { title: "Target & Goal", render: (p) => p.detail?.target?.length && <LabeledList rows={p.detail.target} /> },
  { title: "3C Analysis", render: (p) => p.detail?.market && <MarketAnalysisBlock market={p.detail.market} /> },
  {
    title: "Before → After",
    render: (p) => p.detail?.beforeAfter && <BeforeAfterBlock data={p.detail.beforeAfter} name={p.title} />,
  },
  { title: "Analytics", render: (p) => p.detail?.analytics?.length && <DecisionList decisions={p.detail.analytics} /> },
  { title: "Growth Funnel · AARRR", render: (p) => p.detail?.funnel && <FunnelTable funnel={p.detail.funnel} /> },
  { title: "Limits & Next", render: (p) => list(p.detail?.limits) },
  { title: "What I Learned", render: (p) => list(p.detail?.learnings) },
  { title: "Roadmap", render: (p) => p.detail?.roadmap?.length && <RoadmapList steps={p.detail.roadmap} /> },
];

function list(items?: string[]) {
  return items?.length ? <ListItems items={items} /> : null;
}

function ListItems({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-lg leading-relaxed">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className="text-subtle">—</span>
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

  return (
    <PageTransition>
      <article className="py-10 md:py-16">
        <Container>
          <ProjectHeader project={project} />

          {metrics?.length ? (
            <div className="reveal mt-10">
              <MetricStrip metrics={metrics} />
            </div>
          ) : null}

          <div className="reveal-group mt-10 md:mt-14">
            {filledSections.map(({ title, content }) => (
              <DetailSection key={title} title={title}>
                {content}
              </DetailSection>
            ))}
            {filledSections.length === 0 && (
              <p className="border-t border-border py-14 text-subtle">
                상세 내용을 준비하고 있습니다.
              </p>
            )}
          </div>

          <nav
            aria-label="다른 프로젝트"
            className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-8"
          >
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
      className={`group flex flex-col gap-1 ${isNext ? "col-start-2 items-end text-right" : ""}`}
    >
      <span className="font-mono text-xs uppercase tracking-[0.14em] text-subtle">
        {isNext ? "Next →" : "← Previous"}
      </span>
      <span className="font-semibold tracking-tight transition-colors duration-150 group-hover:text-accent">
        {project.title}
      </span>
    </Link>
  );
}
