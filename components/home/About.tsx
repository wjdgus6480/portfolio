import { Fragment } from "react";
import { profile } from "@/content/profile";
import { sections } from "@/content/site";
import { Section } from "@/components/ui/Section";

export function About() {
  const { title, paragraphs, path } = profile.about;

  return (
    <Section {...sections.about} title={title}>
      {path && path.length > 0 && (
        <p className="flex flex-wrap items-center gap-2">
          {path.map((step, i) => (
            <Fragment key={step}>
              {i > 0 && (
                <span aria-hidden className="text-subtle">
                  →
                </span>
              )}
              <span className="rounded-full bg-surface-weak px-4 py-2 text-[15px] font-semibold">{step}</span>
            </Fragment>
          ))}
        </p>
      )}

      {paragraphs.length > 0 && (
        <div className="mt-6 max-w-[40em] space-y-5 text-lg leading-relaxed text-muted">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      )}
    </Section>
  );
}
