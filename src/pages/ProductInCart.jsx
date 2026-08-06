import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/cartSlice";
import { selectProductById } from "../redux/productSlice";
import AlertMessage from "../Component/AlertMessage";

const ProductInCart = React.memo(({ productId, quantity }) => {
  const dispatch = useDispatch();

  const product = useSelector((state) => selectProductById(state, productId));
  const [altetInfo, setAltetInfo] = useState({ show: false, message: "" });

  const productImage = useSelector(
    (state) => state.products.imageUrls[productId],
  );

  const handleIncreaseQuantity = () => {
    if (product.quantity <= quantity) {
      setAltetInfo({
        show: true,
        message: `Sorry\nWe have only ${product.quantity} prices.`,
      });
    } else {
      dispatch(increaseQuantity({ productId }));
    }
  };

  if (!product) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-500 shadow-sm">
        Loading Product...
      </div>
    );
  }

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/70 sm:p-5">
      {altetInfo.show && (
        <AlertMessage
          message={altetInfo.message}
          onClose={() => setAltetInfo({ show: false, message: " " })}
        />
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <img
          src={productImage}
          alt={product.name}
          className="h-24 w-full rounded-2xl object-cover sm:w-24"
        />

        <div className="flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                {product.name}
              </h3>
              <p className="text-sm text-slate-500">{product.brand}</p>
              <p className="mt-2 text-xl font-semibold text-indigo-600">
                ₹{product.price}
              </p>
            </div>
            <button
              onClick={() => dispatch(removeFromCart({ productId }))}
              className="rounded-2xl border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
            >
              Remove
            </button>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => dispatch(decreaseQuantity({ productId }))}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-xl font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              -
            </button>

            <span className="min-w-10 rounded-2xl bg-slate-50 px-4 py-2 text-center text-sm font-semibold text-slate-700">
              {quantity}
            </span>

            <button
              onClick={() => handleIncreaseQuantity()}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-xl font-semibold text-white transition hover:bg-indigo-700"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductInCart;
