"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, BookOpen, CheckCircle2, RotateCcw, Trophy, XCircle } from "lucide-react";
import Citation from "../../components/Citation";
import { GRAMMAR_LESSONS } from "../../data/learningData";
import { QUIZ_CATEGORIES } from "../../data/quizData";
import { readLatestQuizResultId, readQuizResult, QuizResultRecord } from "../../lib/quizResults";

type ReviewFilter = "all" | "correct" | "incorrect" | "unanswered";

function scoreAssessment(percentage: number) {
  if (percentage >= 90) return {
    title: "Excellent command",
    description: "Strong performance on the questions attempted.",
  };
  if (percentage >= 75) return {
    title: "Good understanding",
    description: "Good grasp of the tested concepts, with a few areas to revise.",
  };
  if (percentage >= 60) return {
    title: "Developing understanding",
    description: "Several concepts are understood, and additional practice can help.",
  };
  if (percentage >= 40) return {
    title: "Needs more practice",
    description: "Review the lessons and practise the weaker topics.",
  };
  return {
    title: "Foundation building",
    description: "Revisit introductory lessons and work through examples before trying again.",
  };
}

function QuizResultsContent() {
  const searchParams = useSearchParams();
  const resultId = searchParams.get("id");
  const progressSaveFailed = searchParams.get("progressSave") === "failed";
  const openedFromHistory = searchParams.get("source") === "history";
  const [result, setResult] = useState<QuizResultRecord | null>(null);
  const [error, setError] = useState("");
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>("all");
  const [isHistorical, setIsHistorical] = useState(openedFromHistory);

  useEffect(() => {
    setResult(null);
    setError("");
    setIsHistorical(openedFromHistory);
    if (!resultId) {
      setError("No quiz result was specified. Results are available after a quiz is submitted.");
      return;
    }
    try {
      const saved = readQuizResult(resultId);
      if (!saved) {
        setError("This result is not available in this browser. It may have been cleared or created in another browser.");
        return;
      }
      setResult(saved);
      setIsHistorical(openedFromHistory || readLatestQuizResultId() !== saved.id);
    } catch {
      setError("The saved result could not be read. Check this browser's storage settings and try again.");
    }
  }, [openedFromHistory, resultId]);

  const metrics = useMemo(() => {
    if (!result) return null;
    const total = result.questions.length;
    const attempted = result.questions.filter((question) => question.selectedAnswerIndex !== null).length;
    const correct = result.questions.filter((question) => question.selectedAnswerIndex === question.correctAnswerIndex).length;
    const incorrect = attempted - correct;
    const unanswered = total - attempted;
    return {
      total,
      attempted,
      correct,
      incorrect,
      unanswered,
      percentage: total ? Math.round((correct / total) * 100) : 0,
    };
  }, [result]);

  const topicStats = useMemo(() => {
    if (!result) return [];
    return QUIZ_CATEGORIES.flatMap((category) => {
      const questions = result.questions.filter((question) => question.category === category);
      if (!questions.length) return [];
      const attempted = questions.filter((question) => question.selectedAnswerIndex !== null);
      const correct = attempted.filter((question) => question.selectedAnswerIndex === question.correctAnswerIndex).length;
      const incorrect = attempted.length - correct;
      return [{
        category,
        total: questions.length,
        attempted: attempted.length,
        correct,
        incorrect,
        percentage: attempted.length ? Math.round((correct / attempted.length) * 100) : 0,
      }];
    });
  }, [result]);

  const recommendations = useMemo(() => {
    if (!result) return [];
    const incorrectCategories = result.questions
      .filter((question) => question.selectedAnswerIndex !== question.correctAnswerIndex)
      .map((question) => question.category);
    const orderedCategories = [...new Set(incorrectCategories)];
    if (!orderedCategories.length) {
      const lowestTopic = [...topicStats]
        .filter((topic) => topic.attempted > 0)
        .sort((a, b) => a.percentage - b.percentage)[0];
      if (lowestTopic) orderedCategories.push(lowestTopic.category);
    }
    return orderedCategories.slice(0, 3).map((category) => ({
      category,
      lesson: GRAMMAR_LESSONS.find((lesson) => lesson.lessonQuizCategory === category),
    }));
  }, [result, topicStats]);

  const answerReview = useMemo(() => {
    if (!result) return [];
    return result.questions
      .map((question, index) => ({ question, index }))
      .filter(({ question }) => {
        const unanswered = question.selectedAnswerIndex === null;
        const correct = question.selectedAnswerIndex === question.correctAnswerIndex;
        if (reviewFilter === "correct") return correct;
        if (reviewFilter === "incorrect") return !unanswered && !correct;
        if (reviewFilter === "unanswered") return unanswered;
        return true;
      });
  }, [result, reviewFilter]);

  if (error) {
    return (
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-12 sm:px-8">
        <header className="space-y-3 border-b border-[#E3D9C8] pb-6">
          <nav aria-label="Breadcrumb" className="flex gap-2 text-xs text-[#6A7F73]">
            <Link href="/" className="hover:underline">Home</Link><span aria-hidden="true">›</span>
            <Link href="/practice" className="hover:underline">Quiz Centre</Link><span aria-hidden="true">›</span>
            <span>Quiz Results</span>
          </nav>
          <h1 className="font-serif text-3xl font-bold text-[#0F2D1F] sm:text-5xl">Quiz Results</h1>
        </header>
        <p role="status" className="rounded-xl border border-[#E0CE9E] bg-[#FAF1DA] p-5 text-sm leading-relaxed text-[#614A19]">{error}</p>
        <Link href="/practice" className="inline-flex items-center gap-2 rounded-lg bg-[#1B4D36] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#123625]">
          Back to Quiz Centre <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }
  if (!result || !metrics) {
    return <div className="mx-auto max-w-4xl px-4 py-12 text-sm text-[#526359]" role="status">Loading saved quiz result…</div>;
  }

  const assessment = scoreAssessment(metrics.percentage);
  const primaryRecommendation = recommendations[0];
  const primaryLesson = primaryRecommendation?.lesson ?? GRAMMAR_LESSONS[0];
  const retryCategory = result.mode === "category"
    ? result.category
    : result.questions[0]?.category ?? QUIZ_CATEGORIES[0];
  const retryHref = `/practice?mode=${encodeURIComponent(result.mode)}&category=${encodeURIComponent(retryCategory)}&difficulty=${encodeURIComponent(result.difficulty)}`;

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-8">
      <header className="space-y-3 border-b border-[#E3D9C8] pb-6">
        <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-xs text-[#6A7F73]">
          <Link href="/" className="hover:underline">Home</Link><span aria-hidden="true">›</span>
          <Link href="/practice" className="hover:underline">Quiz Centre</Link><span aria-hidden="true">›</span>
          <span>Quiz Results</span>
        </nav>
        <p className="inline-flex items-center gap-2 rounded-full border border-[#E0CE9E] bg-[#FAF1DA] px-3 py-1 text-xs font-semibold text-[#8C6A24]">
          <Trophy className="h-4 w-4" aria-hidden="true" /> {isHistorical ? "Saved historical attempt" : "Current submitted attempt"}
        </p>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-[#0F2D1F] sm:text-5xl">Quiz Results</h1>
        <p className="text-sm text-[#465A4F]">{result.quizName} · {result.category}</p>
      </header>

      <section aria-label="Score summary" className="grid gap-5 lg:grid-cols-[1.2fr_2fr]">
        <article className="flex flex-col items-center justify-center rounded-2xl border-2 border-[#D4AF37]/50 bg-[#FAF7F2] p-6 text-center shadow-sm">
          <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#E0CE9E] bg-[#FAF1DA] text-[#8C6A24]">
            <Trophy className="h-8 w-8" aria-hidden="true" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#6A7F73]">Score</p>
          <p className="mt-1 font-serif text-5xl font-bold text-[#1B4D36]">{metrics.percentage}%</p>
          <p className="mt-2 text-sm text-[#465A4F]">{metrics.correct} of {metrics.total} marks</p>
          <p className="mt-4 text-xs text-[#6A7F73]">
            Attempt date: <time dateTime={result.completedAt}>{new Date(result.completedAt).toLocaleString()}</time>
          </p>
        </article>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["Total questions", metrics.total],
            ["Total marks", metrics.total],
            ["Attempted", metrics.attempted],
            ["Correct answers", metrics.correct],
            ["Incorrect answers", metrics.incorrect],
            ["Unanswered", metrics.unanswered],
            ["Marks obtained", metrics.correct],
            ["Score percentage", `${metrics.percentage}%`],
          ].map(([label, value]) => (
            <article key={label} className="rounded-xl border border-[#DDD3C2] bg-[#FAF7F2] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#6A7F73]">{label}</p>
              <p className="mt-1 font-serif text-2xl font-bold text-[#1B4D36]">{value}</p>
            </article>
          ))}
        </div>
      </section>
      {progressSaveFailed && (
        <p role="status" className="rounded-lg border border-[#E0CE9E] bg-[#FAF1DA] p-4 text-sm text-[#614A19]">
          The detailed quiz result is saved in this browser, but the separate progress dashboard could not save this attempt.
        </p>
      )}

      <section className="rounded-xl border border-[#E0CE9E] bg-[#FAF1DA]/60 p-5 sm:p-6" aria-labelledby="assessment-title">
        <h2 id="assessment-title" className="font-serif text-2xl font-bold text-[#0F2D1F]">{assessment.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#465A4F]">{assessment.description}</p>
        <p className="mt-3 border-t border-[#E0CE9E] pt-3 text-xs leading-relaxed text-[#614A19]">
          This is indicative feedback based on this quiz attempt only, not a formal certification or proof of comprehensive Sanskrit knowledge.
        </p>
      </section>

      <section className="space-y-4" aria-labelledby="actions-title">
        <h2 id="actions-title" className="font-serif text-2xl font-bold text-[#0F2D1F]">What next?</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link href={retryHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#1B4D36] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-[#123625]">
            <RotateCcw className="h-4 w-4" /> Retry Quiz
          </Link>
          <a href="#answer-review" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#DDD3C2] bg-[#FAF7F2] px-4 py-3 text-center text-sm font-semibold text-[#1B4D36] hover:bg-[#F4EFE6]">
            <CheckCircle2 className="h-4 w-4" /> Review Answers
          </a>
          <Link href={primaryRecommendation ? `/practice?category=${encodeURIComponent(primaryRecommendation.category)}` : "/practice"} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#E0CE9E] bg-[#FAF1DA] px-4 py-3 text-center text-sm font-semibold text-[#73551a] hover:bg-[#F3E5C3]">
            Practise Weak Topics <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href={`/learn#lesson-${primaryLesson.id}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#DDD3C2] bg-[#FAF7F2] px-4 py-3 text-center text-sm font-semibold text-[#1B4D36] hover:bg-[#F4EFE6]">
            <BookOpen className="h-4 w-4" /> Continue Learning
          </Link>
          <Link href="/practice" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#DDD3C2] bg-[#FAF7F2] px-4 py-3 text-center text-sm font-semibold text-[#1B4D36] hover:bg-[#F4EFE6]">
            Back to Quiz Centre
          </Link>
          <Link href="/progress" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#DDD3C2] bg-[#FAF7F2] px-4 py-3 text-center text-sm font-semibold text-[#1B4D36] hover:bg-[#F4EFE6]">
            View Progress
          </Link>
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="topic-analysis-title">
        <div>
          <h2 id="topic-analysis-title" className="font-serif text-2xl font-bold text-[#0F2D1F]">Topic-wise performance</h2>
          <p className="mt-1 text-sm text-[#526359]">Topic percentages use answered questions only. Small samples are limited evidence.</p>
        </div>
        {topicStats.length ? (
          <div className="grid gap-3 md:grid-cols-2">
            {topicStats.map((topic) => {
              const signal = topic.attempted < 3
                ? "Limited evidence"
                : topic.incorrect > 0
                  ? "Missed answers to review"
                : topic.percentage >= 80
                  ? "Strong in this attempt"
                  : topic.percentage < 60
                    ? "Consider revising"
                    : "Keep practising";
              return (
                <article key={topic.category} className={`rounded-xl border p-4 ${topic.incorrect > 0 ? "border-[#E0CE9E] bg-[#FAF1DA]/40" : "border-[#DDD3C2] bg-[#FAF7F2]"}`}>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-[#0F2D1F]">{topic.category}</h3>
                    <span className="rounded-full bg-[#F4EFE6] px-2 py-1 text-[11px] font-semibold text-[#73551a]">{signal}</span>
                  </div>
                  <p className="mt-2 text-xs text-[#526359]">{topic.attempted} attempted of {topic.total} · {topic.correct} correct · {topic.incorrect} incorrect · {topic.percentage}%</p>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#EAE1D3]" role="progressbar" aria-label={`${topic.category} score`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={topic.percentage}>
                    <div className="h-full rounded-full bg-[#1B4D36]" style={{ width: `${topic.percentage}%` }} />
                  </div>
                </article>
              );
            })}
          </div>
        ) : <p className="rounded-lg bg-[#F4EFE6] p-4 text-sm text-[#526359]">No topic questions were available in this attempt.</p>}
      </section>

      <section className="space-y-4" aria-labelledby="recommendations-title">
        <h2 id="recommendations-title" className="font-serif text-2xl font-bold text-[#0F2D1F]">Personalized recommendations</h2>
        {recommendations.length ? (
          <div className="grid gap-3 md:grid-cols-2">
            {recommendations.map(({ category, lesson }) => (
              <article key={category} className="space-y-3 rounded-xl border border-[#DDD3C2] bg-[#FAF7F2] p-4">
                <h3 className="text-sm font-semibold text-[#0F2D1F]">Revisit {category}</h3>
                <p className="text-xs leading-relaxed text-[#526359]">
                  This topic included an incorrect or unanswered response. Use the quiz and lesson to practise; one attempt is not a complete measure of topic mastery.
                </p>
                <div className="flex flex-wrap gap-3 text-xs font-semibold">
                  <Link className="text-[#1B4D36] underline" href={`/practice?category=${encodeURIComponent(category)}`}>Practise {category}</Link>
                  {lesson && <Link className="text-[#1B4D36] underline" href={`/learn#lesson-${lesson.id}`}>Review: {lesson.titleEng}</Link>}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-[#BBD5C5] bg-[#E8F0EC] p-4 text-sm text-[#1B4D36]">
            No incorrect answers were recorded in this attempt. Continue with another topic or review the lessons for deeper practice.
          </p>
        )}
      </section>

      <section id="answer-review" className="scroll-mt-28 space-y-4" aria-labelledby="answer-review-title">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="answer-review-title" className="font-serif text-2xl font-bold text-[#0F2D1F]">Answer review</h2>
            <p className="mt-1 text-sm text-[#526359]">Your submitted answers and explanations are stored locally in this browser.</p>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter answer review">
            {([
              ["all", `All questions (${metrics.total})`],
              ["correct", `Correct (${metrics.correct})`],
              ["incorrect", `Incorrect (${metrics.incorrect})`],
              ["unanswered", `Unanswered (${metrics.unanswered})`],
            ] as const).map(([filter, label]) => (
              <button
                key={filter}
                type="button"
                aria-pressed={reviewFilter === filter}
                onClick={() => setReviewFilter(filter)}
                className={`rounded-lg border px-3 py-2 text-xs font-semibold ${reviewFilter === filter ? "border-[#1B4D36] bg-[#1B4D36] text-white" : "border-[#DDD3C2] bg-[#FAF7F2] text-[#1B4D36]"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          {answerReview.map(({ question, index }) => {
            const answered = question.selectedAnswerIndex !== null;
            const correct = question.selectedAnswerIndex === question.correctAnswerIndex;
            const lesson = GRAMMAR_LESSONS.find((item) => item.lessonQuizCategory === question.category);
            return (
              <article key={question.id} className={`rounded-xl border p-4 sm:p-5 ${correct ? "border-[#BBD5C5] bg-[#E8F0EC]/50" : "border-[#E8C2C2] bg-[#FAF3F3]/60"}`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-mono font-semibold text-[#526359]">Question {index + 1} · {question.category}</p>
                  <p className={`inline-flex items-center gap-1 text-xs font-semibold ${correct ? "text-[#1B4D36]" : "text-[#9B1C1C]"}`}>
                    {correct ? <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> : <XCircle className="h-4 w-4" aria-hidden="true" />}
                    {correct ? "Correct" : answered ? "Incorrect" : "Unanswered"}
                  </p>
                </div>
                {question.questionSanskrit && <p className="mt-3 font-serif text-lg font-semibold text-[#0F2D1F]">{question.questionSanskrit}</p>}
                <h3 className="mt-2 text-sm font-semibold leading-relaxed text-[#0F2D1F]">{question.question}</h3>
                <dl className="mt-3 space-y-2 text-sm">
                  <div><dt className="inline font-semibold text-[#33463B]">Your answer: </dt><dd className={`inline ${correct ? "text-[#1B4D36]" : "text-[#9B1C1C]"}`}>{question.selectedAnswerIndex !== null ? question.options[question.selectedAnswerIndex] : "Not answered"}</dd></div>
                  <div><dt className="inline font-semibold text-[#33463B]">Correct answer: </dt><dd className="inline font-medium text-[#1B4D36]">{question.options[question.correctAnswerIndex]}</dd></div>
                </dl>
                <p className="mt-3 border-t border-[#DDD3C2] pt-3 text-sm leading-relaxed text-[#465A4F]">
                  {question.explanation} <span className="font-mono text-xs text-[#73551a]">({question.sutraCitation})</span>
                  {question.citationNumbers.length > 0 && <> <Citation numbers={question.citationNumbers} /></>}
                </p>
                {question.hint && (
                  <p className="mt-2 rounded-lg border border-[#E0CE9E] bg-[#FAF1DA]/60 p-3 text-xs leading-relaxed text-[#614A19]">
                    <strong>Revision hint:</strong> {question.hint}
                    {question.hintViewed && <span className="ml-1">(shown during this attempt)</span>}
                  </p>
                )}
                {question.selectedAnswerIndex !== null &&
                  question.selectedAnswerIndex !== question.correctAnswerIndex &&
                  question.optionExplanations?.[question.selectedAnswerIndex] && (
                    <p className="mt-2 text-xs leading-relaxed text-[#5C3030]">
                      <strong>About your selected option:</strong> {question.optionExplanations[question.selectedAnswerIndex]}
                    </p>
                  )}
                <p className="mt-2 text-xs leading-relaxed text-[#526359]">{question.sourceNote}</p>
                {lesson && <Link href={`/learn#lesson-${lesson.id}`} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#1B4D36] underline">Related lesson: {lesson.titleEng} <ArrowRight className="h-3 w-3" /></Link>}
                {answered && (
                  <Link
                    href={`/assistant?quizResultId=${encodeURIComponent(result.id)}&questionId=${encodeURIComponent(question.id)}`}
                    className="mt-3 inline-flex items-center gap-1 rounded-lg border border-[#DDD3C2] bg-[#FAF7F2] px-3 py-2 text-xs font-semibold text-[#1B4D36] hover:bg-[#F4EFE6]"
                  >
                    Ask assistant about this submitted answer <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </Link>
                )}
              </article>
            );
          })}
          {!answerReview.length && <p className="rounded-lg bg-[#F4EFE6] p-4 text-sm text-[#526359]">No questions match this filter.</p>}
        </div>
      </section>

      <p className="border-t border-[#E3D9C8] pt-4 text-xs leading-relaxed text-[#6A7F73]">
        This result is saved in local browser storage only. Clearing site data or using another browser/device may remove or hide it.
      </p>
    </div>
  );
}

export default function QuizResultsPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-4xl px-4 py-12 text-sm text-[#526359]" role="status">Loading quiz result…</div>}>
      <QuizResultsContent />
    </Suspense>
  );
}
