/** operating = 공개 배포는 아니지만 실제 업무에 매일 쓰는 상태 */
export type ProjectStatus = "live" | "in-progress" | "operating" | "archived";

export type ProjectKind = "web" | "ai";

export type ProjectLinks = {
  github?: string;
  demo?: string;
  /** 프로그램이 실제로 운영하는 블로그 등 결과물 주소 */
  blog?: string;
};

/** 원본 비율을 그대로 보여 줄 결과 이미지. src는 public/ 기준 경로 */
export type OutputImage = { src: string; alt: string; caption: string; width: number; height: number };

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
  /** AI 활용 방식 (3~4개). 헤더·metrics 바로 다음, 첫 화면 안에 표시된다. decisions와 겹치면 요약만 쓴다. */
  aiUsage?: { title: string; desc: string }[];
  /** 모델 선정 실험 결과 표. 근거 문서가 있는 실험만 쓴다. */
  modelEval?: { rows: { model: string; result: string; adopted?: boolean; reason: string }[]; note?: string };
  /** 타깃·목표. 예: { label: "타깃", value: "..." } */
  target?: { label: string; value: string }[];
  market?: MarketAnalysis;
  beforeAfter?: { before: string[]; after: string[] };
  /** 사용 흐름 단계 */
  flow?: string[];
  /** 실제 화면 캡처. src는 public/ 기준 경로, 세로형 모바일 화면 기준 */
  screens?: { src: string; alt: string; caption: string }[];
  /** 처리 파이프라인 단계 (화살표로 이어서 표시) */
  architecture?: string[];
  /** 기술 결정과 이유 */
  decisions?: { decision: string; why: string }[];
  /** 테스트·품질: 숫자 + 짧은 설명. 확인되지 않은 숫자는 metrics에서 뺀다. */
  testing?: { metrics?: { value: string; label: string }[]; items: string[] };
  /** 한계와 다음 단계 */
  limits?: string[];
  /** 추후 계획. 한 단계는 짧은 제목 + 한 줄 설명 */
  roadmap?: { title: string; desc: string }[];
  /** 생성형 AI 결과물: AI가 쓴 명세(코드)와 그것으로 만든 이미지, 그 밖의 결과 이미지 */
  aiOutput?: {
    spec: string;
    specCaption: string;
    result: OutputImage;
    more?: OutputImage[];
  };
  /** 분석·측정 구성: 도구(또는 화면)와 무엇을 재는지 */
  analytics?: { decision: string; why: string }[];
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
  /** Home 묶음: web = 웹 서비스, ai = AI 활용 프로그램 */
  kind?: ProjectKind;
  /** true면 Home·상세 페이지 어디에도 나오지 않는다 (개발 중·폐기 예정 보관용) */
  hidden?: boolean;
  /** 홈 타일 이름 아래 작은 글씨로 표시되는 분류. 6~8자 이내. 예: "관광 코스 AI" */
  category?: string;
  /** 카드와 상세 헤더에 표시되는 한 줄 소개. 카드 한두 줄에 들어가도록 짧게 쓴다. */
  summary?: string;
  /** 이 프로젝트에서 AI가 맡은 역할 한 줄. 카드와 상세 헤더에 표시된다. */
  aiRole?: string;
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
  /** 데모 주소 QR 이미지. src는 public/ 기준 경로. 반드시 links.demo와 같은 주소를 가리켜야 한다. */
  qr?: { src: string; alt: string };
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

/**
 * Hero 직무 선택의 한 직무. 데이터만 담고, 화면은 RoleExplorer가 그린다.
 * 비어 있는 배열은 화면에서 숨겨진다. projects가 비면 "준비 중" 안내가 나온다.
 */
export type HeroRole = {
  id: string;
  label: string;
  intro: string;
  /** 핵심 역량. learned = 학습한 개념(실제 적용 경험과 구분해 표시) */
  competencies?: { name: string; learned?: boolean }[];
  /** 이 직무와 관련된 기술 */
  tech?: string[];
  /** 배열 순서가 화면 순서. slug는 content/projects.ts의 slug와 같아야 상세 페이지로 연결된다. */
  projects: { slug: string; contributions: string[] }[];
};

/** About 타임라인 한 단계. icon은 AboutTimeline의 아이콘 이름 */
export type AboutStep = {
  id: string;
  label: string;
  /** 노드 아래 짧은 한국어 설명 */
  caption: string;
  icon: "healthcare" | "problem" | "development" | "growth";
  points: string[];
  /** content/projects.ts의 slug. 없는 slug는 화면에 나오지 않는다. */
  projects?: string[];
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
    /** Hero 아래 근거 숫자 띠. 검증된 숫자만 쓴다. */
    proof?: { value: string; label: string }[];
    /** 직무 선택 영역. 첫 번째 직무가 기본 선택값이다. */
    roles?: {
      title: string;
      description: string;
      items: HeroRole[];
    };
    /** 직무 선택과 무관하게 항상 보이는 공통 기술. 실제 사용이 확인된 것만 쓴다. */
    commonStack?: string[];
  };
  approach: {
    title: string;
    paragraphs: string[];
    /** 번호 목록으로 표시되는 원칙 */
    principles?: { title: string; desc: string }[];
    journey: JourneyStep[];
  };
  about: {
    title: string;
    paragraphs: string[];
    /** 경로 표시. 예: ["물리치료학", "AI / Software"] */
    path?: string[];
    /** 제목 아래 핵심 메시지 한 문장 */
    lead?: string;
    /** 가로 타임라인 단계. 배열 순서가 화면 순서다. */
    timeline?: AboutStep[];
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
