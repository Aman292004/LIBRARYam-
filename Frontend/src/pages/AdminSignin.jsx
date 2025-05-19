import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getBaseUrl from "../utils/baseURl";

const AdminSignin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${getBaseUrl()}/api/auth/admin`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const auth = response.data;
      if (auth.token) {
        localStorage.setItem("token", auth.token);
        setTimeout(() => {
          localStorage.removeItem("token");
          alert("Session expired! Please log in again.");
          navigate("/");
        }, 3600 * 1000);
      }
      alert("Admin Sign-in successful!");
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid username or password. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#121212]">
      <div className="bg-[#1E1E1E] p-8 rounded-2xl shadow-xl w-96 border border-[#FFD700]/40">
        <h2 className="text-3xl font-bold text-center text-white">
          Admin Login
        </h2>
        <p className="text-gray-400 text-center mb-5">Access your dashboard</p>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Field */}
          <div>
            <label className="block text-gray-300 font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-600 bg-[#2A2A2A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] placeholder-gray-400"
              placeholder="Enter your username"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-300 font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-600 bg-[#2A2A2A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] placeholder-gray-400"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#FFD700] text-[#121212] py-3 rounded-lg font-bold text-lg hover:bg-[#E6C300] transition-all duration-200 shadow-md"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 mt-5 text-xs">
          ©2025 Book Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminSignin;
