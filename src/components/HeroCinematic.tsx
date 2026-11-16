"use client";

import { prefersManualPlayback } from "./mediaPreferences";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  Compass,
  Clock,
  ChevronDown,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Sparkles,
  MapPin,
} from "lucide-react";

interface VideoPerspective {
  id: string;
  label: string;
  num: string;
  title: string;
  src: string;
  poster: string;
  tag: string;
}

const PERSPECTIVES: VideoPerspective[] = [
  {
    id: "interior",
    label: "The Space & Light",
    num: "01",
    title: "Morning Light & Architecture",
    src: "/video/brun-hero-interior.mp4",
    poster: "/video/brun-hero-dining-poster.avif",
    tag: "Dining Room · Ikeja GRA",
  },
  {
    id: "ritual",
    label: "Coffee & Pastries",
    num: "02",
    title: "Viennoiserie & Espresso Ritual",
    src: "/video/brun-review-9-16.mp4",
    poster: "/video/brun-review-poster.webp",
    tag: "Tasting Bar · Daily Pours",
  },
  {
    id: "hearth",
    label: "The Bakery Hearth",
    num: "03",
    title: "Artisanal Baking & Dough Craft",
    src: "/video/brun-walkthrough-9-16.mp4",
    poster: "/video/brun-video-poster.webp",
    tag: "Dawn Bake · Fresh Loaves",
  },
];

