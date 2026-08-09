import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "../redux/authSlice";
import AlertMessage from "../Component/AlertMessage";

function Registration() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    email: "",
    password: "",
    userAddress: {
      street: "",
      city: "",
      state: "",
      pinCode: "",
    },
  });

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);
  const authLoading = useSelector((state) => state.auth.loading);
  const [altetInfo, setAltetInfo] = useState({ show: false, message: "" });
  const [image, setImage] = useState(null);
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["street", "city", "state", "pinCode"].includes(name)) {
      setLoginData((prev) => ({
        ...prev,
        userAddress: {
          ...prev.userAddress,
          [name]: value,
        },
      }));
    } else {
      setLoginData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setImage(file || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!image) {
      setAltetInfo({
        show: true,
        message: "Please select a profile image.",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("imageFile", image);
      formData.append(
        "user",
        new Blob([JSON.stringify(loginData)], {
          type: "application/json",
        }),
      );

      await dispatch(registerThunk(formData)).unwrap();
      // alert("Registration Successful");
      setAltetInfo({
        show: true,
        message: `Registration Successful`,
      });
      navigate("/login");
    } catch (err) {
      setError(err.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-10 sm:px-6 lg:px-8">
      {altetInfo.show && (
        <AlertMessage
          message={altetInfo.message}
          onClose={() => setAltetInfo({ show: false, message: " " })}
        />
      )}
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
        <div className="w-full overflow-hidden rounded-[32px] border border-white/10 bg-white/90 shadow-[0_25px_80px_-20px_rgba(15,23,42,0.45)] backdrop-blur-xl">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            <div className="flex flex-col justify-between bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-700 p-8 text-white sm:p-10 lg:p-12">
              <div>
                <p className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur">
                  Join our growing community
                </p>
                <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
                  Create your account and shop with confidence.
                </h2>
                <p className="mt-4 max-w-md text-base text-indigo-50/90 sm:text-lg">
                  Sign up in minutes to access exclusive offers and a smoother
                  checkout experience.
                </p>
              </div>
              <div className="mt-6 rounded-2xl border border-white/20 bg-white/10 p-4 text-sm text-indigo-50">
                <p className="font-semibold">Trusted by modern shoppers</p>
                <p className="mt-2">
                  Secure sign-up, dependable delivery, and personalized
                  recommendations.
                </p>
              </div>
            </div>

            <div className="p-8 sm:p-10 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-center">
                  <h2 className="text-3xl font-semibold text-slate-900">
                    User Registration
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Fill in your details to get started
                  </p>
                </div>

                {error && (
                  <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-center text-sm font-medium text-rose-600">
                    {error}
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
                    <span className="mb-2 block">Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    />
                  </label>
                  <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
                    <span className="mb-2 block">Username</span>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={loginData.username}
                      onChange={handleChange}
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    />
                  </label>

                  <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
                    <span className="mb-2 block">Email</span>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={loginData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    />
                  </label>

                  <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
                    <span className="mb-2 block">Password</span>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={loginData.password}
                      onChange={handleChange}
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    />
                  </label>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Address
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-medium text-slate-700">
                      <span className="mb-2 block">Street</span>
                      <input
                        type="text"
                        name="street"
                        placeholder="Street"
                        value={loginData.userAddress.street}
                        onChange={handleChange}
                        required
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                      />
                    </label>

                    <label className="block text-sm font-medium text-slate-700">
                      <span className="mb-2 block">City</span>
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={loginData.userAddress.city}
                        onChange={handleChange}
                        required
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                      />
                    </label>

                    <label className="block text-sm font-medium text-slate-700">
                      <span className="mb-2 block">State</span>
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={loginData.userAddress.state}
                        onChange={handleChange}
                        required
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                      />
                    </label>

                    <label className="block text-sm font-medium text-slate-700">
                      <span className="mb-2 block">Pin Code</span>
                      <input
                        type="text"
                        name="pinCode"
                        placeholder="Pin Code"
                        value={loginData.userAddress.pinCode}
                        onChange={handleChange}
                        required
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                      />
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:from-indigo-700 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {authLoading ? "Processing..." : "Register"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
