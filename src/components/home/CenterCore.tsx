export function CenterCore() {
  return (
    <div className="center-sun absolute left-1/2 top-1/2 z-20 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full sm:h-24 sm:w-24">
      <div className="center-sun-corona absolute rounded-full" />
      <div className="center-sun-halo absolute rounded-full" />
      <div className="center-sun-core absolute inset-0 rounded-full" />
      <p className="relative text-sm font-semibold tracking-[0.2em] text-[#241005] drop-shadow-[0_1px_8px_rgba(255,255,255,0.65)] sm:text-base">
        ABHIK
      </p>
    </div>
  );
}
