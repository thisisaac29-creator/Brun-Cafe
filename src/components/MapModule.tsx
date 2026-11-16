import React from "react";
import { MapFrame } from "./MapFrame";
import { SITE_CONFIG } from "@/data/site-config";
import { MapPin, Phone, Clock, ArrowUpRight, Check, Compass, Navigation } from "lucide-react";

export function MapModule() {
  return (
    <div className="w-full bg-porcelain rounded-3xl border border-taupe-border/70 overflow-hidden shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Info Column (5 cols) */}
        <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream border border-taupe-border/60 text-[10px] font-sans tracking-widest uppercase text-espresso mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse" />
              <span>Ikeja GRA · Compound 09</span>
            </div>
            
            <h3 className="font-serif text-3xl sm:text-4xl text-espresso font-normal leading-tight">
              A serene oasis off the beaten track.
            </h3>
            
            <p className="font-sans text-xs sm:text-sm text-espresso/70 mt-3 leading-relaxed">
              Nestled on leafy Sasegbon Street inside the lush gated compound shared with Fiora Garden, offering shaded parking and a peaceful retreat away from commercial thoroughfares.
            </p>

            <div className="mt-8 space-y-4 text-xs sm:text-sm font-sans text-espresso/85">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-caramel mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-espresso">{SITE_CONFIG.address}</p>
                  <p className="text-xs text-taupe-dark mt-0.5">{SITE_CONFIG.compoundNote}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-caramel mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-espresso">{SITE_CONFIG.hoursStructured.days}</p>
                  <p className="text-xs text-taupe-dark mt-0.5">{SITE_CONFIG.hoursStructured.time}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-caramel mt-0.5 flex-shrink-0" />
                <div>
                  <a
                    href={SITE_CONFIG.phoneHref}
                    className="font-medium text-espresso hover:text-caramel transition-colors"
                  >
                    {SITE_CONFIG.phone} ({SITE_CONFIG.phoneDisplay})
                  </a>
                  <p className="text-xs text-taupe-dark mt-0.5">Counter enquiries &amp; pastry reserves</p>
                </div>
              </div>
            </div>

            {/* Quick Amenities */}
            <div className="mt-8 pt-6 border-t border-taupe-border/50">
              <p className="text-[10px] font-sans uppercase tracking-widest text-taupe-dark mb-3">
                Guest Conveniences
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-espresso/75">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-olive" /> Complimentary parking
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-olive" /> Kinderhome soft play
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-olive" /> Climate-controlled indoor
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-olive" /> Shaded garden patio
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-8 mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href={SITE_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-espresso text-porcelain px-6 py-3.5 rounded-full text-xs font-sans tracking-[0.16em] uppercase font-medium hover:bg-espresso-dark transition-all duration-300 luxury-hover shadow-sm"
            >
              <Compass className="w-4 h-4 text-caramel-light" />
              <span>Get Directions</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href={SITE_CONFIG.phoneHref}
              className="inline-flex items-center justify-center gap-2 bg-cream text-espresso border border-taupe-border px-5 py-3.5 rounded-full text-xs font-sans tracking-[0.14em] uppercase font-medium hover:bg-cream-dark transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-caramel" />
              <span>Call BRÜN</span>
            </a>
          </div>
        </div>

        {/* Right Map Embed Column (7 cols) */}
        <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[480px] bg-cream-dark border-t lg:border-t-0 lg:border-l border-taupe-border/60">
          <MapFrame />

          <div className="absolute top-4 right-4 bg-porcelain/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-taupe-border/50 text-[10px] font-sans tracking-widest uppercase text-espresso font-medium shadow-sm pointer-events-none">
            Ikeja GRA · Lagos
          </div>
        </div>
      </div>
    </div>
  );
}
