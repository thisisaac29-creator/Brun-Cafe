# BRÜN mobile performance recovery

**Readiness assessment — Not yet ready.** The final production build serves all six routes. Desktop met every requested Lighthouse target. Mobile met the median LCP target and recorded zero CLS across five runs. Its median performance score was 78 and median blocking time was 856 ms. Every mobile run exceeded the preferred 200 ms blocking budget.

## Measurements

Each cell gives the median of five cold homepage navigations, followed by the minimum and maximum. Lighthouse 13.6 used serial runs, fresh headless Chrome profiles, storage reset and simulated throttling on loopback. Mobile used a 412 × 823 viewport, 150 ms RTT, 1,638 kbps and 4× CPU slowdown. Desktop used 1350 × 940, 40 ms RTT, 10,240 kbps and 1× CPU. All runs used the real production interface, media and motion settings. The raw observations cover the fresh baseline and four implementation stages in performance-runs.csv.

| Metric | Mobile baseline | Mobile final | Desktop baseline | Desktop final |
|---|---:|---:|---:|---:|
| Performance | 73 (67–76) | 78 (71–82) | 98 (98–99) | 100 (96–100) |
| LCP, s | 4.47 (3.61–4.55) | 2.48 (1.68–3.18) | 0.96 (0.95–1.00) | 0.55 (0.43–0.66) |
| FCP, s | 1.17 (1.12–1.39) | 1.13 (0.93–1.30) | 0.36 (0.29–0.37) | 0.33 (0.27–0.37) |
| Speed Index, s | 2.49 (2.03–2.95) | 2.58 (2.28–2.93) | 0.93 (0.77–1.03) | 0.94 (0.87–0.96) |
| TBT, ms | 570 (370–659) | 856 (597–1,707) | 34 (20–50) | 35 (30–159) |
| CLS | 0 (0–0.021) | 0 (0–0) | 0 (0–0) | 0 (0–0) |
| Accessibility | 95 (95–95) | 98 (98–98) | 95 (95–95) | 95 (95–95) |
| Best Practices | 96 (96–96) | 96 (96–96) | 96 (96–96) | 96 (96–96) |
| SEO | 100 (100–100) | 100 (100–100) | 100 (100–100) | 100 (100–100) |

| Median cost | Mobile baseline → final | Desktop baseline → final |
|---|---:|---:|
| All transferred resources | 3.112 → 2.127 MB | 3.101 → 2.924 MB |
| JavaScript transfer | 189.8 → 171.0 kB | 197.2 → 171.0 kB |
| Script evaluation | 1,109 → 1,233 ms | 341 → 284 ms |
| Images | 366.9 → 225.7 kB | 333.0 → 215.7 kB |
| Video transfer | 2.423 → 1.616 MB | 2.423 → 2.423 MB |
| Fonts | 77.6 → 77.6 kB | 77.6 → 77.6 kB |

The earlier single desktop score of 92 did not reproduce as a persistent regression. The fresh baseline ranged from 98 to 99. The final range was 96 to 100. The CPU benchmark reported by Chrome varied across sessions, including slower-host warnings. Timing differences between stages cannot all be assigned to individual code changes. The byte counts and request URLs provide independent evidence of the loading changes. Field INP was not measured.

## Root causes and experiments

The hero poster image was the mobile LCP element. The baseline requested it at low priority. In the observed trace, the median LCP phases were 16 ms TTFB, 63 ms resource delay, 21 ms transfer and 334 ms render delay. The final medians were 24, 108, 32 and 279 ms respectively. Render delay remained the largest phase. Lighthouse derives its headline LCP from a throttling simulation, so the trace phase times do not sum to the headline value.

The baseline also fetched three offscreen posters before scrolling. An intermediate trace showed unrelated route chunks and Google Maps scripts executing during cold navigation. Three of five mobile runs at the section-rendering stage transferred third-party resources. The final mobile runs reported zero third-party bytes. The simulated long-task lists still included substantial work attributed to the document and shared Next.js runtime. They do not identify a single React component as the cause of the remaining TBT. No active GSAP/ScrollTrigger initialization was identified on the critical path.

