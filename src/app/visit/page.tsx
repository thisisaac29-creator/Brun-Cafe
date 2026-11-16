import React from "react";
import type { Metadata } from "next";
import { MapModule } from "@/components/MapModule";
import { FaqAccordion } from "@/components/FaqAccordion";
import { VISIT_FAQS, SITE_CONFIG } from "@/data/site-data";
import {
  MapPin,
  Phone,
  Clock,
  Instagram,
  Compass,
  Camera,
  Car,
  Coffee,
  Check,
  ArrowUpRight,
  Navigation,
} from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/visit" },
  title: "Visit & Contact — 9 Sasegbon Street, Ikeja GRA",
  description:
    "Find BRÜN Coffee Shop & Bakery at 9 Sasegbon Street, Ikeja GRA, Lagos. Open daily 8:00 AM – 9:00 PM. Complimentary secure on-site parking, indoor dining, patio, and Kinderhome.",
};

export default function VisitPage() {
  const directionsTips = [
    {
      from: "From Victoria Island & Ikoyi",
      route: "Via Third Mainland Bridge",
      instructions:
        "Take Third Mainland Bridge heading towards the mainland. Continue onto Oworonshoki Expressway, exit toward Anthony / Mobolaji Bank Anthony Way. Turn right onto Sobo Arobiodu Street, then turn right onto Sasegbon Street. Look for No. 9 (shared entrance with Fiora Garden).",
      duration: "Approx. 25–40 mins depending on traffic",
    },
    {
      from: "From Lagos Airport (Murtala Muhammed)",
      route: "Via Airport Road & Isaac John",
      instructions:
        "Head south toward Ikeja GRA via Airport Road. Connect through Mobolaji Bank Anthony Way or Isaac John Street. Turn onto Sobo Arobiodu, then proceed directly to 9 Sasegbon Street.",
      duration: "Approx. 10–15 mins",
    },
    {
      from: "From Maryland & Ikeja City Mall",
      route: "Via Mobolaji Bank Anthony",
      instructions:
        "Drive down Mobolaji Bank Anthony Way toward Ikeja GRA. Enter Sobo Arobiodu Street at the roundabout, and make a quick turn into peaceful Sasegbon Street.",
      duration: "Approx. 8–12 mins",
    },
  ];

  return (
    <div className="w-full pb-24">
      {/* Editorial Header */}
      <section className="pt-16 sm:pt-24 pb-12 sm:pb-16 bg-cream border-b border-taupe-border/50">
        <div className="max-w-editorial mx-auto px-5 sm:px-8 md:px-12 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-porcelain border border-taupe-border/70 text-[10px] tracking-[0.24em] uppercase font-sans text-espresso mb-4">
            <Compass className="w-3 h-3 text-caramel" />
            <span>Destination Guide · Ikeja GRA</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[76px] text-espresso font-light">
            Come on in.
          </h1>

          <p className="font-serif italic text-xl sm:text-2xl text-espresso/80 mt-3 max-w-lg mx-auto">
            &ldquo;Find us in the heart of Ikeja GRA. There&apos;s always something good waiting.&rdquo;
          </p>

          <p className="font-sans text-xs sm:text-sm text-espresso/70 mt-3 max-w-md mx-auto leading-relaxed">
            Open seven days a week, 8:00 AM to 9:00 PM. Walk-ins are warmly welcomed.
          </p>
        </div>
      </section>

      {/* Main Interactive Map & Address Module */}
      <section className="py-12 sm:py-16 max-w-editorial mx-auto px-5 sm:px-8 md:px-12">
        <MapModule />
      </section>

      {/* Driving & Transit Guidance */}
      <section className="py-16 sm:py-20 bg-porcelain border-y border-taupe-border/50">
        <div className="max-w-editorial mx-auto px-5 sm:px-8 md:px-12">
          <div className="max-w-2xl mb-12">
            <span className="text-[10px] font-sans tracking-widest uppercase text-caramel block mb-2">
              Getting Here
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-normal">
              Transit &amp; Driving Directions
            </h2>
            <p className="font-sans text-xs sm:text-sm text-espresso/70 mt-2">
              How to navigate to our tranquil oasis in Ikeja GRA from across Lagos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {directionsTips.map((tip) => (
              <div key={tip.from} className="p-6 rounded-2xl bg-cream border border-taupe-border/50 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-sans uppercase tracking-widest text-caramel-hover block mb-1">
                    {tip.route}
                  </span>
                  <h3 className="font-serif text-xl text-espresso mb-3">{tip.from}</h3>
                  <p className="font-sans text-xs sm:text-[13px] text-espresso/75 leading-relaxed">
                    {tip.instructions}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-taupe-border/40 text-[10px] font-sans text-taupe-dark">
                  {tip.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photography & Etiquette Policy */}
      <section className="max-w-editorial mx-auto px-5 sm:px-8 md:px-12 my-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-cream border border-taupe-border/70 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4 max-w-2xl">
            <div className="p-3.5 rounded-2xl bg-porcelain border border-taupe-border/60 text-caramel flex-shrink-0">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider font-sans text-taupe-dark block">Dining Courtesy</span>
              <h3 className="font-serif text-2xl text-espresso mt-0.5">Photography &amp; Filming Policy</h3>
              <p className="font-sans text-xs sm:text-sm text-espresso/75 mt-1 leading-relaxed">
                {SITE_CONFIG.photographyPolicy}
              </p>
            </div>
          </div>

          <div className="flex-shrink-0">
            <span className="text-[10px] font-sans uppercase tracking-widest text-taupe-dark bg-porcelain px-3.5 py-1.5 rounded-full border border-taupe-border/60">
              Preserving Guest Privacy
            </span>
          </div>
        </div>
      </section>

      {/* Visit FAQs */}
      <section className="max-w-editorial mx-auto px-5 sm:px-8 md:px-12 mt-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] font-sans tracking-widest uppercase text-caramel block mb-2">
              Visit Guidelines
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-normal">
              Frequently Asked Questions
            </h2>
            <p className="font-sans text-xs sm:text-sm text-espresso/70 mt-2">
              Everything you need to plan your morning, afternoon, or weekend brunch.
            </p>
          </div>

          <FaqAccordion items={VISIT_FAQS} />
        </div>
      </section>
    </div>
  );
}
