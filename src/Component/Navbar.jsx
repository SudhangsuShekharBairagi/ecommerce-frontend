import React, { useEffect, useMemo, useState } from "react";
import {
  FaBars,
  FaHeart,
  FaSearch,
  FaShoppingBag,
  FaShoppingCart,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { searchProductsThunk } from "../redux/productSlice";
import SearchReasult from "./SearchReasult";
import Button from "./ui/Button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [displaySearch, setDisplaySearch] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products.entities);
  const { token, role } = useSelector((state) => state.auth);
  const searchResults = useSelector((state) => state.products.searchResults);
  const searchError = useSelector((state) => state.products.searchError);

  useEffect(() => {
    if (searchText.length < 3) {
      setDisplaySearch(false);
    }
  }, [searchText]);

  const totalQuantity = useMemo(
    () =>
      cartItems.reduce((total, item) => total + Number(item.quantity || 0), 0),
    [cartItems],
  );

  const subtotal = useMemo(
    () =>
      cartItems.reduce((total, item) => {
        const product = products[item.productId];
        return total + (product?.price || 0) * Number(item.quantity || 0);
      }, 0),
    [cartItems, products],
  );

  const handleChange = (value) => {
    setSearchText(value);
    if (value.length >= 3) {
      setDisplaySearch(true);
      dispatch(searchProductsThunk(value));
    } else {
      setDisplaySearch(false);
    }
  };

  const commonLinks = [
    { link: "/", name: "Home" },
    { link: "/orders", name: "MyOrders" },
  ];

  const guestLinks = [
    { link: "/login", name: "Login" },
    { link: "/register", name: "Register" },
  ];

  const userLinks = [
    ...(role === "ROLE_ADMIN"
      ? [{ link: "/addproduct", name: "Add Product" }]
      : []),
    { link: "/logout", name: "Logout" },
  ];

  const navLinks = [...commonLinks, ...(token ? userLinks : guestLinks)];

  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center gap-3 text-left"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-600 via-blue-600 to-cyan-500 shadow-lg shadow-indigo-200">
                <FaShoppingBag className="text-xl text-white" />
              </div>
              <div>
                <h1 className="bg-linear-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-2xl font-bold text-transparent">
                  TechStore
                </h1>
                <p className="-mt-1 text-xs text-slate-500">
                  Premium Electronics
                </p>
              </div>
            </button>

            <div className="hidden items-center gap-8 lg:flex">
              {navLinks.map((navlink, idx) => (
                <NavLink
                  key={idx}
                  to={navlink.link}
                  className={({ isActive }) =>
                    [
                      "relative font-medium transition-colors duration-200",
                      isActive
                        ? "text-indigo-600"
                        : "text-slate-700 hover:text-indigo-600",
                    ].join(" ")
                  }
                >
                  {navlink.name}
                </NavLink>
              ))}
            </div>

            <div className="hidden flex-1 items-center justify-center px-6 md:flex">
              <div className="relative w-full max-w-xl">
                <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={searchText}
                  onChange={(e) => handleChange(e.target.value)}
                  type="text"
                  placeholder="Search products..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
                {displaySearch && (
                  <SearchReasult
                    searchError={searchError}
                    searchResult={searchResults}
                    setDisplaySearch={setDisplaySearch}
                  />
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="relative hidden h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white/80 transition hover:bg-slate-50 lg:flex"
              >
                <FaHeart className="text-lg text-slate-700" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-semibold text-white">
                  2
                </span>
              </button>

              <button
                type="button"
                onClick={() => setCartOpen(true)}
                className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white/80 transition hover:bg-slate-50"
              >
                <FaShoppingCart className="text-lg text-slate-700" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-semibold text-white">
                  {totalQuantity}
                </span>
              </button>

              <button
                type="button"
                onClick={() => navigate(token ? "/profile" : "/login")}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white/80 transition hover:bg-slate-50"
              >
                <FaUser className="text-lg text-slate-700" />
              </button>

              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white/80 transition hover:bg-slate-50 lg:hidden"
              >
                {isMenuOpen ? (
                  <FaTimes className="text-xl text-slate-700" />
                ) : (
                  <FaBars className="text-xl text-slate-700" />
                )}
              </button>
            </div>
          </div>

          <div className="pb-4 md:hidden">
            <div className="relative">
              <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={searchText}
                onChange={(e) => handleChange(e.target.value)}
                type="text"
                placeholder="Search products..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
              {displaySearch && (
                <SearchReasult
                  searchError={searchError}
                  searchResult={searchResults}
                  setDisplaySearch={setDisplaySearch}
                />
              )}
            </div>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 lg:hidden ${
            isMenuOpen ? "max-h-96 border-t border-slate-200" : "max-h-0"
          }`}
        >
          <div className="bg-slate-50/70 px-4 py-4">
            <div className="flex flex-col space-y-1">
              {navLinks.map((navlink, idx) => (
                <NavLink
                  key={idx}
                  to={navlink.link}
                  className="rounded-2xl px-4 py-3 text-slate-700 transition hover:bg-white hover:text-indigo-600"
                >
                  {navlink.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <aside
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md border-l border-slate-200 bg-white/90 shadow-[0_30px_80px_rgba(15,23,42,0.22)] backdrop-blur-xl transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600">
                Cart
              </p>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">
                Your bag
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setCartOpen(false)}
              className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
            {cartItems.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                <p className="text-lg font-semibold text-slate-800">
                  Your cart is empty
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Add a few favorites to continue shopping.
                </p>
              </div>
            ) : (
              cartItems.map((item) => {
                const product = products[item.productId];
                if (!product) return null;

                return (
                  <div
                    key={item.productId}
                    className="rounded-[22px] border border-slate-200 bg-slate-50 p-3"
                  >
                    <div className="flex gap-3">
                      <img
                        src={
                          product.imageUrl ||
                          "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80"
                        }
                        alt={product.name}
                        className="h-20 w-20 rounded-2xl object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h4 className="text-sm font-semibold text-slate-900">
                              {product.name}
                            </h4>
                            <p className="text-xs text-slate-500">
                              {product.brand}
                            </p>
                          </div>
                          <p className="text-sm font-semibold text-slate-900">
                            ₹{product.price}
                          </p>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs text-slate-500">
                            Qty: {item.quantity}
                          </span>
                          <span className="text-xs font-semibold text-indigo-600">
                            ₹{product.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="border-t border-slate-200 bg-slate-50 p-5">
            <div className="mb-4 flex items-center justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span className="text-lg font-bold text-slate-900">
                ₹{subtotal}
              </span>
            </div>
            <Button
              variant="accent"
              className="w-full"
              onClick={() => {
                setCartOpen(false);
                navigate("/addcard");
              }}
            >
              Review cart
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
