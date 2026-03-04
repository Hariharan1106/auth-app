import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const user = users.find(
        (u) =>
          u.email === formData.email &&
          u.password === formData.password
      );

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        navigate("/profile");
      } else {
        alert("Invalid email or password");
      }
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SECTION */}
      <div className="hidden md:flex w-1/2 bg-lime-700 items-center justify-center relative">

        <div className="text-white text-left px-20">
          <h1 className="text-6xl font-extrabold leading-tight">
            CLARITY IN <br /> EVERY <br /> INGREDIENT
          </h1>
        </div>

        <div className="absolute bottom-32 w-72 h-36 border-b-[10px] border-red-500 rounded-b-full"></div>

      </div>

      {/* RIGHT SECTION */}
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

          {/* Header */}
          <div className="bg-lime-700 text-white text-center py-3 rounded-md font-semibold mb-6">
            Welcome Back
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-600">Enter Email</label>
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

            {/* PASSWORD */}
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

            {/* LOGIN BUTTON */}
            <button className="w-full bg-lime-700 text-white py-2 rounded-md hover:bg-lime-800 transition">
              Login
            </button>

            {/* GOOGLE BUTTON */}
            <button
              type="button"
              className="w-full border-2 border-lime-500 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100"
            >
              <span className="font-bold text-lg">G</span>
              SIGNIN WITH GOOGLE
            </button>

          </form>

          {/* SIGNUP LINK */}
          <p className="text-center text-sm mt-6 text-gray-500">
            Create new account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-red-600 font-semibold cursor-pointer"
            >
              Sign Up
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