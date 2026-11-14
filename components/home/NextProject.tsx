import { nextStack } from "@/content/next-project";
import { sections } from "@/content/site";
import { Section } from "@/components/ui/Section";

/** 11 Next. 현재 쓰는 기술과 다음 확장 기술을 분리한다. 다음 기술은 점선 칩으로만 보여 Skills처럼 보이지 않게 한다. */
export function NextProject() {
  const { current, next, goal } = nextStack;

  return (
    <Section {...sections.next} title="지금 쓰는 기술, 다음에 넓힐 기술" description={goal} size="small">
      <dl className="divide-y divide-border border-y border-border">
        <div className="grid gap-3 py-5 md:grid-cols-[160px_1fr] md:items-baseline">
          <dt className="font-mono text-xs uppercase tracking-[0.14em] text-accent">현재</dt>
          <dd>
            <ul className="flex flex-wrap gap-2">
              {current.map((tech) => (
                <li key={tech} className="rounded-md bg-foreground px-3 py-1.5 font-mono text-sm text-background">
                  {tech}
                </li>
              ))}
            </ul>
          </dd>
        </div>
        <div className="grid gap-3 py-5 md:grid-cols-[160px_1fr] md:items-baseline">
          <dt className="font-mono text-xs uppercase tracking-[0.14em] text-subtle">
            다음 확장
            <span className="mt-1 block normal-case tracking-normal text-subtle">아직 사용하지 않음</span>
          </dt>
          <dd>
            <ul className="flex flex-wrap gap-2">
              {next.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-dashed border-border-strong px-3 py-1.5 font-mono text-sm text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </Section>
  );
}
