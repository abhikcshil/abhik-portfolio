type AdminBadgeProps = {
  tone: "slate" | "emerald" | "amber" | "rose" | "cyan";
  children: React.ReactNode;
};

const toneClassName: Record<AdminBadgeProps["tone"], string> = {
  slate: "border-white/10 bg-white/6 text-slate-200",
  emerald: "border-emerald-300/20 bg-emerald-400/10 text-emerald-200",
  amber: "border-amber-300/20 bg-amber-400/10 text-amber-200",
  rose: "border-rose-300/20 bg-rose-400/10 text-rose-200",
  cyan: "border-cyan-300/20 bg-cyan-400/10 text-cyan-200",
};

export function AdminBadge({ tone, children }: AdminBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] ${toneClassName[tone]}`}
    >
      {children}
    </span>
  );
}
