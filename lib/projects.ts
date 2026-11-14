import { projects as allProjects } from "@/content/projects";
import type { BackendEvidence, Project, ProjectKind } from "@/content/types";

/** hidden 항목은 어디에도 내보내지 않는다 */
const projects = allProjects.filter((project) => !project.hidden);

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(kind?: ProjectKind): Project[] {
  return projects.filter(
    (project) => project.featured && (!kind || (project.kind ?? "web") === kind),
  );
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

/** 백엔드 증거(detail.backend)가 있는 첫 프로젝트 = Home의 Backend Proof · Architecture 출처 */
export function getBackendProject(): { project: Project; backend: BackendEvidence } | undefined {
  const project = projects.find((item) => item.detail?.backend);
  return project?.detail?.backend ? { project, backend: project.detail.backend } : undefined;
}

/**
 * 코드 근거 경로 → 링크. 공개 저장소(codeBase)가 있을 때만 주소를 만들고,
 * 비공개 저장소이거나 와일드카드 경로면 undefined (화면에는 경로만 표시).
 */
export function codeHref(project: Pick<Project, "codeBase">, path: string): string | undefined {
  if (!project.codeBase || path.includes("*")) return undefined;
  const base = project.codeBase.replace(/\/$/, "");
  const target = path.endsWith("/") ? base.replace("/blob/", "/tree/") + "/" + path.slice(0, -1) : `${base}/${path}`;
  return encodeURI(target);
}

export function getAdjacentProjects(slug: string): {
  prev?: Project;
  next?: Project;
} {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return {};
  return { prev: projects[index - 1], next: projects[index + 1] };
}
