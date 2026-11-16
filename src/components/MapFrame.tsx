"use client";

import { useEffect, useRef, useState } from "react";

const mapUrl = "https://maps.google.com/maps?q=9+Sasegbon+Street+Ikeja+GRA+Lagos+Nigeria&t=&z=15&ie=UTF8&iwloc=&output=embed";

export function MapFrame() {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!host.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "400px" });
    observer.observe(host.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div data-map-viewport ref={host} className="absolute inset-0">
      {visible && (
        <iframe
          title="BRÜN Coffee Shop & Bakery Google Maps Location"
          src={mapUrl}
          className="w-full h-full border-0 grayscale contrast-[0.95] opacity-90 hover:opacity-100 hover:grayscale-0 transition-all duration-700"
          referrerPolicy="no-referrer-when-downgrade"
        />
      )}
    </div>
  );
}

