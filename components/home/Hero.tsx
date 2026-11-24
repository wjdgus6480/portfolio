import { profile } from "@/content/profile";
import { sections } from "@/content/site";
import { getProjectBySlug } from "@/lib/projects";
import { MetricStrip } from "@/components/project/MarketingBlocks";
import { HeroCanvas } from "@/components/home/HeroCanvas";
import { RoleExplorer, type RoleView } from "@/components/home/RoleExplorer";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { TechList } from "@/components/ui/TechTag";

/** profile의 프로젝트 slug를 실제 프로젝트로 바꾼다. 없는 slug는 화면에 내지 않는다. */
function resolveRoles(): RoleView[] {
  return (profile.hero.roles?.items ?? []).map((role) => ({
    ...role,
    projects: role.projects.flatMap(({ slug, contributions }) => {
      const project = getProjectBySlug(slug);
      return project ? [{ slug, title: project.title, category: project.category, contributions }] : [];
    }),
  }));
}

export function Hero() {
  const { hero } = profile;
  const roles = resolveRoles();

  return (
    <>
      <section id="top" className="relative isolate overflow-hidden">
        <div aria-hidden className="hero-backdrop pointer-events-none absolute inset-0 -z-10" />

        <Container className="relative grid min-h-[calc(100svh-4rem)] content-center gap-4 pb-24 pt-10 md:grid-cols-12 md:pt-12">
          <div className="hero-rise relative z-10 md:col-span-7">
            {/* 3D 장면: 제목 옆에서 움직인다. 텍스트 묶음 기준으로 놓아 어느 화면에서든 제목과 같은 높이에 있다.
                모바일은 제목 오른쪽 위로 작게 걸치고, 태블릿 이상은 텍스트 오른쪽에 세로 가운데로 둔다.
                (hero-rise 애니메이션이 translate를 쓰므로 위치는 translate 없이 top 계산으로 맞춘다) */}
            <div className="pointer-events-none absolute -right-20 -top-6 -z-10 size-[230px] sm:-right-10 sm:size-[300px] md:left-[92%] md:right-auto md:top-[calc(50%-min(290px,25vw))] md:size-[min(580px,50vw)]">
              <HeroCanvas />
            </div>
            <p className="text-[13px] font-bold tracking-[0.08em] text-accent md:text-sm">{hero.eyebrow}</p>
            <h1 className="mt-4 max-w-[14em] text-[clamp(2.25rem,6vw,4.25rem)] font-extrabold leading-[1.12] tracking-[-0.035em] whitespace-pre-line">
              {hero.title}
            </h1>
            <p className="mt-5 max-w-[30em] text-lg leading-relaxed text-muted md:whitespace-pre-line md:text-xl">
              {hero.description}
            </p>
            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
              <ButtonLink href={`#${sections.work.id}`}>
                프로젝트 보기
                <span aria-hidden>↓</span>
              </ButtonLink>
              <ButtonLink href={`#${sections.contact.id}`} variant="secondary">
                연락하기
              </ButtonLink>
            </div>
          </div>

        </Container>

        <a
          href="#explore"
          className="scroll-cue group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[12px] font-semibold tracking-[0.12em] text-subtle md:flex"
        >
          <span className="relative flex h-9 w-5.5 justify-center rounded-full border-[1.5px] border-border-strong transition-colors duration-200 group-hover:border-accent-vivid">
            <span className="scroll-cue-dot mt-1.5 size-1 rounded-full bg-accent-vivid" />
          </span>
          SCROLL
        </a>
      </section>

      <section id="explore" aria-label="직무별 역량" className="pb-16 pt-4 md:pb-24">
        <Container>
          {hero.proof?.length ? (
            <div className="mb-14 md:mb-20">
              <h2 className="sr-only">근거</h2>
              <MetricStrip metrics={hero.proof} columns={3} />
            </div>
          ) : null}

          {hero.roles && roles.length > 0 && (
            <RoleExplorer title={hero.roles.title} description={hero.roles.description} roles={roles} />
          )}

          {hero.commonStack?.length ? (
            <div className="mt-8 md:mt-10">
              <h2 className="text-sm font-bold tracking-[0.08em] text-subtle">TECH STACK</h2>
              <p className="mt-1 text-[13px] text-subtle">직무와 관계없이 공통으로 사용하는 기술이에요.</p>
              <div className="mt-3">
                <TechList items={hero.commonStack} withIcon />
              </div>
            </div>
          ) : null}
        </Container>
      </section>
    </>
  );
}
