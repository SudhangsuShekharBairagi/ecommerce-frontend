import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const storedCart = window.localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error('Failed to parse cart from localStorage', error);
    return [];
  }
};

const initialState = getInitialState();

const cartSlice = createSlice({
  name: 'cart',
  initialState: getInitialState,
  reducers: {
    setCart: (state, action) => {
      const nextCart = Array.isArray(action.payload) ? action.payload : [];
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('cart', JSON.stringify(nextCart));
      }
      return nextCart;
    },
    addToCart: (state, action) => {
      const items = Array.isArray(action.payload) ? action.payload : [action.payload];
      const nextCart = [...state];

      items.forEach((item) => {
        const existingProduct = nextCart.find((cartItem) => cartItem.productId === item.productId);
        if (existingProduct) {
          existingProduct.quantity += item.quantity;
        } else {
          nextCart.push(item);
        }
      });

      if (typeof window !== 'undefined') {
        window.localStorage.setItem('cart', JSON.stringify(nextCart));
      }

      return nextCart;
    },
    removeFromCart: (state, action) => {
      const updatedCart = state.filter((item) => item.productId !== action.payload.productId);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
      return updatedCart;
    },
    increaseQuantity: (state, action) => {
      const item = state.find((entry) => entry.productId === action.payload.productId);
      if (item) {
        item.quantity += 1;
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('cart', JSON.stringify(state));
        }
      }
      return state;
    },
    decreaseQuantity: (state, action) => {
      const item = state.find((entry) => entry.productId === action.payload.productId);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          if (typeof window !== 'undefined') {
            window.localStorage.setItem('cart', JSON.stringify(state));
          }
          return state;
        }

        const updatedCart = state.filter((entry) => entry.productId !== action.payload.productId);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
        return updatedCart;
      }

      return state;
    },
    clearCart: (state) => {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('cart');
      }
      return [];
    },
  },
});

export const { setCart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
