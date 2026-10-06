import Link from "next/link";

type ButtonLinkProps = {
  href: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
};

const base =
  "inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-[15px] font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants = {
  primary: "bg-foreground text-background hover:opacity-85",
  secondary: "border border-border text-foreground hover:border-border-strong hover:bg-surface",
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
