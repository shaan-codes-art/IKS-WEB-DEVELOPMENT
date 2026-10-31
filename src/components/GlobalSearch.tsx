"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";
import { GRAMMAR_LESSONS } from "../data/learningData";
import { REFERENCES } from "../data/references";
import { VERIFIED_DERIVATIONS } from "../data/sanskritData";
import { VERIFIED_SUTRAS } from "../data/sutraData";
import { RESEARCH_GAP_17_DATA, RESEARCH_GAP_20_DATA } from "../data/researchPapers";
import { QUIZ_CATEGORIES } from "../data/quizData";

type SearchItem = {
  title: string;
  description: string;
  href: string;
  category: string;
  searchable: string;
};

const searchItems: SearchItem[] = [
  ...QUIZ_CATEGORIES.map((category) => ({
    title: `${category} quiz`,
    description: "Open a category-specific quiz with shuffled questions and immediate explanations.",
    href: `/practice?category=${encodeURIComponent(category)}`,
    category: "Quiz category",
    searchable: `${category} quiz practice question bank`,
  })),
  ...GRAMMAR_LESSONS.map((lesson) => ({
    title: lesson.titleEng,
    description: lesson.summary,
    href: `/learn#lesson-${lesson.id}`,
    category: "Grammar lesson",
    searchable: `${lesson.titleDev} ${lesson.titleEng} ${lesson.summary} ${lesson.keyConcepts.join(" ")} ${lesson.contentSections.map((section) => `${section.heading} ${section.body}`).join(" ")}`,
  })),
  ...VERIFIED_SUTRAS.map((sutra) => ({
    title: `${sutra.number} · ${sutra.devanagari} (${sutra.iast})`,
    description: sutra.translation,
    href: `/sutras?search=${encodeURIComponent(sutra.number)}`,
    category: "Sūtra",
    searchable: `${sutra.number} ${sutra.devanagari} ${sutra.iast} ${sutra.translation} ${sutra.detailedAnalysis} ${sutra.category}`,
  })),
  ...VERIFIED_DERIVATIONS.map((derivation) => ({
    title: `${derivation.targetForm} · ${derivation.targetFormIast}`,
    description: `${derivation.baseItem} — ${derivation.grammaticalTarget}`,
    href: `/word-formation?example=${encodeURIComponent(derivation.id)}`,
    category: "Word formation",
    searchable: `${derivation.baseItem} ${derivation.baseItemIast} ${derivation.meaning} ${derivation.targetForm} ${derivation.targetFormIast} ${derivation.grammaticalTarget} ${derivation.steps.map((step) => `${step.sutraNumber} ${step.explanation}`).join(" ")}`,
  })),
  ...REFERENCES.map((reference) => ({
    title: reference.title,
    description: reference.scope,
    href: `/references#ref-${reference.id}`,
    category: "Research source",
    searchable: `${reference.title} ${reference.scope}`,
  })),
  {
    title: "Explainable Sanskrit NLP",
    description: RESEARCH_GAP_17_DATA.subtitle,
    href: "/explainable-nlp",
    category: "Research 1",
    searchable: `${RESEARCH_GAP_17_DATA.fullTitle} ${RESEARCH_GAP_17_DATA.subtitle} ${RESEARCH_GAP_17_DATA.abstract} ${RESEARCH_GAP_17_DATA.keywords.join(" ")}`,
  },
  {
    title: "Pedagogical CALL",
    description: RESEARCH_GAP_20_DATA.subtitle,
    href: "/pedagogy-call",
    category: "Research 2",
    searchable: `${RESEARCH_GAP_20_DATA.fullTitle} ${RESEARCH_GAP_20_DATA.subtitle} ${RESEARCH_GAP_20_DATA.abstract} ${RESEARCH_GAP_20_DATA.keywords.join(" ")}`,
  },
  {
    title: "Sanskrit Analysis Lab",
    description: "Explore Sanskrit analysis tools and linguistic concepts.",
    href: "/analysis-lab",
    category: "Website section",
    searchable: "analysis lab sandhi morphology grammar",
  },
  {
    title: "Books & Research Sources",
    description: "Primary texts and scholarly resources consulted for this website.",
    href: "/#books-research-sources",
    category: "Website section",
    searchable: "books bibliography research sources reading list",
  },
  {
    title: "Student Progress",
    description: "Review completed lessons, quiz attempts, and saved bookmarks in this browser.",
    href: "/progress",
    category: "Learning",
    searchable: "student progress dashboard completed lessons quizzes bookmarks",
  },
  {
    title: "AI Learning Assistant",
    description: "Ask questions or browse local lessons, sūtras, and research content.",
    href: "/assistant",
    category: "Learning",
    searchable: "AI ask assistant natural language Sanskrit grammar explain answer",
  },
];

