type DetailSectionProps = {
  title: string;
  children: React.ReactNode;
};

export function DetailSection({ title, children }: DetailSectionProps) {
  return (
    <section className="border-t-8 border-surface-weak py-10 first:border-t-0 md:py-14">
      <h2 className="text-[22px] font-bold tracking-tight md:text-2xl">{title}</h2>
      <div className="mt-5 min-w-0 md:mt-6">{children}</div>
    </section>
  );
}
