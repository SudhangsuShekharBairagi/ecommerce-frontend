import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../component/ui/Button";
import { fetchProfile } from "../redux/profileSlice";
import { placeOrder } from "../redux/orderSlice";

function PlaceOrder() {
  const dispatch = useDispatch();

  // =========================
  // Redux State
  // =========================

  const cartItems = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products.entities);

  const profile = useSelector((state) => state.profile.profile);

  const {
    loading = false,
    error = null,
    success = null,
  } = useSelector((state) => state.orders);

  // =========================
  // Address State
  // =========================

  const [userAddress, setUserAddress] = useState({
    username: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
  });

  // =========================
  // Load Profile
  // =========================

  useEffect(() => {
    if (!profile) {
      dispatch(fetchProfile());
      return;
    }

    setUserAddress({
      username: profile.username ?? "",
      street: profile.street ?? "",
      city: profile.city ?? "",
      state: profile.state ?? "",
      pinCode: profile.pinCode ?? "",
    });
  }, [dispatch, profile]);

  // =========================
  // Order Calculations
  // =========================

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const product = products[item.productId];

      if (!product) {
        return total;
      }

      return total + Number(product.price) * Number(item.quantity);
    }, 0);
  }, [cartItems, products]);

  const shipping = subtotal > 0 ? 179 : 0;

  const estimatedSaving = subtotal * 0.12;

  const total = subtotal + shipping;

  // =========================
  // Helpers
  // =========================

  const formatPrice = (price) => {
    return Number(price).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });
  };

  // =========================
  // Place Order
  // =========================

  const handlePlaceOrder = () => {
    if (loading) return;

    if (!cartItems.length) {
      return;
    }

    const orderRequest = {
      userAddress: {
        username: userAddress.username,
        street: userAddress.street,
        city: userAddress.city,
        state: userAddress.state,
        pinCode: userAddress.pinCode,
      },

      items: cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    console.log("Order Request:", orderRequest);

    dispatch(placeOrder(orderRequest));
  };

  // =========================
  // Success State
  // =========================

  if (success) {
    return (
      <aside className="rounded-[30px] border border-emerald-200 bg-white p-8 shadow-[0_25px_60px_-30px_rgba(15,23,42,0.28)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <span className="text-3xl text-emerald-600">✓</span>
        </div>

        <h2 className="mt-5 text-center text-2xl font-bold text-slate-900">
          Order Placed Successfully
        </h2>

        <p className="mt-2 text-center text-sm text-slate-500">{success}</p>

        <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-center text-sm text-emerald-700">
          Thank you for shopping with us.
        </div>
      </aside>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <aside className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_25px_60px_-30px_rgba(15,23,42,0.28)]">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-indigo-600">
          Checkout
        </p>

        <h2 className="mt-2 text-2xl font-bold text-slate-900">
          Order Summary
        </h2>
      </div>

      {/* Price Summary */}
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>Subtotal</span>

          <span className="font-semibold text-slate-900">
            ₹{formatPrice(subtotal)}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>Shipping</span>

          <span className="font-semibold text-slate-900">
            ₹{formatPrice(shipping)}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>Estimated saving</span>

          <span className="font-semibold text-emerald-600">
            -₹{formatPrice(estimatedSaving)}
          </span>
        </div>

        <div className="border-t border-slate-200 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-slate-700">
              Total
            </span>

            <span className="text-3xl font-bold text-slate-900">
              ₹{formatPrice(total)}
            </span>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">Delivery Address</h3>

          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
            Default
          </span>
        </div>

        {profile ? (
          <div className="mt-3 space-y-1 text-sm text-slate-600">
            <p className="font-medium text-slate-900">{userAddress.username}</p>

            <p>{userAddress.street}</p>

            <p>
              {userAddress.city}, {userAddress.state}
            </p>

            <p>PIN - {userAddress.pinCode}</p>
          </div>
        ) : (
          <p className="mt-3 text-sm text-slate-500">Loading address...</p>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p className="font-semibold">Unable to place order</p>

          <p className="mt-1">
            {typeof error === "string"
              ? error
              : "Something went wrong. Please try again."}
          </p>
        </div>
      )}

      {/* Place Order */}
      <Button
        onClick={handlePlaceOrder}
        variant="accent"
        size="lg"
        disabled={loading || cartItems.length === 0 || !profile}
        className="mt-6 w-full"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </Button>

      {/* Security / Return Info */}
      <div className="mt-5 rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
        <div className="flex gap-3">
          <span className="text-lg">🔒</span>

          <div>
            <p className="text-sm font-semibold text-indigo-900">
              Secure Checkout
            </p>

            <p className="mt-1 text-xs leading-5 text-indigo-700">
              Your order information is securely processed. Eligible products
              can be returned within 30 days.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default PlaceOrder;
