import { Container } from "./Container";

type SectionProps = {
  id: string;
  label: string;
  /** tinted = 회색 띠 배경, plain = 흰 배경. 안의 카드 색은 반대로 맞춘다 */
  tone?: "plain" | "tinted";
  title?: string;
  children: React.ReactNode;
};

export function Section({ id, label, tone = "plain", title, children }: SectionProps) {
  return (
    <section id={id} className={`py-20 md:py-28 ${tone === "tinted" ? "bg-surface-weak" : "bg-background"}`}>
      <Container>
        <p className="text-[15px] font-bold text-accent">{label}</p>
        {title && (
          <h2 className="mt-2 text-[28px] font-bold leading-snug tracking-tight md:text-4xl">
            {title}
          </h2>
        )}
        <div className="mt-10 md:mt-12">{children}</div>
      </Container>
    </section>
  );
}

/** 섹션 톤에 맞춘 카드 면 색: 회색 띠 위에는 흰 카드, 흰 배경 위에는 회색 카드 */
export const cardTone = {
  tinted: "bg-surface",
  plain: "bg-surface-weak",
} as const;
