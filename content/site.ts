/** Home 섹션의 id, 번호, 라벨. 객체 순서가 화면 순서다. (01은 Hero) */
export const sections = {
  stack: { id: "stack", index: "02", label: "Tech Stack" },
  approach: { id: "approach", index: "03", label: "Development Approach" },
  work: { id: "work", index: "04", label: "Selected Projects" },
  cases: { id: "cases", index: "05", label: "Engineering Case Study" },
  architecture: { id: "architecture", index: "06", label: "Backend Architecture" },
  process: { id: "process", index: "07", label: "Development Process" },
  ai: { id: "ai", index: "08", label: "AI Usage" },
  growth: { id: "growth", index: "09", label: "Growth & Analytics" },
  about: { id: "background", index: "10", label: "Background" },
  next: { id: "next", index: "11", label: "Next" },
  contact: { id: "contact", index: "12", label: "Contact" },
} as const;

export const sectionIds = Object.values(sections).map((section) => section.id);

/** Header 메뉴. 메뉴에 없는 섹션을 지날 때는 어떤 메뉴도 강조되지 않는다. */
export const navItems = [
  { id: sections.stack.id, label: "Stack" },
  { id: sections.work.id, label: "Projects" },
  { id: sections.cases.id, label: "Cases" },
  { id: sections.architecture.id, label: "Architecture" },
  { id: sections.contact.id, label: "Contact" },
];
