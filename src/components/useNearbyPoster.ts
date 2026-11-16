"use client";

import { useEffect, type RefObject } from "react";

// preload="none" defers the movie, but browsers still fetch its poster immediately.
export function useNearbyPoster(ref: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = ref.current;
    const poster = video?.dataset.poster;
    if (!video || !poster) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.poster = poster;
        observer.disconnect();
      }
    }, { rootMargin: "600px" });
    observer.observe(video);
    return () => observer.disconnect();
  }, [ref]);
}
