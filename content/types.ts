export type ProjectStatus = "live" | "in-progress" | "archived";

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

/** 코드 근거 위치. 저장소 루트 기준 경로. Project.codeBase가 있으면 링크, 없으면(비공개 저장소) 경로만 표시 */
export type CodePath = string;

/**
 * 백엔드 증거. 모든 숫자는 asOf에 적힌 커밋에서 다시 센 값이며, basis에 어떻게 셌는지 적는다.
 * 실행해서 확인한 값과 코드에서 정적으로 센 값을 basis로 구분한다.
 */
export type BackendEvidence = {
  /** 예: "origin/main 12d517f · 2026-10-29" */
  asOf: string;
  proof: { value: string; label: string; basis: string; path?: CodePath }[];
  capabilities: { label: string; detail: string; paths: CodePath[] }[];
  /** 요청에서 응답까지 실제 계층. 가상의 계층을 만들지 않는다. */
  layers: { name: string; role: string; paths: CodePath[] }[];
  /** 데이터 흐름 단계 (화살표로 이어서 표시) */
  dataFlow: string[];
  api: { method: string; path: string; purpose: string }[];
  actions: { path: CodePath; purpose: string }[];
  /** 테이블 이름 접두어로 묶은 데이터 영역 */
  tables: { domain: string; prefix: string; count: number; examples: string[] }[];
};

/** 상세 페이지 상단의 엔지니어링 요약: 문제 → 원인 → 해결 → 검증 → 결과 */
export type EngineeringStory = {
  problem: string[];
  cause: string[];
  solution: string[];
  verification: string[];
  result: string[];
};

/**
 * 상세 페이지 섹션. 문자열 배열은 짧은 항목 목록으로 표시되며, 비어 있으면 화면에서 숨겨진다.
 * 한 항목은 한두 줄 이내로 쓴다.
 */
export type ProjectDetail = {
  story?: EngineeringStory;
  backend?: BackendEvidence;
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
  /** 처리 파이프라인 단계 (화살표로 이어서 표시) */
  architecture?: string[];
  /** 기술 결정과 이유 */
  decisions?: { decision: string; why: string }[];
  /** 테스트·품질: 숫자 + 짧은 설명 */
  testing?: { metrics: { value: string; label: string }[]; items: string[] };
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
  /** 쇼케이스에서 이 프로젝트가 보여 주는 역량. 예: "Backend · Database" */
  track?: string;
  /** 쇼케이스의 엔지니어링 한 줄: 무엇이 문제였고 서버·로직에서 어떻게 풀었는가 */
  focus?: string;
  /** 쇼케이스 카드의 대표 화면. 기존 screens/aiOutput 이미지를 가리킨다. */
  cover?: OutputImage;
  /** 홈 카드: 무엇을 만들었고, 어떤 문제를 어떻게 풀었고, 무엇으로 확인했는가. 한두 줄씩. */
  brief?: { built: string; problem: string; solution: string; result: string };
  /** 홈 카드 하단 증거. 문제와 연결되는 숫자만 고른다. */
  evidence?: { value: string; label: string }[];
  /** 공개 저장소 주소(예: https://github.com/u/r/blob/main). 있으면 코드 근거 경로가 링크가 된다. */
  codeBase?: string;
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
  /** 데모 주소 QR 이미지. src는 public/ 기준 경로. 반드시 links.demo와 같은 주소를 가리켜야 한다. */
  qr?: { src: string; alt: string };
  /** 주요 기능 */
  highlights?: string[];
  detail?: ProjectDetail;
};

export type JourneyStep = {
  label: string;
  description?: string;
  /** 이 단계의 실제 프로젝트 사례 */
  example?: string;
};

/** Home의 엔지니어링 사례. 실제 코드·데이터로 확인되는 내용만 쓴다. */
export type EngineeringCase = {
  /** Project.slug */
  project: string;
  title: string;
  problem: string;
  cause: string;
  /** 선택한 방법. 대안과 버린 이유는 근거가 있을 때만 쓴다. */
  decision: { chosen: string; alternative?: string; whyNot?: string };
  implementation: string[];
  verification: string[];
  result: string;
  evidence: CodePath[];
};

/**
 * 기술 상태. 사용 = 실제 프로젝트 코드에서 확인됨 / 학습 = 공부했지만 프로젝트에는 쓰지 않음 /
 * 예정 = 다음 프로젝트에서 쓸 계획 (아직 구현 안 함)
 */
export type SkillStatus = "used" | "learning" | "planned";

export type SkillItem = {
  name: string;
  status: SkillStatus;
  /** 사용한 프로젝트 slug (status가 used일 때) */
  usedIn?: string[];
  /** 짧은 맥락. 예: "Route Handler · Server Actions" */
  note?: string;
};

export type SkillGroup = {
  name: string;
  /** 포트폴리오 안에서의 비중 */
  weight: "primary" | "secondary" | "supporting";
  /** 이 역량이 하는 역할 한 줄 */
  role: string;
  /** 묶음 전체에 붙는 짧은 단서. 예: "학습 · 가설 단계 적용" */
  note?: string;
  items: SkillItem[];
};

/** 자격. 공식 명칭·취득일은 자료로 확인될 때만 채운다. */
export type Credential = {
  name: string;
  /** 예: "자격 취득" */
  state: string;
  officialName?: string;
  issuedOn?: string;
};

/** 현재 기술과 다음 확장 기술. next는 Skills처럼 보이지 않게 별도 영역에만 표시한다. */
export type NextStack = {
  /** 지금 실제 프로젝트에서 쓰는 기술 */
  current: string[];
  /** 다음에 확장할 기술 (아직 사용하지 않음) */
  next: string[];
  goal: string;
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
    /** 일하는 순서. 예: ["문제", "원인", "해결", "검증"] */
    flow?: string[];
    /** 주력 기술 한 줄. 실제 프로젝트에서 사용한 기술만 */
    stack?: string[];
    /** 오른쪽에 크게 보여 줄 대표 프로젝트 slug (그 프로젝트의 cover 사용) */
    showcase?: string;
  };
  growth?: {
    title: string;
    description: string;
    /** 사용자 행동 → … → 성과 측정 */
    flow: string[];
    /** 실제 프로젝트에 적용한 것 (코드로 확인된 것만) */
    applied: { project: string; detail: string; /** 예: "연결됨" · "가설" */ state: string }[];
    concepts: string[];
    credentials: Credential[];
  };
  aiUsage?: {
    title: string;
    description: string;
    ai: string[];
    me: string[];
    /** 사람이 최종 결정한다는 실제 사례 */
    proof?: { value: string; label: string; detail: string };
  };
  approach: {
    title: string;
    paragraphs: string[];
    journey: JourneyStep[];
  };
  about: {
    title: string;
    paragraphs: string[];
    /** 이 경험이 지금 개발 방식에 어떻게 이어지는가 */
    links?: { from: string; to: string }[];
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
