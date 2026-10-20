import type { Project } from "@/content/types";
import { sections } from "@/content/site";
import { getFeaturedProjects, getOtherProjects } from "@/lib/projects";
import { Section } from "@/components/ui/Section";
import { ProjectCard } from "./ProjectCard";
import { ProjectList } from "./ProjectList";

const groups = [
  { kind: "web", title: "웹 서비스" },
  { kind: "ai", title: "AI 활용 프로그램" },
] as const;

export function Projects() {
  const filled = groups
    .map((group) => ({ ...group, projects: getFeaturedProjects(group.kind) }))
    .filter((group) => group.projects.length > 0);
  const others = getOtherProjects();

  return (
    <Section {...sections.work} title="직접 만든 것들">
      <div className="space-y-10 md:space-y-12">
        {filled.map((group) => (
          <TileGroup key={group.kind} title={group.title} projects={group.projects} />
        ))}
      </div>

      {others.length > 0 && (
        <div className="mt-16 md:mt-20">
          <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-subtle">
            More projects
          </h3>
          <ProjectList projects={others} startNumber={1} />
        </div>
      )}
    </Section>
  );
}

function TileGroup({ title, projects }: { title: string; projects: Project[] }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-muted">{title}</h3>
      <ul className="grid max-w-3xl grid-cols-4 gap-2 sm:gap-3">
        {projects.map((project) => (
          <li key={project.slug} className="min-w-0">
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
}
