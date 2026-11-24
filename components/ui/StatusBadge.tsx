import type { ProjectStatus } from "@/content/types";

const labels: Record<ProjectStatus, string> = {
  live: "운영 중",
  "in-progress": "개발 중",
  operating: "운영 중",
  archived: "보관",
};

const tones: Record<ProjectStatus, string> = {
  live: "bg-success-soft text-success",
  "in-progress": "bg-accent-soft text-accent",
  operating: "bg-success-soft text-success",
  archived: "bg-surface-weak text-subtle",
};

/** 알약 모양 상태 배지. 색만으로 의미를 전달하지 않도록 항상 텍스트 라벨을 함께 표시한다. */
export function StatusBadge({ status }: { status?: ProjectStatus }) {
  if (!status) return null;
  return (
    <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-semibold ${tones[status]}`}>
      {labels[status]}
    </span>
  );
}
