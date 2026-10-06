export type ProjectStatus = "live" | "in-progress" | "archived";

export type ProjectLinks = {
  github?: string;
  demo?: string;
};

/** 상세 페이지 섹션. 각 값은 문단 배열이며, 비어 있으면 화면에서 숨겨진다. */
export type ProjectDetail = {
  overview?: string[];
  problem?: string[];
  background?: string[];
  solution?: string[];
  approach?: string[];
  implementation?: string[];
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
  /** 카드에 표시되는 한 줄 요약. 긴 설명은 detail.problem / detail.solution에 작성한다. */
  problem?: string;
  solution?: string;
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
  linkedin?: string;
};

export type Profile = {
  name: string;
  role: string;
  hero: {
    eyebrow: string;
    /** 줄바꿈 문자 위치가 화면에 그대로 반영된다. */
    title: string;
    /** 줄바꿈 문자는 태블릿 이상에서만 반영된다. */
    description: string;
  };
  approach: {
    title: string;
    paragraphs: string[];
    journey: JourneyStep[];
  };
  about: {
    title: string;
    paragraphs: string[];
    /** 경로 표시. 예: ["물리치료학", "AI / Software"] */
    path?: string[];
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
