"use client";

import Link from "next/link";
import type { CSSProperties, FocusEventHandler, MouseEventHandler } from "react";
import type { PortfolioProject } from "@/src/data/portfolio";
import type { MoonLayout } from "@/src/lib/portfolio";
import { PlanetVisual } from "./PlanetVisual";

type ProjectMoonProps = {
  project: PortfolioProject;
  layout: MoonLayout;
  x: number;
  y: number;
  index: number;
  isVisible: boolean;
  labelVisibility: "full" | "compact";
  onPreviewStart?: (projectId: string) => void;
  onPreviewEnd?: () => void;
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
  project,
  layout,
  x,
  y,
  index,
  isVisible,
  labelVisibility,
  onPreviewStart,
  onPreviewEnd,
}: ProjectMoonProps) {
  const visual = getMoonVisual(layout.color ?? "rgba(148, 163, 184, 0.88)");
  const handleMouseEnter: MouseEventHandler<HTMLAnchorElement> = () => {
    onPreviewStart?.(project.id);
  };
  const handleMouseLeave: MouseEventHandler<HTMLAnchorElement> = () => {
    onPreviewEnd?.();
  };
  const handleFocus: FocusEventHandler<HTMLAnchorElement> = () => {
    onPreviewStart?.(project.id);
  };
  const handleBlur: FocusEventHandler<HTMLAnchorElement> = () => {
    onPreviewEnd?.();
  };

  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`Open ${layout.displayLabel} project`}
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
          width: `${layout.moonSize}px`,
          height: `${layout.moonSize}px`,
          transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
          transitionDelay: `${index * 48}ms`,
        } as CSSProperties
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <PlanetVisual className="absolute inset-0 block rounded-full transition duration-300 group-hover:scale-110 group-focus-visible:scale-110" />
      <span
        className={`project-moon-tag-stack ${
          labelVisibility === "compact" ? "mt-2" : "mt-3"
        }`}
      >
        <span
          className={`project-moon-label whitespace-nowrap rounded-full px-3 py-1.5 ${
            labelVisibility === "compact" ? "text-[0.6rem]" : "text-[0.66rem]"
          }`}
        >
          {layout.displayLabel}
        </span>
        <span className="orbit-tag-hint mt-1.5">Click to view more</span>
      </span>
    </Link>
  );
}
