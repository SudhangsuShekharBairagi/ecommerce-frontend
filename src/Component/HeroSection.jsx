import {
  FaArrowRight,
  FaLaptop,
  FaMobileAlt,
  FaHeadphones,
} from "react-icons/fa";
import { useNavigate } from "react-router";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:py-24 lg:grid-cols-2">
        {/* Left Content */}
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-400">
            Welcome to TechStore
          </p>

          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            Everything You Need
            <span className="block text-blue-400">For Your Tech Life</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
            Explore the latest laptops, smartphones, accessories and gaming
            products at great prices. Quality products, secure payment and fast
            delivery.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/#products")}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
            >
              Shop Now
              <FaArrowRight />
            </button>

            <button
              onClick={() => navigate("/#products")}
              className="rounded-xl border border-slate-600 px-6 py-3 font-semibold text-slate-200 transition hover:bg-white/10"
            >
              Browse Products
            </button>
          </div>

          {/* Features */}
          <div className="mt-10 flex flex-wrap gap-8 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <FaLaptop className="text-blue-400" />
              Latest Technology
            </div>

            <div className="flex items-center gap-2">
              <FaMobileAlt className="text-blue-400" />
              Best Prices
            </div>

            <div className="flex items-center gap-2">
              <FaHeadphones className="text-blue-400" />
              Quality Products
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative flex justify-center">
          <div className="relative flex h-72 w-72 items-center justify-center rounded-3xl bg-blue-600/20 shadow-2xl shadow-blue-900/40 sm:h-96 sm:w-96">
            <div className="absolute inset-6 rounded-3xl border border-blue-400/20 bg-white/5 backdrop-blur-sm" />

            <FaLaptop className="relative z-10 text-[150px] text-blue-400 sm:text-[190px]" />

            {/* Small Product Cards */}
            <div className="absolute -left-6 top-8 rounded-xl border border-white/10 bg-slate-900 px-4 py-3 shadow-xl">
              <FaMobileAlt className="text-2xl text-cyan-400" />
            </div>

            <div className="absolute -right-6 bottom-8 rounded-xl border border-white/10 bg-slate-900 px-4 py-3 shadow-xl">
              <FaHeadphones className="text-2xl text-purple-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
