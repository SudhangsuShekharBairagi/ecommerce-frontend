import React from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router";
import { addCartItems } from "../api/productsApi";
import { logout } from "../redux/authSlice";

function Logout() {
  const dispatch = useDispatch();
  const token =
    typeof window !== "undefined" ? window.localStorage.getItem("token") : null;
  const cart =
    typeof window !== "undefined" ? window.localStorage.getItem("cart") : null;

  const addCart = async () => {
    const data = JSON.parse(cart) || [];
    await addCartItems(data);
  };

  if (token) {
    addCart();
    dispatch(logout());
  }

  return <Navigate to="/" replace />;
}

export default Logout;
