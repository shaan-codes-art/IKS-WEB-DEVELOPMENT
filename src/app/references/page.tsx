import type { Metadata } from "next";
import Link from "next/link";
import { REFERENCES } from "../../data/references";

export const metadata: Metadata = {
  title: "References & Bibliography | THE PANINI PARSER",
  description:
    "Sources cited by the THE PANINI PARSER Sanskrit research and learning website.",
};

export default function ReferencesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-10">
      <header className="space-y-3 border-b border-[#E3D9C8] pb-8">
        <nav className="flex flex-wrap items-center gap-2 text-xs text-[#6A7F73]" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#1B4D36] transition-colors">
            Home
          </Link>
          <span aria-hidden="true">&gt;</span>
          <span className="font-semibold text-[#0F2D1F]">
            References &amp; Bibliography
          </span>
        </nav>
        <span className="inline-flex rounded-full border border-[#E0CE9E] bg-[#FAF1DA] px-3 py-1 text-xs font-semibold text-[#8C6A24]">
          Academic Attribution
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#0F2D1F]">
          References &amp; Bibliography
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-[#465A4F]">
          Numbered citations link to the source records below. Modern works use
          APA-style details where verified; primary Sanskrit texts retain
          traditional title and sūtra references.
        </p>
      </header>

      <ol className="space-y-5">
        {REFERENCES.map((reference) => (
          <li
            key={reference.id}
            id={`ref-${reference.id}`}
            className="scroll-mt-28 rounded-xl border border-[#DDD3C2] bg-[#FDFCFA] p-5 sm:p-6 space-y-3"
          >
            <h2 className="font-serif text-lg font-bold text-[#0F2D1F]">
              [{reference.id}] {reference.title}
            </h2>
            <p className="text-sm leading-relaxed text-[#28392F]">
              {reference.citation}
            </p>
            {reference.sourceUrl && (
              <p className="break-all text-xs">
                <a
                  href={reference.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1B4D36] underline decoration-[#BBD5C5] underline-offset-2 hover:text-[#8C6A24]"
                >
                  {reference.sourceLabel}
                </a>
              </p>
            )}
            <p className="border-t border-[#EAE1D3] pt-3 text-xs leading-relaxed text-[#526359]">
              <strong className="text-[#0F2D1F]">Scope and verification: </strong>
              {reference.scope}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold">
              {reference.backlinks.map((backlink) => (
                <Link
                  key={backlink.href}
                  href={backlink.href}
                  className="text-[#1B4D36] hover:text-[#8C6A24] hover:underline"
                >
                  Back to {backlink.label}
                </Link>
              ))}
            </div>
          </li>
        ))}
      </ol>

      <section className="rounded-xl border border-[#D4AF37]/50 bg-[#FAF1DA]/60 p-5 sm:p-6 space-y-3">
        <h2 className="font-serif text-xl font-bold text-[#0F2D1F]">
          Sources and claims requiring review
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#455A4F]">
          <li>
            The source edition behind the Sūtra Library&apos;s English glosses
            and interpretations is not recorded. The glosses are website
            editorial text, not verified quotations or attributed published
            translations; check them against a named edition before academic
            reuse.
          </li>
          <li>
            Research 1&apos;s novelty and gap statements, project performance
            targets, planned dataset sizes, and claims about the project&apos;s
            own coverage are original project assertions or proposals. They
            have not been independently substantiated by the sources listed
            here and need review before being presented as established findings.
          </li>
          <li>
            Research 2&apos;s proposed instructional benefits and any claim
            that this website reduces cognitive load or improves learning have
            not been evaluated by the cited cognitive-load study; empirical
            evidence for this project is still needed.
          </li>
          <li>
            Several earlier literature-list records did not match their linked
            DOI or source page and are excluded pending bibliographic
            verification.
          </li>
        </ul>
      </section>

      <p className="text-xs text-[#6A7F73]">
        <Link href="/" className="font-semibold text-[#1B4D36] hover:underline">
          Return to the home page
        </Link>
      </p>
    </div>
  );
}
