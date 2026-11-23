import { profile } from "@/content/profile";
import { sections } from "@/content/site";
import { getProjectBySlug } from "@/lib/projects";
import { MetricStrip } from "@/components/project/MarketingBlocks";
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
    <section id="top" className="pb-16 pt-14 md:pb-24 md:pt-20">
      <Container>
        <p className="text-[13px] font-bold tracking-[0.08em] text-accent md:text-sm">{hero.eyebrow}</p>
        <h1 className="mt-4 max-w-[14em] text-[clamp(2.25rem,6vw,4rem)] font-extrabold leading-[1.15] tracking-[-0.035em] whitespace-pre-line">
          {hero.title}
        </h1>
        <p className="mt-5 max-w-[34em] text-lg leading-relaxed text-muted md:whitespace-pre-line md:text-xl">
          {hero.description}
        </p>
        <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
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

        {hero.roles && roles.length > 0 && (
          <div className="mt-14 md:mt-20">
            <RoleExplorer title={hero.roles.title} description={hero.roles.description} roles={roles} />
          </div>
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
  );
}