The media pass reached a mobile median of 85, 2.14 s LCP and 400 ms TBT. The first section-rendering experiment measured 69, 1.72 s and 1,182 ms. The map and navigation changes measured 75, 1.84 s and 1,229 ms. The final viewport hydration pass measured 78, 2.48 s and 856 ms. The final result missed the mobile score and TBT budgets, and its median TBT exceeded the fresh baseline.

## Implementation

- HeroCinematic.tsx prioritizes the poster, presents it until playback starts, selects the mobile encode below 601 px and updates the scroll transform without rerendering the entire hero on each frame. The 23-second 9:16 film retains its full sequence. The mobile encode is 432 × 768 and 1,615,137 bytes. The original desktop encode is 576 × 1024 and 2,422,497 bytes. The poster went from 35,080-byte JPEG to 25,583-byte AVIF. The default film has no audio stream, so its control now identifies silent footage.
- useNearbyPoster.ts, mediaPreferences.ts, EditorialPillars.tsx, VideoStorySection.tsx, ScrollExpansionSection.tsx and ManifestoSection.tsx coordinate nearby posters, scroll listeners and automatic playback. Reduced motion and Save-Data visitors retain manual play controls.
- The homepage and HomeSignatureMenu.tsx select and format featured menu records on the server. site-config.ts separates shared business information from the menu and gallery datasets while preserving the site-data.ts exports. Header, Footer, JsonLd and MapModule use the smaller import.
- NearbySection.tsx keeps five lower sections in the initial HTML, defers their initial hydration until the visitor approaches or interacts, and preserves ordinary rendering on client navigation. Their reserved heights came from measurements at mobile, tablet and desktop widths. Kinderhome and the featured-menu filters remain interactive.
- MapFrame.tsx loads the existing map when it approaches the viewport. Header, Footer, Wordmark and hero links avoid speculative route downloads. Navigation loads its destination on demand. PageTransition.tsx moves keyboard focus into main content on route changes, and GalleryGrid.tsx closes the native dialog before unmounting.
- globals.css uses a prerendered tile of the existing grain effect. The local Latin normal and italic WOFF2 files, font-display swap, Helvetica Neue fallback stack, masonry layout, page curtain, branded loader, editorial typography and video placements are retained. Higher-contrast colors were applied to the four labels identified by the mobile audit.

## Verification and release gaps

The final production build, TypeScript validation and lint passed. The prerendered homepage contains the lower-page sections. The browser and media scripts cover the six routes, nine requested widths, navigation, menu search, gallery dialog, lower-page interaction and media loading. Chrome, Edge, Firefox and Windows Playwright WebKit passed all six routes at 320, 360, 390, 430, 768, 1024, 1280, 1440 and 1920 px. This covered 216 route–width checks and exercised mobile navigation, client-side navigation and browser back, menu search, and keyboard lightbox dismissal. Separate media tests passed in Chrome, Firefox and WebKit for the hero switcher, pause, all three lower-page videos, featured-menu filtering, map activation and manual playback under Save-Data. The WebKit native player did not expose its media requests to Playwright; its selected source, playback time and offscreen ready states were verified directly. Chrome and Firefox exposed the expected single MP4 request before scrolling. Screenshots at 390 and 1440 px confirmed the footage and editorial hero composition.

The production dependency audit reported zero known advisories. All seven moderate development-tree entries traced to the same minimatch glob-amplification advisory in TypeScript ESLint. The installed nested version is 10.2.6. Repository linting uses project-defined patterns. The registry suggested a breaking dependency resolution, which was left unapplied. [Advisory](https://github.com/advisories/GHSA-g3hv-75wg-m249)

The canonical hostname failed DNS resolution from the test host. Public HTTPS, CDN caching, compression, range delivery, deployed routes, and field INP remain unverified. Windows WebKit supplies engine coverage only. Physical iOS and Android devices and a human screen-reader session remain outstanding. The default hero and atmosphere film are silent. Five other referenced videos contain AAC audio and have no caption tracks; the significance of speech or other audio requires review. Desktop accessibility findings include contrast, heading order and visible-label/accessible-name mismatches.
