"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MEDIA_ASSETS } from "@/data/media-assets";
import { ArrowRight, Sparkles } from "lucide-react";

export function ManifestoSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [offsetY, setOffsetY] = useState(0);

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

    const handleScroll = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Parallax speed
        setOffsetY((rect.top - windowHeight / 2) * -0.08);
      }
    };

    const near = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
      } else {
        window.removeEventListener("scroll", handleScroll);
      }
    }, { rootMargin: "200px" });
    if (containerRef.current) near.observe(containerRef.current);

    return () => {
      near.disconnect();
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      id="story"
      data-section="manifesto"
      ref={containerRef}
      className="py-24 sm:py-32 bg-porcelain border-b border-taupe-border/50 relative overflow-hidden"
    >
      <div className="max-w-editorial mx-auto px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Column with Architectural Corner Brackets & Parallax (5 cols) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative p-3 corner-bracket bg-cream rounded-3xl border border-taupe-border/60">
              
              {/* Horizontal Masking Image Reveal */}
              <div
                className={`w-full h-[460px] sm:h-[520px] rounded-2xl overflow-hidden relative photo-frame shadow-md transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  clipPath: isVisible
                    ? "inset(0% 0% 0% 0% round 1rem)"
                    : "inset(0% 100% 0% 0% round 1rem)",
                }}
              >
                <div
                  className="w-full h-full relative transition-transform duration-700 ease-out"
                  style={{
                    transform: `translateY(${offsetY}px) scale(${isVisible ? 1.0 : 1.1})`,
                  }}
                >
                  <Image
                    src={MEDIA_ASSETS.diningRoom}
                    alt="Sunlight filtering across BRÜN dining tables, textured neutral upholstery and greenery"
                    fill
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
              
              {/* Aesthetic Caption Bar */}
              <div className="pt-3 px-2 flex justify-between items-center text-[10px] uppercase tracking-widest text-taupe-dark font-sans">
                <span>9 Sasegbon St · Ikeja GRA</span>
                <span>Atmosphere Study 01</span>
              </div>
            </div>
          </div>

          {/* Narrative Editorial Column (7 cols) */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div
              className={`flex items-center gap-3 transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
            >
              <span className="w-8 h-[1px] bg-caramel" />
              <span className="text-[11px] tracking-[0.26em] uppercase font-sans font-semibold text-caramel">
                A Little Something Different
              </span>
            </div>

            {/* Line-by-Line Heading Reveal */}
            <div className="overflow-hidden">
              <h2
                className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-espresso font-normal leading-[1.08] transition-transform duration-1000 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isVisible ? "translate-y-0" : "translate-y-full"
                }`}
              >
                &ldquo;Made for the everyday moments.&rdquo;
              </h2>
            </div>

            <p
              className={`font-sans text-base sm:text-lg text-espresso/80 leading-relaxed font-normal transition-all duration-1000 delay-300 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              BRÜN takes inspiration from the rich, warm brown tones of deeply roasted coffee and freshly baked loaves. Born on the quiet avenue of Sasegbon Street in Ikeja GRA, it was created as a thoughtful counterpoint to the rush of Lagos.
            </p>

            <p
              className={`font-sans text-base sm:text-lg text-espresso/70 leading-relaxed transition-all duration-1000 delay-450 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              We believe an island-calibre café experience belongs right here on the mainland. An inviting destination with zero pretension, where warm Scandinavian timber meets fragrant French viennoiserie, single-origin espresso pulls, and honest neighbourhood hospitality.
            </p>

            {/* Tactile Material Strip with Stagger */}
            <div
              className={`py-4 border-y border-taupe-border/50 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-sans text-espresso/80 transition-all duration-1000 delay-600 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div>
                <span className="text-[10px] uppercase tracking-wider text-taupe-dark block font-sans">Interior</span>
                <span className="font-medium">Ash Timber</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-taupe-dark block font-sans">Counter</span>
                <span className="font-medium">Travertine Stone</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-taupe-dark block font-sans">Patio</span>
                <span className="font-medium">Striped Awnings</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-taupe-dark block font-sans">Ambiance</span>
                <span className="font-medium">Natural Daylight</span>
              </div>
            </div>

            <div
              className={`pt-2 transition-all duration-1000 delay-700 ease-out ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <Link
                href="/our-story"
                className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase font-sans font-semibold text-caramel hover:text-caramel-hover transition-colors group"
              >
                <span>Discover the BRÜN Story</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

