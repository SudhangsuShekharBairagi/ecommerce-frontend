import React from "react";
import HeroSection from "../Component/HeroSection";
import Products from "../Component/Products";


function HomePage() {
  return (
    <div className="bg-transparent">
      <HeroSection />
      <Products />
    </div>
  );
}

export default HomePage;
