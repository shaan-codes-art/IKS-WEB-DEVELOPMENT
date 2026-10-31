"use client";

import { FormEvent, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Bot,
  Check,
  Clipboard,
  LoaderCircle,
  MessageCircle,
  RotateCcw,
  Search,
  Send,
  Sparkles,
} from "lucide-react";
import { searchAssistantKnowledge } from "../lib/assistantKnowledge";
import type { AssistantMode, AssistantSource } from "../lib/assistantKnowledge";
import { readQuizResult } from "../lib/quizResults";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: AssistantSourceResult[];
  provider?: "local" | "gemini";
};

type AssistantSourceResult = Omit<AssistantSource, "searchText">;

type QuizContext = {
  question: string;
  category: string;
  selectedAnswer: string;
  correctAnswer: string;
  explanation: string;
  selectedExplanation?: string;
};

type ApiResponse = {
  response?: string;
  sources?: AssistantSourceResult[];
  provider?: "local" | "gemini";
  configured?: boolean;
  notice?: string;
  error?: string;
};

const MAX_HISTORY_TURNS = 6;
const MAX_HISTORY_MESSAGE_LENGTH = 3500;
const MAX_HISTORY_TOTAL_LENGTH = 9000;

function buildConversationHistory(conversation: Message[]) {
  const turns: { role: "user" | "assistant"; content: string }[][] = [];
  for (let index = 0; index < conversation.length - 1; index += 1) {
    const userMessage = conversation[index];
    const assistantMessage = conversation[index + 1];
    if (userMessage.role === "user" && assistantMessage.role === "assistant") {
      turns.push([
        { role: "user", content: userMessage.content.trim().slice(0, MAX_HISTORY_MESSAGE_LENGTH) },
        { role: "assistant", content: assistantMessage.content.trim().slice(0, MAX_HISTORY_MESSAGE_LENGTH) },
      ]);
      index += 1;
    }
  }

  const selectedTurns: typeof turns = [];
  let totalLength = 0;
  for (const turn of turns.slice(-MAX_HISTORY_TURNS).reverse()) {
    const turnLength = turn.reduce((total, message) => total + message.content.length, 0);
    if (totalLength + turnLength > MAX_HISTORY_TOTAL_LENGTH) break;
    selectedTurns.push(turn);
    totalLength += turnLength;
  }
  return selectedTurns.reverse().flat();
}

function buildQuizContext(context: QuizContext): QuizContext {
  return {
    question: context.question.trim().slice(0, 1200),
    category: context.category.trim().slice(0, 200),
    selectedAnswer: context.selectedAnswer.trim().slice(0, 1000),
    correctAnswer: context.correctAnswer.trim().slice(0, 1000),
    explanation: context.explanation.trim().slice(0, 2300),
    ...(context.selectedExplanation
      ? { selectedExplanation: context.selectedExplanation.trim().slice(0, 2300) }
      : {}),
  };
}

const modes: { id: AssistantMode; label: string; description: string }[] = [
  { id: "explain", label: "Explain", description: "Clear explanation using relevant website sources." },
  { id: "simple", label: "Explain Simply", description: "Beginner-friendly definitions and short examples." },
  { id: "step-by-step", label: "Step-by-Step Grammar", description: "A numbered explanation; illustrations are labelled." },
  { id: "research", label: "Research Assistant", description: "Computational linguistics, explainability, and CALL." },
  { id: "word-help", label: "Sanskrit Word Help", description: "Cautious word help based only on available evidence." },
  { id: "quiz-answer", label: "Explain My Quiz Answer", description: "Explain a submitted answer from Quiz Results." },
];

const suggestions = [
  "Explain what anuvṛtti means simply",
  "How does sandhi differ from samāsa?",
  "What does sūtra 1.1.71 describe?",
  "What is explainable Sanskrit NLP?",
];

function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={index} className="rounded bg-[#EAE2D4] px-1 py-0.5 font-mono text-[0.92em]">{part.slice(1, -1)}</code>;
    }
    return <span key={index}>{part}</span>;
  });
}

