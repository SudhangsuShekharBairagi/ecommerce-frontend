import {
  FaArrowRight,
  FaShippingFast,
  FaShieldAlt,
  FaHeadset,
  FaLaptop,
} from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-700 text-white">
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-blue-100 backdrop-blur">
              🚀 New Collection 2026
            </span>

            <h1 className="text-5xl font-extrabold leading-tight md:text-6xl">
              Upgrade Your
              <span className="mt-2 block bg-gradient-to-r from-blue-300 via-cyan-300 to-white bg-clip-text text-transparent">
                Tech Lifestyle
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-200">
              Discover premium laptops, smartphones, accessories and gaming gear
              at unbeatable prices with fast delivery and trusted quality.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="flex items-center gap-2 rounded-2xl bg-white px-7 py-3 font-semibold text-indigo-700 transition hover:bg-slate-100">
                Shop Now
                <FaArrowRight />
              </button>

              <button className="rounded-2xl border border-white/30 bg-white/10 px-7 py-3 font-semibold text-white transition hover:bg-white/20">
                Explore Products
              </button>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-6">
              <div className="text-center">
                <FaShippingFast className="mx-auto mb-3 text-3xl text-cyan-300" />
                <p className="font-semibold">Fast Delivery</p>
              </div>

              <div className="text-center">
                <FaShieldAlt className="mx-auto mb-3 text-3xl text-emerald-300" />
                <p className="font-semibold">Secure Payment</p>
              </div>

              <div className="text-center">
                <FaHeadset className="mx-auto mb-3 text-3xl text-amber-300" />
                <p className="font-semibold">24/7 Support</p>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="flex h-[360px] w-[360px] items-center justify-center rounded-[32px] border border-white/15 bg-white/10 p-12 shadow-2xl backdrop-blur-xl">
              <FaLaptop className="text-[180px] text-cyan-200" />
            </div>

            <div className="absolute -left-3 top-0 rounded-2xl border border-white/20 bg-slate-900/70 px-5 py-4 shadow-xl backdrop-blur">
              <p className="text-sm text-slate-300">Starting From</p>
              <h3 className="text-xl font-bold text-cyan-300">₹499</h3>
            </div>

            <div className="absolute -right-3 bottom-5 rounded-2xl border border-white/20 bg-slate-900/70 px-5 py-4 shadow-xl backdrop-blur">
              <p className="text-sm text-slate-300">Special Offer</p>
              <h3 className="font-bold text-emerald-300">Up to 40% OFF</h3>
            </div>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/20 bg-slate-900/70 px-5 py-4 shadow-xl backdrop-blur">
              ⭐ 4.9 Rating
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
