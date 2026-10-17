import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Project } from "@/content/types";
import { getAdjacentProjects, getAllProjects, getProjectBySlug } from "@/lib/projects";
import { Container } from "@/components/ui/Container";
import { DetailSection } from "@/components/project/DetailSection";
import {
  BeforeAfterBlock,
  FlowSteps,
  FunnelTable,
  LabeledList,
  MarketAnalysisBlock,
  MetricStrip,
  ScreenGallery,
} from "@/components/project/MarketingBlocks";
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
  return { title: project.title, description: project.summary };
}

/**
 * 상세 섹션의 표시 순서와 제목 (design-theme SKILL.md §14).
 * 순서는 마케팅 사례 흐름: 개요 → 타깃 → 3C → 문제/해결 → 작동 방식 → 기능 → 퍼널 → 결과 → 회고.
 * 새 섹션은 ProjectDetail 타입과 이 배열에 추가한다.
 */
const detailSections: { title: string; render: (project: Project) => React.ReactNode }[] = [
  { title: "Overview", render: (p) => list(p.detail?.overview) },
  { title: "Target & Goal", render: (p) => p.detail?.target?.length && <LabeledList rows={p.detail.target} /> },
  { title: "3C Analysis", render: (p) => p.detail?.market && <MarketAnalysisBlock market={p.detail.market} /> },
  { title: "Problem → Solution", render: (p) => p.detail?.beforeAfter && <BeforeAfterBlock data={p.detail.beforeAfter} /> },
  { title: "Problem", render: (p) => list(p.detail?.problem) },
  { title: "Background", render: (p) => list(p.detail?.background) },
  { title: "Solution", render: (p) => list(p.detail?.solution) },
  { title: "How It Works", render: (p) => p.detail?.flow?.length && <FlowSteps steps={p.detail.flow} /> },
  { title: "Screens", render: (p) => p.detail?.screens?.length && <ScreenGallery screens={p.detail.screens} /> },
  { title: "Approach", render: (p) => list(p.detail?.approach) },
  { title: "Key Features", render: (p) => list(p.highlights) },
  { title: "Growth Funnel · AARRR", render: (p) => p.detail?.funnel && <FunnelTable funnel={p.detail.funnel} /> },
  { title: "Challenges", render: (p) => list(p.detail?.challenges) },
  { title: "Result", render: (p) => list(p.detail?.results) },
  { title: "Implementation", render: (p) => list(p.detail?.implementation) },
  { title: "What I Learned", render: (p) => list(p.detail?.learnings) },
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
      <article className="py-12 md:py-20">
        <Container>
          <ProjectHeader project={project} />

          {metrics?.length ? (
            <div className="reveal mt-12">
              <MetricStrip metrics={metrics} />
            </div>
          ) : null}

          <div className="reveal-group mt-16 md:mt-20">
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
