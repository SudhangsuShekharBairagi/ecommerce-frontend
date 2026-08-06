import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchProductImage,
  selectAllProducts,
} from "../redux/productSlice";


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const imageUrls = useSelector((state) => state.products.imageUrls);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    products.forEach((product) => {
      if (product.id && !imageUrls[product.id]) {
        dispatch(fetchProductImage(product.id));
      }
    });
  }, [dispatch, products, imageUrls]);

  const productsWithImages = products.map((product) => ({
    ...product,
    imageUrl: imageUrls[product.id] || "/placeholder-image.png",
  }));

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-gray-950 px-6">
        <div className="rounded-3xl border border-slate-200 bg-white/80 px-8 py-6 text-center shadow-sm backdrop-blur">
          <h1 className="text-2xl font-semibold text-slate-900">
            Loading products...
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Please wait while we fetch the latest picks.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-gray-950 px-6">
        <div className="rounded-3xl border border-rose-200 bg-rose-50 px-8 py-6 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-rose-700">{error}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 rounded-[28px] border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
              Featured collection
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              Discover products made for everyday life
            </h1>
          </div>
          <div className="rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
            {productsWithImages.length} items available
          </div>
        </div>    
       
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
      </div>
    </div>
  );
};

export default Home;
