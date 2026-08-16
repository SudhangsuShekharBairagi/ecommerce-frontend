import React from "react";
import { createBrowserRouter } from "react-router";

import NavLayout from "./layouts/NavLayout";
import HomePage from "./pages/HomePage";
import Product from "./Component/ProductDetails";
import AddProduct from "./Component/AddProduct";
import UpdateProduct from "./Component/UpdateProduct";
import AddCard from "./pages/AddCard";
import Profile from "./pages/Profile";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import Registration from "./auth/Registration";
import ProtectedRoute from "./auth/ProtectedRoute";
import UserOrders from "./OrderComponents/UserOrders";

const router = createBrowserRouter([
  {
    element: <NavLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/addproduct",
        element: (
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "/update/:id",
        element: (
          <ProtectedRoute>
            <UpdateProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "/addcard",
        element: (
          <ProtectedRoute>
            <AddCard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <ProtectedRoute>
            <UserOrders />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Registration />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

export default router;
