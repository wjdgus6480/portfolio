import type { ProjectStatus } from "@/content/types";

const labels: Record<ProjectStatus, string> = {
  live: "Live",
  "in-progress": "In progress",
  archived: "Archived",
};

const dotColors: Record<ProjectStatus, string> = {
  live: "bg-accent",
  "in-progress": "bg-muted",
  archived: "bg-subtle",
};

export function StatusBadge({ status }: { status?: ProjectStatus }) {
  if (!status) return null;
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
      <span className={`size-1.5 rounded-full ${dotColors[status]}`} aria-hidden />
      {labels[status]}
    </span>
  );
}
