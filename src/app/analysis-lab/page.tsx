"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Citation from "../../components/Citation";
import {
  VERIFIED_SANDHI_ANALYSIS,
  VERIFIED_MORPH_ANALYSIS,
  VERIFIED_KARAKA_SENTENCES,
  SandhiAnalysisItem,
  MorphAnalysisItem,
  KarakaDependencySentence,
} from "../../data/analysisData";
import {
  Cpu,
  Layers,
  Sparkles,
  GitBranch,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  BookOpen,
  Search,
  ShieldCheck,
  Split,
  Binary,
  Info,
  AlertCircle,
  CornerDownRight,
} from "lucide-react";

export default function AnalysisLabPage() {
  const [activeTab, setActiveTab] = useState<"sandhi" | "morphology" | "karaka">("sandhi");
  const [userQuery, setUserQuery] = useState<string>("");
  const [inputMessage, setInputMessage] = useState("");
  const normalizedText = userQuery.normalize("NFC").trim().replace(/\s+/gu, " ");
  const textTokens = normalizedText ? normalizedText.split(" ") : [];
  const sentenceCount = normalizedText ? normalizedText.split(/[.!?।॥]+/u).filter((sentence) => sentence.trim()).length : 0;

  // Sandhi State
  const [selectedSandhi, setSelectedSandhi] = useState<SandhiAnalysisItem>(VERIFIED_SANDHI_ANALYSIS[0]);

  // Morphology State
  const [selectedMorph, setSelectedMorph] = useState<MorphAnalysisItem>(VERIFIED_MORPH_ANALYSIS[0]);

  // Karaka State
  const [selectedSentence, setSelectedSentence] = useState<KarakaDependencySentence>(VERIFIED_KARAKA_SENTENCES[0]);

  // Dynamic search matching
  const matchingSandhi = useMemo(() => {
    const q = userQuery.normalize("NFC").trim().toLowerCase();
    if (!q) return VERIFIED_SANDHI_ANALYSIS;
    return VERIFIED_SANDHI_ANALYSIS.filter(
      (s) =>
        s.combined.normalize("NFC").toLowerCase().includes(q) ||
        s.combinedIast.toLowerCase().includes(q) ||
        s.split.normalize("NFC").toLowerCase().includes(q) ||
        s.splitIast.toLowerCase().includes(q) ||
        s.searchKeywords.some((k) => k.normalize("NFC").toLowerCase().includes(q))
    );
  }, [userQuery]);

  const matchingMorph = useMemo(() => {
    const q = userQuery.normalize("NFC").trim().toLowerCase();
    if (!q) return VERIFIED_MORPH_ANALYSIS;
    return VERIFIED_MORPH_ANALYSIS.filter(
      (m) =>
        m.word.normalize("NFC").toLowerCase().includes(q) ||
        m.wordIast.toLowerCase().includes(q) ||
        m.baseStem.toLowerCase().includes(q) ||
        m.searchKeywords.some((k) => k.normalize("NFC").toLowerCase().includes(q))
    );
  }, [userQuery]);

  const matchingKaraka = useMemo(() => {
    const q = userQuery.normalize("NFC").trim().toLowerCase();
    if (!q) return VERIFIED_KARAKA_SENTENCES;
    return VERIFIED_KARAKA_SENTENCES.filter(
      (k) =>
        k.sentenceDev.normalize("NFC").toLowerCase().includes(q) ||
        k.sentenceIast.toLowerCase().includes(q) ||
        k.searchKeywords.some((kw) => kw.normalize("NFC").toLowerCase().includes(q))
    );
  }, [userQuery]);

  const handleQuickSample = (sampleText: string) => {
    setUserQuery(sampleText);
    const sandhiHit = VERIFIED_SANDHI_ANALYSIS.find((s) => s.searchKeywords.includes(sampleText.toLowerCase()) || s.combined === sampleText);
    if (sandhiHit) {
      setSelectedSandhi(sandhiHit);
      setActiveTab("sandhi");
      return;
    }
    const morphHit = VERIFIED_MORPH_ANALYSIS.find((m) => m.searchKeywords.includes(sampleText.toLowerCase()) || m.word === sampleText);
    if (morphHit) {
      setSelectedMorph(morphHit);
      setActiveTab("morphology");
      return;
    }
    const karakaHit = VERIFIED_KARAKA_SENTENCES.find((k) => k.searchKeywords.some((kw) => kw.includes(sampleText.toLowerCase())));
    if (karakaHit) {
      setSelectedSentence(karakaHit);
      setActiveTab("karaka");
    }
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
          <span className="text-[#0F2D1F] font-semibold">Sanskrit Analysis Lab</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EC] text-[#1B4D36] text-xs font-semibold border border-[#BED7C7]">
            <Cpu className="w-3.5 h-3.5" />
            <span>Section 2 &bull; Explainable Sanskrit Analysis Lab</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/explainable-nlp"
              className="text-xs font-mono text-[#1B4D36] bg-[#FAF1DA] px-3 py-1 rounded border border-[#E0CE9E] hover:underline flex items-center gap-1"
            >
              <span>Complements Research 1 (X-NLP)</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0F2D1F] tracking-tight leading-tight">
            Sanskrit Computational Analysis Lab
          </h1>
          <p className="text-sm sm:text-base text-[#465A4F] max-w-3xl leading-relaxed">
            An explainable NLP workbench demonstrating rule-based sandhi decomposition, morphological feature tagging, and Kāraka semantic dependency parsing with Aṣṭādhyāyī sūtra references. <Citation numbers={[1, 2]} />
          </p>
        </div>

        {/* Engine Transparency & Scope Disclosure */}
        <div className="bg-[#FAF1DA]/70 border border-[#D4AF37]/50 rounded-xl p-4 flex items-start gap-3 text-xs text-[#614A19]">
          <Info className="w-4 h-4 text-[#B38622] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="font-semibold block">
              Analysis Engine Scope & Integrity Disclosure (Phase 3):
            </strong>
            <p className="leading-relaxed">
              This interactive laboratory retrieves explanations from a curated, attributed Pāṇinian example set. 
              <strong> We do not claim arbitrary automated analysis for unconstrained text input</strong> without the full statistical/rule parser backend. Enter a query or select from verified benchmark items below to audit authentic derivation stages.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Input & Search Sandbox */}
      <div className="bg-[#FAF7F2] border-2 border-[#1B4D36]/20 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#0F2D1F]">
              Enter or Select a Sanskrit Token for Explainable Analysis
            </h3>
            <p className="text-xs text-[#526359]">
              Type a word in Devanāgarī (e.g. <em>इत्याह, भवति, रामः</em>) or IAST (e.g. <em>ityaha, devendra</em>) to inspect rule citations:
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#8C6A24] absolute left-3.5 top-3" />
            <input
              type="text"
              aria-label="Search Sanskrit analysis examples"
              value={userQuery}
              maxLength={500}
              onChange={(e) => {
                const value = e.target.value;
                if (Array.from(value).length > 500) {
                  setInputMessage("Please limit analysis searches to 500 characters.");
                  return;
                }
                setUserQuery(value);
                setInputMessage("");
              }}
              placeholder="Search curated examples"
              className="w-full bg-[#FDFCFA] border border-[#DDD3C2] text-xs rounded-xl pl-10 pr-4 py-2.5 text-[#0F2D1F] focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
            />
          </div>
        </div>
        <div className="space-y-2 rounded-lg border border-[#DDD3C2] bg-[#F4EFE6] p-3" aria-live="polite">
          <p className="text-[11px] text-[#526359]">
            Input is normalized to Unicode NFC and whitespace is collapsed. Counts below are basic text statistics, not grammatical analysis.
          </p>
          <p className="text-xs text-[#1B4D36]">
            {Array.from(normalizedText).length} characters · {textTokens.length} whitespace-separated tokens · {sentenceCount} sentence{sentenceCount === 1 ? "" : "s"}
          </p>
          {textTokens.length > 0 && (
            <div className="flex flex-wrap gap-1.5" aria-label="Whitespace-separated text tokens">
              {textTokens.map((token, index) => <span key={`${token}-${index}`} className="rounded bg-[#FAF7F2] px-2 py-1 font-serif text-xs text-[#33463B]">{token}</span>)}
            </div>
          )}
          {inputMessage && <p role="alert" className="text-xs font-semibold text-[#9B1C1C]">{inputMessage}</p>}
        </div>

        {/* Quick Sample Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-[#6A7F73] font-mono text-[11px]">Quick Samples:</span>
          {["इत्याह", "देवेन्द्रः", "तच्छिवः", "रामो गच्छति", "भवति", "रामः", "फलानि", "करोति"].map((sample) => (
            <button
              key={sample}
              onClick={() => handleQuickSample(sample)}
              className="px-2.5 py-1 rounded-lg bg-[#F4EFE6] hover:bg-[#FAF1DA] text-[#1B4D36] border border-[#DDD3C2] font-serif text-xs transition-colors"
            >
              {sample}
            </button>
          ))}
          {userQuery && (
            <button
              onClick={() => setUserQuery("")}
              className="text-[11px] text-[#B91C1C] hover:underline ml-auto"
            >
              Clear filter
            </button>
          )}
        </div>
      </div>

      {/* Main Studio Navigation Tabs */}
      <div className="flex flex-wrap bg-[#F4EFE6] p-1.5 rounded-xl border border-[#DDD3C2] gap-1">
        <button
          type="button"
          aria-pressed={activeTab === "sandhi"}
          onClick={() => setActiveTab("sandhi")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "sandhi"
              ? "bg-[#1B4D36] text-white shadow-xs"
              : "text-[#3F5247] hover:bg-[#EAE2D4]"
          }`}
        >
          <Split className="w-4 h-4 text-[#D4AF37]" />
          <span>Sandhi Analyzer & Splitter ({matchingSandhi.length})</span>
        </button>
        <button
          type="button"
          aria-pressed={activeTab === "morphology"}
          onClick={() => setActiveTab("morphology")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "morphology"
              ? "bg-[#1B4D36] text-white shadow-xs"
              : "text-[#3F5247] hover:bg-[#EAE2D4]"
          }`}
        >
          <Binary className="w-4 h-4 text-[#D4AF37]" />
          <span>Morphological Feature Analyzer ({matchingMorph.length})</span>
        </button>
        <button
          type="button"
          aria-pressed={activeTab === "karaka"}
          onClick={() => setActiveTab("karaka")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "karaka"
              ? "bg-[#1B4D36] text-white shadow-xs"
              : "text-[#3F5247] hover:bg-[#EAE2D4]"
          }`}
        >
          <GitBranch className="w-4 h-4 text-[#D4AF37]" />
          <span>Kāraka Dependency Parsing ({matchingKaraka.length})</span>
        </button>
      </div>

      {/* TAB 1: SANDHI ANALYZER */}
      {activeTab === "sandhi" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Palette */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6A7F73] block">
                Matching Curated Sandhi ({matchingSandhi.length}):
              </span>
              <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                {matchingSandhi.map((item) => {
                  const isSelected = selectedSandhi.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedSandhi(item)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? "bg-[#FAF7F2] border-[#1B4D36] shadow-sm ring-2 ring-[#1B4D36]/20"
                          : "bg-[#FDFCFA] border-[#DDD3C2] hover:bg-[#F7F2E9]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-lg font-bold text-[#0F2D1F]">
                          {item.combined}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF1DA] text-[#8C6A24]">
                          {item.sutraNumber}
                        </span>
                      </div>
                      <div className="text-xs text-[#1B4D36] font-medium mt-1">
                        Split: {item.split}
                      </div>
                      <span className="text-[11px] text-[#6A7F73] block mt-1">
                        {item.sandhiType}
                      </span>
                    </div>
                  );
                })}

                {matchingSandhi.length === 0 && (
                  <div className="p-4 rounded-xl bg-[#FAF1DA]/60 border border-[#E0CE9E] text-xs text-[#6A5420] space-y-2">
                    <div className="flex items-center gap-1.5 font-bold">
                      <AlertCircle className="w-4 h-4 text-[#B38622]" />
                      <span>Custom Token Notice</span>
                    </div>
                    <p>
                      No direct sandhi example found for &ldquo;{userQuery}&rdquo; in the curated collection.
                    </p>
                    <button
                      onClick={() => setUserQuery("")}
                      className="text-[#1B4D36] underline font-semibold block"
                    >
                      Reset filter to show all curated sandhi examples
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Display Card */}
            <div className="lg:col-span-8 bg-[#FAF7F2] border-2 border-[#1B4D36]/20 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E3D9C8] pb-4">
                <div>
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[#E8F0EC] text-[#1B4D36]">
                    {selectedSandhi.sandhiType}
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-[#0F2D1F] mt-2">
                    {selectedSandhi.combined}{" "}
                    <span className="text-xl font-mono text-[#586D60] font-normal">
                      ({selectedSandhi.combinedIast})
                    </span>
                  </h3>
                  <p className="text-xs text-[#6A7F73] mt-0.5">
                    Constituents: <strong className="text-[#0F2D1F]">{selectedSandhi.split}</strong> ({selectedSandhi.splitIast})
                  </p>
                </div>

                <div className="bg-[#F4EFE6] px-4 py-2.5 rounded-xl border border-[#DDD3C2] text-center self-start sm:self-auto">
                  <span className="text-[10px] uppercase font-mono text-[#8C6A24] block">
                    Authorizing Sūtra
                  </span>
                  <span className="font-serif text-sm font-bold text-[#1B4D36] block">
                    {selectedSandhi.governingSutra}
                  </span>
                  <span className="text-[10px] font-mono text-[#6A7F73]">
                    Aṣṭādhyāyī {selectedSandhi.sutraNumber}
                  </span>
                </div>
              </div>

              {/* Phonetic Process Box */}
              <div className="bg-[#FDFCFA] border border-[#DDD3C2] rounded-xl p-5 space-y-2">
                <span className="text-xs font-bold text-[#1B4D36] block">
                  Phonetic Rewrite Trajectory:
                </span>
                <div className="font-mono text-base font-bold text-[#0F2D1F] bg-[#F4EFE6] p-3 rounded-lg border border-[#E3D9C8]">
                  {selectedSandhi.phoneticProcess}
                </div>
              </div>

              {/* Detailed Explanation */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#8C6A24] block">
                  Explainable Morphophonological Analysis:
                </span>
                <p className="text-xs sm:text-sm text-[#2D3F34] leading-relaxed bg-[#FAF1DA]/40 p-4 rounded-xl border border-[#E5D5B2]">
                  {selectedSandhi.explanation}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E3D9C8] flex justify-end">
                <Link
                  href={`/sutras?search=${encodeURIComponent(selectedSandhi.sutraNumber)}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B4D36] hover:underline"
                >
                  <span>Inspect Sūtra {selectedSandhi.sutraNumber} in Knowledge Graph</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MORPHOLOGICAL FEATURE ANALYZER */}
      {activeTab === "morphology" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Palette */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6A7F73] block">
                Matching Curated Forms ({matchingMorph.length}):
              </span>
              <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                {matchingMorph.map((item) => {
                  const isSelected = selectedMorph.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedMorph(item)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? "bg-[#FAF7F2] border-[#1B4D36] shadow-sm ring-2 ring-[#1B4D36]/20"
                          : "bg-[#FDFCFA] border-[#DDD3C2] hover:bg-[#F7F2E9]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-lg font-bold text-[#0F2D1F]">
                          {item.word}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E8F0EC] text-[#1B4D36]">
                          {item.pos.split(" ")[0]}
                        </span>
                      </div>
                      <div className="text-xs text-[#526359] mt-1">
                        Stem: {item.baseStem} &bull; Affix: {item.affix}
                      </div>
                    </div>
                  );
                })}

                {matchingMorph.length === 0 && (
                  <div className="p-4 rounded-xl bg-[#FAF1DA]/60 border border-[#E0CE9E] text-xs text-[#6A5420] space-y-2">
                    <div className="flex items-center gap-1.5 font-bold">
                      <AlertCircle className="w-4 h-4 text-[#B38622]" />
                      <span>Custom Token Notice</span>
                    </div>
                    <p>
                      No morphological example found for &ldquo;{userQuery}&rdquo; in the curated collection.
                    </p>
                    <button
                      onClick={() => setUserQuery("")}
                      className="text-[#1B4D36] underline font-semibold block"
                    >
                      Reset filter to show all curated forms
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Display Card */}
            <div className="lg:col-span-8 bg-[#FAF7F2] border-2 border-[#1B4D36]/20 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="border-b border-[#E3D9C8] pb-4">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[#FAF1DA] text-[#8C6A24]">
                  {selectedMorph.pos}
                </span>
                <h3 className="font-serif text-3xl font-bold text-[#0F2D1F] mt-2">
                  {selectedMorph.word}{" "}
                  <span className="text-xl font-mono text-[#586D60] font-normal">
                    ({selectedMorph.wordIast})
                  </span>
                </h3>
                <p className="text-xs text-[#6A7F73] mt-0.5">
                  Semantic Gloss: <strong>{selectedMorph.semanticGloss}</strong>
                </p>
              </div>

              {/* Morphosyntactic Breakdown Table */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#FDFCFA] p-3 rounded-lg border border-[#DDD3C2]">
                  <span className="text-[10px] text-[#6A7F73] uppercase font-mono block">Base Stem</span>
                  <span className="font-serif text-base font-bold text-[#0F2D1F]">{selectedMorph.baseStem}</span>
                </div>
                <div className="bg-[#FDFCFA] p-3 rounded-lg border border-[#DDD3C2]">
                  <span className="text-[10px] text-[#6A7F73] uppercase font-mono block">Affix</span>
                  <span className="font-serif text-base font-bold text-[#0F2D1F]">{selectedMorph.affix}</span>
                </div>
                <div className="bg-[#FDFCFA] p-3 rounded-lg border border-[#DDD3C2]">
                  <span className="text-[10px] text-[#6A7F73] uppercase font-mono block">Case / Tense</span>
                  <span className="font-serif text-xs font-bold text-[#1B4D36] block mt-0.5">{selectedMorph.vibhaktiOrLakara}</span>
                </div>
                <div className="bg-[#FDFCFA] p-3 rounded-lg border border-[#DDD3C2]">
                  <span className="text-[10px] text-[#6A7F73] uppercase font-mono block">Number / Gender</span>
                  <span className="font-serif text-xs font-bold text-[#8C6A24] block mt-0.5">{selectedMorph.vacana}</span>
                </div>
              </div>

              {/* Sūtra Provenance Stack */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#1B4D36] block">
                  Authorizing Pāṇinian Sūtra Pipeline:
                </span>
                <div className="space-y-1.5">
                  {selectedMorph.governingSutras.map((sutra, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2.5 rounded-lg bg-[#F4EFE6] border border-[#DDD3C2] text-xs text-[#2A3B31]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4D36] shrink-0" />
                      <span>{sutra}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E3D9C8] flex justify-end">
                <Link
                  href="/word-formation"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B4D36] hover:underline"
                >
                  <span>View Full Step-by-Step Prakriyā &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: KĀRAKA DEPENDENCY PARSER */}
      {activeTab === "karaka" && (
        <div className="space-y-8">
          <div className="bg-[#FAF7F2] border-2 border-[#1B4D36]/20 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E3D9C8] pb-4">
              <div>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[#FAF1DA] text-[#8C6A24]">
                  Kāraka Syntactic Dependency Tree
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2D1F] mt-2">
                  {selectedSentence.sentenceDev}
                </h3>
                <p className="text-xs font-mono text-[#6A7F73] italic">
                   &quot;{selectedSentence.sentenceIast}&quot; &bull; {selectedSentence.translation}
                </p>
              </div>

              {/* Selector */}
              <div className="flex flex-col gap-1">
                <label htmlFor="karaka-sentence-select" className="text-[10px] font-bold uppercase tracking-wider text-[#6A7F73]">
                  Choose Sentence:
                </label>
                <select
                  id="karaka-sentence-select"
                  value={selectedSentence.id}
                  onChange={(e) => {
                    const found = VERIFIED_KARAKA_SENTENCES.find((s) => s.id === e.target.value);
                    if (found) setSelectedSentence(found);
                  }}
                  className="bg-[#FDFCFA] border border-[#DDD3C2] text-xs rounded-lg px-3 py-2 text-[#0F2D1F] font-medium focus:ring-2 focus:ring-[#1B4D36]"
                >
                  {matchingKaraka.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.sentenceDev}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Visual Dependency Tree Nodes */}
            <div className="bg-[#0F2D1F] rounded-xl p-6 sm:p-8 text-white space-y-6 overflow-x-auto shadow-inner border border-[#234F37]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] block">
                Visual Kāraka-to-Kriyā Dependency Graph:
              </span>

              <div className="min-w-[650px] grid grid-cols-4 gap-4 items-center">
                {selectedSentence.words.map((word, idx) => {
                  const isVerb = word.karakaRole === "Kriyā (Action)";
                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border text-center space-y-2 ${
                        isVerb
                          ? "bg-[#1B4D36] border-[#D4AF37] ring-2 ring-[#D4AF37] shadow-lg"
                          : "bg-[#163826] border-[#2A6546]"
                      }`}
                    >
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] block">
                        {word.karakaRole}
                      </span>
                      <div className="font-serif text-2xl font-bold text-white">
                        {word.token}
                      </div>
                      <span className="text-[11px] font-mono text-[#A8C4B3] block">
                        {word.caseNumber}
                      </span>
                      <div className="text-[10px] font-mono bg-[#0D2418] py-1 px-2 rounded text-[#E8DFC9] border border-[#235339]">
                        &rarr; {word.dependencyHead}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Kāraka Rule Attributions Grid */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#0F2D1F] block">
                Sūtra Justifications for Thematic Role Assignment:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedSentence.words.map((word, idx) => (
                  <div key={idx} className="bg-[#FDFCFA] p-3.5 rounded-xl border border-[#DDD3C2] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-base font-bold text-[#0F2D1F]">{word.token}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF1DA] text-[#8C6A24]">
                        {word.karakaRole}
                      </span>
                    </div>
                    <div className="text-xs text-[#526359]">
                      <strong>Aṣṭādhyāyī Sūtra:</strong> {word.karakaSutra}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
