import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "User",
    image: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const userExists = users.find(
        (user) => user.email === formData.email
      );

      if (userExists) {
        alert("User already exists");
        return;
      }

      users.push(formData);

      localStorage.setItem("users", JSON.stringify(users));

      alert("Signup successful");

      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-lime-700 items-center justify-center relative">

        <div className="text-white text-left px-20">
          <h1 className="text-6xl font-extrabold leading-tight">
            YOUR MENU <br /> MADE <br /> SMARTER
          </h1>
        </div>

        <div className="absolute bottom-32 w-72 h-36 border-b-[10px] border-red-500 rounded-b-full"></div>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100 p-6">

        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">

          {/* Logo */}
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold">
              <span className="text-red-600">Eat</span>
              <span className="text-lime-600">Wisely</span>
            </h1>
            <p className="text-xs text-gray-500">You are what you eat</p>
          </div>

          {/* Title */}
          <div className="bg-lime-700 text-white text-center py-3 rounded-md font-semibold mb-6">
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
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-lime-500"
              />

              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
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
              className="w-full bg-lime-700 text-white py-2 rounded-md hover:bg-lime-800 transition"
            >
              Sign Up
            </button>

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