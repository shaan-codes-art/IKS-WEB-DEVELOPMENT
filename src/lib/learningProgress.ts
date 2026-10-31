export const PROGRESS_STORAGE_KEY = "panini-parser-learning-progress";

export interface QuizAttemptRecord {
  id: string;
  resultId?: string;
  completedAt: string;
  mode: string;
  category: string;
  score: number;
  total: number;
  percentage: number;
  incorrectQuestionIds: string[];
  incorrectCategories: string[];
}

export interface LearningProgress {
  completedLessonIds: string[];
  bookmarkedLessonIds: string[];
  bookmarkedSutraNumbers: string[];
  lastVisitedLessonId: string | null;
  quizAttempts: QuizAttemptRecord[];
}

export const EMPTY_PROGRESS: LearningProgress = {
  completedLessonIds: [],
  bookmarkedLessonIds: [],
  bookmarkedSutraNumbers: [],
  lastVisitedLessonId: null,
  quizAttempts: [],
};

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isQuizAttempt(value: unknown): value is QuizAttemptRecord {
  if (typeof value !== "object" || value === null) return false;
  const attempt = value as Partial<QuizAttemptRecord>;
  return (
    typeof attempt.id === "string" &&
    (attempt.resultId === undefined || typeof attempt.resultId === "string") &&
    typeof attempt.completedAt === "string" &&
    typeof attempt.mode === "string" &&
    typeof attempt.category === "string" &&
    typeof attempt.score === "number" &&
    Number.isFinite(attempt.score) &&
    typeof attempt.total === "number" &&
    Number.isFinite(attempt.total) &&
    typeof attempt.percentage === "number" &&
    Number.isFinite(attempt.percentage) &&
    isStringArray(attempt.incorrectQuestionIds) &&
    isStringArray(attempt.incorrectCategories)
  );
}

export function readLearningProgress(): LearningProgress {
  try {
    const stored = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!stored) return { ...EMPTY_PROGRESS, completedLessonIds: [], bookmarkedLessonIds: [], bookmarkedSutraNumbers: [], quizAttempts: [] };
    const parsed: unknown = JSON.parse(stored);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "completedLessonIds" in parsed &&
      isStringArray(parsed.completedLessonIds) &&
      "bookmarkedLessonIds" in parsed &&
      isStringArray(parsed.bookmarkedLessonIds) &&
      "bookmarkedSutraNumbers" in parsed &&
      isStringArray(parsed.bookmarkedSutraNumbers) &&
      "quizAttempts" in parsed &&
      Array.isArray(parsed.quizAttempts) &&
      parsed.quizAttempts.every(isQuizAttempt)
    ) {
      return {
        completedLessonIds: parsed.completedLessonIds,
        bookmarkedLessonIds: parsed.bookmarkedLessonIds,
        bookmarkedSutraNumbers: parsed.bookmarkedSutraNumbers,
        lastVisitedLessonId:
          "lastVisitedLessonId" in parsed && typeof parsed.lastVisitedLessonId === "string"
            ? parsed.lastVisitedLessonId
            : null,
        quizAttempts: parsed.quizAttempts,
      };
    }
    throw new Error("Saved learning progress has an unexpected format.");
  } catch (error) {
    console.error("Saved learning progress could not be parsed.", error);
    throw new Error("Saved learning progress could not be loaded. It may be unavailable or malformed.");
  }
}

export function saveLearningProgress(progress: LearningProgress): void {
  try {
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error("Learning progress could not be saved in this browser.", error);
    throw new Error("Your browser could not save learning progress. Check storage permissions or available space.");
  }
}
