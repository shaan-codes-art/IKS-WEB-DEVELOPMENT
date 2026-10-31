import React from "react";
import Link from "next/link";
import { RESEARCH_GAP_17_DATA, RESEARCH_GAP_20_DATA } from "../../data/researchPapers";
import DownloadPaperButton from "../../components/DownloadPaperButton";
import Citation from "../../components/Citation";
import {
  Compass,
  ShieldCheck,
  GraduationCap,
  ArrowRight,
  BookOpen,
  Award,
  Users,
  Layers,
  FileText,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "About the Research | IKS Sanskrit Computational Linguistics",
  description:
    "Project overview and working research proposals for explainable Sanskrit NLP and Pāṇinian computer-assisted language learning.",
};

import FeedbackForm from "../../components/FeedbackForm";

export default function AboutResearchPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-16">
      {/* Breadcrumb & Research Header */}
      <div className="border-b border-[#E3D9C8] pb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#6A7F73]">
          <Link href="/" className="hover:text-[#1B4D36] transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-[#8C6A24] font-medium">Core Architecture Section</span>
          <span>&gt;</span>
          <span className="text-[#0F2D1F] font-semibold">About the Research</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF1DA] text-[#8C6A24] text-xs font-semibold border border-[#E0CE9E]">
            <Compass className="w-3.5 h-3.5" />
            <span>Research Project Overview</span>
          </div>

          <div className="text-xs font-mono text-[#1B4D36] bg-[#E8F0EC] px-3 py-1 rounded border border-[#BBD5C5]">
            Indian Knowledge Systems (IKS) Initiative
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0F2D1F] tracking-tight leading-tight">
            About the Research Initiative
          </h1>
          <p className="text-sm sm:text-base text-[#465A4F] max-w-3xl leading-relaxed">
            Bridging a long-standing Pāṇinian grammatical tradition with contemporary Explainable Natural Language Processing (X-NLP) and Computer-Assisted Language Learning (CALL). <Citation numbers={[1, 2]} />
          </p>
        </div>
      </div>

      {/* Institutional Manifesto */}
      <section className="bg-[#FAF7F2] border-2 border-[#1B4D36]/20 rounded-2xl p-7 sm:p-10 space-y-6 shadow-sm">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#8C6A24] uppercase tracking-wider">
            Project Context
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2D1F]">
            Indian Knowledge Systems (IKS) in the Digital Age
          </h2>
        </div>

        <div className="space-y-4 text-sm text-[#3E5246] leading-relaxed">
          <p>
            This project explores computational approaches to Pāṇinian grammar and interactive learning materials within the broader Indian Knowledge Systems (IKS) context.
          </p>
          <p>
            Rule attribution and formal conflict handling are project design goals, not independently validated performance findings.
          </p>
        </div>

        <div className="pt-4 border-t border-[#E3D9C8] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-[#FDFCFA] p-3.5 rounded-xl border border-[#DDD3C2]">
            <strong className="text-[#0F2D1F] block mb-1">Provenance Research</strong>
            <span className="text-[#526359]">The proposal tests rule-linked traces on selected examples; coverage and correctness remain to be evaluated.</span>
          </div>
          <div className="bg-[#FDFCFA] p-3.5 rounded-xl border border-[#DDD3C2]">
            <strong className="text-[#0F2D1F] block mb-1">Pedagogical CALL</strong>
            <span className="text-[#526359]">The prototype contains selected learning materials; their educational impact has not been measured.</span>
          </div>
          <div className="bg-[#FDFCFA] p-3.5 rounded-xl border border-[#DDD3C2]">
            <strong className="text-[#0F2D1F] block mb-1">Open Science & Reproducibility</strong>
            <span className="text-[#526359]">Working research proposals with editable sources and a reproducible document-generation workflow.</span>
          </div>
        </div>
      </section>

      {/* The Two Research Gaps Showcase */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#8C6A24] uppercase tracking-wider">
            Proposed Research Questions
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2D1F]">
            Two Project-Defined Questions for Study
          </h2>
          <p className="text-xs sm:text-sm text-[#526359]">
            Explore the two project-defined research questions, proposed methods, evaluation plans, and linked literature. Both papers are working proposals, not peer-reviewed or institutionally approved.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card for Research 1 */}
          <div className="bg-[#FDFCFA] border-2 border-[#1B4D36]/20 rounded-2xl p-7 space-y-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#1B4D36] text-[#FAF7F2]">
                  RESEARCH 1
                </span>
                <span className="text-xs text-[#8C6A24] font-medium uppercase tracking-wider">
                  Computational Provenance
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-[#0F2D1F]">
                  Explainable Sanskrit NLP (X-NLP)
                </h3>
                <p className="text-xs font-mono text-[#1B4D36] mt-0.5">
                  Aṣṭādhyāyī Sūtra-Attribution Framework
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#3E5246] leading-relaxed">
                Proposes a bounded provenance trace for selected Sanskrit analyses and a study of whether source links, intermediate states, and uncertainty labels help reviewers identify errors.
              </p>

              <div className="bg-[#F4EFE6] p-3.5 rounded-xl border border-[#DDD3C2] text-xs text-[#526359] space-y-1">
                <div><strong>Research Questions:</strong> RQ 1.1, RQ 2.1, RQ 3.1</div>
                <div><strong>Study focus:</strong> Trace and output-only review for selected, source-checked examples</div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8DFC9] flex flex-wrap items-center justify-between gap-3">
              <Link
                href="/explainable-nlp"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1B4D36] text-white text-xs font-semibold hover:bg-[#123625] transition-all shadow-xs"
              >
                <span>Research 1 Details & Proposal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <DownloadPaperButton paper={RESEARCH_GAP_17_DATA} />
            </div>
          </div>

          {/* Card for Research 2 */}
          <div className="bg-[#FDFCFA] border-2 border-[#D4AF37]/40 rounded-2xl p-7 space-y-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#B38622] text-[#FAF7F2]">
                  RESEARCH 2
                </span>
                <span className="text-xs text-[#8C6A24] font-medium uppercase tracking-wider">
                  Educational Technology
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-[#0F2D1F]">
                  Pāṇinian Grammar for Language Learning (CALL)
                </h3>
                <p className="text-xs font-mono text-[#8C6A24] mt-0.5">
                  Cognitive Scaffolding & Visual Derivations
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#3E5246] leading-relaxed">
                Proposes a content-matched comparison of stepwise visual scaffolding and static explanations for selected introductory Pāṇinian concepts.
              </p>

              <div className="bg-[#FAF1DA]/60 p-3.5 rounded-xl border border-[#E2CE9B] text-xs text-[#526359] space-y-1">
                <div><strong>Research Questions:</strong> RQ 1.2, RQ 2.2, RQ 3.2</div>
                <div><strong>Study focus:</strong> Immediate conceptual performance and delayed retention, subject to review and approval</div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8DFC9] flex flex-wrap items-center justify-between gap-3">
              <Link
                href="/pedagogy-call"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#B38622] text-white text-xs font-semibold hover:bg-[#8C6A24] transition-all shadow-xs"
              >
                <span>Research 2 Details & Proposal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <DownloadPaperButton paper={RESEARCH_GAP_20_DATA} />
            </div>
          </div>
        </div>
      </section>

      {/* Downloadable Research Proposals Master Section */}
      <section className="bg-[#0F2D1F] text-[#FAF7F2] rounded-2xl p-8 sm:p-10 space-y-6 shadow-xl border border-[#234F37]">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] block">
            Academic Artifacts
          </span>
          <h2 className="font-serif text-3xl font-bold text-white">
            Research Design Papers
          </h2>
          <p className="text-xs sm:text-sm text-[#BFD0C5] max-w-2xl leading-relaxed">
            Each download is a working research proposal with an accessible online version and editable Markdown source. Neither proposal is peer-reviewed or institutionally approved.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="bg-[#163826] border border-[#2F6D4A] rounded-xl p-5 space-y-3">
            <h4 className="font-serif text-lg font-bold text-white">
              Research 1: Explainable Sanskrit NLP (X-NLP)
            </h4>
            <p className="text-xs text-[#A8C4B3]">
              Towards Verifiable and Explainable Natural Language Processing for Sanskrit: A Pāṇinian Rule-Attribution Framework.
            </p>
            <DownloadPaperButton paper={RESEARCH_GAP_17_DATA} />
          </div>

          <div className="bg-[#163826] border border-[#2F6D4A] rounded-xl p-5 space-y-3">
            <h4 className="font-serif text-lg font-bold text-white">
              Research 2: Pāṇinian CALL Pedagogy
            </h4>
            <p className="text-xs text-[#A8C4B3]">
              Computational Scaffolding for Pāṇinian Generative Grammar: An Interactive Computer-Assisted Language Learning (CALL) Paradigm.
            </p>
            <DownloadPaperButton paper={RESEARCH_GAP_20_DATA} />
          </div>
        </div>
      </section>

      {/* College Project Team & Methodology */}
      <section className="bg-[#F4EFE6] border border-[#DDD3C2] rounded-2xl p-7 sm:p-9 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#8C6A24] uppercase tracking-wider">
            Institutional Details
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#0F2D1F]">
            Research Framework & Departmental Team
          </h2>
          <p className="text-xs sm:text-sm text-[#526359]">
            College Research Initiative &bull; Department of Computer Science & Center for Sanskrit Studies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#D5C8B4] space-y-2">
            <span className="text-[10px] font-mono text-[#8C6A24] block uppercase">
              Project Domain
            </span>
            <h4 className="font-serif text-base font-bold text-[#0F2D1F]">
              Computational Sanskrit Linguistics
            </h4>
            <p className="text-xs text-[#526359]">
              Combining formal generative grammar, NLP tokenization, and web-based interactive visual modeling.
            </p>
          </div>

          <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#D5C8B4] space-y-2">
            <span className="text-[10px] font-mono text-[#8C6A24] block uppercase">
              Curricular Alignment
            </span>
            <h4 className="font-serif text-base font-bold text-[#0F2D1F]">
              National Education Policy (NEP)
            </h4>
            <p className="text-xs text-[#526359]">
              Directly aligned with IKS curriculum integration guidelines for undergraduate and graduate studies.
            </p>
          </div>

          <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#D5C8B4] space-y-2">
            <span className="text-[10px] font-mono text-[#8C6A24] block uppercase">
              Open Science Policy
            </span>
            <h4 className="font-serif text-base font-bold text-[#0F2D1F]">
              Open Access Benchmarks
            </h4>
            <p className="text-xs text-[#526359]">
              All datasets, rule graphs, and derivation traces are published for open collegiate review and verification.
            </p>
          </div>
        </div>
      </section>
      <section className="mt-8 rounded-xl border border-[#DDD3C2] bg-[#FAF7F2] p-6">
        <h2 className="font-serif text-xl font-bold text-[#0F2D1F]">Student Feedback</h2>
        <FeedbackForm />
      </section>
    </div>
  );
}
