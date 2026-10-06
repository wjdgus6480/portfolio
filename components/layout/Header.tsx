"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profile } from "@/content/profile";
import { navItems, sectionIds } from "@/content/site";
import { Container } from "@/components/ui/Container";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeId, setActiveId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Home에서 현재 화면 중앙에 있는 섹션을 추적한다.
  useEffect(() => {
    if (!isHome) return;
    // 메뉴에 없는 섹션과 Hero(#top)도 관찰해, 그 위치에서는 어떤 메뉴도 강조되지 않게 한다.
    const elements = ["top", ...sectionIds]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const currentId = isHome ? activeId : null;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="text-[15px] font-semibold tracking-tight"
        >
          {profile.name}
          <span className="font-normal text-subtle"> / Portfolio</span>
        </Link>

        <nav aria-label="주요 메뉴" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/#${item.id}`}
                  aria-current={currentId === item.id ? "location" : undefined}
                  className={`text-sm transition-colors duration-150 ease-out hover:text-foreground ${
                    currentId === item.id ? "text-accent" : "text-muted"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
          className="-mr-2.5 flex size-11 items-center justify-center rounded-md md:hidden"
        >
          <span className="relative block h-3 w-5" aria-hidden>
            <span
              className={`absolute left-0 h-px w-5 bg-foreground transition-transform duration-150 ${
                menuOpen ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-5 bg-foreground transition-transform duration-150 ${
                menuOpen ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </Container>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="주요 메뉴" className="border-t border-border md:hidden">
          <Container>
            <ul className="py-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    aria-current={currentId === item.id ? "location" : undefined}
                    className={`flex items-center justify-between py-3 text-lg ${
                      currentId === item.id ? "text-accent" : "text-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      )}
    </header>
  );
}
