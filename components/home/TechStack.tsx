import { sections } from "@/content/site";
import { skills } from "@/content/skills";
import type { SkillGroup, SkillItem } from "@/content/types";
import { getProjectBySlug } from "@/lib/projects";
import { Section } from "@/components/ui/Section";
import { StateTag } from "@/components/ui/StateTag";

const weightLabels: Record<SkillGroup["weight"], string> = {
  primary: "Primary",
  secondary: "Secondary",
  supporting: "Supporting",
};

const projectNames = (item: SkillItem) =>
  item.usedIn
    ?.map((slug) => getProjectBySlug(slug)?.title)
    .filter(Boolean)
    .join(" · ");

/**
 * 02 Tech Stack. 실제 프로젝트에서 쓴 기술에는 상태 대신 프로젝트 이름을 작게 붙인다.
 * 공부만 한 기술에만 "학습"을 붙인다. 숙련도 점수는 쓰지 않는다.
 */
export function TechStack() {
  const main = skills.filter((group) => group.weight !== "supporting");
  const supporting = skills.filter((group) => group.weight === "supporting");

  return (
    <Section
      {...sections.stack}
      title="TypeScript · Node.js · Next.js · MySQL로 서버를 만듭니다"
      description="실제 프로젝트에서 쓴 기술만 적었습니다. 오른쪽 작은 글씨는 그 기술을 쓴 프로젝트입니다."
    >
      <div className="grid gap-x-10 gap-y-12 lg:grid-cols-3">
        {main.map((group) => (
          <StackGroup key={group.name} group={group} />
        ))}
      </div>

      {supporting.map((group) => (
        <SupportingGroup key={group.name} group={group} />
      ))}
    </Section>
  );
}

function StackGroup({ group }: { group: SkillGroup }) {
  const primary = group.weight === "primary";

  return (
    <section aria-label={group.name}>
      <div className={`border-t-2 pt-4 ${primary ? "border-foreground" : "border-border-strong"}`}>
        <p className={`font-mono text-xs uppercase tracking-[0.14em] ${primary ? "text-accent" : "text-subtle"}`}>
          {weightLabels[group.weight]}
        </p>
        <h3 className="mt-1 text-xl font-bold tracking-tight md:text-2xl">{group.name}</h3>
        <p className="mt-1 text-sm text-muted">{group.role}</p>
      </div>

      <ul className="mt-4 divide-y divide-border border-b border-border">
        {group.items.map((item) => {
          const usedIn = projectNames(item);
          return (
            <li key={item.name} className="py-2.5">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-semibold">{item.name}</span>
                {usedIn && <span className="shrink-0 text-right text-xs text-subtle">{usedIn}</span>}
              </div>
              {item.note && <p className="mt-0.5 text-[13px] leading-snug text-muted">{item.note}</p>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** 보조 역량: 한 줄 칩. Backend보다 크게 보이지 않게 한다. */
function SupportingGroup({ group }: { group: SkillGroup }) {
  return (
    <section
      aria-label={group.name}
      className="mt-12 grid gap-4 rounded-xl bg-surface-weak p-5 md:grid-cols-[220px_1fr] md:gap-8 md:p-6"
    >
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-subtle">{weightLabels[group.weight]}</p>
        <h3 className="mt-1 text-lg font-bold tracking-tight">{group.name}</h3>
        {group.note && <p className="mt-1 text-[13px] text-muted">{group.note}</p>}
      </div>
      <ul className="flex flex-wrap content-start gap-2">
        {group.items.map((item) => {
          const usedIn = projectNames(item);
          const extra = [item.note, usedIn].filter(Boolean).join(" · ");
          return (
            <li
              key={item.name}
              className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm"
            >
              <span className="font-medium">{item.name}</span>
              {extra && <span className="text-xs text-subtle">{extra}</span>}
              {item.status === "learning" && !item.note && <StateTag state="learning" />}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
