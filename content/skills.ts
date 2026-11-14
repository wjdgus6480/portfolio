import type { SkillGroup } from "./types";

/**
 * Tech Stack. 배열 순서 = 화면 순서 = 비중.
 * status
 * - used: 실제 프로젝트 코드에서 확인됨 (usedIn = 프로젝트 slug). 화면에는 상태 대신 프로젝트 이름이 붙는다.
 * - learning: 공부했지만 프로젝트에는 쓰지 않음. 화면에 "학습" 표시.
 * 다음에 쓸 기술(Java · Spring 등)은 여기에 넣지 않고 content/next-project.ts 에만 둔다.
 * 근거를 확인하기 전에는 learning → used 로 바꾸지 않는다.
 */
export const skills: SkillGroup[] = [
  {
    name: "Backend",
    weight: "primary",
    role: "실제 서비스를 구현하는 핵심 역량",
    items: [
      { name: "TypeScript", status: "used", usedIn: ["jipplan"] },
      { name: "Node.js", status: "used", usedIn: ["jipplan", "danubi-ai"], note: "수집 · 적재 스크립트" },
      { name: "Next.js", status: "used", usedIn: ["jipplan"], note: "Route Handler · Server Actions" },
      { name: "API", status: "used", usedIn: ["jipplan"], note: "Route Handler 13개, 입력 검증 → 400" },
      { name: "MySQL", status: "used", usedIn: ["jipplan"], note: "MySQL 8.4 (CI) · TiDB Cloud (배포)" },
      { name: "SQL", status: "used", usedIn: ["jipplan"], note: "mysql2 + 직접 작성, ORM 없음" },
      { name: "Database Design", status: "used", usedIn: ["jipplan"], note: "테이블 44 · FK · Index · Migration 41" },
      { name: "Authentication / Authorization", status: "used", usedIn: ["jipplan"], note: "OAuth · scrypt · 로그인 제한 · 권한 매트릭스" },
    ],
  },
  {
    name: "Testing / DevOps",
    weight: "primary",
    role: "결과를 테스트로 고정하고 배포 전에 막는 역량",
    items: [
      { name: "Vitest", status: "used", usedIn: ["jipplan"] },
      { name: "node:test", status: "used", usedIn: ["danubi-ai"] },
      { name: "Integration Test", status: "used", usedIn: ["jipplan"], note: "실제 MySQL에 붙는 저장소 테스트" },
      { name: "TDD", status: "used", usedIn: ["jipplan", "genloom"], note: "판정 엔진 · 실패 → 통과 → 회귀 기록" },
      { name: "GitHub Actions", status: "used", usedIn: ["jipplan"], note: "lint → 단위 → DB 통합 → build" },
      { name: "Git", status: "used", usedIn: ["jipplan", "danubi-ai", "genloom"] },
      { name: "GitHub", status: "used", usedIn: ["jipplan", "danubi-ai", "genloom"] },
    ],
  },
  {
    name: "Data / AI",
    weight: "secondary",
    role: "데이터를 검증하고 AI를 도구로 쓰는 확장 역량",
    items: [
      { name: "Python", status: "used", usedIn: ["genloom"] },
      { name: "Public Data Processing", status: "used", usedIn: ["jipplan", "danubi-ai"], note: "수집 · 검증 · 적재" },
      { name: "Rule-based Decision Engine", status: "used", usedIn: ["danubi-ai", "jipplan"] },
      { name: "AI / LLM", status: "used", usedIn: ["genloom"], note: "역할별 모델 분리" },
    ],
  },
  {
    name: "Growth / Analytics",
    weight: "supporting",
    role: "만든 서비스가 어떻게 쓰이는지 보는 보조 역량",
    note: "학습 · 가설 단계 적용",
    items: [
      { name: "Google Analytics", status: "used", usedIn: ["jipplan"], note: "자격 취득" },
      { name: "Google Ads", status: "learning", note: "자격 취득" },
      { name: "AARRR", status: "learning", usedIn: ["danubi-ai"], note: "퍼널 가설" },
      { name: "North Star Metric", status: "learning" },
      { name: "Funnel Analysis", status: "learning" },
      { name: "Growth Marketing", status: "learning" },
      { name: "Growth Hacking", status: "learning" },
    ],
  },
];
