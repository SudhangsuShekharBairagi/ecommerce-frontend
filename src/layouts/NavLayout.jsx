import React from "react";
import { Outlet, ScrollRestoration } from "react-router";
import Footer from "../Component/Footer";
import Navbar from "../Component/Navbar";

const NavLayout = () => {
  return (
    <>
      <Navbar />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </>
  );
};

export default NavLayout;
