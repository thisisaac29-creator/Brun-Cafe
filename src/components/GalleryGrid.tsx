"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { GALLERY_ITEMS, GalleryItem, MEDIA_ASSETS } from "@/data/site-data";
import { X, ChevronLeft, ChevronRight, Maximize2, Volume2, VolumeX, Play, Pause } from "lucide-react";

type GalleryCategory = "all" | "space" | "coffee" | "bakery" | "brunch" | "moments" | "kinderhome" | "video";

const TABS: { key: GalleryCategory; label: string; num: string }[] = [
  { key: "all", label: "All Works", num: "ALL" },
  { key: "video", label: "Motion Monograph", num: "01" },
  { key: "space", label: "The Space & Architecture", num: "02" },
  { key: "bakery", label: "Bakery & Viennoiserie", num: "03" },
  { key: "coffee", label: "Specialty Espresso", num: "04" },
  { key: "brunch", label: "All-Day Brunch", num: "05" },
  { key: "moments", label: "Atmosphere & Moments", num: "06" },
  { key: "kinderhome", label: "Kinderhome", num: "07" },
];

// ── Inline Video Tile ──────────────────────────────────────────────
function VideoTile({
  src,
  poster,
  plateLabel,
  tag,
  title,
  caption,
  accentColor = "text-caramel-light",
}: {
  src: string;
  poster: string;
  plateLabel: string;
  tag: string;
  title: string;
  caption: string;
  accentColor?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="mb-6 sm:mb-8 break-inside-avoid h-[480px] sm:h-[540px] rounded-2xl overflow-hidden bg-espresso-dark border-2 border-caramel/40 photo-frame relative shadow-xl group">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        muted={isMuted}
        loop
        preload="none"
        className="w-full h-full object-cover"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso-dark/90 via-transparent to-espresso-dark/40 pointer-events-none" />

      {/* Top Tag */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
        <span className="inline-flex items-center gap-1.5 bg-espresso/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-sans tracking-widest uppercase text-porcelain border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-caramel animate-ping" />
          {tag}
        </span>
        <span className="text-[10px] font-sans tracking-widest text-cream/70 uppercase">{plateLabel}</span>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-4 left-4 right-4 z-20 space-y-3">
        <div>
          <span className={`text-[10px] uppercase font-sans tracking-widest ${accentColor} font-medium block`}>
            Motion Monograph · 9:16
          </span>
          <h3 className="font-serif text-xl sm:text-2xl text-porcelain font-normal">{title}</h3>
          <p className="text-xs font-sans text-cream/80 mt-1 line-clamp-2">{caption}</p>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <button
            type="button"
            onClick={togglePlay}
            className="p-2.5 rounded-full bg-porcelain/15 hover:bg-porcelain/30 backdrop-blur-md text-porcelain transition-all"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>
          <button
            type="button"
            onClick={toggleSound}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-porcelain/15 hover:bg-porcelain/30 backdrop-blur-md text-porcelain text-[10px] font-sans tracking-wider transition-all"
          >
            {isMuted ? (
              <><VolumeX className="w-3.5 h-3.5 text-cream/70" /><span>Sound Off</span></>
            ) : (
              <><Volume2 className="w-3.5 h-3.5 text-caramel-light" /><span className="text-caramel-light">Sound On</span></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export function GalleryGrid() {
  const [activeTab, setActiveTab] = useState<GalleryCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = activeTab === "all" || activeTab === "video"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeTab);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const lightboxOpen = lightboxIndex !== null;
  useEffect(() => {
    if (lightboxOpen) dialogRef.current?.showModal();
  }, [lightboxOpen]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => {
    dialogRef.current?.close();
    setLightboxIndex(null);
  }, []);

  const showNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => ((prev! + 1) % filteredItems.length));
  }, [lightboxIndex, filteredItems.length]);

  const showPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
  }, [lightboxIndex, filteredItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, showNext, showPrev, closeLightbox]);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [lightboxIndex]);

  const showVideos = activeTab === "all" || activeTab === "video";

  return (
    <div className="w-full">
      {/* Category Filter Pills */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 pt-2 gap-2 sm:gap-3 no-scrollbar scroll-smooth">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs tracking-[0.14em] uppercase font-sans font-medium whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 ${
                isActive
                  ? "bg-espresso text-porcelain shadow-sm scale-[1.02]"
                  : "bg-porcelain text-espresso/70 hover:text-espresso hover:bg-cream-dark border border-taupe-border/60"
              }`}
            >
              <span className={`text-[9px] font-sans ${isActive ? "text-caramel-light" : "text-taupe"}`}>
                {tab.num}
              </span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Columns pack mixed-height tiles without reserving space for a taller neighbour.
          DOM order remains the reading/lightbox order, top to bottom per column. */}
      <div className="gallery-masonry columns-1 sm:columns-2 lg:columns-3 gap-6 sm:gap-8 mt-10">

        {/* Video Monograph Tiles — shown in "All" and "Video" tabs */}
        {showVideos && (
          <>
            <VideoTile
              src={MEDIA_ASSETS.videoReview}
              poster={MEDIA_ASSETS.videoReviewPoster}
              plateLabel="Plate 00"
              tag="Video Monograph · 9:16"
              title="The Daily Ritual in Motion"
              caption="Firsthand impressions of our dawn butter croissants, specialty lattes, and neighbourhood atmosphere."
              accentColor="text-caramel-light"
            />
            <VideoTile
              src={MEDIA_ASSETS.videoSnaptik1}
              poster="/video/snaptik_7691011488131190024_v3.webp"
              plateLabel="Plate 00-B"
              tag="Video Monograph · 9:16"
              title="Inside BRÜN — A Moving Portrait"
              caption="A short cinematic portrait of the café — the counter, the light, and the quiet rhythm of a Lagos morning."
              accentColor="text-caramel-light"
            />
            <VideoTile
              src={MEDIA_ASSETS.videoSnaptik2}
              poster="/video/snaptik_7692001063179914514_v3.webp"
              plateLabel="Plate 00-C"
              tag="Video Monograph · 9:16"
              title="Moments from the Floor"
              caption="Captured from inside BRÜN — the warmth, the people, and the feeling of being exactly where you should be."
              accentColor="text-caramel-light"
            />
          </>
        )}

        {/* Photography Plates */}
        {activeTab !== "video" && filteredItems.map((item, index) => {
          const heightClasses =
            item.aspect === "portrait"
              ? "h-[480px] sm:h-[540px]"
              : item.aspect === "square"
              ? "h-[380px] sm:h-[420px]"
              : "h-[320px] sm:h-[360px]";

          return (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className={`mb-6 sm:mb-8 break-inside-avoid group cursor-pointer relative rounded-2xl overflow-hidden bg-cream-dark border border-taupe-border/50 photo-frame shadow-sm ${heightClasses}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(index); }
              }}
              aria-label={`View full size: ${item.title}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 text-porcelain">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-sans tracking-widest uppercase bg-espresso/60 backdrop-blur-md px-2.5 py-1 rounded-full text-porcelain">
                    BRÜN · Plate {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                  <span className="p-2 rounded-full bg-espresso/60 backdrop-blur-md text-porcelain hover:bg-espresso">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-caramel-light font-medium block">
                    {item.categoryLabel}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl mt-1 text-porcelain font-normal">{item.title}</h3>
                  <p className="text-xs font-sans text-cream/80 mt-1 line-clamp-2">{item.caption}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox */}
      {lightboxIndex !== null && (
        <dialog ref={dialogRef} onCancel={closeLightbox}
          className="fixed inset-0 m-0 w-screen h-screen max-w-none max-h-none z-50 bg-espresso-dark/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 p-3 rounded-full bg-porcelain/10 hover:bg-porcelain/20 text-porcelain transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
            aria-label="Close (Escape)"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={showPrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-porcelain/10 hover:bg-porcelain/25 text-porcelain transition-colors focus:outline-none"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={showNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-porcelain/10 hover:bg-porcelain/25 text-porcelain transition-colors focus:outline-none"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center">
            <div className="relative w-full h-[60vh] sm:h-[68vh] rounded-2xl overflow-hidden bg-espresso shadow-2xl border border-white/10">
              <Image
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
            <div className="mt-4 text-center max-w-xl text-porcelain">
              <p className="text-[10px] tracking-[0.24em] uppercase font-sans text-caramel-light font-medium">
                {filteredItems[lightboxIndex].categoryLabel} · Plate {lightboxIndex + 1} of {filteredItems.length}
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl mt-1 text-porcelain font-normal">
                {filteredItems[lightboxIndex].title}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-cream/75 mt-1.5">
                {filteredItems[lightboxIndex].caption}
              </p>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
