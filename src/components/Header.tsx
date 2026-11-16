"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "./Wordmark";
import { SITE_CONFIG } from "@/data/site-config";
import { Menu, X, ArrowUpRight, MapPin, Phone, Clock, Instagram } from "lucide-react";
import { TikTokIcon } from "@/components/icons/TikTokIcon";

const NAV_LINKS = [
  { name: "Home", href: "/", num: "01" },
  { name: "Menu", href: "/menu", num: "02" },
  { name: "Our Story", href: "/our-story", num: "03" },
  { name: "Kinderhome", href: "/kinderhome", num: "04" },
  { name: "Gallery", href: "/gallery", num: "05" },
  { name: "Visit & Contact", href: "/visit", num: "06" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      drawerRef.current?.showModal();
      const desktop = window.matchMedia("(min-width: 1024px)");
      const closeOnDesktop = () => { if (desktop.matches) setMobileMenuOpen(false); };
      desktop.addEventListener("change", closeOnDesktop);
      document.body.style.overflow = "hidden";
      return () => {
        desktop.removeEventListener("change", closeOnDesktop);
        document.body.style.overflow = "";
      };
    } else {
      drawerRef.current?.close();
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Top Ambient Status Ribbon */}
      <div className="bg-espresso text-porcelain/90 text-[10px] sm:text-[11px] font-sans tracking-[0.08em] sm:tracking-[0.16em] uppercase py-2 px-4 border-b border-white/5 relative z-50">
        <div className="max-w-editorial mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-caramel animate-pulse" />
            <span>Open Today · 8:00 AM – 9:00 PM</span>
          </div>
          <div className="hidden lg:flex items-center gap-6 text-cream/70">
            <span>9 Sasegbon St, Ikeja GRA</span>
            <span>·</span>
            <span className="text-caramel-light font-medium">Free Gated Parking</span>
          </div>
          <div className="flex items-center gap-3 whitespace-nowrap">
            <a
              href={SITE_CONFIG.phoneHref}
              className="hover:text-caramel-light transition-colors flex items-center gap-1"
            >
              <Phone className="w-2.5 h-2.5 text-caramel-light" />
              <span>{SITE_CONFIG.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Editorial Header */}
      <header
        className={`fixed top-[31px] sm:top-[33px] left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "!top-0 bg-cream/95 backdrop-blur-md shadow-[0_4px_30px_rgba(52,37,31,0.05)] py-3 sm:py-3.5 border-b border-taupe-border/50"
            : "bg-transparent py-4 sm:py-6"
        }`}
      >
        <div className="max-w-editorial mx-auto px-5 sm:px-8 md:px-12 flex items-center justify-between">
          {/* Brand Wordmark */}
          <div className="flex-shrink-0">
            <Wordmark size="sm" withSubline={true} asLink={true} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-7" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link prefetch={false}
                  key={link.name}
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={`text-[13px] tracking-[0.10em] uppercase whitespace-nowrap font-sans font-medium transition-all duration-300 relative py-1.5 group flex items-center gap-1.5 ${
                    isActive
                      ? "text-espresso font-semibold"
                      : "text-espresso/70 hover:text-espresso"
                  }`}
                >
                  <span className="text-[9px] font-sans text-taupe/80 group-hover:text-caramel transition-colors">
                    {link.num}
                  </span>
                  <span>{link.name}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[1px] bg-caramel transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link prefetch={false}
              href="/visit"
              className="inline-flex items-center gap-2 bg-espresso text-porcelain text-xs tracking-[0.12em] uppercase whitespace-nowrap font-sans font-medium px-5 py-2.5 rounded-full hover:bg-espresso-dark transition-all duration-300 luxury-hover shadow-sm border border-transparent hover:border-caramel/40"
            >
              <MapPin className="w-3.5 h-3.5 text-caramel-light" />
              <span>Find Us</span>
              <ArrowUpRight className="w-3 h-3 text-cream/60" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 lg:hidden">
            <Link prefetch={false}
              href="/visit"
              className="inline-flex items-center gap-1 text-[10px] tracking-[0.14em] uppercase font-medium bg-espresso text-porcelain px-3 py-1.5 rounded-full"
            >
              <MapPin className="w-3 h-3 text-caramel-light" />
              <span>Find</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-espresso hover:text-caramel focus:outline-none focus-visible:ring-1 focus-visible:ring-caramel rounded transition-colors"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-espresso/70 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer Menu */}
      <dialog ref={drawerRef} onCancel={() => setMobileMenuOpen(false)}
        className={`fixed m-0 ml-auto h-dvh max-h-none text-espresso top-0 right-0 bottom-0 z-50 w-full max-w-md bg-cream p-6 sm:p-8 flex flex-col justify-between shadow-2xl lg:hidden transform transition-transform duration-500 ease-out border-l border-taupe-border/40 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full invisible"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div>
          {/* Header inside drawer */}
          <div className="flex items-center justify-between pb-6 border-b border-taupe-border/50">
            <Wordmark size="sm" withSubline={true} />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-espresso hover:text-caramel rounded-md focus:outline-none"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-3 pt-8" aria-label="Mobile Navigation Links">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link prefetch={false}
                  key={link.name}
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={`text-2xl sm:text-3xl font-sans font-medium tracking-[0.02em] py-2 transition-colors flex items-center justify-between border-b border-taupe-border/20 ${
                    isActive
                      ? "text-caramel font-medium pl-2"
                      : "text-espresso hover:text-caramel hover:pl-2"
                  }`}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-sans text-xs text-taupe tracking-widest">{link.num}</span>
                    <span>{link.name}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 opacity-40" />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer info inside drawer */}
        <div className="pt-6 border-t border-taupe-border/50 space-y-4 text-xs text-espresso/75">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-espresso uppercase tracking-wider text-[11px]">Location</p>
              <p className="mt-0.5">{SITE_CONFIG.addressShort}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-espresso uppercase tracking-wider text-[11px]">Hours</p>
              <p className="mt-0.5">8:00 AM – 9:00 PM Daily</p>
            </div>
          </div>
          <div className="pt-2 flex flex-col gap-2.5">
            <a
              href={SITE_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 bg-espresso text-porcelain font-sans text-xs tracking-wider uppercase rounded-full hover:bg-espresso-dark transition-colors"
            >
              <MapPin className="w-4 h-4 text-caramel-light" />
              Open in Google Maps
            </a>
            <a
              href={SITE_CONFIG.phoneHref}
              className="inline-flex items-center justify-center gap-2 w-full py-3 bg-porcelain border border-taupe-border text-espresso font-sans text-xs tracking-wider uppercase rounded-full hover:bg-cream-dark transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-caramel" />
              Call {SITE_CONFIG.phoneDisplay}
            </a>

            {/* Social channels */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={SITE_CONFIG.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-cream border border-taupe-border/60 text-espresso text-[11px] font-sans uppercase tracking-wider hover:bg-porcelain transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-caramel" />
                <span>Instagram</span>
              </a>
              <a
                href={SITE_CONFIG.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-cream border border-taupe-border/60 text-espresso text-[11px] font-sans uppercase tracking-wider hover:bg-porcelain transition-colors"
              >
                <TikTokIcon className="w-3.5 h-3.5 text-caramel" />
                <span>TikTok</span>
              </a>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
