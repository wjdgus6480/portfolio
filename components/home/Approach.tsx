import { profile } from "@/content/profile";
import { sections } from "@/content/site";
import { Section } from "@/components/ui/Section";

export function Approach() {
  const { title, paragraphs, journey } = profile.approach;

  return (
    <Section {...sections.approach} title={title}>
      {paragraphs.length > 0 && (
        <div className="mb-14 max-w-[40em] space-y-5 text-lg leading-relaxed text-muted md:mb-20">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      )}

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
