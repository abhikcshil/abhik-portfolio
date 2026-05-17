"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { ProjectMoon } from "@/src/data/projects";
import { PlanetVisual } from "./PlanetVisual";

type ProjectMoonProps = {
  moon: ProjectMoon;
  x: number;
  y: number;
  index: number;
  isVisible: boolean;
  labelVisibility: "full" | "compact";
};

function getMoonVisual(color: string) {
  return {
    surface: `radial-gradient(circle at 24% 20%, rgba(255,255,255,0.96) 0 10%, color-mix(in srgb, ${color}, white 36%) 23%, ${color} 56%, rgba(2,6,23,0.96) 100%)`,
    detail: `radial-gradient(ellipse at 66% 34%, color-mix(in srgb, ${color}, white 52%) 0 18%, transparent 44%), linear-gradient(125deg, transparent 0 36%, color-mix(in srgb, ${color}, white 18%) 37% 44%, transparent 45% 100%)`,
    rim: `color-mix(in srgb, ${color}, white 50%)`,
    glow: `color-mix(in srgb, ${color}, transparent 24%)`,
  };
}

export function ProjectMoon({
  moon,
  x,
  y,
  index,
  isVisible,
  labelVisibility,
}: ProjectMoonProps) {
  const visual = getMoonVisual(moon.color ?? "rgba(148, 163, 184, 0.88)");

  return (
    <Link
      href={moon.href}
      aria-label={`Open ${moon.label} project`}
      className={`project-moon group absolute rounded-full outline-none ${
        isVisible ? "project-moon-visible" : ""
      }`}
      style={
        {
          "--planet-surface": visual.surface,
          "--planet-detail": visual.detail,
          "--planet-rim": visual.rim,
          "--planet-glow": visual.glow,
          "--planet-label": visual.rim,
          width: `${moon.moonSize}px`,
          height: `${moon.moonSize}px`,
          transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
          transitionDelay: `${index * 48}ms`,
        } as CSSProperties
      }
    >
      <PlanetVisual className="absolute inset-0 block rounded-full transition duration-300 group-hover:scale-110 group-focus-visible:scale-110" />
      <span
        className={`project-moon-label pointer-events-none absolute left-1/2 top-full -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 uppercase ${
          labelVisibility === "compact"
            ? "mt-2 text-[0.62rem] tracking-[0.12em]"
            : "mt-3 text-[0.68rem] tracking-[0.14em]"
        }`}
      >
        {moon.label}
      </span>
    </Link>
  );
}
