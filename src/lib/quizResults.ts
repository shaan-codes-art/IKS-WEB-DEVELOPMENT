import { QUIZ_CATEGORIES, type QuizCategory, type QuizDifficulty } from "../data/quizData";
import type { QuizMode } from "./quizSession";

export const QUIZ_RESULTS_STORAGE_KEY = "panini-parser-quiz-results";

export interface QuizResultQuestion {
  id: string;
  sourceQuestionId: string;
  category: QuizCategory;
  difficulty: QuizDifficulty;
  question: string;
  questionSanskrit?: string;
  options: string[];
  correctAnswerIndex: number;
  selectedAnswerIndex: number | null;
  hint?: string;
  hintViewed?: boolean;
  explanation: string;
  optionExplanations?: string[];
  sourceNote: string;
  sutraCitation: string;
  citationNumbers: number[];
}

export interface QuizResultRecord {
  id: string;
  completedAt: string;
  mode: QuizMode;
  difficulty: QuizDifficulty | "All";
  category: string;
  quizName: string;
  questions: QuizResultQuestion[];
}

function isQuizMode(value: unknown): value is QuizMode {
  return value === "category" || value === "mixed" || value === "practice" || value === "challenge";
}

function isQuizResultQuestion(value: unknown): value is QuizResultQuestion {
  if (typeof value !== "object" || value === null) return false;
  const question = value as Partial<QuizResultQuestion>;
  return (
    typeof question.id === "string" &&
    typeof question.sourceQuestionId === "string" &&
    QUIZ_CATEGORIES.some((category) => category === question.category) &&
    (question.difficulty === "Beginner" || question.difficulty === "Intermediate" || question.difficulty === "Advanced") &&
    typeof question.question === "string" &&
    Array.isArray(question.options) &&
    question.options.every((option) => typeof option === "string") &&
    typeof question.correctAnswerIndex === "number" &&
    Number.isInteger(question.correctAnswerIndex) &&
    question.correctAnswerIndex >= 0 &&
    question.correctAnswerIndex < question.options.length &&
    (question.selectedAnswerIndex === null ||
      (typeof question.selectedAnswerIndex === "number" &&
        Number.isInteger(question.selectedAnswerIndex) &&
        question.selectedAnswerIndex >= 0 &&
        question.selectedAnswerIndex < question.options.length)) &&
    (question.hint === undefined || typeof question.hint === "string") &&
    (question.hintViewed === undefined || typeof question.hintViewed === "boolean") &&
    typeof question.explanation === "string" &&
    (question.optionExplanations === undefined ||
      (Array.isArray(question.optionExplanations) &&
        question.optionExplanations.length === question.options.length &&
        question.optionExplanations.every((explanation) => typeof explanation === "string"))) &&
    typeof question.sourceNote === "string" &&
    typeof question.sutraCitation === "string" &&
    Array.isArray(question.citationNumbers) &&
    question.citationNumbers.every((number) => typeof number === "number")
  );
}

function isQuizResultRecord(value: unknown): value is QuizResultRecord {
  if (typeof value !== "object" || value === null) return false;
  const result = value as Partial<QuizResultRecord>;
  return (
    typeof result.id === "string" &&
    typeof result.completedAt === "string" &&
    isQuizMode(result.mode) &&
    (result.difficulty === "All" ||
      result.difficulty === "Beginner" ||
      result.difficulty === "Intermediate" ||
      result.difficulty === "Advanced") &&
    typeof result.category === "string" &&
    typeof result.quizName === "string" &&
    Array.isArray(result.questions) &&
    result.questions.every(isQuizResultQuestion)
  );
}

export function saveQuizResult(result: QuizResultRecord): void {
  try {
    const stored = window.localStorage.getItem(QUIZ_RESULTS_STORAGE_KEY);
    const existing: unknown = stored ? JSON.parse(stored) : [];
    if (!Array.isArray(existing) || !existing.every(isQuizResultRecord)) {
      throw new Error("Saved quiz results have an unexpected format.");
    }
    const results = [result, ...existing.filter((item) => item.id !== result.id)].slice(0, 50);
    window.localStorage.setItem(QUIZ_RESULTS_STORAGE_KEY, JSON.stringify(results));
  } catch (error) {
    console.error("Quiz result could not be saved in this browser.", error);
    throw new Error("Your quiz result could not be saved in this browser.");
  }
}

export function readQuizResult(id: string): QuizResultRecord | null {
  const saved = readSavedQuizResults();
  return saved.find((result) => result.id === id) ?? null;
}

export function readLatestQuizResultId(): string | null {
  return readSavedQuizResults()[0]?.id ?? null;
}

function readSavedQuizResults(): QuizResultRecord[] {
  try {
    const stored = window.localStorage.getItem(QUIZ_RESULTS_STORAGE_KEY);
    if (!stored) return [];
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed) || !parsed.every(isQuizResultRecord)) {
      throw new Error("Saved quiz results have an unexpected format.");
    }
    return parsed;
  } catch (error) {
    console.error("Saved quiz result could not be loaded.", error);
    throw new Error("The saved quiz result could not be loaded. It may be unavailable or malformed.");
  }
}
