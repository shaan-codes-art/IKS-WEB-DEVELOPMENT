"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import QuizQuestionCard from "../../components/QuizQuestionCard";
import { GRAMMAR_LESSONS } from "../../data/learningData";
import { QUIZ_CATEGORIES, QUIZ_CONTENT_AUDIT, QUIZ_QUESTION_COUNTS, QuizCategory, QuizDifficulty, VERIFIED_QUIZ_QUESTIONS } from "../../data/quizData";
import { createQuizSession, DEFAULT_QUIZ_CATEGORY, QuizMode, QuizSessionQuestion } from "../../lib/quizSession";
import { QuizResultRecord, saveQuizResult } from "../../lib/quizResults";
import { EMPTY_PROGRESS, LearningProgress, readLearningProgress, saveLearningProgress } from "../../lib/learningProgress";
import {
  Award,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Trophy,
} from "lucide-react";

function PracticeQuizContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedCategory = searchParams.get("category");
  const requestedMode = searchParams.get("mode");
  const requestedDifficulty = searchParams.get("difficulty");
  const [mode, setMode] = useState<QuizMode>("category");
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory>(DEFAULT_QUIZ_CATEGORY);
  const [difficulty, setDifficulty] = useState<QuizDifficulty | "All">("All");
  const [activeMode, setActiveMode] = useState<QuizMode>("category");
  const [activeCategory, setActiveCategory] = useState<QuizCategory>(DEFAULT_QUIZ_CATEGORY);
  const [activeDifficulty, setActiveDifficulty] = useState<QuizDifficulty | "All">("All");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, number>>({});
  const [hintViewed, setHintViewed] = useState<Record<string, boolean>>({});
  const [sessionReady, setSessionReady] = useState(false);
  const [sessionQuestions, setSessionQuestions] = useState<QuizSessionQuestion[]>([]);
  const [progress, setProgress] = useState<LearningProgress>(EMPTY_PROGRESS);
  const [quizMessage, setQuizMessage] = useState("");
  const submissionStarted = useRef(false);

  useEffect(() => {
    try {
      setProgress(readLearningProgress());
    } catch {
      setQuizMessage("Saved progress could not be loaded; this quiz will continue without the previous attempt history.");
    }
  }, []);

  useEffect(() => {
    const category = QUIZ_CATEGORIES.find((item) => item === requestedCategory);
    const validModes: QuizMode[] = ["category", "mixed", "practice", "challenge"];
    const initialMode = validModes.find((item) => item === requestedMode) ?? "category";
    const initialCategory = category ?? DEFAULT_QUIZ_CATEGORY;
    const validDifficulties: (QuizDifficulty | "All")[] = ["All", "Beginner", "Intermediate", "Advanced"];
    const initialDifficulty = validDifficulties.find((item) => item === requestedDifficulty) ?? "All";
    const questions = createQuizSession(initialMode, initialCategory, initialDifficulty);
    setMode(initialMode);
    setSelectedCategory(initialCategory);
    setDifficulty(initialDifficulty);
    setSessionQuestions(questions);
    setActiveMode(initialMode);
    setActiveCategory(initialCategory);
    setActiveDifficulty(initialDifficulty);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setSubmittedAnswers({});
    setHintViewed({});
    submissionStarted.current = false;
    setQuizMessage("");
    setSessionReady(true);
  }, [requestedCategory, requestedDifficulty, requestedMode]);

  const currentQ = sessionQuestions[currentQuestionIndex];
  const selectedAnswer = currentQ ? userAnswers[currentQ.id] ?? null : null;
  const submittedAnswer = currentQ ? submittedAnswers[currentQ.id] ?? null : null;
  const answeredCount = Object.keys(submittedAnswers).length;
  const filteredQuestionCount = VERIFIED_QUIZ_QUESTIONS.filter((question) => {
    if (mode === "category" && question.category !== selectedCategory) return false;
    if (mode === "challenge" && question.difficulty !== "Advanced") return false;
    if (mode !== "challenge" && difficulty !== "All" && question.difficulty !== difficulty) return false;
    return true;
  }).length;
  const availableQuizCount = mode === "mixed"
    ? Math.min(20, filteredQuestionCount)
    : mode === "challenge"
      ? Math.min(15, filteredQuestionCount)
      : filteredQuestionCount;
  const score = useMemo(
    () => sessionQuestions.reduce((count, question) => count + (submittedAnswers[question.id] === question.correctAnswerIndex ? 1 : 0), 0),
    [sessionQuestions, submittedAnswers],
  );
  const percentage = sessionQuestions.length ? Math.round((score / sessionQuestions.length) * 100) : 0;

  const handleSelectOption = (index: number) => {
    if (!currentQ || submittedAnswer !== null) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: index,
    }));
  };

  const handleSubmitAnswer = () => {
    if (!currentQ || selectedAnswer === null || submittedAnswer !== null) return;
    setSubmittedAnswers((prev) => ({ ...prev, [currentQ.id]: selectedAnswer }));
  };

  const handleNext = () => {
    if (submittedAnswer !== null && currentQuestionIndex < sessionQuestions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
    }
  };

  const handleReset = () => {
    const questions = createQuizSession(mode, selectedCategory, difficulty);
    if (!questions.length) {
      setQuizMessage("No questions match these filters. Choose another difficulty or category.");
      return;
    }
    setSessionQuestions(questions);
    setSessionReady(true);
    setActiveMode(mode);
    setActiveCategory(selectedCategory);
    setActiveDifficulty(difficulty);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setSubmittedAnswers({});
    setHintViewed({});
    submissionStarted.current = false;
    setQuizMessage("");
  };

  const handleStartQuiz = () => {
    const questions = createQuizSession(mode, selectedCategory, difficulty);
    if (!questions.length) {
      setQuizMessage("No questions match these filters. Choose another difficulty or category.");
      return;
    }
    setSessionQuestions(questions);
    setSessionReady(true);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setSubmittedAnswers({});
    setHintViewed({});
    submissionStarted.current = false;
    setQuizMessage("");
    setActiveMode(mode);
    setActiveCategory(selectedCategory);
    setActiveDifficulty(difficulty);
  };

  const handleFinishQuiz = async () => {
    if (
      submissionStarted.current ||
      !currentQ ||
      currentQuestionIndex !== sessionQuestions.length - 1 ||
      submittedAnswers[currentQ.id] === undefined
    ) return;
    submissionStarted.current = true;
    const completedAt = new Date().toISOString();
    const resultId = `quiz-${Date.now()}`;
    const resultCategory = activeMode === "category"
      ? activeCategory
      : activeMode === "challenge"
        ? "Advanced challenge"
        : activeMode === "mixed"
          ? "Mixed topics"
          : "All topics";
    const quizName = activeMode === "category"
      ? `${activeCategory} quiz`
      : activeMode === "challenge"
        ? "Advanced challenge"
        : activeMode === "mixed"
          ? "Mixed-topic quiz"
          : "Full practice quiz";
    const result: QuizResultRecord = {
      id: resultId,
      completedAt,
      mode: activeMode,
      difficulty: activeDifficulty,
      category: resultCategory,
      quizName,
      questions: sessionQuestions.map((question) => ({
        id: question.id,
        sourceQuestionId: question.sourceQuestionId,
        category: question.category,
        difficulty: question.difficulty,
        question: question.question,
        questionSanskrit: question.questionSanskrit,
        options: question.options,
        correctAnswerIndex: question.correctAnswerIndex,
        selectedAnswerIndex: submittedAnswers[question.id] ?? null,
        hint: question.hint,
        hintViewed: hintViewed[question.id] ?? false,
        explanation: question.explanation,
        optionExplanations: question.optionExplanations,
        sourceNote: question.sourceNote,
        sutraCitation: question.sutraCitation,
        citationNumbers: question.citationNumbers,
      })),
    };
    saveQuizResult(result);

    const incorrectQuestions = sessionQuestions.filter((question) => submittedAnswers[question.id] !== question.correctAnswerIndex);
    const attempt = {
      id: resultId,
      resultId,
      completedAt,
      mode: activeMode,
      category: resultCategory,
      score,
      total: sessionQuestions.length,
      percentage,
      incorrectQuestionIds: incorrectQuestions.map((question) => question.sourceQuestionId),
      incorrectCategories: [...new Set(incorrectQuestions.map((question) => question.category))],
    };
    const nextProgress = { ...progress, quizAttempts: [attempt, ...progress.quizAttempts].slice(0, 50) };
    let progressSaveFailed = false;
    try {
      saveLearningProgress(nextProgress);
      setProgress(nextProgress);
      setQuizMessage("");
    } catch {
      progressSaveFailed = true;
    }
    router.push(`/quiz-results?id=${encodeURIComponent(resultId)}${progressSaveFailed ? "&progressSave=failed" : ""}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="border-b border-[#E3D9C8] pb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#6A7F73]">
          <Link href="/" className="hover:text-[#1B4D36] transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-[#8C6A24] font-medium">Core Architecture Section</span>
          <span>&gt;</span>
          <span className="text-[#0F2D1F] font-semibold">Practice and Quiz</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF1DA] text-[#8C6A24] text-xs font-semibold border border-[#E0CE9E]">
            <Award className="w-3.5 h-3.5 text-[#B38622]" />
            <span>Section 5 &bull; Formative Assessment Module</span>
          </div>

          <div className="text-xs font-mono text-[#1B4D36] bg-[#E8F0EC] px-3 py-1 rounded border border-[#BBD5C5]">
            Question Bank: {VERIFIED_QUIZ_QUESTIONS.length} Questions
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0F2D1F] tracking-tight leading-tight">
            Practice & Grammatical Diagnostic Quiz
          </h1>
          <p className="text-sm sm:text-base text-[#465A4F] max-w-3xl leading-relaxed">
            Choose category quizzes, mixed-topic sets, full-bank practice, or an advanced challenge. Options are shuffled for each session, with immediate explanations and review.
          </p>
        </div>
      </div>

      <section className="space-y-4 rounded-xl border border-[#DDD3C2] bg-[#F4EFE6] p-4" aria-label="Quiz setup">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Quiz mode">
          {([
            ["category", "Category quiz"],
            ["mixed", "Mixed topics (20)"],
            ["practice", "Full practice"],
            ["challenge", "Advanced challenge (15)"],
          ] as const).map(([quizMode, label]) => (
            <button
              key={quizMode}
              type="button"
              aria-pressed={mode === quizMode}
              onClick={() => {
                setMode(quizMode);
                setQuizMessage("");
              }}
              className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                mode === quizMode ? "bg-[#1B4D36] text-white" : "bg-[#FAF7F2] text-[#455A4F] hover:bg-[#EAE2D4]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          {mode === "category" && (
            <label className="flex-1 space-y-1 text-xs font-semibold text-[#455A4F]" htmlFor="quiz-category">
              Topic &amp; question count
              <select
                id="quiz-category"
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value as QuizCategory)}
                className="block w-full rounded-lg border border-[#DDD3C2] bg-[#FDFCFA] px-3 py-2 text-xs text-[#0F2D1F]"
              >
                {QUIZ_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category} ({QUIZ_QUESTION_COUNTS[category]})
                  </option>
                ))}
              </select>
            </label>
          )}
          {mode !== "challenge" && (
            <label className="space-y-1 text-xs font-semibold text-[#455A4F]" htmlFor="quiz-difficulty">
              Difficulty
              <select
                id="quiz-difficulty"
                value={difficulty}
                onChange={(event) => setDifficulty(event.target.value as QuizDifficulty | "All")}
                className="block w-full rounded-lg border border-[#DDD3C2] bg-[#FDFCFA] px-3 py-2 text-xs text-[#0F2D1F]"
              >
                <option value="All">All levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </label>
          )}
          <button
            type="button"
            onClick={handleStartQuiz}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#8C6A24] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#73551a]"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Start / Shuffle Quiz
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-1 rounded-lg border border-[#DDD3C2] bg-[#FAF7F2] px-3 py-2.5 text-xs font-semibold text-[#8C6A24] hover:bg-[#EAE2D4]"
            title="Restart current quiz"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Restart
          </button>
        </div>
        <p className="text-xs text-[#526359]" aria-live="polite">
          {availableQuizCount} questions available for this selection · {VERIFIED_QUIZ_QUESTIONS.length} questions across {QUIZ_CATEGORIES.length} topics in the current bank. There is no fixed maximum; more can be added as accurate, topic-relevant questions are prepared.
        </p>
        {quizMessage && <p className="text-xs font-medium text-[#9B1C1C]" role="alert">{quizMessage}</p>}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#DDD3C2] pt-3 text-xs">
          <span className="text-[#526359]">
            {sessionQuestions.length} questions · {activeMode} · {activeDifficulty === "All" ? "all levels" : activeDifficulty}
          </span>
          <span className="rounded-lg border border-[#DDD3C2] bg-[#FAF7F2] px-3 py-1.5 text-[#526359]">
            Responses recorded: <strong className="font-mono text-sm text-[#1B4D36]">{answeredCount} / {sessionQuestions.length}</strong>
          </span>
        </div>
        <Link href="/progress" className="inline-flex items-center gap-1 text-xs font-semibold text-[#1B4D36] hover:underline">
          View student progress dashboard <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </section>

      {/* Quiz in progress */}
      {!sessionReady ? (
        <div className="rounded-xl border border-[#DDD3C2] bg-[#FAF7F2] p-8 text-center text-sm text-[#526359]" role="status">
          Preparing a shuffled quiz…
        </div>
      ) : sessionQuestions.length > 0 && currentQ ? (
        <div className="bg-[#FAF7F2] border-2 border-[#1B4D36]/20 rounded-2xl p-6 sm:p-9 space-y-6 shadow-sm">
          {/* Question Header & Progress Bar */}
          <div className="space-y-3 border-b border-[#E3D9C8] pb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[#FAF1DA] text-[#8C6A24]">
                {currentQ.category} &bull; {currentQ.difficulty} &bull; Question {currentQuestionIndex + 1} of {sessionQuestions.length}
              </span>
              <span className="text-xs font-mono text-[#6A7F73]">
                {answeredCount} of {sessionQuestions.length} answered
              </span>
            </div>

            {/* Stepper Progress */}
            <div
              role="progressbar"
              aria-label="Quiz question progress"
              aria-valuemin={0}
              aria-valuemax={sessionQuestions.length}
              aria-valuenow={currentQuestionIndex + 1}
              className="w-full bg-[#EAE1D3] rounded-full h-1.5 overflow-hidden"
            >
              <div
                className="bg-[#1B4D36] h-full rounded-full transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / sessionQuestions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <QuizQuestionCard
            key={currentQ.id}
            question={currentQ}
            selectedAnswerIndex={selectedAnswer}
            submittedAnswerIndex={submittedAnswer}
            onSelectAnswer={handleSelectOption}
            onSubmitAnswer={handleSubmitAnswer}
            onHintViewed={() => setHintViewed((previous) => ({ ...previous, [currentQ.id]: true }))}
            lesson={GRAMMAR_LESSONS.find((lesson) => lesson.lessonQuizCategory === currentQ.category)}
          />
          {QUIZ_CONTENT_AUDIT.incompleteQuestionIds.includes(currentQ.sourceQuestionId) && (
            <p role="alert" className="rounded-lg border border-[#B91C1C]/30 bg-[#FAF3F3] p-3 text-sm text-[#7F1D1D]">
              This question has incomplete hint or explanation data and has been flagged for correction.
            </p>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E3D9C8]">
            <button
              disabled={currentQuestionIndex === 0}
              onClick={handlePrev}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#DDD3C2] bg-[#FDFCFA] text-xs font-semibold text-[#0F2D1F] hover:bg-[#EAE2D4] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <span className="text-xs text-[#6A7F73] hidden sm:inline">
              {submittedAnswer === null
                ? selectedAnswer === null ? "Choose an option, then submit your answer" : "Submit your selected answer to see feedback"
                : "Answer submitted and locked"}
            </span>

            {currentQuestionIndex < sessionQuestions.length - 1 ? (
              <button
                disabled={submittedAnswer === null}
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#1B4D36] text-white text-xs font-semibold hover:bg-[#123625] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                disabled={submittedAnswer === null}
                onClick={handleFinishQuiz}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#8C6A24] text-white text-xs font-semibold hover:bg-[#73551a] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <Trophy className="w-4 h-4" />
                <span>Finish & View Results</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-[#DDD3C2] bg-[#FAF7F2] p-8 text-center" role="status">
          <p className="font-semibold text-[#0F2D1F]">No questions are available for this selection.</p>
          <button type="button" onClick={handleStartQuiz} className="mt-4 rounded-lg bg-[#1B4D36] px-4 py-2 text-xs font-semibold text-white">
            Try another selection
          </button>
        </div>
      )}
    </div>
  );
}

export default function PracticeQuizPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-10 text-sm text-[#526359]" role="status">Preparing quiz…</div>}>
      <PracticeQuizContent />
    </Suspense>
  );
}