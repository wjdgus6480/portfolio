import type { SkillCategory } from "./types";

/**
 * 실제 프로젝트에서 사용한 기술만 기록한다. 비어 있는 카테고리는 화면에서 숨겨진다.
 * 현재 값은 이 포트폴리오 저장소에서 사용이 확인된 기술뿐이다.
 */
export const skills: SkillCategory[] = [
  // TODO: 실제 사용한 AI 관련 기술 (예: LLM API, RAG, Agent 프레임워크)
  { name: "AI", items: [] },
  { name: "Development", items: ["TypeScript", "React", "Next.js", "Tailwind CSS"] },
  // TODO: 실제 사용한 백엔드 / 데이터 기술
  { name: "Backend / Data", items: [] },
  // TODO: 실제 사용한 도구 추가
  { name: "Tools", items: ["Git"] },
];
