import { profile } from "@/content/profile";
import { sections } from "@/content/site";
import { getProjectBySlug } from "@/lib/projects";
import { Section } from "@/components/ui/Section";
import { StateTag } from "@/components/ui/StateTag";

/**
 * 09 Growth & Analytics. Backend보다 작게(size small) 배치한다.
 * 운영 데이터가 없는 것은 "가설" · "운영 지표 없음"으로 구분하고, 성과 수치는 쓰지 않는다.
 */
export function Growth() {
  const growth = profile.growth;
  if (!growth) return null;

  return (
    <Section {...sections.growth} title={growth.title} description={growth.description} size="small">
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-subtle">적용 사례</h3>
          <ul className="mt-3 divide-y divide-border border-y border-border">
            {growth.applied.map((item) => (
              <li key={item.detail} className="flex items-start gap-3 py-3.5">
                <StateTag state={item.state === "가설" ? "planned" : "used"} label={item.state} />
                <p className="text-[15px] leading-relaxed">
                  <span className="font-semibold">{getProjectBySlug(item.project)?.title}</span> — {item.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-subtle">자격 · 학습</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {growth.credentials.map((c) => (
              <li
                key={c.name}
                className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm"
              >
                <span className="font-semibold">{c.officialName ?? c.name}</span>
                <StateTag state="credential" label={c.state} />
                {c.issuedOn && <span className="text-xs text-subtle">{c.issuedOn}</span>}
              </li>
            ))}
          </ul>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {growth.concepts.map((concept) => (
              <li key={concept} className="rounded-md bg-surface-weak px-2.5 py-1 text-[13px] text-muted">
                {concept}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
