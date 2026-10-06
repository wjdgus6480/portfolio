type DetailSectionProps = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

export function DetailSection({ title, paragraphs, items }: DetailSectionProps) {
  return (
    <section className="grid gap-4 border-t border-border py-10 md:grid-cols-[12rem_1fr] md:gap-10 md:py-14">
      <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-subtle md:pt-1.5">
        {title}
      </h2>
      <div className="max-w-[40em] text-lg leading-relaxed">
        {paragraphs && (
          <div className="space-y-5">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        )}
        {items && (
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden className="text-subtle">—</span>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
