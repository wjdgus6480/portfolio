/**
 * Home 섹션의 id, 라벨, 배경 톤. 객체 순서가 화면 순서다.
 * tone: tinted = 회색 띠 배경(안의 카드는 흰색), plain = 흰 배경(안의 카드는 회색)
 */
export const sections = {
  work: { id: "work", label: "프로젝트", tone: "tinted" },
  approach: { id: "approach", label: "일하는 방식", tone: "plain" },
  skills: { id: "skills", label: "기술", tone: "tinted" },
  about: { id: "about", label: "소개", tone: "plain" },
  contact: { id: "contact", label: "연락", tone: "tinted" },
} as const;

/** Work 섹션의 프로젝트 묶음. 배열 순서가 화면 순서이고, kind는 projects.ts의 kind와 맞춘다. */
export const workGroups = [
  {
    kind: "web",
    part: "PART 1 · 공개 서비스",
    title: "AI로 만든 제품, 바로 써볼 수 있어요",
    description: "누구나 접속해 쓸 수 있는 서비스를 기획부터 배포까지 1인으로 완성했어요",
  },
  {
    kind: "ai",
    part: "PART 2 · 업무 자동화",
    title: "직접 운영하는 AI 업무 자동화",
    description: "생성형 AI와 에이전트를 직접 설계해 실제 업무에 쓰고 있어요",
  },
] as const;

export const sectionIds = Object.values(sections).map((section) => section.id);

/** Header 메뉴. 메뉴에 없는 섹션(skills)을 지날 때는 어떤 메뉴도 강조되지 않는다. */
export const navItems = [
  { id: sections.work.id, label: "프로젝트" },
  { id: sections.approach.id, label: "AI 방식" },
  { id: sections.about.id, label: "소개" },
  { id: sections.contact.id, label: "연락" },
];
