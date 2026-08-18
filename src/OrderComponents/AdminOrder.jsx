import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchAdminOrders,
  updateOrderStatus,
  selectAdminOrders,
} from "../redux/orderSlice";

import UserOrderList from "./UserOrderList";
import UserProfile from "./UserProfile";

// ======================================================
// ORDER STATUS
// ======================================================

const ORDER_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
];

// ======================================================
// COMPONENT
// ======================================================

function AdminOrder() {
  const dispatch = useDispatch();

  const orders = useSelector(selectAdminOrders);
  const loading = useSelector((state) => state.orders.loading);
  const error = useSelector((state) => state.orders.error);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [updatingOrder, setUpdatingOrder] = useState(null);

  // ======================================================
  // FETCH ORDERS
  // ======================================================
  // console.log(orders);
  useEffect(() => {
    dispatch(fetchAdminOrders());
  }, [dispatch]);

  // ======================================================
  // STATISTICS
  // ======================================================

  const orderStats = useMemo(() => {
    return {
      total: orders.length,

      pending: orders.filter(
        (order) => order.status?.toUpperCase() === "PENDING",
      ).length,

      processing: orders.filter(
        (order) => order.status?.toUpperCase() === "PROCESSING",
      ).length,

      shipped: orders.filter(
        (order) =>
          order.status?.toUpperCase() === "SHIPPED" ||
          order.status?.toUpperCase() === "OUT_FOR_DELIVERY",
      ).length,

      delivered: orders.filter(
        (order) => order.status?.toUpperCase() === "DELIVERED",
      ).length,

      cancelled: orders.filter(
        (order) =>
          order.status?.toUpperCase() === "CANCELLED" ||
          order.status?.toUpperCase() === "CANCELED",
      ).length,
    };
  }, [orders]);

  // ======================================================
  // FILTER ORDERS
  // ======================================================

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const orderNumber = String(order.orderNumber || "").toLowerCase();

      const searchText = search.toLowerCase();

      const matchesSearch = orderNumber.includes(searchText);

      const matchesStatus =
        statusFilter === "ALL" || order.status?.toUpperCase() === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  // ======================================================
  // STATUS STYLE
  // ======================================================

  const getStatusStyle = (status) => {
    switch (status?.toUpperCase()) {
      case "PENDING":
        return {
          badge: "bg-amber-50 text-amber-700 border-amber-200",
          dot: "bg-amber-500",
        };

      case "CONFIRMED":
        return {
          badge: "bg-cyan-50 text-cyan-700 border-cyan-200",
          dot: "bg-cyan-500",
        };

      case "PROCESSING":
        return {
          badge: "bg-purple-50 text-purple-700 border-purple-200",
          dot: "bg-purple-500",
        };

      case "SHIPPED":
        return {
          badge: "bg-blue-50 text-blue-700 border-blue-200",
          dot: "bg-blue-500",
        };

      case "OUT_FOR_DELIVERY":
        return {
          badge: "bg-indigo-50 text-indigo-700 border-indigo-200",
          dot: "bg-indigo-500",
        };

      case "DELIVERED":
        return {
          badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
          dot: "bg-emerald-500",
        };

      case "CANCELLED":
      case "CANCELED":
        return {
          badge: "bg-red-50 text-red-700 border-red-200",
          dot: "bg-red-500",
        };

      default:
        return {
          badge: "bg-slate-50 text-slate-700 border-slate-200",
          dot: "bg-slate-500",
        };
    }
  };

  // ======================================================
  // FORMAT PRICE
  // ======================================================

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });
  };

  // ======================================================
  // FORMAT DATE
  // ======================================================

  const formatDate = (date) => {
    if (!date) {
      return "Date unavailable";
    }

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

  // ======================================================
  // UPDATE ORDER STATUS
  // ======================================================

  const handleStatusChange = async (order, newStatus) => {
    if (!order?.id || !newStatus) {
      return;
    }

    if (order.status?.toUpperCase() === newStatus) {
      return;
    }

    try {
      setUpdatingOrder(order.orderNumber);

      await dispatch(
        updateOrderStatus({
          id: order.id,

          // Backend request body
          req: newStatus,
        }),
      ).unwrap();
    } catch (error) {
      console.error("Failed to update order status:", error);

      alert(
        typeof error === "string" ? error : "Failed to update order status",
      );
    } finally {
      setUpdatingOrder(null);
    }
  };

  // ======================================================
  // OPEN DETAILS
  // ======================================================

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  // ======================================================
  // LOADING
  // ======================================================

  if (loading && orders.length === 0) {
    return (
      <div className="min-h-dvh bg-slate-50">
        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-4 w-24 rounded bg-slate-200" />

            <div className="mt-4 h-10 w-72 rounded bg-slate-200" />

            <div className="mt-3 h-4 w-96 rounded bg-slate-200" />

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="h-32 rounded-2xl bg-white border border-slate-200"
                />
              ))}
            </div>

            <div className="mt-8 h-96 rounded-3xl bg-white border border-slate-200" />
          </div>
        </main>
      </div>
    );
  }

  // ======================================================
  // ERROR
  // ======================================================

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
              : "Something went wrong while loading orders."}
          </p>

          <button
            onClick={() => dispatch(fetchAdminOrders())}
            className="mt-6 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ======================================================
  // MAIN UI
  // ======================================================

  return (
    <div className="min-h-dvh bg-slate-50">
      {/* ==================================================
          ORDER DETAILS
      ================================================== */}

      {selectedOrder && (
        <UserOrderList
          items={selectedOrder.items || []}
          user={selectedOrder.user || []}
          orderNumber={selectedOrder.orderNumber}
          address={selectedOrder.userAddress}
          handleSetItems={() => setSelectedOrder(null)}
        />
      )}

      {/* ==================================================
          MAIN
      ================================================== */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* ==================================================
            HEADER
        ================================================== */}

        <header className="mb-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-600" />

                <p className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-600">
                  Admin Dashboard
                </p>
              </div>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Order Management
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Manage customer orders, monitor delivery progress, and update
                order status from one place.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Total Orders
              </p>

              <p className="mt-1 text-3xl font-bold text-slate-900">
                {orderStats.total}
              </p>
            </div>
          </div>
        </header>

        {/* ==================================================
            STATISTICS
        ================================================== */}

        <section className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {/* Pending */}
          <StatCard
            label="Pending"
            value={orderStats.pending}
            dot="bg-amber-500"
          />

          {/* Processing */}
          <StatCard
            label="Processing"
            value={orderStats.processing}
            dot="bg-purple-500"
          />

          {/* Shipped */}
          <StatCard
            label="Shipped"
            value={orderStats.shipped}
            dot="bg-blue-500"
          />

          {/* Delivered */}
          <StatCard
            label="Delivered"
            value={orderStats.delivered}
            dot="bg-emerald-500"
          />

          {/* Cancelled */}
          <StatCard
            label="Cancelled"
            value={orderStats.cancelled}
            dot="bg-red-500"
          />
        </section>

        {/* ==================================================
            FILTER BAR
        ================================================== */}

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row">
            {/* Search */}
            <div className="relative flex-1">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by order number..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
            >
              <option value="ALL">All Statuses</option>

              {ORDER_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {formatStatus(status)}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* ==================================================
            EMPTY
        ================================================== */}

        {filteredOrders.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50 text-3xl">
              📦
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-900">
              No orders found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              No orders match your current search or status filter.
            </p>
          </div>
        ) : (
          <>
            {/* ==================================================
                DESKTOP TABLE
            ================================================== */}

            <section className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:block">
              {/* Header */}

              <div className="grid grid-cols-[1.3fr_1fr_1fr_1fr_260px] border-b border-slate-200 bg-slate-50 px-6 py-4">
                <TableHeading>Order</TableHeading>

                <TableHeading>Date</TableHeading>

                <TableHeading>Status</TableHeading>

                <TableHeading>Total</TableHeading>

                <TableHeading align="right">Admin Actions</TableHeading>
              </div>

              {/* Rows */}

              <div className="divide-y divide-slate-100">
                {filteredOrders.map((order) => {
                  const statusStyle = getStatusStyle(order.status);

                  const isUpdating = updatingOrder === order.orderNumber;

                  return (
                    <div
                      key={order.orderNumber}
                      className="grid grid-cols-[1.3fr_1fr_1fr_1fr_260px] items-center px-6 py-5 transition hover:bg-slate-50"
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
                        <StatusBadge
                          status={order.status}
                          style={statusStyle}
                        />
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

                        {/* STATUS BUTTON */}

                        <select
                          value={order.status?.toUpperCase() || ""}
                          disabled={isUpdating}
                          onChange={(e) =>
                            handleStatusChange(order, e.target.value)
                          }
                          className="rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 outline-none transition hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {ORDER_STATUSES.map((status) => (
                            <option key={status} value={status}>
                              {isUpdating &&
                              status === order.status?.toUpperCase()
                                ? "Updating..."
                                : formatStatus(status)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ==================================================
                MOBILE
            ================================================== */}

            <section className="space-y-4 md:hidden">
              {filteredOrders.map((order) => {
                const statusStyle = getStatusStyle(order.status);

                const isUpdating = updatingOrder === order.orderNumber;

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

                      <StatusBadge status={order.status} style={statusStyle} />
                    </div>

                    {/* Date */}

                    <p className="mt-3 text-xs text-slate-400">
                      {formatDate(order.createdAt || order.orderDate)}
                    </p>

                    <div className="my-5 border-t border-slate-100" />

                    {/* Info */}

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

                      <select
                        value={order.status?.toUpperCase() || ""}
                        disabled={isUpdating}
                        onChange={(e) =>
                          handleStatusChange(order, e.target.value)
                        }
                        className="rounded-xl bg-indigo-600 px-3 py-3 text-center text-sm font-semibold text-white outline-none transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {ORDER_STATUSES.map((status) => (
                          <option
                            key={status}
                            value={status}
                            className="bg-white text-slate-800"
                          >
                            {formatStatus(status)}
                          </option>
                        ))}
                      </select>
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

// ======================================================
// STAT CARD
// ======================================================

function StatCard({ label, value, dot }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center gap-3">
        <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />

        <span className="text-sm font-medium text-slate-500">{label}</span>
      </div>

      <p className="mt-3 text-3xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

// ======================================================
// TABLE HEADING
// ======================================================

function TableHeading({ children, align = "left" }) {
  return (
    <p
      className={`text-xs font-bold uppercase tracking-wider text-slate-400 ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {children}
    </p>
  );
}

// ======================================================
// STATUS BADGE
// ======================================================

function StatusBadge({ status, style }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${style.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />

      {formatStatus(status)}
    </span>
  );
}

// ======================================================
// FORMAT STATUS
// ======================================================

function formatStatus(status) {
  if (!status) {
    return "Unknown";
  }

  return status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default AdminOrder;
