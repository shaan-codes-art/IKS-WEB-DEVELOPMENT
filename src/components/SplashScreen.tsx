"use client";

import { useEffect, useState } from "react";
import PaniniLogo from "./PaniniLogo";

const INTRO_KEY = "panini-parser-intro-seen";

const QUOTES = [
  { text: "Let noble thoughts come to us from all directions.", attr: "Rig Veda 1.89.1; verify exact wording before quotation." },
  { text: "Knowledge purifies the mind and leads to wisdom.", attr: "Inspired by Bhagavad Gita 4.38; paraphrase, not verbatim." },
  { text: "Precision in language. Structure in thought. Knowledge through inquiry.", attr: "THE PANINI PARSER — original project motto." },
  { text: "Explore ancient knowledge through modern computational thinking.", attr: "THE PANINI PARSER — original project motto." },
  { text: "From Sanskrit grammar to the future of language technology.", attr: "THE PANINI PARSER — original project motto." },
];

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(1);
  const [fading, setFading] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteFade, setQuoteFade] = useState(true);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(INTRO_KEY) === "1") return;
    } catch {
      // ignore
    }
    setVisible(true);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduced ? 1200 : 3600;
    const start = performance.now();
    let raf = 0;

    const quoteInterval = setInterval(() => {
      setQuoteFade(false);
      setTimeout(() => {
        setQuoteIndex((i) => (i + 1) % QUOTES.length);
        setQuoteFade(true);
      }, 250);
    }, duration / QUOTES.length);

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.max(1, Math.round((elapsed / duration) * 100)));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        clearInterval(quoteInterval);
        setTimeout(() => {
          setFading(true);
          setTimeout(() => {
            setVisible(false);
            try {
              sessionStorage.setItem(INTRO_KEY, "1");
            } catch {
              // ignore
            }
          }, 500);
        }, 300);
      }
    };
    raf = requestAnimationFrame(tick);

    const fallback = setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {
        // ignore
      }
    }, duration + 2000);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(quoteInterval);
      clearTimeout(fallback);
    };
  }, []);

  if (!visible) return null;

  const q = QUOTES[quoteIndex];

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#FAF7F2] transition-opacity duration-500 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#F4EFE6_0%,#FAF7F2_60%)]" />
      <svg className="absolute bottom-0 left-0 h-32 w-full opacity-30" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,80 C360,20 720,100 1080,40 C1260,10 1380,60 1440,50 L1440,120 L0,120 Z" fill="#1B4D36" />
      </svg>
      <div className="absolute inset-0 opacity-[0.06]">
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#B38622]" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#1B4D36]" />
      </div>

      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <div className="logo-animate">
          <PaniniLogo size={96} />
        </div>
        <h1 className="font-serif text-2xl font-bold text-[#0F2D1F] sm:text-3xl opacity-0 animate-[fadeIn_0.8s_ease-out_0.6s_forwards]">
          THE PANINI PARSER
        </h1>
        <p className="text-xs font-medium tracking-wide text-[#526359] opacity-0 animate-[fadeIn_0.8s_ease-out_1s_forwards]">
          Sanskrit • Paninian Grammar • Computational Linguistics
        </p>
        <div className="my-2 h-px w-24 bg-[#D4AF37]/60" />
        <div
          className={`mt-2 max-w-md transition-opacity duration-250 ${
            quoteFade ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-sm italic text-[#1B4D36]">&ldquo;{q.text}&rdquo;</p>
          <p className="mt-1 text-[10px] text-[#6A7F73]">{q.attr}</p>
        </div>
        <div className="mt-4 w-64 max-w-[80vw]">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E3D9C8]">
            <div
              className="h-full rounded-full bg-[#1B4D36] transition-[width] duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-xs font-mono text-[#8C6A24]">{progress}%</p>
        </div>
        <p className="mt-2 text-[11px] text-[#6A7F73]">
          Exploring ancient wisdom through modern technology…
        </p>
      </div>
    </div>
  );
}
