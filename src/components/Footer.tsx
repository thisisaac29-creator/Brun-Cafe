"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { SITE_CONFIG } from "@/data/site-config";
import { MapPin, Phone, Clock, Instagram, ArrowUpRight, ShieldCheck, Heart } from "lucide-react";
import { TikTokIcon } from "@/components/icons/TikTokIcon";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="[content-visibility:auto] [contain-intrinsic-block-size:auto_1107px] md:[contain-intrinsic-block-size:auto_919px] lg:[contain-intrinsic-block-size:auto_491px] bg-espresso-dark text-porcelain relative overflow-hidden pt-24 pb-12 border-t border-espresso-muted select-none"
    >
      {/* Background Decorative Large Wordmark with Scroll Entrance */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.03] overflow-hidden whitespace-nowrap text-center w-full transition-transform duration-1000 ease-out"
        style={{
          transform: `translateX(-50%) scale(${isVisible ? 1.0 : 0.92})`,
        }}
        aria-hidden="true"
      >
        <span className="brun-wordmark text-[20vw]">
          BRÜN
        </span>
      </div>

      <div className="max-w-editorial mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        
        {/* Animated Hairline Top Accent */}
        <div className="w-full h-[1px] bg-white/10 relative overflow-hidden mb-12">
          <div
            className={`absolute top-0 bottom-0 left-0 bg-caramel transition-all duration-1000 ease-out ${
              isVisible ? "w-full" : "w-0"
            }`}
          />
        </div>

        {/* Top Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10 pb-16 border-b border-white/10">
          
          {/* Brand Column (5 cols) */}
          <div
            className={`lg:col-span-5 space-y-6 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Wordmark variant="light" size="md" withSubline={true} />
            <p className="font-serif italic text-cream/80 text-xl sm:text-2xl max-w-md leading-relaxed pt-2">
              &ldquo;A little everyday indulgence in the heart of Ikeja.&rdquo;
            </p>
            <p className="font-sans text-xs sm:text-sm text-cream/65 leading-relaxed max-w-sm">
              An elevated neighbourhood sanctuary pairing French-style artisan baking, single-origin espresso craft, all-day savoury brunch, and thoughtful hospitality on the Lagos Mainland.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={SITE_CONFIG.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs tracking-[0.16em] uppercase font-sans text-caramel-light hover:text-porcelain transition-colors bg-white/5 border border-white/10 px-4 py-2 rounded-full"
                title="Follow BRÜN on Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram {SITE_CONFIG.instagram.handle}</span>
                <ArrowUpRight className="w-3 h-3 opacity-70" />
              </a>

              <a
                href={SITE_CONFIG.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs tracking-[0.16em] uppercase font-sans text-caramel-light hover:text-porcelain transition-colors bg-white/5 border border-white/10 px-4 py-2 rounded-full"
                title="Follow BRÜN on TikTok"
              >
                <TikTokIcon className="w-3.5 h-3.5" />
                <span>TikTok {SITE_CONFIG.tiktok.handle}</span>
                <ArrowUpRight className="w-3 h-3 opacity-70" />
              </a>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div
            className={`lg:col-span-3 space-y-4 transition-all duration-1000 delay-150 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="brun-label text-caramel-light">
              Navigation
            </p>
            <ul className="space-y-3 text-xs sm:text-sm font-sans text-cream/75">
              <li>
                <Link prefetch={false} href="/" className="hover:text-porcelain transition-colors flex items-center justify-between group">
                  <span>Home</span>
                  <span className="font-sans text-[10px] text-cream/30 group-hover:text-caramel">01</span>
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/menu" className="hover:text-porcelain transition-colors flex items-center justify-between group">
                  <span>Menu &amp; Daily Bakes</span>
                  <span className="font-sans text-[10px] text-cream/30 group-hover:text-caramel">02</span>
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/our-story" className="hover:text-porcelain transition-colors flex items-center justify-between group">
                  <span>Our Story &amp; Philosophy</span>
                  <span className="font-sans text-[10px] text-cream/30 group-hover:text-caramel">03</span>
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/kinderhome" className="hover:text-porcelain transition-colors flex items-center justify-between group">
                  <span>Kinderhome Soft Play</span>
                  <span className="font-sans text-[10px] text-cream/30 group-hover:text-caramel">04</span>
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/gallery" className="hover:text-porcelain transition-colors flex items-center justify-between group">
                  <span>Gallery &amp; Monograph</span>
                  <span className="font-sans text-[10px] text-cream/30 group-hover:text-caramel">05</span>
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/visit" className="hover:text-porcelain transition-colors flex items-center justify-between group">
                  <span>Visit &amp; Contact</span>
                  <span className="font-sans text-[10px] text-cream/30 group-hover:text-caramel">06</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Location & Hours (4 cols) */}
          <div
            className={`lg:col-span-4 space-y-6 transition-all duration-1000 delay-300 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="brun-label text-caramel-light">
              Location &amp; Operating Hours
            </p>

            <div className="space-y-4 text-xs sm:text-sm text-cream/80 font-sans">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-caramel flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-porcelain">{SITE_CONFIG.address}</p>
                  <p className="text-[11px] text-cream/60 mt-0.5">
                    Within the green compound shared with Fiora Garden
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-caramel flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-porcelain">Monday – Sunday: 8:00 AM – 9:00 PM</p>
                  <p className="text-[11px] text-cream/60 mt-0.5">
                    Fresh bakes from 7:45 AM · Kitchen orders until 8:30 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-caramel flex-shrink-0 mt-0.5" />
                <div>
                  <a
                    href={SITE_CONFIG.phoneHref}
                    className="hover:text-porcelain transition-colors font-medium text-porcelain"
                  >
                    {SITE_CONFIG.phone}
                  </a>
                  <p className="text-[11px] text-cream/60 mt-0.5">
                    Walk-ins warmly welcomed · Free gated parking
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link prefetch={false}
                href="/visit"
                className="inline-flex items-center gap-2 bg-caramel hover:bg-caramel-hover text-porcelain text-xs tracking-[0.16em] uppercase font-sans font-medium px-6 py-3 rounded-full transition-all duration-300 luxury-hover shadow-sm"
              >
                <span>Interactive Map &amp; Directions</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-cream/50 font-sans space-y-4 sm:space-y-0">
          <p>© {currentYear} BRÜN Coffee Shop &amp; Bakery. All rights reserved.</p>
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-[10px] font-sans tracking-wider uppercase text-cream/50">
            <span>9 Sasegbon St, Ikeja GRA</span>
            <span>·</span>
            <span>7.5% VAT Applied</span>
            <span>·</span>
            <span>Hospitality Lagos</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
