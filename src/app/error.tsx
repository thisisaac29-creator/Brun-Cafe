"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, ArrowLeft } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("BRÜN application error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-24 bg-cream text-espresso">
      <div className="max-w-md w-full text-center space-y-6">
        <span className="block font-sans text-xs uppercase tracking-[0.24em] text-caramel">
          Notice — Fresh Pour Required
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-espresso font-light">
          A momentary pause.
        </h1>
        <p className="font-sans text-sm sm:text-base text-espresso/70 leading-relaxed">
          An unexpected interruption occurred while brewing this view. You can reload the page or return to the main parlour.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-espresso text-porcelain font-sans text-xs tracking-wider uppercase hover:bg-caramel transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-porcelain border border-taupe-border text-espresso font-sans text-xs tracking-wider uppercase hover:bg-taupe-light transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

