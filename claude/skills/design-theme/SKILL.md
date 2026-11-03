# Design Theme Skill

## 1. Skill Identity

- **Name:** design-theme
- **Purpose:** 개인 개발자 포트폴리오의 전체 UI/UX 및 시각 디자인 기준을 정의한다.
- **Target:** AI / Software / Product Developer 포트폴리오
- **Primary Goal:** 기술을 나열하는 포트폴리오가 아니라, 실제 문제를 발견하고 AI와 소프트웨어를 활용해 제품을 만드는 개발자라는 인상을 전달한다.

---

# 2. Core Design Philosophy

이 포트폴리오는 다음 인상을 우선한다.

- Professional
- Modern
- Minimal
- Technical
- Product-oriented
- Readable
- Trustworthy

### 핵심 원칙

> "장식보다 콘텐츠와 프로젝트가 주인공이어야 한다."

사용자가 첫 화면을 봤을 때 다음을 빠르게 이해할 수 있어야 한다.

1. 누구인가?
2. 무엇을 만드는가?
3. 어떤 문제를 해결하는가?
4. 어떤 프로젝트를 만들었는가?
5. 어떤 기술을 사용하는가?
6. 실제로 개발할 수 있는 사람인가?

---

# 3. Visual Direction

## 기본 방향

- Light Mode 우선
- 깨끗한 흰색/밝은 회색 기반
- 제한적인 Blue Accent
- 얇은 Border
- 넉넉한 Whitespace
- 강한 Typography
- 정돈된 Grid
- 과도한 장식 최소화

## 피해야 할 방향

다음 디자인은 기본적으로 사용하지 않는다.

- 과도한 Gradient
- 강한 Glow
- Glassmorphism
- 과도한 3D 효과
- 의미 없는 애니메이션
- 과도한 Shadow
- Rainbow Color
- 지나치게 많은 Badge
- 장식용 일러스트 남발
- AI 포트폴리오에서 흔히 보이는 Generic Template
- 기술마다 다른 색상을 사용하는 무분별한 Tech Badge
- 콘텐츠보다 디자인이 먼저 보이는 레이아웃

---

# 4. Color System

## Base

```text
Background      #FAFAFA
Surface         #FFFFFF
Foreground      #18181B
Text Secondary  #52525B
Text Weak       #71717A
Placeholder     #A1A1AA
Border          #E4E4E7
Background Weak #F4F4F5
```

## Accent

```text
Accent          #2563EB
Accent Hover    #1D4ED8
Accent Soft     #EFF6FF
```

Accent는 전체 화면에서 제한적으로 사용한다.

### Accent 사용 위치

- Primary CTA
- 주요 링크
- Active Navigation
- Focus 상태
- 중요한 정보
- Project Status 중 강조가 필요한 상태

Accent를 화면 전체의 배경이나 장식으로 과도하게 사용하지 않는다.

## Status

```text
Success #16A34A
Warning #D97706
Error   #DC2626
```

Status Color는 실제 상태를 표현할 때만 사용한다.

---

# 5. Typography

## Font Priority

한국어 가독성을 우선한다.

권장 순서:

```text
Pretendard
system-ui
sans-serif
```

코드, 기술명, 숫자, 메타 정보에는 다음을 사용할 수 있다.

```text
Geist Mono
monospace
```

## Typography Scale

### Hero

Desktop:

```text
56px ~ 72px
font-weight: 700 ~ 800
line-height: 1.05 ~ 1.15
```

Mobile:

```text
40px ~ 48px
font-weight: 700 ~ 800
line-height: 1.1 ~ 1.2
```

### H2

Desktop:

```text
36px ~ 44px
```

Mobile:

```text
30px ~ 34px
```

### H3

```text
20px ~ 24px
```

### Body

```text
16px ~ 18px
line-height: 1.6 ~ 1.75
```

### Small / Meta

```text
13px ~ 14px
```

---

# 6. Layout System

## Container

기본 최대 너비:

```text
1200px
```

## Horizontal Padding

Desktop:

```text
32px ~ 48px
```

Tablet:

```text
24px
```

Mobile:

