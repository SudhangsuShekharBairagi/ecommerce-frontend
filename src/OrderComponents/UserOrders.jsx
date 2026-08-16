import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelUserOrder,
  fetchUserOrders,
  selectUserOrders,
} from "../redux/orderSlice";
import UserOrderList from "./UserOrderList";

function UserOrders() {
  const dispatch = useDispatch();

  // =========================================================
  // Redux
  // =========================================================

  const orders = useSelector(selectUserOrders);

  const loading = useSelector((state) => state.orders.loading);

  const error = useSelector((state) => state.orders.error);

  // =========================================================
  // Local State
  // =========================================================

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancellingOrder, setCancellingOrder] = useState(null);

  // =========================================================
  // Fetch Orders
  // =========================================================

  useEffect(() => {
    if (orders.length === 0) {
      dispatch(fetchUserOrders());
    }
  }, [dispatch, orders.length]);

  // =========================================================
  // Statistics
  // =========================================================

  const orderStats = useMemo(() => {
    const stats = {
      total: orders.length,
      pending: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
    };

    orders.forEach((order) => {
      const status = order.status?.toLowerCase();

      if (status === "pending") {
        stats.pending++;
      }

      if (status === "shipped") {
        stats.shipped++;
      }

      if (status === "delivered") {
        stats.delivered++;
      }

      if (status === "cancelled" || status === "canceled") {
        stats.cancelled++;
      }
    });

    return stats;
  }, [orders]);

  // =========================================================
  // Status Styles
  // =========================================================

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return {
          badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
          dot: "bg-emerald-500",
        };

      case "pending":
        return {
          badge: "bg-amber-50 text-amber-700 border-amber-200",
          dot: "bg-amber-500",
        };

      case "cancelled":
      case "canceled":
        return {
          badge: "bg-red-50 text-red-700 border-red-200",
          dot: "bg-red-500",
        };

      case "shipped":
        return {
          badge: "bg-blue-50 text-blue-700 border-blue-200",
          dot: "bg-blue-500",
        };

      case "processing":
        return {
          badge: "bg-purple-50 text-purple-700 border-purple-200",
          dot: "bg-purple-500",
        };

      default:
        return {
          badge: "bg-slate-50 text-slate-700 border-slate-200",
          dot: "bg-slate-500",
        };
    }
  };

  // =========================================================
  // Helpers
  // =========================================================

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });
  };

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // =========================================================
  // Open Order
  // =========================================================

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  // =========================================================
  // Close Order
  // =========================================================

  const handleCloseOrder = () => {
    setSelectedOrder(null);
  };

  // =========================================================
  // Cancel Order
  // =========================================================

  const handleCancelOrder = async (orderNumber) => {
    if (!orderNumber || cancellingOrder) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setCancellingOrder(orderNumber);

      await dispatch(cancelUserOrder(orderNumber)).unwrap();
    } catch (error) {
      console.error("Failed to cancel order:", error);
    } finally {
      setCancellingOrder(null);
    }
  };

  // =========================================================
  // Can Cancel?
  // =========================================================

  const canCancelOrder = (status) => {
    const normalizedStatus = status?.toLowerCase();

    return normalizedStatus === "pending" || normalizedStatus === "processing";
  };

  // =========================================================
  // Loading
  // =========================================================

  if (loading && orders.length === 0) {
    return (
      <div className="min-h-dvh bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          {/* Skeleton Header */}
          <div className="animate-pulse">
            <div className="h-4 w-20 rounded bg-slate-200" />

            <div className="mt-4 h-10 w-56 rounded bg-slate-200" />

            <div className="mt-3 h-4 w-80 rounded bg-slate-200" />
          </div>

          {/* Skeleton Cards */}
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-28 animate-pulse rounded-2xl bg-white border border-slate-200"
              />
            ))}
          </div>

          <div className="mt-8 h-72 animate-pulse rounded-3xl bg-white border border-slate-200" />
        </div>
      </div>
    );
  }

  // =========================================================
  // Error
  // =========================================================

  if (error && orders.length === 0) {
    return (
      <div className="min-h-dvh bg-slate-50 flex items-center justify-center px-5">
        <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-2xl text-red-500">
            !
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            Unable to load orders
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {typeof error === "string"
              ? error
              : "Something went wrong while loading your orders."}
          </p>

          <button
            onClick={() => dispatch(fetchUserOrders())}
            className="mt-6 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // =========================================================
  // Main UI
  // =========================================================

  return (
    <div className="min-h-dvh bg-slate-50">
      {/* =====================================================
          Order Details Modal
      ===================================================== */}

      {selectedOrder && (
        <UserOrderList
          items={selectedOrder.items || []}
          orderNumber={selectedOrder.orderNumber}
          handleSetItems={handleCloseOrder}
        />
      )}

      {/* =====================================================
          Main
      ===================================================== */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* ===================================================
            Header
        =================================================== */}

        <header className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-600">
            Account
          </p>

          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                My Orders
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                Track your purchases, view order details, and manage your recent
                orders.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Total Orders
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                {orderStats.total}
              </p>
            </div>
          </div>
        </header>

        {/* ===================================================
            Statistics
        =================================================== */}

        {orders.length > 0 && (
          <section className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {/* Pending */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />

                <span className="text-sm text-slate-500">Pending</span>
              </div>

              <p className="mt-3 text-2xl font-bold text-slate-900">
                {orderStats.pending}
              </p>
            </div>

            {/* Shipped */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />

                <span className="text-sm text-slate-500">Shipped</span>
              </div>

              <p className="mt-3 text-2xl font-bold text-slate-900">
                {orderStats.shipped}
              </p>
            </div>

            {/* Delivered */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                <span className="text-sm text-slate-500">Delivered</span>
              </div>

              <p className="mt-3 text-2xl font-bold text-slate-900">
                {orderStats.delivered}
              </p>
            </div>

            {/* Cancelled */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />

                <span className="text-sm text-slate-500">Cancelled</span>
              </div>

              <p className="mt-3 text-2xl font-bold text-slate-900">
                {orderStats.cancelled}
              </p>
            </div>
          </section>
        )}

        {/* ===================================================
            Empty State
        =================================================== */}

        {orders.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 text-3xl">
              🛍️
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-900">
              No orders yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              You haven't placed any orders yet. Once you make a purchase, your
              order history will appear here.
            </p>
          </div>
        ) : (
          <>
            {/* =================================================
                Desktop
            ================================================= */}

            <section className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:block">
              {/* Table Header */}

              <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_180px] border-b border-slate-200 bg-slate-50 px-6 py-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Order
                </p>

                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Date
                </p>

                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Status
                </p>

                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Total
                </p>

                <p className="text-right text-xs font-bold uppercase tracking-wider text-slate-400">
                  Actions
                </p>
              </div>

              {/* Orders */}

              <div className="divide-y divide-slate-100">
                {orders.map((order) => {
                  const statusStyle = getStatusStyle(order.status);

                  const canCancel = canCancelOrder(order.status);

                  const isCancelling = cancellingOrder === order.orderNumber;

                  return (
                    <div
                      key={order.orderNumber}
                      className="grid grid-cols-[1.5fr_1fr_1fr_1fr_180px] items-center px-6 py-5 transition hover:bg-slate-50"
                    >
                      {/* Order */}

                      <div>
                        <p className="font-bold text-slate-900">
                          #{order.orderNumber}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {order.items?.length || 0}{" "}
                          {order.items?.length === 1 ? "item" : "items"}
                        </p>
                      </div>

                      {/* Date */}

                      <div>
                        <p className="text-sm text-slate-600">
                          {formatDate(order.createdAt || order.orderDate)}
                        </p>
                      </div>

                      {/* Status */}

                      <div>
                        <span
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${statusStyle.badge}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
                          />

                          {order.status}
                        </span>
                      </div>

                      {/* Total */}

                      <div>
                        <p className="font-bold text-slate-900">
                          ₹{formatPrice(order.totalAmount)}
                        </p>
                      </div>

                      {/* Actions */}

                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleViewOrder(order)}
                          className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                        >
                          Details
                        </button>

                        {canCancel && (
                          <button
                            type="button"
                            disabled={isCancelling}
                            onClick={() => handleCancelOrder(order.orderNumber)}
                            className="rounded-xl border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {isCancelling ? "Cancelling..." : "Cancel"}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* =================================================
                Mobile
            ================================================= */}

            <section className="space-y-4 md:hidden">
              {orders.map((order) => {
                const statusStyle = getStatusStyle(order.status);

                const canCancel = canCancelOrder(order.status);

                const isCancelling = cancellingOrder === order.orderNumber;

                return (
                  <article
                    key={order.orderNumber}
                    className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    {/* Header */}

                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                          Order
                        </p>

                        <h2 className="mt-1 font-bold text-slate-900">
                          #{order.orderNumber}
                        </h2>
                      </div>

                      <span
                        className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${statusStyle.badge}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
                        />

                        {order.status}
                      </span>
                    </div>

                    {/* Date */}

                    <p className="mt-3 text-xs text-slate-400">
                      {formatDate(order.createdAt || order.orderDate)}
                    </p>

                    {/* Divider */}

                    <div className="my-5 border-t border-slate-100" />

                    {/* Information */}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-slate-400">Items</p>

                        <p className="mt-1 font-semibold text-slate-700">
                          {order.items?.length || 0}{" "}
                          {order.items?.length === 1 ? "item" : "items"}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-slate-400">Total</p>

                        <p className="mt-1 text-lg font-bold text-slate-900">
                          ₹{formatPrice(order.totalAmount)}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleViewOrder(order)}
                        className="rounded-xl bg-slate-100 py-3 text-sm font-semibold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700"
                      >
                        View Details
                      </button>

                      {canCancel ? (
                        <button
                          type="button"
                          disabled={isCancelling}
                          onClick={() => handleCancelOrder(order.orderNumber)}
                          className="rounded-xl border border-red-200 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isCancelling ? "Cancelling..." : "Cancel Order"}
                        </button>
                      ) : (
                        <div className="flex items-center justify-center rounded-xl bg-slate-50 py-3 text-xs font-medium text-slate-400">
                          No actions available
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default UserOrders;
