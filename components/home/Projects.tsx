import type { Project } from "@/content/types";
import { sections, workGroups } from "@/content/site";
import { getFeaturedProjects, getOtherProjects } from "@/lib/projects";
import { Section } from "@/components/ui/Section";
import { ProjectCard } from "./ProjectCard";
import { ProjectList } from "./ProjectList";

export function Projects() {
  const filled = workGroups
    .map((group) => ({ ...group, projects: getFeaturedProjects(group.kind) }))
    .filter((group) => group.projects.length > 0);
  const others = getOtherProjects();

  return (
    <Section {...sections.work} title="AI로 만든 제품, AI로 하는 일">
      <div className="space-y-16 md:space-y-20">
        {filled.map((group) => (
          <CardGroup key={group.kind} {...group} />
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

type CardGroupProps = {
  kind: string;
  part: string;
  title: string;
  description: string;
  projects: Project[];
};

function CardGroup({ kind, part, title, description, projects }: CardGroupProps) {
  const headingId = `work-${kind}`;
  return (
    <div role="group" aria-labelledby={headingId}>
      <p className="font-mono text-xs text-accent">{part}</p>
      <h3 id={headingId} className="mt-2 text-xl font-bold tracking-tight md:text-2xl">
        {title}
      </h3>
      <p className="mt-2 max-w-[40em] text-muted">{description}</p>
      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <li key={project.slug} className="min-w-0">
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
}
