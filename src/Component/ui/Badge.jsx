const tones = {
  slate: "bg-slate-100 text-slate-700 ring-1 ring-slate-200",
  indigo: "bg-indigo-100 text-indigo-700 ring-1 ring-indigo-200",
  emerald: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
  amber: "bg-amber-100 text-amber-700 ring-1 ring-amber-200",
  rose: "bg-rose-100 text-rose-700 ring-1 ring-rose-200",
};

export default function Badge({ children, tone = "slate", className = "" }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]",
        tones[tone] || tones.slate,
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
