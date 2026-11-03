/** Home 섹션의 id, 번호, 라벨. 객체 순서가 화면 순서다. */
export const sections = {
  work: { id: "work", index: "01", label: "Selected Work" },
  approach: { id: "approach", index: "02", label: "Approach" },
  skills: { id: "skills", index: "03", label: "Skills" },
  about: { id: "about", index: "04", label: "About" },
  contact: { id: "contact", index: "05", label: "Contact" },
} as const;

export const sectionIds = Object.values(sections).map((section) => section.id);

/** Header 메뉴. 메뉴에 없는 섹션(approach, skills)을 지날 때는 어떤 메뉴도 강조되지 않는다. */
export const navItems = [
  { id: sections.work.id, label: "Work" },
  { id: sections.about.id, label: "About" },
  { id: sections.contact.id, label: "Contact" },
];
