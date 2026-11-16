# BRÜN mobile JavaScript investigation

## What blocked the main thread

A cold production homepage load in Chrome with DevTools mobile throttling and V8 CPU sampling showed two distinct costs after first contentful paint (FCP). The first was synchronous Next.js and React startup. The second was browser style calculation and layout of the document. The single trace measures wall time under throttling. Lighthouse's simulated TBT is a separate measurement.

| Start after navigation | Start relative to FCP | Duration | Dominant work in the original build |
|---:|---:|---:|---|
| 922 ms | −2,076 ms | 740 ms | 677 ms in native layout |
| 1,719 ms | −1,279 ms | 1,255 ms | 860 ms in layout and 303 ms updating the layout tree |
| 3,217 ms | +218 ms | 578 ms | 576 ms evaluating the webpack runtime, with 419 ms sampled at the module loader in column 59. The call tree includes React DOM module 9248 and Next bootstrap modules 2669 and 5448. |
| 3,978 ms | +980 ms | 169 ms | Inline script and microtasks, including initial router state creation |
| 4,571 ms | +1,573 ms | 117 ms | 100 ms in native layout |
| 5,278 ms | +2,279 ms | 569 ms | 353 ms in layout and 187 ms updating the layout tree |

The first two rows delay the first paint and precede the TBT measurement window. The webpack function invokes module factories, so its sampled time cannot be assigned entirely to webpack overhead. An independent trace without CPU sampling also recorded a 498 ms bootstrap task. The framework work enables routing and critical controls. The later layout task has no dominant JavaScript frame identifying one responsible component. The empty embedded map document was observable in the original trace, but the data cannot attribute the document layout cost to that frame alone.

The application source has no GSAP or ScrollTrigger initialization. The gallery lightbox and full menu search are on their respective routes. The sampled homepage startup stack gives no evidence that those features or a video event handler caused the 286 ms historical regression. The previous source revision was unavailable. The unmodified current build produced 325–1,047 ms mobile TBT on five runs, spanning the historical 856 ms. The original regression's cause remains unproven.

## Implementation and experiments

- **HeroCinematic.tsx and globals.css.** One reveal state handles the loader event, with one fallback timer. CSS delays preserve the reveal sequence and remove delays under reduced motion. This eliminates three staged React timer updates. The video, poster, perspective selector and pause control remain in the initial experience.
- **MapFrame.tsx and media-audit.cjs.** The page reserves map space and creates the iframe within 400 px of the viewport. The interaction check scrolls the map host and verifies the embedded URL.
- **page.tsx and Footer.tsx.** Offscreen journal and footer content use browser layout containment with responsive intrinsic sizes. Containment on the map section caused a WebKit activation failure in the first candidate and was rolled back.
- **Bundler experiment.** With identical application source, Turbopack yielded a three-run median TBT of 545 ms and transferred 172,107 script bytes, compared with 382 ms and 170,999 bytes for the webpack baseline. The production build uses webpack.
- **Lower-section split experiment.** Splitting five lower sections with React.lazy reduced transferred scripts to 164,799 bytes and the sampled bootstrap task to 485 ms. Both this build and the final build contained five streamed HTML fragments, so their presence alone does not explain the difference. A later style/layout task lasted 841 ms, and five-run median TBT rose to 453 ms. The final implementation restores server-rendered sections with existing proximity-based hydration. Gallery, menu and secondary media retain their existing route or viewport boundaries.
- **Profiling artifacts.** scripts/profile-tasks.cjs extracts every sampled main-thread task over 50 ms. The JSON files give navigation and FCP offsets, dominant nested events and CPU samples. The CSV includes the device benchmark so run-to-run CPU variability can be inspected.

## Measurement conditions

All tests used local Next.js production servers on the same Windows host. Scoring runs used Lighthouse mobile defaults or the desktop preset in headless Chrome. Each reported before and final median uses five cold navigations per device. The first two fresh baseline runs overlapped with a separate trace capture. The final sequence ran serially. The throttled CPU profiles are diagnostic samples and cannot establish statistical significance. Public CDN delivery, physical phone performance, field INP and frame-by-frame visual parity were outside these measurements.

Lighthouse 13.6.0 recorded the diagnostic traces at 4× CPU slowdown, 562.5 ms request latency and 1,475 Kbps download. The final trace again identified the webpack loader (926 ms task, 279 ms after FCP) and whole-document style/layout (1,145 ms task, 2,027 ms after FCP). The host CPU benchmark was 493 for that trace, 685.5 before changes, and 1,089.5 during the split experiment. Those differences limit any causal interpretation of individual trace durations. The repeated call stacks identify the bottlenecks more reliably than a single before/after timing. Further reductions would require cutting startup module execution or reducing the document rendering work. Neither controlled experiment established an improvement from moving the existing code to different chunks.

## Five-run medians

| Metric | Historical | Fresh baseline | Final | Target |
|---|---:|---:|---:|---:|
| Mobile performance | 78 | 84 | 72 | ≥90 |
| Mobile LCP | 2.48 s | 3.06 s | 2.77 s | ≤2.50 s |
| Mobile TBT | 856 ms | 382 ms | 1,244 ms | ≤200 ms |
| Mobile CLS | 0 | 0.019 | 0.000 | ≤0.1 |
| Desktop performance | 100 | 100 | 97 | ≥90 |

Final mobile TBT ranged from 1,023 to 2,583 ms and performance from 65 to 75. Median script evaluation rose from 878 to 1,374 ms. Initial script transfer was effectively unchanged at 171,010 bytes versus 170,999. Median mobile CPU benchmark fell from 1,067 to 511.5. The two mobile benchmark ranges do not overlap. The results establish that the final build missed the targets under test. They cannot separate implementation effects from host speed. The final results do not establish mobile recovery or preservation of the historical 2.48 s LCP.

## Functional verification

The production build prerendered all six public routes. Lint and type checking passed. Chromium, Firefox and WebKit passed navigation, menu search, gallery lightbox keyboard controls and all nine responsive widths on all routes. WebKit's gallery resize initially timed out and passed on repeat. All three engines passed hero playback, perspective switching, pause, lower video activation, featured filtering and scroll-to-map activation. The tests check the map iframe URL and dimensions rather than Google tile delivery.

Save-Data suppressed automatic MP4 requests. Explicit playback then passed in Chromium and WebKit. Firefox timed out twice in the full sequence, including after closing the earlier media page. A fresh, isolated Firefox Save-Data session played the correct mobile clip on the first click, reaching 3.77 seconds with the Pause control visible. That discrepancy remains open. The loader session flag and reduced-motion poster were exercised. Precise reveal timings and scroll animation fidelity were not independently compared frame by frame.
