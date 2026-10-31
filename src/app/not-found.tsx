import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <p className="font-serif text-6xl font-bold text-[#1B4D36]">404</p>
      <h1 className="font-serif text-2xl font-bold text-[#0F2D1F]">
        Page not found
      </h1>
      <p className="max-w-md text-sm text-[#526359]">
        The page you requested does not exist or may have moved.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-[#1B4D36] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#133A29]"
      >
        Return home
      </Link>
    </div>
  );
}
