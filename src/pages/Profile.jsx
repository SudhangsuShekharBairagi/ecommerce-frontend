import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProfileThunk, fetchProfile } from "../redux/profileSlice";
import { FaUserEdit, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const loading = useSelector((state) => state.profile.loading);
  const error = useSelector((state) => state.profile.error);
  const [edit, setEdit] = useState(false);

  const [profileData, setProfileData] = useState({
    username: "",
    street: "",
    city: "",
    pinCode: "",
    state: "",
  });

  useEffect(() => {
    if (!profile) {
      dispatch(fetchProfile());
    }
  }, [dispatch, profile]);

  useEffect(() => {
    if (profile) {
      setProfileData({
        username: profile.username || "",
        street: profile.street || "",
        city: profile.city || "",
        pinCode: profile.pinCode || "",
        state: profile.state || "",
      });
    }
  }, [profile]);

  const handleEdit = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await dispatch(editProfileThunk(profileData)).unwrap();
      setEdit(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  if (loading || (!profile && !error)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-6">
        <div className="rounded-3xl border border-slate-200 bg-white/90 px-8 py-6 text-center shadow-sm backdrop-blur">
          <h1 className="text-2xl font-semibold text-slate-900">
            Loading profile...
          </h1>
        </div>
      </div>
    );
  }

  const userDetais = edit ? (
    <>
      <div className="text-center">
        <input
          type="text"
          name="username"
          id="username"
          className="h-11 w-full rounded-2xl border border-indigo-200 bg-indigo-50 px-4 text-center font-semibold text-indigo-700 outline-none transition focus:border-indigo-500 focus:bg-white"
          value={profileData.username}
          onChange={(e) => handleEdit("username", e.target.value)}
          placeholder="Enter your username"
        />

        <div className="mt-2 flex items-center justify-center gap-2 text-sm text-slate-500">
          <FaEnvelope />
          <span>{profile?.email ?? "-"}</span>
        </div>
      </div>

      <div className="my-6 border-t border-slate-200"></div>

      <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-indigo-600">
          <FaMapMarkerAlt />
          <h3 className="text-lg font-semibold">Address</h3>
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="street"
            id="street"
            className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-center font-semibold text-slate-700 outline-none transition focus:border-indigo-500"
            value={profileData.street}
            onChange={(e) => handleEdit("street", e.target.value)}
            placeholder="Enter your street"
          />

          <input
            type="text"
            name="city"
            id="city"
            className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-center font-semibold text-slate-700 outline-none transition focus:border-indigo-500"
            value={profileData.city}
            onChange={(e) => handleEdit("city", e.target.value)}
            placeholder="Enter your city"
          />

          <input
            type="text"
            name="state"
            id="state"
            className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-center font-semibold text-slate-700 outline-none transition focus:border-indigo-500"
            value={profileData.state}
            onChange={(e) => handleEdit("state", e.target.value)}
            placeholder="Enter your state"
          />

          <input
            type="text"
            name="pinCode"
            id="pinCode"
            className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-center font-semibold text-slate-700 outline-none transition focus:border-indigo-500"
            value={profileData.pinCode}
            onChange={(e) => handleEdit("pinCode", e.target.value)}
            placeholder="Enter your pin code"
          />
        </div>
        <button
          onClick={handleSave}
          className="mt-6 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 py-3 font-semibold text-white transition hover:from-indigo-700 hover:to-blue-700"
        >
          Save
        </button>
      </div>
    </>
  ) : (
    <>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900">
          {profile?.username ?? "Guest"}
        </h2>
        <div className="mt-2 flex items-center justify-center gap-2 text-sm text-slate-500">
          <FaEnvelope />
          <span>{profile?.email ?? "-"}</span>
        </div>
      </div>
      <div className="my-6 border-t border-slate-200"></div>
      <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-indigo-600">
          <FaMapMarkerAlt />
          <h3 className="text-lg font-semibold">Address</h3>
        </div>

        <div className="space-y-2 text-slate-700">
          <div className="flex justify-between">
            <span className="font-medium">Street</span>
            <span>{profile.street || "-"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">City</span>
            <span>{profile.city || "-"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">State</span>
            <span>{profile.state || "-"}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">PIN Code</span>
            <span>{profile.pinCode || "-"}</span>
          </div>
        </div>
      </div>
    </>
  );

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
        <div className="rounded-3xl border border-rose-200 bg-rose-50 px-8 py-6 shadow-sm text-center">
          <h1 className="text-2xl font-semibold text-rose-700">{error}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-6">
      <div className="w-full max-w-md overflow-hidden rounded-[32px] border border-white/10 bg-white shadow-[0_25px_80px_-20px_rgba(15,23,42,0.45)]">
        <div className="relative h-32 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500">
          <button className="absolute right-4 top-4 cursor-pointer text-2xl text-white transition hover:scale-110">
            <FaUserEdit />
          </button>

          <div className="absolute left-1/2 -bottom-14 -translate-x-1/2">
            <div className="h-28 w-28 rounded-full bg-white p-1 shadow-lg">
              <img
                src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
                alt="Profile"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="px-6 pb-8 pt-20">
          {userDetais}
          <button
            className="mt-6 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 py-3 font-semibold text-white transition hover:from-indigo-700 hover:to-blue-700"
            onClick={() => setEdit(!edit)}
          >
            {edit ? "Cancel" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
