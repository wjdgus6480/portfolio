import { profile } from "@/content/profile";
import { sections } from "@/content/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export function Hero() {
  const { hero } = profile;

  return (
    <section id="top" className="pb-20 pt-20 md:pb-32 md:pt-36">
      <Container>
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-subtle">
          {hero.eyebrow}
        </p>
        <h1 className="mt-6 max-w-[14em] text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.1] tracking-[-0.035em] whitespace-pre-line">
          {hero.title}
        </h1>
        <p className="mt-6 max-w-[34em] text-lg leading-relaxed text-muted md:whitespace-pre-line md:text-xl">
          {hero.description}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={`#${sections.work.id}`}>Selected Work</ButtonLink>
          <ButtonLink href={`#${sections.contact.id}`} variant="secondary">
            Contact
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
