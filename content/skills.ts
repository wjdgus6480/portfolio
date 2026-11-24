import type { SkillCategory } from "./types";

/**
 * 실제 프로젝트에서 사용한 기술만 기록한다. 비어 있는 카테고리는 화면에서 숨겨진다.
 * 각 기술을 사용한 프로젝트는 content/projects.ts의 tech 값에서 자동으로 연결된다.
 * 이름이 projects.ts의 tech 문자열과 정확히 같아야 "→ 사용 프로젝트"가 연결된다.
 */
export const skills: SkillCategory[] = [
  { name: "AI / Agent", items: ["Claude Code", "NVIDIA API (LLM)"] },
  {
    name: "Software Development",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Git"],
  },
  // TODO: 실제 사용한 데이터 / API 기술 추가
  { name: "Data / API", items: ["Supabase"] },
  { name: "Automation / Content", items: ["Python", "네이버 검색 · 데이터랩 API", "Playwright"] },
];
