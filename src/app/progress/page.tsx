"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bookmark, CheckCircle2, RotateCcw, Trophy } from "lucide-react";
import { GRAMMAR_LESSONS } from "../../data/learningData";
import { VERIFIED_SUTRAS } from "../../data/sutraData";
import { EMPTY_PROGRESS, LearningProgress, readLearningProgress, saveLearningProgress } from "../../lib/learningProgress";

export default function ProgressDashboardPage() {
  const [progress, setProgress] = useState<LearningProgress>(EMPTY_PROGRESS);
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      setProgress(readLearningProgress());
    } catch {
      setMessage("Saved progress could not be loaded. The dashboard is showing an empty session; existing browser data was not changed.");
    } finally {
      setLoaded(true);
    }
  }, []);

  const attempts = progress.quizAttempts;
  const bestAttempt = useMemo(
    () => attempts.reduce<(typeof attempts)[number] | null>((best, attempt) => !best || attempt.percentage > best.percentage ? attempt : best, null),
    [attempts],
  );
  const averageScore = attempts.length
    ? Math.round(attempts.reduce((total, attempt) => total + attempt.percentage, 0) / attempts.length)
    : 0;
  const revisionCategories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const attempt of attempts) {
      for (const category of attempt.incorrectCategories) {
        counts.set(category, (counts.get(category) ?? 0) + 1);
      }
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [attempts]);
  const bookmarkedLessons = GRAMMAR_LESSONS.filter((lesson) => progress.bookmarkedLessonIds.includes(lesson.id));
  const bookmarkedSutras = VERIFIED_SUTRAS.filter((sutra) => progress.bookmarkedSutraNumbers.includes(sutra.number));
  const continueLesson = GRAMMAR_LESSONS.find((lesson) => lesson.id === progress.lastVisitedLessonId) ?? GRAMMAR_LESSONS[0];

  const resetProgress = () => {
    if (!window.confirm("Clear all saved lesson progress, bookmarks, and quiz attempts from this browser? This cannot be undone.")) return;
    try {
      saveLearningProgress({ ...EMPTY_PROGRESS, completedLessonIds: [], bookmarkedLessonIds: [], bookmarkedSutraNumbers: [], quizAttempts: [] });
      setProgress({ ...EMPTY_PROGRESS, completedLessonIds: [], bookmarkedLessonIds: [], bookmarkedSutraNumbers: [], quizAttempts: [] });
      setMessage("Saved progress was cleared from this browser.");
    } catch {
      setMessage("Progress could not be cleared. Check this browser's storage permissions.");
    }
  };

  if (!loaded) return <div className="mx-auto max-w-5xl px-4 py-10" role="status">Loading local progress…</div>;

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-8">
      <header className="space-y-3 border-b border-[#E3D9C8] pb-6">
        <nav aria-label="Breadcrumb" className="flex gap-2 text-xs text-[#6A7F73]">
          <Link href="/" className="hover:underline">Home</Link><span aria-hidden="true">›</span><span>Student Progress</span>
        </nav>
        <h1 className="font-serif text-3xl font-bold text-[#0F2D1F] sm:text-5xl">Student Progress</h1>
        <p className="max-w-3xl text-sm leading-relaxed text-[#465A4F]">
          Your lesson completion, bookmarks, and quiz attempts are stored only in this browser. They are not synced to an account or shared across devices.
        </p>
      </header>

      {message && <p role="status" className="rounded-lg border border-[#BBD5C5] bg-[#E8F0EC] p-3 text-sm text-[#1B4D36]">{message}</p>}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Progress summary">
        {[
          ["Lessons complete", `${progress.completedLessonIds.length} / ${GRAMMAR_LESSONS.length}`],
          ["Quiz attempts", String(attempts.length)],
          ["Best quiz", bestAttempt ? `${bestAttempt.percentage}%` : "Not yet taken"],
          ["Average score", attempts.length ? `${averageScore}%` : "Not yet available"],
        ].map(([label, value]) => (
          <article key={label} className="rounded-xl border border-[#DDD3C2] bg-[#FAF7F2] p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#6A7F73]">{label}</p>
            <p className="mt-2 font-serif text-2xl font-bold text-[#1B4D36]">{value}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-xl border border-[#DDD3C2] bg-[#FAF7F2] p-5">
          <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-[#0F2D1F]">
            <ArrowRight className="h-5 w-5 text-[#8C6A24]" /> Continue learning
          </h2>
          <p className="mt-2 text-sm text-[#526359]">Last visited lesson: {continueLesson.titleEng}</p>
          <Link href={`/learn#lesson-${continueLesson.id}`} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#1B4D36] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#123625]">
            Open lesson <ArrowRight className="h-4 w-4" />
          </Link>
          <div className="mt-4 border-t border-[#E3D9C8] pt-4">
            <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0F2D1F]"><Bookmark className="h-4 w-4 text-[#8C6A24]" /> Bookmarked lessons</h3>
            {bookmarkedLessons.length ? (
              <ul className="space-y-2">
                {bookmarkedLessons.map((lesson) => <li key={lesson.id}><Link className="text-sm text-[#1B4D36] hover:underline" href={`/learn#lesson-${lesson.id}`}>{lesson.titleEng}</Link></li>)}
              </ul>
            ) : <p className="text-xs text-[#6A7F73]">No lessons bookmarked yet.</p>}
          </div>
          <div className="mt-4 border-t border-[#E3D9C8] pt-4">
            <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0F2D1F]"><Bookmark className="h-4 w-4 text-[#8C6A24]" /> Bookmarked sūtras</h3>
            {bookmarkedSutras.length ? (
              <ul className="space-y-2">
                {bookmarkedSutras.map((sutra) => (
                  <li key={sutra.number}>
                    <Link className="text-sm text-[#1B4D36] hover:underline" href={`/sutras?search=${encodeURIComponent(sutra.number)}`}>
                      {sutra.number} · {sutra.devanagari}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : <p className="text-xs text-[#6A7F73]">No sūtras bookmarked yet.</p>}
          </div>
        </article>

        <article className="rounded-xl border border-[#DDD3C2] bg-[#FAF7F2] p-5">
          <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-[#0F2D1F]">
            <CheckCircle2 className="h-5 w-5 text-[#1B4D36]" /> Topics to revisit
          </h2>
          {revisionCategories.length ? (
            <ul className="mt-4 space-y-2">
              {revisionCategories.map(([category, count]) => (
                <li key={category} className="flex items-center justify-between gap-3 rounded-lg bg-[#F4EFE6] px-3 py-2 text-sm">
                  <span className="text-[#33463B]">{category}</span><span className="text-xs text-[#8C6A24]">{count} missed</span>
                </li>
              ))}
            </ul>
          ) : <p className="mt-3 text-sm text-[#6A7F73]">Complete a quiz to get personalized revision topics.</p>}
          <Link href="/practice" className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#1B4D36] hover:underline">
            Practice a quiz <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </article>
      </section>

      <section className="rounded-xl border border-[#DDD3C2] bg-[#FAF7F2] p-5">
        <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-[#0F2D1F]">
          <Trophy className="h-5 w-5 text-[#8C6A24]" /> Recent quiz attempts
        </h2>
        {attempts.length ? (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[34rem] text-left text-sm">
              <thead className="text-xs uppercase text-[#6A7F73]"><tr><th className="pb-2">Date</th><th className="pb-2">Mode / topic</th><th className="pb-2">Score</th><th className="pb-2">Result</th></tr></thead>
              <tbody className="divide-y divide-[#E3D9C8]">
                {attempts.slice(0, 10).map((attempt) => (
                  <tr key={attempt.id}>
                    <td className="py-2 pr-3">{new Date(attempt.completedAt).toLocaleDateString()}</td>
                    <td className="py-2 pr-3">
                      {attempt.resultId
                        ? <Link href={`/quiz-results?id=${encodeURIComponent(attempt.resultId)}&source=history`} className="text-[#1B4D36] underline">{attempt.category} · View result</Link>
                        : attempt.category}
                    </td>
                    <td className="py-2 pr-3">{attempt.score}/{attempt.total}</td>
                    <td className="py-2">{attempt.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <p className="mt-3 text-sm text-[#6A7F73]">No completed quiz attempts have been saved.</p>}
      </section>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E3D9C8] pt-5">
        <p className="text-xs text-[#6A7F73]">Reset affects only this browser&apos;s saved learning data.</p>
        <button type="button" onClick={resetProgress} className="inline-flex items-center gap-2 rounded-lg border border-[#B91C1C]/30 bg-[#FAF3F3] px-4 py-2 text-xs font-semibold text-[#9B1C1C] hover:bg-[#F5E7E7]">
          <RotateCcw className="h-4 w-4" /> Reset saved progress
        </button>
      </div>
    </div>
  );
}
