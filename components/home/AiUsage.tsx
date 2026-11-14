import { profile } from "@/content/profile";
import { sections } from "@/content/site";
import { Section } from "@/components/ui/Section";

/** 08 AI Usage. AI가 맡는 것과 사람이 정하는 것을 나누고, Genloom 자동 발행 0회로 보여 준다. */
export function AiUsage() {
  const usage = profile.aiUsage;
  if (!usage) return null;

  return (
    <Section {...sections.ai} title={usage.title} description={usage.description}>
      <div className="grid gap-4 md:grid-cols-2">
        <List title="AI가 맡는 것" items={usage.ai} />
        <List title="제가 결정하는 것" items={usage.me} strong />
      </div>

      {usage.proof && (
        <div className="mt-4 grid gap-4 rounded-2xl bg-foreground p-6 text-background md:grid-cols-[200px_1fr] md:items-center md:p-8">
          <p>
            <span className="block text-5xl font-extrabold tracking-tight">{usage.proof.value}</span>
            <span className="mt-1 block text-sm opacity-70">{usage.proof.label}</span>
          </p>
          <p className="text-base leading-relaxed md:text-lg">{usage.proof.detail}</p>
        </div>
      )}
    </Section>
  );
}

function List({ title, items, strong }: { title: string; items: string[]; strong?: boolean }) {
  return (
    <section
      aria-label={title}
      className={`rounded-2xl border p-6 ${strong ? "border-foreground bg-surface" : "border-border bg-surface-weak"}`}
    >
      <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-subtle">{title}</h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className={`rounded-lg px-3 py-1.5 text-[15px] ${
              strong ? "bg-foreground font-semibold text-background" : "border border-border bg-surface"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
