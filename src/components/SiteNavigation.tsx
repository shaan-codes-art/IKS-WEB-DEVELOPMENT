"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

const primaryLinks = [
  { href: "/", label: "Home", number: "01" },
  { href: "/analysis-lab", label: "Analysis Lab", number: "02" },
  { href: "/word-formation", label: "Word Formation", number: "03" },
  { href: "/learn", label: "Learn Grammar", number: "04" },
  { href: "/practice", label: "Practice & Quiz", number: "05" },
  { href: "/sutras", label: "Sūtra Library", number: "06" },
  { href: "/about", label: "About Research", number: "07" },
];

const additionalLinks = [
  { href: "/progress", label: "Progress" },
  { href: "/assistant", label: "AI Assistant" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

function linkClassName(active: boolean) {
  return active
    ? "bg-[#1B4D36] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_3px_8px_rgba(15,45,31,0.16)]"
    : "text-[#33463B] hover:bg-white/70 hover:text-[#0F2D1F]";
}

export function DesktopNavigation() {
  const pathname = usePathname();
  const additionalActive = additionalLinks.some((item) => isActive(pathname, item.href));

  return (
    <nav
      aria-label="Primary navigation"
      className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 2xl:flex"
    >
      {primaryLinks.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-[11px] font-bold leading-none transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38622] ${linkClassName(active)}`}
          >
            <span className={`font-mono text-[9px] ${active ? "text-[#E5C97A]" : "text-[#8C6A24]"}`}>
              {item.number}
            </span>
            <span className="whitespace-nowrap">{item.label}</span>
          </Link>
        );
      })}
      <details className="group relative shrink-0">
        <summary
          className={`inline-flex min-h-10 cursor-pointer list-none items-center gap-1 rounded-lg px-2.5 text-[11px] font-bold leading-none transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38622] [&::-webkit-details-marker]:hidden ${linkClassName(additionalActive)}`}
        >
          More
          <ChevronDown className="h-3 w-3 transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <div className="absolute right-0 top-full z-[60] mt-2 min-w-48 rounded-xl border border-[#DDD3C2] bg-[#FAF7F2] p-1.5 shadow-[0_12px_28px_rgba(15,45,31,0.18),inset_0_1px_0_rgba(255,255,255,0.85)]">
          {additionalLinks.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`block rounded-lg px-3 py-2.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38622] ${active ? "bg-[#E8F0EC] text-[#1B4D36]" : "text-[#33463B] hover:bg-[#F4EFE6]"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </details>
    </nav>
  );
}

export function MobileNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const links = [...primaryLinks, ...additionalLinks];

  return (
    <div className="relative 2xl:hidden">
      <button
        ref={menuButtonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-site-navigation"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex min-h-10 items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-bold text-[#1B4D36] transition-colors hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38622]"
      >
        {open ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
        {open ? "Close menu" : "Menu"}
      </button>
      <nav
        id="mobile-site-navigation"
        aria-label="Mobile navigation"
        className={`${open ? "grid" : "hidden"} absolute left-0 right-0 top-full z-[60] mt-2 grid-cols-2 gap-1.5 rounded-xl border border-[#DDD3C2] bg-[#FAF7F2] p-2 shadow-[0_14px_34px_rgba(15,45,31,0.2),inset_0_1px_0_rgba(255,255,255,0.85)] sm:grid-cols-3`}
      >
        {links.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              onClick={() => setOpen(false)}
              className={`flex min-h-11 items-center gap-2 rounded-lg px-2.5 py-2 text-[11px] font-semibold leading-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38622] ${active ? "bg-[#1B4D36] text-white" : "text-[#33463B] hover:bg-[#F4EFE6]"}`}
            >
              {"number" in item && typeof item.number === "string" && (
                <span className={`font-mono text-[9px] ${active ? "text-[#E5C97A]" : "text-[#8C6A24]"}`}>
                  {item.number}
                </span>
              )}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
