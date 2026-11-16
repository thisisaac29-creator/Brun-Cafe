"use client";

import React, { useEffect, useState } from "react";

export function Preloader() {
  const [loading, setLoading] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setLoading(false);
      window.dispatchEvent(new CustomEvent("brun_loader_finished"));
      return;
    }

    // Check session storage so preloader only shows on initial visit
    let hasSeenLoader = false;
    try { hasSeenLoader = !!sessionStorage.getItem("brun_loader_seen"); } catch {}
    if (hasSeenLoader) {
      setLoading(false);
      window.dispatchEvent(new CustomEvent("brun_loader_finished"));
      return;
    }

    setLoading(true);

    const exitTimer = requestAnimationFrame(() => {
      setAnimatingOut(true);
      window.dispatchEvent(new CustomEvent("brun_loader_finished"));
    });

    const finishTimer = setTimeout(() => {
      setLoading(false);
      
      try { sessionStorage.setItem("brun_loader_seen", "true"); } catch {}
    }, 720);

    return () => {
      cancelAnimationFrame(exitTimer);
      clearTimeout(finishTimer);
      
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-espresso-dark text-porcelain select-none transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
        animatingOut
          ? "-translate-y-full opacity-90 pointer-events-none"
          : "translate-y-0 opacity-100 pointer-events-auto"
      }`}
      aria-hidden="true"
    >
      {/* Coffee-Ring Motif Expansion */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div
          className={`w-[280px] sm:w-[420px] h-[280px] sm:h-[420px] rounded-full border border-caramel/25 transition-transform duration-1000 ease-out ${
            animatingOut ? "scale-[2.2] opacity-0" : "scale-100 opacity-60 animate-pulse"
          }`}
        />
        <div
          className={`absolute w-[200px] sm:w-[320px] h-[200px] sm:h-[320px] rounded-full border border-taupe/20 transition-transform duration-1000 delay-100 ease-out ${
            animatingOut ? "scale-[1.8] opacity-0" : "scale-100 opacity-40"
          }`}
        />
      </div>

      {/* Center Brand Identity */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Tracked Location Label */}
        <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.35em] uppercase text-caramel-light mb-3 opacity-90 animate-fadeIn">
          Ikeja GRA · Lagos
        </span>

        {/* BRÜN Wordmark with authentic Umlaut */}
        <div className="overflow-hidden">
          <div
            className="brun-wordmark text-[clamp(3.5rem,12vw,8rem)] text-porcelain transition-transform duration-700"
          >
            BRÜN
          </div>
        </div>

        {/* Subline */}
        <div className="overflow-hidden mt-2">
          <span className="brun-brand-subline text-[clamp(0.75rem,2.4vw,1.5rem)] text-cream/70 block">
            Coffee Shop &amp; Bakery
          </span>
        </div>

        {/* Minimalist Coffee Crema Progress Line */}
        <div className="mt-8 w-24 sm:w-32 h-[1.5px] bg-white/10 rounded-full overflow-hidden relative">
          <div className="absolute top-0 bottom-0 left-0 bg-caramel w-full animate-[progress_1.4s_cubic-bezier(0.65,0,0.35,1)_forwards]" />
        </div>
      </div>
    </div>
  );
}

