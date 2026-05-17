import type { CSSProperties } from "react";
import type { PortfolioDomain } from "@/src/data/portfolio";

type OrbitRingProps = {
  domain: PortfolioDomain;
};

export function OrbitRing({ domain }: OrbitRingProps) {
  return (
    <svg
      aria-hidden="true"
      className="orbit-ring"
      viewBox="0 0 100 100"
      style={
        {
          "--ring-size": `${(domain.visual.orbitRadius ?? 0) * 2}%`,
          "--guide-color": domain.visual.glow,
          "--guide-opacity": `${Math.max(
            0.028,
            (domain.visual.orbitLineOpacity ?? 0.4) * 0.08
          )}`,
        } as CSSProperties
      }
    >
      <circle className="orbit-guide" cx="50" cy="50" r="48" />
    </svg>
  );
}
