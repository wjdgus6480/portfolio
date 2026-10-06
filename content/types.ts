export type ProjectStatus = "live" | "in-progress" | "archived";

export type ProjectLinks = {
  github?: string;
  demo?: string;
};

/** 상세 페이지 섹션. 각 값은 문단 배열이며, 비어 있으면 화면에서 숨겨진다. */
export type ProjectDetail = {
  problem?: string[];
  background?: string[];
  solution?: string[];
  approach?: string[];
  challenges?: string[];
  results?: string[];
  learnings?: string[];
};

export type Project = {
  /** URL에 사용된다: /projects/[slug] */
  slug: string;
  title: string;
  /** true면 Home의 Featured 카드 영역에 표시된다. */
  featured: boolean;
  summary?: string;
  tech?: string[];
  status?: ProjectStatus;
  /** 예: "2025.03 – 2025.06" */
  period?: string;
  /** src는 public/ 기준 경로. 예: "/projects/link.png" */
  image?: { src: string; alt: string };
  links?: ProjectLinks;
  /** 주요 기능 */
  highlights?: string[];
  detail?: ProjectDetail;
};

export type JourneyStep = {
  label: string;
  description?: string;
};

export type ContactLinks = {
  github?: string;
  email?: string;
};

export type Profile = {
  name: string;
  role: string;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  about: {
    title: string;
    paragraphs: string[];
    journey: JourneyStep[];
  };
  contact: {
    title: string;
    description?: string;
    links: ContactLinks;
  };
};

export type SkillCategory = {
  name: string;
  items: string[];
};
