import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../redux/authSlice";
import { fetchCartItems } from "../api/productsApi";
import { setCart } from "../redux/cartSlice";

const Login = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);
  const token = useSelector((state) => state.auth.token);
  const getStoreCartItems = async () => {
    try {
      const data = await fetchCartItems();
      dispatch(setCart(Array.isArray(data) ? data : []));
    } catch (error) {
      console.error("Failed to sync cart after login", error);
    }
  };

  useEffect(() => {
    if (token) {
      getStoreCartItems();
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await dispatch(loginThunk(loginData)).unwrap();
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="w-full overflow-hidden rounded-4xl border border-white/10 bg-white/90 shadow-[0_25px_80px_-20px_rgba(15,23,42,0.45)] backdrop-blur-xl">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="hidden lg:flex flex-col justify-between bg-linear-to-br from-indigo-600 via-blue-600 to-cyan-500 p-10 text-white">
              <div>
                <p className="mb-4 inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur">
                  Fresh picks, faster checkout
                </p>
                <h2 className="text-4xl font-semibold leading-tight">
                  Welcome back to your next favorite store.
                </h2>
                <p className="mt-4 max-w-md text-lg text-indigo-50/90">
                  Sign in to reconnect with your saved favorites and continue
                  shopping seamlessly.
                </p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 text-sm text-indigo-50">
                <p className="font-semibold">Why shoppers love us</p>
                <p className="mt-2">
                  Fast delivery, trusted products, and a polished experience
                  every time.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center p-8 sm:p-10 lg:p-12">
              <form
                onSubmit={handleSubmit}
                className="w-full max-w-md space-y-5"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-semibold text-slate-900">
                    Login
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Enter your details to continue
                  </p>
                </div>

                {error && (
                  <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-700">
                    <span className="mb-2 block">Email</span>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      value={loginData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    />
                  </label>

                  <label className="block text-sm font-medium text-slate-700">
                    <span className="mb-2 block">Password</span>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                      value={loginData.password}
                      onChange={handleChange}
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:from-indigo-700 hover:to-blue-700"
                >
                  Login
                </button>

                <div className="pt-2 text-center text-sm text-slate-500">
                  <span>Not registered yet?</span>{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="font-semibold text-indigo-600 transition hover:text-indigo-700"
                  >
                    Create an account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
