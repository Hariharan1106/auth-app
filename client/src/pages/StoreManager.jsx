import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StoreManager() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

  const [activeTab, setActiveTab] = useState("dashboard");

  // Sample data - in real app, fetch from API based on restaurantId
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: "Margherita Pizza", category: "Main Course", price: 250, available: true },
    { id: 2, name: "Chicken Burger", category: "Main Course", price: 180, available: true },
    { id: 3, name: "Veggie Pizza", category: "Main Course", price: 220, available: true },
    { id: 4, name: "Garlic Bread", category: "Appetizers", price: 80, available: false },
    { id: 5, name: "Caesar Salad", category: "Appetizers", price: 120, available: true },
  ]);

  const [categories] = useState([
    { id: 1, name: "Appetizers" },
    { id: 2, name: "Main Course" },
    { id: 3, name: "Desserts" },
    { id: 4, name: "Beverages" },
  ]);

  const [reviews, setReviews] = useState([
    { id: 1, user: "Alice", rating: 5, comment: "Amazing pizza!", date: "2026-03-14" },
    { id: 2, user: "Bob", rating: 4, comment: "Great food", date: "2026-03-13" },
    { id: 3, user: "Charlie", rating: 5, comment: "Best burgers ever!", date: "2026-03-12" },
  ]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const handleToggleAvailability = (id) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Store Manager Dashboard - Pizza Palace</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-gray-500 text-sm">Total Menu Items</h3>
                <p className="text-3xl font-bold text-lime-600">{menuItems.length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-gray-500 text-sm">Available Items</h3>
                <p className="text-3xl font-bold text-green-600">
                  {menuItems.filter(m => m.available).length}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-gray-500 text-sm">Total Reviews</h3>
                <p className="text-3xl font-bold text-blue-600">{reviews.length}</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="flex gap-4">
                <button 
                  onClick={() => setActiveTab("menu")}
                  className="bg-lime-600 text-white px-4 py-2 rounded hover:bg-lime-700">
                  + Add Food Item
                </button>
                <button 
                  onClick={() => setActiveTab("reviews")}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  View Reviews
                </button>
              </div>
            </div>
          </div>
        );

      case "menu":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Food Items</h2>
              <button className="bg-lime-600 text-white px-4 py-2 rounded hover:bg-lime-700">
                + Add Food Item
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 mb-4">
              <span className="text-gray-600 self-center">Filter by:</span>
              {categories.map(cat => (
                <button 
                  key={cat.id}
                  className="px-3 py-1 rounded border hover:bg-lime-100">
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Category</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-left">Availability</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-3 font-medium">{item.name}</td>
                      <td className="p-3">{item.category}</td>
                      <td className="p-3">₹{item.price}</td>
                      <td className="p-3">
                        <button
                          onClick={() => handleToggleAvailability(item.id)}
                          className={`px-2 py-1 rounded text-sm ${
                            item.available 
                              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                              : 'bg-red-100 text-red-700 hover:bg-red-200'
                          }`}>
                          {item.available ? 'Available' : 'Unavailable'}
                        </button>
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
              <h2 className="text-2xl font-bold">View Categories</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((cat) => (
                <div key={cat.id} className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="font-bold text-lg">{cat.name}</h3>
                  <p className="text-gray-500 text-sm">
                    {menuItems.filter(m => m.category === cat.name).length} items
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case "reviews":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Customer Reviews</h2>
            <div className="grid gap-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{review.user}</h3>
                      <div className="text-yellow-500">{"★".repeat(review.rating)}</div>
                      <p className="text-gray-600 mt-2">{review.comment}</p>
                    </div>
                    <span className="text-gray-400 text-sm">{review.date}</span>
                  </div>
                </div>
              ))}
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
          <span className="text-xs bg-purple-500 px-2 py-1 rounded">Store Manager</span>
        </div>

        <nav className="space-y-2">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`block w-full text-left p-2 rounded ${activeTab === "dashboard" ? "bg-lime-600" : "hover:bg-lime-600"}`}>
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab("menu")}
            className={`block w-full text-left p-2 rounded ${activeTab === "menu" ? "bg-lime-600" : "hover:bg-lime-600"}`}>
            Food Items
          </button>
          <button 
            onClick={() => setActiveTab("categories")}
            className={`block w-full text-left p-2 rounded ${activeTab === "categories" ? "bg-lime-600" : "hover:bg-lime-600"}`}>
            Categories
          </button>
          <button 
            onClick={() => setActiveTab("reviews")}
            className={`block w-full text-left p-2 rounded ${activeTab === "reviews" ? "bg-lime-600" : "hover:bg-lime-600"}`}>
            Reviews
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
