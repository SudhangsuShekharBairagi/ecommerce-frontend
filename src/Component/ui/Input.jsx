export default function Input({ className = "", icon: Icon, ...props }) {
  return (
    <label className="relative block w-full">
      {Icon ? (
        <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
          <Icon className="h-4 w-4" />
        </span>
      ) : null}
      <input
        {...props}
        className={[
          "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100",
          Icon ? "pl-11" : "",
          className,
        ].join(" ")}
      />
    </label>
  );
}
