import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../redux/productSlice";
import ProductDisplay from "./ProductDisplay";

const ProductFilter = () => {
  const products = useSelector(selectAllProducts);
  const imageUrls = useSelector((state) => state.products.imageUrls);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const [filterProduct, setFIlterProduct] = useState([]);
  //   console.log(products);

  const categories = [
    ...new Set(products.map((product) => product.category).filter(Boolean)),
  ];

  function filterByCategory(products, category) {
    return products.filter((product) => product.category === category);
  }
  const handleCategory = (category = "Moblie") => {
    setFIlterProduct(filterByCategory(products, category));
  };
  const productsWithImages = filterProduct.map((product) => ({
    ...product,
    imageUrl: imageUrls[product.id] || "/placeholder-image.png",
  }));

  return (
    <>
      <div className="bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 rounded-[28px] border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
                Find It Fast - Filter Your Favorites!
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">
                Choose your preferences to see only what matters to you
              </h1>
            </div>
            <div className="rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
              {productsWithImages.length} items available
            </div>
          </div>
          <div className="flex gap-5 flex-wrap justify-center mb-5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategory(category)}
                className="w-30 h-9 bg-sky-400 shadow-gray-700 shadow rounded-xl cursor-pointer hover:bg-sky-700 hover:text-white transition-all  linear duration-500"
              >
                {category}
              </button>
            ))}
          </div>
          <ProductDisplay productsWithImages={productsWithImages} />
        </div>
      </div>
    </>
  );
};

export default ProductFilter;
