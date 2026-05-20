const starLayers = [
  "radial-gradient(circle at 12% 18%, rgba(255,255,255,0.84) 0 0.9px, transparent 1.2px), radial-gradient(circle at 71% 12%, rgba(255,255,255,0.58) 0 0.9px, transparent 1.2px), radial-gradient(circle at 88% 42%, rgba(255,255,255,0.64) 0 0.95px, transparent 1.24px), radial-gradient(circle at 19% 78%, rgba(255,255,255,0.5) 0 0.85px, transparent 1.18px)",
  "radial-gradient(circle at 34% 28%, rgba(226,232,240,0.56) 0 0.78px, transparent 1.1px), radial-gradient(circle at 63% 67%, rgba(203,213,225,0.46) 0 0.78px, transparent 1.08px), radial-gradient(circle at 7% 52%, rgba(203,213,225,0.38) 0 0.72px, transparent 1.02px), radial-gradient(circle at 94% 85%, rgba(226,232,240,0.48) 0 0.82px, transparent 1.12px)",
];

export function Starfield() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="star-layer absolute inset-[-6%] opacity-80"
        style={{ backgroundImage: starLayers[0], backgroundSize: "420px 420px" }}
      />
      <div
        className="star-layer star-layer-slow absolute inset-[-6%] opacity-52"
        style={{ backgroundImage: starLayers[1], backgroundSize: "620px 620px" }}
      />
      <div className="space-vignette absolute inset-0" />
    </div>
  );
}
