import { Fragment } from "react";
import { profile } from "@/content/profile";
import { sections } from "@/content/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

/**
 * 01 Hero. 위계: 이름 · 직무 → 일하는 순서 → 한 줄 설명 → 주력 기술 → 버튼.
 * 숫자(테이블 수 · 테스트 수)는 여기에 두지 않는다 — 프로젝트 카드 하단 증거 영역에서 문제와 함께 보여 준다.
 */
export function Hero() {
  const { hero, name, role } = profile;

  return (
    <section id="top" className="pb-16 pt-14 md:pb-24 md:pt-20 lg:pb-28 lg:pt-24">
      <Container>
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-subtle">
          <span className="text-accent">01</span> — {hero.eyebrow}
        </p>

        <h1 className="mt-6 font-extrabold leading-[0.98] tracking-[-0.04em]">
          <span className="block text-[clamp(3.25rem,10vw,7.5rem)]">{name}</span>
          <span className="mt-2 block text-[clamp(2.25rem,7vw,5.25rem)] text-accent">{role}</span>
        </h1>

        {hero.flow?.length ? (
          <ol
            aria-label="일하는 순서"
            className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-xl font-semibold tracking-tight md:text-2xl"
          >
            {hero.flow.map((step, i) => (
              <Fragment key={step}>
                {i > 0 && (
                  <li aria-hidden className="text-placeholder">
                    →
                  </li>
                )}
                <li>{step}</li>
              </Fragment>
            ))}
          </ol>
        ) : null}

        <p className="mt-4 max-w-[34em] text-lg leading-relaxed text-muted md:whitespace-pre-line md:text-xl">
          {hero.description}
        </p>

        {hero.stack?.length ? (
          <ul aria-label="주력 기술" className="mt-8 flex flex-wrap gap-2">
            {hero.stack.map((item) => (
              <li
                key={item}
                className="rounded-md border border-border bg-surface px-3 py-1.5 font-mono text-sm font-medium"
              >
                {item}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink href={`#${sections.work.id}`}>대표 프로젝트</ButtonLink>
          <ButtonLink href={`#${sections.cases.id}`} variant="secondary">
            Engineering Case Study
          </ButtonLink>
          <ButtonLink href={`#${sections.contact.id}`} variant="secondary">
            Contact
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
