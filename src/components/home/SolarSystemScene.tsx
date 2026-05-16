import { CenterCore } from "./CenterCore";
import { DomainPlanet } from "./DomainPlanet";
import { OrbitRing } from "./OrbitRing";
import { Starfield } from "./Starfield";
import { domains } from "@/src/data/domains";

export function SolarSystemScene() {
  return (
    <main className="relative h-dvh w-dvw overflow-hidden bg-[#030407] text-neutral-100">
      <Starfield />

      <div aria-hidden="true" className="space-ambient pointer-events-none absolute inset-0" />

      <section
        aria-label="Portfolio domains"
        className="relative z-10 grid h-full w-full place-items-center px-5"
      >
        <div className="solar-perspective relative aspect-square w-[min(124vmin,1280px)] min-w-[390px]">
          <div className="orbit-path-layer">
            {domains.map((domain) => (
              <OrbitRing key={domain.id} domain={domain} />
            ))}
          </div>

          <div className="planet-overlay">
            {domains.map((domain) => (
              <DomainPlanet key={domain.id} domain={domain} />
            ))}
          </div>

          <CenterCore />
        </div>
      </section>
    </main>
  );
}
