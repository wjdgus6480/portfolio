import { projects } from "@/content/projects";
import type { Project } from "@/content/types";

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getOtherProjects(): Project[] {
  return projects.filter((project) => !project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** tech 값에 해당 기술이 포함된 프로젝트 (대소문자 무시) */
export function getProjectsUsing(tech: string): Project[] {
  const target = tech.toLowerCase();
  return projects.filter((project) =>
    project.tech?.some((item) => item.toLowerCase() === target),
  );
}

export function getAdjacentProjects(slug: string): {
  prev?: Project;
  next?: Project;
} {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return {};
  return { prev: projects[index - 1], next: projects[index + 1] };
}
