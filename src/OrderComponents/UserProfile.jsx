import React from "react";

const UserProfile = ({ user }) => {
  if (!user) {
    return (
      <div className="p-6 text-center text-gray-500">
        User information not available.
      </div>
    );
  }

  const address = user.userAddress;

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl bg-white shadow-md border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900 px-6 py-5">
        <h2 className="text-xl font-semibold text-white">User Profile</h2>
      </div>

      <div className="p-6">
        {/* Profile Image + Username */}
        <div className="flex items-center gap-5 mb-6">
          <img
            src={user.imageUrl}
            alt={user.username}
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow-sm"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/150?text=User";
            }}
          />

          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              {user.username}
            </h3>

            <p className="text-gray-500 mt-1">{user.email}</p>
          </div>
        </div>

        {/* User Information */}
        <div className="space-y-5">
          {/* Email */}
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Email</p>

            <p className="text-gray-900 font-medium break-all">{user.email}</p>
          </div>

          {/* Address */}
          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Address</p>

            <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
              <p className="text-gray-900">{address?.street}</p>

              <p className="text-gray-700 mt-1">
                {address?.city}, {address?.state}
              </p>

              <p className="text-gray-700 mt-1">PIN Code: {address?.pinCode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
