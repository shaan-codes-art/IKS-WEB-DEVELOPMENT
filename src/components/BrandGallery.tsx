"use client";

import Image from "next/image";
import PaniniLogo from "./PaniniLogo";
import { useEffect, useRef, useState } from "react";
import { Image as ImageIcon, X } from "lucide-react";

const brandAssets = [
  {
    src: "/icon.png",
    alt: "Compact The Panini Parser emblem used as the website favicon",
    title: "Compact project emblem",
    caption: "The square emblem used for the site icon and browser tab favicon.",
    width: 192,
    height: 192,
    imageClass: "object-contain",
  },
];

export default function BrandGallery() {
  const [activeImage, setActiveImage] = useState<(typeof brandAssets)[number] | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (activeImage && !dialog.open) dialog.showModal();
    if (!activeImage && dialog.open) dialog.close();
  }, [activeImage]);

  return (
    <section aria-labelledby="brand-gallery-title" className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
      <div className="max-w-3xl space-y-2">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8C6A24]">
          <ImageIcon className="h-3.5 w-3.5" aria-hidden="true" />
          Project Gallery
        </span>
        <h2 id="brand-gallery-title" className="font-serif text-2xl font-bold text-[#0F2D1F] sm:text-3xl">
          The Panini Parser Identity
        </h2>
        <p className="text-sm leading-relaxed text-[#4E6255]">
          A closer look at the existing project branding assets used on this website.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <figure className="min-w-0 overflow-hidden rounded-2xl border border-[#DDD3C2] bg-[#FDFCFA] shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex h-52 w-full items-center justify-center bg-[#F4EFE6]">
            <PaniniLogo size={96} />
          </div>
          <figcaption className="p-4">
            <h3 className="font-serif text-lg font-bold text-[#0F2D1F]">Project logo artwork</h3>
            <p className="mt-1 text-xs leading-relaxed text-[#526359]">
              The Panini Parser identity used across the Sanskrit research website.
            </p>
          </figcaption>
        </figure>
        {brandAssets.map((asset) => (
          <figure key={asset.src} className="min-w-0 overflow-hidden rounded-2xl border border-[#DDD3C2] bg-[#FDFCFA] shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md">
            <button
              type="button"
              onClick={() => setActiveImage(asset)}
              aria-label={`View larger: ${asset.title}`}
              className="block min-w-0 w-full overflow-hidden bg-[#F4EFE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#B38622]"
            >
              <Image
                src={asset.src}
                alt={asset.alt}
                width={asset.width}
                height={asset.height}
                className={`h-52 w-full transition-transform duration-300 hover:scale-[1.02] ${asset.imageClass}`}
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </button>
            <figcaption className="p-4">
              <h3 className="font-serif text-lg font-bold text-[#0F2D1F]">{asset.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-[#526359]">{asset.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <dialog
        ref={dialogRef}
        aria-label={activeImage?.title}
        onClose={() => setActiveImage(null)}
        onCancel={(event) => {
          event.preventDefault();
          setActiveImage(null);
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            setActiveImage(null);
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setActiveImage(null);
        }}
        className="fixed inset-0 m-auto w-full max-w-4xl rounded-2xl bg-[#FAF7F2] p-3 shadow-2xl backdrop:bg-[#0F2D1F]/85 sm:p-5"
      >
        {activeImage && (
          <>
          <div className="relative w-full max-w-4xl rounded-2xl bg-[#FAF7F2] p-3 shadow-2xl sm:p-5">
            <button
              type="button"
              autoFocus
              onClick={() => setActiveImage(null)}
              aria-label="Close image viewer"
              className="absolute right-3 top-3 z-10 rounded-full bg-[#0F2D1F] p-2 text-white hover:bg-[#1B4D36] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              width={activeImage.width}
              height={activeImage.height}
              className="max-h-[75vh] w-full rounded-xl object-contain"
              sizes="(max-width: 896px) 100vw, 896px"
            />
            <p className="pt-3 text-center text-sm font-medium text-[#0F2D1F]">{activeImage.caption}</p>
          </div>
          </>
        )}
      </dialog>
    </section>
  );
}