export default function GlobalSearch() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const normalizedQuery = query.normalize("NFC").trim().toLocaleLowerCase();
  const results = useMemo(() => {
    if (!normalizedQuery) return [];
    return searchItems
      .filter((item) => `${item.title} ${item.description} ${item.searchable}`.normalize("NFC").toLocaleLowerCase().includes(normalizedQuery))
      .slice(0, 8);
  }, [normalizedQuery]);

  const openSearch = () => {
    setIsOpen(true);
  };

  const closeSearch = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const onShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        if (document.querySelector("dialog[open]")) return;
        event.preventDefault();
        if (isOpen) inputRef.current?.focus();
        else setIsOpen(true);
      }
    };
    window.addEventListener("keydown", onShortcut);
    return () => window.removeEventListener("keydown", onShortcut);
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openSearch}
        aria-label="Search lessons, sūtras, and research"
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#DDD3C2] bg-[#FDFCFA] text-[#1B4D36] transition-colors hover:bg-[#FAF1DA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38622]"
      >
        <Search className="h-4 w-4" aria-hidden="true" />
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-[#0F2D1F]/55 px-4 pt-[12vh] backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeSearch();
          }}
        >
          <section
            aria-labelledby="global-search-title"
            aria-modal="true"
            role="dialog"
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                event.preventDefault();
                closeSearch();
              } else if (event.key === "Tab") {
                const focusable = event.currentTarget.querySelectorAll<HTMLElement>(
                  'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
                );
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                  event.preventDefault();
                  last?.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                  event.preventDefault();
                  first?.focus();
                }
              }
            }}
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-[#D4AF37]/50 bg-[#FAF7F2] shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-[#DDD3C2] px-4 py-3">
              <Search className="h-5 w-5 shrink-0 text-[#8C6A24]" aria-hidden="true" />
              <label id="global-search-title" className="sr-only" htmlFor="global-search-input">
                Search website content
              </label>
              <input
                id="global-search-input"
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && results[0]) {
                    event.preventDefault();
                    router.push(results[0].href);
                    setIsOpen(false);
                  }
                }}
                placeholder="Search lessons, sūtras, derivations, and research…"
                className="min-w-0 flex-1 bg-transparent py-2 text-sm text-[#0F2D1F] outline-none placeholder:text-[#6A7F73]"
              />
              <button
                type="button"
                onClick={closeSearch}
                aria-label="Close search"
                className="rounded-md p-2 text-[#526359] hover:bg-[#EAE2D4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38622]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <div className="max-h-[65vh] overflow-y-auto p-3" aria-live="polite">
              {!normalizedQuery ? (
                <p className="px-3 py-6 text-center text-sm text-[#526359]">
                  Search across available lessons, sūtras, word formations, research, and references.
                </p>
              ) : results.length ? (
                <ul className="space-y-1">
                  {results.map((result) => (
                    <li key={`${result.category}-${result.href}-${result.title}`}>
                      <Link
                        href={result.href}
                        onClick={closeSearch}
                        className="group flex items-start justify-between gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-[#F4EFE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#B38622]"
                      >
                        <span className="min-w-0">
                          <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-[#8C6A24]">
                            {result.category}
                          </span>
                          <span className="block font-serif text-base font-bold text-[#0F2D1F]">{result.title}</span>
                          <span className="mt-1 block line-clamp-2 text-xs leading-relaxed text-[#526359]">{result.description}</span>
                        </span>
                        <ArrowRight className="mt-5 h-4 w-4 shrink-0 text-[#1B4D36] transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-3 py-6 text-center text-sm text-[#526359]" role="status">
                  No matching content found. Try a sūtra number, a grammar term, or a shorter search.
                </p>
              )}
            </div>
            <p className="border-t border-[#DDD3C2] px-4 py-2 text-[10px] text-[#6A7F73]">
              Search uses the website&apos;s available content locally; no external service is contacted.
            </p>
          </section>
        </div>
      )}
    </>
  );
}
