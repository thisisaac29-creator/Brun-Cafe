"use client";

import { useNearbyPoster } from "./useNearbyPoster";
import { prefersManualPlayback } from "./mediaPreferences";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MEDIA_ASSETS } from "@/data/media-assets";
import { ArrowRight, Sparkles, Maximize2 } from "lucide-react";

export function ScrollExpansionSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useNearbyPoster(videoRef);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far into the section we've scrolled (0 to 1)
      const totalDist = windowHeight + rect.height;
      const currentDist = windowHeight - rect.top;
      const progress = Math.min(Math.max(currentDist / totalDist, 0), 1);
      
      // Scale progress for the mid-viewport expansion
      const expansion = Math.min(Math.max((progress - 0.2) / 0.5, 0), 1);
      setScrollProgress(expansion);
    };

    const near = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
      } else {
        window.removeEventListener("scroll", handleScroll);
      }
    }, { rootMargin: "200px" });
    if (sectionRef.current) near.observe(sectionRef.current);

    // Intersection observer for video play/pause
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (!prefersManualPlayback() && videoRef.current?.paused) {
              videoRef.current.play().catch(() => {});
            }
          } else {
            setInView(false);
            if (videoRef.current && !videoRef.current.paused) {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      near.disconnect();
      observer.disconnect();
    };
  }, []);

  // Calculate dynamic width, scale, and border-radius based on scrollProgress
  // At 0: width is ~80%, scale is ~0.92, borderRadius is 32px
  // At 1: width is 100%, scale is 1.0, borderRadius is 12px
  const widthPercent = 82 + scrollProgress * 18; // 82% to 100%
  const scale = 0.94 + scrollProgress * 0.06; // 0.94 to 1.0
  const borderRadius = 32 - scrollProgress * 20; // 32px to 12px

  return (
    <section
      ref={sectionRef}
      className="[content-visibility:auto] [contain-intrinsic-block-size:auto_496px] md:[contain-intrinsic-block-size:auto_801px] lg:[contain-intrinsic-block-size:auto_880px] py-24 sm:py-32 bg-espresso text-porcelain relative overflow-hidden select-none"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40" />

      <div className="max-w-editorial mx-auto px-5 sm:px-8 md:px-12 relative z-10 mb-12 sm:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[1px] bg-caramel" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.28em] uppercase font-sans text-caramel-light">
                Signature Experience 01 · Spatial Immersion
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-porcelain font-normal leading-tight">
              An architecture of light, ash wood, and unhurried mornings.
            </h2>
          </div>
          <p className="font-sans text-base sm:text-lg text-cream/75 max-w-md leading-relaxed">
            As you walk through our doors at 9 Sasegbon Street, the noise of the city gives way to natural daylight, the aroma of golden viennoiserie, and tactile Scandinavian surfaces.
          </p>
        </div>
      </div>

      {/* The Scroll-Driven Expanding Cinematic Container */}
      <div className="w-full flex justify-center px-4 sm:px-6">
        <div
          className="relative aspect-video max-h-[72vh] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.7)] border-2 border-caramel/20 bg-espresso-dark transition-all duration-300 ease-out group"
          style={{
            width: `${widthPercent}%`,
            transform: `scale(${scale})`,
            borderRadius: `${borderRadius}px`,
          }}
        >
          {/* Atmospheric Widescreen Video (Video Asset 3) */}
          <video
            ref={videoRef}
            src={MEDIA_ASSETS.videoAtmosphere}
            data-poster={MEDIA_ASSETS.videoAtmospherePoster}
            playsInline
            muted
            loop
            controls
            preload="none"
            className="w-full h-full object-cover brightness-[0.88] transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Cinematic Scrims */}
          <div className="absolute inset-0 bg-gradient-to-t from-espresso-dark/90 via-espresso/20 to-transparent pointer-events-none" />

          {/* Top Live Badge */}
          <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-20">
            <span className="inline-flex items-center gap-2 bg-espresso/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-sans tracking-widest uppercase text-porcelain border border-white/15">
              <span className="w-1.5 h-1.5 rounded-full bg-caramel animate-ping" />
              Cinematic Atmosphere · 16:9 Widescreen
            </span>
            <span className="text-[10px] font-sans tracking-widest text-cream/60 uppercase hidden sm:inline-block">
              Scroll-Linked Expansion
            </span>
          </div>

          {/* Bottom Captions Choreography */}
          <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-12 right-6 sm:right-12 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="max-w-xl space-y-2">
              <span className="text-[11px] font-sans uppercase tracking-[0.24em] text-caramel-light block">
                The Interior Space · Ikeja GRA
              </span>
              <p className="font-serif text-xl sm:text-3xl text-porcelain font-light leading-snug">
                Designed to slow you down. Travertine counters, acoustic warmth, and tree-lined garden daylight.
              </p>
            </div>

            <Link
              href="/our-story"
              className="inline-flex items-center gap-2 bg-porcelain/15 hover:bg-porcelain/30 backdrop-blur-md border border-white/20 text-porcelain text-xs font-sans tracking-widest uppercase px-6 py-3 rounded-full transition-all duration-300 self-start sm:self-auto"
            >
              <span>Read The Story</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

