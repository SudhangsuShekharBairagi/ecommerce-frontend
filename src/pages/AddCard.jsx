import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductInCart from "./ProductInCart";
import PlaceOrder from "../Component/PlaceOrder";

import { fetchProductById, fetchProductImage } from "../redux/productSlice";

function AddCard() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products.entities);
  const images = useSelector((state) => state.products.imageUrls);

  useEffect(() => {
    cartItems.forEach((item) => {
      if (!products[item.productId]) {
        dispatch(fetchProductById(item.productId));
      }

      if (!images[item.productId]) {
        dispatch(fetchProductImage(item.productId));
      }
    });
  }, [cartItems, dispatch, products, images]);

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 rounded-[28px] border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
          Your shopping bag
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900">
          Shopping Cart
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Review your selected items and complete your order with confidence.
        </p>
      </div>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <ProductInCart
            key={item.productId}
            productId={item.productId}
            quantity={item.quantity}
          />
        ))}
      </div>

      <PlaceOrder />
    </div>
  );
}

export default AddCard;
