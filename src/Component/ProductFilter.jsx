import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../redux/productSlice";
import ProductDisplay from "./ProductDisplay";

const ProductFilter = () => {
  const products = useSelector(selectAllProducts);
  const imageUrls = useSelector((state) => state.products.imageUrls);
  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category).filter(Boolean))],
    [products],
  );
  const [active, setActive] = useState("All");
  const filtered =
    active === "All" ? products : products.filter((p) => p.category === active);
  const withImages = filtered.map((p) => ({
    ...p,
    imageUrl: imageUrls[p.id] || "/placeholder-image.png",
  }));

  return (
    <section id="categories" className="bg-slate-50 px-5 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[.2em] text-indigo-600">
            Browse by category
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            Find your next upgrade
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
            Switch categories and explore the products that match what you need.
          </p>
        </div>
        <div className="mt-7 flex flex-wrap justify-center gap-2">
          {["All", ...categories].map((category) => (
            <button
              key={category}
              onClick={() => setActive(category)}
              className={`rounded-full px-4 py-2.5 text-xs font-bold transition ${active === category ? "bg-slate-950 text-white shadow-lg shadow-slate-200" : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:text-indigo-600"}`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="mt-9">
          <ProductDisplay productsWithImages={withImages} />
        </div>
      </div>
    </section>
  );
};
export default ProductFilter;
