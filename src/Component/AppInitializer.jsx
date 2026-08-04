// AppInitializer.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCartItems } from "../api/productsApi";
import { setCart } from "../redux/cartSlice";

function AppInitializer() {
  const dispatch = useDispatch();

  const initializeApp = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    try {
      const data = await fetchCartItems();
      dispatch(setCart(Array.isArray(data) ? data : []));
    } catch (error) {
      console.error("Failed to sync cart from server", error);
    }
  };

  useEffect(() => {
    initializeApp();
  }, [dispatch]);

  return null;
}

export default AppInitializer;
