import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../components/OAuth";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const dispatch = useDispatch();
  const { signinUser, signInWithGoogle } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signinUser(
        formData.email,
        formData.password
      );

      if (!userCredential?.user) {
        throw new Error("Invalid login response");
      }

      const user = userCredential.user;

      alert("User signed in successfully!");
      navigate("/");
    } catch (error) {
      console.error("Sign-in error:", error.message);
      setError(error.message || "Invalid email or password. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();

      if (!user) {
        throw new Error("Google Sign-In failed");
      }

      alert("Google Sign-In Successful!");
      navigate("/");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setError("Google Sign-In failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-[#002366] p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-white">
          Sign In to Your Account
        </h2>
        <p className="text-gray-300 text-center mb-4">
          Access your books and more
        </p>
        {error && (
          <p className="text-red-500 text-center bg-red-100 border border-red-400 p-2 rounded-md">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              placeholder="Enter your email"
            />
          </div>

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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FFD700] text-[#002366] py-2 rounded-md font-bold hover:bg-[#F2F8FF] transition"
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md font-bold text-gray-700 bg-white hover:bg-gray-100 transition"
          >
            <FcGoogle className="w-6 h-6" />
            <span>Sign In with Google</span>
          </button>
        </form>
        <p className="text-center text-gray-300 mt-4">
          Don't have an account?{" "}
          <Link
            to="/Signup"
            className="text-[#FFD700] font-bold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
