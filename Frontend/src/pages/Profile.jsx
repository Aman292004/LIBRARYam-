import React, { useState, useRef } from "react";
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/OAuth";

const UpdateProfile = () => {
  const { currentUser, deleteUserAccount } = useAuth();
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: auth.currentUser?.displayName || "",
    email: auth.currentUser?.email || "",
    avatar:
      auth.currentUser?.photoURL ||
      "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setUploadProgress(0);
    setError("");

    const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setFormData((prev) => ({ ...prev, avatar: downloadURL }));
      setUpdateSuccess(true);
    } catch (err) {
      setError("Error uploading image. Try again.");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUpdateSuccess(false);

    const user = auth.currentUser;
    const userRef = doc(db, "users", user.uid);
    let updatedData = {};

    try {
      if (formData.username !== user.displayName) {
        await updateProfile(user, { displayName: formData.username });
        updatedData.name = formData.username;
      }

      if (formData.email !== user.email) {
        await updateEmail(user, formData.email);
        updatedData.email = formData.email;
      }

      if (formData.avatar !== user.photoURL) {
        await updateProfile(user, { photoURL: formData.avatar });
        updatedData.photoURL = formData.avatar;
      }

      if (Object.keys(updatedData).length > 0) {
        await updateDoc(userRef, updatedData);
      }

      setUpdateSuccess(true);
    } catch (err) {
      setError("Error updating profile. Try again.");
    }

    setLoading(false);
  };

  const handleDelete = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("No user is logged in.");
      return;
    }

    const providerId = user.providerData[0]?.providerId;

    if (providerId === "password" && !password) {
      alert("Please enter your password to delete the account.");
      return;
    }

    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone!"
      )
    ) {
      setLoading(true);
      try {
        await deleteUserAccount(providerId === "password" ? password : null);
        navigate("/");
      } catch (error) {
        alert(`Failed to delete account: ${error.message}`);
      }
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-10 mb-40 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-blue-700">
        Profile
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Profile Picture */}
        <input
          type="file"
          ref={fileInputRef}
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
        <img
          onClick={() => fileInputRef.current.click()}
          src={formData.avatar}
          alt="Profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer mx-auto border-4 border-gray-300 shadow-md"
        />

        {uploadProgress > 0 && uploadProgress < 100 && (
          <p className="text-center text-sm text-gray-500">
            Uploading {Math.round(uploadProgress)}%
          </p>
        )}
        {updateSuccess && (
          <p className="text-green-500 text-center text-sm">
            Profile updated successfully!
          </p>
        )}

        {/* Form */}
        <input
          type="text"
          id="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          id="password"
          onChange={handleChange}
          placeholder="New Password (Optional)"
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-[#002366] text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>

      {/* Delete Account */}
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-3 p-2 border rounded w-full"
      />
      <button
        onClick={handleDelete}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete Account"}
      </button>

      {error && <p className="text-red-700 mt-5 text-center">{error}</p>}
    </div>
  );
};

export default UpdateProfile;
