/**
 * 프로젝트에서 AI가 맡은 역할 한 줄. 카드 면과 반대 톤의 작은 박스에 넣는다.
 * surface: 박스를 놓는 면의 색 (흰 카드 위면 "surface", 회색 면 위면 "weak")
 */
export function AiRole({
  role,
  size = "md",
  surface = "surface",
}: {
  role?: string;
  size?: "sm" | "md";
  surface?: "surface" | "weak";
}) {
  if (!role) return null;
  return (
    <div className={`rounded-2xl px-4 py-3 ${surface === "surface" ? "bg-surface-weak" : "bg-surface"}`}>
      <p className="text-[13px] font-bold text-accent">AI가 맡은 일</p>
      <p className={`mt-0.5 font-medium leading-snug ${size === "sm" ? "text-[15px]" : "text-base md:text-lg"}`}>
        {role}
      </p>
    </div>
  );
}
