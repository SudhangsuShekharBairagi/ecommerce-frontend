const variants = {
  primary:
    "bg-slate-900 text-white shadow-[0_10px_30px_rgba(15,23,42,0.18)] hover:bg-slate-800",
  secondary:
    "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
  accent:
    "bg-linear-to-r from-indigo-600 to-blue-600 text-white shadow-[0_12px_30px_rgba(79,70,229,0.28)] hover:from-indigo-700 hover:to-blue-700",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
  danger: "bg-rose-500 text-white hover:bg-rose-600",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
  xl: "h-14 px-6 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