```text
20px
```

## Section Spacing

Desktop:

```text
120px ~ 160px
```

Mobile:

```text
80px ~ 100px
```

페이지 전체에 동일한 간격을 강제로 적용하지 않는다.

콘텐츠 중요도에 따라 간격을 조절한다.

---

# 7. Grid System

Project 영역은 기본적으로 다음 구조를 사용한다.

### Desktop

```text
2 Columns
```

### Tablet

```text
2 Columns
```

### Mobile

```text
1 Column
```

3열 이상의 Grid는 특별한 이유가 없으면 사용하지 않는다.

프로젝트 카드의 콘텐츠가 충분히 읽히는 것이 Grid 개수보다 중요하다.

---

# 8. Header

Header는 포트폴리오의 탐색을 돕는 최소한의 UI로 구성한다.

권장 구조:

```text
Logo / Name
Projects
About / Approach
Contact
```

원하는 경우 Resume 또는 GitHub 링크를 추가할 수 있다.

## Header 원칙

- 지나치게 큰 Header 금지
- Navigation을 과도하게 늘리지 않는다.
- Mobile에서는 필요한 경우 Menu로 축소한다.
- Active 상태는 Accent를 제한적으로 사용한다.

---

# 9. Hero

Hero는 첫 화면에서 가장 중요한 영역이다.

목표는 화려하게 보이는 것이 아니라 **개발자의 정체성을 즉시 전달하는 것**이다.

권장 구조:

```text
Eyebrow
↓
Main Heading
↓
Short Description
↓
Primary CTA / Secondary CTA
```

예시 방향:

```text
문제를 발견하면,
직접 만듭니다.

AI와 소프트웨어를 활용해 실제 문제를 해결하고
제품으로 만드는 개발자, 윤정현
```

단, 실제 최종 문구는 별도의 콘텐츠 파일에서 관리한다.

Hero 컴포넌트 안에 콘텐츠를 하드코딩하지 않는다.

---

# 10. Project Design

프로젝트는 포트폴리오의 핵심 콘텐츠다.

Project Card는 단순히 기술 이름만 보여주는 카드가 되어서는 안 된다.

가능하면 다음 정보를 전달한다.

```text
Project Name
Status
Short Summary
Problem
Solution
Technology
Period
```

모든 정보를 한 카드에 강제로 넣지는 않는다.

정보가 많으면 상세 페이지로 이동시킨다.

---

# 11. Project Card

기본 스타일:

```text
Background: #FFFFFF
Border: 1px solid #E4E4E7
Border Radius: 12px ~ 16px
Padding: 24px ~ 32px
Shadow: none 또는 매우 약하게
```

Hover 효과는 최소화한다.

권장:

```text
border-color 변화
background 변화
transform: 매우 작은 수준
```

과도한 확대 효과나 Glow는 사용하지 않는다.

---

# 12. Project Status

프로젝트 상태는 명확하게 표현한다.

예:

```text
Live
In Progress
Archived
```

상태를 표현할 때 색상만으로 의미를 전달하지 않는다.

텍스트 또는 아이콘을 함께 사용한다.

---

# 13. Technology Tags

기술 태그는 정보를 빠르게 파악하기 위한 보조 요소다.

기술마다 무지개색을 적용하지 않는다.

기본적으로 Neutral 스타일을 사용한다.

예:

```text
Next.js
TypeScript
Python
FastAPI
Supabase
SQLite
AI Agent
```

기술 태그가 프로젝트 설명보다 더 눈에 띄어서는 안 된다.

---

# 14. Project Detail Page

Project Card 클릭 시 다음 구조를 사용할 수 있다.

```text
Project Header
↓
Overview
↓
Problem
↓
Approach
↓
Implementation
↓
Challenges
↓
Result
↓
What I Learned
↓
Technology
↓
Links
```

모든 프로젝트가 모든 섹션을 가져야 하는 것은 아니다.

실제 프로젝트에 존재하는 정보만 표시한다.

---

# 15. Featured Projects

Home에서는 모든 프로젝트를 동일한 비중으로 보여주지 않는다.

