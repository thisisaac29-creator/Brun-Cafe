"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const previousPath = useRef(pathname);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    if (!window.location.hash) document.getElementById("main-content")?.focus({ preventScroll: true });
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    setTransitioning(true);
    const timer = setTimeout(() => {
      setTransitioning(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* Espresso Curtain Overlay during route transition */}
      <div
        className={`fixed inset-0 z-50 bg-espresso-dark pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          transitioning ? "translate-y-0" : "-translate-y-full"
        }`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="brun-wordmark text-3xl text-cream opacity-80">
            BRÜN
          </span>
        </div>
      </div>

      {/* Main Page Content */}
      <div className={`transition-opacity duration-300 ${transitioning ? "opacity-40" : "opacity-100"}`}>
        {children}
      </div>
    </>
  );
}

