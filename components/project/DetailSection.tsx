type DetailSectionProps = {
  title: string;
  children: React.ReactNode;
};

export function DetailSection({ title, children }: DetailSectionProps) {
  return (
    <section className="grid gap-5 border-t border-border py-10 md:grid-cols-[12rem_1fr] md:gap-10 md:py-14">
      <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-subtle md:pt-1.5">
        {title}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}
