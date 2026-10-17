export type ProjectStatus = "live" | "in-progress" | "archived";

export type ProjectLinks = {
  github?: string;
  demo?: string;
};

/** 3C 분석. insight는 "그래서 이 빈틈을 노린다"는 차별점 한 줄. */
export type MarketAnalysis = {
  customer: string[];
  competitor: { name: string; limit: string }[];
  company: string[];
  insight: string;
};

/**
 * 상세 페이지 섹션. 문자열 배열은 짧은 항목 목록으로 표시되며, 비어 있으면 화면에서 숨겨진다.
 * 한 항목은 한두 줄 이내로 쓴다.
 */
export type ProjectDetail = {
  /** 헤더 아래 숫자 띠. 예: { value: "105", label: "자동 테스트" } */
  metrics?: { value: string; label: string }[];
  /** 타깃·목표. 예: { label: "타깃", value: "..." } */
  target?: { label: string; value: string }[];
  market?: MarketAnalysis;
  beforeAfter?: { before: string[]; after: string[] };
  /** 사용 흐름 단계 */
  flow?: string[];
  /** 실제 화면 캡처. src는 public/ 기준 경로, 세로형 모바일 화면 기준 */
  screens?: { src: string; alt: string; caption: string }[];
  /** AARRR 퍼널. 운영 실적이 아니라 설계·가설이면 note에 그렇게 밝힌다. */
  funnel?: { stages: { stage: string; tactic: string; metric: string }[]; note?: string };
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
  /** 카드와 상세 헤더에 표시되는 한 줄 소개. 카드 한두 줄에 들어가도록 짧게 쓴다. */
  summary?: string;
  /** 한 줄 요약. 긴 설명은 detail.problem / detail.solution에 작성한다. */
  problem?: string;
  solution?: string;
  tech?: string[];
  status?: ProjectStatus;
  /** 예: "2025.03 – 2025.06" */
  period?: string;
  /** src는 public/ 기준 경로. 예: "/projects/link.png" */
  image?: { src: string; alt: string };
  /**
   * 카드와 상세 헤더에 표시되는 브랜드 로고. src는 public/ 기준 경로. 예: "/projects/link-logo.svg"
   * 없으면 제목 첫 글자로 만든 모노그램을 표시한다.
   */
  logo?: { src: string; alt: string };
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
