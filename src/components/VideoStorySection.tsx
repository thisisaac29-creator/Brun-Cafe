"use client";

import { useNearbyPoster } from "./useNearbyPoster";
import { prefersManualPlayback } from "./mediaPreferences";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MEDIA_ASSETS } from "@/data/media-assets";
import { Volume2, VolumeX, Play, Pause, ArrowRight, Sparkles } from "lucide-react";

export function VideoStorySection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useNearbyPoster(videoRef);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [inView, setInView] = useState(false);

  // Intersection Observer to autoplay when visible and pause when offscreen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (!prefersManualPlayback() && videoRef.current?.paused) {
              videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {
                // Autoplay blocked without user interaction
              });
            }
          } else {
            setInView(false);
            if (videoRef.current && !videoRef.current.paused) {
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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

  return (
    <section
      ref={containerRef}
      className="[content-visibility:auto] [contain-intrinsic-block-size:auto_1301px] md:[contain-intrinsic-block-size:auto_1242px] lg:[contain-intrinsic-block-size:auto_676px] py-24 sm:py-32 bg-espresso text-porcelain relative overflow-hidden"
    >
      {/* Background Watermark */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.025] text-center w-full"
        aria-hidden="true"
      >
        <span className="brun-wordmark text-[24vw]">
          BRÜN
        </span>
      </div>

      <div className="max-w-editorial mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Portrait 9:16 Video Showcase (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[9/16] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 border-caramel/30 bg-espresso-dark group">
              
              {/* Actual 9:16 Video */}
              {!hasError ? (
                <video
                  ref={videoRef}
                  src={MEDIA_ASSETS.videoWalkthrough}
                  data-poster={MEDIA_ASSETS.videoPoster}
                  playsInline
                  muted={isMuted}
                  loop
                  preload="none"
                  className="w-full h-full object-cover"
                  onError={() => setHasError(true)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              ) : (
                <Image
                  src={MEDIA_ASSETS.videoPoster}
                  alt="BRÜN Coffee Shop & Bakery walkthrough"
                  fill
                  sizes="400px"
                  className="object-cover"
                />
              )}

              {/* Gradient Scrim for Controls */}
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-dark/80 via-transparent to-espresso-dark/30 pointer-events-none" />

              {/* Top Tag */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                <span className="inline-flex items-center gap-1.5 bg-espresso/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-sans tracking-widest uppercase text-porcelain border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-caramel animate-pulse" />
                  Live Walkthrough
                </span>
                <span className="text-[10px] font-sans tracking-widest text-cream/70 uppercase">
                  9:16 Portrait
                </span>
              </div>

              {/* Bottom Interactive Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
                {/* Play/Pause Button */}
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-3 rounded-full bg-porcelain/15 hover:bg-porcelain/30 backdrop-blur-md text-porcelain transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  )}
                </button>

                {/* Audio Toggle with Animated Equalizer */}
                <button
                  type="button"
                  onClick={toggleSound}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-porcelain/15 hover:bg-porcelain/30 backdrop-blur-md text-porcelain text-xs font-sans tracking-wider transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-4 h-4 text-cream/70" />
                      <span className="text-[10px] uppercase">Sound Off</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-caramel-light" />
                      <span className="text-[10px] uppercase text-caramel-light">Sound On</span>
                      {/* Equalizer Bars */}
                      <span className="flex items-center gap-0.5 h-3 ml-1">
                        <span className="w-0.5 h-2 bg-caramel-light animate-[pulse_0.6s_ease-in-out_infinite]" />
                        <span className="w-0.5 h-3 bg-caramel-light animate-[pulse_0.4s_ease-in-out_infinite_delay-100]" />
                        <span className="w-0.5 h-1.5 bg-caramel-light animate-[pulse_0.8s_ease-in-out_infinite_delay-200]" />
                      </span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Oversized Editorial Typography (7 cols) */}
          <div className="lg:col-span-7 space-y-6 lg:pl-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-caramel" />
              <span className="text-[11px] tracking-[0.28em] uppercase font-sans font-semibold text-caramel-light">
                The BRÜN Experience
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-porcelain font-normal leading-[1.08] tracking-tight">
              &ldquo;Good moments are made here.&rdquo;
            </h2>

            <p className="font-sans text-base sm:text-lg text-cream/80 max-w-xl font-normal leading-relaxed">
              From the first pour of rich espresso to the final bite of warm French viennoiserie, there&apos;s always a reason to stay a little longer.
            </p>

            <p className="font-sans text-base sm:text-lg text-cream/65 max-w-xl leading-relaxed">
              Experience the physical rhythm of our space: morning sunlight falling across natural ash wood tables, the aroma of laminated butter pastry, and unhurried conversations right in the heart of Ikeja GRA.
            </p>

            {/* Tactile Highlights Grid */}
            <div className="py-4 border-y border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-sans text-cream/80">
              <div>
                <span className="text-[10px] uppercase font-sans tracking-wider text-caramel-light block">Atmosphere</span>
                <span className="font-medium">European Calibre</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-sans tracking-wider text-caramel-light block">Baking</span>
                <span className="font-medium">Dawn In-House</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-sans tracking-wider text-caramel-light block">Family</span>
                <span className="font-medium">Kinderhome Soft Play</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/visit"
                className="inline-flex items-center justify-center gap-2.5 bg-[#905938] hover:bg-[#794b30] text-porcelain text-xs tracking-[0.18em] uppercase font-sans font-medium px-8 py-4 rounded-full transition-all duration-300 luxury-hover shadow-md"
              >
                <span>Plan Your Morning Visit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/gallery"
                className="inline-flex items-center justify-center gap-2 text-xs tracking-[0.16em] uppercase font-sans font-medium text-cream/80 hover:text-porcelain transition-colors py-3 px-4"
              >
                <span>View Photography Monograph</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

