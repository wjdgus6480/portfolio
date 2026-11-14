import type { BackendEvidence, Project } from "@/content/types";
import { codeHref } from "@/lib/projects";
import { CodePath } from "@/components/ui/CodePath";

type Repo = Pick<Project, "codeBase">;

/** 백엔드 증거 숫자. 숫자 아래에 어떻게 셌는지(basis)를 항상 함께 보여 준다. */
export function ProofGrid({ proof, project }: { proof: BackendEvidence["proof"]; project: Repo }) {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3 xl:grid-cols-6">
      {proof.map(({ value, label, basis, path }) => (
        <div key={label} className="flex flex-col bg-surface p-4 md:p-5">
          <dt className="order-2 mt-1 text-sm font-semibold">{label}</dt>
          <dd className="order-1 text-3xl font-bold tracking-tight md:text-4xl">{value}</dd>
          <dd className="order-3 mt-2 text-xs leading-relaxed text-subtle">{basis}</dd>
          {path && (
            <dd className="order-4 mt-1">
              <CodePath path={path} href={codeHref(project, path)} />
            </dd>
          )}
        </div>
      ))}
    </dl>
  );
}

/** 숫자로 셀 수 없는 백엔드 역량 + 코드 위치 */
export function CapabilityList({ items, project }: { items: BackendEvidence["capabilities"]; project: Repo }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map(({ label, detail, paths }) => (
        <li key={label} className="rounded-xl border border-border bg-surface p-4">
          <p className="font-semibold">{label}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">{detail}</p>
          <div className="mt-2 flex flex-col gap-0.5">
            {paths.map((path) => (
              <CodePath key={path} path={path} href={codeHref(project, path)} />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

/** 데이터 흐름: 단계를 화살표로 잇는다 */
export function DataFlow({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-2">
          <span className="rounded-lg border border-border bg-surface px-3 py-1.5 font-mono text-xs font-medium md:text-sm">
            {step}
          </span>
          {i < steps.length - 1 && (
            <span aria-hidden className="text-accent">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

/** 요청이 지나가는 실제 계층. 위에서 아래로 */
export function LayerStack({ layers, project }: { layers: BackendEvidence["layers"]; project: Repo }) {
  return (
    <ol className="space-y-2">
      {layers.map(({ name, role, paths }, i) => (
        <li key={name}>
          <div className="grid gap-2 rounded-xl border border-border bg-surface p-4 md:grid-cols-[15rem_1fr_16rem] md:items-start md:gap-6">
            <p className="flex items-baseline gap-2 font-semibold">
              <span className="font-mono text-xs text-accent">L{i + 1}</span>
              {name}
            </p>
            <p className="text-[15px] leading-relaxed text-muted">{role}</p>
            <div className="flex flex-col gap-0.5">
              {paths.map((path) => (
                <CodePath key={path} path={path} href={codeHref(project, path)} />
              ))}
            </div>
          </div>
          {i < layers.length - 1 && (
            <p aria-hidden className="py-0.5 text-center text-subtle">
              ↓
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}

/** 실제 Route Handler 목록 */
export function ApiTable({ api }: { api: BackendEvidence["api"] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-surface">
      <table className="w-full min-w-[34rem] text-left text-sm">
        <thead className="border-b border-border bg-surface-weak font-mono text-xs uppercase tracking-[0.08em] text-subtle">
          <tr>
            <th scope="col" className="px-4 py-2.5 font-medium">Method</th>
            <th scope="col" className="px-4 py-2.5 font-medium">Path</th>
            <th scope="col" className="px-4 py-2.5 font-medium">역할</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {api.map(({ method, path, purpose }) => (
            <tr key={`${method} ${path}`}>
              <td className="px-4 py-2.5">
                <span
                  className={`font-mono text-xs font-semibold ${method === "GET" ? "text-accent" : "text-foreground"}`}
                >
                  {method}
                </span>
              </td>
              <td className="px-4 py-2.5 font-mono text-xs">{path}</td>
              <td className="px-4 py-2.5 text-muted">{purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Server Actions 파일과 역할 */
export function ActionList({ actions, project }: { actions: BackendEvidence["actions"]; project: Repo }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {actions.map(({ path, purpose }) => (
        <li key={path} className="flex flex-col rounded-lg border border-border bg-surface px-3 py-2">
          <span className="text-[15px] font-medium">{purpose}</span>
          <CodePath path={path} href={codeHref(project, path)} />
        </li>
      ))}
    </ul>
  );
}

/** 테이블 이름 접두어로 묶은 데이터 영역 */
export function TableDomains({ tables }: { tables: BackendEvidence["tables"] }) {
  const total = tables.reduce((sum, table) => sum + table.count, 0);
  return (
    <div className="space-y-3">
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tables.map(({ domain, prefix, count, examples }) => (
          <li key={domain} className="rounded-xl border border-border bg-surface p-4">
            <p className="flex items-baseline justify-between gap-3">
              <span className="font-semibold">{domain}</span>
              <span className="font-mono text-sm text-accent">{count}</span>
            </p>
            <p className="mt-0.5 font-mono text-xs text-subtle">{prefix}</p>
            <p className="mt-2 font-mono text-xs leading-relaxed text-muted [overflow-wrap:anywhere]">
              {examples.join(" · ")}
            </p>
          </li>
        ))}
      </ul>
      <p className="text-sm text-subtle">합계 {total}개 테이블 · 이름 접두어 기준 분류</p>
    </div>
  );
}
