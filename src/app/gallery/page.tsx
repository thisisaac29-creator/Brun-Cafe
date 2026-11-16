import React from "react";
import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { SITE_CONFIG } from "@/data/site-data";
import { Instagram, ArrowUpRight, Camera } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/gallery" },
  title: "Gallery — Architectural & Visual Monograph of BRÜN",
  description:
    "Immerse yourself in BRÜN Coffee Shop & Bakery: Explore our warm Scandinavian interiors, artisan pastry displays, specialty espresso craft, and Kinderhome play space in Ikeja GRA.",
};

export default function GalleryPage() {
  return (
    <div className="w-full pb-24">
      {/* Editorial Header */}
      <section className="pt-16 sm:pt-24 pb-12 sm:pb-16 bg-cream border-b border-taupe-border/50">
        <div className="max-w-editorial mx-auto px-5 sm:px-8 md:px-12 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-porcelain border border-taupe-border/70 text-[10px] tracking-[0.24em] uppercase font-sans text-espresso mb-4">
            <Camera className="w-3 h-3 text-caramel" />
            <span>Visual Monograph · Ikeja GRA</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[76px] text-espresso font-light">
            A look inside BRÜN.
          </h1>

          <p className="font-serif italic text-xl sm:text-2xl text-espresso/80 mt-3 max-w-lg mx-auto">
            &ldquo;Light, timber, and the scent of morning bakes.&rdquo;
          </p>

          <p className="font-sans text-xs sm:text-sm text-espresso/70 mt-3 max-w-md mx-auto leading-relaxed">
            Click any plate to open the full-screen study. Use the arrow keys or the previous and next buttons to browse.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href={SITE_CONFIG.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs tracking-[0.16em] uppercase font-sans font-medium text-caramel hover:text-caramel-hover transition-colors px-4 py-2 rounded-full border border-caramel/30 bg-porcelain"
            >
              <Instagram className="w-4 h-4" />
              <span>Explore More on @brun.lagos</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Interactive Editorial Masonry Grid & Lightbox */}
      <section className="py-12 sm:py-16 max-w-editorial mx-auto px-5 sm:px-8 md:px-12">
        <GalleryGrid />
      </section>
    </div>
  );
}
