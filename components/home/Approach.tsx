import { profile } from "@/content/profile";
import { sections } from "@/content/site";
import { JourneyFlow } from "@/components/home/JourneyFlow";
import { Reveal } from "@/components/ui/Reveal";
import { cardTone, Section } from "@/components/ui/Section";

export function Approach() {
  const { title, paragraphs, principles, journey } = profile.approach;
  const card = cardTone[sections.approach.tone];

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
            <li key={principle.title}>
              <Reveal index={i} className={`h-full rounded-card p-6 md:p-7 ${card}`}>
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                {i + 1}
              </span>
              <p className="mt-4 text-lg font-bold tracking-tight md:text-xl">{principle.title}</p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{principle.desc}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      ) : null}

      <h3 className="mb-4 mt-14 text-[15px] font-bold text-subtle md:mt-20">개발 흐름</h3>
      <JourneyFlow steps={journey} cardClassName={card} />
    </Section>
  );
}