`featured` 상태를 기준으로 주요 프로젝트를 선정한다.

예:

```ts
featured: true
```

UI는 `featured` 값을 기준으로 프로젝트를 표시한다.

따라서 프로젝트를 Featured에서 제외하기 위해 컴포넌트 코드를 수정할 필요가 없어야 한다.

---

# 16. More Projects

Featured Projects 아래에는 다른 프로젝트도 확인할 수 있는 영역을 제공할 수 있다.

목적:

> 프로젝트가 적어 보이지 않게 하는 것이 아니라,
> 개발자가 어떤 문제들을 다양하게 해결해왔는지 보여주는 것.

Featured 프로젝트와 일반 프로젝트의 시각적 위계를 유지한다.

---

# 17. Approach Section

일반적인 "About Me" 대신 개발 방식을 보여주는 영역을 우선 고려한다.

예:

```text
01 Problem
02 Discovery
03 Learning
04 Building
05 Result
```

핵심 메시지는 다음과 같다.

> 문제를 발견하고 → 조사하고 → 필요한 기술을 배우고 → 직접 만들고 → 결과를 확인한다.

단순 자기소개보다 실제 개발 과정과 사고방식을 보여주는 것을 우선한다.

---

# 18. Skills

Skills는 기술 목록을 나열하는 것이 아니라 실제 사용 맥락을 보여준다.

권장 분류:

```text
Frontend
Backend
AI / Automation
Database
Tools
```

예:

```text
Frontend
Next.js
React
TypeScript
Tailwind CSS

Backend
Python
FastAPI
Flask

AI / Automation
AI Agent
RAG
LLM API
Automation

Database
SQLite
PostgreSQL
Supabase

Tools
Git
GitHub
VS Code
```

단, 실제 사용 경험이 없는 기술은 추가하지 않는다.

---

# 19. Skill Representation

기술 숙련도를 임의의 숫자나 별점으로 표현하지 않는다.

사용 금지:

```text
Python ★★★★★
React 90%
AI 95%
```

대신 실제 프로젝트와 사용 목적을 연결한다.

예:

```text
Python
→ AI Agent / Automation / Backend 프로젝트에 사용
```

---

# 20. Contact

Contact 영역은 단순하고 명확하게 구성한다.

권장:

```text
Short Message
Email
GitHub
LinkedIn 또는 기타 실제 링크
```

실제 존재하지 않는 연락처나 링크를 생성하지 않는다.

---

# 21. Footer

Footer는 최소한으로 구성한다.

예:

```text
© 2026 윤정현
Built with Next.js
```

필요 이상의 정보를 넣지 않는다.

---

# 22. Responsive Design

반드시 다음 환경을 고려한다.

```text
Desktop
Tablet
Mobile
```

단순히 화면을 축소하는 방식으로 반응형을 구현하지 않는다.

특히 Mobile에서는:

- Navigation 구조 변경
- Hero Typography 조정
- Grid → 1 Column
- Button 크기 조정
- Padding 축소
- 긴 텍스트 줄바꿈 확인
- Project Card 정보 우선순위 조정

을 적용한다.

---

# 23. Accessibility

기본적인 접근성을 반드시 고려한다.

- 적절한 Heading hierarchy
- 충분한 색상 대비
- Keyboard Focus
- 명확한 Button / Link
- 이미지 Alt Text
- 44px 이상의 터치 영역 권장
- 색상만으로 상태를 구분하지 않기
- 애니메이션이 없어도 정보 전달 가능하도록 구성

---

# 24. Animation

Animation은 기능을 돕는 경우에만 사용한다.

권장:

```text
150ms ~ 300ms
ease-out
```

사용 가능한 영역:

- Button Hover
- Link Hover
- Card Hover
- Navigation
- 짧은 Section Reveal

사용하지 않는 것:

- Parallax
- 과도한 Scroll Animation
- 지속적인 움직임
- 의미 없는 장식 애니메이션
- 페이지 진입 시 과도한 연출

---

# 25. Dark Mode

현재 1차 버전에서는 Light Mode를 우선한다.

Dark Mode는 별도 요구사항이 있을 때 추가한다.

