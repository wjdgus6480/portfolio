import { Container } from "./Container";

type SectionProps = {
  id: string;
  index: string;
  label: string;
  title?: string;
  children: React.ReactNode;
};

export function Section({ id, index, label, title, children }: SectionProps) {
  return (
    <section id={id} className="border-t border-border py-20 md:py-32">
      <Container>
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-subtle">
          {index} — {label}
        </p>
        {title && (
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h2>
        )}
        <div className="mt-10 md:mt-14">{children}</div>
      </Container>
    </section>
  );
}
