import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

  const [activeTab, setActiveTab] = useState("dashboard");

  // Sample data - in real app, fetch from API based on restaurantId
  const [storeManagers, setStoreManagers] = useState([
    { id: 1, name: "Mike Manager", email: "mike@restaurant.com", status: "active" },
    { id: 2, name: "Jane Manager", email: "jane@restaurant.com", status: "active" },
  ]);

  const [restaurantUsers, setRestaurantUsers] = useState([
    { id: 1, name: "Alice User", email: "alice@gmail.com", status: "active" },
    { id: 2, name: "Bob User", email: "bob@gmail.com", status: "active" },
  ]);

  const [categories, setCategories] = useState([
    { id: 1, name: "Appetizers", items: 5 },
    { id: 2, name: "Main Course", items: 10 },
    { id: 3, name: "Desserts", items: 4 },
  ]);

  const [menuItems, setMenuItems] = useState([
    { id: 1, name: "Margherita Pizza", category: "Main Course", price: 250, status: "active" },
    { id: 2, name: "Chicken Burger", category: "Main Course", price: 180, status: "active" },
    { id: 3, name: "Garlic Bread", category: "Appetizers", price: 80, status: "pending" },
  ]);

  const [auditLogs, setAuditLogs] = useState([
    { id: 1, action: "Menu Item Created", user: "Admin", timestamp: "2026-03-14 10:30:00" },
    { id: 2, action: "Category Added", user: "Admin", timestamp: "2026-03-14 11:00:00" },
    { id: 3, action: "Store Manager Created", user: "Admin", timestamp: "2026-03-14 12:00:00" },
    { id: 4, action: "User Approved", user: "Admin", timestamp: "2026-03-14 13:00:00" },
  ]);

  const [reviews, setReviews] = useState([
    { id: 1, user: "Alice", rating: 5, comment: "Amazing food!", date: "2026-03-14" },
    { id: 2, user: "Bob", rating: 4, comment: "Great service", date: "2026-03-13" },
  ]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const handleApproveMenu = (id) => {
    setMenuItems(menuItems.map(m => m.id === id ? { ...m, status: "active" } : m));
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Admin Dashboard - Pizza Palace</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-gray-500 text-sm">Store Managers</h3>
                <p className="text-3xl font-bold text-purple-600">{storeManagers.length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-gray-500 text-sm">Restaurant Users</h3>
                <p className="text-3xl font-bold text-blue-600">{restaurantUsers.length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-gray-500 text-sm">Categories</h3>
                <p className="text-3xl font-bold text-purple-600">{categories.length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-gray-500 text-sm">Menu Items</h3>
                <p className="text-3xl font-bold text-lime-600">{menuItems.length}</p>
              </div>
            </div>
          </div>
        );

      case "storemanagers":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Store Managers</h2>
              <button className="bg-lime-600 text-white px-4 py-2 rounded hover:bg-lime-700">
                + Create Store Manager
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {storeManagers.map((manager) => (
                    <tr key={manager.id} className="border-b">
                      <td className="p-3">{manager.name}</td>
                      <td className="p-3">{manager.email}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 rounded text-sm bg-green-100 text-green-700">
                          {manager.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <button className="text-blue-600 hover:underline mr-2">Edit</button>
                        <button className="text-red-600 hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "users":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Restaurant Users</h2>
              <button className="bg-lime-600 text-white px-4 py-2 rounded hover:bg-lime-700">
                + Create User
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurantUsers.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 rounded text-sm bg-green-100 text-green-700">
                          {user.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <button className="text-blue-600 hover:underline mr-2">Edit</button>
                        <button className="text-red-600 hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "categories":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Categories</h2>
              <button className="bg-lime-600 text-white px-4 py-2 rounded hover:bg-lime-700">
                + Create Category
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">Category Name</th>
                    <th className="p-3 text-left">Items</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat) => (
                    <tr key={cat.id} className="border-b">
                      <td className="p-3">{cat.id}</td>
                      <td className="p-3">{cat.name}</td>
                      <td className="p-3">{cat.items}</td>
                      <td className="p-3">
                        <button className="text-blue-600 hover:underline mr-2">Edit</button>
                        <button className="text-red-600 hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "menu":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Menu</h2>
              <button className="bg-lime-600 text-white px-4 py-2 rounded hover:bg-lime-700">
                + Create Menu Item
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Category</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">{item.category}</td>
                      <td className="p-3">₹{item.price}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-sm ${
                          item.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3">
                        {item.status === "pending" ? (
                          <button 
                            onClick={() => handleApproveMenu(item.id)}
                            className="text-green-600 hover:underline mr-2">
                            Approve
                          </button>
                        ) : null}
                        <button className="text-blue-600 hover:underline mr-2">Edit</button>
                        <button className="text-red-600 hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "reviews":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Restaurant Reviews</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">User</th>
                    <th className="p-3 text-left">Rating</th>
                    <th className="p-3 text-left">Comment</th>
                    <th className="p-3 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => (
                    <tr key={review.id} className="border-b">
                      <td className="p-3">{review.user}</td>
                      <td className="p-3">{"★".repeat(review.rating)}</td>
                      <td className="p-3">{review.comment}</td>
                      <td className="p-3">{review.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "auditlog":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Audit Log (Log History)</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">Action</th>
                    <th className="p-3 text-left">User</th>
                    <th className="p-3 text-left">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="border-b">
                      <td className="p-3">{log.id}</td>
                      <td className="p-3">{log.action}</td>
                      <td className="p-3">{log.user}</td>
                      <td className="p-3">{log.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return null;
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
          <p className="font-bold">{currentUser.userName || currentUser.email}</p>
          <span className="text-xs bg-blue-500 px-2 py-1 rounded">Admin</span>
        </div>

        <nav className="space-y-2">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`block w-full text-left p-2 rounded ${activeTab === "dashboard" ? "bg-lime-600" : "hover:bg-lime-600"}`}>
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab("storemanagers")}
            className={`block w-full text-left p-2 rounded ${activeTab === "storemanagers" ? "bg-lime-600" : "hover:bg-lime-600"}`}>
            Store Managers
          </button>
          <button 
            onClick={() => setActiveTab("users")}
            className={`block w-full text-left p-2 rounded ${activeTab === "users" ? "bg-lime-600" : "hover:bg-lime-600"}`}>
            Restaurant Users
          </button>
          <button 
            onClick={() => setActiveTab("categories")}
            className={`block w-full text-left p-2 rounded ${activeTab === "categories" ? "bg-lime-600" : "hover:bg-lime-600"}`}>
            Categories
          </button>
          <button 
            onClick={() => setActiveTab("menu")}
            className={`block w-full text-left p-2 rounded ${activeTab === "menu" ? "bg-lime-600" : "hover:bg-lime-600"}`}>
            Menu
          </button>
          <button 
            onClick={() => setActiveTab("reviews")}
            className={`block w-full text-left p-2 rounded ${activeTab === "reviews" ? "bg-lime-600" : "hover:bg-lime-600"}`}>
            Reviews
          </button>
          <button 
            onClick={() => setActiveTab("auditlog")}
            className={`block w-full text-left p-2 rounded ${activeTab === "auditlog" ? "bg-lime-600" : "hover:bg-lime-600"}`}>
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
