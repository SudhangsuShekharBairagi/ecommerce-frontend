import React from "react";
import { useSelector } from "react-redux";
import Button from "../component/ui/Button";

function PlaceOrder() {
  const cartItems = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products.entities);

  const subtotal = cartItems.reduce((sum, item) => {
    const product = products[item.productId];
    if (!product) return sum;
    return sum + product.price * item.quantity;
  }, 0);

  const shipping = subtotal > 0 ? 179 : 0;
  const total = subtotal + shipping;

  return (
    <aside className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_25px_60px_-30px_rgba(15,23,42,0.28)]">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-indigo-600">
        Order summary
      </p>
      <h3 className="mt-2 text-3xl font-bold text-slate-900">₹{total}</h3>

      <div className="mt-6 space-y-3 rounded-[24px] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-900">₹{subtotal}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Shipping</span>
          <span className="font-semibold text-slate-900">₹{shipping}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Estimated saving</span>
          <span className="font-semibold text-emerald-600">
            ₹{Math.max(0, subtotal * 0.12).toFixed(0)}
          </span>
        </div>
      </div>

      <Button variant="accent" className="mt-6 w-full" size="lg">
        Proceed to checkout
      </Button>

      <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50 p-4 text-sm text-indigo-700">
        Free returns within 30 days on all eligible items.
      </div>
    </aside>
  );
}

export default PlaceOrder;
