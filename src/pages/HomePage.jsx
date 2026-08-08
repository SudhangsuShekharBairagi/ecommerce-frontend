import React from "react";
import HeroSection from "../Component/HeroSection";
import Products from "../Component/Products";
import ProductFilter from "../Component/ProductFilter";

function HomePage() {
  return (
    <div className="bg-transparent">
      <HeroSection />
      <Products />
      <ProductFilter />
    </div>
  );
}

export default HomePage;
