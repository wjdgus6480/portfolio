import type { Project } from "./types";

/**
 * 프로젝트 목록. 배열 순서가 화면 표시 순서다.
 * - featured: true → Home의 Featured 카드, false → 아래 목록
 * - 값이 없는 선택 필드는 화면에서 숨겨진다.
 *
 * 현재는 6개 모두 Selected Work 카드로 표시한다.
 * TODO: 각 프로젝트의 summary / tech / status / period / links / detail 입력.
 */
export const projects: Project[] = [
  {
    slug: "danubi-ai",
    title: "다누비 AI",
    category: "관광 코스 AI",
    featured: true,
    summary: "공공데이터로 오늘 태종대에서 실제로 가능한 코스를 판단해 주는 관광 AI",
    logo: { src: "/projects/danubi-ai-logo.svg", alt: "다누비 AI 로고" },
    tech: ["JavaScript (ES Modules)", "Node.js", "PWA", "공공데이터포털", "node:test", "Netlify"],
    status: "live",
    period: "2026.08 – 2026.09",
    links: {
      demo: "https://prismatic-dasik-d01617.netlify.app/",
    },
    highlights: [
      "질문 4개만 고르면 바로 코스 추천 — 회원가입·설치 없음",
      "다누비·도보·차량 3개 플랜 비교 + 탈락 이유 공개",
      "오늘 날짜·도착 시각 기준 '다 돌 수 있는지' 판정",
      "추천 코스·안내판 장소 26곳 관광지도",
      "공식 원문만으로 답하는 관광도우미",
      "한·영·일·중 4개 언어",
    ],
    detail: {
      metrics: [
        { value: "수상", label: "부산관광공사 AI데이터활용 공모전" },
        { value: "3개", label: "플랜 동시 비교" },
        { value: "4개", label: "지원 언어" },
        { value: "105개", label: "자동 테스트" },
      ],
      overview: [
        "부산관광공사 AI데이터활용 공모전 수상작",
        "QR 한 번이면 '오늘, 지금 도착한 나'에게 가능한 태종대 코스를 알려주는 모바일 웹",
        "기획 · 데이터 검증 · 추천 엔진 · 화면 · 배포까지 1인 진행",
      ],
      target: [
        { label: "핵심 타깃", value: "오후에 태종대를 찾은 가족·연인 관광객 — 일정이 빠듯하고 현장에서 바로 결정해야 하는 사람" },
        { label: "확장 타깃", value: "걷기 힘든 어르신 동반 가족, 한국어 안내가 어려운 외국인 관광객" },
        { label: "핵심 질문", value: "\"지금 들어가면 원하는 곳 다 보고 나올 수 있어?\"" },
        { label: "목표", value: "입장 전 1분 안에 '갈 수 있는 코스'를 확정해, 막차·휴무 때문에 일정이 틀어지는 일을 없앤다" },
      ],
      market: {
        customer: [
          "다누비 시간표가 평일·휴일·성수기마다 다르고 월요일은 휴무",
          "늦게 도착하면 막차를 놓쳐 중간에서 발이 묶임",
          "원하는 건 정보 목록이 아니라 '가능/불가능' 한마디",
        ],
        competitor: [
          { name: "공식 홈페이지·안내판", limit: "시간표는 있지만 내 일정에 맞춰 계산해 주지 않음" },
          { name: "지도·길찾기 앱", limit: "경로는 알려주지만 다누비 회차·휴무를 반영한 코스 판단은 없음" },
          { name: "블로그 후기·생성형 AI", limit: "오래된 정보나 그럴듯한 오답 — 근거 확인이 어려움" },
        ],
        company: [
          "공공데이터 원본을 직접 검증하는 데이터 감각",
          "가능 여부를 계산하는 판단 엔진 설계",
          "모르는 값은 지어내지 않는 '근거 우선' 원칙",
        ],
        insight: "정보를 더 주는 서비스는 많다. 다누비 AI는 '오늘 이 코스가 가능한지'를 근거와 함께 판단해 주는 빈자리를 노렸다.",
      },
      beforeAfter: {
        before: [
          "시간표·휴무·휴관을 관광객이 직접 대조",
          "출발 후에야 막차를 놓친 걸 앎",
          "추천만 있고 '왜'는 없음",
        ],
        after: [
          "질문 4개 → 오늘 가능한 코스 즉시 확정",
          "막는 제약을 미리 표시 (예: 영도등대 재탑승 불가 — 막차 17:30)",
          "탈락한 플랜과 이유, 데이터 출처까지 공개",
        ],
      },
      flow: [
        "QR 접속 · 언어 자동 선택",
        "체류시간·걷기·이동방식·목적 선택",
        "3개 플랜 계산 · 시간표로 성립 판정",
        "추천 + 탈락 이유 + 코스 지도",
      ],
      screens: [
        { src: "/projects/danubi-ai/01-home.png", alt: "다누비 AI 홈 화면 — 코스 찾기, 지도 보기, 관광도우미, 현재 운영 안내", caption: "홈 — 오늘 운영 상태를 첫 화면에서 안내" },
        { src: "/projects/danubi-ai/02-question.png", alt: "코스 찾기 3/4 단계 — 이동 방식 선택 화면", caption: "질문 4개 — 고르면 바로 다음 질문" },
        { src: "/projects/danubi-ai/03-reasoning.png", alt: "AI 추천 결과의 '왜 이 결과인가' — 운영 조건 확인부터 추천까지 5단계", caption: "판단 근거 — 운영 조건 → 명소 거르기 → 비교 → 재검증" },
        { src: "/projects/danubi-ai/04-alternatives.png", alt: "다른 선택지 — 확정 가능한 도보 대안과 게이트에서 제외된 차량 플랜", caption: "대안 비교 — 탈락한 플랜과 이유까지 공개" },
        { src: "/projects/danubi-ai/05-map.png", alt: "태종대 관광지도 — 추천 코스 경로와 정류장 표시", caption: "코스 지도 — 추천 경로를 지도로 확인" },
        { src: "/projects/danubi-ai/06-english.png", alt: "영어로 표시된 오늘의 추천 코스 화면", caption: "다국어 — 언어가 바뀌어도 판정은 동일" },
      ],
      funnel: {
        stages: [
          { stage: "Acquisition", tactic: "매표소·탑승장 QR, 부산관광공사 채널 노출", metric: "QR 스캔 수" },
          { stage: "Activation", tactic: "가입 없이 질문 4개 → 첫 추천까지 1분", metric: "첫 추천 도달률" },
          { stage: "Retention", tactic: "현장에서 지도·관광도우미로 다시 열어 봄", metric: "세션당 재방문 화면 수" },
          { stage: "Revenue", tactic: "관광공사·지자체 도입(B2G), 다른 관광지 확장", metric: "도입 기관 수" },
          { stage: "Referral", tactic: "결과가 링크에 저장돼 일행에게 그대로 공유", metric: "공유 링크 유입" },
        ],
        note: "※ 공모전 MVP라 실제 운영 지표는 없습니다. 위 표는 서비스 설계 단계에서 세운 퍼널 가설입니다.",
      },
      challenges: [
        "공공데이터 '운행정보 및 도착시간'을 검증해 보니 실측값이 아님 → 런타임에서 제외",
        "정류장별 도착시각이 공식 자료에 없음 → 숫자를 지어내지 않고 '확정 · 조건부 · 불가 · 자료 부족' 4단계로 정직하게 표시",
      ],
      results: [
        "부산관광공사 AI데이터활용 공모전 수상 — 2차 발표에서 QR 공개 사이트로 현장 시연",
        "같은 조건도 날짜에 따라 결과가 바뀌는 것을 실시간 계산으로 증명 (9/19 성수기 가능 vs 10/17 비수기 불가)",
        "테스트 105개로 추천 규칙·다국어 판정 일치 고정",
      ],
      implementation: [
        "외부 패키지 0개 순수 JavaScript 엔진 — 브라우저에서 직접 계산, 정적 호스팅만으로 배포",
        "공공데이터포털 원본 CSV(배차시간표 15129724, 승강장·구간거리 15091665) 보관 → 스크립트로 런타임 데이터 생성",
        "모든 값에 출처 등급(공식 · 추정 · 계산 · 가정 · 모름)을 붙여 추적 가능",
      ],
      learnings: [
        "공공데이터는 '있다'와 '쓸 수 있다'가 다르다 — 신뢰는 검증에서 나온다",
        "사용자가 원하는 건 정보량이 아니라 결정 — 차별점은 '판단'에 있었다",
      ],
    },
  },
  {
    slug: "link",
    title: "LINK",
    featured: true,
  },
  {
    slug: "compound-life",
    title: "복리인생",
    featured: true,
  },
  {
    slug: "desktop-organizer",
    title: "바탕화면 정리 프로그램",
    featured: true,
  },
  {
    slug: "jarvis-mymemory",
    title: "JARVIS / MyMemory",
    featured: true,
  },
  {
    slug: "labor-advisor-ai",
    title: "LaborAdvisorAI",
    featured: true,
  },
  {
    slug: "aeong-daily",
    title: "애옹이의일상",
    featured: true,
  },
];
