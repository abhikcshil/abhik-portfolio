import type { CSSProperties } from "react";
import type { Domain } from "@/src/data/domains";

type OrbitRingProps = {
  domain: Domain;
};

export function OrbitRing({ domain }: OrbitRingProps) {
  return (
    <svg
      aria-hidden="true"
      className="orbit-ring"
      viewBox="0 0 100 100"
      style={
        {
          "--ring-size": `${domain.orbitRadius * 2}%`,
          "--guide-color": domain.visual.glow,
          "--guide-opacity": `${Math.max(0.028, domain.orbitLineOpacity * 0.08)}`,
        } as CSSProperties
      }
    >
      <circle className="orbit-guide" cx="50" cy="50" r="48" />
    </svg>
  );
}
