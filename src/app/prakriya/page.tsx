"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { VERIFIED_DERIVATIONS, DerivationExample } from "../../data/sanskritData";
import {
  Cpu,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Sparkles,
  Info,
  Layers,
  ArrowRight,
  Filter,
} from "lucide-react";

function PrakriyaContent() {
  const searchParams = useSearchParams();
  const exampleParam = searchParams.get("example");

  const [selectedCategory, setSelectedCategory] = useState<"all" | "dhatu" | "pratipadika" | "sandhi">("all");
  const [selectedDerivation, setSelectedDerivation] = useState<DerivationExample>(VERIFIED_DERIVATIONS[0]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  useEffect(() => {
    if (exampleParam) {
      const match = VERIFIED_DERIVATIONS.find((d) => d.id === exampleParam);
      if (match) {
        setSelectedDerivation(match);
        setCurrentStepIndex(0);
        setSelectedCategory(match.type);
      }
    }
  }, [exampleParam]);

  const filteredDerivations = VERIFIED_DERIVATIONS.filter((d) => {
    if (selectedCategory === "all") return true;
    return d.type === selectedCategory;
  });

  const currentStep = selectedDerivation.steps[currentStepIndex];

  const handleSelectDerivation = (derivation: DerivationExample) => {
    setSelectedDerivation(derivation);
    setCurrentStepIndex(0);
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
          <span className="text-[#8C6A24] font-medium">Interactive Demonstrator</span>
          <span>&gt;</span>
          <span className="text-[#0F2D1F] font-semibold">Prakriyā Derivation Engine</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EC] text-[#1B4D36] text-xs font-semibold border border-[#BED7C7]">
            <Cpu className="w-3.5 h-3.5" />
            <span>Task 1 &bull; Dynamic Derivation Generator</span>
          </div>

          <div className="text-xs font-mono text-[#8C6A24] bg-[#FAF1DA] px-3 py-1 rounded border border-[#E0CE9E]">
            Verified Rule Attribution
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0F2D1F] tracking-tight leading-tight">
            Pāṇinian Prakriyā Generator
          </h1>
          <p className="text-sm sm:text-base text-[#465A4F] max-w-3xl leading-relaxed">
            Select verified verbal roots (<em>dhātu</em>), nominal bases (<em>prātipadika</em>), or sandhi junctions to dynamically audit their step-by-step grammatical formation through Pāṇinian sūtras.
          </p>
        </div>

        {/* Verifiability Disclaimer */}
        <div className="bg-[#FAF1DA]/70 border border-[#D4AF37]/50 rounded-xl p-4 flex items-start gap-3 text-xs text-[#614A19]">
          <Info className="w-4 h-4 text-[#B38622] shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block mb-0.5">
              Verified Curated Corpus (Phase 2 Scope):
            </strong>
            This engine currently features <strong>11 fully verified, historically authenticated derivation trajectories</strong> across major verbal classes (Bhvādi, Tanādi, Juhotyādi) and nominal stem types. Dynamic generation of unverified arbitrary roots is intentionally constrained to prevent rule-hallucination.
          </div>
        </div>
      </div>

      {/* Main Interactive Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Selector & Examples Palette */}
        <div className="lg:col-span-4 space-y-6">
          {/* Category Filter Pills */}
          <div className="bg-[#F4EFE6] border border-[#DDD3C2] rounded-xl p-3 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6A7F73] block px-1">
              Filter by Grammatical Class:
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all text-left ${
                  selectedCategory === "all"
                    ? "bg-[#1B4D36] text-white shadow-xs"
                    : "bg-[#FAF7F2] text-[#33463B] hover:bg-[#EAE2D4]"
                }`}
              >
                All Examples ({VERIFIED_DERIVATIONS.length})
              </button>
              <button
                onClick={() => setSelectedCategory("dhatu")}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all text-left ${
                  selectedCategory === "dhatu"
                    ? "bg-[#1B4D36] text-white shadow-xs"
                    : "bg-[#FAF7F2] text-[#33463B] hover:bg-[#EAE2D4]"
                }`}
              >
                Verbal (Dhātu)
              </button>
              <button
                onClick={() => setSelectedCategory("pratipadika")}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all text-left ${
                  selectedCategory === "pratipadika"
                    ? "bg-[#1B4D36] text-white shadow-xs"
                    : "bg-[#FAF7F2] text-[#33463B] hover:bg-[#EAE2D4]"
                }`}
              >
                Nominal (Prātipadika)
              </button>
              <button
                onClick={() => setSelectedCategory("sandhi")}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all text-left ${
                  selectedCategory === "sandhi"
                    ? "bg-[#1B4D36] text-white shadow-xs"
                    : "bg-[#FAF7F2] text-[#33463B] hover:bg-[#EAE2D4]"
                }`}
              >
                Phonological Sandhi
              </button>
            </div>
          </div>

          {/* List of Verified Items */}
          <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
            {filteredDerivations.map((item) => {
              const isSelected = selectedDerivation.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectDerivation(item)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? "bg-[#FAF7F2] border-[#1B4D36] shadow-md ring-2 ring-[#1B4D36]/20 scale-[1.01]"
                      : "bg-[#FDFCFA] border-[#DDD3C2] hover:bg-[#F7F2E9] hover:border-[#B38622]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-lg font-bold text-[#0F2D1F]">
                      {item.targetForm}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        isSelected
                          ? "bg-[#1B4D36] text-[#FAF7F2]"
                          : "bg-[#EFE7D8] text-[#69583D]"
                      }`}
                    >
                      {item.targetFormIast}
                    </span>
                  </div>

                  <div className="text-xs text-[#1B4D36] font-medium mt-1">
                    {item.baseItem} &bull; <span className="text-[#6B7E72] font-normal">{item.meaning}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#7E9085] mt-2 pt-2 border-t border-[#EDE4D5]">
                    <span>{item.typeLabel}</span>
                    <span className="font-semibold text-[#8C6A24]">{item.steps.length} Steps</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Step Player & Visual Derivation Flow */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Derivation Header Card */}
          <div className="bg-[#FAF7F2] border-2 border-[#1B4D36]/20 rounded-2xl p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E3D9C8] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#FAF1DA] text-[#8C6A24] border border-[#E0CE9E]">
                    {selectedDerivation.typeLabel}
                  </span>
                  <span className="text-xs text-[#6A7F73]">
                    {selectedDerivation.classification}
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2D1F] mt-1">
                  {selectedDerivation.targetForm}{" "}
                  <span className="text-lg font-mono text-[#586D60] font-normal">
                    ({selectedDerivation.targetFormIast})
                  </span>
                </h2>
                <p className="text-xs text-[#526359] mt-0.5">
                  <strong>Semantic Condition: </strong>
                  {selectedDerivation.grammaticalTarget}
                </p>
              </div>

              <div className="bg-[#F4EFE6] px-4 py-2 rounded-xl border border-[#D5C8B4] text-center self-start sm:self-auto">
                <span className="text-[10px] uppercase font-mono text-[#8C6A24] block">
                  Formula
                </span>
                <span className="font-serif text-sm font-bold text-[#1B4D36]">
                  {selectedDerivation.inputFormula}
                </span>
              </div>
            </div>

            {/* Stepper Progress Indicator */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#1B4D36]">
                  Step {currentStepIndex + 1} of {selectedDerivation.steps.length}
                </span>
                <span className="text-[#8C6A24] font-mono text-[11px]">
                  Transition Rule: {currentStep.sutraNumber}
                </span>
              </div>
              <div className="w-full bg-[#E2D6C5] rounded-full h-2.5 overflow-hidden flex shadow-inner">
                {selectedDerivation.steps.map((_, idx) => (
                  <div
                    key={idx}
                    onClick={() => setCurrentStepIndex(idx)}
                    className={`h-full flex-1 cursor-pointer transition-all border-r border-[#FAF7F2] last:border-none ${
                      idx <= currentStepIndex ? "bg-[#1B4D36]" : "bg-[#DDD0BE] hover:bg-[#C9BAA5]"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Active Step Hero View */}
            <div className="bg-[#FDFCFA] border-2 border-[#1B4D36]/30 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Intermediate State */}
                <div className="md:col-span-5 bg-[#F4EFE6] border border-[#DDD3C2] rounded-xl p-6 text-center space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6A24] block">
                    Morphological State &bull; Step {currentStep.stepNumber}
                  </span>

                  <div className="font-serif text-4xl sm:text-5xl font-bold text-[#0F2D1F] tracking-wide py-2">
                    {currentStep.intermediateForm}
                  </div>

                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#E8F0EC] text-[#1B4D36] border border-[#BBD5C5]">
                    {currentStep.sutraType}
                  </span>
                </div>

                {/* Sūtra Provenance Details */}
                <div className="md:col-span-7 space-y-3">
                  <div className="flex items-center justify-between gap-2 border-b border-[#EAE0D1] pb-3">
                    <span className="px-2.5 py-0.5 rounded bg-[#FAF1DA] text-[#8C6A24] border border-[#E0CE9E] text-xs font-mono font-bold">
                      Aṣṭādhyāyī {currentStep.sutraNumber}
                    </span>
                    <Link
                      href={`/sutras?search=${encodeURIComponent(currentStep.sutraNumber)}`}
                      className="inline-flex items-center gap-1 text-[11px] text-[#1B4D36] hover:underline"
                    >
                      <span>Inspect in Sūtra Graph</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#0F2D1F]">
                      {currentStep.sutraDev}
                    </h3>
                    <p className="text-xs font-mono text-[#6A7F73] italic">
                      &ldquo;{currentStep.sutraTrans}&rdquo;
                    </p>
                  </div>

                  <div className="text-xs text-[#2A3B31] leading-relaxed pt-1">
                    <strong>Rule Operation: </strong>
                    {currentStep.explanation}
                  </div>

                  <div className="text-xs text-[#526359] leading-relaxed bg-[#FAF1DA]/40 p-2.5 rounded-lg border border-[#E8DCBF]">
                    <strong className="text-[#8C6A24]">Linguistic Significance: </strong>
                    {currentStep.linguisticSignificance}
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#EAE0D1]">
                <button
                  disabled={currentStepIndex === 0}
                  onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#D5C7B3] text-xs font-medium text-[#1B4D36] hover:bg-[#F4EFE6] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <div className="flex min-w-0 max-w-full flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => setCurrentStepIndex(0)}
                    className="p-2 rounded-lg text-[#6A7F73] hover:text-[#0F2D1F] hover:bg-[#F4EFE6] text-xs"
                    title="Reset to beginning"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  {selectedDerivation.steps.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentStepIndex(idx)}
                      className={`w-7 h-7 rounded-full text-xs font-semibold transition-all ${
                        idx === currentStepIndex
                          ? "bg-[#1B4D36] text-white ring-2 ring-[#D4AF37]"
                          : "bg-[#F4EFE6] text-[#455A4F] hover:bg-[#E5DCCE]"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

                <button
                  disabled={currentStepIndex === selectedDerivation.steps.length - 1}
                  onClick={() =>
                    setCurrentStepIndex((prev) =>
                      Math.min(selectedDerivation.steps.length - 1, prev + 1)
                    )
                  }
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1B4D36] text-white text-xs font-medium hover:bg-[#123625] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Visual Derivation Flow (Timeline of Nodes) */}
          <div className="bg-[#FAF7F2] border border-[#DDD3C2] rounded-2xl p-6 sm:p-7 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#8C6A24]" />
                <h3 className="font-serif text-lg font-bold text-[#0F2D1F]">
                  Visual Derivation Trajectory (DAG Flow)
                </h3>
              </div>
              <span className="text-[11px] text-[#6A7F73]">
                Click any node to navigate to that derivation stage
              </span>
            </div>

            <div className="space-y-3 pt-2">
              {selectedDerivation.steps.map((step, idx) => {
                const isActive = idx === currentStepIndex;
                const isPassed = idx < currentStepIndex;
                return (
                  <div
                    key={idx}
                    onClick={() => setCurrentStepIndex(idx)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isActive
                        ? "bg-[#FAF1DA] border-[#D4AF37] shadow-sm ring-1 ring-[#D4AF37]"
                        : isPassed
                        ? "bg-[#F4EFE6] border-[#DDD3C2] hover:border-[#1B4D36]"
                        : "bg-[#FDFCFA] border-[#E3D9C8] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          isActive
                            ? "bg-[#B38622] text-white"
                            : isPassed
                            ? "bg-[#1B4D36] text-white"
                            : "bg-[#D8CFBF] text-[#4F5E55]"
                        }`}
                      >
                        {step.stepNumber}
                      </div>
                      <div>
                        <span className="font-serif text-lg font-bold text-[#0F2D1F] mr-3">
                          {step.intermediateForm}
                        </span>
                        <span className="text-xs text-[#526359]">{step.explanation}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[#FAF7F2] text-[#8C6A24] border border-[#DDD3C2]">
                        {step.sutraNumber}
                      </span>
                      <span className="text-xs text-[#1B4D36] font-serif font-bold">
                        {step.sutraDev}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PrakriyaPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center font-serif text-base text-[#8C6A24]">
          Loading Prakriyā Studio...
        </div>
      }
    >
      <PrakriyaContent />
    </Suspense>
  );
}
