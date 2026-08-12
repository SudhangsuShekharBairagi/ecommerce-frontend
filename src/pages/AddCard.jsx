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
      <div className="mb-6 rounded-[30px] border border-slate-200 bg-white/80 p-6 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.25)] backdrop-blur sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-indigo-600">
          Your shopping bag
        </p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">
          Shopping cart
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Review your selected items and complete your order with confidence.
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="rounded-[30px] border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
          <p className="text-2xl font-semibold text-slate-900">
            Your cart is empty
          </p>
          <p className="mt-3 text-sm text-slate-500">
            Browse the latest arrivals and add something you love.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
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
      )}
    </div>
  );
}

export default AddCard;
