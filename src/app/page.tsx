import React from "react";
import Link from "next/link";
import InteractiveWorkbench from "../components/InteractiveWorkbench";
import BrandGallery from "../components/BrandGallery";
import Citation from "../components/Citation";
import AssistantAskBox from "../components/AssistantAskBox";
import {
  BookOpen,
  Cpu,
  Sparkles,
  GitBranch,
  Search,
  Layers,
  GraduationCap,
  FileText,
  Compass,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Award,
  Network,
  ShieldCheck,
  Split,
  Binary,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

const booksAndResearchSources = [
  {
    reference: 4,
    title: "The Aṣṭādhyāyī",
    author: "Pāṇini; English translation by Śrīśa Chandra Vasu",
    publication: "1897 · Panini Office, Benares",
    description:
      "A historical English translation of the primary Sanskrit grammar, useful for consulting the sūtra text and traditional grammatical explanations.",
    label: "Read online",
    href: "https://archive.org/details/ashtadhyayitrans06paniuoft",
    type: "Primary text · translated edition",
  },
  {
    reference: 5,
    title: "The Aṣṭādhyāyī of Pāṇini with Translation and Explanatory Notes",
    author: "S. D. Joshi and J. A. F. Roodbergen",
    publication: "First edition, 1991 · Sahitya Akademi",
    description:
      "A modern scholarly translation with explanatory notes for close study of Pāṇini’s grammatical rules.",
    label: "View catalogue",
    href: "https://openlibrary.org/books/OL18042163M",
    type: "Further reading · scholarly edition",
  },
  {
    reference: 6,
    title: "The Aṣṭādhyāyī of Pāṇini",
    author: "Rama Nath Sharma",
    publication: "Publication details not confirmed in the checked catalogue record",
    description:
      "Open Library describes this as a critical study with text. The six-volume description needs edition-level catalogue confirmation.",
    label: "View catalogue",
    href: "https://openlibrary.org/works/OL5083787W/The_As%CC%A3t%CC%A3a%CC%84dhya%CC%84yi%CC%84_of_Pa%CC%84n%CC%A3ini",
    type: "Further reading · critical study",
  },
  {
    reference: 2,
    title: "Sanskrit Computational Linguistics",
    author: "Edited by Gérard Huet, Amba Kulkarni, and Peter Scharf",
    publication: "2009 · Lecture Notes in Computer Science, Vol. 5402 · Springer",
    description:
      "A scholarly collection of work in computational Sanskrit linguistics, relevant to the website’s computational grammar context.",
    label: "Publisher / DOI page",
    href: "https://doi.org/10.1007/978-3-642-00155-0",
    type: "Further reading · research proceedings",
  },
];

export default function HomePage() {
  const coreSections = [
    {
      number: "01",
      title: "Home",
      sanskrit: "मुखपृष्ठम्",
      href: "/",
      icon: Compass,
      desc: "Overview of the collegiate research initiative, problem statements, and executive demonstrator.",
      badge: "Current Page",
      color: "border-[#1B4D36]",
    },
    {
      number: "02",
      title: "Sanskrit Analysis Lab",
      sanskrit: "संस्कृतविश्लेषणशाला",
      href: "/analysis-lab",
      icon: Split,
      desc: "Explainable sandhi splitter, morphological tagger, and visual Kāraka dependency syntactic parser.",
      badge: "Complements Research 1 (X-NLP)",
      color: "border-[#1B4D36]",
    },
    {
      number: "03",
      title: "Word Formation Explorer",
      sanskrit: "पदनिर्माणप्रक्रिया",
      href: "/word-formation",
      icon: Cpu,
      desc: "Dynamic Prakriyā generator across verified verbal roots (dhātu) and nominal stems (prātipadika).",
      badge: "11 Verified Paradigms",
      color: "border-[#1B4D36]",
    },
    {
      number: "04",
      title: "Learn Pāṇinian Grammar",
      sanskrit: "पाणिनीयव्याकरणशिक्षणम्",
      href: "/learn",
      icon: GraduationCap,
      desc: "Scaffolded pedagogical modules on Śivasūtras, pratyāhāras, it-markers, and sandhi mechanics.",
      badge: "Complements Research 2 (CALL)",
      color: "border-[#8C6A24]",
    },
    {
      number: "05",
      title: "Practice and Quiz",
      sanskrit: "अभ्यासः प्रश्नोत्तरी च",
      href: "/practice",
      icon: Award,
      desc: "Interactive formative assessments, sūtra identification challenges, and diagnostic tests.",
      badge: "8 Formative Challenges",
      color: "border-[#8C6A24]",
    },
    {
      number: "06",
      title: "Sūtra & Rule Library",
      sanskrit: "सूत्राणां ज्ञानकोशः",
      href: "/sutras",
      icon: Network,
      desc: "Searchable catalog of 34 verified Aṣṭādhyāyī rules with interactive operational knowledge graph.",
      badge: "34 Verified Rules",
      color: "border-[#1B4D36]",
    },
    {
      number: "07",
      title: "About the Research",
      sanskrit: "शोधप्रकल्पपरिचयः",
      href: "/about",
      icon: FileText,
      desc: "College IKS project mandate, Research 1 & Research 2 hubs, methodologies, and downloadable proposal drafts.",
      badge: "Research Hub & Papers",
      color: "border-[#8C6A24]",
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20 pb-16 border-b border-[#E6DCCE]">
        {/* Subtle decorative background watermark */}
        <div className="absolute top-0 right-0 -mr-24 -mt-20 text-[#E8DFCF]/30 font-serif text-[260px] select-none pointer-events-none font-bold leading-none z-0">
          पा
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            {/* Academic badge & Sanskrit invocatory quote */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#FAF1DA] text-[#8C6A24] border border-[#E2CE9B] text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#B38622]"></span>
              <span>Indian Knowledge Systems (IKS) &bull; College Research Project</span>
            </div>

            <div className="font-serif italic text-sm text-[#5B6D62] border-l-2 border-[#D4AF37] pl-3.5 py-0.5">
              &ldquo;येनाक्षरसमाम्नायमधिगम्य महेश्वरात् । कृत्स्नं व्याकरणं प्रोक्तं तस्मै पाणिनये नमः ॥&rdquo;
              <span className="block text-[11px] not-italic text-[#7E9185] mt-0.5 font-sans">
                — Salutations to Pāṇini, who received the sacred sound-alphabet and formulated complete generative grammar.
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B4D36] tracking-tight">
                पाणिनीयव्याकरणं सङ्गणकीयभाषाविज्ञानं च
              </h2>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F2D1F] tracking-tight leading-[1.15]">
                Pāṇinian Grammar & <br className="hidden sm:inline" />
                Explainable Sanskrit NLP
              </h1>
            </div>

            {/* Executive Statement */}
            <p className="text-base sm:text-lg text-[#35483D] leading-relaxed font-normal">
              A collegiate research initiative advancing <strong>Explainable Sanskrit NLP (X-NLP)</strong> and <strong>Pāṇinian Grammar for Computer-Assisted Language Learning (CALL)</strong> across a unified seven-section architecture.
            </p>

            {/* Quick CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/word-formation"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#1B4D36] text-[#FAF7F2] font-semibold text-sm hover:bg-[#133A29] transition-all shadow-md border border-[#2D6A4D] group hover:scale-105"
              >
                <span>Launch Prakriyā Studio</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/analysis-lab"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#F4EFE6] text-[#0F2D1F] font-semibold text-sm hover:bg-[#EAE2D5] transition-all border border-[#D5C8B4]"
              >
                <Split className="w-4 h-4 text-[#8C6A24]" />
                <span>Sanskrit Analysis Lab</span>
              </Link>
              <a
                href="#seven-sections"
                className="text-xs font-semibold text-[#1B4D36] hover:underline px-2 py-3"
              >
                Explore 7 Core Sections &darr;
              </a>
            </div>
            <AssistantAskBox />
          </div>

          {/* Quick Metrics & Pillars Banner */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/sutras"
              className="bg-[#FDFCFA] border border-[#E3D9C8] rounded-xl p-4 shadow-xs hover:border-[#1B4D36] transition-all group"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6A24] block">
                Rule Base
              </span>
              <span className="font-serif text-3xl font-bold text-[#0F2D1F] block mt-1 group-hover:text-[#1B4D36]">
                3,959
              </span>
              <span className="text-xs text-[#526359] block mt-0.5">
                Aṣṭādhyāyī Sūtras &bull; 34 in Graph &rarr;
              </span>
            </Link>

            <Link
              href="/word-formation"
              className="bg-[#FDFCFA] border border-[#E3D9C8] rounded-xl p-4 shadow-xs hover:border-[#1B4D36] transition-all group"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6A24] block">
                Prakriyā Generator
              </span>
              <span className="font-serif text-3xl font-bold text-[#0F2D1F] block mt-1 group-hover:text-[#1B4D36]">
                11 Forms
              </span>
              <span className="text-xs text-[#526359] block mt-0.5">
                Curated Dhātu & Subanta Corpus &rarr;
              </span>
            </Link>

            <Link
              href="/explainable-nlp"
              className="bg-[#FDFCFA] border border-[#E3D9C8] rounded-xl p-4 shadow-xs hover:border-[#1B4D36] transition-all group"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6A24] block">
                Research 1
              </span>
              <span className="font-serif text-2xl font-bold text-[#1B4D36] block mt-1">
                Explainable NLP
              </span>
              <span className="text-xs text-[#526359] block mt-0.5">
                Proposal & DAG Provenance &rarr;
              </span>
            </Link>

            <Link
              href="/pedagogy-call"
              className="bg-[#FDFCFA] border border-[#E3D9C8] rounded-xl p-4 shadow-xs hover:border-[#8C6A24] transition-all group"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6A24] block">
                Research 2
              </span>
              <span className="font-serif text-2xl font-bold text-[#8C6A24] block mt-1">
                Pedagogy & CALL
              </span>
              <span className="text-xs text-[#526359] block mt-0.5">
                Visual Scaffolding Curriculum &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Mandatory Seven-Section Architecture Grid */}
      <section id="seven-sections" className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF1DA] text-[#8C6A24] text-xs font-semibold border border-[#E0CE9E]">
            <Layers className="w-3.5 h-3.5" />
            <span>Master Architecture</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2D1F]">
            The Seven Core Website Sections
          </h2>
          <p className="text-sm text-[#4A5D51] leading-relaxed">
            Every module in our research platform belongs to this seven-section architecture, integrating interactive linguistic computation with academic research gaps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {coreSections.map((sec) => {
            const Icon = sec.icon;
            return (
              <Link
                key={sec.number}
                href={sec.href}
                className="bg-[#FDFCFA] border border-[#DDD3C2] hover:border-[#1B4D36] rounded-2xl p-6 space-y-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group hover:scale-[1.02]"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#FAF1DA] text-[#8C6A24]">
                      {sec.number}
                    </span>
                    <span className="text-[10px] font-mono text-[#6A7F73]">
                      {sec.badge}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-[#1B4D36] group-hover:text-[#8C6A24] transition-colors" />
                      <h3 className="font-serif text-lg font-bold text-[#0F2D1F] group-hover:text-[#1B4D36] transition-colors">
                        {sec.title}
                      </h3>
                    </div>
                    <span className="font-serif text-xs text-[#8C6A24] block mt-0.5">
                      {sec.sanskrit}
                    </span>
                  </div>

                  <p className="text-xs text-[#526359] leading-relaxed">
                    {sec.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EAE1D3] flex items-center justify-between text-xs text-[#1B4D36] font-semibold">
                  <span>Explore Section</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Research Gaps Section */}
      <section id="research-gaps" className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F0EC] text-[#1B4D36] text-xs font-semibold border border-[#BED7C7]">
            <Compass className="w-3.5 h-3.5" />
            <span>Problem Formulation & Scholarly Significance</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2D1F]">
            The Two Fundamental Research Gaps
          </h2>
          <p className="text-sm text-[#4A5D51] leading-relaxed">
            While contemporary natural language processing has achieved impressive benchmark statistics on high-resource languages, classical Sanskrit presents distinct computational requirements that generic statistical tools cannot satisfy.
          </p>
        </div>

        {/* The Two Research Gap Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Research 1 */}
          <div className="bg-[#FDFCFA] border-2 border-[#1B4D36]/20 rounded-2xl p-7 sm:p-9 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#1B4D36] text-[#FAF7F2]">
                  RESEARCH 1
                </span>
                <span className="text-xs font-medium text-[#8C6A24] uppercase tracking-wider">
                  Computational Provenance
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2D1F]">
                  Explainable Sanskrit NLP (X-NLP)
                </h3>
                <p className="text-xs font-mono text-[#1B4D36]">
                  Bridging the Black-Box Divide via Pāṇinian Rule Attribution
                </p>
              </div>

              <p className="text-sm text-[#3E5246] leading-relaxed">
                Modern deep learning architectures (BERT, LLMs, neural segmenters) perform Sanskrit morphological tagging, sandhi segmentation, and compound analysis as black-box predictors. They output results without mathematical justification or derivation trails.
              </p>

              <div className="bg-[#F4EFE6] rounded-xl p-4 border border-[#E3D9C8] space-y-3">
                <span className="text-xs font-bold text-[#0F2D1F] block">
                  How Our Project Addresses This Gap:
                </span>
                <ul className="space-y-2 text-xs text-[#3E5246]">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#1B4D36] shrink-0 mt-0.5" />
                    <span><strong>Sūtra-Level Audit:</strong> Every morphological step is tagged with its authorizing Aṣṭādhyāyī aphorism (e.g., 6.1.77 <em>iko yaṇaci</em>).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#1B4D36] shrink-0 mt-0.5" />
                    <span><strong>Formal Conflict Resolution:</strong> Explicitly models rule contention using 1.4.2 <em>vipratiṣedhe paraṁ kāryam</em>, Nitya, Antaraṅga, and Apavāda logic.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#1B4D36] shrink-0 mt-0.5" />
                    <span><strong>Verifiable Parse Trees:</strong> Provides syntactic and Kāraka semantic dependency trees that can be independently verified.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#E8DFC9] flex flex-wrap items-center justify-between gap-3 text-xs">
              <Link
                href="/explainable-nlp"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1B4D36] text-white font-semibold hover:bg-[#123625] transition-all shadow-xs"
              >
                <span>Research 1 Details & Proposal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/analysis-lab"
                className="text-[#1B4D36] font-semibold hover:underline flex items-center gap-1"
              >
                <span>Open Analysis Lab &rarr;</span>
              </Link>
            </div>
          </div>

          {/* Research 2 */}
          <div className="bg-[#FDFCFA] border-2 border-[#D4AF37]/40 rounded-2xl p-7 sm:p-9 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#B38622] text-[#FAF7F2]">
                  RESEARCH 2
                </span>
                <span className="text-xs font-medium text-[#8C6A24] uppercase tracking-wider">
                  Pedagogical CALL Tools
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2D1F]">
                  Pāṇinian Grammar for Language Learning
                </h3>
                <p className="text-xs font-mono text-[#8C6A24]">
                  Overcoming the Cognitive Barrier via Interactive Generative Scaffolding
                </p>
              </div>

              <p className="text-sm text-[#3E5246] leading-relaxed">
                 The Aṣṭādhyāyī is the world&apos;s oldest formal generative grammar, yet its extreme brevity and dense metalanguage (it-markers, pratyāhāras, circular adhikāra scopes) make it notoriously impenetrable for modern college students and language learners.
              </p>

              <div className="bg-[#FAF1DA]/60 rounded-xl p-4 border border-[#E8D9B4] space-y-3">
                <span className="text-xs font-bold text-[#0F2D1F] block">
                  How Our Project Addresses This Gap:
                </span>
                <ul className="space-y-2 text-xs text-[#3E5246]">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#B38622] shrink-0 mt-0.5" />
                    <span><strong>Interactive Prakriyā Visualizer:</strong> Converts cryptic linear text commentaries into interactive, step-by-step morphological animation slides.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#B38622] shrink-0 mt-0.5" />
                    <span><strong>Pratyāhāra Decoders:</strong> Instantly unpacks shorthand sets (like <em>ac, hal, ik, yaṇ</em>) with articulatory phonetic maps.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#B38622] shrink-0 mt-0.5" />
                    <span><strong>Scaffolded Learning Paths:</strong> Guides beginner learners from phonetic foundations up to complex nominal compounds (*Samāsa*).</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#E8DFC9] flex flex-wrap items-center justify-between gap-3 text-xs">
              <Link
                href="/pedagogy-call"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#B38622] text-white font-semibold hover:bg-[#8C6A24] transition-all shadow-xs"
              >
                <span>Research 2 Details & Proposal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/learn"
                className="text-[#B38622] font-semibold hover:underline flex items-center gap-1"
              >
                <span>Start Learning &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Workbench Section */}
      <section id="interactive-lab" className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF1DA] text-[#8C6A24] text-xs font-semibold border border-[#E0CE9E]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Demonstrator</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2D1F]">
            The Pāṇinian Computational Lab
          </h2>
          <p className="text-xs sm:text-sm text-[#4E6255]">
            Explore the dual engine: test educational pratyāhāra expansions and step through verifiable derivations.
          </p>
        </div>

        <InteractiveWorkbench />
      </section>

      {/* Theoretical Pillars Section */}
      <section id="sutra-framework" className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#8C6A24] uppercase tracking-wider">
            Foundational Architecture
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2D1F]">
            Pāṇinian Grammar and Formal Description
          </h2>
          <p className="text-sm text-[#4E6255] leading-relaxed">
            The Aṣṭādhyāyī presents a compact grammatical system built from concise rules and technical conventions. Modern comparisons with formal grammars are scholarly analogies, not claims that the text is identical to a contemporary computational model. <Citation numbers={[1]} />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Link
            href="/sutras"
            className="bg-[#FAF7F2] border border-[#DDD3C2] rounded-xl p-6 space-y-3 hover:border-[#1B4D36] transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#1B4D36] text-[#FAF7F2] flex items-center justify-center font-bold font-serif text-lg group-hover:scale-105 transition-transform">
              १
            </div>
            <h4 className="font-serif text-lg font-bold text-[#0F2D1F] group-hover:text-[#1B4D36]">
              अष्टाध्यायी (Sūtrapāṭha)
            </h4>
            <p className="text-xs text-[#526359] leading-relaxed">
              3,959 algebraic aphorisms organized into 8 chapters of 4 quarters each. Encodes definition (*saṁjñā*), operational (*vidhi*), governing (*adhikāra*), and metarules (*paribhāṣā*).
            </p>
          </Link>

          <Link
            href="/word-formation"
            className="bg-[#FAF7F2] border border-[#DDD3C2] rounded-xl p-6 space-y-3 hover:border-[#1B4D36] transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#1B4D36] text-[#FAF7F2] flex items-center justify-center font-bold font-serif text-lg group-hover:scale-105 transition-transform">
              २
            </div>
            <h4 className="font-serif text-lg font-bold text-[#0F2D1F] group-hover:text-[#1B4D36]">
              धातुपाठः (Dhātupāṭha)
            </h4>
            <p className="text-xs text-[#526359] leading-relaxed">
              Comprehensive lexicon of ~2,000 verbal roots categorized into 10 conjugation classes (*daśa gaṇāḥ*), annotated with semantic glosses and accentual marker tags (*anubandha*).
            </p>
          </Link>

          <Link
            href="/word-formation"
            className="bg-[#FAF7F2] border border-[#DDD3C2] rounded-xl p-6 space-y-3 hover:border-[#1B4D36] transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#1B4D36] text-[#FAF7F2] flex items-center justify-center font-bold font-serif text-lg group-hover:scale-105 transition-transform">
              ३
            </div>
            <h4 className="font-serif text-lg font-bold text-[#0F2D1F] group-hover:text-[#1B4D36]">
              गणपाठः (Gaṇapāṭha)
            </h4>
            <p className="text-xs text-[#526359] leading-relaxed">
              Exhaustive collections of nominal stems (*gaṇa*) sharing uniform inflectional, derivational, and accentual behaviors throughout the computational pipeline.
            </p>
          </Link>

          <Link
            href="/sutras"
            className="bg-[#FAF7F2] border border-[#DDD3C2] rounded-xl p-6 space-y-3 hover:border-[#1B4D36] transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#1B4D36] text-[#FAF7F2] flex items-center justify-center font-bold font-serif text-lg group-hover:scale-105 transition-transform">
              ४
            </div>
            <h4 className="font-serif text-lg font-bold text-[#0F2D1F] group-hover:text-[#1B4D36]">
              लिङ्गानुशासनम् (Liṅgānuśāsana)
            </h4>
            <p className="text-xs text-[#526359] leading-relaxed">
              Systematic treatise governing natural and grammatical gender assignment across Sanskrit noun classes, crucial for syntactic agreement.
            </p>
          </Link>
        </div>
      </section>

      <BrandGallery />

      {/* Books & Research Sources */}
      <section
        id="books-research-sources"
        className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8"
      >
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E0CE9E] bg-[#FAF1DA] px-3 py-1 text-xs font-semibold text-[#8C6A24]">
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            Academic Reading List
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#0F2D1F] sm:text-4xl">
            Books &amp; Research Sources
          </h2>
          <p className="text-sm leading-relaxed text-[#4E6255]">
            Primary texts and scholarly resources related to the grammar and
            computational research topics presented on this website. Source
            links and available publication details were checked against
            library, publisher, DOI, or archive records. Items marked further
            reading are recommendations, not claims of direct consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {booksAndResearchSources.map((source) => (
            <article
              key={source.reference}
              className="flex flex-col rounded-2xl border border-[#DDD3C2] bg-[#FDFCFA] p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:border-[#1B4D36] hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E0CE9E] bg-[#FAF1DA] text-[#8C6A24]">
                  <BookOpen className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="rounded-full bg-[#E8F0EC] px-2.5 py-1 text-[10px] font-semibold text-[#1B4D36]">
                  {source.type}
                </span>
              </div>
              <h3 className="mt-4 font-serif text-lg font-bold leading-snug text-[#0F2D1F]">
                {source.title}
              </h3>
              <p className="mt-2 text-xs font-semibold text-[#455A4F]">
                {source.author} <Citation numbers={[source.reference]} />
              </p>
              <p className="mt-1 text-xs text-[#6A7F73]">{source.publication}</p>
              <p className="mt-3 flex-1 text-xs leading-relaxed text-[#526359]">
                {source.description}
              </p>
              <a
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 border-t border-[#EAE1D3] pt-3 text-xs font-semibold text-[#1B4D36] hover:text-[#8C6A24] hover:underline"
              >
                {source.label}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
