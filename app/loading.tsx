export default function Loading() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#030407] px-6 py-16 text-slate-100">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
          Loading
        </p>
        <div className="mx-auto mt-5 h-2 w-24 overflow-hidden rounded-full bg-white/8">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-sky-300/70" />
        </div>
        <p className="mt-5 text-sm leading-6 text-slate-300">
          Preparing the portfolio view.
        </p>
      </div>
    </main>
  );
}
