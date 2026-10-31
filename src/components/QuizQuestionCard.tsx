"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, CircleHelp, XCircle } from "lucide-react";
import type { QuizQuestion } from "../data/quizData";

interface QuizQuestionCardProps {
  question: QuizQuestion;
  selectedAnswerIndex: number | null;
  submittedAnswerIndex: number | null;
  onSelectAnswer: (index: number) => void;
  onSubmitAnswer: () => void;
  onHintViewed: () => void;
  lesson?: { id: string; titleEng: string };
}

export function QuizAnswerFeedback({
  question,
  selectedAnswerIndex,
  lesson,
}: Pick<QuizQuestionCardProps, "question" | "selectedAnswerIndex" | "lesson">) {
  const isCorrect = selectedAnswerIndex === question.correctAnswerIndex;
  const selectedExplanation = selectedAnswerIndex === null
    ? null
    : question.optionExplanations?.[selectedAnswerIndex];

  return (
    <section className="space-y-3 rounded-xl border border-[#BBD5C5] bg-[#E8F0EC] p-4 sm:p-5" aria-live="polite" aria-label="Answer feedback">
      <h3 className={`flex items-center gap-2 text-sm font-bold ${isCorrect ? "text-[#1B4D36]" : "text-[#7F1D1D]"}`}>
        {isCorrect
          ? <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
          : <XCircle className="h-5 w-5 shrink-0" aria-hidden="true" />}
        {isCorrect ? "Correct answer" : "Not quite — review the explanation"}
      </h3>
      <p className="text-sm leading-relaxed text-[#263C30]">
        <strong>Correct answer: </strong>{question.options[question.correctAnswerIndex]}
      </p>
      {!isCorrect && selectedAnswerIndex !== null && (
        <p className="text-sm leading-relaxed text-[#5C3030]">
          <strong>Your choice: </strong>{question.options[selectedAnswerIndex]}.{" "}
          {selectedExplanation ?? "This choice does not best fit the distinction asked about. Compare its role with the correct explanation below."}
        </p>
      )}
      <p className="text-sm leading-relaxed text-[#263C30]">
        <strong>Why: </strong>{question.explanation || "An explanation for this question is not yet available; this item has been flagged for editorial review."}
      </p>
      <p className="text-xs leading-relaxed text-[#465A4F]">
        <strong>Concept / reference: </strong>{question.sutraCitation || "No verified sūtra reference is available for this question."}
      </p>
      {lesson && (
        <Link href={`/learn#lesson-${lesson.id}`} className="inline-flex items-center gap-1 text-xs font-semibold text-[#1B4D36] underline underline-offset-2">
          Review lesson: {lesson.titleEng}
        </Link>
      )}
    </section>
  );
}

export default function QuizQuestionCard({
  question,
  selectedAnswerIndex,
  submittedAnswerIndex,
  onSelectAnswer,
  onSubmitAnswer,
  onHintViewed,
  lesson,
}: QuizQuestionCardProps) {
  const [hintOpen, setHintOpen] = useState(false);
  const isSubmitted = submittedAnswerIndex !== null;

  const toggleHint = () => {
    const nextOpen = !hintOpen;
    setHintOpen(nextOpen);
    if (nextOpen) onHintViewed();
  };

  return (
    <div className="space-y-5">
      {question.questionSanskrit && (
        <p className="font-serif text-2xl font-bold text-[#0F2D1F] sm:text-3xl">{question.questionSanskrit}</p>
      )}
      <h2 className="text-sm font-medium leading-relaxed text-[#33463B] sm:text-base">{question.question}</h2>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={toggleHint}
          aria-expanded={hintOpen}
          aria-controls={`question-hint-${question.id}`}
          className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#E0CE9E] bg-[#FAF1DA] px-3 py-2 text-xs font-semibold text-[#73551a] hover:bg-[#F3E5C3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4D36] disabled:opacity-60"
        >
          <CircleHelp className="h-4 w-4" aria-hidden="true" />
          {hintOpen ? "Hide Hint" : "Show Hint"}
        </button>
      </div>
      {hintOpen && (
        <p id={`question-hint-${question.id}`} className="rounded-lg border border-[#E0CE9E] bg-[#FAF1DA]/70 p-3 text-sm leading-relaxed text-[#614A19]" role="status">
          {question.hint || "Hint unavailable for this item; this question has been flagged for review."}
        </p>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2" role="group" aria-label="Answer options">
        {question.options.map((option, index) => {
          const selected = selectedAnswerIndex === index;
          const submitted = isSubmitted;
          const correctOption = submitted && index === question.correctAnswerIndex;
          const wrongSelected = submitted && selected && !correctOption;
          const style = correctOption
            ? "border-[#1B4D36] bg-[#E8F0EC] text-[#0F2D1F]"
            : wrongSelected
              ? "border-[#9B1C1C] bg-[#FAF3F3] text-[#5C2020]"
              : selected
                ? "border-[#B38622] bg-[#FAF1DA] text-[#0F2D1F]"
                : "border-[#DDD3C2] bg-[#FDFCFA] text-[#0F2D1F] hover:bg-[#F7F2E9]";
          return (
            <button
              key={`${question.id}-${index}`}
              type="button"
              disabled={submitted}
              aria-pressed={selected}
              onClick={() => onSelectAnswer(index)}
              className={`flex min-h-12 items-center justify-between gap-3 rounded-xl border p-4 text-left font-serif text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4D36] ${style}`}
            >
              <span>{option}</span>
              {correctOption && <span className="shrink-0 text-xs font-bold">Correct</span>}
              {wrongSelected && <span className="shrink-0 text-xs font-bold">Your selection</span>}
              {selected && !submitted && <span className="shrink-0 text-xs font-bold">Selected</span>}
            </button>
          );
        })}
      </div>

      {!isSubmitted ? (
        <button
          type="button"
          disabled={selectedAnswerIndex === null}
          onClick={onSubmitAnswer}
          className="min-h-11 rounded-lg bg-[#1B4D36] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#123625] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B38622] disabled:cursor-not-allowed disabled:opacity-45"
        >
          Submit Answer
        </button>
      ) : (
        <QuizAnswerFeedback question={question} selectedAnswerIndex={submittedAnswerIndex} lesson={lesson} />
      )}
    </div>
  );
}
