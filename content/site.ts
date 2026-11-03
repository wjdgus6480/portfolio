/** Home 섹션의 id, 번호, 라벨. 객체 순서가 화면 순서다. */
export const sections = {
  work: { id: "work", index: "01", label: "Selected Work" },
  approach: { id: "approach", index: "02", label: "How I Work with AI" },
  skills: { id: "skills", index: "03", label: "Skills" },
  about: { id: "about", index: "04", label: "About" },
  contact: { id: "contact", index: "05", label: "Contact" },
} as const;

/** Work 섹션의 프로젝트 묶음. 배열 순서가 화면 순서이고, kind는 projects.ts의 kind와 맞춘다. */
export const workGroups = [
  {
    kind: "web",
    part: "PART 1",
    title: "공개 서비스 — AI로 만든 제품",
    description: "누구나 접속해 쓸 수 있는 서비스를 기획부터 배포까지 1인으로 완성",
  },
  {
    kind: "ai",
    part: "PART 2",
    title: "직접 운영하는 AI 업무 자동화",
    description: "생성형 AI와 에이전트를 설계해 실제 업무에 매일 사용",
  },
] as const;

export const sectionIds =Object.values(sections).map((section) => section.id);

/** Header 메뉴. 메뉴에 없는 섹션(skills)을 지날 때는 어떤 메뉴도 강조되지 않는다. */
export const navItems = [
  { id: sections.work.id, label: "Work" },
  { id: sections.approach.id, label: "AI 방식" },
  { id: sections.about.id, label: "About" },
  { id: sections.contact.id, label: "Contact" },
];
