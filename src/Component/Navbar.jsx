import React, { useEffect, useState } from "react";
import {
  FaShoppingBag,
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { searchProductsThunk } from "../redux/productSlice";
import SearchReasult from "../pages/SearchReasult";
import Footer from "./Footer";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [displaySearch, setDisplaySearch] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const { token, role } = useSelector((state) => state.auth);
  const searchResults = useSelector((state) => state.products.searchResults);
  const searchError = useSelector((state) => state.products.searchError);

  const navigate = useNavigate();

  useEffect(() => {
    if (searchText.length < 3) {
      setDisplaySearch(false);
    }
  }, [searchText]);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
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
    { link: "/", name: "Shop" },
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

  const isLoggedIn = Boolean(token);
  const navLinks = [...commonLinks, ...(isLoggedIn ? userLinks : guestLinks)];

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex cursor-pointer items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 shadow-lg shadow-indigo-200">
                <FaShoppingBag className="text-xl text-white" />
              </div>
              <div>
                <h1 className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-2xl font-bold text-transparent">
                  TechStore
                </h1>
                <p className="-mt-1 text-xs text-slate-500">
                  Premium Electronics
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-8 lg:flex">
              {navLinks.map((navlink, idx) => (
                <NavLink
                  key={idx}
                  to={`${navlink.link}`}
                  className="relative font-medium text-slate-700 transition-colors duration-200 hover:text-indigo-600"
                >
                  {navlink.name}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-indigo-600 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              ))}
            </div>

            <div className="mx-8 hidden flex-1 items-center md:flex">
              <div className="relative w-full">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
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
              <button className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white/80 transition hover:bg-slate-50">
                <FaHeart className="text-lg text-slate-700" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-semibold text-white">
                  2
                </span>
              </button>

              <button
                className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white/80 transition hover:bg-slate-50"
                onClick={() => navigate("/addcard")}
              >
                <FaShoppingCart className="text-lg text-slate-700" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-semibold text-white">
                  {totalQuantity}
                </span>
              </button>

              <button
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white/80 transition hover:bg-slate-50"
                onClick={() => navigate("/profile")}
              >
                <FaUser className="text-lg text-slate-700" />
              </button>

              <button
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
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                onChange={(e) => handleChange(e.target.value)}
                type="text"
                placeholder="Search products..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
              {displaySearch && (
                <SearchReasult
                  searchError={searchError}
                  searchResult={searchResults}
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
                  to={`${navlink.link}`}
                  className="rounded-2xl px-4 py-3 text-slate-700 transition hover:bg-white hover:text-indigo-600"
                >
                  {navlink.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
      <Footer />
    </>
  );
}
