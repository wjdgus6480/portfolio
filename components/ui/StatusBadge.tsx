import type { ProjectStatus } from "@/content/types";

const labels: Record<ProjectStatus, string> = {
  live: "Live",
  "in-progress": "In progress",
  archived: "Archived",
};

const dotColors: Record<ProjectStatus, string> = {
  live: "bg-success",
  "in-progress": "bg-accent",
  archived: "bg-placeholder",
};

/** 색상만으로 의미를 전달하지 않도록 항상 텍스트 라벨을 함께 표시한다. */
export function StatusBadge({ status }: { status?: ProjectStatus }) {
  if (!status) return null;
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
      <span className={`size-1.5 rounded-full ${dotColors[status]}`} aria-hidden />
      {labels[status]}
    </span>
  );
}
