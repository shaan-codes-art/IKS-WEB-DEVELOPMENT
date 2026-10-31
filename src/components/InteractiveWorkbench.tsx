"use client";

import React, { useState } from "react";
import Link from "next/link";
import Citation from "./Citation";
import {
  SIVA_SUTRAS,
  POPULAR_PRATYAHARAS,
  VERIFIED_DERIVATIONS,
  PratyaharaPreset,
  DerivationExample,
} from "../data/sanskritData";
import {
  BookOpen,
  Cpu,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

export default function InteractiveWorkbench() {
  const [activeTab, setActiveTab] = useState<"pratyahara" | "derivation" | "comparison">("pratyahara");

  // Pratyahara state
  const [selectedPratyahara, setSelectedPratyahara] = useState<PratyaharaPreset>(POPULAR_PRATYAHARAS[0]);
  const [activeSutraHover, setActiveSutraHover] = useState<number | null>(null);

  // Derivation state
  const [selectedDerivation, setSelectedDerivation] = useState<DerivationExample>(VERIFIED_DERIVATIONS[0]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const currentStep = selectedDerivation.steps[currentStepIndex];

  return (
    <div className="bg-[#FAF7F2] border border-[#E3D9C8] rounded-2xl shadow-xl overflow-hidden">
      {/* Workbench Header & Tabs */}
      <div className="bg-[#0F2D1F] text-[#FAF7F2] px-6 py-5 border-b border-[#245239]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></span>
              <span className="text-xs font-semibold tracking-wider text-[#D4AF37] uppercase">
                Interactive Research Workbench
              </span>
            </div>
            <h3 className="font-serif text-2xl font-bold tracking-tight text-[#FAF7F2]">
              Computational Pāṇinian Demonstrator
            </h3>
            <p className="text-xs text-[#BED0C5] mt-1">
              Test generative algorithms, decode Śivasūtras, and step through explainable rule derivations.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="grid w-full grid-cols-1 gap-1.5 rounded-xl border border-[#234F37] bg-[#071810] p-1.5 sm:grid-cols-2 md:flex md:w-auto">
            <button
              type="button"
              onClick={() => setActiveTab("pratyahara")}
              className={`flex min-w-0 w-full items-center justify-start gap-2 rounded-lg px-3.5 py-2 text-left text-xs font-medium transition-all sm:last:col-span-2 md:last:col-span-1 md:w-auto ${
                activeTab === "pratyahara"
                  ? "bg-[#1B4D36] text-[#FAF7F2] shadow-sm border border-[#D4AF37]/40"
                  : "text-[#A8C4B3] hover:text-[#FAF7F2]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              Pratyāhāra Decoder (Pedagogy)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("derivation")}
              className={`flex min-w-0 w-full items-center justify-start gap-2 rounded-lg px-3.5 py-2 text-left text-xs font-medium transition-all sm:last:col-span-2 md:last:col-span-1 md:w-auto ${
                activeTab === "derivation"
                  ? "bg-[#1B4D36] text-[#FAF7F2] shadow-sm border border-[#D4AF37]/40"
                  : "text-[#A8C4B3] hover:text-[#FAF7F2]"
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-[#D4AF37]" />
              X-NLP Derivation Stepper
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("comparison")}
              className={`flex min-w-0 w-full items-center justify-start gap-2 rounded-lg px-3.5 py-2 text-left text-xs font-medium transition-all sm:last:col-span-2 md:last:col-span-1 md:w-auto ${
                activeTab === "comparison"
                  ? "bg-[#1B4D36] text-[#FAF7F2] shadow-sm border border-[#D4AF37]/40"
                  : "text-[#A8C4B3] hover:text-[#FAF7F2]"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
              Explainability Matrix
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Pratyahara Decoder (Pedagogy & Formal Shorthand) */}
      {activeTab === "pratyahara" && (
        <div className="p-6 md:p-8 space-y-8">
          <div className="bg-[#F4EFE6] border border-[#E3D9C8] rounded-xl p-5 flex flex-col md:flex-row gap-6 items-start justify-between">
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#8C6A24] uppercase tracking-wider">
                Research 2 &bull; Educational Metalanguage <Citation numbers={[1, 3]} className="[&_a]:text-[#E5C97A]" />
              </span>
              <h4 className="font-serif text-xl font-bold text-[#0F2D1F]">
                The 14 Māheśvara (Śiva) Sūtras & Compression Engine
              </h4>
              <p className="text-xs text-[#455A4F] leading-relaxed max-w-2xl">
                Pāṇini compacted 42 phonemes into an algorithmic graph. Using Sūtra 1.1.71{" "}
                <span className="font-serif font-bold text-[#0F2D1F]">(आदिरन्त्येन सहेता)</span>, a starting phoneme combined with a final marker sound (<span className="italic">it-saṁjñā</span>) generates an exact, unambiguous phonemic subset.
              </p>
            </div>
            <div className="bg-[#FAF7F2] p-3.5 rounded-lg border border-[#DACFBE] text-center min-w-[200px]">
              <span className="text-[11px] text-[#697E72] block font-mono">Current Decoder Sūtra</span>
              <span className="font-serif text-base font-bold text-[#1B4D36] block mt-0.5">
                आदिरन्त्येन सहेता
              </span>
              <span className="text-[10px] text-[#8C6A24] font-mono block">Aṣṭādhyāyī 1.1.71</span>
            </div>
          </div>

          {/* Preset Buttons */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#526359] block mb-3">
              Select a Canonical Pratyāhāra Shorthand:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {POPULAR_PRATYAHARAS.map((p) => {
                const isSelected = selectedPratyahara.nameDev === p.nameDev;
                return (
                  <button
                    key={p.nameDev}
                    onClick={() => setSelectedPratyahara(p)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "bg-[#1B4D36] text-[#FAF7F2] border-[#1B4D36] shadow-md scale-[1.02]"
                        : "bg-[#FDFBF7] hover:bg-[#F5EFE6] text-[#192720] border-[#E3D9C8]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-xl font-bold">{p.nameDev}</span>
                      <span className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded ${
                        isSelected ? "bg-[#256145] text-[#D8CFB8]" : "bg-[#EDE5D6] text-[#63553C]"
                      }`}>
                        {p.nameIast}
                      </span>
                    </div>
                    <span className={`text-[11px] block mt-1 line-clamp-1 ${
                      isSelected ? "text-[#CFE0D5]" : "text-[#627368]"
                    }`}>
                      {p.category}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Result Card */}
          <div className="bg-[#FAF7F2] border-2 border-[#D4AF37]/40 rounded-xl p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-start">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-3xl font-bold text-[#0F2D1F]">
                    {selectedPratyahara.nameDev}
                  </span>
                  <span className="text-sm font-mono text-[#8C6A24] px-2.5 py-0.5 rounded-full bg-[#FAF1DA] border border-[#E5D2A5]">
                    {selectedPratyahara.nameIast}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-md bg-[#E8F0EC] text-[#1B4D36] font-medium border border-[#CADED2]">
                    {selectedPratyahara.category}
                  </span>
                </div>
                <p className="text-xs text-[#3E5246] max-w-xl leading-relaxed">
                  {selectedPratyahara.description}
                </p>
                <div className="text-[11px] text-[#697E72] flex items-center gap-2">
                  <span className="font-semibold text-[#1B4D36]">Application Context:</span>
                  <span>{selectedPratyahara.sutraRef}</span>
                </div>
              </div>

              {/* Phoneme output pill grid */}
              <div className="bg-[#F4EFE6] p-4 rounded-xl border border-[#E3D9C8] w-full lg:w-auto min-w-[280px]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6A24] block mb-2">
                  Extracted Sound Inventory ({selectedPratyahara.includedPhonemes.length}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPratyahara.includedPhonemes.map((ph, idx) => (
                    <span
                      key={idx}
                      className="inline-block px-2.5 py-1 rounded-md bg-[#FAF7F2] text-[#0F2D1F] border border-[#D5C7B3] font-mono text-xs font-semibold shadow-xs"
                    >
                      {ph}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 14 Siva Sutras Visual Matrix */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#526359]">
                The 14 Underlying Śiva Sūtra Rows (Hover to inspect):
              </h5>
              <span className="text-[11px] text-[#8C6A24] italic">
                Red highlighted marker = It-saṁjñā (elided in output)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2">
              {SIVA_SUTRAS.map((s) => (
                <div
                  key={s.id}
                  onMouseEnter={() => setActiveSutraHover(s.id)}
                  onMouseLeave={() => setActiveSutraHover(null)}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    activeSutraHover === s.id
                      ? "bg-[#FAF1DA] border-[#D4AF37] shadow-md scale-105"
                      : "bg-[#FDFBF7] border-[#E5DCce] hover:border-[#B38622]"
                  }`}
                >
                  <span className="text-[10px] font-mono text-[#8C6A24] block mb-0.5">
                    #{s.id}
                  </span>
                  <div className="font-serif text-lg font-bold text-[#0F2D1F]">
                    {s.devanagari.slice(0, -1)}
                    <span className="text-[#B91C1C] underline decoration-dotted" title="It-marker">
                      {s.itMarker}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#66786D] block mt-0.5">
                    {s.iast}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Explainable Sanskrit NLP Derivation Stepper */}
      {activeTab === "derivation" && (
        <div className="p-6 md:p-8 space-y-8">
          <div className="bg-[#F4EFE6] border border-[#E3D9C8] rounded-xl p-5 flex flex-col md:flex-row gap-6 items-start justify-between">
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#8C6A24] uppercase tracking-wider">
                Research 1 &bull; Explainable Sanskrit NLP (X-NLP) <Citation numbers={[1, 2]} className="[&_a]:text-[#E5C97A]" />
              </span>
              <h4 className="font-serif text-xl font-bold text-[#0F2D1F]">
                Formal Step-by-Step Derivation & Sūtra Provenance
              </h4>
              <p className="text-xs text-[#455A4F] leading-relaxed max-w-2xl">
                Unlike neural models that output final forms with zero rationale, the Pāṇinian engine guarantees mathematical transparency. Every transition is audited by a specific sūtra from the Aṣṭādhyāyī.
              </p>
            </div>

            {/* Derivation selector */}
            <div className="flex flex-col gap-1 w-full md:w-auto">
              <div className="flex items-center justify-between">
                <label htmlFor="workbench-derivation-select" className="text-[10px] font-bold uppercase tracking-wider text-[#697E72]">
                  Select Derivation Example:
                </label>
                <Link
                  href="/prakriya"
                  className="text-[10px] text-[#1B4D36] font-semibold hover:underline flex items-center gap-0.5 ml-2"
                >
                  <span>Full Studio ({VERIFIED_DERIVATIONS.length})</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </Link>
              </div>
              <select
                id="workbench-derivation-select"
                value={selectedDerivation.id}
                onChange={(e) => {
                  const found = VERIFIED_DERIVATIONS.find((d) => d.id === e.target.value);
                  if (found) {
                    setSelectedDerivation(found);
                    setCurrentStepIndex(0);
                  }
                }}
                className="bg-[#FAF7F2] border border-[#C5B7A1] text-xs rounded-lg px-3 py-2 text-[#0F2D1F] font-medium focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
              >
                {VERIFIED_DERIVATIONS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.typeLabel}: {d.targetForm} ({d.targetFormIast})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#1B4D36]">
                Step {currentStepIndex + 1} of {selectedDerivation.steps.length}
              </span>
              <span className="text-xs text-[#8C6A24] font-medium font-mono">
                Target: {selectedDerivation.targetForm} ({selectedDerivation.targetFormIast})
              </span>
            </div>
            <div className="w-full bg-[#E5DCCE] rounded-full h-2 overflow-hidden flex">
              {selectedDerivation.steps.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`h-full flex-1 cursor-pointer transition-all border-r border-[#FAF7F2] last:border-none ${
                    idx <= currentStepIndex ? "bg-[#1B4D36]" : "bg-[#DDD3C2] hover:bg-[#C9BDAB]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Main Active Step Display Card */}
          <div className="bg-[#FAF7F2] border-2 border-[#1B4D36]/25 rounded-2xl p-6 md:p-8 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Intermediate Form & Morphological Evolution */}
              <div className="lg:col-span-5 bg-[#F4EFE6] border border-[#DDD3C2] rounded-xl p-6 text-center space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6A24] block">
                  Current Morphological State &bull; Step {currentStep.stepNumber}
                </span>

                <div className="py-4">
                  <div className="font-serif text-4xl md:text-5xl font-bold text-[#0F2D1F] tracking-wide animate-fade-in">
                    {currentStep.intermediateForm}
                  </div>
                  <span className="text-xs font-mono text-[#586C60] block mt-2">
                    Input Base: {selectedDerivation.inputFormula}
                  </span>
                </div>

                <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#E8F0EC] text-[#1B4D36] border border-[#B8D5C4]">
                  {currentStep.sutraType}
                </div>
              </div>

              {/* Right Column: Sūtra Provenance, Citation, and Explanation */}
              <div className="lg:col-span-7 space-y-4">
                <div className="border-b border-[#E3D9C8] pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-[#FAF1DA] text-[#8C6A24] border border-[#E0CE9E] text-xs font-mono font-bold">
                      Aṣṭādhyāyī Sūtra {currentStep.sutraNumber}
                    </span>
                    <Link
                      href={`/sutras?search=${encodeURIComponent(currentStep.sutraNumber)}`}
                      className="text-xs text-[#1B4D36] hover:underline flex items-center gap-1 font-medium ml-auto"
                    >
                      <span>Inspect Rule</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#0F2D1F] mt-1">
                    {currentStep.sutraDev}
                  </h3>
                  <p className="text-xs font-mono text-[#6A7F73] italic">
                     &quot;{currentStep.sutraTrans}&quot;
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-bold text-[#1B4D36] block">
                      Rule Operation & Transformation:
                    </span>
                    <p className="text-xs text-[#283830] leading-relaxed mt-0.5">
                      {currentStep.explanation}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-[#8C6A24] block">
                      Explainable NLP Value:
                    </span>
                    <p className="text-xs text-[#455A4F] leading-relaxed mt-0.5 italic">
                      &ldquo;{currentStep.linguisticSignificance}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="mt-8 pt-6 border-t border-[#E3D9C8] flex items-center justify-between">
              <button
                disabled={currentStepIndex === 0}
                onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#D5C7B3] text-xs font-medium text-[#1B4D36] hover:bg-[#F4EFE6] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Step
              </button>

              <div className="flex items-center gap-2">
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
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1B4D36] text-white text-xs font-medium hover:bg-[#133A29] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                Next Step
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Explainability Comparison Matrix */}
      {activeTab === "comparison" && (
        <div className="p-6 md:p-8 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
            <span className="text-[11px] font-bold text-[#8C6A24] uppercase tracking-wider">
              Methodological Comparison
            </span>
            <h4 className="font-serif text-2xl font-bold text-[#0F2D1F]">
              Why Sanskrit NLP Demands Rule-Level Explainability
            </h4>
            <p className="text-xs text-[#526359] leading-relaxed">
              Sanskrit is morphologically rich, highly inflected, and governed by an axiomatic mathematical grammar. Comparing black-box approaches with Pāṇinian computational models highlights why explainability is non-negotiable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Black-box card */}
            <div className="bg-[#FAF3F3] border border-[#F0D5D5] rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#B91C1C]/10 text-[#B91C1C] flex items-center justify-center">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-serif text-lg font-bold text-[#7F1D1D]">
                    Conventional Statistical / Neural NLP
                  </h5>
                  <span className="text-[11px] text-[#991B1B]">
                    Black-Box Predictions (LLMs, BiLSTMs, Transformers)
                  </span>
                </div>
              </div>

              <ul className="space-y-3 text-xs text-[#602020]">
                <li className="flex items-start gap-2">
                  <span className="text-[#B91C1C] font-bold">&times;</span>
                  <span><strong>Zero Derivation Audit:</strong> Generates outputs (e.g. compound split or case) without showing which phonetic or semantic rule applied.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B91C1C] font-bold">&times;</span>
                  <span><strong>Hallucinations on Rare Forms:</strong> Fails on infrequent Vedic roots or complex samāsa due to sparse token representation in training corpora.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B91C1C] font-bold">&times;</span>
                  <span><strong>No Conflict Resolution Guarantee:</strong> Cannot prove why Rule A superseded Rule B in ambiguous morphosyntactic contexts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B91C1C] font-bold">&times;</span>
                  <span><strong>Ineffective for Pedagogy:</strong> A student cannot learn grammar rules from a model that merely outputs raw strings without explanation.</span>
                </li>
              </ul>
            </div>

            {/* Explainable Paninian card */}
            <div className="bg-[#F0F7F2] border border-[#C5DEC9] rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1B4D36]/10 text-[#1B4D36] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-serif text-lg font-bold text-[#0F2D1F]">
                    Explainable Pāṇinian Computational NLP (X-NLP)
                  </h5>
                  <span className="text-[11px] text-[#1B4D36] font-medium">
                    Axiomatic & Formal (The Aṣṭādhyāyī Framework)
                  </span>
                </div>
              </div>

              <ul className="space-y-3 text-xs text-[#1D3E2B]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B4D36] shrink-0 mt-0.5" />
                  <span><strong>100% Sūtra Provenance:</strong> Every morpheme change maps directly to an Aṣṭādhyāyī number with verifiable preconditions (*animitta*).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B4D36] shrink-0 mt-0.5" />
                  <span><strong>Formal Conflict Resolution:</strong> Rigorously orders competing rules using 1.4.2 <em>vipratiṣedhe paraṁ kāryam</em>, Nitya, Antaraṅga, and Apavāda metarules.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B4D36] shrink-0 mt-0.5" />
                  <span><strong>Generative Completeness:</strong> Inflects rare Vedic and classical roots with mathematical determinism regardless of corpus frequency.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1B4D36] shrink-0 mt-0.5" />
                  <span><strong>Pedagogical Empowerment:</strong> Directly serves student learning by turning grammar into an interactive, step-by-step discovery process.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
