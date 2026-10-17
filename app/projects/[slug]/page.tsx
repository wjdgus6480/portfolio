import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Project, ProjectDetail } from "@/content/types";
import { getAdjacentProjects, getAllProjects, getProjectBySlug } from "@/lib/projects";
import { Container } from "@/components/ui/Container";
import { DetailSection } from "@/components/project/DetailSection";
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
 * 새 섹션은 ProjectDetail 타입과 이 배열에 추가한다.
 * "highlights"는 Project.highlights(주요 기능) 목록을 가리킨다.
 */
const detailSections: { key: keyof ProjectDetail | "highlights"; title: string }[] = [
  { key: "overview", title: "Overview" },
  { key: "problem", title: "Problem" },
  { key: "background", title: "Background" },
  { key: "solution", title: "Solution" },
  { key: "approach", title: "Approach" },
  { key: "highlights", title: "Key Features" },
  { key: "implementation", title: "Implementation" },
  { key: "challenges", title: "Challenges" },
  { key: "results", title: "Result" },
  { key: "learnings", title: "What I Learned" },
];

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);
  const filledSections = detailSections
    .map(({ key, title }) => ({
      key,
      title,
      content: key === "highlights" ? project.highlights : project.detail?.[key],
    }))
    .filter((section) => section.content?.length);

  return (
    <PageTransition>
      <article className="py-12 md:py-20">
        <Container>
          <ProjectHeader project={project} />

          <div className="reveal-group mt-16 md:mt-20">
            {filledSections.map(({ key, title, content }) =>
              key === "highlights" ? (
                <DetailSection key={key} title={title} items={content} />
              ) : (
                <DetailSection key={key} title={title} paragraphs={content} />
              ),
            )}
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
