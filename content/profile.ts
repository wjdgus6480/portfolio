import type { Profile } from "./types";

export const profile: Profile = {
  name: "윤정현",
  role: "AI / Software / Product Developer",
  hero: {
    eyebrow: "AI / Software / Product Developer",
    title: "AI로 제품을 만들고,\nAI로 일합니다.",
    description:
      "공개 서비스는 AI 코딩 에이전트와 1인으로 완성하고,\n제 업무는 직접 설계한 AI 에이전트로 운영합니다.",
    // 근거: 수상 = projects.ts 다누비 AI / 15일·79% = 집플랜 저장소 origin/main
    // (커밋 191개 중 Co-Authored-By: Claude 151개, 2026-10-15 ~ 10-29) / 4종 = Genloom docs/MODEL_BAKEOFF.md
    proof: [
      { value: "공모전 수상", label: "다누비 AI · 부산관광공사 AI데이터활용 공모전" },
      { value: "15일", label: "집플랜 1인 개발 · 커밋 79%가 Claude Code 공동 작성" },
      { value: "LLM 4종", label: "Genloom · 같은 과제로 비교 채점해 1종 채택" },
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
    // TODO: 실제 주소 확정 후 입력. 값이 없는 링크는 화면에 표시되지 않는다.
    links: {
      github: "https://github.com/wjdgus6480",
      email: undefined, // 사용자 확인 후 입력
      linkedin: undefined, // 선택
    },
  },
};