Dark Mode 때문에 현재 디자인 시스템이나 컴포넌트 구조가 복잡해지지 않도록 한다.

---

# 26. Technical Design Rules

Tailwind CSS를 기본 스타일 시스템으로 사용한다.

CSS Variables는 전역 디자인 토큰을 관리하는 용도로 사용한다.

권장:

```text
Tailwind
+
CSS Variables
```

불필요한 인라인 스타일은 사용하지 않는다.

---

# 27. Component Rules

React Server Component를 기본값으로 사용한다.

다음과 같은 경우에만 Client Component를 사용한다.

- 사용자 입력
- 상태 관리
- 브라우저 API
- 이벤트 기반 인터랙션
- 애니메이션 라이브러리 등 Client 실행이 필요한 경우

불필요하게 전체 페이지를 Client Component로 만들지 않는다.

---

# 28. Content / UI Separation

콘텐츠와 UI를 분리한다.

권장 구조:

```text
content/
├─ profile.ts
├─ projects.ts
├─ skills.ts
└─ types.ts
```

UI 컴포넌트 안에 프로젝트 정보를 직접 작성하지 않는다.

프로젝트 추가 또는 수정 시 가능하면:

```text
content/projects.ts
```

만 수정해도 화면에 반영될 수 있도록 설계한다.

---

# 29. Project Data Principle

Project 데이터는 구조화된 형태로 관리한다.

예:

```ts
{
  slug,
  title,
  summary,
  problem,
  solution,
  tech,
  status,
  featured,
  period,
  image,
  links,
  highlights
}
```

필요한 값만 사용한다.

실제 존재하지 않는 정보는 임의로 채우지 않는다.

---

# 30. Image Rules

프로젝트 이미지가 실제로 존재하지 않는 경우 임의의 이미지를 생성하거나 가져오지 않는다.

Placeholder가 필요한 경우 명확하게 Placeholder임을 표시한다.

실제 프로젝트 스크린샷이 확보되면 프로젝트 이미지로 교체할 수 있도록 구조를 만든다.

---

# 31. Data Integrity

포트폴리오의 가장 중요한 원칙 중 하나다.

절대 다음을 임의로 생성하지 않는다.

- 존재하지 않는 프로젝트
- 존재하지 않는 기술 경험
- 존재하지 않는 성과
- 존재하지 않는 수치
- 존재하지 않는 고객
- 존재하지 않는 회사 경험
- 존재하지 않는 링크
- 존재하지 않는 인증/자격
- 존재하지 않는 프로젝트 결과

정보가 부족하면:

```text
비워두기
```

또는

```text
사용자에게 확인하기
```

를 우선한다.

---

# 32. Existing Project Preservation

기존 프로젝트의 의미를 임의로 변경하지 않는다.

사용자가 제공한 프로젝트 설명이나 요구사항을 기반으로 작업한다.

기존 기능을 삭제하거나 축소할 필요가 있는 경우 먼저 이유를 설명하고 확인을 요청한다.

---

# 33. Portfolio Information Architecture

기본 Home 구조는 다음을 우선 고려한다.

```text
Header
↓
Hero
↓
Featured Projects
↓
More Projects
↓
Approach
↓
Skills
↓
Contact
↓
Footer
```

단, 실제 콘텐츠와 사용성에 따라 조정할 수 있다.

---

# 34. Design Decision Priority

디자인 충돌이 발생하면 다음 우선순위를 따른다.

```text
1. Content readability
2. Information hierarchy
3. Accessibility
4. Responsive usability
5. Consistency
6. Visual aesthetics
7. Decorative effects
```

예쁜 디자인보다 읽기 쉽고 이해하기 쉬운 디자인을 우선한다.

---

# 35. Implementation Workflow

새로운 페이지나 UI를 만들 때 다음 순서를 따른다.

## STEP 1. Analyze

현재 프로젝트 구조와 기존 UI를 먼저 확인한다.

## STEP 2. Plan

필요한 정보 구조와 화면 구성을 제안한다.

## STEP 3. Design

이 SKILL.md의 디자인 원칙을 기반으로 시각적 방향을 제안한다.

