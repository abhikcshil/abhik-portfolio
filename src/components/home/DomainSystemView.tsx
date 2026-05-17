"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import type { Domain } from "@/src/data/domains";
import type { ProjectMoon as ProjectMoonData } from "@/src/data/projects";
import { getOrbitAngle, getOrbitUnitPosition } from "./orbitMath";
import { PlanetVisual } from "./PlanetVisual";
import { ProjectMoon } from "./ProjectMoon";
import { DEFAULT_SCENE_SIZE, getSceneSize } from "./sceneSizing";

type DomainSystemViewProps = {
  domain: Domain;
  moons: ProjectMoonData[];
  onBack: () => void;
  isVisible: boolean;
  reduceMotion: boolean;
};

export function DomainSystemView({
  domain,
  moons,
  onBack,
  isVisible,
  reduceMotion,
}: DomainSystemViewProps) {
  const [sceneSize, setSceneSize] = useState(DEFAULT_SCENE_SIZE);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    function updateSceneSize() {
      setSceneSize(getSceneSize());
    }

    updateSceneSize();
    window.addEventListener("resize", updateSceneSize);

    return () => window.removeEventListener("resize", updateSceneSize);
  }, []);

  useEffect(() => {
    if (reduceMotion || !isVisible) {
      return;
    }

    let frameId = 0;
    const startTime = performance.now();

    function tick(now: number) {
      setElapsedSeconds((now - startTime) / 1000);
      frameId = requestAnimationFrame(tick);
    }

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [isVisible, reduceMotion]);

  const systemScale = Math.max(0.86, Math.min(sceneSize / 870, 1.22));
  const centralSize = Math.max(148, Math.min(sceneSize * 0.225, 208));
  const labelVisibility = sceneSize < 600 ? "compact" : "full";

  const orbitRadii = useMemo(
    () =>
      Array.from(
        new Set(
          moons.map((moon) => Math.round(moon.orbitRadius * systemScale))
        )
      ).sort((a, b) => a - b),
    [moons, systemScale]
  );

  return (
    <div className="domain-system-view absolute inset-0">
      <button
        type="button"
        onClick={onBack}
        className="domain-system-back"
        aria-label="Return to the main solar system"
      >
        <span aria-hidden="true">&larr;</span>
        <span>Back to system</span>
      </button>

      <div className="domain-system-copy">
        <p className="domain-system-kicker">Domain Focus</p>
        <h2 className="domain-system-title">{domain.label}</h2>
        <p className="domain-system-description">
          Project moons orbiting the {domain.label.toLowerCase()} body.
        </p>
      </div>

      <div className="domain-system-stage absolute inset-0">
        {orbitRadii.map((radius) => (
          <span
            key={radius}
            aria-hidden="true"
            className="domain-system-orbit"
            style={
              {
                width: `${radius * 2}px`,
                height: `${radius * 2}px`,
              } as CSSProperties
            }
          />
        ))}

        <div
          className={`domain-focus-planet ${
            isVisible ? "domain-focus-planet-visible" : ""
          }`}
          style={
            {
              "--planet-surface": domain.visual.surface,
              "--planet-detail": domain.visual.detail,
              "--planet-rim": domain.visual.rim,
              "--planet-glow": domain.visual.glow,
              "--planet-label": domain.visual.label,
              width: `${centralSize}px`,
              height: `${centralSize}px`,
            } as CSSProperties
          }
        >
          <span className="domain-focus-halo absolute inset-[-22%] rounded-full" />
          <PlanetVisual className="absolute inset-0 block rounded-full" />
          <span className="domain-focus-label absolute left-1/2 top-full mt-5 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em]">
            {domain.label}
          </span>
        </div>

        {moons.map((moon, index) => {
          const orbitRadius = moon.orbitRadius * systemScale;
          const angle =
            reduceMotion || !moon.orbitDuration
              ? moon.initialAngle
              : getOrbitAngle(
                  moon.initialAngle,
                  moon.orbitDuration,
                  elapsedSeconds
                );
          const position = getOrbitUnitPosition(angle);
          // Labels stay upright because the orbiting moon itself is translated
          // in screen space rather than rotated as part of a shared ring wrapper.
          const x = position.x * orbitRadius;
          const y = position.y * orbitRadius;

          return (
            <ProjectMoon
              key={moon.id}
              moon={{ ...moon, moonSize: moon.moonSize * systemScale }}
              x={x}
              y={y}
              index={index}
              isVisible={isVisible}
              labelVisibility={labelVisibility}
            />
          );
        })}
      </div>
    </div>
  );
}
