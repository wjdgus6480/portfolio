import { sections } from "@/content/site";
import { getFeaturedProjects, getOtherProjects } from "@/lib/projects";
import { Section } from "@/components/ui/Section";
import { ProjectCard } from "./ProjectCard";
import { ProjectList } from "./ProjectList";

/** 04 Selected Projects. 순서는 content/projects.ts 배열 순서 (Backend → Data → AI). */
export function Projects() {
  const featured = getFeaturedProjects();
  const others = getOtherProjects();

  return (
    <Section
      {...sections.work}
      title="직접 만든 서비스 3개"
      description="백엔드 · 데이터 · AI 순서입니다. 각 Case Study에 문제 → 원인 → 해결 → 검증 → 결과를 자세히 정리했습니다."
    >
      <ol className="space-y-6 md:space-y-8">
        {featured.map((project, i) => (
          <li key={project.slug}>
            <ProjectCard project={project} index={i + 1} />
          </li>
        ))}
      </ol>

      {others.length > 0 && (
        <div className="mt-14 md:mt-16">
          <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-subtle">More projects</h3>
          <ProjectList projects={others} startNumber={1} />
        </div>
      )}
    </Section>
  );
}
