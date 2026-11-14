import type { Profile } from "./types";

export const profile: Profile = {
  name: "윤정현",
  role: "Backend Developer",
  hero: {
    eyebrow: "Portfolio · 2026",
    title: "윤정현",
    description: "문제를 발견하고, 원인을 구조화한 뒤\n데이터와 서버 로직으로 해결하고 검증합니다.",
    flow: ["문제", "원인", "해결", "검증"],
    // 실제 프로젝트(집플랜·다누비 AI)에서 사용이 확인된 기술만
    stack: ["TypeScript", "Node.js", "Next.js", "MySQL", "SQL", "API", "Database"],
    showcase: "jipplan",
  },
  approach: {
    title: "기능을 만든 뒤, 결과까지 확인합니다",
    paragraphs: [
      "기능을 만드는 것에서 끝내지 않습니다. 문제가 왜 생겼는지 먼저 확인하고, 데이터와 서버 로직으로 해결한 뒤, 테스트와 실제 환경에서 결과를 검증합니다.",
    ],
    // 각 단계의 사례는 content/projects.ts에 적힌 실제 구현에서 가져왔다.
    journey: [
      {
        label: "Problem",
        description: "무엇이 문제인가",
        example: "집플랜 — 매물 앱과 정책 포털이 따로라, 계약한 뒤에야 지원 대상이 아닌 걸 안다",
      },
      {
        label: "Cause",
        description: "왜 생기는가",
        example: "다누비 AI — 공공데이터 '운행정보'를 검증해 보니 실측값이 아니었다",
      },
      {
        label: "Solution",
        description: "데이터와 서버 로직으로 푼다",
        example: "집플랜 — 실거래를 건물 필지(PNU)에 연결하고, 정책 판정은 서버 전용 모듈에서 계산",
      },
      {
        label: "Verification",
        description: "테스트와 실제 환경에서 확인한다",
        example: "집플랜 — CI에서 빈 MySQL에 마이그레이션부터 다시 만들어 저장소 코드를 검사",
      },
      {
        label: "Result",
        description: "확인된 결과만 말한다",
        example: "집플랜 — 아파트 거래 지도 노출 54% → 99.97%",
      },
    ],
  },
  growth: {
    title: "만든 서비스가 어떻게 쓰이는지까지 봅니다",
    description:
      "마케팅 전문가가 아니라, 개발한 서비스가 어떻게 쓰이고 개선되는지까지 생각하기 위해 Growth와 Analytics를 공부했습니다.",
    flow: ["사용자 행동", "데이터 수집", "분석", "문제 발견", "서버 · 기능 개선", "다시 측정"],
    applied: [
      {
        project: "jipplan",
        state: "연결됨",
        detail: "GA4 연결. 핵심 전환인 '정책 판정'은 GA4가 아니라 서버 DB에서 집계 — 운영 지표는 아직 공개하지 않음",
      },
      {
        project: "danubi-ai",
        state: "가설",
        detail: "AARRR 퍼널 설계 — 공모전 MVP라 운영 지표 없음",
      },
    ],
    concepts: ["AARRR", "North Star Metric", "Funnel Analysis", "3C", "Growth Marketing", "Growth Hacking"],
    // 공식 명칭·취득일은 자료에서 확인되지 않아 비워 둔다. 확인되면 officialName / issuedOn에 채운다.
    credentials: [
      { name: "Google Analytics", state: "자격 취득" },
      { name: "Google Ads", state: "자격 취득" },
    ],
  },
  aiUsage: {
    title: "AI는 구현 도구, 기준은 직접 정합니다",
    description: "AI를 구현 도구로 활용하되, 요구사항과 비즈니스 규칙, 검증 기준은 직접 설계합니다.",
    ai: ["반복 코드", "코드 초안", "문서 초안", "테스트 코드 초안", "코드 리뷰 보조"],
    me: ["요구사항", "데이터 구조", "비즈니스 규칙", "시스템 구조", "테스트 기준", "최종 판단"],
    proof: {
      value: "0회",
      label: "Genloom 자동 발행",
      detail:
        "AI가 글 · 이미지 · 검수 초안을 만들지만, 규칙 검수가 RED면 멈추고 발행은 사람이 합니다. 실제 블로그 14편 모두 사람이 발행했습니다.",
    },
  },
  about: {
    title: "물리치료학에서 소프트웨어로",
    paragraphs: [
      "물리치료학을 공부하며 환자의 상태를 관찰하고, 원인을 찾고, 치료한 뒤 다시 평가하는 과정을 배웠습니다.",
      "지금은 같은 방식을 데이터와 소프트웨어로 확장하고 있습니다.",
    ],
    links: [
      { from: "관찰 · 평가", to: "문제 발견" },
      { from: "원인 추론", to: "원인 구조화" },
      { from: "치료", to: "데이터 · 서버 로직으로 해결" },
      { from: "재평가", to: "테스트 · 실제 환경 검증" },
    ],
    path: ["물리치료학", "Software · Backend"],
  },
  contact: {
    title: "Let's build something useful.",
    description: "채용 · 협업 문의는 아래 채널로 연락해 주세요.",
    // TODO: 실제 주소 확정 후 입력. 값이 없는 링크는 화면에 표시되지 않는다.
    links: {
      github: "https://github.com/wjdgus6480", // 이 포트폴리오 저장소(wjdgus6480/portfolio, 공개)의 계정
      email: undefined, // 예: "name@example.com"
      linkedin: undefined, // 선택
    },
  },
};
