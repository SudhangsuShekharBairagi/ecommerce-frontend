import React from "react";
import { useNavigate } from "react-router";

const ProductDisplay = ({ productsWithImages }) => {
  const navigate = useNavigate();
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {productsWithImages.map((product) => (
        <div
          key={product.id}
          className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_45px_-25px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_60px_-20px_rgba(79,70,229,0.35)]"
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-100 via-white to-indigo-50 p-6">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-56 w-full object-contain transition-transform duration-500 group-hover:scale-110"
            />

            <span
              className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${
                product.available
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-rose-100 text-rose-700"
              }`}
            >
              {product.available ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <div className="space-y-4 p-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
                {product.brand}
              </p>
              <h3 className="mt-2 line-clamp-1 text-2xl font-semibold text-slate-900">
                {product.name}
              </h3>
            </div>

            <p className="line-clamp-2 text-sm leading-6 text-slate-500">
              {product.description}
            </p>

            <div className="flex items-end justify-between pt-2">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Starting from
                </p>
                <p className="text-3xl font-semibold text-slate-900">
                  ₹{product.price}
                </p>
              </div>

              <button
                onClick={() => navigate(`/product/${product.id}`)}
                className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-indigo-600"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDisplay;
