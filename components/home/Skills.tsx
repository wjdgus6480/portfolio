import { sections } from "@/content/site";
import { skills } from "@/content/skills";
import { getProjectsUsing } from "@/lib/projects";
import { Reveal } from "@/components/ui/Reveal";
import { cardTone, Section } from "@/components/ui/Section";

export function Skills() {
  const categories = skills.filter((category) => category.items.length > 0);
  if (categories.length === 0) return null;
  const card = cardTone[sections.skills.tone];

  return (
    <Section {...sections.skills} title="프로젝트에서 쓴 기술이에요">
      <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, index) => (
          <Reveal key={category.name} index={index} className={`rounded-card p-6 ${card}`}>
            <dt className="text-[13px] font-bold text-accent">{category.name}</dt>
            <dd className="mt-4">
              <ul className="space-y-3.5">
                {category.items.map((item) => {
                  const usedIn = getProjectsUsing(item);
                  return (
                    <li key={item}>
                      <span className="font-bold">{item}</span>
                      {usedIn.length > 0 && (
                        <p className="text-sm leading-snug text-subtle">
                          {usedIn.map((project) => project.title).join(", ")}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </dd>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
