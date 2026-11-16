import React from "react";
import { NearbySection } from "@/components/NearbySection";
import { EditorialPillars } from "@/components/EditorialPillars";
import { ScrollExpansionSection } from "@/components/ScrollExpansionSection";
import { VideoStorySection } from "@/components/VideoStorySection";
import { HomeSignatureMenu } from "@/components/HomeSignatureMenu";
import { KinderhomeInteractive } from "@/components/KinderhomeInteractive";
import Image from "next/image";
import Link from "next/link";
import { getFeaturedMenuItems, formatNaira } from "@/data/menu-data";
import { HeroCinematic } from "@/components/HeroCinematic";
import { ManifestoSection } from "@/components/ManifestoSection";
import { MapModule } from "@/components/MapModule";
import { SITE_CONFIG, MEDIA_ASSETS } from "@/data/site-data";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Heart,
  Clock,
  Compass,
  Instagram,
  Check,
} from "lucide-react";
import { TikTokIcon } from "@/components/icons/TikTokIcon";

export const metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  return (
    <div className="w-full">
      {/* SECTION A — BESPOKE CINEMATIC HERO */}
      <HeroCinematic />

      {/* SENSORY MARQUEE RIBBON */}
      <div className="bg-espresso text-porcelain py-4 overflow-hidden border-y border-espresso-dark select-none">
        <div className="animate-marquee flex items-center space-x-8 text-[11px] sm:text-xs tracking-[0.28em] uppercase font-sans font-light">
          <span>Artisanal French Bakery</span>
          <span className="text-caramel">✦</span>
          <span>Single-Origin Espresso Craft</span>
          <span className="text-caramel">✦</span>
          <span>All-Day Savoury Brunch</span>
          <span className="text-caramel">✦</span>
          <span>House-Crafted Italian Gelato</span>
          <span className="text-caramel">✦</span>
          <span>Kinderhome Soft-Play Sanctuary</span>
          <span className="text-caramel">✦</span>
          <span>Shaded Outdoor Patio</span>
          <span className="text-caramel">✦</span>
          <span>Complimentary Gated Parking</span>
          <span className="text-caramel">✦</span>
          <span>Artisanal French Bakery</span>
          <span className="text-caramel">✦</span>
          <span>Single-Origin Espresso Craft</span>
          <span className="text-caramel">✦</span>
          <span>All-Day Savoury Brunch</span>
          <span className="text-caramel">✦</span>
          <span>House-Crafted Italian Gelato</span>
          <span className="text-caramel">✦</span>
          <span>Kinderhome Soft-Play Sanctuary</span>
          <span className="text-caramel">✦</span>
        </div>
      </div>

      {/* SECTION B — THE SENSORY MANIFESTO WITH HORIZONTAL MASK REVEAL */}
      <ManifestoSection />

      <NearbySection><EditorialPillars /></NearbySection>
      <NearbySection><ScrollExpansionSection /></NearbySection>
      <NearbySection><VideoStorySection /></NearbySection>
      <NearbySection><HomeSignatureMenu featuredItems={getFeaturedMenuItems().map(item => ({ ...item, displayPrice: formatNaira(item.priceNgn) }))} /></NearbySection>
      <NearbySection><KinderhomeInteractive /></NearbySection>

      {/* SECTION H — VISUAL GLIMPSE & JOURNAL */}
      <section className="[content-visibility:auto] [contain-intrinsic-block-size:auto_854px] md:[contain-intrinsic-block-size:auto_530px] lg:[contain-intrinsic-block-size:auto_482px] py-24 sm:py-32 bg-porcelain border-t border-taupe-border/50">
        <div className="max-w-editorial mx-auto px-5 sm:px-8 md:px-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
            <div>
              <span className="text-[11px] tracking-[0.26em] uppercase font-sans font-semibold text-[#905938] block mb-2">
                Visual Journal · @brun.lagos
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-espresso font-normal">
                A little glimpse of BRÜN.
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={SITE_CONFIG.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs tracking-[0.16em] uppercase font-sans font-medium text-[#905938] hover:text-espresso transition-colors px-3.5 py-1.5 rounded-full bg-cream border border-taupe-border/60 hover:bg-cream-dark"
                title="Follow BRÜN on Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram @brun.lagos</span>
                <ArrowUpRight className="w-3 h-3 opacity-70" />
              </a>

              <a
                href={SITE_CONFIG.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs tracking-[0.16em] uppercase font-sans font-medium text-[#905938] hover:text-espresso transition-colors px-3.5 py-1.5 rounded-full bg-cream border border-taupe-border/60 hover:bg-cream-dark"
                title="Follow BRÜN on TikTok"
              >
                <TikTokIcon className="w-3.5 h-3.5" />
                <span>TikTok @brun.lagos</span>
                <ArrowUpRight className="w-3 h-3 opacity-70" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="h-64 sm:h-84 rounded-2xl overflow-hidden relative photo-frame bg-cream-dark group">
              <Image
                src={MEDIA_ASSETS.coffeeBar}
                alt="Latte art and espresso craft at BRÜN"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="h-64 sm:h-84 rounded-2xl overflow-hidden relative photo-frame bg-cream-dark group">
              <Image
                src={MEDIA_ASSETS.croissants}
                alt="French butter croissants freshly baked"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="h-64 sm:h-84 rounded-2xl overflow-hidden relative photo-frame bg-cream-dark group">
              <Image
                src={MEDIA_ASSETS.breakfastSpread}
                alt="BRÜN breakfast and brunch table spread"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="h-64 sm:h-84 rounded-2xl overflow-hidden relative photo-frame bg-cream-dark group">
              <Image
                src={MEDIA_ASSETS.cinnamonRolls}
                alt="BRÜN Signature Cinnamon Rolls"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 bg-espresso hover:bg-espresso-dark text-porcelain text-xs tracking-[0.16em] uppercase font-sans font-medium px-8 py-4 rounded-full transition-all duration-300 luxury-hover shadow-md"
            >
              <span>Explore Full Photography &amp; Video Monograph</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* SECTION I — VISIT & INTERACTIVE MAP MODULE */}
      <section className="py-24 sm:py-32 bg-cream border-t border-taupe-border/60">
        <div className="max-w-editorial mx-auto px-5 sm:px-8 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] tracking-[0.26em] uppercase font-sans font-semibold text-[#905938] block mb-3">
              Visit Us in Ikeja GRA
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-espresso font-normal">
              Your next coffee is closer than you think.
            </h2>
            <p className="font-sans text-base sm:text-lg text-espresso/70 mt-3">
              Open seven days a week, 8:00 AM – 9:00 PM. Walk-ins warmly welcomed.
            </p>
          </div>

          <MapModule />

        </div>
      </section>

    </div>
  );
}
