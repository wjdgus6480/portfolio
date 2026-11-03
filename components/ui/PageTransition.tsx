import { ViewTransition } from "react";

const directional = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  default: "none",
};

/**
 * 페이지 콘텐츠를 감싸 Link의 transitionTypes에 따라 좌우로 슬라이드시킨다.
 * Layout은 이동 중에도 유지되어 enter/exit가 발생하지 않으므로 각 page.tsx에서 사용한다.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter={directional} exit={directional} default="none">
      {children}
    </ViewTransition>
  );
}
