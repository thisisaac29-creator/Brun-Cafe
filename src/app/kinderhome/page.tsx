import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqAccordion } from "@/components/FaqAccordion";
import { KINDERHOME_FAQS, SITE_CONFIG, MEDIA_ASSETS } from "@/data/site-data";
import { ShieldCheck, Heart, Sparkles, AlertCircle, ArrowRight, Eye, Check } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/kinderhome" },
  title: "Kinderhome — Dedicated Children's Soft-Play Sanctuary",
  description:
    "Kinderhome at BRÜN: A safe, joyfully designed indoor soft-play space with slides and ball pit for children aged 2+. Relax with specialty coffee while your little ones play safely in Ikeja GRA.",
};

export default function KinderhomePage() {
  return (
    <div className="w-full pb-24">
      {/* Hero Header */}
      <section className="pt-16 sm:pt-24 pb-16 sm:pb-20 bg-cream">
        <div className="max-w-editorial mx-auto px-5 sm:px-8 md:px-12 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-porcelain border border-taupe-border/70 text-[10px] tracking-[0.24em] uppercase font-sans text-espresso mb-4">
            <span>Family Hospitality · Ages 2+</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[76px] text-espresso font-light max-w-3xl mx-auto leading-[1.02]">
            A little room for big adventures.
          </h1>
          <p className="font-sans text-base sm:text-lg text-espresso/75 mt-6 max-w-xl mx-auto leading-relaxed">
            Welcome to Kinderhome — our purpose-built indoor soft-play haven where children slide, explore, and laugh, while parents savor hot coffee and calm conversation.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/visit"
              className="inline-flex items-center gap-2 bg-espresso text-porcelain text-xs tracking-[0.16em] uppercase font-sans font-medium px-8 py-4 rounded-full hover:bg-espresso-dark transition-all duration-300 luxury-hover shadow-sm"
            >
              <span>Plan a Family Visit</span>
              <ArrowRight className="w-4 h-4 text-caramel-light" />
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Photography & Essential Guidelines */}
      <section className="max-w-editorial mx-auto px-5 sm:px-8 md:px-12 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Visual */}
          <div className="lg:col-span-7 h-[420px] sm:h-[520px] rounded-3xl overflow-hidden relative shadow-lg photo-frame border-4 border-porcelain bg-porcelain">
            <Image
              src={MEDIA_ASSETS.kinderhome}
              alt="Kinderhome soft play equipment and smiling children playing safely"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
            <div className="absolute top-4 left-4 bg-porcelain/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider text-espresso font-medium shadow-sm">
              Dedicated Soft Play · Ages 2+
            </div>
          </div>

          {/* Key Guidelines Box */}
          <div className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-porcelain border border-taupe-border/60 shadow-sm space-y-6">
            <div>
              <span className="text-[10px] tracking-[0.22em] uppercase font-sans text-caramel block mb-1">
                Guest Policies
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-espresso font-normal">
                Kinderhome Guidelines
              </h3>
            </div>

            <ul className="space-y-4 text-sm font-sans text-espresso/80">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-cream border border-taupe-border/50 flex items-center justify-center text-caramel flex-shrink-0 text-xs font-sans mt-0.5">
                  01
                </span>
                <div>
                  <strong className="text-espresso block font-medium">Ages 2 and Above</strong>
                  <span className="text-xs text-espresso/70">Engineered with safe padded gradients, soft steps, and gentle slides tailored for toddlers and young children.</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-cream border border-taupe-border/50 flex items-center justify-center text-caramel flex-shrink-0 text-xs font-sans mt-0.5">
                  02
                </span>
                <div>
                  <strong className="text-espresso block font-medium">Socks Are Strictly Mandatory</strong>
                  <span className="text-xs text-espresso/70">For hygiene and safety, all children must wear socks in the play zone. Bring your own or buy clean pairs at BRÜN for ₦2,250.</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-cream border border-taupe-border/50 flex items-center justify-center text-caramel flex-shrink-0 text-xs font-sans mt-0.5">
                  03
                </span>
                <div>
                  <strong className="text-espresso block font-medium">Parents-Beside-Play Concept</strong>
                  <span className="text-xs text-espresso/70">Adults do not enter the equipment to protect smaller children, but tables sit right next to the enclosure with clear sightlines.</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-cream border border-taupe-border/50 flex items-center justify-center text-caramel flex-shrink-0 text-xs font-sans mt-0.5">
                  04
                </span>
                <div>
                  <strong className="text-espresso block font-medium">Active Parental Supervision</strong>
                  <span className="text-xs text-espresso/70">Kinderhome is a guest play area, not a daycare. Parents maintain sightline supervision at all times while enjoying food and coffee.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Safety & Hygiene Standards */}
      <section className="py-20 sm:py-28 bg-porcelain border-y border-taupe-border/50">
        <div className="max-w-editorial mx-auto px-5 sm:px-8 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] tracking-[0.25em] uppercase font-sans font-semibold text-caramel block mb-2">
              Our Safety Standard
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-espresso font-normal">
              Clean, padded, and considered.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-cream border border-taupe-border/50 space-y-4">
              <ShieldCheck className="w-8 h-8 text-olive" />
              <h3 className="font-serif text-2xl text-espresso">Daily Sanitisation</h3>
              <p className="font-sans text-xs sm:text-sm text-espresso/70 leading-relaxed">
                The ball pit, soft obstacles, and slide are disinfected with child-safe, non-toxic hospital-grade sanitiser multiple times daily before morning service and during changeovers.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-cream border border-taupe-border/50 space-y-4">
              <Heart className="w-8 h-8 text-caramel" />
              <h3 className="font-serif text-2xl text-espresso">High-Density Foam</h3>
              <p className="font-sans text-xs sm:text-sm text-espresso/70 leading-relaxed">
                Every edge, pillar, and step is encased in commercial shock-absorbing foam with smooth, antibacterial vinyl covering that withstands enthusiastic play.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-cream border border-taupe-border/50 space-y-4">
              <Eye className="w-8 h-8 text-taupe-dark" />
              <h3 className="font-serif text-2xl text-espresso">Unobstructed Sightlines</h3>
              <p className="font-sans text-xs sm:text-sm text-espresso/70 leading-relaxed">
                Clear mesh and low boundary walls allow parents enjoying brunch to see their child at every angle with zero blind spots from adjacent tables.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Kinderhome Photo Gallery */}
      <section className="py-16 sm:py-20 bg-cream border-y border-taupe-border/40">
        <div className="max-w-editorial mx-auto px-5 sm:px-8 md:px-12">
          <div className="text-center mb-10">
            <span className="text-[11px] tracking-[0.25em] uppercase font-sans font-semibold text-caramel block mb-2">
              Inside the Play Space
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-normal">
              A look inside Kinderhome.
            </h2>
            <p className="font-sans text-sm text-espresso/70 mt-2 max-w-md mx-auto">
              Purpose-built, fully enclosed, and thoughtfully designed for joyful, safe exploration.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {[
              { src: MEDIA_ASSETS.kinderhome2, alt: "Kinderhome ball pit and twin slides" },
              { src: MEDIA_ASSETS.kinderhome3, alt: "Kinderhome spiral tube slide and sign" },
              { src: MEDIA_ASSETS.kinderhome4, alt: "Kinderhome play tower and rope climb" },
              { src: MEDIA_ASSETS.kinderhome5, alt: "Kinderhome obstacle tunnel with ring" },
            ].map((img, i) => (
              <div key={i} className="relative h-64 sm:h-80 rounded-2xl overflow-hidden photo-frame bg-cream-dark group shadow-sm border border-taupe-border/40">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 sm:py-28 max-w-editorial mx-auto px-5 sm:px-8 md:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[11px] tracking-[0.25em] uppercase font-sans font-semibold text-caramel block mb-2">
              Common Questions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-normal">
              Kinderhome FAQs
            </h2>
            <p className="font-sans text-xs sm:text-sm text-espresso/70 mt-2">
              Everything you need to know before bringing your little ones.
            </p>
          </div>

          <FaqAccordion items={KINDERHOME_FAQS} />
        </div>
      </section>
    </div>
  );
}
