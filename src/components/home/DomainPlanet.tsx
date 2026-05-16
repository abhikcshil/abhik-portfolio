"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import type { Domain } from "@/src/data/domains";
import { getOrbitAngle, getOrbitUnitPosition } from "./orbitMath";
import { PlanetTrail } from "./PlanetTrail";

type DomainPlanetProps = {
  domain: Domain;
};

const DEFAULT_SCENE_SIZE = 960;

function getSceneSize() {
  return Math.max(
    390,
    Math.min(Math.min(window.innerWidth, window.innerHeight) * 1.24, 1280)
  );
}

export function DomainPlanet({ domain }: DomainPlanetProps) {
  const [currentAngle, setCurrentAngle] = useState(domain.initialAngle);
  const [sceneSize, setSceneSize] = useState(DEFAULT_SCENE_SIZE);

  useEffect(() => {
    function updateSceneSize() {
      setSceneSize(getSceneSize());
    }

    updateSceneSize();
    window.addEventListener("resize", updateSceneSize);

    return () => window.removeEventListener("resize", updateSceneSize);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) {
      return;
    }

    let frameId = 0;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = (now - startTime) / 1000;
      setCurrentAngle(
        getOrbitAngle(domain.initialAngle, domain.orbitDuration, elapsed)
      );

      frameId = requestAnimationFrame(tick);
    }

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [domain.initialAngle, domain.orbitDuration]);

  // The trail and planet both derive from this same live angle so the tail
  // always follows the current orbital position instead of rotating separately.
  const orbitPosition = getOrbitUnitPosition(currentAngle);
  const orbitRadius = sceneSize * (domain.orbitRadius / 100);
  const planetX = `${orbitPosition.x * orbitRadius}px`;
  const planetY = `${orbitPosition.y * orbitRadius}px`;

  return (
    <div
      className="planet-orbit absolute inset-0"
      style={
        {
          "--planet-x": planetX,
          "--planet-y": planetY,
          "--planet-surface": domain.visual.surface,
          "--planet-detail": domain.visual.detail,
          "--planet-rim": domain.visual.rim,
          "--planet-glow": domain.visual.glow,
          "--planet-label": domain.visual.label,
          zIndex: domain.zIndexHint,
        } as CSSProperties
      }
    >
      <PlanetTrail
        orbitRadius={orbitRadius}
        currentAngle={currentAngle}
        color={domain.visual.glow}
      />
      <Link
        href={domain.href}
        aria-label={`Go to ${domain.label}`}
        className="planet-link group absolute rounded-full outline-none"
        style={{ width: domain.planetSize, height: domain.planetSize }}
      >
        <span className="planet-billboard absolute inset-0 block rounded-full">
          <span className="planet-sphere absolute inset-0 block rounded-full transition duration-300 group-hover:scale-110 group-focus-visible:scale-110">
            <span className="planet-surface absolute inset-0 rounded-full" />
            <span className="planet-detail absolute inset-[7%] rounded-full" />
            <span className="planet-rim-light absolute inset-0 rounded-full" />
            <span className="planet-highlight absolute left-[15%] top-[11%] h-[32%] w-[38%] rounded-full" />
            <span className="planet-specular absolute left-[25%] top-[20%] h-[13%] w-[15%] rounded-full" />
            <span className="planet-shadow absolute inset-0 rounded-full" />
          </span>
          <span className="planet-label pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.18em] transition duration-300 group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5">
            {domain.label}
          </span>
        </span>
      </Link>
    </div>
  );
}
