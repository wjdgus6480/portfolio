import type { Project } from "./types";

/**
 * 프로젝트 목록. 배열 순서가 화면 표시 순서다.
 * - featured: true → Home의 Featured 카드, false → 아래 목록
 * - 값이 없는 선택 필드는 화면에서 숨겨진다.
 *
 * TODO: featured 값은 레이아웃 확인용 임시 설정. 대표 프로젝트 확정 후 수정.
 * TODO: 각 프로젝트의 summary / tech / status / period / links / detail 입력.
 */
export const projects: Project[] = [
  {
    slug: "link",
    title: "LINK",
    featured: true,
  },
  {
    slug: "compound-life",
    title: "복리인생",
    featured: true,
  },
  {
    slug: "desktop-organizer",
    title: "바탕화면 정리 프로그램",
    featured: true,
  },
  {
    slug: "jarvis-mymemory",
    title: "JARVIS / MyMemory",
    featured: true,
  },
  {
    slug: "labor-advisor-ai",
    title: "LaborAdvisorAI",
    featured: false,
  },
  {
    slug: "aeong-daily",
    title: "애옹이의일상",
    featured: false,
  },
];
