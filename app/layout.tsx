import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { profile } from "@/content/profile";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description = `${profile.name} · 백엔드 개발자 포트폴리오. ${profile.hero.description.replace(/\n/g, " ")}`;

// metadataBase 를 따로 두지 않는다: Vercel 배포에서는 Next.js가 VERCEL_PROJECT_PRODUCTION_URL 로 OG 주소를 만든다.
export const metadata: Metadata = {
  title: {
    default: `${profile.name} — Backend Developer`,
    template: `%s — ${profile.name}`,
  },
  description,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: `${profile.name} Portfolio`,
    title: `${profile.name} — Backend Developer`,
    description,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
