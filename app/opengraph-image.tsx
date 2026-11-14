import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

// 기본 내장 글꼴은 한글을 그리지 못해 이미지 안 글자는 영문만 쓴다.
export const alt = "Yoon Jeonghyeon — Backend Developer portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const stack = profile.hero.stack ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#fafafa",
          color: "#18181b",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#71717a", letterSpacing: 4 }}>YOON JEONGHYEON · PORTFOLIO</div>
        <div style={{ marginTop: 24, fontSize: 112, fontWeight: 800, lineHeight: 1, letterSpacing: -4 }}>BACKEND</div>
        <div style={{ fontSize: 112, fontWeight: 800, lineHeight: 1, letterSpacing: -4 }}>DEVELOPER</div>
        <div style={{ marginTop: 48, display: "flex", flexWrap: "wrap", gap: 12 }}>
          {stack.map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                padding: "8px 18px",
                border: "2px solid #e4e4e7",
                borderRadius: 10,
                background: "#ffffff",
                fontSize: 30,
              }}
            >
              {item}
            </div>
          ))}
        </div>
        <div style={{ marginTop: "auto", height: 8, width: 160, background: "#2563eb", borderRadius: 4 }} />
      </div>
    ),
    size,
  );
}
