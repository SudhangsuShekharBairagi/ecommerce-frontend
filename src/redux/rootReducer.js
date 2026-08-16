import { combineReducers } from '@reduxjs/toolkit';
import productsReducer from './productSlice';
import authReducer, { logout } from './authSlice';
import profileReducer from './profileSlice';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice'
export const clearLocalStorage = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.clear();
  }
};

const appReducer = combineReducers({
  products: productsReducer,
  auth: authReducer,
  profile: profileReducer,
  cart: cartReducer,
  orders: orderReducer,
});

const rootReducer = (state, action) => {
  if (action.type === logout.type) {
    clearLocalStorage();
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
