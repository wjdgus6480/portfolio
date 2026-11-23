import type { Profile } from "./types";

export const profile: Profile = {
  name: "윤정현",
  role: "AI / Software / Product Developer",
  hero: {
    eyebrow: "SOFTWARE DEVELOPER",
    title: "문제를 발견하고,\n직접 구현합니다.",
    description: "데이터로 원인을 분석하고 기술로 해결하는 개발자, 윤정현입니다.",
    // proof(근거 숫자 띠)는 Hero에서 AI를 과하게 강조하지 않도록 빼 두었다. 필요하면 다시 넣는다.
    // 근거: 수상 = projects.ts 다누비 AI / 15일·79% = 집플랜 저장소 origin/main
    // (커밋 191개 중 Co-Authored-By: Claude 151개, 2026-10-15 ~ 10-29) / 4종 = Genloom docs/MODEL_BAKEOFF.md
    // proof: [
    //   { value: "공모전 수상", label: "다누비 AI · 부산관광공사 AI데이터활용 공모전" },
    //   { value: "15일", label: "집플랜 1인 개발 · 커밋 79%가 Claude Code 공동 작성" },
    //   { value: "LLM 4종", label: "Genloom · 같은 과제로 비교 채점해 1종 채택" },
    // ],
    roles: {
      title: "어떤 역량을 찾고 계신가요?",
      description: "관심 있는 직무를 선택하면 해당 직무에 맞는 역량과 프로젝트를 보여드립니다.",
      // 프로젝트 기여 내용은 실제 구현 범위만 쓴다. 검증되지 않은 성과 수치는 넣지 않는다.
      items: [
        {
          id: "backend",
          label: "Backend",
          intro: "서버와 데이터베이스를 설계하고 안정적인 API와 비즈니스 로직을 구현합니다.",
          // 근거(집플랜): 마이그레이션 35개 · 공공 API 수집 → MySQL 매일 갱신 · scrypt/HMAC/Turnstile/권한 · 판정 엔진 TDD
          competencies: [
            { name: "Database Design" },
            { name: "Data Pipeline" },
            { name: "Authentication & Security" },
            { name: "Test-Driven Development" },
          ],
          tech: ["TypeScript", "Node.js", "Next.js", "MySQL", "TiDB Cloud", "REST API", "Vitest"],
          projects: [
            { slug: "jipplan", contributions: ["Backend 개발", "데이터베이스 설계", "API 및 서버 로직 구현"] },
          ],
        },
        {
          id: "frontend",
          label: "Frontend",
          intro: "사용자가 바로 이해하고 쓸 수 있는 화면과 인터랙션을 설계하고 구현합니다.",
          // 근거: React·Next.js·TypeScript·Tailwind CSS·카카오맵 = 집플랜 / Vanilla JS·SVG·4개 언어·해시 라우팅 = 다누비 AI
          competencies: [
            { name: "Mobile Web UI" },
            { name: "Map UI" },
            { name: "Internationalization" },
            { name: "Client-side Routing" },
          ],
          tech: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS", "SVG", "Kakao Maps API"],
          projects: [
            {
              slug: "jipplan",
              contributions: ["Next.js · React로 화면 구현", "카카오맵 기반 지도 · 매물 마커 UI", "정책 판정 결과와 근거 표시 화면"],
            },
            {
              slug: "danubi-ai",
              contributions: ["Vanilla JS로 모바일 웹 화면 구현", "질문 4개로 코스를 추천받는 선택 흐름", "SVG 관광지도 · 한·영·일·중 4개 언어 화면"],
            },
          ],
        },
        {
          id: "fde",
          label: "FDE",
          intro: "현장의 문제를 파악하고 다양한 기술을 조합해 실제 작동하는 솔루션으로 구현합니다.",
          competencies: [
            { name: "Problem Discovery" },
            { name: "Requirements Analysis" },
            { name: "Technical Implementation" },
            { name: "API Integration" },
            { name: "Rapid Prototyping" },
            { name: "Service Deployment" },
            { name: "Public Data Integration" },
          ],
          // 근거: 공공데이터 10종 이상 수집(집플랜) · 공공데이터포털 CSV(다누비 AI) · 네이버 API(Genloom) · 배포(Vercel · Netlify)
          tech: ["공공데이터 API", "Naver Search API", "Kakao API", "Vercel", "Netlify"],
          projects: [
            { slug: "jipplan", contributions: ["요구사항 분석", "서비스 설계", "구현 및 배포"] },
            { slug: "danubi-ai", contributions: ["문제 정의", "AI 활용 기반 개발", "서비스 구현 및 배포"] },
            { slug: "genloom", contributions: ["네이버 API 연동", "검색량 데이터 추적"] },
          ],
        },
        {
          // TODO: 사용자가 나머지 자동화 프로젝트(GAS 등)와 핵심 역량 · 기술을 직접 추가할 예정
          id: "ax",
          label: "AX",
          intro: "반복 업무와 비효율적인 프로세스를 분석하고 기술을 활용해 개선하는 업무 자동화를 지향합니다.",
          projects: [
            {
              // 근거: projects.ts Genloom highlights · decisions (자동화는 발행 묶음까지, 발행은 사람)
              slug: "genloom",
              contributions: [
                "키워드 측정부터 글 · 이미지 · 검수까지 블로그 작업 흐름 자동화",
                "단계별 GREEN · YELLOW · RED 판정, RED면 자동으로 멈춤",
                "자동화는 발행 직전까지, 발행은 사람이 결정",
              ],
            },
          ],
        },
        {
          id: "product",
          label: "Product / PM",
          intro: "사용자 문제를 정의하고 요구사항과 서비스 흐름을 구체화해 실제 제품으로 구현합니다.",
          competencies: [
            { name: "Problem Definition" },
            { name: "Requirements Analysis" },
            { name: "User Flow" },
            { name: "Service Planning" },
            { name: "Product Development" },
            { name: "Market Analysis (3C)" },
            { name: "Metric Design" },
          ],
          projects: [
            { slug: "danubi-ai", contributions: ["서비스 기획", "구조 설계", "AI 활용 기반 1인 개발", "구현 및 배포"] },
            { slug: "jipplan", contributions: ["서비스 기획", "구조 설계", "AI 활용 기반 1인 개발", "구현 및 배포"] },
          ],
        },
        {
          id: "growth",
          label: "Growth",
          intro: "사용자 행동과 검색 데이터를 분석해 개선 기회를 발견하고 서비스 성장으로 연결합니다.",
          // AARRR은 다누비 AI · 집플랜에 퍼널 가설로만 설계, NSM은 적용 기록 없음 → 학습한 개념으로 구분
          competencies: [
            { name: "Data Analysis" },
            { name: "Search Trend Tracking" },
            { name: "User Behavior Tracking" },
            { name: "Google Analytics" },
            { name: "API Integration" },
            { name: "SEO / AEO" },
            { name: "AARRR", learned: true },
            { name: "North Star Metric", learned: true },
          ],
          // 근거: GA4(집플랜) · 네이버 검색·데이터랩 API · matplotlib · SEO/AEO 규칙 검수(Genloom)
          tech: ["Google Analytics 4", "Naver Search API", "Python", "matplotlib"],
          projects: [
            {
              slug: "genloom",
              contributions: ["네이버 API를 활용한 검색량 추적", "검색량 및 키워드 데이터 분석"],
            },
            {
              slug: "jipplan",
              contributions: ["Google Analytics 연동", "서비스 접속 관련 데이터 추적", "사용자 유입 및 이용 현황 분석 기반"],
            },
          ],
        },
      ],
    },
    // 근거: TypeScript·MySQL·Next.js·React = 집플랜 / JavaScript·Node.js = 다누비 AI /
    // Python = Genloom 외 / Supabase = 이 포트폴리오 관리자 페이지 / Git = skills.ts /
    // Tailwind CSS = 집플랜 · 이 포트폴리오 / SQLite = 복리인생 · 바탕화면 정리 · ThreadsGrowthSignal / Vercel = 집플랜
    commonStack: [
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Next.js",
      "React",
      "Tailwind CSS",
      "MySQL",
      "SQLite",
      "Supabase",
      "Python",
      "Vercel",
      "Git / GitHub",
    ],
  },
  approach: {
    title: "AI와 일하는 방식",
    paragraphs: [
      "AI를 많이 쓰는 것보다 어디에 쓸지를 먼저 정합니다. 관광 코스의 막차 시간처럼 틀리면 현장에서 바로 피해가 나는 판단은 규칙 엔진에 맡기고, 글·코드·차트 명세처럼 초안을 빠르게 만드는 일은 LLM과 AI 코딩 에이전트에 맡깁니다.",
      "AI가 만든 결과는 그 AI가 스스로 검증하지 않습니다. 사실은 근거 자료와 기계적으로 대조하고, 근거 없는 수치가 나오면 작업을 멈춥니다. 발행처럼 되돌리기 어려운 마지막 결정은 사람이 합니다.",
    ],
    principles: [
      {
        title: "맞는 도구를 고른다",
        desc: "틀리면 안 되는 판단은 규칙 엔진으로, 생성은 LLM으로. 다누비 AI는 LLM 없이 12단계 판단 엔진으로 만들었다.",
      },
      {
        title: "근거 없는 답은 내보내지 않는다",
        desc: "자료에 없는 값은 지어내지 않고 '자료 부족' · '추가 확인'으로 표시한다.",
      },
      {
        title: "만든 AI가 스스로 검증하지 않는다",
        desc: "글 · 이미지 · 검토 모델을 나누고, 사실 대조는 규칙 검사가 맡는다. 실험에서 검토 AI가 지어낸 문장을 놓치는 것을 확인했다.",
      },
      {
        title: "되돌리기 어려운 결정은 사람이 한다",
        desc: "자동 발행은 일부러 만들지 않았다. AI는 발행 직전까지, 발행 버튼은 사람이 누른다.",
      },
    ],
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
    // 연락 채널은 이메일만 표시한다. 값이 없는 링크는 화면에 표시되지 않는다.
    links: {
      email: "wjdgus6480@naver.com",
    },
  },
};
