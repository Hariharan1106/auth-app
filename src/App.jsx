import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Sidebar from "./components/Sidebar";
import Users from "./pages/Users";
import RestaurantProfile from "./pages/Restuarant";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Profile Page with Sidebar */}
        <Route
          path="/profile"
          element={
            <div className="flex">
              <Sidebar />
              <div className="flex-1">
                <Profile />
              </div>
            </div>
          }
        />

        <Route path="/users" element={<Users />} />
        <Route path="/restaurant" element={<RestaurantProfile />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;