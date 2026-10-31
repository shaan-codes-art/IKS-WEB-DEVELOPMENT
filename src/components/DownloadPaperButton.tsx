import { BookOpen, Download, FileText } from "lucide-react";
import type { ResearchPaperData } from "../data/researchPapers";

interface DownloadPaperButtonProps {
  paper: ResearchPaperData;
}

export default function DownloadPaperButton({ paper }: DownloadPaperButtonProps) {
  const sourceFile = paper.downloadFileName;
  const pdfFile = sourceFile.replace(/\.md$/i, ".pdf");
  const onlineFile = sourceFile.replace(/\.md$/i, ".html");

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <a
          href={`/downloads/${pdfFile}`}
          download
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#2D6A4D] bg-[#1B4D36] px-4 py-2.5 text-sm font-bold text-[#FAF7F2] shadow-[0_3px_8px_rgba(15,45,31,0.16),inset_0_1px_0_rgba(255,255,255,0.14)] transition-all hover:bg-[#123625] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38622] focus-visible:ring-offset-2"
        >
          <Download className="h-4 w-4 text-[#E5C97A]" aria-hidden="true" />
          Download Research Paper (PDF)
        </a>
        <a
          href={`/downloads/${onlineFile}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#BBD5C5] bg-[#FDFCFA] px-4 py-2.5 text-sm font-semibold text-[#1B4D36] transition-colors hover:bg-[#E8F0EC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38622] focus-visible:ring-offset-2"
        >
          <BookOpen className="h-4 w-4 text-[#8C6A24]" aria-hidden="true" />
          View Paper Online
        </a>
        <a
          href={`/downloads/${sourceFile}`}
          download
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#DDD3C2] bg-[#FAF7F2] px-4 py-2.5 text-sm font-medium text-[#455A4F] transition-colors hover:bg-[#F4EFE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B38622] focus-visible:ring-offset-2"
        >
          <FileText className="h-4 w-4 text-[#8C6A24]" aria-hidden="true" />
          Download Editable Source
        </a>
      </div>
      <p className="text-xs leading-relaxed text-[#526359]">
        GAP-{paper.gapNumber} · Working research proposal, not peer-reviewed or institutionally approved. Covers the proposed problem, literature, questions, methods, evaluation, limitations, and references.
      </p>
    </div>
  );
}
