import React from "react";
import HeroSection from "../Component/HeroSection";
import Product from "./ProductDetails";

function HomePage() {
  return (
    <div className="bg-transparent">
      <HeroSection />
      <Product />
    </div>
  );
}

export default HomePage;
