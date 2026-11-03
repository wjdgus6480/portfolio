현재 프로젝트 `C:\Users\wjdgu\Desktop\portfolio`의 메인 포트폴리오 페이지를 최종 구현한다.

## 1. 먼저 반드시 확인

구현 전에 다음 파일과 구조를 읽어라.

- `app/page.tsx`
- `app/layout.tsx`
- `app/globals.css`
- `app/projects/[slug]/page.tsx`
- `content/` 폴더가 있다면 관련 파일 전체
- `claude/skills/design-theme/SKILL.md`
- `package.json`

현재 구현되어 있는 기능과 프로젝트 데이터를 먼저 파악하고, 기존 기능을 함부로 삭제하지 마라.

## 2. 목표

이 사이트는 단순한 이력서나 기술 스택 소개 사이트가 아니다.

포지셔닝:

**AI / Software / Product Developer**

핵심 메시지:

**문제를 발견하면, 직접 만듭니다.**

AI와 소프트웨어를 활용해 실제 문제를 발견하고,
직접 설계하고 만들고 개선하는 개발자라는 인상을 주는 것이 목적이다.

## 3. 메인 페이지 구성

다음 구조를 기본으로 구현한다.

### Header

- 좌측: 윤정현 또는 Portfolio
- 우측: Work / About / Contact
- 과도하게 복잡한 네비게이션 금지
- `/admin`은 일반 방문자에게 강조해서 노출하지 않는다.

### Hero

가장 중요한 영역이다.

메인 카피:

> 문제를 발견하면,  
> 직접 만듭니다.

보조 문구:

> AI와 소프트웨어를 활용해 실제 문제를 해결하고  
> 제품으로 만드는 개발자, 윤정현

CTA:

- Selected Work
- Contact

Hero에서 지나친 애니메이션이나 장식은 사용하지 않는다.

### Selected Work

실제 프로젝트 데이터를 사용한다.

우선순위가 높은 프로젝트:

- LINK
- 복리인생
- 바탕화면 정리 프로그램
- JARVIS / MyMemory
- LaborAdvisorAI
- 애옹이의일상

각 프로젝트는 카드 형태로 보여주되 단순히 기술 스택만 나열하지 않는다.

가능하면:

- 프로젝트명
- 한 줄 설명
- 문제 또는 목적
- 사용 기술
- 상태

를 보여준다.

프로젝트 카드는 기존 `/projects/[slug]` 상세 페이지로 연결한다.

존재하지 않는 링크나 URL을 임의로 만들지 않는다.

### Approach

다음 흐름으로 개발 방식을 보여준다.

Problem  
→ Discovery  
→ Learning  
→ Building  
→ Result

각 단계는 짧고 명확하게 설명한다.

### Skills

기술을 별점이나 퍼센트로 표현하지 않는다.

실제 사용 맥락 중심으로 그룹화한다.

예:

- AI / Agent
- Software Development
- Data / API
- Automation / Content

현재 프로젝트에서 실제로 사용한 기술만 표시한다.

### About

물리치료학에서 시작해 AI / 소프트웨어 개발로 확장해 온 흐름을 간결하게 보여준다.

과장하거나 확인되지 않은 경력, 수상, 숫자를 새로 만들지 않는다.

### Contact

방문자가 연락할 수 있는 간단한 영역을 만든다.

현재 실제로 제공할 수 있는 연락처나 링크가 없다면 임의의 이메일이나 SNS 주소를 만들지 않는다.

## 4. 디자인

반드시 `claude/skills/design-theme/SKILL.md`를 기준으로 한다.

핵심:

- Professional
- Modern
- Minimal
- Technical
- Product-oriented
- Readable
- Trustworthy

Light mode 우선.

색상은 디자인 시스템의 값을 따른다.

기본 배경:
`#FAFAFA`

Surface:
`#FFFFFF`

Foreground:
`#18181B`

Secondary:
`#52525B`

Border:
`#E4E4E7`

Accent:
`#2563EB`

Pretendard가 이미 있다면 기존 폰트를 활용한다.

과도한 gradient, glassmorphism, 무지개색 기술 태그, 큰 그림자, 불필요한 애니메이션은 사용하지 않는다.

## 5. 반응형

반드시 다음을 고려한다.

- Desktop
- Tablet
- Mobile

프로젝트 카드는 Desktop에서 2열,
Mobile에서 1열을 기본으로 한다.

Hero typography와 section spacing도 모바일에서 적절하게 줄인다.

가로 스크롤이 발생하지 않도록 한다.

## 6. 중요한 개발 원칙

절대로 없는 정보를 만들어내지 마라.

특히 다음을 임의로 생성하지 않는다.

- 회사명
- 경력 기간
- 프로젝트 성과 수치
- 사용자 수
- 매출
- GitHub URL
- Demo URL
- 이메일
- SNS
- 프로젝트 스크린샷
- 수상 실적

기존 content 데이터에 있는 정보만 사용한다.

Supabase/Auth 코드는 이번 작업에서 수정하지 않는다.

현재 `/auth/callback`, `/admin`, Supabase 설정은 건드리지 않는다.

새로운 dependency도 필요하지 않다면 추가하지 않는다.

## 7. 구현 방식

현재 프로젝트 구조를 최대한 유지한다.

이미 `content/projects.ts` 같은 데이터 파일이 있다면 그것을 재사용한다.

페이지에 프로젝트 정보를 하드코딩해서 중복 생성하지 않는다.

Server Component를 기본으로 사용한다.

`'use client'`는 정말 필요한 경우에만 사용한다.

## 8. 작업 순서

반드시 다음 순서로 진행한다.

1. 현재 파일 구조와 코드를 읽는다.
2. 현재 page.tsx와 디자인 시스템을 분석한다.
3. 기존 프로젝트 데이터 구조를 확인한다.
4. 변경 계획을 짧게 정리한다.
5. 필요한 파일만 수정한다.
6. `npm run build` 실행한다.
7. TypeScript/build 오류가 있으면 수정한다.
8. 최종적으로 변경된 파일과 build 결과를 요약한다.

기존 기능을 삭제하거나 대규모 구조 변경을 하기 전에 반드시 이유를 설명한다.

## 9. 최종 목표

방문자가 첫 화면에서 다음을 이해할 수 있어야 한다.

**“이 사람은 단순히 AI 도구를 사용하는 사람이 아니라,
실제 문제를 발견하고 AI와 소프트웨어를 이용해 직접 제품을 만드는 사람이다.”**

그리고 프로젝트 섹션을 보면 실제로 무엇을 만들었는지 바로 확인할 수 있어야 한다.

최종적으로 `npm run build`가 성공하는 상태까지 완료하라.