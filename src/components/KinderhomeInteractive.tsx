"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Heart, Sparkles, Check } from "lucide-react";
import { MEDIA_ASSETS } from "@/data/media-assets";

export function KinderhomeInteractive() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

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
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      title: "Parents-Beside-Play",
      desc: "Thoughtfully placed adjacent dining tables with uninterrupted sightlines. Enjoy your pour-over while your children play safely within arm's reach.",
    },
    {
      title: "Hospital-Grade Hygiene",
      desc: "Sanitized twice daily and deep-cleaned each evening with child-safe, non-toxic organic botanical cleansers.",
    },
    {
      title: "Mandatory Clean Sock Policy",
      desc: "Preserves a pristine play surface. Bring your own clean socks or purchase soft fresh pairs at the reception desk for ₦2,250.",
    },
  ];

  return (
    <section ref={containerRef} className="[content-visibility:auto] [contain-intrinsic-block-size:auto_1341px] md:[contain-intrinsic-block-size:auto_1265px] lg:[contain-intrinsic-block-size:auto_648px] py-24 sm:py-32 bg-cream border-t border-taupe-border/50 relative overflow-hidden">
      {/* Gentle Floating Atmospheric Motifs (Non-cartoonish, Scandinavian) */}
      <div className="absolute -top-12 -right-12 w-96 h-96 rounded-full bg-caramel/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-96 h-96 rounded-full bg-olive/5 blur-3xl pointer-events-none" />

      <div className="max-w-editorial mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Narrative Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div
              className={`flex items-center gap-3 transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
            >
              <span className="w-8 h-[1px] bg-caramel" />
              <span className="text-[11px] tracking-[0.28em] uppercase font-sans font-semibold text-caramel">
                Kinderhome Sanctuary
              </span>
            </div>

            <div className="overflow-hidden">
              <h2
                className={`font-serif text-3xl sm:text-5xl lg:text-6xl text-espresso font-normal leading-tight transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isVisible ? "translate-y-0" : "translate-y-full"
                }`}
              >
                A café where parents truly relax and little minds explore.
              </h2>
            </div>

            <p
              className={`font-sans text-base sm:text-lg text-espresso/80 leading-relaxed transition-all duration-1000 delay-200 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Kinderhome is BRÜN&apos;s Scandinavian-inspired indoor soft-play space, designed specifically for children aged 2 and up. Cushioned structures, pastel slides, and enclosed soft ball-pits allow uninhibited play in complete safety.
            </p>

            {/* Interactive Feature Accordion / Tabs */}
            <div
              className={`space-y-3 pt-2 transition-all duration-1000 delay-400 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {features.map((feat, idx) => (
                <div
                  key={feat.title}
                  onClick={() => setActiveFeature(idx)}
                  className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    activeFeature === idx
                      ? "bg-porcelain border-caramel/60 shadow-sm"
                      : "bg-porcelain/50 border-taupe-border/40 hover:bg-porcelain"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full ${activeFeature === idx ? "bg-caramel" : "bg-taupe"}`} />
                      <h4 className="font-serif text-lg text-espresso font-medium">{feat.title}</h4>
                    </div>
                    <span className="text-[10px] font-sans uppercase text-taupe-dark">
                      0{idx + 1}
                    </span>
                  </div>
                  {activeFeature === idx && (
                    <p className="font-sans text-xs sm:text-sm text-espresso/75 mt-2 pl-5 leading-relaxed">
                      {feat.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div
              className={`pt-4 flex flex-wrap items-center gap-4 transition-all duration-1000 delay-600 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Link
                href="/kinderhome"
                className="inline-flex items-center gap-2.5 bg-espresso hover:bg-espresso-dark text-porcelain text-xs tracking-[0.16em] uppercase font-sans font-medium px-8 py-4 rounded-full transition-all duration-300 luxury-hover shadow-md"
              >
                <span>Read Kinderhome Guidelines</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-xs font-sans text-espresso/60 uppercase tracking-wider">
                Ages 2+ · Free Play with Dining
              </span>
            </div>
          </div>

          {/* Authentic Kinderhome Photography Right Column (5 cols) */}
          <div className="lg:col-span-5">
            <div
              className={`relative p-3 corner-bracket bg-porcelain rounded-3xl border border-taupe-border/60 shadow-lg transition-all duration-1000 delay-300 ease-out ${
                isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-12"
              }`}
            >
              <div className="w-full h-[480px] sm:h-[540px] rounded-2xl overflow-hidden relative photo-frame">
                <Image
                  src={MEDIA_ASSETS.kinderhome}
                  alt="BRÜN Kinderhome indoor soft play structure, ball pit, slides and padded climbing blocks"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 via-transparent to-transparent pointer-events-none" />

                {/* Floating Tag */}
                <div className="absolute top-4 left-4 bg-espresso/85 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-sans tracking-widest uppercase text-porcelain border border-white/10 flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-caramel-light" />
                  <span>Enclosed Soft Play</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-porcelain">
                  <span className="text-[10px] uppercase font-sans tracking-widest text-caramel-light block">
                    Safe &amp; Design-Conscious
                  </span>
                  <span className="font-serif text-lg leading-tight block">
                    Curated for family peace of mind
                  </span>
                </div>
              </div>

              <div className="pt-3 px-2 flex justify-between items-center text-[10px] uppercase tracking-widest text-taupe-dark font-sans">
                <span>9 Sasegbon St · Ikeja GRA</span>
                <span>Authentic Play Structure</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

