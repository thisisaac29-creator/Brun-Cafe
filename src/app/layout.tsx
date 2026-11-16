import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Preloader } from "@/components/Preloader";
import { PageTransition } from "@/components/PageTransition";
import { SITE_CONFIG } from "@/data/site-data";

export const metadata: Metadata = {
  metadataBase: new URL("https://brunlagos.com"),
  title: {
    default: "BRÜN — Premium Coffee Shop & Bakery | Ikeja GRA, Lagos",
    template: "%s | BRÜN Coffee Shop & Bakery",
  },
  description:
    "BRÜN is an elevated neighbourhood café in Ikeja GRA, Lagos. French-style artisan bakery, specialty coffee, house-made gelato, all-day brunch, and our dedicated Kinderhome play area. 9 Sasegbon Street.",
  keywords: [
    "BRUN Lagos",
    "BRÜN Coffee Shop",
    "Bakery in Ikeja GRA",
    "Coffee shop in Ikeja",
    "Brunch Lagos mainland",
    "Kinderhome Lagos",
    "Pastries Lagos",
    "Café in Ikeja GRA",
    "Specialty Coffee Lagos",
  ],
  authors: [{ name: "BRÜN Coffee Shop & Bakery" }],
  creator: "BRÜN",
  publisher: "BRÜN",
  formatDetection: {
    telephone: true,
    address: true,
  },
  openGraph: {
    title: "BRÜN — Premium Coffee Shop & Bakery | Ikeja GRA, Lagos",
    description:
      "A little everyday indulgence in the heart of Ikeja. Freshly baked mornings, specialty espresso, and our family-friendly Kinderhome.",
    url: "https://brunlagos.com",
    siteName: "BRÜN Coffee Shop & Bakery",
    images: [
      {
        url: "/images/brun-social.jpg",
        width: 1200,
        height: 630,
        alt: "BRÜN Coffee Shop & Bakery Interior, Ikeja GRA, Lagos",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BRÜN — Premium Coffee Shop & Bakery | Ikeja GRA, Lagos",
    description:
      "A little everyday indulgence in the heart of Ikeja. French artisan bakes, specialty coffee, and Kinderhome play space.",
    images: [
      "/images/brun-social.jpg",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-type="place">
      <head>
        <meta name="page-type" content="place" />
        <meta name="site-kind" content="other" />
        <meta name="page-kind" content="place" />

      </head>
      <body className="bg-cream text-espresso selection:bg-caramel selection:text-porcelain flex flex-col min-h-screen">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:z-[110] focus:bg-cream focus:p-4">Skip to main content</a>
        <Preloader />
        <JsonLd />
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-grow pt-[84px] sm:pt-[96px]">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
