export function CenterCore() {
  return (
    <div className="center-sun absolute left-1/2 top-1/2 z-20 grid h-[clamp(5.75rem,9vw,8.5rem)] w-[clamp(5.75rem,9vw,8.5rem)] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full">
      <div className="center-sun-corona absolute rounded-full" />
      <div className="center-sun-halo absolute rounded-full" />
      <div className="center-sun-core absolute inset-0 rounded-full" />
      <p className="font-orbit relative whitespace-nowrap px-2 text-[clamp(0.88rem,1.25vw,1.12rem)] font-semibold tracking-[0.18em] text-[#2b1304] drop-shadow-[0_1px_8px_rgba(255,255,255,0.65)]">
        ABHIK
      </p>
    </div>
  );
}
