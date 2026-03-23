import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
 import Logo from "../assets/Logo.jpeg";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.userName.trim()) {
      newErrors.userName = "Username is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        await signup(formData.userName, formData.email, formData.password);
        alert("Signup successful! Please login.");
        navigate("/login");
      } catch (error) {
        setErrors({ general: error.message || "Signup failed" });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 !bg-[#8fa31e] items-center justify-center relative">
        {/* Wave Pattern Overlay at the Top */}
        <div
          className="absolute top-0 left-0 w-full h-40 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20px 20px, white 2px, transparent 0)`,
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(to bottom, black, transparent)'
          }}
        />
        <div className="text-white text-left px-20">
          <h1 className="text-6xl font-extrabold leading-tight">
            YOUR MENU <br /> MADE <br /> SMARTER
          </h1>
        </div>

        <div className="absolute bottom-32 w-72 h-36 border-b-[10px] border-red-500 rounded-b-full">{/* Red Smile SVG */}
          <div className="mt-8">
            <svg width="240" height="60" viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              
            </svg>
          </div></div>

      </div>
          
      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100 p-6">

        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">

          {/* Logo */}
          <div className="text-center mb-4">
            <img
              src={Logo}
              alt="EatWisely Logo"
              className="mx-auto w-50 h-20 object-contain"
            />
          </div>

          {/* Title */}
          <div className="!bg-[#8fa31e] text-white text-center py-3 rounded-md font-semibold mb-6">
            Create Account
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>

            {/* Username */}
            <div>
              <label className="text-sm text-gray-600">
                Enter UserName
              </label>

              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-lime-500"
              />

              {errors.userName && (
                <p className="text-red-500 text-sm">{errors.userName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">
                Enter Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-lime-500"
              />

              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="text-sm text-gray-600">
                Enter Password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-lime-500"
              />

              <button
                type="button"
                className="absolute right-3 top-9 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                👁
              </button>

              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full !bg-[#8fa31e] text-white py-2 rounded-md hover:!bg-[#8fa31e] transition disabled:opacity-50"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>

            {/* General Error */}
            {errors.general && (
              <p className="text-red-500 text-sm text-center">{errors.general}</p>
            )}

          </form>

          {/* Login link */}
          <p className="text-center text-sm mt-6 text-gray-500">
            Already having a account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-red-600 font-semibold cursor-pointer"
            >
              Login Now
            </span>
          </p>

          <p className="text-center text-xs text-gray-400 mt-6">
            © 2025 EatWisely
          </p>

        </div>

      </div>

    </div>
  );
}