function FormattedAnswer({ content }: { content: string }) {
  return (
    <div className="space-y-2 text-sm leading-7 text-[#33463B]">
      {content.split(/\n/).map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={index} className="h-1" aria-hidden="true" />;
        if (/^#{1,3}\s/.test(trimmed)) {
          return <h3 key={index} className="pt-2 font-serif text-lg font-bold text-[#0F2D1F]">{renderInline(trimmed.replace(/^#{1,3}\s/, ""))}</h3>;
        }
        if (/^[-*]\s/.test(trimmed)) {
          return <p key={index} className="pl-4 before:mr-2 before:content-['•']">{renderInline(trimmed.slice(2))}</p>;
        }
        if (/^\d+\.\s/.test(trimmed)) {
          return <p key={index} className="pl-2">{renderInline(trimmed)}</p>;
        }
        return <p key={index}>{renderInline(trimmed)}</p>;
      })}
    </div>
  );
}

function SourceList({ sources }: { sources: AssistantSourceResult[] }) {
  if (!sources.length) return null;
  return (
    <section className="mt-4 border-t border-[#DDD3C2] pt-3" aria-label="Related website sources">
      <h4 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#8C6A24]">
        <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
        Related website sources
      </h4>
      <ul className="grid gap-2 sm:grid-cols-2">
        {sources.map((source) => (
          <li key={source.id}>
            <Link href={source.href} className="group block rounded-lg border border-[#DDD3C2] bg-[#FAF7F2] p-3 transition-colors hover:border-[#1B4D36] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38622]">
              <span className="block text-[10px] font-semibold uppercase tracking-wide text-[#8C6A24]">{source.type}</span>
              <span className="mt-1 block text-sm font-semibold text-[#1B4D36] group-hover:underline">{source.title}</span>
              <span className="mt-1 block text-xs leading-relaxed text-[#526359]">{source.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function LearningAssistantContent() {
  const searchParams = useSearchParams();
  const initialQuestion = searchParams.get("q") ?? "";
  const quizResultId = searchParams.get("quizResultId");
  const quizQuestionId = searchParams.get("questionId");
  const [mode, setMode] = useState<AssistantMode>("explain");
  const [conversation, setConversation] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<AssistantSourceResult[]>([]);
  const [searchMessage, setSearchMessage] = useState("");
  const [isSearchView, setIsSearchView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [retryQuestion, setRetryQuestion] = useState("");
  const [quizContext, setQuizContext] = useState<QuizContext | null>(null);
  const [quizContextMessage, setQuizContextMessage] = useState("");
  const [copiedId, setCopiedId] = useState("");
  const [providerNotice, setProviderNotice] = useState("");
  const responseEndRef = useRef<HTMLDivElement>(null);
  const requestController = useRef<AbortController | null>(null);
  const autoStartedFor = useRef("");

  useEffect(() => {
    setQuestion(initialQuestion.slice(0, 1200));
  }, [initialQuestion]);

  useEffect(() => {
    if (!quizResultId || !quizQuestionId) return;
    try {
      const result = readQuizResult(quizResultId);
      const answeredQuestion = result?.questions.find((item) => item.id === quizQuestionId);
      if (!result || !answeredQuestion || answeredQuestion.selectedAnswerIndex === null) {
        setQuizContextMessage("That submitted answer is not available in this browser. Open its saved result and try again; unanswered questions are not sent to the assistant.");
        return;
      }
      setQuizContext({
        question: answeredQuestion.question,
        category: answeredQuestion.category,
        selectedAnswer: answeredQuestion.options[answeredQuestion.selectedAnswerIndex],
        correctAnswer: answeredQuestion.options[answeredQuestion.correctAnswerIndex],
        explanation: answeredQuestion.explanation,
        selectedExplanation: answeredQuestion.optionExplanations?.[answeredQuestion.selectedAnswerIndex],
      });
      setMode("quiz-answer");
      setQuestion(`Please explain my submitted answer to: ${answeredQuestion.question}`);
      setQuizContextMessage("Loaded this submitted answer from the quiz result stored in this browser.");
    } catch {
      setQuizContextMessage("The saved quiz answer could not be read from this browser.");
    }
  }, [quizQuestionId, quizResultId]);

  useEffect(() => {
    responseEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [conversation, isLoading]);

  useEffect(() => () => requestController.current?.abort(), []);

  const selectedMode = useMemo(() => modes.find((item) => item.id === mode), [mode]);

  const submitQuestion = useCallback(async (value: string) => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    if (trimmed.length > 1200) {
      setError("Keep questions to 1,200 characters or fewer.");
      return;
    }
    if (mode === "quiz-answer" && !quizContext) {
      setError("Choose a submitted answer from a quiz result before using this mode.");
      return;
    }

    const userMessage: Message = { id: `user-${Date.now()}`, role: "user", content: trimmed };
    const previousMessages = buildConversationHistory(conversation);
    setConversation((previous) => [
      ...(previous[previous.length - 1]?.role === "user" ? previous.slice(0, -1) : previous),
      userMessage,
    ]);
    setQuestion("");
    setError("");
    setRetryQuestion("");
    setProviderNotice("");
    setIsLoading(true);
    const controller = new AbortController();
    requestController.current = controller;
    try {
      const response = await fetch("/api/learning-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          action: "ask",
          question: trimmed,
          mode,
          history: previousMessages,
          quizContext: mode === "quiz-answer" && quizContext ? buildQuizContext(quizContext) : undefined,
        }),
      });
      const data = await response.json() as ApiResponse;
      if (!response.ok && (response.status === 503 || response.status === 504)) {
        const fallbackSources = searchAssistantKnowledge(trimmed).map(({ searchText: _searchText, ...source }) => source);
        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: "Gemini is temporarily unavailable. Showing relevant website content instead; these results are from the website, not an AI-generated answer.",
          sources: fallbackSources,
          provider: "local",
        };
        setConversation((previous) => [...previous, assistantMessage]);
        setError("Gemini is temporarily unavailable. You can retry the same question or browse the website results below.");
        setRetryQuestion(trimmed);
        setProviderNotice("");
        setIsLoading(false);
        if (requestController.current === controller) requestController.current = null;
        return;
      }
      if (!response.ok) throw new Error(data.error || "The assistant could not answer. Please retry.");
      if (!data.response) throw new Error("The assistant returned an empty response. Please retry.");
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.response,
        sources: data.sources ?? [],
        provider: data.provider,
      };
      setConversation((previous) => [...previous, assistantMessage]);
      setProviderNotice(data.notice ?? "");
    } catch (caught) {
      if (caught instanceof Error && caught.name === "AbortError") return;
      setError(caught instanceof Error ? caught.message : "The assistant request failed. Please retry.");
      setRetryQuestion(trimmed);
    } finally {
      if (requestController.current === controller) requestController.current = null;
      setIsLoading(false);
    }
  }, [conversation, isLoading, mode, quizContext]);

  useEffect(() => {
    if (initialQuestion && mode !== "quiz-answer" && autoStartedFor.current !== initialQuestion) {
      autoStartedFor.current = initialQuestion;
      void submitQuestion(initialQuestion);
    }
  }, [initialQuestion, mode, submitQuestion]);

  async function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      setSearchMessage("Enter a term or question to search the available website content.");
      setSearchResults([]);
      return;
    }
    setIsLoading(true);
    setSearchMessage("");
    setError("");
    try {
      const response = await fetch("/api/learning-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "search", question: trimmed, mode: "explain" }),
      });
      const data = await response.json() as ApiResponse;
      if (!response.ok) throw new Error(data.error || "Website search could not be completed.");
      setSearchResults(data.sources ?? []);
      setSearchMessage(data.response ?? "");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Website search could not be completed.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submitQuestion(question);
  }

  function startNewQuestion() {
    requestController.current?.abort();
    setConversation([]);
    setError("");
    setProviderNotice("");
    setQuestion("");
  }

  async function copyAnswer(message: Message) {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopiedId(message.id);
      window.setTimeout(() => setCopiedId(""), 1800);
    } catch {
      setError("Could not copy this answer. Check browser clipboard permissions.");
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-7 px-4 py-8 sm:px-8 sm:py-12">
      <header className="space-y-3 border-b border-[#E3D9C8] pb-6">
        <nav aria-label="Breadcrumb" className="flex gap-2 text-xs text-[#6A7F73]">
          <Link href="/" className="hover:underline">Home</Link><span aria-hidden="true">›</span><span>AI Learning Assistant</span>
        </nav>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl space-y-2">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#E0CE9E] bg-[#FAF1DA] px-3 py-1 text-xs font-semibold text-[#73551a]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Local knowledge retrieval · optional AI
            </p>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-[#0F2D1F] sm:text-5xl">AI Learning Assistant</h1>
            <p className="text-sm leading-relaxed text-[#526359] sm:text-base">
              Ask about Sanskrit, Pāṇinian grammar, lessons, sūtras, or research. Responses show relevant website material; important grammar claims should still be checked against reliable sources.
            </p>
          </div>
          <Link href="/learn" className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#DDD3C2] bg-[#FAF7F2] px-3 text-sm font-semibold text-[#1B4D36] hover:bg-[#F4EFE6]">
            <BookOpen className="h-4 w-4" aria-hidden="true" /> Browse lessons
          </Link>
        </div>
      </header>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-xl border border-[#DDD3C2] bg-[#F4EFE6] p-1" role="group" aria-label="Assistant view">
          <button type="button" aria-pressed={!isSearchView} onClick={() => setIsSearchView(false)} className={`inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold ${!isSearchView ? "bg-[#1B4D36] text-white" : "text-[#455A4F] hover:bg-[#EAE2D4]"}`}>
            <MessageCircle className="h-4 w-4" aria-hidden="true" /> Ask
          </button>
          <button type="button" aria-pressed={isSearchView} onClick={() => setIsSearchView(true)} className={`inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold ${isSearchView ? "bg-[#1B4D36] text-white" : "text-[#455A4F] hover:bg-[#EAE2D4]"}`}>
            <Search className="h-4 w-4" aria-hidden="true" /> Search website
          </button>
        </div>
        {!isSearchView && (
          <button type="button" onClick={startNewQuestion} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#DDD3C2] bg-[#FAF7F2] px-3 text-xs font-semibold text-[#1B4D36] hover:bg-[#F4EFE6]">
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Clear conversation
          </button>
        )}
      </div>

      {isSearchView ? (
        <section className="space-y-5 rounded-2xl border border-[#DDD3C2] bg-[#FAF7F2] p-4 shadow-sm sm:p-6" aria-labelledby="website-search-title">
          <div>
            <h2 id="website-search-title" className="font-serif text-2xl font-bold text-[#0F2D1F]">Search website content</h2>
            <p className="mt-1 text-sm text-[#526359]">Search locally across lessons, Sūtra Library entries, research pages, bibliography, and quiz categories. No model call is made in this view.</p>
          </div>
          <form onSubmit={submitSearch} className="flex flex-col gap-2 sm:flex-row">
            <label htmlFor="assistant-search" className="sr-only">Search website sources</label>
            <input id="assistant-search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} maxLength={1200} placeholder="Try anuvṛtti, 6.1.77, Sandhi, or explainable NLP…" className="min-h-12 min-w-0 flex-1 rounded-lg border border-[#DDD3C2] bg-[#FDFCFA] px-3 text-sm text-[#0F2D1F] outline-none focus-visible:ring-2 focus-visible:ring-[#B38622]" />
            <button type="submit" disabled={isLoading} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#1B4D36] px-5 text-sm font-semibold text-white hover:bg-[#133A29] disabled:opacity-60">
              {isLoading ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Search className="h-4 w-4" aria-hidden="true" />} Search locally
            </button>
          </form>
          {error && <p role="alert" className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-900">{error}</p>}
          {searchMessage && <p role="status" className="text-sm text-[#526359]">{searchMessage}</p>}
          <SourceList sources={searchResults} />
        </section>
      ) : (
        <section className="overflow-hidden rounded-2xl border border-[#DDD3C2] bg-[#FAF7F2] shadow-sm" aria-label="Assistant conversation">
          <div className="space-y-5 p-4 sm:p-6">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" role="group" aria-label="Learning mode">
              {modes.map((item) => (
                <button key={item.id} type="button" aria-pressed={mode === item.id} onClick={() => { setMode(item.id); setError(""); }} className={`min-h-16 rounded-xl border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38622] ${mode === item.id ? "border-[#1B4D36] bg-[#E8F0EC]" : "border-[#DDD3C2] bg-[#FDFCFA] hover:border-[#8C6A24]"}`}>
                  <span className="block text-xs font-bold text-[#1B4D36]">{item.label}</span>
                  <span className="mt-1 block text-[11px] leading-relaxed text-[#526359]">{item.description}</span>
                </button>
              ))}
            </div>
            {mode === "quiz-answer" && (
              <div className={`rounded-lg border p-3 text-xs leading-relaxed ${quizContext ? "border-[#BBD5C5] bg-[#E8F0EC] text-[#1B4D36]" : "border-[#E0CE9E] bg-[#FAF1DA] text-[#614A19]"}`} role="status">
                {quizContextMessage || "Open a submitted question from Quiz Results to provide its answer context. The assistant will not reveal answers for unsubmitted questions."}
                {quizContext && <p className="mt-2"><strong>Submitted:</strong> {quizContext.selectedAnswer} · <strong>Expected:</strong> {quizContext.correctAnswer}</p>}
              </div>
            )}
            {conversation.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#D4AF37]/70 bg-[#FAF1DA]/40 p-5">
                <p className="flex items-center gap-2 font-serif text-lg font-bold text-[#0F2D1F]"><Bot className="h-5 w-5 text-[#8C6A24]" aria-hidden="true" /> Start with a question</p>
                <p className="mt-2 text-sm text-[#526359]">{selectedMode?.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => (
                    <button key={suggestion} type="button" onClick={() => { setQuestion(suggestion); if (mode !== "explain") setMode("explain"); }} className="rounded-full border border-[#DDD3C2] bg-[#FAF7F2] px-3 py-2 text-xs font-medium text-[#1B4D36] hover:border-[#1B4D36] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38622]">
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-h-[55vh] space-y-4 overflow-y-auto rounded-xl border border-[#DDD3C2] bg-[#F4EFE6]/60 p-3 sm:p-5" aria-live="polite" aria-relevant="additions">
                {conversation.map((message) => (
                  <article key={message.id} className={`rounded-xl border p-4 ${message.role === "user" ? "ml-4 border-[#BBD5C5] bg-[#E8F0EC] sm:ml-12" : "mr-2 border-[#DDD3C2] bg-[#FAF7F2] sm:mr-8"}`}>
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs font-bold uppercase tracking-wide text-[#8C6A24]">{message.role === "user" ? "You" : message.provider === "gemini" ? "AI Learning Assistant" : "Website search fallback"}</p>
                      {message.role === "assistant" && <button type="button" onClick={() => void copyAnswer(message)} className="inline-flex min-h-8 items-center gap-1 rounded-md px-2 text-xs font-semibold text-[#1B4D36] hover:bg-[#E8F0EC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38622]">{copiedId === message.id ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Clipboard className="h-3.5 w-3.5" aria-hidden="true" />}{copiedId === message.id ? "Copied" : "Copy"}</button>}
                    </div>
                    {message.role === "assistant" ? <FormattedAnswer content={message.content} /> : <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#1B4D36]">{message.content}</p>}
                    {message.role === "assistant" && <SourceList sources={message.sources ?? []} />}
                  </article>
                ))}
                {isLoading && <div className="flex items-center gap-2 rounded-xl border border-[#DDD3C2] bg-[#FAF7F2] p-4 text-sm text-[#526359]" role="status"><LoaderCircle className="h-4 w-4 animate-spin text-[#8C6A24]" aria-hidden="true" /> Searching website content and preparing a response…</div>}
                <div ref={responseEndRef} />
              </div>
            )}
            {error && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-900" role="alert">
                <span>{error}</span>
                <button type="button" onClick={() => {
                  void submitQuestion(retryQuestion);
                }} disabled={!retryQuestion} className="inline-flex min-h-9 items-center gap-1 rounded-md border border-red-300 px-3 text-xs font-bold hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"><RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Retry</button>
              </div>
            )}
            {providerNotice && <p className="rounded-lg border border-[#E0CE9E] bg-[#FAF1DA]/70 p-3 text-xs leading-relaxed text-[#614A19]" role="status">{providerNotice}</p>}
            <form onSubmit={handleSubmit} className="space-y-2 border-t border-[#DDD3C2] pt-4">
              <label htmlFor="assistant-question" className="block text-xs font-semibold text-[#455A4F]">Your question · {question.length}/1,200 characters</label>
              <div className="flex flex-col gap-2 sm:flex-row">
                <textarea
                  id="assistant-question"
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
                      event.preventDefault();
                      void submitQuestion(question);
                    }
                  }}
                  maxLength={1200}
                  rows={3}
                  placeholder="Ask anything about Sanskrit, Pāṇinian grammar, Sandhi, Samāsa, sūtras, or NLP…"
                  className="min-h-20 min-w-0 flex-1 resize-y rounded-lg border border-[#DDD3C2] bg-[#FDFCFA] px-3 py-3 text-sm leading-relaxed text-[#0F2D1F] outline-none placeholder:text-[#6A7F73] focus-visible:ring-2 focus-visible:ring-[#B38622]"
                />
                <button type="submit" disabled={!question.trim() || isLoading} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#1B4D36] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#133A29] disabled:cursor-not-allowed disabled:opacity-50 sm:self-end">
                  {isLoading ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />} Ask
                </button>
              </div>
              <div className="flex flex-wrap justify-between gap-2 text-[11px] text-[#6A7F73]">
                <span>Press Ctrl/⌘ + Enter to send. Conversation is held in this page session.</span>
                <span>Educational aid only; check important claims against reliable sources.</span>
              </div>
            </form>
          </div>
        </section>
      )}

      <p className="text-xs leading-relaxed text-[#6A7F73]">
        Website passages come from local lessons, the Sūtra Library, research pages, bibliography, and practice categories. Sūtra entries may contain editorial wording; consult the linked source before treating an interpretation as authoritative.
      </p>
      <Link href="/references" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1B4D36] underline">
        Browse References &amp; Bibliography <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}

export default LearningAssistantContent;
