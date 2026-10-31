"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import Citation from "../../components/Citation";
import { useSearchParams } from "next/navigation";
import { VERIFIED_SUTRAS, AstadhyayiSutra } from "../../data/sutraData";
import { VERIFIED_DERIVATIONS } from "../../data/sanskritData";
import { EMPTY_PROGRESS, LearningProgress, readLearningProgress, saveLearningProgress } from "../../lib/learningProgress";
import {
  Search,
  BookOpen,
  GitBranch,
  Network,
  Filter,
  ArrowRight,
  ExternalLink,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
  Share2,
  Bookmark,
} from "lucide-react";

function SutrasContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedDerivationFilter, setSelectedDerivationFilter] = useState<string>("all");
  const [selectedSutra, setSelectedSutra] = useState<AstadhyayiSutra | null>(null);
  const [activeGraphNode, setActiveGraphNode] = useState<string | null>("6.1.77");
  const [progress, setProgress] = useState<LearningProgress>(EMPTY_PROGRESS);
  const [bookmarkMessage, setBookmarkMessage] = useState("");

  useEffect(() => {
    try {
      setProgress(readLearningProgress());
    } catch {
      setBookmarkMessage("Saved bookmarks could not be loaded from this browser.");
    }
  }, []);

  useEffect(() => {
    if (initialSearch) {
      setSearchQuery(initialSearch);
      const match = VERIFIED_SUTRAS.find((s) => s.number === initialSearch);
      if (match) {
        setSelectedSutra(match);
        setActiveGraphNode(match.number);
      }
    }
  }, [initialSearch]);

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "Metalanguage & Phonology", label: "Metalanguage & Phonology" },
    { id: "Sandhi (Phonetic Junction)", label: "Sandhi (Phonology)" },
    { id: "Subanta (Nominal Inflection)", label: "Subanta (Nominal)" },
    { id: "Tiṅanta (Verbal Conjugation)", label: "Tiṅanta (Verbal)" },
    { id: "Conflict Resolution & Metarules", label: "Metarules & Conflict" },
  ];

  const derivationFilters = [
    { id: "all", label: "All Derivations" },
    { id: "dhatu-bhu", label: "भवति (bhavati)" },
    { id: "dhatu-gam", label: "गच्छति (gacchati)" },
    { id: "pratipadika-rama", label: "रामः (rāmaḥ)" },
    { id: "sandhi-yan", label: "इत्याह (ityāha)" },
    { id: "sandhi-guna", label: "देवेन्द्रः (devendraḥ)" },
  ];

  const filteredSutras = useMemo(() => {
    return VERIFIED_SUTRAS.filter((sutra) => {
      const matchesCategory =
        selectedCategory === "all" || sutra.category === selectedCategory;
      const matchesType = selectedType === "all" || sutra.type === selectedType;

      const matchesDerivation =
        selectedDerivationFilter === "all" ||
        sutra.relatedDerivations.includes(selectedDerivationFilter);

      const q = searchQuery.normalize("NFC").toLowerCase().trim();
      if (!q) return matchesCategory && matchesType && matchesDerivation;

      const matchesQuery =
        sutra.number.toLowerCase().includes(q) ||
        sutra.devanagari.normalize("NFC").toLowerCase().includes(q) ||
        sutra.iast.toLowerCase().includes(q) ||
        sutra.translation.toLowerCase().includes(q) ||
        sutra.detailedAnalysis.toLowerCase().includes(q);

      return matchesCategory && matchesType && matchesDerivation && matchesQuery;
    });
  }, [searchQuery, selectedCategory, selectedType, selectedDerivationFilter]);

  // Find linked derivations for the selected sūtra
  const linkedDerivations = useMemo(() => {
    if (!selectedSutra) return [];
    return VERIFIED_DERIVATIONS.filter((d) =>
      selectedSutra.relatedDerivations.includes(d.id)
    );
  }, [selectedSutra]);

  // Active sūtra for graph display
  const graphSutra = useMemo(() => {
    return (
      VERIFIED_SUTRAS.find((s) => s.number === activeGraphNode) ||
      VERIFIED_SUTRAS[0]
    );
  }, [activeGraphNode]);

  // Helper to check if a sutra is in the active derivation
  const isSutraInActiveDerivation = (sutraNumber: string) => {
    if (selectedDerivationFilter === "all") return false;
    const s = VERIFIED_SUTRAS.find((item) => item.number === sutraNumber);
    return s ? s.relatedDerivations.includes(selectedDerivationFilter) : false;
  };

  const toggleSutraBookmark = (number: string) => {
    const bookmarkedSutraNumbers = progress.bookmarkedSutraNumbers.includes(number)
      ? progress.bookmarkedSutraNumbers.filter((sutraNumber) => sutraNumber !== number)
      : [...progress.bookmarkedSutraNumbers, number];
    const nextProgress = { ...progress, bookmarkedSutraNumbers };
    try {
      saveLearningProgress(nextProgress);
      setProgress(nextProgress);
      setBookmarkMessage(bookmarkedSutraNumbers.includes(number) ? "Sūtra bookmarked." : "Sūtra bookmark removed.");
    } catch {
      setBookmarkMessage("This browser could not save the sūtra bookmark.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-[#E3D9C8] pb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#6A7F73]">
          <Link href="/" className="hover:text-[#1B4D36] transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-[#8C6A24] font-medium">Core Architecture Section</span>
          <span>&gt;</span>
          <span className="text-[#0F2D1F] font-semibold">
            Sūtra Search & Knowledge Graph
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF1DA] text-[#8C6A24] text-xs font-semibold border border-[#E0CE9E]">
            <Network className="w-3.5 h-3.5" />
            <span>Section 6 &bull; Aṣṭādhyāyī Sūtra Knowledge Graph</span>
          </div>

          <div className="text-xs font-mono text-[#1B4D36] bg-[#E8F0EC] px-3 py-1 rounded border border-[#BBD5C5]">
            Curated Rule Dataset: {VERIFIED_SUTRAS.length} Sūtra Records
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0F2D1F] tracking-tight leading-tight">
            Aṣṭādhyāyī Sūtra Knowledge Graph
          </h1>
          <p className="text-sm sm:text-base text-[#465A4F] max-w-3xl leading-relaxed">
            Search canonical Pāṇinian sūtra numbers, inspect the website&apos;s rule classifications and English glosses, visualize its graph dependencies, and examine curated derivation examples. The glosses and interpretations are editorial text; the source edition is not recorded. <Citation numbers={[1]} />
          </p>
        </div>

        {/* Verifiability Disclaimer */}
        <div className="bg-[#F4EFE6] border border-[#DDD3C2] rounded-xl p-4 flex items-start gap-3 text-xs text-[#526359]">
          <Info className="w-4 h-4 text-[#8C6A24] shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold text-[#0F2D1F] block mb-0.5">
              Attributed Dataset Scope (Academic Integrity):
            </strong>
            This module provides a curated catalog of <strong>{VERIFIED_SUTRAS.length} Aṣṭādhyāyī sūtra records</strong> used by the website&apos;s derivation examples. Sūtra numbers identify the primary text locations; English glosses and interpretations are editorial and require comparison with a named scholarly edition before academic reuse. <Citation numbers={[1]} />
          </div>
        </div>
      </div>

      {/* Interactive Visual Knowledge Graph Section */}
      <section className="bg-[#FAF7F2] border-2 border-[#1B4D36]/20 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E3D9C8] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8C6A24]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C6A24]">
                Interactive Rule Network
              </span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#0F2D1F] mt-0.5">
              Pāṇinian Grammatical Hierarchy Graph
            </h3>
            <p className="text-xs text-[#526359] mt-0.5">
              Click on any rule node to inspect its operational hierarchy and interconnected rules.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="w-3 h-3 rounded-full bg-[#1B4D36]"></span>
            <span className="text-[#526359]">Operational (Vidhi)</span>
            <span className="w-3 h-3 rounded-full bg-[#B38622] ml-2"></span>
            <span className="text-[#526359]">Metarule (Paribhāṣā/Saṁjñā)</span>
          </div>
        </div>

        {/* Derivation Highlighting Filter Bar */}
        <div className="bg-[#F4EFE6] p-3.5 rounded-xl border border-[#DDD3C2] flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-[#0F2D1F] flex items-center gap-1.5 mr-1">
            <Filter className="w-3.5 h-3.5 text-[#8C6A24]" />
            Trace Derivation Flow:
          </span>
          {derivationFilters.map((d) => (
            <button
              key={d.id}
              type="button"
              aria-pressed={selectedDerivationFilter === d.id}
              onClick={() => setSelectedDerivationFilter(d.id)}
              className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                selectedDerivationFilter === d.id
                  ? "bg-[#1B4D36] text-white font-medium shadow-xs"
                  : "bg-[#FDFCFA] text-[#455A4F] hover:bg-[#EAE2D4] border border-[#DDD3C2]"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* The Graph Canvas / Matrix */}
        <div className="bg-[#0F2D1F] rounded-xl p-6 sm:p-8 text-white space-y-6 overflow-hidden relative shadow-inner border border-[#245239]">
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Node Flow Rows */}
          <div className="space-y-6 relative z-10">
            {/* Layer 1: Metalanguage & Metarules */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] block mb-2">
                Tier 1: Definition & Metarules (Saṁjñā & Paribhāṣā)
              </span>
              <div className="flex flex-wrap gap-2.5">
                {["1.1.71", "1.1.2", "1.1.50", "1.2.45", "1.3.2", "1.3.9", "1.4.2"].map((num) => {
                  const s = VERIFIED_SUTRAS.find((item) => item.number === num);
                  if (!s) return null;
                  const isActive = activeGraphNode === num;
                  const isHighlighted = isSutraInActiveDerivation(num);
                  return (
                    <button
                      key={num}
                      onClick={() => {
                        setActiveGraphNode(num);
                        setSelectedSutra(s);
                      }}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all text-left border ${
                        isActive
                          ? "bg-[#D4AF37] text-[#0F2D1F] border-white shadow-lg scale-105 font-bold"
                          : isHighlighted
                          ? "bg-[#2A593F] text-[#FAF7F2] border-[#D4AF37] ring-2 ring-[#D4AF37]/50"
                          : "bg-[#183D2B] text-[#D8CFB8] border-[#2A6546] hover:bg-[#20523A]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono block text-[10px]">{s.number}</span>
                        {isHighlighted && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                        )}
                      </div>
                      <span className="font-serif">{s.devanagari}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Connecting Indicator */}
            <div className="flex items-center gap-3 text-[#A8C4B3] text-xs font-mono">
              <span className="h-[1px] flex-1 bg-[#26533B]"></span>
              <span>&darr; Governs & Arbitrates Operational Rules &darr;</span>
              <span className="h-[1px] flex-1 bg-[#26533B]"></span>
            </div>

            {/* Layer 2: Operational Rules */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] block mb-2">
                Tier 2: Operational Transformation Rules (Vidhi Sūtras)
              </span>
              <div className="flex flex-wrap gap-2.5">
                {["6.1.77", "6.1.78", "6.1.87", "7.3.77", "7.3.84", "8.2.66", "8.3.15"].map((num) => {
                  const s = VERIFIED_SUTRAS.find((item) => item.number === num);
                  if (!s) return null;
                  const isActive = activeGraphNode === num;
                  const isHighlighted = isSutraInActiveDerivation(num);
                  return (
                    <button
                      key={num}
                      onClick={() => {
                        setActiveGraphNode(num);
                        setSelectedSutra(s);
                      }}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all text-left border ${
                        isActive
                          ? "bg-[#1B4D36] text-white border-[#D4AF37] shadow-lg scale-105 font-bold ring-2 ring-[#D4AF37]"
                          : isHighlighted
                          ? "bg-[#255C40] text-white border-[#D4AF37] ring-2 ring-[#D4AF37]/50"
                          : "bg-[#133A29] text-[#E0EADF] border-[#2D6A4D] hover:bg-[#1B4D36]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono block text-[10px] text-[#A6CDB6]">{s.number}</span>
                        {isHighlighted && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                        )}
                      </div>
                      <span className="font-serif">{s.devanagari}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Graph Node Inspection Callout */}
          <div className="pt-4 border-t border-[#234F37] bg-[#0A1F15]/90 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#FAF1DA] text-[#8C6A24]">
                  Aṣṭādhyāyī {graphSutra.number}
                </span>
                <span className="text-xs text-[#D8CFB8]">{graphSutra.type}</span>
              </div>
              <h4 className="font-serif text-xl font-bold text-white">
                {graphSutra.devanagari} ({graphSutra.iast})
              </h4>
              <p className="text-xs text-[#BFD0C5]">
                {graphSutra.translation} <Citation numbers={[1]} className="[&_a]:text-[#E5C97A]" />
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {graphSutra.connectedSutras.length > 0 && (
                <div className="text-right">
                  <span className="text-[10px] text-[#A8C4B3] block font-mono">
                    Interconnected Rules:
                  </span>
                  <div className="flex gap-1 mt-1">
                    {graphSutra.connectedSutras.map((num) => (
                      <button
                        key={num}
                        onClick={() => setActiveGraphNode(num)}
                        className="px-2 py-0.5 rounded bg-[#1B4D36] text-[11px] font-mono hover:bg-[#236345] text-white border border-[#2D6A4D]"
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sūtra Search & Results Matrix */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-[#0F2D1F]">
              Searchable Sūtra Catalog
            </h3>
            <p className="text-xs text-[#526359]">
              Filter by text, sūtra number, translation, or grammatical domain.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#8C6A24] absolute left-3.5 top-3" />
            <input
              type="text"
              aria-label="Search curated sūtra records"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search e.g. 6.1.77, यणचि, guṇa..."
              className="w-full bg-[#FAF7F2] border border-[#DDD3C2] text-xs rounded-xl pl-10 pr-4 py-2.5 text-[#0F2D1F] focus:outline-none focus:ring-2 focus:ring-[#1B4D36]"
            />
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={selectedCategory === c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === c.id
                  ? "bg-[#1B4D36] text-white shadow-xs"
                  : "bg-[#F4EFE6] text-[#455A4F] hover:bg-[#EAE2D4]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <label className="flex max-w-md items-center gap-3 text-xs font-semibold text-[#455A4F]">
          Rule type
          <select
            value={selectedType}
            onChange={(event) => setSelectedType(event.target.value)}
            className="min-w-0 flex-1 rounded-lg border border-[#DDD3C2] bg-[#FDFCFA] px-3 py-2 text-xs"
          >
            <option value="all">All rule types</option>
            {[...new Set(VERIFIED_SUTRAS.map((sutra) => sutra.type))].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>

        {/* Sūtra Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSutras.map((sutra) => {
            const isSelected = selectedSutra?.number === sutra.number;
            const hasDerivations = sutra.relatedDerivations.length > 0;
            const isHighlightedInDerivation = isSutraInActiveDerivation(sutra.number);

            return (
              <div
                key={sutra.number}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                onClick={() => setSelectedSutra(sutra)}
                onKeyDown={(event) => {
                  if (event.target !== event.currentTarget) return;
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedSutra(sutra);
                  }
                }}
                className={`w-full bg-[#FDFCFA] border rounded-xl p-5 text-left cursor-pointer transition-all flex flex-col justify-between space-y-4 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38622] ${
                  isSelected
                    ? "border-[#1B4D36] ring-2 ring-[#1B4D36]/20 bg-[#FAF7F2]"
                    : isHighlightedInDerivation
                    ? "border-[#D4AF37] ring-1 ring-[#D4AF37]/50 bg-[#FAF7F2]"
                    : "border-[#DDD3C2] hover:border-[#B38622]"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#FAF1DA] text-[#8C6A24] border border-[#E0CE9E]">
                      {sutra.number}
                    </span>
                    <span className="text-[10px] text-[#6A7F73] font-medium">
                      {sutra.type.split(" ")[0]}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-serif text-xl font-bold text-[#0F2D1F]">
                      {sutra.devanagari}
                    </h4>
                    <p className="text-xs font-mono text-[#6A7F73] italic">
                      {sutra.iast}
                    </p>
                  </div>

                  <p className="text-xs text-[#3E5246] leading-relaxed line-clamp-2">
                    {sutra.translation}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EAE1D3] flex items-center justify-between text-[11px]">
                  <span className="text-[#8C6A24] font-medium">
                    {hasDerivations ? `${sutra.relatedDerivations.length} Linked Derivations` : "Foundational Rule"}
                  </span>
                  <span className="text-[#1B4D36] font-semibold flex items-center gap-1">
                    Details &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredSutras.length === 0 && (
          <div className="bg-[#FAF7F2] border border-[#DDD3C2] rounded-xl p-8 text-center space-y-2">
            <p className="text-sm text-[#0F2D1F] font-semibold">No curated sūtra records match your search or filters.</p>
            <p className="text-xs text-[#6A7F73]">
              Try resetting the derivation filter or searching by sūtra number (e.g. 1.1.71, 6.1.77) or topic (e.g. sandhi, guṇa).
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedType("all");
                setSelectedDerivationFilter("all");
              }}
              className="mt-2 rounded-lg bg-[#1B4D36] px-3 py-2 text-xs font-semibold text-white hover:bg-[#123625]"
            >
              Clear all search filters
            </button>
          </div>
        )}
      </section>

      {/* Selected Sūtra Detail Modal / Card */}
      {selectedSutra && (
        <section className="bg-[#FAF7F2] border-2 border-[#D4AF37]/50 rounded-2xl p-6 sm:p-8 space-y-6 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E3D9C8] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[#FAF1DA] text-[#8C6A24] border border-[#E0CE9E]">
                  Aṣṭādhyāyī {selectedSutra.number}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded bg-[#E8F0EC] text-[#1B4D36] font-medium">
                  {selectedSutra.type}
                </span>
              </div>
              <h3 className="font-serif text-3xl font-bold text-[#0F2D1F] mt-2">
                {selectedSutra.devanagari}
              </h3>
              <p className="text-sm font-mono text-[#6A7F73] italic">
                &ldquo;{selectedSutra.iast}&rdquo;
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                aria-pressed={progress.bookmarkedSutraNumbers.includes(selectedSutra.number)}
                onClick={() => toggleSutraBookmark(selectedSutra.number)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#DDD3C2] bg-[#FDFCFA] px-3 py-2 text-xs font-semibold text-[#8C6A24] hover:bg-[#FAF1DA]"
              >
                <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
                {progress.bookmarkedSutraNumbers.includes(selectedSutra.number) ? "Bookmarked" : "Bookmark sūtra"}
              </button>
              <button
                type="button"
                onClick={() => setSelectedSutra(null)}
                className="text-xs font-medium text-[#8C6A24] hover:underline"
              >
                Close Detail &times;
              </button>
            </div>
          </div>
          {bookmarkMessage && <p role="status" className="text-xs text-[#1B4D36]">{bookmarkMessage}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#1B4D36] block">
                Website Gloss & Meaning:
              </span>
              <p className="text-xs sm:text-sm text-[#2A3B31] leading-relaxed bg-[#FDFCFA] p-3.5 rounded-xl border border-[#DDD3C2]">
                {selectedSutra.translation}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#8C6A24] block">
                Linguistic & Computational Significance:
              </span>
              <p className="text-xs sm:text-sm text-[#455A4F] leading-relaxed bg-[#FAF1DA]/40 p-3.5 rounded-xl border border-[#E8DCBF]">
                {selectedSutra.detailedAnalysis}
              </p>
            </div>
          </div>
          <p className="rounded-lg border border-[#E0CE9E] bg-[#FAF1DA]/50 p-3 text-xs leading-relaxed text-[#614A19]">
            <strong>Source status:</strong> {selectedSutra.verificationStatus}
          </p>

          {/* Linked Derivations Section with direct jump to Word Formation Explorer */}
          <div className="pt-4 border-t border-[#E3D9C8] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F2D1F] block">
                Derivations Utilizing Sūtra {selectedSutra.number} ({linkedDerivations.length}):
              </span>
              <span className="text-[10px] text-[#6A7F73] font-mono">
                Click any derivation to open interactive trace
              </span>
            </div>

            {linkedDerivations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {linkedDerivations.map((d) => (
                  <Link
                    key={d.id}
                    href={`/word-formation?example=${encodeURIComponent(d.id)}`}
                    className="p-3.5 rounded-xl bg-[#FDFCFA] border border-[#DDD3C2] hover:border-[#1B4D36] hover:shadow-sm transition-all flex items-center justify-between group"
                  >
                    <div>
                      <span className="font-serif text-base font-bold text-[#0F2D1F] group-hover:text-[#1B4D36]">
                        {d.targetForm}
                      </span>
                      <span className="text-[10px] font-mono text-[#6A7F73] block">
                        {d.targetFormIast} &bull; {d.typeLabel}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#8C6A24] group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#6A7F73] italic">
                This sūtra acts as a foundational metarule or definition across the general generative network.
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export default function SutrasPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center font-serif text-base text-[#8C6A24]">
          Loading Aṣṭādhyāyī Sūtra Knowledge Graph...
        </div>
      }
    >
      <SutrasContent />
    </Suspense>
  );
}