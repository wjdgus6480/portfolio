import type { NextStack } from "./types";

/**
 * 현재 기술과 다음 확장 기술.
 * - current: 실제 프로젝트 코드에서 확인된 기술만 (content/skills.ts의 used와 일치)
 * - next: 아직 사용하지 않은 기술. Skills 영역에 넣지 않는다.
 *   실제로 프로젝트에 쓴 뒤에 content/skills.ts로 옮긴다.
 */
export const nextStack: NextStack = {
  current: ["TypeScript", "Node.js", "Next.js", "MySQL", "GitHub Actions", "Python", "AI / LLM"],
  next: ["Java", "Spring Boot", "Spring Data JPA", "Redis", "Docker", "AWS"],
  goal: "기업 백엔드 환경에서 요구되는 서버 개발과 운영 역량으로 확장합니다.",
};
