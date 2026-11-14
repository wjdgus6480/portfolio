import { profile } from "@/content/profile";
import { sections } from "@/content/site";
import { Section } from "@/components/ui/Section";

/** 03 Development Approach. 짧은 문장 + 다섯 단계. 단계별 실제 사례는 07 Development Process에 있다. */
export function Intro() {
  const { title, paragraphs, journey } = profile.approach;

  return (
    <Section {...sections.approach} title={title}>
      <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-10">
        <div className="hidden lg:block" />
        <div>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="max-w-[36em] text-lg leading-relaxed md:text-xl">
              {paragraph}
            </p>
          ))}

          <ol className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-5">
            {journey.map((step, i) => (
              <li key={step.label} className="bg-surface px-4 py-5">
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 font-bold tracking-tight">{step.label}</p>
                {step.description && <p className="mt-1 text-sm leading-snug text-muted">{step.description}</p>}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
