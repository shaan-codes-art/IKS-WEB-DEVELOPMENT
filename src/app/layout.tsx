import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import GlobalSearch from "../components/GlobalSearch";
import ThemeToggle from "../components/ThemeToggle";
import SplashScreen from "../components/SplashScreen";
import { DesktopNavigation, MobileNavigation } from "../components/SiteNavigation";

export const metadata: Metadata = {
  title: "Pāṇini & Sanskrit Computational Linguistics | IKS Research Initiative",
  description:
    "College research portal advancing Explainable Sanskrit NLP (X-NLP) and Pāṇinian Generative Grammar for Sanskrit Language Learning (CALL).",
  icons: {
    icon: "/icon.png",
  },
  keywords: [
    "Sanskrit NLP",
    "Paninian Grammar",
    "Aṣṭādhyāyī",
    "Explainable AI",
    "Computational Linguistics",
    "Indian Knowledge Systems",
    "Prakriya",
    "CALL",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(()=>{const theme=localStorage.getItem("panini-parser-theme");document.documentElement.dataset.theme=theme==="dark"?"dark":"light"})()`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Noto+Serif+Devanagari:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FAF7F2] text-[#192720] antialiased selection:bg-[#B38622]/20 selection:text-[#0F2D1F] min-h-screen flex flex-col justify-between">
        <SplashScreen />
      {/* Top Institutional Bar */}
        <div className="bg-[#0D2818] text-[#E8DFC9] border-b border-[#2D5A40]/40 text-xs py-2 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex min-w-0 items-center gap-2 text-center sm:text-left">
              <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
              <span className="tracking-wide font-medium leading-relaxed">
                COLLEGE RESEARCH INITIATIVE &bull; INDIAN KNOWLEDGE SYSTEMS (IKS)
              </span>
            </div>
            <div className="flex min-w-0 items-center gap-2 text-[#D8CFB8] text-[11px] font-medium tracking-wide">
              <span className="hidden sm:inline text-[#D4AF37]">&bull;</span>
              <span>THE PANINI PARSER</span>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <header className="sticky top-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E6DCce]/80 shadow-[0_2px_10px_rgba(15,45,31,0.03)]">
          <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between gap-2 px-3 sm:px-6 2xl:gap-3 2xl:px-6">
            {/* Branding */}
            <Link href="/" className="group flex min-w-0 shrink-0 items-center gap-2 sm:gap-3 2xl:w-[19rem]">
              <Image
                src="/icon.png"
                alt="The Panini Parser logo"
                width={44}
                height={44}
                priority
                className="logo-animate h-9 w-9 shrink-0 rounded-lg border border-[#D4AF37]/50 object-cover shadow-md transition-transform duration-200 group-hover:scale-105 sm:h-10 sm:w-10"
              />
              <div className="flex min-w-0 flex-col">
                <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
                  <span className="truncate font-serif text-[0.78rem] font-bold tracking-tight text-[#0F2D1F] sm:text-[0.98rem] 2xl:text-lg">
                    Aṣṭādhyāyī Computational Lab
                  </span>
                  <span className="hidden shrink-0 rounded border border-[#E2CE9B] bg-[#FAF1DA] px-1.5 py-0.5 text-[9px] font-semibold uppercase text-[#8C6A24] sm:inline-flex">
                    IKS
                  </span>
                </div>
                <span className="hidden text-[10px] font-medium tracking-wide text-[#526359] md:block">
                  Explainable Sanskrit NLP &bull; Pedagogical CALL
                </span>
              </div>
            </Link>

            <DesktopNavigation />

            {/* Action Buttons */}
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 2xl:gap-2.5">
              <GlobalSearch />
              <ThemeToggle />
              <Link
                href="/analysis-lab"
                className="hidden 2xl:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-[#FAF1DA] text-[#8C6A24] text-xs font-semibold hover:bg-[#F3E5C3] transition-all border border-[#E0CE9E]"
              >
                <span>Analysis Lab</span>
              </Link>
              <Link
                href="/word-formation"
                className="hidden 2xl:inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#1B4D36] text-[#FAF7F2] text-xs font-semibold hover:bg-[#133A29] transition-all shadow-sm border border-[#2D6A4D] hover:scale-105"
              >
                <span>Prakriyā Studio</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Responsive navigation menu for widths where the primary row does not fit. */}
          <div className="2xl:hidden border-t border-[#E6DCce]/60 bg-[#F4EFE6]/90 px-3 py-1.5 sm:px-6">
            <MobileNavigation />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1">{children}</main>

        {/* Academic Footer */}
        <footer className="bg-[#0F2D1F] text-[#E5DFCF] border-t border-[#294B38] mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-[#D4AF37] text-[#0F2D1F] flex items-center justify-center font-bold text-lg font-serif">
                    पा
                  </div>
                  <span className="font-serif text-xl font-bold tracking-tight text-[#FAF7F2]">
                    IKS Sanskrit Computational Lab
                  </span>
                </div>
                <p className="text-sm text-[#BFD0C5] leading-relaxed max-w-md">
                  College Research Initiative in Indian Knowledge Systems (IKS). Bridging 2,500 years of Pāṇinian rule-based generative linguistics with modern Explainable NLP (X-NLP, Research 1) and Computer-Assisted Language Learning (CALL, Research 2).
                </p>
                <div className="pt-2 text-xs text-[#9BB5A4]">
                  <p className="font-serif italic text-[#E5C97A]">
                     &quot;सत्यं ज्ञानमनन्तं ब्रह्म &bull; शब्दब्रह्मणे नमः&quot;
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold tracking-wider text-[#D4AF37] uppercase mb-4">
                  Seven Core Architecture Sections
                </h4>
                <ul className="space-y-2 text-xs text-[#C6D6CB]">
                  <li>
                    <Link href="/" className="hover:text-white transition-colors">
                      1. Home Page
                    </Link>
                  </li>
                  <li>
                    <Link href="/analysis-lab" className="hover:text-white transition-colors">
                      2. Sanskrit Analysis Lab
                    </Link>
                  </li>
                  <li>
                    <Link href="/word-formation" className="hover:text-white transition-colors">
                      3. Word Formation Explorer
                    </Link>
                  </li>
                  <li>
                    <Link href="/learn" className="hover:text-white transition-colors">
                      4. Learn Pāṇinian Grammar
                    </Link>
                  </li>
                  <li>
                    <Link href="/practice" className="hover:text-white transition-colors">
                      5. Practice and Quiz
                    </Link>
                  </li>
                  <li>
                    <Link href="/sutras" className="hover:text-white transition-colors">
                      6. Sūtra and Rule Library
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="hover:text-white transition-colors">
                      7. About the Research
                    </Link>
                  </li>
                  <li>
                    <Link href="/assistant" className="hover:text-white transition-colors">
                      AI Learning Assistant
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold tracking-wider text-[#D4AF37] uppercase mb-4">
                  Dedicated Research Gaps & Proposals
                </h4>
                <ul className="space-y-2 text-xs text-[#C6D6CB]">
                  <li>
                    <Link href="/explainable-nlp" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                      <span>Research 1: Explainable NLP</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/pedagogy-call" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                      <span>Research 2: Pāṇinian CALL</span>
                    </Link>
                  </li>
                  <li className="pt-2">
                    <a
                      href="/downloads/Research_Proposal_Gap17_Explainable_Sanskrit_NLP.pdf"
                      download
                      className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 text-[#BBD5C5]"
                    >
                      <span>Research 1 paper (PDF)</span>
                      <span className="text-[10px] font-mono text-[#D4AF37]">[PDF]</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/downloads/Research_Proposal_Gap20_Paninian_CALL_Pedagogy.pdf"
                      download
                      className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 text-[#BBD5C5]"
                    >
                      <span>Research 2 paper (PDF)</span>
                      <span className="text-[10px] font-mono text-[#D4AF37]">[PDF]</span>
                    </a>
                  </li>
                  <li className="pt-2">
                    <Link
                      href="/references"
                      className="hover:text-[#D4AF37] transition-colors"
                    >
                      References &amp; Bibliography
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-[#1F4430] flex flex-col sm:flex-row justify-between items-center text-xs text-[#8BA896] gap-4">
              <p>
                &copy; {new Date().getFullYear()} College Research Initiative &bull; Department of Computer Science & Sanskrit Studies.
              </p>
              <div className="flex items-center gap-6">
                <span>All 7 Mandatory Architecture Sections Integrated</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
