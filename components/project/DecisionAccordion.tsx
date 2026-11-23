"use client";

import { useId, useState } from "react";

type DecisionAccordionProps = {
  items: { decision: string; why: string }[];
};

/**
 * 기술 결정 목록: 결정은 늘 보이고, 누르면 이유가 펼쳐진다. 한 번에 하나만 펼친다.
 * 높이는 grid-template-rows 0fr → 1fr로 늘리고, 내용은 Fade + Slide Up, 화살표는 회전한다.
 * 이유 문장은 접혀 있어도 문서에 남아 있다(검색 · 인쇄용). 접힌 동안은 보조기기에서 숨긴다.
 */
export function DecisionAccordion({ items }: DecisionAccordionProps) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <ul className="space-y-3">
      {items.map(({ decision, why }, index) => {
        const isOpen = open === index;
        const panelId = `${baseId}-${index}`;
        return (
          <li key={decision} className="rounded-card bg-surface-weak">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 rounded-card p-5 text-left font-bold"
            >
              <span>{decision}</span>
              <svg
                aria-hidden
                viewBox="0 0 20 20"
                className={`size-5 shrink-0 text-subtle transition-transform duration-(--duration-expand) ease-(--ease-standard) ${isOpen ? "rotate-180 text-accent-vivid" : ""}`}
              >
                <path d="m5 7.5 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div
              id={panelId}
              aria-hidden={!isOpen}
              className={`grid transition-[grid-template-rows] duration-(--duration-expand) ease-(--ease-standard) ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <p
                  className={`px-5 pb-5 leading-relaxed text-muted transition-[opacity,translate] duration-(--duration-expand) ease-(--ease-standard) ${
                    isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                  }`}
                >
                  {why}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
