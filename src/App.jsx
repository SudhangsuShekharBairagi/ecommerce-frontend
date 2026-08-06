import React from "react";
import Navbar from "./Component/Navbar";
import { BrowserRouter, Route, Routes } from "react-router";
import Product from "./Component/ProductDetails";
import AddProduct from "./Component/AddProduct";
import UpdateProduct from "./Component/UpdateProduct";
import ProtectedRoute from "./auth/ProtectedRoute";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import Registration from "./auth/Registration";
import AddCard from "./pages/AddCard";
import Profile from "./pages/Profile";
import AppInitializer from "./Component/AppInitializer";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <>
      <AppInitializer />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Navbar />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route
              path="/product/:id"
              element={
                <ProtectedRoute>
                  <Product />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addproduct"
              element={
                <ProtectedRoute>
                  <AddProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/update/:id"
              element={
                <ProtectedRoute>
                  <UpdateProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addcard"
              element={
                <ProtectedRoute>
                  <AddCard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="/register" element={<Registration />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
