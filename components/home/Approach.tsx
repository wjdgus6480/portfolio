import { profile } from "@/content/profile";
import { sections } from "@/content/site";
import { Section } from "@/components/ui/Section";

/** 07 Development Process. 다섯 단계마다 집플랜 · 다누비 AI의 실제 사례를 붙인다. */
export function Approach() {
  const { journey } = profile.approach;

  return (
    <Section
      {...sections.process}
      title="실제로는 이렇게 진행했습니다"
      description="Problem → Cause → Solution → Verification → Result. 단계마다 프로젝트에서 있었던 일입니다."
    >
      <ol className="border-t border-border">
        {journey.map((step, i) => (
          <li
            key={step.label}
            className="grid gap-1 border-b border-border py-5 md:grid-cols-[48px_200px_1fr] md:items-baseline md:gap-6"
          >
            <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
            <p>
              <span className="text-lg font-bold tracking-tight">{step.label}</span>
              {step.description && <span className="block text-sm text-muted">{step.description}</span>}
            </p>
            {step.example && <p className="text-[15px] leading-relaxed md:text-base">{step.example}</p>}
          </li>
        ))}
      </ol>
    </Section>
  );
}
