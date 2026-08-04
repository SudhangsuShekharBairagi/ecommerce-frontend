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
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold">Shopping Cart</h2>

      {cartItems.map((item) => (
        <ProductInCart
          key={item.productId}
          productId={item.productId}
          quantity={item.quantity}
        />
      ))}

      <PlaceOrder />
    </div>
  );
}

export default AddCard;
