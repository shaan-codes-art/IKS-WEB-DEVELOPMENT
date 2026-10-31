"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Citation from "../../components/Citation";
import { GRAMMAR_LESSONS, GrammarLesson } from "../../data/learningData";
import { SIVA_SUTRAS, POPULAR_PRATYAHARAS } from "../../data/sanskritData";
import { QUIZ_CATEGORIES, QuizCategory, VERIFIED_QUIZ_QUESTIONS } from "../../data/quizData";
import { EMPTY_PROGRESS, LearningProgress, readLearningProgress, saveLearningProgress } from "../../lib/learningProgress";
import {
  GraduationCap,
  BookOpen,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Clock,
  CheckCircle2,
  ChevronRight,
  Compass,
  Layers,
  Award,
  ExternalLink,
  CheckSquare,
  Square,
  HelpCircle,
  Lightbulb,
  Bookmark,
} from "lucide-react";

export default function LearnGrammarPage() {
  const [selectedLessonIndex, setSelectedLessonIndex] = useState<number>(0);
  const [progress, setProgress] = useState<LearningProgress>(EMPTY_PROGRESS);
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [levelFilter, setLevelFilter] = useState("All");
  const [topicFilter, setTopicFilter] = useState("All");
  const [completionFilter, setCompletionFilter] = useState("All");
  const [lessonQuizAnswers, setLessonQuizAnswers] = useState<Record<string, number>>({});
  const [lessonFeedback, setLessonFeedback] = useState("");
  const [progressError, setProgressError] = useState("");
  const [checkedConcepts, setCheckedConcepts] = useState<Record<string, boolean>>({});

  const selectedLesson = GRAMMAR_LESSONS[selectedLessonIndex] || GRAMMAR_LESSONS[0];
  const completedModules = useMemo(
    () => Object.fromEntries(progress.completedLessonIds.map((id) => [id, true])),
    [progress.completedLessonIds],
  );
  const topics = useMemo(() => [...new Set(GRAMMAR_LESSONS.map((lesson) => lesson.topic ?? "Pāṇinian grammar"))], []);
  const filteredLessons = useMemo(
    () => GRAMMAR_LESSONS.filter((lesson) =>
      (levelFilter === "All" || lesson.level === levelFilter) &&
      (topicFilter === "All" || (lesson.topic ?? "Pāṇinian grammar") === topicFilter) &&
      (completionFilter === "All" ||
        (completionFilter === "Completed" ? completedModules[lesson.id] : !completedModules[lesson.id])),
    ),
    [completionFilter, completedModules, levelFilter, topicFilter],
  );
  const lessonQuizQuestions = useMemo(() => {
    const category = selectedLesson.lessonQuizCategory as QuizCategory | undefined;
    return category && QUIZ_CATEGORIES.includes(category)
      ? VERIFIED_QUIZ_QUESTIONS.filter((question) => question.category === category).slice(0, 3)
      : [];
  }, [selectedLesson.lessonQuizCategory]);

  useEffect(() => {
    try {
      const savedProgress = readLearningProgress();
      setProgress(savedProgress);
      if (savedProgress.lastVisitedLessonId) {
        const lastVisitedIndex = GRAMMAR_LESSONS.findIndex((lesson) => lesson.id === savedProgress.lastVisitedLessonId);
        if (lastVisitedIndex >= 0) setSelectedLessonIndex(lastVisitedIndex);
      }
    } catch {
      setProgressError("Saved progress could not be loaded; lesson progress may not persist in this browser.");
    } finally {
      setProgressLoaded(true);
    }
  }, []);

  useEffect(() => {
    const selectLessonFromHash = () => {
      const lessonId = window.location.hash.replace("#lesson-", "");
      const index = GRAMMAR_LESSONS.findIndex((lesson) => lesson.id === lessonId);
      if (index >= 0) setSelectedLessonIndex(index);
    };
    selectLessonFromHash();
    window.addEventListener("hashchange", selectLessonFromHash);
    return () => window.removeEventListener("hashchange", selectLessonFromHash);
  }, []);

  useEffect(() => {
    setLessonQuizAnswers({});
    setLessonFeedback("");
  }, [selectedLesson.id]);

  useEffect(() => {
    if (filteredLessons.length && !filteredLessons.some((lesson) => lesson.id === selectedLesson.id)) {
      setSelectedLessonIndex(GRAMMAR_LESSONS.findIndex((lesson) => lesson.id === filteredLessons[0].id));
    }
  }, [filteredLessons, selectedLesson.id]);

  useEffect(() => {
    if (!progressLoaded || !selectedLesson) return;
    const nextProgress = { ...progress, lastVisitedLessonId: selectedLesson.id };
    if (nextProgress.lastVisitedLessonId === progress.lastVisitedLessonId) return;
    try {
      saveLearningProgress(nextProgress);
      setProgress(nextProgress);
    } catch {
      setProgressError("Progress could not be saved in this browser.");
    }
  }, [progress, progressLoaded, selectedLesson]);

  const updateProgress = (nextProgress: LearningProgress) => {
    try {
      saveLearningProgress(nextProgress);
      setProgress(nextProgress);
      setProgressError("");
    } catch {
      setProgressError("Progress could not be saved in this browser.");
    }
  };

  const toggleComplete = (id: string) => {
    const isCompleted = progress.completedLessonIds.includes(id);
    const completedLessonIds = isCompleted
      ? progress.completedLessonIds.filter((lessonId) => lessonId !== id)
      : [...progress.completedLessonIds, id];
    updateProgress({ ...progress, completedLessonIds });
  };

  const toggleBookmark = (id: string) => {
    const bookmarkedLessonIds = progress.bookmarkedLessonIds.includes(id)
      ? progress.bookmarkedLessonIds.filter((lessonId) => lessonId !== id)
      : [...progress.bookmarkedLessonIds, id];
    updateProgress({ ...progress, bookmarkedLessonIds });
  };

  const toggleConcept = (conceptKey: string) => {
    setCheckedConcepts((prev) => ({
      ...prev,
      [conceptKey]: !prev[conceptKey],
    }));
  };

  const handlePrevLesson = () => {
    const visibleIndex = filteredLessons.findIndex((lesson) => lesson.id === selectedLesson.id);
    if (visibleIndex > 0) setSelectedLessonIndex(GRAMMAR_LESSONS.findIndex((lesson) => lesson.id === filteredLessons[visibleIndex - 1].id));
  };

  const handleNextLesson = () => {
    const visibleIndex = filteredLessons.findIndex((lesson) => lesson.id === selectedLesson.id);
    if (visibleIndex >= 0 && visibleIndex < filteredLessons.length - 1) {
      setSelectedLessonIndex(GRAMMAR_LESSONS.findIndex((lesson) => lesson.id === filteredLessons[visibleIndex + 1].id));
    }
  };

  const completedCount = progress.completedLessonIds.length;
  const progressPercentage = Math.round((completedCount / GRAMMAR_LESSONS.length) * 100);

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
          <span className="text-[#0F2D1F] font-semibold">Learn Pāṇinian Grammar</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF1DA] text-[#8C6A24] text-xs font-semibold border border-[#E0CE9E]">
            <GraduationCap className="w-3.5 h-3.5 text-[#B38622]" />
            <span>Section 4 &bull; Computer-Assisted Language Learning (CALL)</span>
          </div>

          <Link
            href="/pedagogy-call"
            className="text-xs font-mono text-[#8C6A24] bg-[#FAF1DA] px-3 py-1 rounded border border-[#E0CE9E] hover:underline flex items-center gap-1"
          >
            <span>Complements Research 2 (CALL)</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0F2D1F] tracking-tight leading-tight">
            Learn Pāṇinian Grammar
          </h1>
          <p className="text-sm sm:text-base text-[#465A4F] max-w-3xl leading-relaxed">
            Step-by-step learning activities introduce the metalanguage, markers, and generative rules of the Aṣṭādhyāyī. Cognitive-load research discusses the limits of processing capacity during problem solving; this website has not been empirically evaluated. <Citation numbers={[1, 3]} />
          </p>
          <p className="max-w-3xl rounded-lg border border-[#E0CE9E] bg-[#FAF1DA]/50 p-3 text-xs leading-relaxed text-[#614A19]">
            Lesson notes are original introductory explanations. English glosses and worked examples are editorial and have not all been mapped to a named edition and page; check the <Link href="/references" className="font-semibold underline">References & Bibliography</Link> before academic reuse.
          </p>
        </div>

        {/* Learning Progression Bar */}
        <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#DDD3C2] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F2D1F]">
                Curriculum Progression:
              </span>
              <span className="text-xs font-mono font-bold text-[#1B4D36]">
                {completedCount} of {GRAMMAR_LESSONS.length} Modules Completed ({progressPercentage}%)
              </span>
            </div>
            <div className="w-full sm:w-96 bg-[#E8E1D5] rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#1B4D36] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              aria-pressed={Boolean(completedModules[selectedLesson.id])}
              onClick={() => toggleComplete(selectedLesson.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                completedModules[selectedLesson.id]
                  ? "bg-[#E8F0EC] text-[#1B4D36] border-[#BBD5C5]"
                  : "bg-[#FDFCFA] text-[#526359] border-[#DDD3C2] hover:bg-[#FAF7F2]"
              }`}
            >
              <CheckCircle2
                className={`w-4 h-4 ${
                  completedModules[selectedLesson.id] ? "text-[#1B4D36]" : "text-[#8C9E93]"
                }`}
              />
              <span>
                {completedModules[selectedLesson.id]
                  ? "Module Completed"
                  : "Mark Module as Complete"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Learning Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Lesson Modules Navigation */}
        <div className="lg:col-span-4 space-y-3">
          <div className="grid grid-cols-1 gap-2 rounded-xl border border-[#DDD3C2] bg-[#F4EFE6] p-3 sm:grid-cols-3 lg:grid-cols-1">
            <label className="space-y-1 text-[11px] font-semibold text-[#455A4F]">
              Level
              <select value={levelFilter} onChange={(event) => setLevelFilter(event.target.value)} className="block w-full rounded-lg border border-[#DDD3C2] bg-[#FDFCFA] px-2.5 py-2 text-xs">
                <option>All</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </label>
            <label className="space-y-1 text-[11px] font-semibold text-[#455A4F]">
              Topic
              <select value={topicFilter} onChange={(event) => setTopicFilter(event.target.value)} className="block w-full rounded-lg border border-[#DDD3C2] bg-[#FDFCFA] px-2.5 py-2 text-xs">
                <option>All</option>
                {topics.map((topic) => <option key={topic}>{topic}</option>)}
              </select>
            </label>
            <label className="space-y-1 text-[11px] font-semibold text-[#455A4F]">
              Completion
              <select value={completionFilter} onChange={(event) => setCompletionFilter(event.target.value)} className="block w-full rounded-lg border border-[#DDD3C2] bg-[#FDFCFA] px-2.5 py-2 text-xs">
                <option>All</option>
                <option>Completed</option>
                <option>Incomplete</option>
              </select>
            </label>
          </div>
          <p className="px-1 text-xs text-[#6A7F73]" role="status">
            Showing {filteredLessons.length} of {GRAMMAR_LESSONS.length} lessons
          </p>
          {progressError && <p className="rounded-lg bg-[#FAF3F3] p-2 text-xs text-[#9B1C1C]" role="alert">{progressError}</p>}
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6A7F73]">
              Curriculum Modules ({filteredLessons.length}):
            </span>
            <span className="text-[10px] font-mono text-[#8C6A24]">Sequential Scaffolding</span>
          </div>

          {filteredLessons.length === 0 ? (
            <div className="space-y-3 rounded-xl border border-[#DDD3C2] bg-[#FAF7F2] p-4 text-xs text-[#6A7F73]" role="status">
              <p>No lessons match these filters. The current lesson remains open; change a filter to select another lesson.</p>
              <button type="button" onClick={() => {
                setLevelFilter("All");
                setTopicFilter("All");
                setCompletionFilter("All");
              }} className="rounded-lg bg-[#1B4D36] px-3 py-2 font-semibold text-white hover:bg-[#123625]">
                Clear learning filters
              </button>
            </div>
          ) : <div className="space-y-2.5">
            {filteredLessons.map((lesson) => {
              const idx = GRAMMAR_LESSONS.findIndex((item) => item.id === lesson.id);
              const isSelected = selectedLesson.id === lesson.id;
              const isDone = Boolean(completedModules[lesson.id]);
              return (
                <button
                  key={lesson.id}
                  id={`lesson-${lesson.id}`}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => {
                    setSelectedLessonIndex(idx);
                    setLessonQuizAnswers({});
                    setLessonFeedback("");
                  }}
                  className={`w-full p-4 rounded-xl border text-left cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38622] ${
                    isSelected
                      ? "bg-[#FAF7F2] border-[#1B4D36] ring-2 ring-[#1B4D36]/20 shadow-md scale-[1.01]"
                      : "bg-[#FDFCFA] border-[#DDD3C2] hover:bg-[#F7F2E9]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FAF1DA] text-[#8C6A24]">
                        Module {lesson.moduleNumber}
                      </span>
                      {isDone && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4D36]" />
                      )}
                    </div>
                    <span className="flex items-center gap-1 text-[11px] text-[#6A7F73]">
                      <Clock className="w-3 h-3" />
                      {lesson.estimatedMinutes}m
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#0F2D1F]">
                    {lesson.titleDev}
                  </h3>
                  <p className="text-xs text-[#1B4D36] font-medium mt-0.5">
                    {lesson.titleEng}
                  </p>

                  <span className="text-[11px] text-[#6A7F73] block mt-2 line-clamp-2">
                    {lesson.summary}
                  </span>
                  <span className="mt-2 inline-block rounded bg-[#E8F0EC] px-2 py-0.5 text-[10px] font-medium text-[#1B4D36]">
                    {lesson.topic ?? "Pāṇinian grammar"}
                  </span>
                </button>
              );
            })}
          </div>}

          {/* Quick link to Practice */}
          <div className="pt-4 border-t border-[#E3D9C8] space-y-2">
            <Link
              href="/practice"
              className="w-full inline-flex items-center justify-center gap-2 p-3.5 rounded-xl bg-[#0F2D1F] text-white text-xs font-semibold hover:bg-[#1B4D36] transition-all shadow-sm"
            >
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span>Test Your Knowledge in Formative Quiz &rarr;</span>
            </Link>
            <Link
              href="/word-formation"
              className="w-full inline-flex items-center justify-center gap-2 p-3 rounded-xl bg-[#FAF1DA] text-[#8C6A24] border border-[#E0CE9E] text-xs font-semibold hover:bg-[#F3E5C3] transition-all"
            >
              <Layers className="w-4 h-4 text-[#B38622]" />
              <span>Inspect Derivation in Prakriyā Studio</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Active Lesson Content */}
        <div className="lg:col-span-8 bg-[#FAF7F2] border-2 border-[#1B4D36]/20 rounded-2xl p-6 sm:p-9 space-y-8 shadow-sm">
          {/* Active Lesson Header */}
          <div className="border-b border-[#E3D9C8] pb-6 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[#E8F0EC] text-[#1B4D36]">
                Level: {selectedLesson.level} &bull; Module {selectedLesson.moduleNumber} of {GRAMMAR_LESSONS.length}
              </span>
              <span className="text-xs text-[#8C6A24] font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedLesson.estimatedMinutes} min read
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2D1F]">
              {selectedLesson.titleDev}
            </h2>
            <p className="font-serif text-xl text-[#8C6A24] font-medium">
              {selectedLesson.titleEng}
            </p>
            <p className="text-sm text-[#465A4F] leading-relaxed">
              {selectedLesson.summary}
            </p>
            <button
              type="button"
              aria-pressed={progress.bookmarkedLessonIds.includes(selectedLesson.id)}
              onClick={() => toggleBookmark(selectedLesson.id)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#DDD3C2] bg-[#FDFCFA] px-3 py-2 text-xs font-semibold text-[#8C6A24] hover:bg-[#FAF1DA]"
            >
              <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
              {progress.bookmarkedLessonIds.includes(selectedLesson.id) ? "Remove bookmark" : "Bookmark lesson"}
            </button>
            <Link href="/progress" className="ml-3 inline-flex items-center gap-1 text-xs font-semibold text-[#1B4D36] hover:underline">
              Student progress dashboard <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>

          {selectedLesson.objectives && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <section className="rounded-xl border border-[#DDD3C2] bg-[#FDFCFA] p-4">
                <h3 className="mb-2 font-serif text-sm font-bold text-[#0F2D1F]">Learning objectives</h3>
                <ul className="list-disc space-y-1 pl-5 text-xs leading-relaxed text-[#465A4F]">
                  {selectedLesson.objectives.map((objective) => <li key={objective}>{objective}</li>)}
                </ul>
              </section>
              <section className="rounded-xl border border-[#DDD3C2] bg-[#FDFCFA] p-4">
                <h3 className="mb-2 font-serif text-sm font-bold text-[#0F2D1F]">Prerequisites</h3>
                <ul className="list-disc space-y-1 pl-5 text-xs leading-relaxed text-[#465A4F]">
                  {(selectedLesson.prerequisites ?? ["No formal prerequisite listed."]).map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
            </div>
          )}

          {/* Interactive Concept Checklist (Cognitive Scaffolding) */}
          <div className="bg-[#FDFCFA] border border-[#DDD3C2] rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#8C6A24]" />
              <h3 className="font-serif text-sm font-bold text-[#0F2D1F] uppercase tracking-wide">
                Key Concepts to Master in this Lesson:
              </h3>
            </div>
            <p className="text-xs text-[#526359]">
              Check off each concept as you understand it to self-monitor your cognitive retention:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {selectedLesson.keyConcepts.map((concept, i) => {
                const conceptKey = `${selectedLesson.id}-concept-${i}`;
                const isChecked = Boolean(checkedConcepts[conceptKey]);
                return (
                  <button
                    key={i}
                    type="button"
                    aria-pressed={Boolean(checkedConcepts[conceptKey])}
                    onClick={() => toggleConcept(conceptKey)}
                    className={`p-3 rounded-lg border text-left text-xs transition-all flex items-start gap-2.5 ${
                      isChecked
                        ? "bg-[#E8F0EC] border-[#1B4D36]/40 text-[#0F2D1F]"
                        : "bg-[#FAF7F2] border-[#DDD3C2] text-[#455A4F] hover:bg-[#F3EDE2]"
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-[#1B4D36] shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-[#8C9E93] shrink-0 mt-0.5" />
                    )}
                    <span className={isChecked ? "font-medium" : ""}>{concept}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Core Sūtras Introduced in this Lesson */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#1B4D36] uppercase tracking-wider block">
              Core Canonical Sūtras Introduced:
            </span>
            <div className="grid grid-cols-1 gap-2.5">
              {selectedLesson.coreSutras.map((sutra) => (
                <div
                  key={sutra.number}
                  className="bg-[#FDFCFA] p-3.5 rounded-xl border border-[#DDD3C2] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#FAF1DA] text-[#8C6A24] mr-2">
                      {sutra.number}
                    </span>
                    <strong className="font-serif text-base text-[#0F2D1F]">
                      {sutra.text}
                    </strong>
                    <p className="text-xs text-[#526359] mt-0.5">
                      {sutra.translation}
                      {" "}<Citation numbers={[1]} />
                    </p>
                  </div>
                  <Link
                    href={`/sutras?search=${encodeURIComponent(sutra.number)}`}
                    className="text-xs text-[#1B4D36] hover:underline flex items-center gap-1 shrink-0 font-medium"
                  >
                    <span>View Graph</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Lesson Content Sections */}
          <div className="space-y-6">
            {selectedLesson.contentSections.map((sec, idx) => (
              <div key={idx} className="space-y-2 bg-[#FDFCFA] p-5 rounded-xl border border-[#DDD3C2]">
                <h3 className="font-serif text-xl font-bold text-[#0F2D1F]">
                  {sec.heading}
                </h3>
                <p className="text-sm text-[#3E5246] leading-relaxed">
                  {sec.body}
                </p>
                {sec.sanskritCallout && (
                  <div className="font-serif text-sm text-[#8C6A24] bg-[#FAF1DA]/60 p-3.5 rounded-xl border border-[#E5D2A5] leading-relaxed italic mt-2">
                    {sec.sanskritCallout}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Special Interactive Chart for Module 1 (Śivasūtras & Pratyāhāras) */}
          {selectedLesson.id === "lesson-1" && (
            <div className="bg-[#FAF1DA]/40 border border-[#E0CE9E] rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-base font-bold text-[#0F2D1F] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#B38622]" />
                  The 14 Māheśvara Sūtras Quick Reference
                </h4>
                <span className="text-[11px] font-mono text-[#8C6A24]">14 Aphorisms</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {SIVA_SUTRAS.map((s) => (
                  <div
                    key={s.id}
                    className="bg-[#FDFCFA] p-2 rounded-lg border border-[#DDD3C2] text-center"
                  >
                    <span className="text-[10px] font-mono text-[#8C6A24] block">#{s.id}</span>
                    <strong className="font-serif text-sm text-[#0F2D1F]">{s.devanagari}</strong>
                  </div>
                ))}
              </div>
              <div className="pt-2 text-xs text-[#526359] border-t border-[#E0CE9E]">
                 <strong>Key Abbreviation:</strong> &apos;अच्&apos; (ac) covers all vowels (Sūtras 1-4); &apos;हल्&apos; (hal) covers all consonants (Sūtras 5-14).
              </div>
            </div>
          )}

          {selectedLesson.practiceActivity && (
            <section className="rounded-xl border border-[#E0CE9E] bg-[#FAF1DA]/50 p-5">
              <h3 className="mb-2 font-serif text-base font-bold text-[#0F2D1F]">Practice activity</h3>
              <p className="text-sm leading-relaxed text-[#465A4F]">{selectedLesson.practiceActivity}</p>
              {selectedLesson.commonMistake && (
                <p className="mt-3 border-t border-[#E0CE9E] pt-3 text-xs leading-relaxed text-[#614A19]">
                  <strong>Watch for:</strong> {selectedLesson.commonMistake}
                </p>
              )}
            </section>
          )}

          {lessonQuizQuestions.length > 0 && (
            <section className="space-y-4 rounded-xl border border-[#DDD3C2] bg-[#FDFCFA] p-5" aria-labelledby="lesson-quiz-title">
              <div>
                <h3 id="lesson-quiz-title" className="font-serif text-lg font-bold text-[#0F2D1F]">Quick lesson check</h3>
                <p className="text-xs text-[#526359]">Answer these three questions for review; this check is not saved as a scored quiz attempt.</p>
              </div>
              {lessonQuizQuestions.map((question, questionIndex) => {
                const answer = lessonQuizAnswers[question.id];
                return (
                  <div key={question.id} className="space-y-2 border-t border-[#E3D9C8] pt-3">
                    <p className="text-sm font-semibold text-[#0F2D1F]">{questionIndex + 1}. {question.question}</p>
                    <div className="grid gap-2 sm:grid-cols-2" role="group" aria-label={`Answer question ${questionIndex + 1}`}>
                      {question.options.map((option, optionIndex) => (
                        <button
                          key={option}
                          type="button"
                          disabled={answer !== undefined}
                          aria-pressed={answer === optionIndex}
                          onClick={() => {
                            setLessonQuizAnswers((previous) => ({ ...previous, [question.id]: optionIndex }));
                            setLessonFeedback("Your lesson check answers are for this visit only.");
                          }}
                          className={`rounded-lg border px-3 py-2 text-left text-xs ${
                            answer === undefined
                              ? "border-[#DDD3C2] bg-[#FAF7F2] text-[#33463B] hover:bg-[#F4EFE6]"
                              : optionIndex === question.correctAnswerIndex
                                ? "border-[#1B4D36] bg-[#E8F0EC] text-[#0F2D1F]"
                                : answer === optionIndex
                                  ? "border-[#B91C1C] bg-[#FAF3F3] text-[#7F1D1D]"
                                  : "border-[#DDD3C2] bg-[#FAF7F2] text-[#8C9E93]"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {answer !== undefined && (
                      <div className="space-y-1">
                        <p className="text-xs leading-relaxed text-[#465A4F]" role="status">
                          {answer === question.correctAnswerIndex ? "Correct. " : `Not quite. Correct answer: ${question.correctAnswer}. `}
                          {question.explanation}
                        </p>
                        <p className="text-[11px] leading-relaxed text-[#6A7F73]">{question.sourceNote}</p>
                      </div>
                    )}
                  </div>
                );
              })}
              {lessonFeedback && <p className="sr-only" role="status">{lessonFeedback}</p>}
            </section>
          )}

          {/* Practical Takeaway Card */}
          <div className="bg-[#F4EFE6] border border-[#DDD3C2] rounded-xl p-5 space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8C6A24]" />
              <h4 className="font-serif text-base font-bold text-[#0F2D1F]">
                Linguistic Takeaway & Computational Rule
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-[#465A4F] leading-relaxed">
              {selectedLesson.practicalTakeaway}
            </p>
            <Link href="/references" className="inline-flex items-center gap-1 text-xs font-semibold text-[#1B4D36] hover:underline">
              Further reading and source notes <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>

          {/* Previous / Next Lesson Navigation Bar */}
          <div className="pt-6 border-t border-[#E3D9C8] flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handlePrevLesson}
              disabled={filteredLessons.findIndex((lesson) => lesson.id === selectedLesson.id) <= 0}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#DDD3C2] bg-[#FDFCFA] text-xs font-semibold text-[#0F2D1F] hover:bg-[#EAE2D4] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>
                {filteredLessons.findIndex((lesson) => lesson.id === selectedLesson.id) > 0
                ? `Previous: Module ${filteredLessons[filteredLessons.findIndex((lesson) => lesson.id === selectedLesson.id) - 1].moduleNumber}`
                  : "First Module"}
              </span>
            </button>

            <button
              type="button"
              aria-pressed={Boolean(completedModules[selectedLesson.id])}
              onClick={() => toggleComplete(selectedLesson.id)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#E8F0EC] text-[#1B4D36] text-xs font-semibold border border-[#BBD5C5] hover:bg-[#d5e7dd] transition-all"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>
                {completedModules[selectedLesson.id] ? "Completed ✓" : "Mark as Finished"}
              </span>
            </button>

            <button
              onClick={handleNextLesson}
              disabled={filteredLessons.findIndex((lesson) => lesson.id === selectedLesson.id) < 0 || filteredLessons.findIndex((lesson) => lesson.id === selectedLesson.id) === filteredLessons.length - 1}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B4D36] text-white text-xs font-semibold hover:bg-[#123625] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              <span>
                {filteredLessons.findIndex((lesson) => lesson.id === selectedLesson.id) >= 0 && filteredLessons.findIndex((lesson) => lesson.id === selectedLesson.id) < filteredLessons.length - 1
                  ? `Next: Module ${filteredLessons[filteredLessons.findIndex((lesson) => lesson.id === selectedLesson.id) + 1].moduleNumber}`
                  : "Final Module"}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}