import { profile } from "@/content/profile";
import { sections } from "@/content/site";
import { Section } from "@/components/ui/Section";

export function About() {
  const { title, paragraphs, journey } = profile.about;

  return (
    <Section {...sections.about} title={title}>
      {paragraphs.length > 0 && (
        <div className="mb-14 max-w-[40em] space-y-5 text-lg leading-relaxed text-muted md:mb-20">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      )}

      <ol className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
        {journey.map((step, i) => (
          <li key={step.label} className="bg-background p-6">
            <span className="font-mono text-xs text-subtle">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-3 font-semibold tracking-tight">{step.label}</p>
            {step.description && (
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}
