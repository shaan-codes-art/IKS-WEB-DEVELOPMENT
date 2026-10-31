import LearningAssistant from "../../components/LearningAssistant";
import { Suspense } from "react";

export const metadata = {
  title: "AI Learning Assistant | THE PANINI PARSER",
  description: "Ask questions about Sanskrit grammar, Pāṇini, sūtras, lessons, and computational linguistics.",
};

export default function AssistantPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-5xl px-4 py-12 text-sm text-[#526359]" role="status">Loading assistant…</div>}>
      <LearningAssistant />
    </Suspense>
  );
}
