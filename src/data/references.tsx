import type { ReactNode } from "react";

export type Reference = {
  id: number;
  title: string;
  citation: ReactNode;
  sourceUrl?: string;
  sourceLabel?: string;
  scope: string;
  backlinks: { href: string; label: string }[];
};

export const REFERENCES: Reference[] = [
  {
    id: 1,
    title: "Aṣṭādhyāyī (primary text)",
    citation: (
      <>
        Pāṇini. (n.d.). <em>Aṣṭādhyāyī</em> (sūtra numbers cited in the text).
        Primary Sanskrit grammatical text.
      </>
    ),
    scope:
      "Primary source for the sūtra numbers and Sanskrit forms referenced by the Sūtra Library and derivation examples. The website does not identify the printed edition used for its English glosses; those glosses and interpretations are editorial text and require comparison with an identified scholarly edition before academic reuse.",
    backlinks: [
      { href: "/sutras", label: "Sūtra Library" },
      { href: "/word-formation", label: "Word Formation Explorer" },
      { href: "/analysis-lab", label: "Analysis Lab" },
    ],
  },
  {
    id: 2,
    title: "Sanskrit computational linguistics",
    citation: (
      <>
        Huet, G., Kulkarni, A., &amp; Scharf, P. (Eds.). (2009).{" "}
        <em>
          Sanskrit computational linguistics: First and second international
          symposia, Rocquencourt, France, October 29–31, 2007; Providence, RI,
          USA, May 15–17, 2008, revised selected and invited papers
        </em>{" "}
        (Lecture Notes in Computer Science, Vol. 5402). Springer.
      </>
    ),
    sourceUrl: "https://doi.org/10.1007/978-3-642-00155-0",
    sourceLabel: "https://doi.org/10.1007/978-3-642-00155-0",
    scope:
      "Verified Crossref record for the 2009 edited proceedings volume; cited only as a scholarly source in the computational Sanskrit linguistics context, not as evidence for the website's project-specific results or research-gap claims.",
    backlinks: [
      { href: "/explainable-nlp", label: "Research 1" },
      { href: "/analysis-lab", label: "Analysis Lab" },
    ],
  },
  {
    id: 3,
    title: "Cognitive load and learning",
    citation: (
      <>
        Sweller, J. (1988). Cognitive load during problem solving: Effects on
        learning. <em>Cognitive Science, 12</em>(2), 257–285.
      </>
    ),
    sourceUrl: "https://doi.org/10.1207/s15516709cog1202_4",
    sourceLabel: "https://doi.org/10.1207/s15516709cog1202_4",
    scope:
      "Supports the general cognitive-load and schema-acquisition background in the learning section. It does not evaluate this website or establish the effectiveness of its instructional features.",
    backlinks: [
      { href: "/pedagogy-call", label: "Research 2" },
      { href: "/learn", label: "Grammar Lessons" },
    ],
  },
  {
    id: 4,
    title: "The Aṣṭādhyāyī (English translation)",
    citation: (
      <>
        Pāṇini. (1897). <em>The Ashtadhyayi</em> (Śrīśa Chandra Vasu, Trans.).
        Published by Sindhu Charan Bose, at the Panini Office, Benares.
      </>
    ),
    sourceUrl: "https://archive.org/details/ashtadhyayitrans06paniuoft",
    sourceLabel: "Internet Archive record and online scan",
    scope:
      "Open Library edition metadata records the 1897 Benares publication and Vasu's translation; the Internet Archive record identifies the translated scan. Useful primary-text translation for grammatical rules; specific English glosses on this website have not yet been checked against it.",
    backlinks: [{ href: "/#books-research-sources", label: "Books & Research Sources" }],
  },
  {
    id: 5,
    title: "The Aṣṭādhyāyī of Pāṇini with translation and explanatory notes",
    citation: (
      <>
        Joshi, S. D., &amp; Roodbergen, J. A. F. (1991).{" "}
        <em>The Aṣṭādhyāyī of Pāṇini with translation and explanatory notes</em>
        . Sahitya Akademi.
      </>
    ),
    sourceUrl: "https://openlibrary.org/books/OL18042163M",
    sourceLabel: "Open Library catalogue record",
    scope:
      "The catalogue record identifies the authors, first edition, Sahitya Akademi, New Delhi, and 1991 publication date. Listed as further reading; this project has not yet checked its glosses against the site translations.",
    backlinks: [{ href: "/#books-research-sources", label: "Books & Research Sources" }],
  },
  {
    id: 6,
    title: "The Aṣṭādhyāyī of Pāṇini",
    citation: (
      <>
        Sharma, R. N. (n.d.). <em>The Aṣṭādhyāyī of Pāṇini</em> [Critical
        study with text]. Bibliographic record in Open Library.
      </>
    ),
    sourceUrl:
      "https://openlibrary.org/works/OL5083787W/The_As%CC%A3t%CC%A3a%CC%84dhya%CC%84yi%CC%84_of_Pa%CC%84n%CC%A3ini",
    sourceLabel: "Open Library work record",
    scope:
      "Open Library identifies Rama Nath Sharma as author and describes the work as a critical study with text. The checked work record does not confirm the six-volume description, publication year, or publisher; listed as further reading pending edition-level catalogue verification.",
    backlinks: [{ href: "/#books-research-sources", label: "Books & Research Sources" }],
  },
];
