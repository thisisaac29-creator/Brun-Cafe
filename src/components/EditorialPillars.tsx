"use client";

import { useNearbyPoster } from "./useNearbyPoster";
import { prefersManualPlayback } from "./mediaPreferences";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play, Pause } from "lucide-react";
import { MEDIA_ASSETS } from "@/data/media-assets";

const PILLARS = [
  {
    number: "01",
    title: "The Bakery",
    subtitle: "Laminated & Slow-Fermented",
    description:
      "Our in-house bakers begin long before dawn. Traditional French butter croissants, delicate fruit tarts, warm Korintje cinnamon rolls, and hearth-baked crusty sourdough bread.",
    image: MEDIA_ASSETS.croissants,
    video: MEDIA_ASSETS.videoCraft,
    videoPoster: MEDIA_ASSETS.videoCraftPoster,
    isVideo: true,
    href: "/menu",
  },
  {
    number: "02",
    title: "The Coffee",
    subtitle: "Precision & Origin",
    description:
      "Carefully sourced specialty beans roasted to unlock balanced chocolate and caramel undertones. From meticulous espresso pulls to our beloved Spanish Latte, every cup is crafted with quiet intention.",
    image: MEDIA_ASSETS.coffeeBar,
    isVideo: false,
    href: "/menu",
  },
  {
    number: "03",
    title: "All-Day Brunch",
    subtitle: "Savoury & Hearty",
    description:
      "Honest, wholesome dining crafted with farm-fresh eggs, artisanal breads, and vibrant produce. A signature English breakfast, silky smoked salmon, and slow-simmered pastas.",
    image: MEDIA_ASSETS.breakfastSpread,
    isVideo: false,
    href: "/menu",
  },
  {
    number: "04",
    title: "Gelato & Sweet Things",
    subtitle: "House-Churned Indulgence",
    description:
      "Small-batch Italian gelato made on-site with pure ingredients, paired with freshly baked waffles, warm croissants, and delicate patisserie for slow, sweet afternoons.",
    image: MEDIA_ASSETS.heroSecondary,
    isVideo: false,
    href: "/menu",
  },
];

export function EditorialPillars() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useNearbyPoster(videoRef);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause();
      else if (!prefersManualPlayback()) video.play().catch(() => {});
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="[content-visibility:auto] [contain-intrinsic-block-size:auto_2412px] md:[contain-intrinsic-block-size:auto_1334px] lg:[contain-intrinsic-block-size:auto_821px] py-24 sm:py-32 bg-cream overflow-hidden">
      <div className="max-w-editorial mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header */}
        <div
          className={`max-w-2xl mb-16 sm:mb-20 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-sans font-semibold text-caramel block mb-3">
            The BRÜN Experience
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-espresso font-normal leading-[1.15]">
            Crafted for the slow moments and everyday rituals.
          </h2>
          <p className="font-sans text-base sm:text-lg text-espresso/70 mt-4 leading-relaxed">
            Every morning at BRÜN brings the aroma of fresh bakes, the hum of the grinder, and the quiet comfort of a table made for staying a little longer.
          </p>
        </div>

        {/* Four Column Editorial Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PILLARS.map((pillar, idx) => (
            <Link
              key={pillar.number}
              href={pillar.href}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group flex flex-col justify-between p-6 rounded-2xl bg-porcelain border border-taupe-border/50 hover:border-caramel/50 transition-all duration-500 luxury-hover shadow-sm ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionDelay: `${idx * 150}ms`,
              }}
            >
              <div>
                {/* Media Container: Photo or Video Craft Tile */}
                <div className="w-full h-56 rounded-xl overflow-hidden relative mb-6 bg-cream-dark photo-frame">
                  {pillar.isVideo && pillar.video ? (
                    <div className="w-full h-full relative">
                      <video
                        src={pillar.video}
                        data-poster={pillar.videoPoster}
                        ref={videoRef}
                        controls
                        muted
                        loop
                        playsInline
                        preload="none"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <span className="absolute bottom-2.5 right-2.5 bg-espresso/80 backdrop-blur-sm text-porcelain text-[9px] font-sans tracking-widest uppercase px-2 py-0.5 rounded border border-white/10 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-caramel animate-pulse" />
                        Craft Reel
                      </span>
                    </div>
                  ) : (
                    <Image
                      src={pillar.image}
                      alt={pillar.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  )}
                  
                  <span className="absolute top-3 left-3 bg-espresso/85 backdrop-blur-sm text-porcelain text-[10px] tracking-widest uppercase font-sans px-2.5 py-0.5 rounded shadow-sm border border-white/10">
                    {pillar.number}
                  </span>
                </div>

                <span className="text-[10px] tracking-[0.2em] uppercase font-sans font-medium text-taupe-dark block mb-1">
                  {pillar.subtitle}
                </span>
                <h3 className="font-serif text-2xl text-espresso font-normal group-hover:text-caramel transition-colors">
                  {pillar.title}
                </h3>
                <p className="font-sans text-xs sm:text-[13px] text-espresso/70 leading-relaxed mt-3">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-taupe-border/40 flex items-center justify-between text-xs tracking-[0.14em] uppercase font-sans font-medium text-espresso group-hover:text-caramel transition-colors">
                <span>Explore</span>
                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
