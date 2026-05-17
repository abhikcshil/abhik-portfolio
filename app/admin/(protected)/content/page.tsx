export default function AdminContentPage() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
      <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
        Content
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Read-only placeholder
      </h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
        This area is reserved for future project content editing, section
        management, and reusable page composition. Stage 5 keeps it read-only
        while the GitHub-only admin foundation settles in.
      </p>
    </section>
  );
}
