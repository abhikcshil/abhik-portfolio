"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { CenterCore } from "./CenterCore";
import { DomainPlanet } from "./DomainPlanet";
import { DomainSystemView } from "./DomainSystemView";
import { OrbitRing } from "./OrbitRing";
import { Starfield } from "./Starfield";
import { domains } from "@/src/data/domains";
import { projectMoonsByDomain } from "@/src/data/projects";

type FocusPoint = {
  x: number;
  y: number;
};

const DETAIL_EXIT_DURATION_MS = 680;

export function SolarSystemScene() {
  const [selectedDomainId, setSelectedDomainId] = useState<string | null>(null);
  const [isDomainFocused, setIsDomainFocused] = useState(false);
  const [focusPoint, setFocusPoint] = useState<FocusPoint>({ x: 0, y: 0 });
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReduceMotion(mediaQuery.matches);

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);

    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  const selectedDomain = useMemo(
    () => domains.find((domain) => domain.id === selectedDomainId) ?? null,
    [selectedDomainId]
  );

  function handleOpenDomain(domainId: string, nextFocusPoint: FocusPoint) {
    if (selectedDomainId) {
      return;
    }

    setSelectedDomainId(domainId);
    setFocusPoint(nextFocusPoint);

    if (reduceMotion) {
      setIsDomainFocused(true);
      return;
    }

    requestAnimationFrame(() => setIsDomainFocused(true));
  }

  function handleCloseDomain() {
    if (reduceMotion) {
      setIsDomainFocused(false);
      setSelectedDomainId(null);
      return;
    }

    setIsDomainFocused(false);
    window.setTimeout(() => {
      setSelectedDomainId(null);
    }, DETAIL_EXIT_DURATION_MS);
  }

  return (
    <main className="relative h-dvh w-dvw overflow-hidden bg-[#030407] text-neutral-100">
      <Starfield />

      <div
        aria-hidden="true"
        className="space-ambient pointer-events-none absolute inset-0"
      />

      <section
        aria-label="Portfolio domains"
        className="relative z-10 grid h-full w-full place-items-center px-5"
      >
        <div
          className="scene-stage relative h-full w-full"
          style={
            {
              "--focus-x": `${focusPoint.x}px`,
              "--focus-y": `${focusPoint.y}px`,
            } as CSSProperties
          }
        >
          <div
            className={`solar-system-layer absolute inset-0 ${
              isDomainFocused ? "solar-system-layer-focused" : ""
            }`}
          >
            <div className="relative grid h-full w-full place-items-center">
              <div className="home-system-positioner">
                <div className="solar-perspective relative aspect-square w-[min(124vmin,1280px)] min-w-[390px]">
                  <div className="orbit-path-layer">
                    {domains.map((domain) => (
                      <OrbitRing key={domain.id} domain={domain} />
                    ))}
                  </div>

                  <div className="planet-overlay">
                    {domains.map((domain) => (
                      <DomainPlanet
                        key={domain.id}
                        domain={domain}
                        onOpenDomain={handleOpenDomain}
                      />
                    ))}
                  </div>

                  <CenterCore />
                </div>
              </div>
            </div>
          </div>

          {selectedDomain && (
            <div
              className={`domain-system-layer absolute inset-0 ${
                isDomainFocused ? "domain-system-layer-visible" : ""
              }`}
            >
              <DomainSystemView
                domain={selectedDomain}
                moons={projectMoonsByDomain[selectedDomain.id]}
                onBack={handleCloseDomain}
                isVisible={isDomainFocused}
                reduceMotion={reduceMotion}
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
