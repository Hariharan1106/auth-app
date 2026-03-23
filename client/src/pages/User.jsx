import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function User() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

  const [activeTab, setActiveTab] = useState("restaurants");

  // Sample data - in real app, fetch from API
  const [restaurants, setRestaurants] = useState([
    { 
      id: 1, 
      name: "Pizza Palace", 
      cuisine: "Italian", 
      rating: 4.5, 
      image: "🍕",
      location: "Downtown",
      description: "Best pizza in town with authentic Italian recipes"
    },
    { 
      id: 2, 
      name: "Burger House", 
      cuisine: "Fast Food", 
      rating: 4.2, 
      image: "🍔",
      location: "Main Street",
      description: "Juicy burgers and crispy fries"
    },
    { 
      id: 3, 
      name: "Sushi Master", 
      cuisine: "Japanese", 
      rating: 4.8, 
      image: "🍣",
      location: "Uptown",
      description: "Fresh sushi and authentic Japanese dishes"
    },
    { 
      id: 4, 
      name: "Taj Indian", 
      cuisine: "Indian", 
      rating: 4.3, 
      image: "🍛",
      location: "East Side",
      description: "Traditional Indian curries and tandoor specialties"
    },
  ]);

  const [myReviews, setMyReviews] = useState([
    { id: 1, restaurant: "Pizza Palace", rating: 5, comment: "Amazing pizza!", date: "2026-03-10" },
    { id: 2, restaurant: "Burger House", rating: 4, comment: "Good burgers", date: "2026-03-05" },
  ]);

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const handleSubmitReview = (restaurantId) => {
    const restaurant = restaurants.find(r => r.id === restaurantId);
    const newReviewEntry = {
      id: myReviews.length + 1,
      restaurant: restaurant.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };
    setMyReviews([newReviewEntry, ...myReviews]);
    setShowReviewForm(false);
    setNewReview({ rating: 5, comment: "" });
    alert("Review submitted successfully!");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "restaurants":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Browse Restaurants</h2>
            
            {/* Search */}
            <div className="flex gap-4">
              <input 
                type="text" 
                placeholder="Search restaurants..." 
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
              <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-500">
                <option>All Cuisines</option>
                <option>Italian</option>
                <option>Fast Food</option>
                <option>Japanese</option>
                <option>Indian</option>
              </select>
            </div>

            {/* Restaurant Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((restaurant) => (
                <div 
                  key={restaurant.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  <div className="h-40 bg-lime-100 flex items-center justify-center text-6xl">
                    {restaurant.image}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg">{restaurant.name}</h3>
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-sm">
                        ★ {restaurant.rating}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm">{restaurant.cuisine}</p>
                    <p className="text-gray-400 text-sm">📍 {restaurant.location}</p>
                    <p className="text-gray-600 mt-2 text-sm">{restaurant.description}</p>
                    <button 
                      onClick={() => {
                        setSelectedRestaurant(restaurant);
                        setShowReviewForm(true);
                      }}
                      className="w-full mt-4 bg-lime-600 text-white py-2 rounded hover:bg-lime-700 transition">
                      Write Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "myreviews":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">My Reviews</h2>
            
            {myReviews.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-500">You haven't reviewed any restaurants yet.</p>
                <button 
                  onClick={() => setActiveTab("restaurants")}
                  className="mt-4 text-lime-600 hover:underline">
                  Browse Restaurants
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {myReviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{review.restaurant}</h3>
                        <div className="text-yellow-500">{"★".repeat(review.rating)}</div>
                        <p className="text-gray-600 mt-2">{review.comment}</p>
                      </div>
                      <span className="text-gray-400 text-sm">{review.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "favorites":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Favorite Restaurants</h2>
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500">No favorites yet.</p>
              <button 
                onClick={() => setActiveTab("restaurants")}
                className="mt-4 text-lime-600 hover:underline">
                Browse Restaurants
              </button>
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
          <span className="text-xs bg-green-500 px-2 py-1 rounded">User</span>
        </div>

        <nav className="space-y-2">
          <button 
            onClick={() => setActiveTab("restaurants")}
            className={`block w-full text-left p-2 rounded ${activeTab === "restaurants" ? "bg-lime-600" : "hover:bg-lime-600"}`}>
            Restaurants
          </button>
          <button 
            onClick={() => setActiveTab("myreviews")}
            className={`block w-full text-left p-2 rounded ${activeTab === "myreviews" ? "bg-lime-600" : "hover:bg-lime-600"}`}>
            My Reviews
          </button>
          <button 
            onClick={() => setActiveTab("favorites")}
            className={`block w-full text-left p-2 rounded ${activeTab === "favorites" ? "bg-lime-600" : "hover:bg-lime-600"}`}>
            Favorites
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

      {/* Review Modal */}
      {showReviewForm && selectedRestaurant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4">Review {selectedRestaurant.name}</h3>
            
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className={`text-2xl ${newReview.rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Your Review</label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="Share your experience..."
                className="w-full border rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleSubmitReview(selectedRestaurant.id)}
                className="flex-1 bg-lime-600 text-white py-2 rounded hover:bg-lime-700"
              >
                Submit Review
              </button>
              <button
                onClick={() => {
                  setShowReviewForm(false);
                  setSelectedRestaurant(null);
                }}
                className="flex-1 border border-gray-300 py-2 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
