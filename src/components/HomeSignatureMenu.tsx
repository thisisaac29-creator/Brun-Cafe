"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import type { MenuItemRecord } from "@/data/menu-data";

type FeaturedFilter = "all" | "coffee-drinks" | "bakery-desserts" | "food-savoury";

interface FilterTab {
  key: FeaturedFilter;
  label: string;
}

const FILTER_TABS: FilterTab[] = [
  { key: "all", label: "All Signatures" },
  { key: "coffee-drinks", label: "Coffee & Drinks" },
  { key: "bakery-desserts", label: "Bakery & Desserts" },
  { key: "food-savoury", label: "Kitchen & Savoury" },
];

export function HomeSignatureMenu({ featuredItems }: { featuredItems: (MenuItemRecord & { displayPrice: string })[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeFilter, setActiveFilter] = useState<FeaturedFilter>("all");
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Shared single source of truth for the 6 designated featured items


  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return featuredItems;
    return featuredItems.filter((item) => item.macroGroup === activeFilter);
  }, [featuredItems, activeFilter]);

  // Editorial category labels for the card display
  const getDisplayCategory = (item: MenuItemRecord) => {
    switch (item.categoryId) {
      case "hot-drinks":
        return "Specialty Coffee";
      case "croissants":
        return "French Viennoiserie";
      case "tarts":
        return "Artisan Patisserie";
      case "brun-coolers":
        return "Signature Cooler";
      case "pasta":
        return "All-Day Kitchen";
      case "ice-cream":
        return "House Gelato";
      default:
        return item.categoryName;
    }
  };

  const getBakeNote = (item: MenuItemRecord) => {
    switch (item.categoryId) {
      case "croissants":
        return "07:45 Dawn Bake";
      case "tarts":
        return "11:30 Fresh Counter";
      case "hot-drinks":
        return "Pulled to Order";
      case "brun-coolers":
        return "Freshly Shaken";
      case "pasta":
        return "Cooked to Order";
      case "ice-cream":
        return "House-Churned";
      default:
        return "Fresh Daily";
    }
  };

  return (
    <section
      ref={containerRef}
      className="[content-visibility:auto] [contain-intrinsic-block-size:auto_3520px] md:[contain-intrinsic-block-size:auto_2043px] lg:[contain-intrinsic-block-size:auto_1422px] py-24 sm:py-32 bg-cream border-t border-taupe-border/50 overflow-hidden"
    >
      <div className="max-w-editorial mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[1px] bg-caramel" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.28em] uppercase font-sans text-caramel font-semibold">
                Printed Menu · 103 Offerings Across 18 Categories
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-espresso font-normal leading-tight">
              Signature Bakes &amp; Kitchen Specialties
            </h2>
            <p className="font-sans text-base sm:text-lg text-espresso/70 max-w-xl leading-relaxed">
              Dawn French butter laminations, hearth bakes, and single-origin coffee. Official prices transcribed directly from BRÜN&apos;s printed menu at 9 Sasegbon Street.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-xs tracking-[0.16em] uppercase font-sans font-semibold text-caramel hover:text-caramel-hover transition-colors self-start md:self-auto group"
          >
            <span>Explore Complete 103-Item Menu</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div
          className={`flex items-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-12 no-scrollbar transition-all duration-700 delay-150 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveFilter(tab.key)}
              className={`px-5 py-2 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-300 focus:outline-none whitespace-nowrap ${
                activeFilter === tab.key
                  ? "bg-espresso text-porcelain shadow-sm border border-espresso"
                  : "bg-porcelain text-espresso/70 hover:text-espresso border border-taupe-border/60 hover:border-caramel/40"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 6-Card Responsive Grid with Interactive Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, idx) => {
            const isHovered = hoveredItemId === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredItemId(item.id)}
                onMouseLeave={() => setHoveredItemId(null)}
                className={`group flex flex-col justify-between p-6 rounded-3xl bg-porcelain border border-taupe-border/60 hover:border-caramel/50 transition-all duration-500 luxury-hover shadow-sm ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{
                  transitionDelay: `${idx * 100}ms`,
                }}
              >
                <div>
                  {/* Photo Frame with Subtle Scale & Vignette */}
                  <div className="w-full h-56 rounded-2xl overflow-hidden relative mb-5 bg-cream-dark photo-frame">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-cream">
                        <Sparkles className="w-8 h-8 text-caramel/60 mb-2 stroke-[1.2]" />
                        <span className="font-serif text-lg text-espresso/80">{item.name}</span>
                        <span className="font-sans text-[10px] uppercase tracking-widest text-taupe mt-1">
                          Crafted to Order
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent pointer-events-none" />

                    {/* Preparation Note Pill */}
                    <span className="absolute top-3 left-3 bg-espresso/85 backdrop-blur-sm text-porcelain text-[9px] font-sans tracking-widest uppercase px-2.5 py-1 rounded-full border border-white/10">
                      {getBakeNote(item)}
                    </span>

                    {/* Price Pill */}
                    <span className="absolute bottom-3 right-3 bg-porcelain/95 backdrop-blur-md text-espresso brun-price text-xs font-medium px-3.5 py-1 rounded-full shadow-sm border border-taupe-border/50 group-hover:bg-caramel group-hover:text-porcelain transition-colors">
                      {item.displayPrice}
                    </span>
                  </div>

                  {/* Category & Title with Animated Line on Hover */}
                  <div className="relative">
                    <span className="brun-label text-caramel block mb-1">
                      {getDisplayCategory(item)}
                    </span>
                    <h3 className="font-serif text-2xl text-espresso font-normal transition-colors group-hover:text-caramel">
                      {item.name}
                    </h3>

                    {/* Animated Accent Line */}
                    <div className="mt-2 h-[1px] bg-taupe-border/40 w-full relative overflow-hidden">
                      <div
                        className={`absolute top-0 bottom-0 left-0 bg-caramel transition-all duration-500 ease-out ${
                          isHovered ? "w-full" : "w-0"
                        }`}
                      />
                    </div>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-espresso/70 leading-relaxed mt-3">
                    {item.description}
                  </p>
                </div>

                {/* Footer status */}
                <div className="pt-4 mt-6 border-t border-taupe-border/30 flex items-center justify-between text-[11px] font-sans">
                  <span className="inline-flex items-center gap-1.5 text-olive font-medium">
                    <Check className="w-3.5 h-3.5" />
                    Printed Menu Verified
                  </span>
                  <span className="text-taupe font-sans text-[10px] uppercase tracking-wider">
                    Excl. VAT
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA to Full Menu */}
        <div className="mt-12 text-center">
          <p className="font-sans text-xs text-espresso/80 mb-4">
            All 103 food and beverage selections are catalogued with exact prices in our digital menu monograph.
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-espresso text-porcelain font-sans text-xs tracking-[0.16em] uppercase hover:bg-caramel transition-colors shadow-sm"
          >
            <span>Explore All 18 Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