## STEP 4. Component

필요한 컴포넌트 구조를 제안한다.

## STEP 5. Confirm

큰 구조 변경이나 새로운 기능은 구현 전에 사용자 확인을 받는다.

## STEP 6. Implement

확정된 범위만 구현한다.

## STEP 7. Verify

다음을 확인한다.

```text
TypeScript
Build
Responsive
Accessibility
Visual consistency
Existing functionality
```

---

# 36. Change Management

작은 수정은 기존 구조를 최대한 유지한다.

큰 변경을 하기 전에:

1. 현재 구조 확인
2. 변경 이유 설명
3. 영향 범위 확인
4. 대안 제시
5. 사용자 승인
6. 구현

순서를 따른다.

---

# 37. Dependencies

새로운 라이브러리는 필요성이 명확할 때만 추가한다.

기존 Next.js / React / TypeScript / Tailwind 기능으로 해결할 수 있다면 새로운 라이브러리를 추가하지 않는다.

라이브러리 추가가 필요한 경우:

```text
왜 필요한지
무엇을 해결하는지
대체 방법이 있는지
```

를 먼저 검토한다.

---

# 38. Supabase / Backend Principle

현재 포트폴리오 1차 버전은 정적 콘텐츠 기반으로 시작한다.

```text
content/*.ts
```

를 우선 사용한다.

Supabase 등의 Backend는 다음 요구사항이 실제로 생겼을 때 추가한다.

- 관리자 페이지
- 프로젝트 CRUD
- 블로그
- 개발 기록
- 문의 저장
- 인증
- 동적 데이터 관리

Backend가 필요하지 않은 단계에서 데이터베이스를 먼저 도입하지 않는다.

---

# 39. Git Workflow

의미 있는 작업 단위가 완료되면 Commit한다.

기본 흐름:

```bash
git add .
git commit -m "작업 내용"
git push
```

Commit Message는 Conventional Commit 형식을 권장한다.

예:

```text
feat: add portfolio homepage
feat: add project section
style: improve project cards
fix: resolve mobile layout
refactor: simplify project components
docs: update portfolio documentation
chore: update dependencies
```

작업 단위를 지나치게 크게 묶지 않는다.

---

# 40. Final Quality Standard

완성된 화면은 다음 질문에 "Yes"라고 답할 수 있어야 한다.

- 첫 화면에서 개발자의 정체성이 보이는가?
- 프로젝트가 핵심 콘텐츠로 보이는가?
- 각 프로젝트가 무엇을 해결했는지 이해되는가?
- 기술 목록보다 실제 결과와 과정이 강조되는가?
- 모바일에서도 읽기 쉬운가?
- 콘텐츠와 UI가 분리되어 있는가?
- 새로운 프로젝트를 쉽게 추가할 수 있는가?
- 실제 존재하지 않는 정보가 포함되지 않았는가?
- 과도한 디자인 효과 없이 전문적인 인상을 주는가?
- 기존 기능을 불필요하게 삭제하지 않았는가?

---

# 41. Non-Negotiable Rules

다음 원칙은 항상 유지한다.

1. **콘텐츠보다 장식이 앞서지 않는다.**
2. **프로젝트가 포트폴리오의 핵심이다.**
3. **실제 경험이 아닌 내용을 만들어내지 않는다.**
4. **사용자가 제공하지 않은 성과나 수치를 임의로 추가하지 않는다.**
5. **콘텐츠와 UI를 분리한다.**
6. **Responsive Design을 기본으로 한다.**
7. **Accessibility를 고려한다.**
8. **불필요한 라이브러리를 추가하지 않는다.**
9. **기존 기능을 임의로 삭제하지 않는다.**
10. **큰 구조 변경은 구현 전에 사용자와 확인한다.**
11. **디자인은 Professional / Modern / Minimal / Technical 방향을 유지한다.**
12. **Light Mode를 1차 기본값으로 유지한다.**
13. **프로젝트를 추가할 때 UI 코드를 수정하지 않아도 되도록 설계한다.**
14. **모든 디자인 결정은 가독성과 정보 전달을 우선한다.**