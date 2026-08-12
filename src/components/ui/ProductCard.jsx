import { FiShoppingCart, FiStar } from "react-icons/fi";
import Button from "./Button";
import Badge from "./Badge";

export default function ProductCard({ product, onView, onAddToCart }) {
  const imageUrl =
    product?.imageUrl ||
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80";
  const isAvailable = product?.available !== false;

  return (
    <article className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_50px_-25px_rgba(15,23,42,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-20px_rgba(79,70,229,0.25)]">
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-100 via-white to-indigo-50 p-4">
        <img
          src={imageUrl}
          alt={product?.name || "Product"}
          loading="lazy"
          className="h-60 w-full rounded-[22px] object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-6 top-6 flex gap-2">
          <Badge tone="indigo">New</Badge>
          {product?.discount ? (
            <Badge tone="amber">-{product.discount}%</Badge>
          ) : null}
        </div>
        <div className="absolute right-6 top-6">
          <Badge tone={isAvailable ? "emerald" : "rose"}>
            {isAvailable ? "In Stock" : "Sold Out"}
          </Badge>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              {product?.brand || "Premium"}
            </span>
            <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-amber-600">
              <FiStar className="text-xs" />
              <span className="text-xs font-semibold">
                {product?.rating || 4.8}
              </span>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-slate-900">
            {product?.name || "Product name"}
          </h3>
        </div>

        <p className="line-clamp-2 text-sm leading-6 text-slate-600">
          {product?.description ||
            "A premium product designed to fit seamlessly into modern life."}
        </p>

        <div className="flex items-end justify-between gap-3 pt-2">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              From
            </p>
            <p className="text-2xl font-bold text-slate-900">
              ₹{product?.price || 0}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="rounded-xl"
              onClick={onView}
            >
              View
            </Button>
            <Button
              variant="accent"
              size="sm"
              className="rounded-xl"
              onClick={onAddToCart}
            >
              <FiShoppingCart className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
