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
      <div className="flex min-h-screen  items-center justify-center bg-gray-100 p-6">
        <div className="rounded-3xl border border-slate-200 bg-white px-8 py-6 shadow-sm text-center">
          <h1 className="text-2xl font-semibold text-slate-900">
            Loading profile...
          </h1>
        </div>
      </div>
    );
  }

  const userDetais = edit ? (
    <>
      {/* Name */}
      <div className="text-center">
        {/* <h2 className="text-2xl font-bold text-gray-800">
          {profile?.username ?? "Guest"}
        </h2> */}
        <input
          type="text"
          name="username"
          id="username"
          className="w-full h-10 rounded-2xl text-center font-bold text-sky-700 border-2 border-sky-700"
          value={profileData.username}
          onChange={(e) => handleEdit("username", e.target.value)}
          placeholder="Enter Your username"
        />

        <div className="flex justify-center items-center gap-2 text-gray-500 mt-2">
          <FaEnvelope />
          <span>{profile?.email ?? "-"}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t my-6"></div>

      {/* Address Card */}
      <div className="bg-gray-50 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 text-sky-600 mb-4">
          <FaMapMarkerAlt />
          <h3 className="font-semibold text-lg">Address</h3>
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="street"
            id="street"
            className="w-full h-10 rounded-2xl text-center font-bold text-sky-700 border-2 border-sky-700"
            value={profileData.street}
            onChange={(e) => handleEdit("street", e.target.value)}
            placeholder="Enter your street"
          />

          <input
            type="text"
            name="city"
            id="city"
            className="w-full h-10 rounded-2xl text-center font-bold text-sky-700 border-2 border-sky-700"
            value={profileData.city}
            onChange={(e) => handleEdit("city", e.target.value)}
            placeholder="Enter your city"
          />

          <input
            type="text"
            name="state"
            id="state"
            className="w-full h-10 rounded-2xl text-center font-bold text-sky-700 border-2 border-sky-700"
            value={profileData.state}
            onChange={(e) => handleEdit("state", e.target.value)}
            placeholder="Enter your state"
          />

          <input
            type="text"
            name="pinCode"
            id="pinCode"
            className="w-full h-10 rounded-2xl text-center font-bold text-sky-700 border-2 border-sky-700"
            value={profileData.pinCode}
            onChange={(e) => handleEdit("pinCode", e.target.value)}
            placeholder="Enter your pinCode"
          />
        </div>
        <button
          onClick={handleSave}
          className="w-full mt-6 bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-xl transition duration-300"
        >
          Save
        </button>
      </div>
    </>
  ) : (
    <>
      {" "}
      {/* Name */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {profile?.username ?? "Guest"}
        </h2>

        <div className="flex justify-center items-center gap-2 text-gray-500 mt-2">
          <FaEnvelope />
          <span>{profile?.email ?? "-"}</span>
        </div>
      </div>
      {/* Divider */}
      <div className="border-t my-6"></div>
      {/* Address Card */}
      <div className="bg-gray-50 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 text-sky-600 mb-4">
          <FaMapMarkerAlt />
          <h3 className="font-semibold text-lg">Address</h3>
        </div>

        <div className="space-y-2 text-gray-700">
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
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="h-32 bg-linear-to-r from-sky-500 to-indigo-600 relative">
          <button className="absolute top-4 right-4 text-white text-2xl hover:scale-110 transition cursor-pointer">
            <FaUserEdit />
          </button>

          {/* Avatar */}
          <div className="absolute left-1/2 -bottom-14 transform -translate-x-1/2">
            <div className="w-28 h-28 rounded-full bg-white p-1 shadow-lg">
              <img
                src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>
        {/* Body */}
        <div className="pt-20 pb-8 px-6">
          {userDetais}
          {/* Button */}
          <button
            className="w-full mt-6 bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-xl transition duration-300"
            onClick={() => setEdit(!edit)}
          >
            {edit ? "Cencel" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
