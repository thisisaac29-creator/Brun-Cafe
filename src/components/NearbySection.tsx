"use client";

import { Suspense, use, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

// React preserves a Suspense boundary's server-rendered content while it hydrates.
// Client-side navigations render immediately because they have no existing HTML.
const subscribe = () => () => {};
const clientSnapshot = () => false;
const serverSnapshot = () => true;

function HydrateSection({ ready, children }: { ready: Promise<void>; children: ReactNode }) {
  const hydrating = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  if (typeof window !== "undefined" && hydrating) use(ready);
  return children;
}

export function NearbySection({ children }: { children: ReactNode }) {
  const host = useRef<HTMLDivElement>(null);
  const [gate] = useState(() => {
    let open!: () => void;
    const ready = new Promise<void>(resolve => { open = resolve; });
    return { ready, open };
  });

  useEffect(() => {
    const section = host.current;
    if (!section || !("IntersectionObserver" in window)) {
      gate.open();
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        gate.open();
        observer.disconnect();
      }
    }, { rootMargin: "1000px" });
    observer.observe(section);
    section.addEventListener("focusin", gate.open);
    section.addEventListener("pointerdown", gate.open, { capture: true, passive: true });
    return () => {
      observer.disconnect();
      section.removeEventListener("focusin", gate.open);
      section.removeEventListener("pointerdown", gate.open, true);
    };
  }, [gate]);

  return (
    <div ref={host}>
      <Suspense fallback={null}>
        <HydrateSection ready={gate.ready}>{children}</HydrateSection>
      </Suspense>
    </div>
  );
}
