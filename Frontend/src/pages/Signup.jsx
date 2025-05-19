import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/OAuth";

const Signup = () => {
  const { signupUser, signInWithGoogle } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.includes("@") || formData.password.length < 6) {
      setError("Invalid email or password must be at least 6 characters.");
      return;
    }

    setError("");
    try {
      await signupUser(formData.email, formData.password);
      alert("User signed up successfully!");
      navigate("/Signin");
    } catch (error) {
      setError("Sign-Up failed. Try again.");
      console.error(error);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithGoogle();
      alert("Google Sign-Up Successful!");
      navigate("/Signin");
    } catch (error) {
      setError("Google Sign-Up failed. Try again.");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-[#002366] p-8 rounded-lg shadow-lg w-96 text-white">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>
        <p className="text-gray-300 text-center mb-4">Sign up to get started</p>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              ></button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-2 rounded-md font-bold hover:bg-yellow-300 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-300 mt-4">OR</p>

        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 py-2 rounded-md font-bold transition mt-2"
        >
          <FcGoogle className="w-5 h-5" /> Sign Up with Google
        </button>

        <p className="text-center text-gray-300 mt-4">
          Already have an account?{" "}
          <Link
            to="/Signin"
            className="text-yellow-400 font-bold hover:underline"
          >
            Signin
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
