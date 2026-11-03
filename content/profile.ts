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
};
