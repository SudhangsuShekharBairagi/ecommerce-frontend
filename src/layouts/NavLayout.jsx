import React from "react";
import { Outlet } from "react-router";
import Footer from "../Component/Footer";
import Navbar from "../Component/Navbar";


const NavLayout = () => {
  return (
    <>
      <Navbar />
      <scrollTo />
      <Outlet />
      <Footer />
    </>
  );
};

export default NavLayout;
