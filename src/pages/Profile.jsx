// jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProfileThunk, fetchProfile } from "../redux/profileSlice";

import {
  FaUser,
  FaMapMarkerAlt,
  FaEnvelope,
  FaCamera,
  FaCheck,
  FaTimes,
  FaShieldAlt,
} from "react-icons/fa";

import { MdEdit, MdLocationOn } from "react-icons/md";
import { editImage } from "../api/productsApi";

function Profile() {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.profile.profile);
  const loading = useSelector((state) => state.profile.loading);
  const error = useSelector((state) => state.profile.error);

  const [edit, setEdit] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    username: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
  });

  // -----------------------------
  // Fetch profile
  // -----------------------------
  useEffect(() => {
    if (!profile) {
      dispatch(fetchProfile());
    }
  }, [dispatch, profile]);

  // -----------------------------
  // Populate form
  // -----------------------------
  useEffect(() => {
    if (profile) {
      setProfileData({
        username: profile.username || "",
        street: profile.street || "",
        city: profile.city || "",
        state: profile.state || "",
        pinCode: profile.pinCode || "",
      });
    }
  }, [profile]);

  // -----------------------------
  // Handle input
  // -----------------------------
  const handleEdit = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // -----------------------------
  // Save profile
  // -----------------------------
  const handleSave = async () => {
    try {
      setSaveLoading(true);

      await dispatch(editProfileThunk(profileData)).unwrap();

      setEdit(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
    } finally {
      setSaveLoading(false);
    }
  };

  // -----------------------------
  // Cancel editing
  // -----------------------------
  const handleCancel = () => {
    if (profile) {
      setProfileData({
        username: profile.username || "",
        street: profile.street || "",
        city: profile.city || "",
        state: profile.state || "",
        pinCode: profile.pinCode || "",
      });
    }

    setEdit(false);
  };

  // -----------------------------
  // Image upload
  // -----------------------------
  const handleImageChange = async (e) => {
    const image = e.target.files?.[0];

    if (!image) return;

    if (!image.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    if (image.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5 MB.");
      return;
    }

    try {
      setImageLoading(true);

      const message = await editImage(image);

      alert(message);

      // Refresh profile so the new image appears
      dispatch(fetchProfile());
    } catch (err) {
      alert(err.message || "Failed to update profile image");
    } finally {
      setImageLoading(false);
    }
  };

  // -----------------------------
  // Loading
  // -----------------------------
  if (loading && !profile) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

          <p className="text-sm font-medium text-slate-500">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  // -----------------------------
  // Error
  // -----------------------------
  if (error && !profile) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <FaTimes className="text-xl text-red-500" />
          </div>

          <h2 className="text-xl font-bold text-slate-900">
            Unable to load profile
          </h2>

          <p className="mt-2 text-sm text-slate-500">{error}</p>

          <button
            onClick={() => dispatch(fetchProfile())}
            className="mt-6 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const profileImage =
    profile?.imageUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      profile?.username || "User",
    )}&background=4f46e5&color=fff&size=256`;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mx-auto mb-8 max-w-6xl">
        <div>
          <p className="text-sm font-medium text-indigo-600">Account</p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your personal information and delivery address.
          </p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[320px_1fr]">
        {/* =====================================
            LEFT PROFILE CARD
        ====================================== */}
        <aside className="h-fit overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Cover */}
          <div className="relative h-28 bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white" />
              <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-white" />
            </div>
          </div>

          {/* Avatar */}
          <div className="relative px-6">
            <div className="-mt-14 flex justify-center">
              <div className="relative">
                <div className="h-28 w-28 rounded-full border-4 border-white bg-white p-1 shadow-lg">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>

                {/* Camera Button */}
                <label
                  htmlFor="profile-image"
                  className="absolute bottom-1 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-4 border-white bg-indigo-600 text-white shadow-md transition hover:bg-indigo-700"
                >
                  {imageLoading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <FaCamera className="text-sm" />
                  )}
                </label>

                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={imageLoading}
                />
              </div>
            </div>

            {/* User info */}
            <div className="pb-6 pt-4 text-center">
              <h2 className="text-xl font-bold text-slate-900">
                {profile?.username || "Guest User"}
              </h2>

              <div className="mt-2 flex items-center justify-center gap-2 text-sm text-slate-500">
                <FaEnvelope className="text-indigo-500" />
                <span className="break-all">{profile?.email || "-"}</span>
              </div>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Account Active
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div className="border-t border-slate-100 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                <FaShieldAlt className="text-indigo-600" />
              </div>

              <div>
                <p className="text-xs text-slate-400">Account Security</p>

                <p className="text-sm font-semibold text-slate-700">
                  Protected
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* =====================================
            RIGHT CONTENT
        ====================================== */}
        <main className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Personal Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update the information associated with your account.
              </p>
            </div>

            {!edit && (
              <button
                onClick={() => setEdit(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                <MdEdit className="text-lg" />
                Edit Profile
              </button>
            )}
          </div>

          {/* Content */}
          <div className="space-y-8 p-6">
            {/* =============================
                PERSONAL INFORMATION
            ============================== */}
            <section>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                  <FaUser className="text-indigo-600" />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Basic Information
                  </h3>

                  <p className="text-xs text-slate-400">Your account details</p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {/* Username */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Username
                  </label>

                  {edit ? (
                    <input
                      type="text"
                      value={profileData.username}
                      onChange={(e) => handleEdit("username", e.target.value)}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                      placeholder="Enter your username"
                    />
                  ) : (
                    <div className="flex h-12 items-center rounded-xl bg-slate-50 px-4 text-sm font-medium text-slate-700">
                      {profile?.username || "-"}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email Address
                  </label>

                  <div className="flex h-12 items-center gap-3 rounded-xl bg-slate-50 px-4 text-sm font-medium text-slate-600">
                    <FaEnvelope className="text-indigo-500" />
                    {profile?.email || "-"}
                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    Email address cannot be changed here.
                  </p>
                </div>
              </div>
            </section>

            {/* Divider */}
            <div className="border-t border-slate-100" />

            {/* =============================
                ADDRESS
            ============================== */}
            <section>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                  <MdLocationOn className="text-xl text-blue-600" />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Delivery Address
                  </h3>

                  <p className="text-xs text-slate-400">
                    Used for your orders and deliveries
                  </p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {/* Street */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Street Address
                  </label>

                  {edit ? (
                    <input
                      type="text"
                      value={profileData.street}
                      onChange={(e) => handleEdit("street", e.target.value)}
                      className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                      placeholder="Enter your street address"
                    />
                  ) : (
                    <AddressValue value={profile?.street} />
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    City
                  </label>

                  {edit ? (
                    <input
                      type="text"
                      value={profileData.city}
                      onChange={(e) => handleEdit("city", e.target.value)}
                      className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                      placeholder="City"
                    />
                  ) : (
                    <AddressValue value={profile?.city} />
                  )}
                </div>

                {/* State */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    State
                  </label>

                  {edit ? (
                    <input
                      type="text"
                      value={profileData.state}
                      onChange={(e) => handleEdit("state", e.target.value)}
                      className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                      placeholder="State"
                    />
                  ) : (
                    <AddressValue value={profile?.state} />
                  )}
                </div>

                {/* PIN */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    PIN Code
                  </label>

                  {edit ? (
                    <input
                      type="text"
                      inputMode="numeric"
                      value={profileData.pinCode}
                      onChange={(e) => handleEdit("pinCode", e.target.value)}
                      className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                      placeholder="PIN code"
                    />
                  ) : (
                    <AddressValue value={profile?.pinCode} />
                  )}
                </div>
              </div>
            </section>

            {/* =============================
                ACTIONS
            ============================== */}
            {edit && (
              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                <button
                  onClick={handleCancel}
                  disabled={saveLoading}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  <FaTimes />
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  disabled={saveLoading}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saveLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaCheck />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

// -----------------------------------------
// Address display component
// -----------------------------------------
function AddressValue({ value }) {
  return (
    <div className="flex h-12 items-center rounded-xl bg-slate-50 px-4 text-sm font-medium text-slate-700">
      {value || <span className="text-slate-400">Not provided</span>}
    </div>
  );
}

export default Profile;
