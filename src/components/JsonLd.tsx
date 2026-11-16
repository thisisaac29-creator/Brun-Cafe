import React from "react";
import { SITE_CONFIG } from "@/data/site-config";

export function JsonLd() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": ["CafeOrCoffeeShop", "Bakery"],
    name: SITE_CONFIG.extendedName,
    alternateName: "BRÜN Lagos",
    description:
      "A premium European-inspired neighbourhood coffee shop, French bakery, and all-day brunch destination with a dedicated indoor Kinderhome soft-play area in Ikeja GRA, Lagos.",
    url: "https://brunlagos.com",
    telephone: SITE_CONFIG.phone,
    servesCuisine: [
      "Specialty Coffee",
      "French Pastries",
      "Artisanal Bakery",
      "All-Day Brunch",
      "Italian Gelato",
    ],
    priceRange: "₦₦",
    address: {
      "@type": "PostalAddress",
      streetAddress: "9 Sasegbon Street",
      addressLocality: "Ikeja GRA",
      addressRegion: "Lagos",
      postalCode: "101233",
      addressCountry: "NG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 6.598919,
      longitude: 3.35124,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "21:00",
      },
    ],
    sameAs: [SITE_CONFIG.instagram.url, SITE_CONFIG.tiktok.url],
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Free On-Site Parking",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Kinderhome Soft Play Area",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Outdoor Seating",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Takeout",
        value: true,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

