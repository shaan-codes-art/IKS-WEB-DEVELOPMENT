import { GRAMMAR_LESSONS } from "../data/learningData";
import { REFERENCES } from "../data/references";
import { RESEARCH_GAP_17_DATA, RESEARCH_GAP_20_DATA } from "../data/researchPapers";
import { VERIFIED_SUTRAS } from "../data/sutraData";
import { QUIZ_CATEGORIES } from "../data/quizData";

export type AssistantMode =
  | "explain"
  | "simple"
  | "step-by-step"
  | "research"
  | "word-help"
  | "quiz-answer";

export type AssistantSource = {
  id: string;
  title: string;
  description: string;
  href: string;
  type: string;
  content: string;
  searchText: string;
};

const sources: AssistantSource[] = [
  ...GRAMMAR_LESSONS.map((lesson) => {
    const content = [
      lesson.summary,
      lesson.keyConcepts.join(", "),
      ...lesson.coreSutras.map((sutra) => `${sutra.number} ${sutra.text} ${sutra.translation}`),
      ...lesson.contentSections.map((section) => `${section.heading}: ${section.body} ${section.sanskritCallout ?? ""}`),
      lesson.practicalTakeaway,
    ].join("\n");
    return {
      id: `lesson-${lesson.id}`,
      title: lesson.titleEng,
      description: lesson.summary,
      href: `/learn#lesson-${lesson.id}`,
      type: "Grammar lesson",
      content,
      searchText: `${lesson.titleEng} ${lesson.titleDev} ${lesson.topic ?? ""} ${content}`,
    };
  }),
  ...VERIFIED_SUTRAS.map((sutra) => {
    const content = [
      `${sutra.number} ${sutra.devanagari} ${sutra.iast}`,
      `Type: ${sutra.type}. Category: ${sutra.category}.`,
      `Translation: ${sutra.translation}`,
      `Analysis: ${sutra.detailedAnalysis}`,
      `Verification note: ${sutra.verificationStatus}`,
    ].join("\n");
    return {
      id: `sutra-${sutra.number}`,
      title: `${sutra.number} · ${sutra.iast}`,
      description: sutra.translation,
      href: `/sutras?search=${encodeURIComponent(sutra.number)}`,
      type: "Sūtra Library entry",
      content,
      searchText: `${sutra.number} ${sutra.devanagari} ${sutra.iast} ${sutra.category} ${sutra.type} ${content}`,
    };
  }),
  ...REFERENCES.map((reference) => ({
    id: `reference-${reference.id}`,
    title: reference.title,
    description: reference.scope,
    href: `/references#ref-${reference.id}`,
    type: "Bibliography entry",
    content: `${reference.title}\n${reference.scope}`,
    searchText: `${reference.title} ${reference.scope}`,
  })),
  ...QUIZ_CATEGORIES.map((category) => ({
    id: `quiz-category-${category}`,
    title: `${category} practice`,
    description: "Open the relevant quiz category.",
    href: `/practice?category=${encodeURIComponent(category)}`,
    type: "Practice category",
    content: `Practice questions about ${category}.`,
    searchText: `${category} practice quiz`,
  })),
  ...[
    {
      id: "research-1",
      title: "Explainable Sanskrit NLP (Research 1)",
      description: RESEARCH_GAP_17_DATA.subtitle,
      href: "/explainable-nlp",
      data: RESEARCH_GAP_17_DATA,
    },
    {
      id: "research-2",
      title: "Pedagogical CALL (Research 2)",
      description: RESEARCH_GAP_20_DATA.subtitle,
      href: "/pedagogy-call",
      data: RESEARCH_GAP_20_DATA,
    },
  ].map((research) => {
    const content = [
      research.data.fullTitle,
      research.data.subtitle,
      research.data.abstract,
      research.data.researchGapStatement,
      ...research.data.keywords,
      ...research.data.background.paragraphs,
      ...research.data.researchQuestions.map((item) => `${item.question} ${item.rationale}`),
      ...research.data.objectives.map((item) => `${item.title} ${item.description}`),
      ...research.data.methodology.phases.flatMap((phase) => [phase.title, ...phase.details]),
      ...research.data.literature.map((item) => `${item.authors} ${item.title} ${item.venue}`),
    ].join("\n");
    return {
      id: research.id,
      title: research.title,
      description: research.description,
      href: research.href,
      type: "Research page",
      content,
      searchText: `${research.title} ${content}`,
    };
  }),
];

const stopWords = new Set([
  "a", "an", "and", "are", "as", "at", "be", "can", "do", "does", "for", "from", "how",
  "i", "in", "is", "it", "me", "of", "on", "or", "please", "the", "this", "to", "what",
  "when", "where", "which", "with", "why", "explain", "tell", "about",
]);

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, " ")
    .trim();
}

function terms(value: string): string[] {
  return normalize(value).split(/\s+/).filter((term) => term.length > 1 && !stopWords.has(term));
}

export function searchAssistantKnowledge(query: string, limit = 6): AssistantSource[] {
  const address = query.match(/\b\d+\.\d+\.\d+\b/);
  if (address) {
    const exactSutra = sources.find((source) => source.id === `sutra-${address[0]}`);
    if (exactSutra) return [{ ...exactSutra, content: exactSutra.content.slice(0, 2400) }];
  }
  const queryTerms = [...new Set(terms(query))];
  if (!queryTerms.length) return [];

  const normalizedQuery = normalize(query);
  return sources
    .map((source) => {
      const normalizedText = normalize(source.searchText);
      const textTerms = new Set(normalizedText.split(/\s+/));
      const termScore = queryTerms.reduce((score, term) => score + (textTerms.has(term) ? 2 : 0), 0);
      const phraseScore = normalizedQuery.length > 4 && normalizedText.includes(normalizedQuery) ? 8 : 0;
      const titleTerms = new Set(terms(source.title));
      const titleScore = queryTerms.reduce((score, term) => score + (titleTerms.has(term) ? 2 : 0), 0);
      return { source, score: termScore + phraseScore + titleScore };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.source.title.localeCompare(b.source.title))
    .slice(0, Math.max(1, Math.min(limit, 8)))
    .map(({ source }) => ({
      ...source,
      content: source.content.slice(0, 2400),
    }));
}
