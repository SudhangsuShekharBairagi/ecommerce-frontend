import React from "react";
import { useSelector } from "react-redux";

function PlaceOrder() {
  const cartItems = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products.entities);

  const total = cartItems.reduce((sum, item) => {
    const product = products[item.productId];

    if (!product) return sum;

    return sum + product.price * item.quantity;
  }, 0);

  return (
    <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
            Order Summary
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">
            ₹{total}
          </h2>
        </div>
        <button className="rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:from-indigo-700 hover:to-blue-700">
          Place Order
        </button>
      </div>
    </div>
  );
}

export default PlaceOrder;
