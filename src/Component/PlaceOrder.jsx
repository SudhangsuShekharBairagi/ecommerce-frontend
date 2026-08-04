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
    <div className="mt-6 border-t pt-4">
      <h2 className="text-2xl font-bold">
        Total: ₹{total}
      </h2>

      <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded">
        Place Order
      </button>
    </div>
  );
}

export default PlaceOrder;