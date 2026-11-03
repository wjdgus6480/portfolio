import { profile } from "@/content/profile";
import { sections } from "@/content/site";
import { Section } from "@/components/ui/Section";

export function Contact() {
  const { title, description, links } = profile.contact;

  const items = [
    links.github && { label: "GitHub", value: links.github.replace(/^https?:\/\//, ""), href: links.github },
    links.email && { label: "Email", value: links.email, href: `mailto:${links.email}` },
    links.linkedin && { label: "LinkedIn", value: links.linkedin.replace(/^https?:\/\//, ""), href: links.linkedin },
  ].filter((item): item is { label: string; value: string; href: string } => Boolean(item));

  return (
    <Section {...sections.contact}>
      <h2 className="max-w-[16em] text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.15] tracking-[-0.03em]">
        {title}
      </h2>
      {description && items.length > 0 && (
        <p className="mt-5 max-w-[34em] text-lg leading-relaxed text-muted">{description}</p>
      )}

      {items.length > 0 ? (
        <ul className="mt-12 divide-y divide-border border-y border-border">
          {items.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                {...(item.href.startsWith("http") && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
                className="group flex items-baseline justify-between gap-4 py-5"
              >
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-subtle">
                  {item.label}
                </span>
                <span className="flex items-baseline gap-3 text-lg transition-colors duration-150 group-hover:text-accent">
                  <span className="break-all">{item.value}</span>
                  <span aria-hidden>↗</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-12 text-subtle">연락처는 준비 중입니다.</p>
      )}
    </Section>
  );
}
