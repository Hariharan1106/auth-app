import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import ApiService from "../utils/api";

export default function SuperAdmin() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(false);

  // State for different data
  const [users, setUsers] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);

  // Form states
  const [newUserForm, setNewUserForm] = useState({
    userName: "",
    email: "",
    password: "",
    role: "admin"
  });

  useEffect(() => {
    if (activeTab === "users") fetchUsers();
    if (activeTab === "audit") fetchAuditLogs();
    if (activeTab === "reviews") fetchReviews();
    if (activeTab === "categories") fetchCategories();
    if (activeTab === "menus") fetchMenus();
  }, [activeTab]);

  const fetchUsers = async () => {
    try {
      const response = await ApiService.get('/users');
      setUsers(response.users || []);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const fetchAuditLogs = async () => {
    try {
      const response = await ApiService.get('/auditLog');
      setAuditLogs(response.logs || []);
    } catch (error) {
      console.error('Failed to fetch audit logs:', error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await ApiService.get('/reviews');
      setReviews(response.reviews || []);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await ApiService.get('/categories');
      setCategories(response.categories || []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchMenus = async () => {
    try {
      const response = await ApiService.get('/menus');
      setMenus(response.menus || []);
    } catch (error) {
      console.error('Failed to fetch menus:', error);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await ApiService.post('/admin/users', newUserForm);
      alert('User created successfully!');
      setNewUserForm({ userName: "", email: "", password: "", role: "admin" });
      fetchUsers();
    } catch (error) {
      alert(error.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleApproveReview = async (reviewId) => {
    try {
      await ApiService.put(`/reviews/${reviewId}/approve`);
      fetchReviews();
    } catch (error) {
      alert('Failed to approve review');
    }
  };

  const handleRejectReview = async (reviewId) => {
    try {
      await ApiService.put(`/reviews/${reviewId}/reject`);
      fetchReviews();
    } catch (error) {
      alert('Failed to reject review');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">SuperAdmin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-gray-500 text-sm">Total Admins</h3>
                <p className="text-3xl font-bold text-lime-600">
                  {users.filter(u => u.role === 'admin').length}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-gray-500 text-sm">Total Users</h3>
                <p className="text-3xl font-bold text-blue-600">
                  {users.filter(u => u.role === 'user').length}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-gray-500 text-sm">Store Managers</h3>
                <p className="text-3xl font-bold text-purple-600">
                  {users.filter(u => u.role === 'storeManager').length}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-gray-500 text-sm">Pending Reviews</h3>
                <p className="text-3xl font-bold text-red-600">
                  {reviews.filter(r => r.status === "pending").length}
                </p>
              </div>
            </div>
          </div>
        );

      case "users":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Users</h2>
              <button
                onClick={() => setActiveTab("create-user")}
                className="bg-lime-600 text-white px-4 py-2 rounded hover:bg-lime-700"
              >
                + Create User
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Username</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Role</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b">
                      <td className="p-3">{user.userName}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-sm ${
                          user.role === 'admin' ? 'bg-lime-100 text-lime-700' :
                          user.role === 'storeManager' ? 'bg-purple-100 text-purple-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-sm ${
                          user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "create-user":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Create New User</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    value={newUserForm.userName}
                    onChange={(e) => setNewUserForm({...newUserForm, userName: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={newUserForm.email}
                    onChange={(e) => setNewUserForm({...newUserForm, email: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    value={newUserForm.password}
                    onChange={(e) => setNewUserForm({...newUserForm, password: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <select
                    value={newUserForm.role}
                    onChange={(e) => setNewUserForm({...newUserForm, role: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  >
                    <option value="admin">Admin</option>
                    <option value="storeManager">Store Manager</option>
                  </select>
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-lime-600 text-white px-4 py-2 rounded hover:bg-lime-700 disabled:opacity-50"
                  >
                    {loading ? 'Creating...' : 'Create User'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("users")}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        );

      case "reviews":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Manage Reviews & Approvals</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Restaurant</th>
                    <th className="p-3 text-left">User</th>
                    <th className="p-3 text-left">Rating</th>
                    <th className="p-3 text-left">Comment</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => (
                    <tr key={review._id} className="border-b">
                      <td className="p-3">{review.restaurant?.name || 'N/A'}</td>
                      <td className="p-3">{review.user?.userName || 'N/A'}</td>
                      <td className="p-3">{"★".repeat(review.rating || 0)}</td>
                      <td className="p-3">{review.comment}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-sm ${
                          review.status === 'approved' ? 'bg-green-100 text-green-700' :
                          review.status === 'rejected' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {review.status || 'pending'}
                        </span>
                      </td>
                      <td className="p-3">
                        {review.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApproveReview(review._id)}
                              className="text-green-600 hover:underline mr-2"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleRejectReview(review._id)}
                              className="text-red-600 hover:underline"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "audit":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Audit Log</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Action</th>
                    <th className="p-3 text-left">Entity</th>
                    <th className="p-3 text-left">User</th>
                    <th className="p-3 text-left">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log) => (
                    <tr key={log._id} className="border-b">
                      <td className="p-3">{log.action}</td>
                      <td className="p-3">{log.entityType}</td>
                      <td className="p-3">{log.actorRole}</td>
                      <td className="p-3">{new Date(log.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 !bg-[#8fa31e] text-white min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-8">
          <span className="text-red-500">Eat</span>
          <span className="text-white">Wisely</span>
        </h1>

        <div className="mb-6 p-3 bg-lime-700 rounded">
          <p className="text-sm">Welcome,</p>
          <p className="font-bold">{user?.userName || user?.email}</p>
          <span className="text-xs bg-red-500 px-2 py-1 rounded">SuperAdmin</span>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`block w-full text-left p-2 rounded ${activeTab === "dashboard" ? "bg-lime-600" : "hover:bg-lime-600"}`}>
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`block w-full text-left p-2 rounded ${activeTab === "users" ? "bg-lime-600" : "hover:bg-lime-600"}`}>
            Users
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`block w-full text-left p-2 rounded ${activeTab === "reviews" ? "bg-lime-600" : "hover:bg-lime-600"}`}>
            Reviews & Approval
          </button>
          <button
            onClick={() => setActiveTab("audit")}
            className={`block w-full text-left p-2 rounded ${activeTab === "audit" ? "bg-lime-600" : "hover:bg-lime-600"}`}>
            Audit Log
          </button>
          <button
            onClick={handleLogout}
            className="block w-full text-left p-2 rounded hover:bg-red-600 mt-8">
            Signout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {renderContent()}
      </div>
    </div>
  );
}
