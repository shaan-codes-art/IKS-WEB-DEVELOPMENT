"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  void error;
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <p className="font-serif text-6xl font-bold text-[#B38622]">Oops</p>
      <h1 className="font-serif text-2xl font-bold text-[#0F2D1F]">
        Something went wrong
      </h1>
      <p className="max-w-md text-sm text-[#526359]">
        An unexpected error occurred. Please try again.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-lg bg-[#1B4D36] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#133A29]"
      >
        Try again
      </button>
    </div>
  );
}
