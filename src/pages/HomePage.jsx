import React from "react";
import {
  FaArrowRight,
  FaCheck,
  FaShieldAlt,
  FaShippingFast,
  FaStar,
} from "react-icons/fa";
import HeroSection from "../Component/HeroSection";
import Products from "../Component/Products";
import ProductFilter from "../Component/ProductFilter";
import Button from "../components/ui/Button";

const categoryCards = [
  {
    title: "Audio",
    subtitle: "Immersive sound",
    color: "from-violet-500 to-indigo-500",
  },
  {
    title: "Mobiles",
    subtitle: "Smart everyday tech",
    color: "from-cyan-500 to-sky-500",
  },
  {
    title: "Laptops",
    subtitle: "Power for creators",
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "Gaming",
    subtitle: "Performance-first gear",
    color: "from-rose-500 to-pink-500",
  },
];

const trustStats = [
  { label: "Free shipping", value: "24h" },
  { label: "Happy shoppers", value: "12k+" },
  { label: "Return window", value: "30 days" },
  { label: "Secure checkout", value: "256-bit" },
];

const testimonials = [
  {
    name: "Ariana Lee",
    role: "Design Lead",
    quote:
      "The experience feels premium, fast, and polished. I found exactly what I needed in minutes.",
  },
  {
    name: "Nolan Price",
    role: "Creator",
    quote:
      "The product flow is smooth and trustworthy. It makes buying tech feel effortless and confident.",
  },
  {
    name: "Priya Shah",
    role: "Remote Consultant",
    quote:
      "Clean visuals, excellent mobile UX, and the final checkout feels frictionless on every device.",
  },
];

function HomePage() {
  return (
    <div className="bg-transparent">
      <HeroSection />

      <section className="mx-auto -mt-8 max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          {trustStats.map((item) => (
            <div
              key={item.label}
              className="glass-panel rounded-[24px] p-5 shadow-[0_20px_40px_rgba(15,23,42,0.04)]"
            >
              <p className="text-2xl font-bold text-slate-900">{item.value}</p>
              <p className="mt-1 text-sm text-slate-600">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-indigo-600">
              Shop by category
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Curated collections for every need
            </h2>
          </div>
          <Button variant="secondary" className="hidden md:inline-flex">
            Explore all
          </Button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {categoryCards.map((category) => (
            <div
              key={category.title}
              className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_24px_50px_-28px_rgba(15,23,42,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_35px_60px_-30px_rgba(99,102,241,0.30)]"
            >
              <div
                className={`mb-6 h-32 rounded-[22px] bg-gradient-to-br ${category.color} p-4 shadow-inner`}
              />
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {category.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {category.subtitle}
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition group-hover:bg-indigo-600 group-hover:text-white">
                  <FaArrowRight />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Products />
      <ProductFilter />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_25px_60px_-30px_rgba(15,23,42,0.28)] md:p-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-indigo-600">
                Why customers choose us
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Built around trust and delight
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
              <FaCheck />
              4.9 average rating
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-[26px] border border-slate-200 bg-slate-50 p-5">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                <FaShippingFast />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Fast delivery
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Optimized delivery windows with real-time tracking for every
                order.
              </p>
            </div>
            <div className="rounded-[26px] border border-slate-200 bg-slate-50 p-5">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <FaShieldAlt />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Secure payments
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Protected checkouts and trusted payment partners for peace of
                mind.
              </p>
            </div>
            <div className="rounded-[26px] border border-slate-200 bg-slate-50 p-5">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                <FaStar />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Premium support
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Friendly service, product expertise, and hassle-free post-order
                support.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-indigo-600">
            Testimonials
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Loved by modern shoppers
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((person) => (
            <div
              key={person.name}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.28)]"
            >
              <div className="mb-4 flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }, (_, index) => (
                  <FaStar key={`${person.name}-${index}`} className="text-sm" />
                ))}
              </div>
              <p className="text-base leading-7 text-slate-600">
                “{person.quote}”
              </p>
              <div className="mt-6 border-t border-slate-200 pt-4">
                <p className="font-semibold text-slate-900">{person.name}</p>
                <p className="text-sm text-slate-500">{person.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
