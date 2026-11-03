/** 프로젝트에서 AI가 맡은 역할 한 줄. 라벨만 Accent Soft를 쓰고 본문은 기본 색을 유지한다. */
export function AiRole({ role, size = "md" }: { role?: string; size?: "sm" | "md" }) {
  if (!role) return null;
  return (
    <p className={`flex items-start gap-2 leading-snug ${size === "sm" ? "text-[15px]" : "text-base md:text-lg"}`}>
      <span className="mt-0.5 shrink-0 rounded bg-accent-soft px-1.5 py-0.5 font-mono text-xs font-medium text-accent">
        AI 역할
      </span>
      <span>{role}</span>
    </p>
  );
}