export function HeroCinematic() {
  const containerRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // States
  const [activePerspective, setActivePerspective] = useState<VideoPerspective>(PERSPECTIVES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const [revealed, setRevealed] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Choreographed Loader-to-Hero Reveal
  useEffect(() => {
    let hasSeenLoader = false;
    try { hasSeenLoader = !!sessionStorage.getItem("brun_loader_seen"); } catch {}
    const prefersReducedMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const reveal = () => setRevealed(true);
    if (hasSeenLoader || prefersReducedMotion) {
      reveal();
      return;
    }
    window.addEventListener("brun_loader_finished", reveal, { once: true });
    const fallback = setTimeout(reveal, 720);
    return () => {
      clearTimeout(fallback);
      window.removeEventListener("brun_loader_finished", reveal);
    };
  }, []);
  // Passive Scroll Listener for "The Cinematic Exit"
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = Math.min(window.scrollY, 1200);
      const progress = Math.min(y / 800, 1);
      if (frameRef.current) {
        frameRef.current.style.transform = `scale(${1 - progress * 0.05}) translateZ(0)`;
        frameRef.current.style.borderRadius = `${progress * 36}px`;
        frameRef.current.style.opacity = String(1 - progress * 0.45);
      }
      if (copyRef.current) copyRef.current.style.transform = `translate3d(0, ${-y * 0.28}px, 0)`;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
      } else {
        window.removeEventListener("scroll", onScroll);
      }
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Video playback controls
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleSound = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Perspective switcher
  const switchPerspective = (p: VideoPerspective) => {
    if (p.id === activePerspective.id) return;
    setVideoLoaded(false);
    setIsPlaying(false);
    setActivePerspective(p);
  };

  // Give the critical poster the first network slot. Manual playback still works immediately.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersManualPlayback()) return;
    let cancelled = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause();
    });
    observer.observe(video);
    const poster = containerRef.current?.querySelector("img");
    const start = async () => {
      await poster?.decode().catch(() => {});
      if (cancelled || video.getBoundingClientRect().bottom <= 0) return;
      video.play().catch(() => {});
    };
    const frame = requestAnimationFrame(() => { void start(); });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [activePerspective]);
  return (
    <section
      ref={containerRef}
      className="relative w-full bg-cream overflow-hidden pt-4 sm:pt-6 pb-6 sm:pb-10 select-none"
      aria-label="BRÜN Cinematic Experience"
      data-hero
    >
      {/* Outer Editorial Frame Container */}
      <div className="max-w-[1520px] mx-auto px-3 sm:px-6 md:px-8">
        
        {/* THE CINEMATIC VIDEO CANVAS */}
        <div
          className={`relative min-h-[88vh] sm:min-h-[92vh] lg:min-h-[94vh] w-full overflow-hidden bg-espresso-dark shadow-2xl transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            revealed ? "scale-100 opacity-100" : "scale-[0.96] opacity-0"
          }`}
          ref={frameRef}
          style={{ opacity: 1 }}
        >
          {/* Layer 0: Instant Poster Fallback Image */}
          <div className="absolute inset-y-0 right-0 w-full lg:w-[46%] lg:max-w-[576px] z-0 bg-espresso-dark">
            <Image
              src={activePerspective.poster}
              alt="BRÜN Coffee Shop & Bakery - Warm light and interior"
              fill
              unoptimized
              fetchPriority="high"
              preload

              className={`object-cover lg:object-contain object-center transition-opacity duration-1000 ease-out ${
                videoLoaded ? "opacity-0" : "opacity-100 scale-100"
              }`}
            />
          </div>

          {/* Layer 1: Ambient Living Video Canvas */}
          <video
            ref={videoRef}
            key={activePerspective.id}
            poster={activePerspective.poster}
            aria-label={activePerspective.title}

            playsInline
            muted={isMuted}
            loop
            preload="none"
            onPlaying={() => { setVideoLoaded(true); setIsPlaying(true); }} onPause={() => setIsPlaying(false)} onError={() => { setVideoLoaded(false); setIsPlaying(false); }}
            className={`absolute inset-y-0 right-0 w-full lg:w-[46%] lg:max-w-[576px] h-full object-cover lg:object-contain object-center z-[1] ${videoLoaded ? "opacity-100" : "opacity-0"}`}
          >
            {activePerspective.id === "interior" && <source media="(max-width: 600px)" src="/video/brun-hero-interior-mobile.mp4" type="video/mp4" />}
            <source src={activePerspective.src} type="video/mp4" />
          </video>

          {/* Layer 2: Master Art-Directed Gradient Scrim */}
          {/* Mobile: Bottom-to-top gradient for rock-solid typography contrast */}
          {/* Desktop copy sits on solid espresso, leaving the portrait footage ungraded. */}
          <div className="absolute inset-0 z-[2] bg-gradient-to-t from-espresso-dark/90 via-espresso-dark/35 to-transparent lg:bg-none pointer-events-none" />

          {/* Layer 3: Top Architectural Bar */}
          <div className="absolute top-5 sm:top-8 left-5 sm:left-8 right-5 sm:right-8 z-20 flex items-center justify-between text-porcelain">
            
            {/* Archival Coordinates & Location */}
            <div
              className={`flex items-center gap-2.5 sm:gap-3 transition-all duration-700 delay-[350ms] ${
                revealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              }`}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-porcelain/15 backdrop-blur-md border border-white/15 text-[10px] sm:text-[11px] font-sans tracking-widest uppercase">
                <MapPin className="w-3 h-3 text-caramel-light" />
                <span>Ikeja GRA · 09 Sasegbon</span>
              </div>
              <span className="hidden md:inline-block text-[10px] font-sans tracking-[0.2em] text-cream/70 uppercase">
                6°35&apos;56&quot;N 3°21&apos;04&quot;E
              </span>
            </div>

            {/* Live Status Pill & Perspective Counter */}
            <div
              className={`flex items-center gap-2.5 sm:gap-3 transition-all duration-700 delay-[450ms] ${
                revealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              }`}
            >
              <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-espresso/70 backdrop-blur-md border border-white/10 text-[10px] font-sans tracking-widest text-cream/90 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse" />
                <span>Open Seven Days · 8AM – 9PM</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-porcelain/15 backdrop-blur-md border border-white/15 text-[10px] font-sans tracking-widest uppercase text-caramel-light">
                <Sparkles className="w-3 h-3 text-caramel-light" />
                <span className="hidden xs:inline">Perspective</span>
                <span>{activePerspective.num}/03</span>
              </div>
            </div>
          </div>

          {/* Layer 4: Main Editorial Typographic Composition */}
          <div
            className="relative z-10 min-h-[88vh] sm:min-h-[92vh] lg:min-h-[94vh] flex flex-col justify-end lg:justify-center px-5 sm:px-10 lg:px-16 pt-24 pb-20 sm:pb-24 lg:py-0"
            ref={copyRef}
          >
            <div className="max-w-2xl lg:max-w-[55%] space-y-5 sm:space-y-7">
              
              {/* Category Ribbon Monogram */}
              <div
                className={`overflow-hidden transition-all duration-700 delay-[250ms] ${
                  revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div className="inline-flex items-center gap-2.5 text-[10px] sm:text-xs font-sans tracking-[0.32em] uppercase text-caramel-light">
                  <span className="w-2 h-0.5 bg-caramel-light inline-block" />
                  <span>Artisanal Bakery · Specialty Coffee · Brunch</span>
                </div>
              </div>

              {/* Master Display Headline */}
              <div className="space-y-1 sm:space-y-2">
                <div className="overflow-hidden">
                  <h1
                    className={`font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[clamp(3.25rem,5.4vw,5rem)] text-porcelain font-light leading-[0.94] tracking-tight transition-transform duration-1000 delay-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      revealed ? "translate-y-0" : "translate-y-full"
                    }`}
                  >
                    Coffee first.
                  </h1>
                </div>

                <div className="overflow-hidden">
                  <span
                    className={`font-serif italic font-normal text-5xl sm:text-7xl md:text-8xl lg:text-[clamp(3.25rem,5.4vw,5rem)] text-cream-light/95 leading-[0.94] tracking-tight block transition-transform duration-1000 delay-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      revealed ? "translate-y-0" : "translate-y-full"
                    }`}
                  >
                    Stay a little longer.
                  </span>
                </div>
              </div>

              {/* Editorial Supporting Prose */}
              <p
                className={`font-sans text-base sm:text-lg md:text-lg text-cream/85 max-w-xl font-normal leading-relaxed transition-all duration-1000 delay-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                Freshly baked French butter viennoiserie, meticulous single-origin espresso pulls, and a sunlit sanctuary on Sasegbon Street. Welcome to BRÜN.
              </p>

              {/* Tactile Action Buttons */}
              <div
                className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2 transition-all duration-1000 delay-[1050ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <Link prefetch={false}
                  href="/menu"
                  className="inline-flex items-center justify-center gap-3 bg-[#905938] hover:bg-[#794b30] text-porcelain text-xs sm:text-[12px] tracking-[0.2em] uppercase font-sans font-medium px-8 py-4 rounded-full transition-all duration-300 luxury-hover shadow-lg group border border-caramel/40"
                >
                  <span>Explore the Menu</span>
                  <ArrowRight className="w-4 h-4 text-porcelain transform group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link prefetch={false}
                  href="/visit"
                  className="inline-flex items-center justify-center gap-2.5 bg-porcelain/15 hover:bg-porcelain/25 text-porcelain border border-white/25 backdrop-blur-md text-xs sm:text-[12px] tracking-[0.18em] uppercase font-sans font-medium px-7 py-4 rounded-full transition-all duration-300 luxury-hover"
                >
                  <Compass className="w-4 h-4 text-caramel-light" />
                  <span>Plan Your Visit</span>
                </Link>
              </div>

              {/* Supporting Highlights Ribbon */}
              <div
                className={`pt-5 border-t border-white/15 flex flex-wrap items-center gap-y-2.5 gap-x-6 text-xs font-sans text-cream/75 transition-all duration-1000 delay-[1650ms] ${
                  revealed ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-caramel-light" />
                  <span>Fresh Bakes from 7:45 AM</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-olive" />
                  <span>Free Gated Compound Parking</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-caramel-light" />
                  <span>Kinderhome Soft Play (Ages 2+)</span>
                </div>
              </div>

            </div>
          </div>

          {/* Layer 5: Interactive Perspective Switcher & Video Controls Bar */}
          <div className="absolute bottom-5 sm:bottom-8 left-5 sm:left-8 right-5 sm:right-8 z-20 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Perspective Switcher Tabs */}
            <div
              className={`flex items-center gap-2 overflow-x-auto max-w-full no-scrollbar transition-all duration-700 delay-[850ms] ${
                revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <span className="text-[10px] font-sans tracking-widest uppercase text-cream/50 mr-1 hidden lg:inline-block">
                View:
              </span>
              {PERSPECTIVES.map((p) => {
                const isActive = p.id === activePerspective.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => switchPerspective(p)}
                    className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-[11px] font-sans tracking-[0.14em] uppercase font-medium whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 backdrop-blur-md ${
                      isActive
                        ? "bg-porcelain text-espresso shadow-md scale-[1.02]"
                        : "bg-espresso-dark/60 text-cream/70 hover:text-porcelain hover:bg-espresso-dark/80 border border-white/10"
                    }`}
                  >
                    <span className={`text-[9px] font-sans ${isActive ? "text-[#905938]" : "text-cream/80"}`}>
                      {p.num}
                    </span>
                    <span>{p.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Play/Pause & Sound Equalizer Controls */}
            <div
              className={`flex items-center gap-2 sm:gap-2.5 transition-all duration-700 delay-[950ms] ${
                revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {/* Play/Pause Toggle */}
              <button
                type="button"
                onClick={togglePlay}
                className="p-2.5 sm:p-3 rounded-full bg-porcelain/15 hover:bg-porcelain/30 backdrop-blur-md text-porcelain border border-white/20 transition-all hover:scale-105 active:scale-95"
                aria-label={isPlaying ? "Pause cinematic footage" : "Play cinematic footage"}
                title={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
              </button>

              {/* Sound Toggle with Dynamic Equalizer */}
              <button
                type="button"
                disabled={activePerspective.id === "interior"}
                onClick={toggleSound}
                className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-porcelain/15 hover:bg-porcelain/30 backdrop-blur-md text-porcelain border border-white/20 text-[10px] sm:text-[11px] font-sans tracking-wider transition-all hover:scale-105 active:scale-95"
                aria-label={activePerspective.id === "interior" ? "Silent footage" : isMuted ? "Unmute atmospheric sound" : "Mute atmospheric sound"}
              >
                {isMuted || activePerspective.id === "interior" ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-cream/70" />
                    <span className="text-cream/80">{activePerspective.id === "interior" ? "Silent footage" : "Ambient Sound: Off"}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-caramel-light" />
                    <span className="text-caramel-light font-medium">Ambient Sound: On</span>
                    <span className="flex items-center gap-0.5 h-3 ml-0.5">
                      <span className="w-0.5 h-2.5 bg-caramel-light animate-pulse" />
                      <span className="w-0.5 h-3.5 bg-caramel-light animate-pulse delay-100" />
                      <span className="w-0.5 h-2 bg-caramel-light animate-pulse delay-200" />
                    </span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Discrete Scroll Discovery Cue */}
      <div
        className={`mt-4 sm:mt-6 flex justify-center transition-opacity duration-1000 delay-[1650ms] ${
          revealed ? "opacity-100" : "opacity-0"
        }`}
      >
        <a
          href="#story"
          className="inline-flex flex-col items-center gap-1 text-taupe-dark hover:text-espresso transition-colors text-[10px] font-sans tracking-[0.28em] uppercase group"
          aria-label="Scroll to discover BRÜN story"
        >
          <span className="group-hover:text-espresso transition-colors">Step Into The Ritual</span>
          <ChevronDown className="w-4 h-4 text-caramel animate-bounce" />
        </a>
      </div>
    </section>
  );
}
