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
            {
              slug: "gas-automation",
              contributions: ["YouTube · NVIDIA REST API 연동", "응답 데이터 파싱 · 검증 후 시트 저장", "동시 실행 잠금 · 실행 결과 기록"],
            },
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
            {
              slug: "gas-automation",
              contributions: ["외부 API · AI · Google Workspace 연결", "수집부터 리포트 메일 전달까지 흐름 설계", "실패 원인 확인 후 수정 · 재배포"],
            },
          ],
        },
        {
          id: "ax",
          label: "AX",
          intro: "반복 업무와 비효율적인 프로세스를 분석하고 기술을 활용해 개선하는 업무 자동화를 지향합니다.",
          // 근거(projects.ts): GAS = 수집 → AI 분석 → 슬라이드 · PDF · PPTX → 메일, AI 답 형식 검사 후에만 문서화 /
          // Genloom = 키워드 → 발행 9단계, 글 · 이미지 · 검토 모델 분리, GREEN · YELLOW · RED 판정, 발행은 사람
          competencies: [
            { name: "Workflow Automation" },
            { name: "LLM Integration" },
            { name: "AI Output Validation" },
            { name: "Report Generation" },
            { name: "Human-in-the-loop Design" },
          ],
          // projects.ts의 GAS · Genloom tech에 있는 것만
          tech: [
            "Google Apps Script",
            "Python",
            "NVIDIA API (LLM)",
            "Claude API",
            "YouTube Data API",
            "네이버 검색 · 데이터랩 API",
            "Google Sheets",
            "Google Slides",
          ],
          projects: [
            {
              slug: "gas-automation",
              contributions: ["AI 분석 결과로 슬라이드 · PDF · PPTX 리포트 자동 생성", "리포트를 첨부해 메일로 자동 전달", "AI 답을 형식 검사한 뒤에만 문서화"],
            },
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
    lead: "문제를 이해하고, 원인을 찾고, 직접 해결하는 개발자로 성장해 왔습니다.",
    timeline: [
      {
        id: "healthcare",
        label: "Healthcare",
        caption: "물리치료학",
        icon: "healthcare",
        points: ["물리치료학 전공", "재활 현장 근무", "사람의 움직임과 기능, 개인별 요구를 이해한 경험"],
      },
      {
        id: "problem-solving",
        label: "Problem Solving",
        caption: "원인을 찾는 접근",
        icon: "problem",
        points: [
          "현상만 보는 것이 아니라 문제의 원인을 파악하는 접근",
          "문제 정의와 요구사항 분석",
          "해결 방법을 구조화하는 사고방식",
        ],
      },
      {
        id: "development",
        label: "Development",
        caption: "직접 구현",
        icon: "development",
        points: [
          "서비스 기획 및 구조 설계",
          "프론트엔드와 백엔드 개발",
          "데이터베이스와 API 설계 및 구현",
          "AI 도구를 활용한 1인 개발 경험",
        ],
        projects: ["jipplan", "danubi-ai"],
      },
      {
        id: "growth-delivery",
        label: "Growth & Delivery",
        caption: "배포와 데이터",
        icon: "growth",
        points: [
          "테스트 및 검증",
          "실제 서비스 배포",
          "Google Analytics를 활용한 접속 데이터 추적",
          "네이버 API를 활용한 검색량 및 키워드 데이터 분석",
        ],
        projects: ["jipplan", "danubi-ai", "genloom"],
      },
    ],
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
