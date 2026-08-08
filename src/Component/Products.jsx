import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchProductImage,
  selectAllProducts,
} from "../redux/productSlice";
import ProductDisplay from "./ProductDisplay";

const Products = () => {
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
        <ProductDisplay productsWithImages={productsWithImages} />
      </div>
    </div>
  );
};

export default Products;
