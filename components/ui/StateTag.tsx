import type { SkillStatus } from "@/content/types";

export type TagState = SkillStatus | "candidate" | "in-use" | "credential";

const labels: Record<TagState, string> = {
  used: "사용",
  learning: "학습",
  planned: "예정",
  candidate: "후보",
  "in-use": "사용 중",
  credential: "자격",
};

const styles: Record<TagState, string> = {
  used: "border-accent/30 bg-accent-soft text-accent",
  "in-use": "border-accent/30 bg-accent-soft text-accent",
  learning: "border-border bg-surface-weak text-muted",
  planned: "border-dashed border-border-strong text-muted",
  candidate: "border-dashed border-border-strong text-muted",
  credential: "border-success/50 bg-surface text-foreground",
};

/** 사용 · 학습 · 예정 상태. 색만으로 구분하지 않도록 항상 글자를 함께 쓴다. */
export function StateTag({ state, label }: { state: TagState; label?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded border px-1.5 py-px font-mono text-[11px] leading-5 ${styles[state]}`}
    >
      {label ?? labels[state]}
    </span>
  );
}
