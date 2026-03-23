import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./utils/AuthContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Sidebar from "./components/Sidebar";
import Users from "./pages/Users";
import RestaurantProfile from "./pages/Restuarant";
import SuperAdmin from "./pages/SuperAdmin";
import Admin from "./pages/Admin";
import StoreManager from "./pages/StoreManager";
import User from "./pages/User";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    switch (user.role) {
      case 'superAdmin':
        return <Navigate to="/superadmin" replace />;
      case 'admin':
        return <Navigate to="/admin" replace />;
      case 'storeManager':
        return <Navigate to="/storemanager" replace />;
      case 'user':
      default:
        return <Navigate to="/user" replace />;
    }
  }

  return children;
};

// Role-based Dashboard Redirect
const DashboardRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.role) {
    case 'superAdmin':
      return <Navigate to="/superadmin" replace />;
    case 'admin':
      return <Navigate to="/admin" replace />;
    case 'storeManager':
      return <Navigate to="/storemanager" replace />;
    case 'user':
    default:
      return <Navigate to="/user" replace />;
  }
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Dashboard Redirect */}
          <Route path="/dashboard" element={<DashboardRedirect />} />

          {/* Protected Role-based Routes */}
          <Route
            path="/superadmin"
            element={
              <ProtectedRoute allowedRoles={['superAdmin']}>
                <SuperAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/storemanager"
            element={
              <ProtectedRoute allowedRoles={['storeManager']}>
                <StoreManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <User />
              </ProtectedRoute>
            }
          />

          {/* Profile Page with Sidebar - accessible to all authenticated users */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <div className="flex">
                  <Sidebar />
                  <div className="flex-1">
                    <Profile />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

          {/* Additional routes - need to check permissions */}
          <Route
            path="/users"
            element={
              <ProtectedRoute allowedRoles={['superAdmin', 'admin']}>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/restaurant"
            element={
              <ProtectedRoute allowedRoles={['superAdmin', 'admin', 'storeManager']}>
                <RestaurantProfile />
              </ProtectedRoute>
            }
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
