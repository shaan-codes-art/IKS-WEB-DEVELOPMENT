import React from "react";
import Link from "next/link";
import { RESEARCH_GAP_17_DATA } from "../../data/researchPapers";
import DownloadPaperButton from "../../components/DownloadPaperButton";
import Citation from "../../components/Citation";
import {
  ShieldCheck,
  Cpu,
  GitBranch,
  BookOpen,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  FileText,
  BarChart3,
} from "lucide-react";

export const metadata = {
  title: "Research 1: Explainable Sanskrit NLP (X-NLP) | IKS Research",
  description:
    "Working research proposal for auditable Sanskrit analysis traces, Pāṇinian rule provenance, and human-centered evaluation.",
};

export default function ExplainableNlpPage() {
  const paper = RESEARCH_GAP_17_DATA;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-16">
      {/* Breadcrumb & Institutional Header */}
      <div className="space-y-4 border-b border-[#E3D9C8] pb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#6A7F73]">
          <Link href="/" className="hover:text-[#1B4D36] transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-[#8C6A24] font-medium">Research 1</span>
          <span>&gt;</span>
          <span className="text-[#0F2D1F] font-semibold">Explainable Sanskrit NLP (X-NLP)</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EC] text-[#1B4D36] text-xs font-semibold border border-[#BED7C7]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Research 1 &bull; Computational Linguistics Core</span>
          </div>

          <div className="text-xs font-mono text-[#8C6A24] bg-[#FAF1DA] px-3 py-1 rounded border border-[#E0CE9E]">
            Aṣṭādhyāyī Sūtra-Attribution Engine
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0F2D1F] tracking-tight leading-tight">
            {paper.fullTitle}
          </h1>
          <p className="font-serif text-xl text-[#1B4D36] font-medium">
            {paper.subtitle}
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-[#526359]">
          <div>
            <span className="font-semibold text-[#0F2D1F]">Affiliation: </span>
            <span>{paper.affiliation}</span>
          </div>
          <div>
            <span className="font-semibold text-[#0F2D1F]">Pillars: </span>
            <span>Generative Grammar &bull; Formal Logic &bull; Explainable AI</span>
          </div>
        </div>

        {/* Research paper downloads */}
        <div className="bg-[#F4EFE6] border border-[#DDD3C2] rounded-xl p-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#0F2D1F] block">
                Research 1 Working Research Proposal
            </span>
            <p className="text-xs text-[#526359]">
              A scoped proposal for tracing selected Sanskrit analyses to inspectable operations, source references, uncertainty, and reviewer evaluation.
            </p>
          </div>
          <DownloadPaperButton paper={paper} />
        </div>
      </div>

      {/* Abstract & Executive Summary */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-[#FAF7F2] border-2 border-[#1B4D36]/20 rounded-2xl p-7 sm:p-9 shadow-sm space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#0F2D1F] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#1B4D36]" />
              Executive Abstract
            </h2>
            <p className="text-sm text-[#2D3F34] leading-relaxed italic">
              &ldquo;{paper.abstract}&rdquo;
            </p>
            <p className="text-[11px] font-semibold text-[#8C6A24]">
              Project abstract: performance and novelty statements are not independently validated by the bibliography.
            </p>

            <div className="pt-4 border-t border-[#E6DCce] flex flex-wrap gap-2">
              <span className="text-xs font-bold text-[#8C6A24] self-center mr-1">
                Index Terms:
              </span>
              {paper.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-full bg-[#FAF1DA] text-[#78591B] border border-[#E5D2A5] text-[11px] font-medium"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Background and Motivation */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#0F2D1F]">
              {paper.background.title}
            </h2>
            <div className="space-y-3 text-sm text-[#3E5246] leading-relaxed">
              {paper.background.paragraphs.map((p, idx) => (
                <p key={idx}>
                  {p}
                  {idx === 0 ? <Citation numbers={[1]} /> : idx === 1 ? <Citation numbers={[2]} /> : null}
                  {idx > 0 && (
                    <span className="ml-1 text-[10px] font-semibold text-[#8C6A24]">
                      [specific claim needs source review]
                    </span>
                  )}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Meta Card */}
        <div className="lg:col-span-4 bg-[#FDFCFA] border border-[#DDD3C2] rounded-2xl p-6 space-y-6 shadow-sm sticky top-28">
          <div className="border-b border-[#E6DCce] pb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6A24] block">
              Problem Classification
            </span>
            <h3 className="font-serif text-lg font-bold text-[#0F2D1F] mt-1">
              Traceability for Selected Analyses
            </h3>
          </div>

          <div className="space-y-3 text-xs text-[#455A4F]">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-[#B91C1C] shrink-0 mt-0.5" />
              <span><strong>Evidence boundary:</strong> A candidate analysis and its explanation both require independent checking.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1B4D36] shrink-0 mt-0.5" />
              <span><strong>Traceability question:</strong> Selected operations can be linked to source locators and review status.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1B4D36] shrink-0 mt-0.5" />
              <span><strong>Conflict handling:</strong> Encode only reviewed priority rules; retain alternatives when the evidence is inconclusive.</span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E6DCce] space-y-2">
            <Link
              href="/prakriya"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1B4D36] text-white text-xs font-semibold hover:bg-[#123625] transition-all shadow-xs"
            >
              <span>Test Derivations in Workbench</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/sutras"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#F4EFE6] text-[#0F2D1F] text-xs font-semibold hover:bg-[#EAE2D5] transition-all border border-[#D5C8B4]"
            >
              <span>Explore Sūtra Knowledge Graph</span>
            </Link>
          </div>
        </div>
      </section>

      {/* The Specific Research Gap Formulation */}
      <section className="bg-[#FAF1DA]/60 border-2 border-[#D4AF37]/50 rounded-2xl p-7 sm:p-9 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#B38622] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider">
          Formulation of Research 1
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2D1F]">
          Project-Defined Gap: Sūtra Provenance in Selected NLP Analyses
        </h2>
        <p className="text-sm sm:text-base text-[#2E3C33] leading-relaxed font-serif">
          &ldquo;{paper.researchGapStatement}&rdquo;
        </p>
        <p className="text-xs font-semibold text-[#8C6A24]">
          Novelty and “no existing framework” claims need a documented literature review before being stated as established facts.
        </p>
      </section>

      {/* Formal Research Questions */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#8C6A24] uppercase tracking-wider">
            Inquiry Matrix
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2D1F]">
            Formal Research Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#526359]">
            The three core theoretical questions driving our architecture and algorithmic design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paper.researchQuestions.map((rq) => (
            <div
              key={rq.id}
              className="bg-[#FDFCFA] border border-[#DDD3C2] rounded-xl p-6 space-y-4 shadow-xs hover:border-[#1B4D36] transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded bg-[#FAF1DA] text-[#8C6A24] font-mono text-xs font-bold border border-[#E0CE9E]">
                  {rq.code}
                </span>
                <h3 className="font-serif text-base font-bold text-[#0F2D1F] leading-snug">
                  {rq.question}
                </h3>
              </div>

              <div className="pt-4 border-t border-[#E8DFC9] text-xs text-[#586C60]">
                <span className="font-semibold text-[#1B4D36] block mb-1">
                  Theoretical Rationale:
                </span>
                <p>{rq.rationale}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Workflow Diagram */}
      <section className="bg-[#FAF7F2] border border-[#DDD3C2] rounded-2xl p-7 sm:p-10 space-y-8 shadow-sm">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold text-[#8C6A24] uppercase tracking-wider">
            System Architecture
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2D1F]">
            The X-NLP Computational Workflow
          </h2>
          <p className="text-xs sm:text-sm text-[#526359]">
            Proposed workflow for selected examples. Each stage is subject to source review; ambiguous cases remain visible rather than being forced into a single analysis.
          </p>
        </div>

        {/* Visual Workflow Diagram */}
        <div className="bg-[#0F2D1F] text-[#FAF7F2] rounded-xl p-6 sm:p-8 overflow-x-auto shadow-inner border border-[#234F37]">
          <div className="min-w-[700px] flex items-center justify-between gap-4">
            {/* Box 1 */}
            <div className="flex-1 bg-[#163826] border border-[#2F6D4A] rounded-xl p-4 text-center space-y-2">
              <span className="text-[10px] uppercase font-mono text-[#D4AF37] block">Tier 1</span>
              <h4 className="font-serif text-sm font-bold text-white">Input String</h4>
              <p className="text-[11px] text-[#A6C5B3]">Raw Sanskrit text (Devanāgarī / IAST)</p>
              <div className="text-[10px] font-mono bg-[#0D2418] py-1 px-2 rounded text-[#E8DFC9]">
                 e.g. &quot;भवति&quot; / &quot;इत्याह&quot;
              </div>
            </div>

            <ArrowRight className="w-6 h-6 text-[#D4AF37] shrink-0" />

            {/* Box 2 */}
            <div className="flex-1 bg-[#163826] border border-[#2F6D4A] rounded-xl p-4 text-center space-y-2">
              <span className="text-[10px] uppercase font-mono text-[#D4AF37] block">Tier 2</span>
              <h4 className="font-serif text-sm font-bold text-white">Candidate Analysis</h4>
              <p className="text-[11px] text-[#A6C5B3]">Candidate base and possible operations</p>
              <div className="text-[10px] font-mono bg-[#0D2418] py-1 px-2 rounded text-[#E8DFC9]">
                candidate · review status
              </div>
            </div>

            <ArrowRight className="w-6 h-6 text-[#D4AF37] shrink-0" />

            {/* Box 3 */}
            <div className="flex-1 bg-[#1E4D35] border-2 border-[#D4AF37] rounded-xl p-4 text-center space-y-2 shadow-lg scale-105">
              <span className="text-[10px] uppercase font-mono text-[#D4AF37] font-bold block">
                Tier 3 &bull; Core Engine
              </span>
              <h4 className="font-serif text-sm font-bold text-[#FAF7F2]">Sūtra Provenance</h4>
              <p className="text-[11px] text-[#D8CFB8]">
                Source-checked rules and recorded alternatives
              </p>
              <div className="text-[10px] font-mono bg-[#091C12] py-1 px-2 rounded text-[#F5E6BF]">
                locator · scope · review
              </div>
            </div>

            <ArrowRight className="w-6 h-6 text-[#D4AF37] shrink-0" />

            {/* Box 4 */}
            <div className="flex-1 bg-[#163826] border border-[#2F6D4A] rounded-xl p-4 text-center space-y-2">
              <span className="text-[10px] uppercase font-mono text-[#D4AF37] block">Tier 4</span>
              <h4 className="font-serif text-sm font-bold text-white">Review Trace</h4>
              <p className="text-[11px] text-[#A6C5B3]">States, source links, alternatives, and uncertainty</p>
              <div className="text-[10px] font-mono bg-[#0D2418] py-1 px-2 rounded text-[#E8DFC9]">
                Proposed prototype
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives and Expected Outcomes */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#FDFCFA] border border-[#DDD3C2] rounded-2xl p-7 space-y-4 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1B4D36]"></span>
            <h3 className="font-serif text-xl font-bold text-[#0F2D1F]">
              Specific Research Objectives
            </h3>
          </div>
          <div className="space-y-3">
            {paper.objectives.map((obj) => (
              <div key={obj.id} className="p-3.5 rounded-lg bg-[#FAF7F2] border border-[#E3D9C8]">
                <h4 className="font-serif text-sm font-bold text-[#1B4D36]">{obj.title}</h4>
                <p className="text-xs text-[#526359] mt-1">{obj.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#FDFCFA] border border-[#DDD3C2] rounded-2xl p-7 space-y-4 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8C6A24]"></span>
            <h3 className="font-serif text-xl font-bold text-[#0F2D1F]">
              Expected Deliverables & Outcomes
            </h3>
          </div>
          <div className="space-y-3">
            {paper.expectedOutcomes.map((out) => (
              <div key={out.id} className="p-3.5 rounded-lg bg-[#FAF1DA]/50 border border-[#E0CE9E]">
                <h4 className="font-serif text-sm font-bold text-[#8C6A24]">{out.title}</h4>
                <p className="text-xs text-[#526359] mt-1">{out.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evaluation Plan */}
      <section className="bg-[#F4EFE6] border border-[#DDD3C2] rounded-2xl p-7 sm:p-9 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#8C6A24] uppercase tracking-wider">
            Empirical Validation
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#0F2D1F]">
            Rigorous Evaluation Plan
          </h2>
          <p className="text-xs sm:text-sm text-[#526359]">
            Proposed measures separate source-reference accuracy, trace agreement, and reviewer task outcomes. The evaluation has not yet been conducted.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#D5C8B4] space-y-2">
            <h4 className="font-serif text-sm font-bold text-[#0F2D1F] flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#1B4D36]" />
              Quantitative Metrics
            </h4>
            <ul className="space-y-2 text-xs text-[#526359]">
              {paper.evaluationPlan.metrics.map((m, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-[#1B4D36] font-bold">&bull;</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#D5C8B4] space-y-2">
            <h4 className="font-serif text-sm font-bold text-[#0F2D1F] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#8C6A24]" />
              Benchmark Corpora
            </h4>
            <ul className="space-y-2 text-xs text-[#526359]">
              {paper.evaluationPlan.benchmarkDatasets.map((b, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-[#8C6A24] font-bold">&bull;</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#D5C8B4] space-y-2">
            <h4 className="font-serif text-sm font-bold text-[#0F2D1F] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#1B4D36]" />
              Review Protocol
            </h4>
            <p className="text-xs text-[#526359] leading-relaxed">
              {paper.evaluationPlan.expertEvaluation}
            </p>
          </div>
        </div>
      </section>

      {/* Proposed Research vs. Completed Prototype Demonstrations (Academic Rigor & Transparency) */}
      <section className="bg-[#FAF7F2] border-2 border-[#1B4D36]/20 rounded-2xl p-7 sm:p-9 space-y-6 shadow-sm">
        <div className="space-y-2 border-b border-[#E3D9C8] pb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#1B4D36]" />
            <span className="text-xs font-bold text-[#1B4D36] uppercase tracking-wider">
              Transparency & Academic Integrity Statement
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2D1F]">
            Current Prototype Status vs. Proposed Future Research
          </h2>
          <p className="text-xs sm:text-sm text-[#526359] leading-relaxed">
            In strict compliance with academic standards, we clearly delineate between the working interactive demonstrations implemented in this collegiate prototype and the proposed future research program.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Completed Demonstrations */}
          <div className="bg-[#E8F0EC]/60 border border-[#BBD5C5] rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#1B4D36]" />
              <h3 className="font-serif text-base font-bold text-[#0F2D1F]">
                Existing Website Demonstrations
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-[#2A3E32]">
              <li className="flex items-start gap-2">
                <span className="text-[#1B4D36] font-bold">&bull;</span>
                <span><strong>Curated derivation walkthroughs:</strong> Selected word-formation and prakriyā examples show intermediate forms, explanations, and rule references; they are not a comprehensive parser or independently validated corpus.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B4D36] font-bold">&bull;</span>
                <span><strong>Rule reference links:</strong> Selected examples link to entries in the Sūtra Library; the interface does not establish that every cited rule applies or resolve all rule conflicts.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B4D36] font-bold">&bull;</span>
                <span><strong>Sūtra Library:</strong> The site provides browsable rule entries and search links for selected examples.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1B4D36] font-bold">&bull;</span>
                <span><strong>Analysis Lab:</strong> Sandhi, morphology, and kāraka examples are curated demonstrations, not arbitrary-text parsing or empirical validation.</span>
              </li>
            </ul>
          </div>

          {/* Proposed Research Program */}
          <div className="bg-[#FAF1DA]/60 border border-[#E0CE9E] rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8C6A24]" />
              <h3 className="font-serif text-base font-bold text-[#0F2D1F]">
                Proposed Research Program (Target Objectives)
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-[#523F16]">
              <li className="flex items-start gap-2">
                <span className="text-[#8C6A24] font-bold">&bull;</span>
                <span>                <strong>Bounded trace schema:</strong> Define and test provenance fields on a source-reviewed sample before considering broader coverage.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8C6A24] font-bold">&bull;</span>
                <span>                <strong>Uncertainty-aware prototype:</strong> Preserve candidate analyses and unresolved alternatives; do not promise error elimination or unrestricted parsing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8C6A24] font-bold">&bull;</span>
                <span>                <strong>Reviewed example set:</strong> Prepare a bounded annotated sample only after edition, annotation, and reuse conditions are established.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8C6A24] font-bold">&bull;</span>
                <span>                <strong>Reviewer evaluation:</strong> Compare trace-present and output-only review on predefined error-detection tasks after any required approval.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Literature References */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#8C6A24] uppercase tracking-wider">
            Academic Attribution
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2D1F]">
            Selected Verified References
          </h2>
          <p className="text-xs sm:text-sm text-[#526359]">
            Bibliographic records checked against the source DOI or publisher metadata. Citation scope is limited as described in the bibliography.
          </p>
        </div>

        <div className="space-y-4">
          {paper.literature.map((lit) => (
            <div
              key={lit.id}
              className="bg-[#FDFCFA] border border-[#DDD3C2] rounded-xl p-5 space-y-2 hover:border-[#1B4D36] transition-all shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-serif text-base font-bold text-[#0F2D1F]">
                  <Citation numbers={[lit.referenceNumber]} /> {lit.authors} ({lit.year})
                </span>
                <a
                  href={lit.doiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#1B4D36] hover:underline font-mono"
                >
                  <span>DOI / Source</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="text-xs text-[#28392F]">
                <em>&ldquo;{lit.title}&rdquo;</em>. In: <span className="text-[#55695D]">{lit.venue}</span>.
              </div>

              <div className="pt-2 text-xs text-[#6A7F73] border-t border-[#EAE1D3]">
                <strong className="text-[#8C6A24]">Relevance to Research 1:</strong> {lit.relevance}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Download and Navigation Bar */}
      <div className="bg-[#0F2D1F] text-[#FAF7F2] rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-[#234F37]">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-serif text-2xl font-bold text-white">
              Download the Research 1 Proposal
          </h3>
          <p className="text-xs text-[#BFD0C5]">
            Working research proposal; it is not peer-reviewed or institutionally approved.
          </p>
        </div>
        <DownloadPaperButton paper={paper} />
      </div>
    </div>
  );
}
