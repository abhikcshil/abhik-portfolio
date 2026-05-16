"use client";

import type { CSSProperties } from "react";

type PlanetTrailProps = {
  orbitRadius: number;
  currentAngle: number;
  color: string;
  trailDegrees?: number;
  segmentCount?: number;
};

function toRadians(angleDegrees: number) {
  return (angleDegrees * Math.PI) / 180;
}

function withAlpha(color: string, alpha: number) {
  const safeAlpha = Math.max(0, Math.min(1, alpha));
  const hexMatch = color.match(/^#([\da-f]{3}|[\da-f]{6})$/i);

  if (hexMatch) {
    const hex = hexMatch[1];
    const normalizedHex =
      hex.length === 3
        ? hex
            .split("")
            .map((char) => char + char)
            .join("")
        : hex;
    const red = Number.parseInt(normalizedHex.slice(0, 2), 16);
    const green = Number.parseInt(normalizedHex.slice(2, 4), 16);
    const blue = Number.parseInt(normalizedHex.slice(4, 6), 16);

    return `rgba(${red}, ${green}, ${blue}, ${safeAlpha})`;
  }

  const rgbMatch = color.match(
    /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*[\d.]+\s*)?\)$/i
  );

  if (rgbMatch) {
    const [, red, green, blue] = rgbMatch;

    return `rgba(${red}, ${green}, ${blue}, ${safeAlpha})`;
  }

  return `color-mix(in srgb, ${color} ${safeAlpha * 100}%, transparent)`;
}

function getOpacity(t: number) {
  return Math.pow(1 - t, 1.35);
}

export function PlanetTrail({
  orbitRadius,
  currentAngle,
  color,
  trailDegrees = 132,
  segmentCount = 34,
}: PlanetTrailProps) {
  const points = Array.from({ length: segmentCount + 1 }, (_, index) => {
    const t = index / segmentCount;
    const angle = currentAngle - t * trailDegrees;
    const angleRadians = toRadians(angle);

    return {
      x: Math.cos(angleRadians) * orbitRadius,
      y: Math.sin(angleRadians) * orbitRadius,
      t,
    };
  });

  return (
    <div
      aria-hidden="true"
      className="planet-trail"
      style={
        {
          "--trail-point-color": color,
        } as CSSProperties
      }
    >
      {points.slice(0, -1).map((point, index) => {
        const nextPoint = points[index + 1];
        const dx = nextPoint.x - point.x;
        const dy = nextPoint.y - point.y;
        const length = Math.sqrt(dx * dx + dy * dy) + 2;
        const rotation = (Math.atan2(dy, dx) * 180) / Math.PI;
        const startOpacity = getOpacity(point.t);
        const endOpacity = getOpacity(nextPoint.t);
        const thickness = Math.max(1.4, 3.2 * startOpacity);

        return (
          <span
            key={index}
            className="planet-trail-segment"
            style={{
              width: `${length}px`,
              height: `${thickness}px`,
              opacity: 1,
              background: `linear-gradient(90deg, ${withAlpha(
                color,
                startOpacity
              )}, ${withAlpha(color, endOpacity)})`,
              boxShadow: `0 0 ${6 + 8 * startOpacity}px ${withAlpha(
                color,
                startOpacity * 0.7
              )}`,
              transform: `translate(-50%, -50%) translate(${point.x}px, ${point.y}px) rotate(${rotation}deg)`,
              transformOrigin: "0 50%",
            }}
          />
        );
      })}
    </div>
  );
}
