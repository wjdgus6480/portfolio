import { Fragment } from "react";
import { profile } from "@/content/profile";
import { sections } from "@/content/site";
import { Section } from "@/components/ui/Section";

/** 10 Background. 물리치료학 → Software. 이력 나열이 아니라 지금의 개발 방식과 연결한다. */
export function About() {
  const { title, paragraphs, path, links } = profile.about;

  return (
    <Section {...sections.about} title={title} size="small">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          {path && path.length > 0 && (
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-lg font-bold tracking-tight">
              {path.map((step, i) => (
                <Fragment key={step}>
                  {i > 0 && (
                    <span aria-hidden className="text-accent">
                      →
                    </span>
                  )}
                  <span>{step}</span>
                </Fragment>
              ))}
            </p>
          )}
          <div className="mt-4 space-y-3 text-base leading-relaxed text-muted md:text-[17px]">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        {links?.length ? (
          <table className="w-full text-[15px]">
            <thead>
              <tr className="border-b border-border-strong text-left font-mono text-xs uppercase tracking-[0.12em] text-subtle">
                <th className="pb-2 font-normal">Physical Therapy</th>
                <th className="pb-2 font-normal">Backend</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link) => (
                <tr key={link.from} className="border-b border-border">
                  <td className="py-3 pr-4 text-muted">{link.from}</td>
                  <td className="py-3 font-semibold">{link.to}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </Section>
  );
}
