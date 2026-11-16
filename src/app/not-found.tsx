import React from "react";
import Link from "next/link";
import { ArrowLeft, Coffee } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-24 bg-cream text-espresso">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-porcelain border border-taupe-border/60 text-caramel shadow-sm">
          <Coffee className="w-6 h-6 stroke-[1.5]" />
        </div>
        <span className="block font-sans text-xs uppercase tracking-[0.24em] text-caramel">
          404 — Page Not Found
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-espresso font-light">
          This cup is empty.
        </h1>
        <p className="font-sans text-sm sm:text-base text-espresso/70 leading-relaxed">
          The page or confection you are looking for has been relocated or is resting in the hearth.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-espresso text-porcelain font-sans text-xs tracking-wider uppercase hover:bg-caramel transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Sanctuary</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

