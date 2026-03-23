
import Header from "../components/Header";


export default function RestaurantProfile() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-start">

      <div className="bg-white w-full max-w-3xl rounded-xl shadow-md p-8 flex gap-8">

        {/* Image Section */}
        <div className="flex flex-col items-center">
          <img
            src="https://via.placeholder.com/150"
            alt="restaurant"
            className="w-32 h-32 rounded-full border-4 border-gray-200 object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="flex flex-col w-full gap-4">

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Restaurant Name
            </label>
            <input
              type="text"
              value="Eat Wisely"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              value="eatwisely@gmail.com"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Contact Number
            </label>
            <input
              type="text"
              value="9876543210"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              readOnly
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">

            <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
              Update
            </button>

            <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700">
              Delete
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}