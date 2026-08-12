import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaMapMarkerAlt,
  FaCamera,
  FaUserPlus,
  FaCheckCircle,
  FaArrowRight,
  FaShieldAlt,
} from "react-icons/fa";

import { registerThunk } from "../redux/authSlice";
import AlertMessage from "../Component/AlertMessage";

function Registration() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [altetInfo, setAltetInfo] = useState({
    show: false,
    message: "",
  });

  const authError = useSelector((state) => state.auth.error);
  const authLoading = useSelector((state) => state.auth.loading);

  // =========================================
  // AUTH ERROR
  // =========================================
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  // =========================================
  // IMAGE PREVIEW
  // =========================================
  useEffect(() => {
    if (!image) {
      setImagePreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(image);

    setImagePreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [image]);

  // =========================================
  // INPUT CHANGE
  // =========================================
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

    if (error) {
      setError("");
    }
  };

  // =========================================
  // IMAGE CHANGE
  // =========================================
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setAltetInfo({
        show: true,
        message: "Please select a valid image.",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setAltetInfo({
        show: true,
        message: "Profile image must be less than 5 MB.",
      });
      return;
    }

    setImage(file);
  };

  // =========================================
  // SUBMIT
  // =========================================
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

      setAltetInfo({
        show: true,
        message: "Registration Successful",
      });

      navigate("/login");
    } catch (err) {
      setError(err?.message || err || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      {/* Alert */}
      {altetInfo.show && (
        <AlertMessage
          message={altetInfo.message}
          onClose={() =>
            setAltetInfo({
              show: false,
              message: "",
            })
          }
        />
      )}

      <div className="mx-auto max-w-6xl">
        {/* =========================================
            PAGE HEADER
        ========================================== */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600">
            <FaUserPlus />
            <span>User Management</span>
          </div>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Create User Account
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create a new account with profile and contact information.
          </p>
        </div>

        {/* =========================================
            MAIN CARD
        ========================================== */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Header */}
          <div className="border-b border-slate-200 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 px-6 py-6 text-white sm:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">New User Registration</h2>

                <p className="mt-1 text-sm text-indigo-100">
                  Enter the required information below
                </p>
              </div>

              <div className="hidden h-12 w-12 items-center justify-center rounded-xl bg-white/15 sm:flex">
                <FaUserPlus className="text-xl" />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-[280px_1fr]">
              {/* =====================================
                  PROFILE SIDEBAR
              ====================================== */}
              <aside className="border-b border-slate-200 bg-slate-50 p-6 lg:border-b-0 lg:border-r">
                <div className="sticky top-6">
                  <h3 className="text-sm font-bold text-slate-800">
                    Profile Photo
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Upload a profile avatar to personalize the account.
                  </p>

                  {/* Avatar */}
                  <div className="mt-6 flex justify-center">
                    <div className="relative">
                      <div className="h-36 w-36 overflow-hidden rounded-full border-4 border-white bg-slate-200 shadow-lg">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Profile preview"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full flex-col items-center justify-center text-slate-400">
                            <FaUser className="text-4xl" />
                            <span className="mt-2 text-xs">No photo</span>
                          </div>
                        )}
                      </div>

                      {/* Camera button */}
                      <label
                        htmlFor="profile-image"
                        className="absolute bottom-1 right-1 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-4 border-white bg-indigo-600 text-white shadow-md transition hover:bg-indigo-700"
                      >
                        <FaCamera />

                        <input
                          id="profile-image"
                          type="file"
                          accept="image/png,image/jpeg,image/webp"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Image information */}
                  <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-start gap-3">
                      <FaShieldAlt className="mt-0.5 shrink-0 text-indigo-500" />

                      <div>
                        <p className="text-xs font-semibold text-slate-700">
                          Profile image
                        </p>

                        <p className="mt-1 text-[11px] leading-4 text-slate-400">
                          JPG, PNG or WEBP. Maximum file size is 5 MB.
                        </p>
                      </div>
                    </div>
                  </div>

                  {image && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-600">
                      <FaCheckCircle />
                      Image selected
                    </div>
                  )}
                </div>
              </aside>

              {/* =====================================
                  FORM AREA
              ====================================== */}
              <div className="p-6 sm:p-8">
                {/* Error */}
                {error && (
                  <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3">
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500" />

                    <p className="text-sm font-medium text-red-600">{error}</p>
                  </div>
                )}

                {/* =================================
                    ACCOUNT INFORMATION
                ================================== */}
                <section>
                  <SectionHeader
                    icon={<FaUser />}
                    title="Account Information"
                    description="Basic information used to identify the user."
                  />

                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    {/* Username */}
                    <FormInput
                      label="Username"
                      name="username"
                      value={loginData.username}
                      onChange={handleChange}
                      placeholder="Enter username"
                      icon={<FaUser />}
                      required
                    />

                    {/* Email */}
                    <FormInput
                      label="Email Address"
                      name="email"
                      type="email"
                      value={loginData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      icon={<FaEnvelope />}
                      required
                    />

                    {/* Password */}
                    <div className="sm:col-span-2">
                      <FormInput
                        label="Password"
                        name="password"
                        type="password"
                        value={loginData.password}
                        onChange={handleChange}
                        placeholder="Create a secure password"
                        icon={<FaLock />}
                        required
                      />
                    </div>
                  </div>
                </section>

                {/* Divider */}
                <div className="my-8 h-px bg-slate-100" />

                {/* =================================
                    ADDRESS
                ================================== */}
                <section>
                  <SectionHeader
                    icon={<FaMapMarkerAlt />}
                    title="Address Information"
                    description="Provide the user's primary delivery address."
                  />

                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <FormInput
                      label="Street"
                      name="street"
                      value={loginData.userAddress.street}
                      onChange={handleChange}
                      placeholder="Street / House address"
                      required
                    />

                    <FormInput
                      label="City"
                      name="city"
                      value={loginData.userAddress.city}
                      onChange={handleChange}
                      placeholder="City"
                      required
                    />

                    <FormInput
                      label="State"
                      name="state"
                      value={loginData.userAddress.state}
                      onChange={handleChange}
                      placeholder="State"
                      required
                    />

                    <FormInput
                      label="PIN Code"
                      name="pinCode"
                      value={loginData.userAddress.pinCode}
                      onChange={handleChange}
                      placeholder="6-digit PIN code"
                      maxLength={6}
                      required
                    />
                  </div>
                </section>

                {/* =================================
                    ACTION AREA
                ================================== */}
                <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="h-12 rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={authLoading}
                    className="group flex h-12 items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-7 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:from-indigo-700 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {authLoading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-5 text-center text-xs text-slate-400">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

// =============================================
// SECTION HEADER
// =============================================
const SectionHeader = ({ icon, title, description }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
        {icon}
      </div>

      <div>
        <h3 className="text-base font-bold text-slate-900">{title}</h3>

        <p className="mt-1 text-xs text-slate-400">{description}</p>
      </div>
    </div>
  );
};

// =============================================
// FORM INPUT
// =============================================
const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
  required = false,
  maxLength,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        {label}

        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
            {icon}
          </span>
        )}

        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          className={`h-12 w-full rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50 ${
            icon ? "pl-11 pr-4" : "px-4"
          }`}
        />
      </div>
    </div>
  );
};

export default Registration;
