import React from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import ProductCard from "../components/ui/ProductCard";

const ProductDisplay = ({ productsWithImages }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!productsWithImages?.length) {
    return (
      <div className="rounded-[28px] border border-dashed border-slate-300 bg-white/80 p-12 text-center">
        <p className="text-xl font-semibold text-slate-800">
          No products match this filter yet.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Try another category or browse the full collection.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {productsWithImages.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onView={() => navigate(`/product/${product.id}`)}
          onAddToCart={() =>
            dispatch(addToCart({ productId: product.id, quantity: 1 }))
          }
        />
      ))}
    </div>
  );
};

export default ProductDisplay;
