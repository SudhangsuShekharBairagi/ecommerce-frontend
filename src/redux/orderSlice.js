import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getAdminAllOrders,
  getAdminAllOrdersById,
  updateStatusAdmin,
  placeUserOrder,
  getUserOrder,
  cancelOrder,
} from "../api/orderApi";

// ======================================================
// ADMIN THUNKS
// ======================================================

// Get all orders
export const fetchAdminOrders = createAsyncThunk(
  "orders/fetchAdminOrders",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAdminAllOrders();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to fetch admin orders"
      );
    }
  }
);

// Get admin order by ID
export const fetchAdminOrderById = createAsyncThunk(
  "orders/fetchAdminOrderById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await getAdminAllOrdersById(id);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to fetch order"
      );
    }
  }
);

// Update order status
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, req }, { rejectWithValue }) => {
    try {
      const response = await updateStatusAdmin(id, req);

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to update order status"
      );
    }
  }
);

// ======================================================
// USER THUNKS
// ======================================================

// Place order
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (orderRequest, { rejectWithValue }) => {
    try {
      const response = await placeUserOrder(orderRequest);

      /*
       * Your backend currently returns text.
       *
       * Example:
       * "Order placed successfully"
       */

      const data = await response.text();

      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to place order"
      );
    }
  }
);

// Get user's orders
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserOrder();

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to fetch your orders"
      );
    }
  }
);

// Cancel order
export const cancelUserOrder = createAsyncThunk(
  "orders/cancelUserOrder",
  async (orderNumber, { rejectWithValue }) => {
    try {
      const response = await cancelOrder(orderNumber);

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to cancel order"
      );
    }
  }
);

// ======================================================
// INITIAL STATE
// ======================================================

const initialState = {
  // Admin
  adminOrders: [],
  selectedOrder: null,

  // User
  userOrders: [],
  placedOrder: null,

  // General loading/error
  loading: false,
  error: null,

  // Place order
  success: false,

  // Cancel order
  cancelLoading: false,
  cancelError: null,
  cancelSuccess: false,
  cancelOrderNumber: null,
};

// ======================================================
// SLICE
// ======================================================

const orderSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {
    // ==================================================
    // GENERAL
    // ==================================================

    clearOrderError: (state) => {
      state.error = null;
    },

    clearOrderSuccess: (state) => {
      state.success = false;
    },

    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },

    clearPlacedOrder: (state) => {
      state.placedOrder = null;
    },

    // ==================================================
    // CANCEL
    // ==================================================

    clearCancelError: (state) => {
      state.cancelError = null;
    },

    clearCancelSuccess: (state) => {
      state.cancelSuccess = false;
    },
  },

  extraReducers: (builder) => {
    // ==================================================
    // ADMIN - GET ALL ORDERS
    // ==================================================

    builder
      .addCase(fetchAdminOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.adminOrders = Array.isArray(action.payload)
          ? action.payload
          : [];
      })

      .addCase(fetchAdminOrders.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to fetch admin orders";
      });

    // ==================================================
    // ADMIN - GET ORDER BY ID
    // ==================================================

    builder
      .addCase(fetchAdminOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload;
      })

      .addCase(fetchAdminOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to fetch order";
      });

    // ==================================================
    // ADMIN - UPDATE ORDER STATUS
    // ==================================================

    builder
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;

        state.selectedOrder = action.payload;

        const index = state.adminOrders.findIndex(
          (order) => order.id === action.payload.id
        );

        if (index !== -1) {
          state.adminOrders[index] = action.payload;
        }
      })

      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to update order status";
      });

    // ==================================================
    // USER - PLACE ORDER
    // ==================================================

    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;

        /*
         * Backend currently returns text.
         *
         * Example:
         * "Order placed successfully"
         */

        state.placedOrder = action.payload;

        state.success = true;

        /*
         * IMPORTANT:
         *
         * Do NOT do:
         *
         * state.userOrders.unshift(action.payload);
         *
         * because action.payload is currently a string.
         *
         * We will fetch the latest orders from the backend
         * after placing the order.
         */
      })

      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to place order";
        state.success = false;
      });

    // ==================================================
    // USER - GET ORDERS
    // ==================================================

    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;

        state.userOrders = Array.isArray(action.payload)
          ? action.payload
          : [];
      })

      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to fetch your orders";
      });

    // ==================================================
    // USER - CANCEL ORDER
    // ==================================================

    builder
      .addCase(cancelUserOrder.pending, (state, action) => {
        state.cancelLoading = true;
        state.cancelError = null;
        state.cancelSuccess = false;

        // Store which order is being cancelled
        state.cancelOrderNumber = action.meta.arg;
      })

      .addCase(cancelUserOrder.fulfilled, (state, action) => {
        state.cancelLoading = false;
        state.cancelSuccess = true;

        /*
         * Get the order number that was passed to:
         *
         * dispatch(cancelUserOrder(orderNumber))
         */

        const orderNumber = action.meta.arg;

        /*
         * Find the order inside Redux.
         */

        const order = state.userOrders.find(
          (order) =>
            order.orderNumber === orderNumber
        );

        /*
         * Immediately update the order.
         *
         * No refresh required.
         */

        if (order) {
          order.status = "CANCELLED";
        }

        /*
         * Update selected order if it is currently open.
         */

        if (
          state.selectedOrder &&
          state.selectedOrder.orderNumber === orderNumber
        ) {
          state.selectedOrder.status = "CANCELLED";
        }

        state.cancelOrderNumber = null;
      })

      .addCase(cancelUserOrder.rejected, (state, action) => {
        state.cancelLoading = false;

        state.cancelError =
          action.payload || "Failed to cancel order";

        state.cancelSuccess = false;
        state.cancelOrderNumber = null;
      });
  },
});

// ======================================================
// ACTIONS
// ======================================================

export const {
  clearOrderError,
  clearOrderSuccess,
  clearSelectedOrder,
  clearPlacedOrder,
  clearCancelError,
  clearCancelSuccess,
} = orderSlice.actions;

// ======================================================
// SELECTORS
// ======================================================

// Admin
export const selectAdminOrders = (state) =>
  state.orders.adminOrders;

export const selectSelectedOrder = (state) =>
  state.orders.selectedOrder;

// User
export const selectUserOrders = (state) =>
  state.orders.userOrders;

export const selectPlacedOrder = (state) =>
  state.orders.placedOrder;

// General
export const selectOrderLoading = (state) =>
  state.orders.loading;

export const selectOrderError = (state) =>
  state.orders.error;

export const selectOrderSuccess = (state) =>
  state.orders.success;

// Cancel
export const selectCancelLoading = (state) =>
  state.orders.cancelLoading;

export const selectCancelError = (state) =>
  state.orders.cancelError;

export const selectCancelSuccess = (state) =>
  state.orders.cancelSuccess;

export const selectCancelOrderNumber = (state) =>
  state.orders.cancelOrderNumber;

// ======================================================
// REDUCER
// ======================================================

export default orderSlice.reducer;