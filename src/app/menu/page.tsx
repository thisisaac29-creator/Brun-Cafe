import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { MenuSection } from "@/components/MenuSection";
import { SITE_CONFIG } from "@/data/site-data";
import { ArrowRight, Sparkles, Coffee, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/menu" },
  title: "The Menu — Complete 103 Offerings across 18 Categories | BRÜN Lagos",
  description:
    "Explore the complete printed menu of BRÜN Coffee Shop & Bakery in Ikeja GRA: French butter croissants, specialty espresso, artisan tarts, pasta, salads, gelato, and coolers. 9 Sasegbon Street.",
};

export default function MenuPage() {
  return (
    <div className="w-full pb-24">
      {/* Editorial Page Header */}
      <section className="pt-14 sm:pt-20 pb-12 sm:pb-16 bg-cream border-b border-taupe-border/50">
        <div className="max-w-editorial mx-auto px-5 sm:px-8 md:px-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-porcelain border border-taupe-border/70 text-[10px] tracking-[0.24em] uppercase font-sans text-espresso mb-5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-caramel inline-block" />
            <span>Printed Menu Monograph · 18 Categories · 103 Items</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[76px] text-espresso font-light leading-[1.04]">
            Made for every craving.
          </h1>

          <p className="font-serif italic text-xl sm:text-2xl text-espresso/80 mt-4 max-w-xl mx-auto leading-relaxed">
            Your morning coffee, something savoury, or a little treat. Discover what&apos;s on the menu at BRÜN.
          </p>

          <p className="font-sans text-xs sm:text-sm text-espresso/70 mt-4 max-w-lg mx-auto leading-relaxed">
            Every item is baked in-house at dawn or pulled to order with natural ingredients at 9 Sasegbon Street, Ikeja GRA. Filter by category, explore dietary badges, or search any dish below.
          </p>
        </div>
      </section>

      {/* Main Interactive Menu Filter & List */}
      <section className="py-12 sm:py-16 max-w-editorial mx-auto px-5 sm:px-8 md:px-12">
        <MenuSection />
      </section>

      {/* Bakery Counter & Takeaway Notice */}
      <section className="max-w-editorial mx-auto px-5 sm:px-8 md:px-12 mt-12">
        <div className="p-8 sm:p-14 rounded-3xl bg-espresso-dark text-porcelain relative overflow-hidden border border-espresso-muted">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-semibold text-caramel-light block">
                Counter Service &amp; Custom Pastry Boxes
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-porcelain font-normal">
                Taking something good home?
              </h2>
              <p className="font-sans text-sm text-cream/80 leading-relaxed max-w-xl">
                Whole hearth-baked sourdough loaves, ribbon-tied boxes of warm butter croissants, lemon meringue tarts, and iced Spanish lattes can all be packaged for your home, office morning, or family gathering. Ask our counter team for bespoke pastry box assortments.
              </p>
              <div className="pt-2 flex items-center gap-3 text-xs text-cream/70 font-sans">
                <ShieldCheck className="w-4 h-4 text-caramel flex-shrink-0" />
                <span>All takeaway items packaged in eco-conscious, food-grade materials.</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/visit"
                className="inline-flex items-center justify-center gap-2 bg-caramel hover:bg-caramel-hover text-porcelain px-6 py-3.5 rounded-full text-xs font-sans uppercase tracking-[0.16em] font-medium transition-colors shadow-sm"
              >
                <span>Find Us on Sasegbon St</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={SITE_CONFIG.phoneHref}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-porcelain border border-white/20 px-6 py-3.5 rounded-full text-xs font-sans uppercase tracking-[0.14em] font-medium transition-colors"
              >
                <span>Call Ahead for Bakes</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
