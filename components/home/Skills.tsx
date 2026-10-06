import { sections } from "@/content/site";
import { skills } from "@/content/skills";
import { getProjectsUsing } from "@/lib/projects";
import { Section } from "@/components/ui/Section";

export function Skills() {
  const categories = skills.filter((category) => category.items.length > 0);
  if (categories.length === 0) return null;

  return (
    <Section {...sections.skills} title="프로젝트에서 사용한 기술">
      <dl className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <div key={category.name}>
            <dt className="font-mono text-xs uppercase tracking-[0.14em] text-subtle">
              {category.name}
            </dt>
            <dd className="mt-4">
              <ul className="space-y-3">
                {category.items.map((item) => {
                  const usedIn = getProjectsUsing(item);
                  return (
                    <li key={item}>
                      <span className="text-lg">{item}</span>
                      {usedIn.length > 0 && (
                        <p className="text-sm text-subtle">
                          → {usedIn.map((project) => project.title).join(", ")}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
