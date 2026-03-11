import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 !bg-[#8fa31e] text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-8">
        <span className="text-red-500">Eat</span>
        <span className="text-white">Wisely</span>
      </h1>

      <nav className="space-y-3">
        <NavLink to="/dashboard" className="block p-2 rounded hover:bg-lime-600">
          Dashboard
        </NavLink>
        <NavLink to="/profile" className="block p-2 rounded hover:bg-lime-600">
          Profile
        </NavLink>
        <NavLink to="/users" className="block p-2 rounded hover:bg-red-600">
          Users
        </NavLink>
        <NavLink to="/restaurant" className="block p-2 rounded hover:bg-red-600">
          Restaurant
        </NavLink>
        <div className="block p-2">Categories</div>
        <div className="block p-2">Menu</div>
        <div className="block p-2">Reviews</div>
        <NavLink to="/login" className="block p-2 ">
          Signout
        </NavLink>
      </nav>
    </div>
  );
}