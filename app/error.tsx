"use client";

import { useEffect } from "react";

type GlobalErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalErrorPage({
  error,
  reset,
}: GlobalErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#030407] px-6 py-16 text-slate-100">
      <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
          Unexpected Error
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
          Something drifted off course.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
          The portfolio hit an unexpected problem while loading this route.
          Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex rounded-full border border-white/12 bg-white/8 px-5 py-3 text-sm font-medium uppercase tracking-[0.18em] text-slate-100 transition hover:border-white/24 hover:bg-white/12"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
