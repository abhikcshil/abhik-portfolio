"use client";

import Link from "next/link";
import {
  useEffect,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import type { Domain } from "@/src/data/domains";
import { getOrbitAngle, getOrbitUnitPosition } from "./orbitMath";
import { PlanetTrail } from "./PlanetTrail";
import { PlanetVisual } from "./PlanetVisual";
import { DEFAULT_SCENE_SIZE, getSceneSize } from "./sceneSizing";

type DomainPlanetProps = {
  domain: Domain;
  onOpenDomain?: (
    domainId: string,
    focusPoint: { x: number; y: number }
  ) => void;
};

export function DomainPlanet({ domain, onOpenDomain }: DomainPlanetProps) {
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

  const orbitPosition = getOrbitUnitPosition(currentAngle);
  const orbitRadius = sceneSize * (domain.orbitRadius / 100);
  const planetPoint = {
    x: orbitPosition.x * orbitRadius,
    y: orbitPosition.y * orbitRadius,
  };
  const planetX = `${planetPoint.x}px`;
  const planetY = `${planetPoint.y}px`;

  function openDomainSystem() {
    onOpenDomain?.(domain.id, planetPoint);
  }

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (
      !onOpenDomain ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }

    event.preventDefault();
    openDomainSystem();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLAnchorElement>) {
    if (!onOpenDomain || event.key !== " ") {
      return;
    }

    event.preventDefault();
    openDomainSystem();
  }

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
        aria-label={
          onOpenDomain
            ? `Open ${domain.label} project system`
            : `Go to ${domain.label}`
        }
        className="planet-link group rounded-full outline-none"
        style={{ width: domain.planetSize, height: domain.planetSize }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <span className="planet-billboard absolute inset-0 block rounded-full">
          <PlanetVisual className="absolute inset-0 block rounded-full transition duration-300 group-hover:scale-110 group-focus-visible:scale-110" />
          <span className="planet-label pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.18em] transition duration-300 group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5">
            {domain.label}
          </span>
        </span>
      </Link>
    </div>
  );
}
