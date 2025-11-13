import { useState } from "react";
import { FaUserCircle, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaEdit, FaSave, FaTimes } from "react-icons/fa";

const UpdateProfile = () => {
   const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    name: "Md Fuad",
    email: "mdfuad@gmail.com",
    phone: "017XXXXXXXX",
    address: "Dhaka, Bangladesh",
    photo:
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", // placeholder profile photo
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Updated Data:", userData);
  };

    return (
       <div className="min-h-screen flex justify-center items-center py-10 px-4">
      <div className="bg-linear-to-b from-gray-300 to-gray-200 w-full max-w-lg rounded-2xl shadow-xl p-8">
        {/* Profile photo & name */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              src={userData.photo}
              alt="User Avatar"
              className="w-28 h-28 rounded-full border-4 border-gray-300 object-cover shadow-md"
            />
            {isEditing && (
              <label className="absolute bottom-1 right-1 bg-gray-800 p-2 rounded-full cursor-pointer hover:bg-gray-700 transition">
                <FaEdit className="text-white text-sm" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setUserData((prev) => ({ ...prev, photo: imageUrl }));
                    }
                  }}
                />
              </label>
            )}
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mt-4">
            {userData.name}
          </h2>
        </div>

        {/* Info fields */}
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="flex items-center text-gray-600 mb-1 gap-2">
              <FaUserCircle className="text-gray-500" /> Full Name
            </label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 rounded-lg border ${
                isEditing
                  ? "border-gray-400 bg-gray-50"
                  : "border-gray-200 bg-gray-100 cursor-not-allowed"
              } focus:outline-none`}
            />
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center text-gray-600 mb-1 gap-2">
              <FaEnvelope className="text-gray-500" /> Email
            </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              disabled
              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-100 cursor-not-allowed focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="flex items-center text-gray-600 mb-1 gap-2">
              <FaPhoneAlt className="text-gray-500" /> Phone
            </label>
            <input
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 rounded-lg border ${
                isEditing
                  ? "border-gray-400 bg-gray-50"
                  : "border-gray-200 bg-gray-100 cursor-not-allowed"
              } focus:outline-none`}
            />
          </div>

          {/* Address */}
          <div>
            <label className="flex items-center text-gray-600 mb-1 gap-2">
              <FaMapMarkerAlt className="text-gray-500" /> Address
            </label>
            <textarea
              name="address"
              value={userData.address}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 rounded-lg border resize-none ${
                isEditing
                  ? "border-gray-400 bg-gray-50"
                  : "border-gray-200 bg-gray-100 cursor-not-allowed"
              } focus:outline-none`}
              rows="3"
            ></textarea>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          {!isEditing ? (
            <button
              onClick={handleEditToggle}
              className="bg-gray-800 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition"
            >
              <FaEdit /> Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-green-500 transition"
              >
                <FaSave /> Save
              </button>
              <button
                onClick={handleEditToggle}
                className="bg-gray-400 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-500 transition"
              >
                <FaTimes /> Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
    );
};

export default UpdateProfile;