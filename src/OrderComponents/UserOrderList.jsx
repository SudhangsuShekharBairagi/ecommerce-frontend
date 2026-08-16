import React from "react";
import Button from "../Component/ui/Button";
import { useDispatch } from "react-redux";
import { cancelUserOrder } from "../redux/orderSlice";

function UserOrderList({ items, handleSetItems }) {
  const dispatch = useDispatch();
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <div
      onClick={() => handleSetItems(null)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-full max-w-2xl max-h-[90vh] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-sky-600">
              Order Details
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              Your Items
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {items.length} {items.length === 1 ? "item" : "items"} in this
              order
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleSetItems(null)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-lg font-medium text-gray-500 transition hover:bg-red-100 hover:text-red-600"
            aria-label="Close"
          >
            x
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto bg-gray-100 px-4 py-5 sm:px-6">
          <div className="space-y-3">
            {items.map((item) => {
              const itemTotal = item.product.price * item.quantity;

              return (
                <div
                  key={item.id}
                  className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition duration-200 hover:border-sky-200 hover:shadow-md"
                >
                  {/* Image */}
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Product info */}
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold text-gray-900">
                      {item.product.name}
                    </h3>

                    <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                      <span>₹{item.product.price}</span>

                      <span className="text-gray-300">×</span>

                      <span>Qty: {item.quantity}</span>
                    </div>

                    <p className="mt-2 font-bold text-gray-900">
                      ₹{itemTotal.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-end"></div>

        {/* Footer */}
        <div className="border-t border-gray-100 bg-white px-6 py-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Order Total</p>
              <p className="text-xs text-gray-400">
                Including all selected items
              </p>
            </div>

            <p className="text-2xl font-bold text-gray-900">
              ₹{total.toLocaleString("en-IN")}
            </p>
          </div>

          <Button
            variant="danger"
            className="w-full rounded-xl py-3"
            onClick={() => handleSetItems(null)}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserOrderList;
