"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";

export default function AssistantAskBox() {
  const router = useRouter();
  const [question, setQuestion] = useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = question.trim();
    if (!trimmed) return;
    router.push(`/assistant?q=${encodeURIComponent(trimmed.slice(0, 1200))}`);
  }

  return (
    <form onSubmit={submit} className="mt-7 max-w-2xl space-y-2" aria-label="Ask the AI Learning Assistant">
      <label htmlFor="assistant-home-question" className="block text-sm font-semibold text-[#0F2D1F]">
        Ask the AI Learning Assistant
      </label>
      <div className="flex flex-col gap-2 rounded-xl border border-[#D4AF37]/60 bg-[#FDFCFA] p-2 shadow-sm sm:flex-row">
        <input
          id="assistant-home-question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          maxLength={1200}
          placeholder="Ask about Sanskrit, Pāṇinian grammar, Sandhi, Samāsa, sūtras, or NLP…"
          className="min-h-11 min-w-0 flex-1 rounded-lg bg-transparent px-3 text-sm text-[#0F2D1F] outline-none placeholder:text-[#6A7F73] focus-visible:ring-2 focus-visible:ring-[#B38622]"
        />
        <button
          type="submit"
          disabled={!question.trim()}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#1B4D36] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#133A29] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Ask
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      <p className="text-xs text-[#526359]">Grounded local search always works. Model-generated explanations are optional and may require server configuration.</p>
    </form>
  );
}
