export function TechTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-lg bg-surface-weak px-2.5 py-1 text-[13px] font-medium text-muted">
      {children}
    </span>
  );
}

export function TechList({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item}>
          <TechTag>{item}</TechTag>
        </li>
      ))}
    </ul>
  );
}
