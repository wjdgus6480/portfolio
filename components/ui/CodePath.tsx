type CodePathProps = {
  path: string;
  /** 공개 저장소일 때만 넘긴다. 없으면 경로만 표시 */
  href?: string;
};

/** 코드 근거 경로. 저장소가 비공개면 링크 없이 경로만 보여 준다. */
export function CodePath({ path, href }: CodePathProps) {
  const className = "font-mono text-xs leading-relaxed text-muted [overflow-wrap:anywhere]";
  if (!href) return <code className={className}>{path}</code>;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} underline decoration-border underline-offset-2 transition-colors duration-150 hover:text-accent`}
    >
      {path}
    </a>
  );
}
