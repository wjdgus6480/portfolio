import Link from "next/link";

type ButtonLinkProps = {
  href: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
};

const base =
  "pressable inline-flex h-13 items-center justify-center gap-2 rounded-2xl px-6 text-base font-semibold ease-out";

const variants = {
  primary: "bg-accent text-white hover:bg-accent-hover",
  secondary: "bg-surface-weak text-muted hover:bg-border",
};

export function ButtonLink({ href, variant = "primary", children }: ButtonLinkProps) {
  const className = `${base} ${variants[variant]}`;

  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
