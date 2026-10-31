import type { QuizCategory, QuizDifficulty, QuizQuestion } from "../data/quizData";
import { QUIZ_CATEGORIES, VERIFIED_QUIZ_QUESTIONS } from "../data/quizData";

export type QuizMode = "category" | "mixed" | "practice" | "challenge";
export type QuizSessionQuestion = QuizQuestion & { sourceQuestionId: string };

export function shuffle<T>(values: readonly T[]): T[] {
  const shuffled = [...values];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

export function createQuizSession(
  mode: QuizMode,
  category: QuizCategory,
  difficulty: QuizDifficulty | "All",
): QuizSessionQuestion[] {
  const candidateQuestions = VERIFIED_QUIZ_QUESTIONS.filter((question) => {
    if (mode === "category" && question.category !== category) return false;
    if (mode === "challenge" && question.difficulty !== "Advanced") return false;
    if (mode !== "challenge" && difficulty !== "All" && question.difficulty !== difficulty) return false;
    return true;
  });

  let selectedQuestions = shuffle(candidateQuestions);
  if (mode === "mixed") selectedQuestions = selectedQuestions.slice(0, Math.min(20, selectedQuestions.length));
  if (mode === "challenge") selectedQuestions = selectedQuestions.slice(0, Math.min(15, selectedQuestions.length));

  return selectedQuestions.map((question) => {
    const shuffledOptions = shuffle(question.options.map((option, index) => ({
      option,
      explanation: question.optionExplanations?.[index] ?? "",
    })));
    const options = shuffledOptions.map(({ option }) => option);
    return {
      ...question,
      id: `${question.id}-session`,
      sourceQuestionId: question.id,
      options,
      correctAnswerIndex: options.indexOf(question.correctAnswer),
      optionExplanations: shuffledOptions.map(({ explanation }) => explanation),
    };
  });
}

export const DEFAULT_QUIZ_CATEGORY = QUIZ_CATEGORIES[0];
