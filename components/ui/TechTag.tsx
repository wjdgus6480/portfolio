export function TechTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded border border-border px-2 py-0.5 font-mono text-xs text-muted">
      {children}
    </span>
  );
}

export function TechList({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li key={item}>
          <TechTag>{item}</TechTag>
        </li>
      ))}
    </ul>
  );
}
