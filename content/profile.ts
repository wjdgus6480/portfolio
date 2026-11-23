import type { Profile } from "./types";

export const profile: Profile = {
  name: "윤정현",
  role: "AI / Software / Product Developer",
  hero: {
    eyebrow: "AI / Software / Product Developer",
    title: "문제를 발견하면,\n직접 만듭니다.",
    description:
      "AI와 소프트웨어를 활용해 실제 문제를 해결하고\n제품으로 만드는 개발자, 윤정현",
  },
  approach: {
    title: "문제에서 시작해 제품까지",
    // TODO: 실제 경험을 바탕으로 2~3문단 작성 (개발을 시작한 계기, 처음 해결하려던 문제 등)
    paragraphs: [],
    // 단계 설명은 design-theme SKILL.md §17의 개발 방식 정의를 따른다.
    journey: [
      { label: "Problem", description: "문제를 발견한다" },
      { label: "Discovery", description: "문제를 조사한다" },
      { label: "Learning", description: "필요한 기술을 배운다" },
      { label: "Building", description: "직접 만든다" },
      { label: "Result", description: "결과를 확인한다" },
    ],
  },
  about: {
    title: "물리치료학에서 소프트웨어로",
    paragraphs: ["물리치료학에서 시작해 AI와 소프트웨어 개발로 영역을 넓혀 왔습니다."],
    // TODO: 확인된 경험만 추가 (전환 계기, 현재 관심 분야 등)
    path: ["물리치료학", "AI / Software Development"],
  },
  contact: {
    title: "Let's build something useful.",
    description: "프로젝트 협업이나 채용 관련 문의는 아래 채널로 연락해 주세요.",
    // TODO: 실제 주소 확정 후 입력. 값이 없는 링크는 화면에 표시되지 않는다.
    links: {
      github: undefined, // 예: "https://github.com/<username>"
      email: undefined, // 예: "name@example.com"
      linkedin: undefined, // 선택
    },
  },

  // ────────────────────────────────────────────────────────
  // Hero 직무 선택 인터랙션 데이터
  // 역할별 핵심 역량, 기술 스택, 관련 프로젝트 연결 정의
  // ────────────────────────────────────────────────────────
  roles: {
    backend: {
      label: "Backend",
      intro: "서버와 데이터베이스를 설계하고 안정적인 API 와 비즈니스 로직을 구현합니다.",
      tech: ["TypeScript", "Node.js", "MySQL", "REST API"],
      projects: [
        { slug: "jipplan", label: "집플랜", contribution: "Backend / DB 설계" },
      ],
    },
    fullstack: {
      label: "Full-stack",
      intro: "사용자 화면부터 서버, 데이터베이스까지 서비스 전체 흐름을 구현합니다.",
      tech: ["Next.js", "React", "TypeScript", "Node.js"],
      projects: [
        { slug: "jipplan", label: "집플랜", contribution: "Full-stack 엔지니어링" },
        { slug: "danubi-ai", label: "다누비 AI", contribution: "전체 개발 및 배포" },
      ],
    },
    fde: {
      label: "FDE",
      intro: "현장의 문제를 파악하고 고객의 요구를 실제 동작하는 기술 솔루션으로 구현합니다.",
      tech: ["API Integration", "Node.js", "Python", "Service Implementation"],
      projects: [], // TODO: 해당 프로젝트 추가 시 채워줄 것
    },
    ax: {
      label: "AX",
      intro: "반복 업무와 비효율적인 프로세스를 분석하고 자동화 시스템으로 개선합니다.",
      tech: ["Google Apps Script", "API Integration", "Google Sheets", "Automation"],
      projects: [], // TODO: GAS 자동화 프로젝트 추가 시 해당 스택 확인 필요
    },
    productpm: {
      label: "Product / PM",
      intro: "사용자 문제를 정의하고 요구사항과 서비스 흐름을 구체화합니다.",
      tech: ["Problem Definition", "User Flow", "Requirements Analysis", "Data Analysis"],
      projects: [
        { slug: "danubi-ai", label: "다누비 AI", contribution: "기획 · 엔진 설계 · 배포" },
        { slug: "jipplan", label: "집플랜", contribution: "전체 기획 및 개발" },
      ],
    },
    growth: {
      label: "Growth",
      intro: "사용자 행동과 서비스 데이터를 분석해 개선 기회를 찾고 제품 성장으로 연결합니다.",
      tech: ["AARRR", "North Star Metric", "Google Analytics", "Data Analysis"],
      projects: [
        { slug: "genloom", label: "Genloom", contribution: "그로스 포스팅 에이전트" }, // 1 위: 검색량 데이터 분석
        { slug: "jipplan", label: "집플랜", contribution: "Analytics 및 데이터 추적" }, // 2 위: GA4 연동
      ],
    },
  } as const,
};
