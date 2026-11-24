import {
  siGit,
  siGoogleanalytics,
  siGoogleappsscript,
  siGooglesheets,
  siGoogleslides,
  siYoutube,
  siClaude,
  siNvidia,
  siJavascript,
  siKakao,
  siMysql,
  siNaver,
  siNetlify,
  siNextdotjs,
  siNodedotjs,
  siPython,
  siReact,
  siSqlite,
  siSupabase,
  siSvg,
  siTailwindcss,
  siTidb,
  siTypescript,
  siVercel,
  siVitest,
  type SimpleIcon,
} from "simple-icons";

/**
 * 기술 이름 → 브랜드 아이콘(simple-icons, CC0). 이름은 profile.ts · skills.ts의 문자열과 정확히 같아야 한다.
 * 목록에 없는 기술은 일반 코드 아이콘으로 표시된다.
 */
const brandIcons: Record<string, SimpleIcon> = {
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  "Node.js": siNodedotjs,
  "Next.js": siNextdotjs,
  React: siReact,
  "Tailwind CSS": siTailwindcss,
  MySQL: siMysql,
  "TiDB Cloud": siTidb,
  SQLite: siSqlite,
  Supabase: siSupabase,
  Python: siPython,
  Vercel: siVercel,
  Netlify: siNetlify,
  Git: siGit,
  "Git / GitHub": siGit,
  Vitest: siVitest,
  SVG: siSvg,
  "Google Analytics 4": siGoogleanalytics,
  "Naver Search API": siNaver,
  "Kakao API": siKakao,
  "Kakao Maps API": siKakao,
  "Google Apps Script": siGoogleappsscript,
  "Google Sheets": siGooglesheets,
  "Google Slides": siGoogleslides,
  "YouTube Data API": siYoutube,
  "Claude API": siClaude,
  "NVIDIA API (LLM)": siNvidia,
  "네이버 검색 · 데이터랩 API": siNaver,
};

/** 밝은 브랜드 색(노랑 · 하늘색 등)은 밝은 칩 위에서 잘 안 보여 어둡게 낮춘다. */
function readableColor(hex: string): string {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  if (luminance <= 0.6) return `#${hex}`;
  const k = 0.6 / luminance;
  return `rgb(${Math.round(r * k)} ${Math.round(g * k)} ${Math.round(b * k)})`;
}

export function TechIcon({ name }: { name: string }) {
  const icon = brandIcons[name];
  if (!icon) {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className="size-4 shrink-0 text-subtle">
        <path
          d="m8 7-5 5 5 5M16 7l5 5-5 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-4 shrink-0" fill={readableColor(icon.hex)}>
      <path d={icon.path} />
    </svg>
  );
}

type TechTagProps = {
  children: string;
  /** true면 이름 앞에 기술 아이콘을 붙인다 */
  withIcon?: boolean;
  /** accent = 직무별 관련 기술처럼 강조할 때 */
  tone?: "neutral" | "accent";
};

export function TechTag({ children, withIcon = false, tone = "neutral" }: TechTagProps) {
  const toneClass = tone === "accent" ? "bg-accent-soft font-semibold text-accent" : "bg-surface-weak font-medium text-muted";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[13px] ${toneClass}`}>
      {withIcon && <TechIcon name={children} />}
      {children}
    </span>
  );
}

type TechListProps = {
  items?: string[];
  withIcon?: boolean;
  tone?: TechTagProps["tone"];
};

export function TechList({ items, withIcon, tone }: TechListProps) {
  if (!items?.length) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item}>
          <TechTag withIcon={withIcon} tone={tone}>
            {item}
          </TechTag>
        </li>
      ))}
    </ul>
  );
}
