import { sections } from "@/content/site";
import { getFeaturedProjects, getOtherProjects } from "@/lib/projects";
import { Section } from "@/components/ui/Section";
import { ProjectCard } from "./ProjectCard";
import { ProjectList } from "./ProjectList";

export function Projects() {
  const featured = getFeaturedProjects();
  const others = getOtherProjects();

  return (
    <Section {...sections.work} title="직접 만든 것들">
      {featured.length > 0 && (
        <ul className="grid max-w-3xl grid-cols-4 gap-2 sm:gap-3">
          {featured.map((project) => (
            <li key={project.slug} className="min-w-0">
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      )}

      {others.length > 0 && (
        <div className={featured.length > 0 ? "mt-16 md:mt-20" : undefined}>
          <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-subtle">
            More projects
          </h3>
          <ProjectList projects={others} startNumber={featured.length + 1} />
        </div>
      )}
    </Section>
  );
}
