type PlanetVisualProps = {
  className?: string;
};

export function PlanetVisual({ className = "" }: PlanetVisualProps) {
  return (
    <span className={`planet-sphere ${className}`.trim()}>
      <span className="planet-surface absolute inset-0 rounded-full" />
      <span className="planet-detail absolute inset-[7%] rounded-full" />
      <span className="planet-rim-light absolute inset-0 rounded-full" />
      <span className="planet-highlight absolute left-[15%] top-[11%] h-[32%] w-[38%] rounded-full" />
      <span className="planet-specular absolute left-[25%] top-[20%] h-[13%] w-[15%] rounded-full" />
      <span className="planet-shadow absolute inset-0 rounded-full" />
    </span>
  );
}
