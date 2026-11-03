import { profile } from "@/content/profile";
import { sections } from "@/content/site";
import { MetricStrip } from "@/components/project/MarketingBlocks";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export function Hero() {
  const { hero } = profile;

  return (
    <section id="top" className="pb-16 pt-14 md:pb-24 md:pt-24">
      <Container>
        <p className="text-[15px] font-bold text-accent">{hero.eyebrow}</p>
        <h1 className="mt-4 max-w-[14em] text-[clamp(2.5rem,6vw,4.25rem)] font-extrabold leading-[1.15] tracking-[-0.035em] whitespace-pre-line">
          {hero.title}
        </h1>
        <p className="mt-6 max-w-[34em] text-lg leading-relaxed text-muted md:whitespace-pre-line md:text-xl">
          {hero.description}
        </p>
        <div className="mt-10 flex flex-col gap-2.5 sm:flex-row">
          <ButtonLink href={`#${sections.work.id}`}>프로젝트 보기</ButtonLink>
          <ButtonLink href={`#${sections.contact.id}`} variant="secondary">
            연락하기
          </ButtonLink>
        </div>

        {hero.proof?.length ? (
          <div className="mt-12 md:mt-16">
            <h2 className="sr-only">근거</h2>
            <MetricStrip metrics={hero.proof} columns={3} />
          </div>
        ) : null}
      </Container>
    </section>
  );
}
