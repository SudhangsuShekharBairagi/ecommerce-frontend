import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  FaArrowRight,
  FaShoppingCart,
  FaHeart,
  FaStar,
  FaBoxOpen,
} from "react-icons/fa";

import { selectAllProducts } from "../redux/productSlice";

function RelatedProduct({ category, currentProductId }) {
  const navigate = useNavigate();

  const products = useSelector(selectAllProducts);
  const imageUrls = useSelector((state) => state.products.imageUrls);

  const loading = useSelector((state) => state.products.loading);

  const error = useSelector((state) => state.products.error);

  const [relativeProduct, setRelativeProduct] = useState([]);

  // ==========================================
  // FILTER RELATED PRODUCTS
  // ==========================================

  useEffect(() => {
    if (!category) {
      setRelativeProduct([]);
      return;
    }

    const filteredProducts = products
      .filter(
        (product) =>
          product.category?.toLowerCase() === category?.toLowerCase(),
      )
      .filter((product) => product.id !== currentProductId)
      .slice(0, 4);

    setRelativeProduct(filteredProducts);
  }, [products, category, currentProductId]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <section className="mt-14 w-full px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7">
            <div className="h-3 w-24 animate-pulse rounded-full bg-slate-200" />
            <div className="mt-3 h-8 w-64 animate-pulse rounded-lg bg-slate-200" />
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <div className="aspect-square animate-pulse bg-slate-200" />

                <div className="space-y-3 p-4">
                  <div className="h-4 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <section className="mt-12 px-4">
        <div className="mx-auto max-w-7xl rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
          <p className="text-sm font-medium text-red-600">
            Unable to load related products.
          </p>
        </div>
      </section>
    );
  }

  // ==========================================
  // EMPTY
  // ==========================================

  if (relativeProduct.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 w-full bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* =====================================
            SECTION HEADER
        ====================================== */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
                You may also like
              </span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Related Products
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              More products from the {category} collection.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="group flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600 sm:self-auto"
          >
            View all
            <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* =====================================
            PRODUCT GRID
        ====================================== */}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {relativeProduct.map((product) => {
            const imageUrl = imageUrls[product.id] || "/placeholder-image.png";

            const price = Number(product.price || 0);

            return (
              <article
                key={product.id}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* =================================
                    IMAGE
                ================================== */}

                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img
                    src={imageUrl}
                    alt={product.name || "Product image"}
                    loading="lazy"
                    className="h-full w-full object-contain p-5 transition duration-500 group-hover:scale-105"
                  />

                  {/* Category badge */}

                  <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-indigo-600 shadow-sm backdrop-blur">
                    {product.category}
                  </div>

                  {/* Wishlist */}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-500 opacity-0 shadow-sm backdrop-blur transition-all duration-200 hover:text-rose-500 group-hover:opacity-100"
                    aria-label="Add to wishlist"
                  >
                    <FaHeart className="text-xs" />
                  </button>

                  {/* Stock */}

                  {product.available === false && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px]">
                      <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-lg">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* =================================
                    PRODUCT INFORMATION
                ================================== */}

                <div className="p-4">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {product.brand || "TechStore"}
                  </p>

                  <h3 className="line-clamp-1 text-sm font-bold text-slate-800">
                    {product.name}
                  </h3>

                  {/* Rating */}

                  <div className="mt-2 flex items-center gap-1">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      <FaStar className="text-[10px]" />
                      <FaStar className="text-[10px]" />
                      <FaStar className="text-[10px]" />
                      <FaStar className="text-[10px]" />
                      <FaStar className="text-[10px]" />
                    </div>

                    <span className="text-[10px] text-slate-400">4.8</span>
                  </div>

                  {/* Price + cart */}

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-lg font-extrabold text-slate-900">
                        ₹{price.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <button
                      type="button"
                      disabled={product.available === false}
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                      title="View product"
                    >
                      <FaShoppingCart className="text-xs" />
                    </button>
                  </div>

                  {/* View product */}

                  <button
                    type="button"
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2 text-xs font-semibold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    View Product
                    <FaArrowRight className="text-[9px]" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* =====================================
            CATEGORY FOOTER
        ====================================== */}

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
          <FaBoxOpen />
          Showing related products in{" "}
          <span className="font-semibold text-slate-600">{category}</span>
        </div>
      </div>
    </section>
  );
}

export default RelatedProduct;
