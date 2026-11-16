import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { MEDIA_ASSETS } from "@/data/site-data";
import { ArrowRight, Compass, Heart, Coffee, Sparkles, Clock } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/our-story" },
  title: "Our Story — The Philosophy & Architecture of BRÜN",
  description:
    "Learn about BRÜN Coffee Shop & Bakery in Ikeja GRA: inspired by the warm brown tones of roasted coffee beans and freshly baked loaves. An elevated neighbourhood sanctuary in Lagos.",
};

export default function OurStoryPage() {
  const morningTimeline = [
    {
      time: "07:15",
      title: "The Dawn Oven",
      description: "Our bakers slide laminated French butter pastries and fermented loaves into hearth heat as morning birds stir in Ikeja GRA.",
    },
    {
      time: "08:00",
      title: "Doors Open on Sasegbon",
      description: "The grinder is calibrated, espresso dialed in, and the aroma of Korintje cinnamon rolls drifts through the courtyard.",
    },
    {
      time: "10:30",
      title: "The Brunch Rush",
      description: "Plush banquettes fill with conversation. Farm eggs are poached, avocado toast seasoned, and flat whites poured.",
    },
    {
      time: "15:00",
      title: "The Sweet Afternoon",
      description: "Quiet daylight softens. House-churned pistachio gelato, iced Spanish lattes, and relaxed work sessions take over.",
    },
  ];

  return (
    <div className="w-full pb-24">
      {/* Editorial Hero Header */}
      <section className="pt-16 sm:pt-24 pb-16 sm:pb-20 bg-cream">
        <div className="max-w-editorial mx-auto px-5 sm:px-8 md:px-12 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-porcelain border border-taupe-border/70 text-[10px] tracking-[0.24em] uppercase font-sans text-espresso mb-4">
            <span>A Hospitality Monograph</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[76px] text-espresso font-light max-w-4xl mx-auto leading-[1.02]">
            A little warmth goes a long way.
          </h1>
          <p className="font-sans text-base sm:text-lg text-espresso/75 mt-6 max-w-xl mx-auto leading-relaxed">
            BRÜN is shaped around a simple conviction: that good coffee, warm bakes, and thoughtful spaces can transform an ordinary hour into something memorable.
          </p>
        </div>
      </section>

      {/* Large Hero Photography Split */}
      <section className="max-w-editorial mx-auto px-5 sm:px-8 md:px-12 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          <div className="md:col-span-8 h-[380px] sm:h-[500px] rounded-3xl overflow-hidden relative shadow-md photo-frame border-2 border-porcelain">
            <Image
              src={MEDIA_ASSETS.diningRoom}
              alt="BRÜN warm dining room with neutral upholstery and timber tables"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-porcelain/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-sans tracking-widest uppercase text-espresso">
              The Dining Room · Natural Daylight
            </div>
          </div>
          <div className="md:col-span-4 h-[380px] sm:h-[500px] rounded-3xl overflow-hidden relative shadow-md photo-frame border-2 border-porcelain">
            <Image
              src={MEDIA_ASSETS.coffeeBar}
              alt="Specialty espresso pour at BRÜN"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-porcelain/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-sans tracking-widest uppercase text-espresso">
              Espresso Extraction
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 01 — THE NAME */}
      <section className="py-20 sm:py-28 bg-porcelain border-y border-taupe-border/50">
        <div className="max-w-editorial mx-auto px-5 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="font-sans text-xs tracking-widest text-caramel uppercase">
                Chapter 01
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-espresso font-normal leading-tight">
                The Name
              </h2>
              <p className="font-serif italic text-xl text-taupe-dark">
                &ldquo;Rooted in the color of good things.&rdquo;
              </p>
            </div>

            <div className="lg:col-span-7 space-y-5 text-sm sm:text-base font-sans text-espresso/80 leading-relaxed dropcap">
              <p>
                The name <strong>BRÜN</strong> draws its inspiration from the rich, reassuring brown tones of well-roasted coffee beans and deeply caramelized bread crusts fresh from the oven.
              </p>
              <p>
                Brown is often overlooked in contemporary design, yet it is the color of tactile comfort: warm timber floorboards, roasted cacao, terracotta earthenware, and morning espresso crema. At BRÜN, these earthen tones form the tactile soul of our brand, reflected in our interior finishes, our packaging, and the atmosphere we foster every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 02 — THE SPACE */}
      <section className="py-20 sm:py-28 bg-cream">
        <div className="max-w-editorial mx-auto px-5 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1 space-y-5 text-sm sm:text-base font-sans text-espresso/80 leading-relaxed">
              <span className="font-sans text-xs tracking-widest text-caramel uppercase block">
                Chapter 02
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-espresso font-normal leading-tight">
                The Space
              </h2>
              <p className="font-serif italic text-xl text-taupe-dark">
                &ldquo;Designed to slow you down.&rdquo;
              </p>
              <p>
                Too many modern spaces feel loud, transactional, and rushed. We wanted BRÜN to offer the exact opposite: an oasis of calm on Sasegbon Street.
              </p>
              <p>
                The architecture pairs soft, natural materials with deliberate acoustic comfort. Clean-lined Scandinavian ash tables, tactile travertine surfaces, custom upholstered banquettes, and carefully placed indoor plants create intimate pockets of space. Sunlight pours through large windows in the morning, while the exterior shaded patio lets guests enjoy Lagos breezes under classic striped awnings.
              </p>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="w-full h-[440px] rounded-3xl overflow-hidden relative shadow-lg photo-frame border-4 border-porcelain">
                <Image
                  src={MEDIA_ASSETS.storefront}
                  alt="BRÜN architectural facade and green courtyard in Ikeja GRA"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 03 — ANATOMY OF A MORNING */}
      <section className="py-20 sm:py-28 bg-porcelain border-y border-taupe-border/50">
        <div className="max-w-editorial mx-auto px-5 sm:px-8 md:px-12">
          <div className="max-w-2xl mb-16">
            <span className="font-sans text-xs tracking-widest text-caramel uppercase block mb-2">
              Chapter 03
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-espresso font-normal">
              The Daily Ritual
            </h2>
            <p className="font-sans text-base sm:text-lg text-espresso/70 mt-3">
              How a typical morning unfolds on Sasegbon Street.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {morningTimeline.map((item) => (
              <div key={item.time} className="p-6 rounded-2xl bg-cream border border-taupe-border/50 flex flex-col justify-between">
                <div>
                  <span className="font-sans text-2xl text-caramel font-light block mb-3">
                    {item.time}
                  </span>
                  <h3 className="font-serif text-xl text-espresso mb-2">{item.title}</h3>
                  <p className="font-sans text-xs sm:text-[13px] text-espresso/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHAPTER 04 — THE NEIGHBOURHOOD */}
      <section className="py-20 sm:py-28 bg-cream">
        <div className="max-w-editorial mx-auto px-5 sm:px-8 md:px-12 text-center max-w-3xl mx-auto space-y-6">
          <span className="font-sans text-xs tracking-widest text-caramel uppercase block">
            Chapter 04
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-espresso font-normal">
            Rooted in Ikeja GRA
          </h2>
          <p className="font-sans text-base sm:text-lg text-espresso/80 leading-relaxed font-normal">
            For years, premium specialty cafés were predominantly clustered on the Lagos Islands. BRÜN was created to bring that same refined, world-class standard to the mainland — offering Ikeja residents, professionals, and visitors a neighbourhood spot they can proudly call their own.
          </p>
          <div className="pt-4">
            <Link
              href="/visit"
              className="inline-flex items-center gap-2 bg-espresso text-porcelain text-xs tracking-[0.16em] uppercase font-sans font-medium px-8 py-4 rounded-full hover:bg-espresso-dark transition-all duration-300 luxury-hover shadow-sm"
            >
              <span>Visit Us at 9 Sasegbon Street</span>
              <ArrowRight className="w-4 h-4 text-caramel-light" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
