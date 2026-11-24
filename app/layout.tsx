import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
// Pretendard Variable 1.3.9 공식 동적 서브셋(수정 없이 사용, OFL 1.1 — app/fonts/pretendard/LICENSE.txt).
// 글자 묶음별 unicode-range로 나뉘어 있어 화면에 쓰인 글자의 파일만 내려받는다.
import "./fonts/pretendard/pretendardvariable-dynamic-subset.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — Portfolio`,
    template: `%s — ${profile.name}`,
  },
  description: profile.hero.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className="h-full antialiased"
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
