import type { SkillCategory } from "./types";

/**
 * 실제 프로젝트에서 사용한 기술만 기록한다. 비어 있는 카테고리는 화면에서 숨겨진다.
 * 각 기술을 사용한 프로젝트는 content/projects.ts의 tech 값에서 자동으로 연결된다.
 * 현재 값은 이 포트폴리오 저장소(package.json)에서 사용이 확인된 기술뿐이다.
 */
export const skills: SkillCategory[] = [
  // TODO: 실제 사용한 AI / Agent 기술
  { name: "AI / Agent", items: [] },
  {
    name: "Software Development",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Git"],
  },
  // TODO: 실제 사용한 데이터 / API 기술 추가
  { name: "Data / API", items: ["Supabase"] },
  // TODO: 실제 사용한 자동화 / 콘텐츠 도구
  { name: "Automation / Content", items: [] },
];
