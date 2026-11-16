import React from "react";
import Link from "next/link";

interface WordmarkProps {
  variant?: "dark" | "light" | "cream";
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  withSubline?: boolean;
  className?: string;
  asLink?: boolean;
}

export function Wordmark({
  variant = "dark",
  size = "md",
  withSubline = true,
  className = "",
  asLink = false,
}: WordmarkProps) {
  const textColor = {
    dark: "text-espresso",
    light: "text-porcelain",
    cream: "text-cream-light",
  }[variant];

  const sublineColor = {
    dark: "text-taupe-dark",
    light: "text-cream/70",
    cream: "text-taupe-light",
  }[variant];

  const sizeClasses = {
    sm: "text-[32px]",
    md: "text-[40px]",
    lg: "text-[clamp(2.5rem,5vw,3.5rem)]",
    xl: "text-[clamp(3rem,8vw,5rem)]",
    hero: "text-[clamp(3.5rem,12vw,8rem)]",
  }[size];

  const sublineSizeClasses = {
    sm: "text-[8px]",
    md: "text-[10px]",
    lg: "text-[clamp(0.625rem,1.25vw,0.875rem)]",
    xl: "text-[clamp(0.75rem,2vw,1.25rem)]",
    hero: "text-[clamp(0.75rem,2.4vw,1.5rem)]",
  }[size];

  const content = (
    <div className={`inline-flex flex-col items-center justify-center text-center select-none group ${className}`}>
      <span
        className={`brun-wordmark transition-colors duration-300 ${sizeClasses} ${textColor}`}
      >
        BRÜN
      </span>
      {withSubline && (
        <span
          className={`brun-brand-subline mt-1 transition-colors duration-300 ${sublineSizeClasses} ${sublineColor}`}
        >
          COFFEE SHOP &amp; BAKERY
        </span>
      )}
    </div>
  );

  if (asLink) {
    return (
      <Link prefetch={false} href="/" aria-label="BRÜN Coffee Shop & Bakery - Return to Home" className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel rounded">
        {content}
      </Link>
    );
  }

  return content;
}

