"use client";

import { useState } from "react";

export default function FeedbackForm() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) { setStatus("Feedback cannot be empty."); return; }
    setLoading(true);
    setStatus("");
    // Simulate a short delay for UX, then show thank-you (no backend required)
    await new Promise((resolve) => setTimeout(resolve, 600));
    setLoading(false);
    setStatus("Feedback submitted. Thank you!");
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} className="w-full rounded-lg border border-[#DDD3C2] p-3 text-sm" placeholder="Share your feedback..." />
      <button type="submit" disabled={loading} className="rounded-lg bg-[#1B4D36] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
        {loading ? "Submitting..." : "Submit Feedback"}
      </button>
      {status && <p className="text-sm text-[#1B4D36]">{status}</p>}
    </form>
  );
}
