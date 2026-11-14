import type { EngineeringCase } from "./types";

/**
 * Home의 엔지니어링 사례. 배열 순서 = 화면 순서.
 * 모든 내용은 각 저장소 코드·주석·테스트에서 확인한 것이다
 * (집플랜 origin/main 12d517f, 다누비 AI 0742210). 대안은 코드·문서에 이유가 남아 있을 때만 적었다.
 */
export const cases: EngineeringCase[] = [
  {
    project: "jipplan",
    title: "실거래 ↔ 건물 필지(PNU) 연결",
    problem: "아파트 실거래 중 지도에 찍히는 비율이 54%뿐이었다.",
    cause:
      "국토부 실거래에는 필지번호(PNU)가 없고 시군구 코드 + 법정동 이름 + 지번만 온다. 구 경계 단지는 이웃 구 코드로 오기도 한다.",
    decision: {
      chosen: "법정동코드 원본으로 PNU(19자리)를 직접 조립하고, 남는 거래는 단지명 매칭으로 보완",
    },
    implementation: [
      "법정동 이름 → 코드 색인, 시·도 안에서 이름이 유일하면 이웃 구 코드도 보정",
      "PNU = 법정동코드 10 + 대장구분 1 + 본번 4 + 부번 4",
      "연결 후 지도 마커용 필지 요약 테이블을 다시 생성, 조회용 커버링 인덱스 추가 (V39)",
    ],
    verification: ["rent-trade-pnu.test.mts — 동 이름 → 코드, 본번 · 부번 · 산 지번, 잘못된 지번은 null"],
    result: "아파트 거래 지도 노출 54% → 99.97%",
    evidence: [
      "scripts/load/rent-trade-pnu.mts",
      "scripts/load/link-rent-trades.mts",
      "db/migrations/V39__rent_trades_pnu_covering_index.sql",
    ],
  },
  {
    project: "jipplan",
    title: "정책 판정: 3색 + 기준일(asOf) 규칙 버전",
    problem: "정책마다 소득 · 자산 · 나이 · 혼인 · 주택 조건이 다르고, 공고가 개정되면 기준도 바뀐다.",
    cause: "확인할 수 없는 값까지 '충족'으로 판정하면 사용자가 틀린 결과를 믿고 계약할 수 있다.",
    decision: {
      chosen: "충족 · 추가 확인 · 미충족 3색, 판정 함수는 기준일(asOf)을 받아 시행 기간별 규칙 버전을 고른다",
      alternative: "충족 / 미충족 2색",
      whyNot: "모르는 값이 '충족'으로 흘러가면 가장 위험한 오답이 된다",
    },
    implementation: [
      "판정은 src/server/judgment 의 순수 함수 — DB를 읽는 코드와 분리",
      "규칙 버전 · 접수 기간 · 연산자를 테이블로 관리 (policy_versions, policy_rules …)",
      "규칙 기준 수치는 응답에 넣지 않음 — 정책 이름 · 색 · 계산된 금액만 전송",
    ],
    verification: ["judge.test.ts · period.test.ts · policy-check.test.ts — 연산자 · 트랙 · 접수 기간 · 버전 선택"],
    result: "같은 입력이면 언제 실행해도 같은 결과, 개정 전 판정도 재현 가능",
    evidence: [
      "src/server/judgment/judge.ts",
      "src/server/judgment/period.ts",
      "src/app/api/map/parcels/[pnu]/policies/route.ts",
    ],
  },
  {
    project: "jipplan",
    title: "로그인 보안과 감사 로그",
    problem: "이메일 로그인은 무차별 대입과 '가입 여부 확인'에 노출된다.",
    cause: "실패 횟수 제한이 없거나, 없는 이메일만 다르게 응답하면 계정 존재가 드러난다.",
    decision: {
      chosen: "이메일 15분 5회 · IP 15분 20회 제한, 없는 이메일도 똑같이 세고 막음",
    },
    implementation: [
      "이메일 · IP 원문 대신 HMAC 키로 실패 기록 저장",
      "비밀번호 scrypt 해시, 인증번호 HMAC 저장, Turnstile, OAuth state 검증",
      "역할 권한은 한 곳(permissions)에서 계산 — 관리자 권한표도 그 함수로 생성",
      "관리자 작업은 감사 로그 저장소(인터페이스 + MySQL 구현)에 기록",
    ],
    verification: ["login-throttle · password · oauth-state · permissions 테스트 — 시각(now)을 주입해 검사"],
    result: "인증 · 권한 모듈 30개 파일 중 13개가 테스트 파일",
    evidence: [
      "src/server/auth/login-throttle.ts",
      "src/server/auth/permission-matrix.ts",
      "src/server/audit/index.ts",
    ],
  },
  {
    project: "jipplan",
    title: "실제 MySQL로 도는 통합 테스트 + CI 관문",
    problem: "직접 작성한 SQL은 목(mock)으로는 틀려도 통과한다.",
    cause: "저장소 코드의 버그는 실제 스키마 · 인덱스 · 제약조건 위에서만 드러난다.",
    decision: {
      chosen: "CI에서 빈 MySQL 8.4를 띄우고 마이그레이션부터 다시 만든 뒤 저장소 테스트 실행",
    },
    implementation: [
      "GitHub Actions: lint → 단위 테스트 → DB 통합 테스트 → next build",
      "main(배포)으로 합치는 PR은 이 관문을 통과해야 병합",
      "적재 스크립트는 검사 → 한 트랜잭션 적재 → --dry-run 미리보기",
    ],
    verification: ["회원 · 지도 · 판정 · 커뮤니티 등 저장소 13개 이상을 DB 통합 테스트로 실행"],
    result: "단위 테스트 987개 통과 (로컬 실행), DB 통합 테스트는 CI에서 실행",
    evidence: [".github/workflows/ci.yml", "src/server/members/mysql-repository.test.ts", "db/migrations/"],
  },
  {
    project: "danubi-ai",
    title: "공공데이터 신뢰성과 명시적 상태",
    problem: "공공데이터 '운행정보 및 도착시간'을 그대로 쓰면 틀린 코스를 '가능'으로 추천할 수 있다.",
    cause: "검증해 보니 실측값이 아니었고, 정류장별 도착시각은 공식 자료에 없었다.",
    decision: {
      chosen: "검증에 실패한 데이터셋은 런타임에서 제외, 판정을 통과 · 조건부 · 불가 · 자료 부족 4단계로 분리",
      alternative: "LLM이 문장으로 판단",
      whyNot: "시간표 · 휴무 같은 사실을 틀리면 현장에서 바로 피해가 난다 — 규칙 엔진 + 템플릿 문장만 사용",
    },
    implementation: [
      "원본 CSV는 수정 없이 보관, sha256으로 무결성 확인 후 스크립트가 런타임 데이터 생성",
      "게이트(통과/불통과)로 먼저 거르고 남은 후보에만 점수",
      "12단계 판단 로그를 화면의 '왜 이 결과인가'에 그대로 표시",
    ],
    verification: ["480개 입력 조합 × 3개 시나리오 불변식 테스트 — 휴관 명소가 추천에 섞이지 않는다"],
    result: "테스트 105개 전부 통과 (로컬 실행), 공모전 2차 발표에서 날짜별 판정 차이를 현장 시연",
    evidence: ["packages/core/engine/gates.mjs", "packages/core/engine/decide.mjs", "packages/core/test/engine.test.mjs"],
  },
];
