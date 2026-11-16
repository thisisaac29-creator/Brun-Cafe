"use client";

import React, { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MASTER_MENU_ITEMS,
  MENU_CATEGORIES,
  MENU_MACRO_GROUPS,
  MenuMacroGroup,
  MenuCategoryId,
  MenuItemRecord,
  formatNaira,
} from "@/data/menu-data";
import {
  Search,
  LayoutGrid,
  List,
  Sparkles,
  Info,
  Clock,
  ArrowRight,
  X,
  ChevronRight,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

export function MenuSection() {
  const [activeMacro, setActiveMacro] = useState<MenuMacroGroup>("all");
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "card">("list");
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Available categories based on active macro group
  const availableCategories = useMemo(() => {
    if (activeMacro === "all") return MENU_CATEGORIES;
    return MENU_CATEGORIES.filter((c) => c.macroGroup === activeMacro);
  }, [activeMacro]);

  // Handle macro switch
  const handleMacroChange = (macro: MenuMacroGroup) => {
    setActiveMacro(macro);
    setActiveCategory("all");
  };

  // Filtered menu items
  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return MASTER_MENU_ITEMS.filter((item) => {
      // Macro filter
      if (activeMacro !== "all" && item.macroGroup !== activeMacro) {
        return false;
      }

      // Sub-category filter
      if (activeCategory !== "all" && item.categoryId !== activeCategory) {
        return false;
      }

      // Search query
      if (!query) return true;

      const inName = item.name.toLowerCase().includes(query);
      const inCategory = item.categoryName.toLowerCase().includes(query);
      const inDescription = item.description?.toLowerCase().includes(query) ?? false;
      const inDietary = item.dietary?.some((d) => d.toLowerCase().includes(query)) ?? false;

      return inName || inCategory || inDescription || inDietary;
    });
  }, [activeMacro, activeCategory, searchQuery]);

  // Group filtered items by category for the structured editorial view
  const groupedByCategory = useMemo(() => {
    const groups: {
      category: (typeof MENU_CATEGORIES)[number];
      items: MenuItemRecord[];
    }[] = [];

    availableCategories.forEach((cat) => {
      const itemsInCat = filteredItems.filter((item) => item.categoryId === cat.id);
      if (itemsInCat.length > 0) {
        groups.push({
          category: cat,
          items: itemsInCat,
        });
      }
    });

    return groups;
  }, [availableCategories, filteredItems]);

  const clearAllFilters = () => {
    setActiveMacro("all");
    setActiveCategory("all");
    setSearchQuery("");
  };

  return (
    <div className="w-full">
      {/* ─────────────────────────────────────────────────────────────
          1. STATUTORY VAT & PRICING TRANSPARENCY NOTICE
          ───────────────────────────────────────────────────────────── */}
      <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-porcelain border border-taupe-border/70 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center flex-shrink-0 border border-taupe-border/60 text-caramel">
              <Info className="w-4 h-4 stroke-[1.8]" />
            </div>
            <div>
              <p className="font-sans text-xs sm:text-sm text-espresso font-medium leading-relaxed">
                <span className="font-semibold text-caramel uppercase tracking-wider text-[11px] block sm:inline sm:mr-2">
                  Pricing Transparency Notice:
                </span>
                All listed prices exclude VAT. Prices and availability may change.
              </p>
              <p className="font-sans text-[11px] text-espresso/65 mt-1 leading-normal">
                Transcribed directly from BRÜN&apos;s printed menu photographs (9 Sasegbon Street, Ikeja GRA). All orders are subject to 7.5% Nigerian VAT.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-taupe-border/40 text-[11px] font-sans text-taupe-dark">
            <span className="inline-block w-2 h-2 rounded-full bg-olive animate-pulse" />
            <span>103 Verified Menu Entries</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. MACRO-GROUP NAVIGATION (PRIMARY TABS)
          ───────────────────────────────────────────────────────────── */}
      <div className="border-b border-taupe-border/60 pb-6 mb-8">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {MENU_MACRO_GROUPS.map((macro) => {
            const isActive = activeMacro === macro.key;
            return (
              <button
                key={macro.key}
                type="button"
                onClick={() => handleMacroChange(macro.key)}
                className={`relative px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs font-sans tracking-[0.14em] uppercase transition-all duration-300 flex items-center gap-2.5 font-medium ${
                  isActive
                    ? "bg-espresso text-porcelain shadow-md"
                    : "bg-porcelain text-espresso/70 hover:text-espresso hover:bg-cream-dark border border-taupe-border/60"
                }`}
              >
                <span>{macro.label}</span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    isActive ? "bg-white/20 text-porcelain" : "bg-cream text-taupe-dark"
                  }`}
                >
                  {macro.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Macro Group Description */}
        <p className="font-sans text-xs text-espresso/60 mt-3 italic pl-1">
          {MENU_MACRO_GROUPS.find((m) => m.key === activeMacro)?.description}
        </p>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. SUB-CATEGORY PILLS & SEARCH / VIEW CONTROLS
          ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-taupe-border/40 mb-10">
        {/* Horizontal Category Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
          {/* "All" button within current macro group */}
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-sans tracking-wider uppercase whitespace-nowrap transition-all ${
              activeCategory === "all"
                ? "bg-caramel text-porcelain font-medium"
                : "bg-porcelain text-espresso/70 hover:text-espresso border border-taupe-border/50"
            }`}
          >
            All Categories ({availableCategories.length})
          </button>

          {availableCategories.map((cat) => {
            const isCatActive = activeCategory === cat.id;
            const itemCount = MASTER_MENU_ITEMS.filter((i) => i.categoryId === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-sans tracking-wider uppercase whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isCatActive
                    ? "bg-caramel text-porcelain font-medium"
                    : "bg-porcelain text-espresso/70 hover:text-espresso border border-taupe-border/50"
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[9px] ${isCatActive ? "text-porcelain/80" : "text-taupe"}`}>
                  ({itemCount})
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & View Switcher */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          {/* Quick Search Input */}
          <div className="relative flex-1 lg:w-72">
            <Search className="w-3.5 h-3.5 text-taupe absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              aria-label="Search the menu"
              placeholder="Search dishes, drinks, or bakes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-porcelain border border-taupe-border/60 rounded-full text-xs font-sans text-espresso placeholder:text-taupe/80 focus:outline-none focus:border-caramel transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-taupe hover:text-espresso p-0.5"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* View Toggle */}
          <div className="flex items-center p-1 rounded-full bg-porcelain border border-taupe-border/60 flex-shrink-0">
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-full transition-colors ${
                viewMode === "list"
                  ? "bg-espresso text-porcelain shadow-xs"
                  : "text-taupe hover:text-espresso"
              }`}
              title="Editorial Monograph (Brasserie List)"
              aria-label="Editorial Monograph"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("card")}
              className={`p-1.5 rounded-full transition-colors ${
                viewMode === "card"
                  ? "bg-espresso text-porcelain shadow-xs"
                  : "text-taupe hover:text-espresso"
              }`}
              title="Visual Showcase (Grid)"
              aria-label="Visual Showcase"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. ACTIVE FILTER STATE BADGES (IF SEARCHING OR FILTERING)
          ───────────────────────────────────────────────────────────── */}
      {(searchQuery || activeCategory !== "all" || activeMacro !== "all") && (
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 px-4 py-2.5 rounded-xl bg-cream border border-taupe-border/50 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-taupe-dark">Filtered by:</span>
            {activeMacro !== "all" && (
              <span className="px-2.5 py-0.5 rounded-full bg-porcelain border border-taupe-border text-espresso font-medium text-[11px]">
                {MENU_MACRO_GROUPS.find((m) => m.key === activeMacro)?.label}
              </span>
            )}
            {activeCategory !== "all" && (
              <span className="px-2.5 py-0.5 rounded-full bg-porcelain border border-taupe-border text-espresso font-medium text-[11px]">
                {MENU_CATEGORIES.find((c) => c.id === activeCategory)?.name}
              </span>
            )}
            {searchQuery && (
              <span className="px-2.5 py-0.5 rounded-full bg-porcelain border border-taupe-border text-espresso font-medium text-[11px]">
                &ldquo;{searchQuery}&rdquo;
              </span>
            )}
            <span className="text-caramel font-medium ml-1">
              ({filteredItems.length} {filteredItems.length === 1 ? "item" : "items"} found)
            </span>
          </div>

          <button
            type="button"
            onClick={clearAllFilters}
            className="text-[11px] font-sans uppercase tracking-wider text-caramel hover:text-caramel-hover underline"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5A. VIEW MODE: EDITORIAL MONOGRAPH (PARISIAN BRASSERIE STYLE)
          ───────────────────────────────────────────────────────────── */}
      {viewMode === "list" && (
        <div className="space-y-16">
          {groupedByCategory.map(({ category, items }) => (
            <section
              key={category.id}
              id={`cat-${category.id}`}
              className="scroll-mt-32 p-6 sm:p-10 md:p-12 rounded-3xl bg-porcelain border border-taupe-border/60 shadow-xs"
            >
              {/* Category Header */}
              <div className="border-b border-taupe-border/50 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded bg-cream text-caramel border border-taupe-border/40 font-semibold">
                      Category {String(category.order).padStart(2, "0")} · {items.length} {items.length === 1 ? "Item" : "Items"}
                    </span>
                    {category.frenchSubtitle && (
                      <span className="font-serif italic text-xs text-taupe hidden sm:inline">
                        — {category.frenchSubtitle}
                      </span>
                    )}
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-normal">
                    {category.name}
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-espresso/70 mt-1 max-w-2xl leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <span className="text-[10px] uppercase font-sans tracking-widest text-taupe-dark">
                  Excl. VAT
                </span>
              </div>

              {/* Items List with Dot Leaders */}
              <div className="divide-y divide-taupe-border/30">
                {items.map((item) => (
                  <article
                    key={item.id}
                    className="py-4 sm:py-5 group transition-colors hover:bg-cream/40 -mx-3 sm:-mx-6 px-3 sm:px-6 rounded-xl"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                      {/* Left: Item Name & Badges */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline flex-wrap gap-x-2">
                          <h3 className="font-serif text-lg sm:text-xl text-espresso font-normal group-hover:text-caramel transition-colors">
                            {item.name}
                          </h3>

                          {/* Signature Badge */}
                          {item.isSignature && (
                            <span className="inline-flex items-center gap-1 text-[9px] tracking-wider uppercase font-sans text-caramel bg-cream px-2 py-0.5 rounded-full border border-caramel/30">
                              <Sparkles className="w-2.5 h-2.5" />
                              BRÜN Signature
                            </span>
                          )}

                          {/* Dietary Badges */}
                          {item.dietary?.map((diet) => (
                            <span
                              key={diet}
                              className="text-[9px] font-sans uppercase tracking-wider text-taupe-dark bg-cream-dark px-1.5 py-0.5 rounded"
                            >
                              {diet}
                            </span>
                          ))}
                        </div>

                        {/* Description */}
                        {item.description && (
                          <p className="font-sans text-xs sm:text-[13px] text-espresso/65 leading-relaxed mt-1 max-w-2xl">
                            {item.description}
                          </p>
                        )}
                      </div>

                      {/* Right: Dot Leader Line & Price */}
                      <div className="flex items-baseline flex-shrink-0 self-end sm:self-auto sm:ml-4">
                        <div className="hidden md:block w-16 lg:w-24 brasserie-leader mr-3" />
                        {item.priceConfirmed && item.priceNgn !== null ? (
                          <span className="brun-price text-base sm:text-lg font-normal text-espresso text-right">
                            {formatNaira(item.priceNgn)}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] tracking-wider uppercase font-sans text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                            <HelpCircle className="w-3 h-3 text-amber-700" />
                            {item.priceNote || "Price Pending Confirmation"}
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5B. VIEW MODE: VISUAL SHOWCASE (CARD VIEW)
          ───────────────────────────────────────────────────────────── */}
      {viewMode === "card" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col justify-between p-5 rounded-2xl bg-porcelain border border-taupe-border/60 hover:border-caramel/40 transition-all duration-300 luxury-hover shadow-xs"
            >
              <div>
                {/* Photo or Minimalist Brand Frame */}
                {item.image ? (
                  <div className="w-full h-48 rounded-xl overflow-hidden relative mb-4 bg-cream-dark photo-frame">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent pointer-events-none" />

                    {item.isSignature && (
                      <span className="absolute top-2 left-2 bg-espresso/90 backdrop-blur-sm text-porcelain text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-full flex items-center gap-1 font-sans">
                        <Sparkles className="w-2.5 h-2.5 text-caramel-light" />
                        Signature
                      </span>
                    )}

                    <span className="absolute bottom-2.5 right-2.5 bg-porcelain/95 backdrop-blur-md text-espresso brun-price text-xs font-medium px-3 py-1 rounded-full shadow-sm border border-taupe-border/50">
                      {item.priceConfirmed ? formatNaira(item.priceNgn) : "Rate Pending"}
                    </span>
                  </div>
                ) : (
                  <div className="w-full h-28 rounded-xl mb-4 bg-cream/70 border border-taupe-border/40 p-4 flex flex-col justify-between relative">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-taupe-dark">
                        {item.categoryName}
                      </span>
                      {item.isSignature && (
                        <span className="inline-flex items-center gap-1 text-[9px] tracking-wider uppercase font-sans text-caramel">
                          <Sparkles className="w-2.5 h-2.5" />
                          Signature
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      {item.priceConfirmed && item.priceNgn !== null ? (
                        <span className="brun-price text-base font-normal text-espresso">
                          {formatNaira(item.priceNgn)}
                        </span>
                      ) : (
                        <span className="text-[10px] tracking-wider uppercase font-sans text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          Pending Confirmation
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Content */}
                <div>
                  <span className="brun-label text-caramel text-[9px] block mb-0.5">
                    {item.categoryName}
                  </span>
                  <h3 className="font-serif text-xl text-espresso font-normal group-hover:text-caramel transition-colors">
                    {item.name}
                  </h3>
                  {item.description && (
                    <p className="font-sans text-xs text-espresso/70 leading-relaxed mt-2 line-clamp-3">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 mt-4 border-t border-taupe-border/30 flex items-center justify-between text-[10px] font-sans text-taupe-dark">
                {item.dietary && item.dietary.length > 0 ? (
                  <span className="text-espresso/75">{item.dietary.join(" · ")}</span>
                ) : (
                  <span>Crafted fresh</span>
                )}
                <span>Excl. VAT</span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          6. EMPTY STATE
          ───────────────────────────────────────────────────────────── */}
      {filteredItems.length === 0 && (
        <div className="text-center py-20 px-6 bg-porcelain rounded-3xl border border-taupe-border/60 my-8">
          <div className="w-12 h-12 rounded-full bg-cream mx-auto flex items-center justify-center text-caramel mb-4 border border-taupe-border/60">
            <Search className="w-5 h-5 stroke-[1.5]" />
          </div>
          <h3 className="font-serif text-2xl text-espresso font-light">No items match your filter</h3>
          <p className="font-sans text-xs sm:text-sm text-espresso/60 max-w-md mx-auto mt-2 leading-relaxed">
            We couldn&apos;t find any item matching &ldquo;{searchQuery}&rdquo; within the current category. Try adjusting your query or reset all filters.
          </p>
          <button
            type="button"
            onClick={clearAllFilters}
            className="mt-6 px-6 py-2.5 rounded-full bg-espresso text-porcelain text-xs font-sans uppercase tracking-wider hover:bg-caramel transition-colors"
          >
            Reset Filters &amp; View All 103 Items
          </button>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          7. BOTTOM QUICK JUMP MENU (18 CATEGORIES)
          ───────────────────────────────────────────────────────────── */}
      <div className="mt-20 pt-10 border-t border-taupe-border/60">
        <h4 className="font-sans text-xs uppercase tracking-[0.24em] text-caramel font-semibold mb-4 text-center sm:text-left">
          Jump to Any Category ({MENU_CATEGORIES.length})
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 text-xs">
          {MENU_CATEGORIES.map((cat) => {
            const count = MASTER_MENU_ITEMS.filter((i) => i.categoryId === cat.id).length;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveMacro(cat.macroGroup);
                  setActiveCategory(cat.id);
                  if (viewMode === "list") {
                    const el = document.getElementById(`cat-${cat.id}`);
                    el?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="p-3 rounded-xl bg-porcelain border border-taupe-border/50 text-left hover:border-caramel/50 hover:bg-cream transition-colors group"
              >
                <span className="font-mono text-[9px] text-taupe block">
                  #{String(cat.order).padStart(2, "0")}
                </span>
                <span className="font-serif text-sm text-espresso group-hover:text-caramel transition-colors block mt-0.5 truncate">
                  {cat.name}
                </span>
                <span className="text-[10px] text-taupe-dark font-sans block mt-0.5">
                  {count} {count === 1 ? "item" : "items"}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
