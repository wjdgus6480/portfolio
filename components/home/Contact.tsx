import { profile } from "@/content/profile";
import { sections } from "@/content/site";
import { cardTone, Section } from "@/components/ui/Section";

export function Contact() {
  const { title, description, links } = profile.contact;
  const card = cardTone[sections.contact.tone];

  const items = [
    links.github && { label: "GitHub", value: links.github.replace(/^https?:\/\//, ""), href: links.github },
    links.email && { label: "Email", value: links.email, href: `mailto:${links.email}` },
    links.linkedin && { label: "LinkedIn", value: links.linkedin.replace(/^https?:\/\//, ""), href: links.linkedin },
  ].filter((item): item is { label: string; value: string; href: string } => Boolean(item));

  return (
    <Section {...sections.contact}>
      <h2 className="max-w-[16em] text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[1.2] tracking-[-0.03em]">
        {title}
      </h2>
      {description && items.length > 0 && (
        <p className="mt-4 max-w-[34em] text-lg leading-relaxed text-muted">{description}</p>
      )}

      {items.length > 0 ? (
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                {...(item.href.startsWith("http") && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
                className={`pressable card-interactive flex min-h-11 items-center justify-between gap-4 rounded-card p-6 ${card}`}
              >
                <span>
                  <span className="block text-[13px] font-bold text-accent">{item.label}</span>
                  <span className="mt-0.5 block break-all text-lg font-semibold">{item.value}</span>
                </span>
                <span aria-hidden className="text-xl text-subtle">↗</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 text-subtle">연락처는 준비 중이에요.</p>
      )}
    </Section>
  );
}
