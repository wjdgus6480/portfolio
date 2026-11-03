import { profile } from "@/content/profile";
import { sections } from "@/content/site";
import { Section } from "@/components/ui/Section";

export function Approach() {
  const { title, paragraphs, principles, journey } = profile.approach;

  return (
    <Section {...sections.approach} title={title}>
      {paragraphs.length > 0 && (
        <div className="max-w-[40em] space-y-5 text-lg leading-relaxed text-muted">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      )}

      {principles?.length ? (
        <ol className="mt-10 grid gap-3 md:mt-12 md:grid-cols-2">
          {principles.map((principle, i) => (
            <li key={principle.title} className="rounded-xl border border-border bg-surface p-6">
              <span className="font-mono text-xs text-accent">
                원칙 {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 text-lg font-semibold tracking-tight">{principle.title}</p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{principle.desc}</p>
            </li>
          ))}
        </ol>
      ) : null}

      <h3 className="mb-4 mt-14 font-mono text-xs uppercase tracking-[0.14em] text-subtle md:mt-20">
        개발 흐름
      </h3>
      <ol className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
        {journey.map((step, i) => (
          <li key={step.label} className="bg-surface p-6">
            <span className="font-mono text-xs text-subtle">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-3 text-lg font-semibold tracking-tight">{step.label}</p>
            {step.description && (
              <p className="mt-1 text-[15px] leading-relaxed text-muted">{step.description}</p>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}
