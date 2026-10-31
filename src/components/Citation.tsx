"use client";

import Link from "next/link";

type CitationProps = {
  numbers: number[];
  className?: string;
};

export default function Citation({ numbers, className = "" }: CitationProps) {
  return (
    <span className={`inline-flex gap-1 whitespace-nowrap ${className}`}>
      {numbers.map((number, index) => (
        <span key={number}>
          {index > 0 ? ", " : ""}
          <Link
            href={`/references#ref-${number}`}
            className="font-medium text-[#1B4D36] hover:text-[#8C6A24] hover:underline"
            aria-label={`Reference ${number}`}
          >
            [{number}]
          </Link>
        </span>
      ))}
    </span>
  );
}
