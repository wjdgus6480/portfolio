/** Home 섹션의 id, 라벨, 순서. Header 내비게이션도 이 목록을 사용한다. */
export const sections = {
  projects: { id: "projects", index: "01", label: "Projects" },
  about: { id: "about", index: "02", label: "About" },
  skills: { id: "skills", index: "03", label: "Skills" },
  contact: { id: "contact", index: "04", label: "Contact" },
} as const;

export const navItems = Object.values(sections);
