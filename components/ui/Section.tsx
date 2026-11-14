import { Container } from "./Container";

type SectionProps = {
  id: string;
  index: string;
  label: string;
  title?: string;
  /** 제목 아래 한두 줄 설명 (본문 폭 720px 이내) */
  description?: string;
  /** 보조 섹션은 제목을 한 단계 작게 */
  size?: "default" | "small";
  children: React.ReactNode;
};

/**
 * 섹션 머리: 왼쪽 번호 · 라벨, 오른쪽 제목 · 설명 (데스크톱). 모바일은 위아래로.
 * 섹션 간격: 모바일 56px · 태블릿 80px · 데스크톱 96px
 */
export function Section({ id, index, label, title, description, size = "default", children }: SectionProps) {
  return (
    <section id={id} className="border-t border-border py-14 md:py-20 lg:py-24">
      <Container>
        <header className="grid gap-3 lg:grid-cols-[220px_1fr] lg:gap-10">
          <p className="flex items-baseline gap-2 font-mono text-xs uppercase tracking-[0.14em] text-subtle lg:pt-2">
            <span className="text-accent">{index}</span>
            <span>{label}</span>
          </p>
          <div className="min-w-0">
            {title && (
              <h2
                className={`text-balance font-bold leading-[1.2] tracking-[-0.02em] ${
                  size === "small" ? "text-2xl md:text-[1.75rem]" : "text-[1.75rem] md:text-[2.375rem]"
                }`}
              >
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-3 max-w-[720px] text-base leading-relaxed text-muted md:text-[17px]">{description}</p>
            )}
          </div>
        </header>
        <div className="mt-8 md:mt-12">{children}</div>
      </Container>
    </section>
  );
}
