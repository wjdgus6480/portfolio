import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Project, ProjectDetail } from "@/content/types";
import { getAdjacentProjects, getAllProjects, getProjectBySlug } from "@/lib/projects";
import { Container } from "@/components/ui/Container";
import { DetailSection } from "@/components/project/DetailSection";
import { ProjectHeader } from "@/components/project/ProjectHeader";

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

/** 상세 섹션의 표시 순서와 제목. 새 섹션은 ProjectDetail 타입과 이 배열에 추가한다. */
const detailSections: { key: keyof ProjectDetail; title: string }[] = [
  { key: "problem", title: "Problem" },
  { key: "background", title: "Background" },
  { key: "solution", title: "Solution" },
  { key: "approach", title: "Approach" },
  { key: "challenges", title: "Challenges" },
  { key: "results", title: "Results" },
  { key: "learnings", title: "Learnings" },
];

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);
  const filledSections = detailSections.filter(
    ({ key }) => project.detail?.[key]?.length,
  );
  const hasHighlights = Boolean(project.highlights?.length);
  const hasContent = filledSections.length > 0 || hasHighlights;

  return (
    <article className="py-12 md:py-20">
      <Container>
        <ProjectHeader project={project} />

        <div className="mt-16 md:mt-20">
          {hasHighlights && <DetailSection title="Key Features" items={project.highlights} />}
          {filledSections.map(({ key, title }) => (
            <DetailSection key={key} title={title} paragraphs={project.detail?.[key]} />
          ))}
          {!hasContent && (
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
