import { useEffect, useState } from "react";
import Header from "../components/Header";

export default function Profile() {

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    image: ""
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUser({ ...user, image: reader.result });
    };

    if (file) reader.readAsDataURL(file);
  };

  const handleUpdate = () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    users = users.map((u) =>
      u.email === user.email ? user : u
    );

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(user));

    alert("Profile Updated");
  };

  const handleDelete = () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    users = users.filter((u) => u.email !== user.email);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.removeItem("currentUser");

    window.location.href = "/";
  };

  return (
    <div className="flex-1 bg-white-50 min-h-screen">

      <Header title="PROFILE" />

      <div className="p-8">

        <div className="bg-white p-8 rounded-xl shadow max-w-4xl">

          <div className="flex flex-col md:flex-row gap-8">

            {/* Profile Image */}

            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full border-4 border-green-200 overflow-hidden">

                {user.image ? (
                  <img
                    src={user.image}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Image
                  </div>
                )}

              </div>

              <input
                type="file"
                className="mt-4"
                onChange={handleImageUpload}
              />
            </div>

            {/* Form */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">

              <div>
                <label className="text-sm">Name</label>
                <input
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>

              <div>
                <label className="text-sm">Email</label>
                <input
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>

              <div>
                <label className="text-sm">Password</label>
                <input
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>

              <div>
                <label className="text-sm">Role</label>
                <select
                  name="role"
                  value={user.role}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                >
                  <option>Admin</option>
                  <option>SuperAdmin</option>
                  <option>User</option>
                </select>
              </div>

            </div>

          </div>

          {/* Buttons */}

          <div className="flex gap-4 mt-8">

            <button
              onClick={handleUpdate}
              className="bg-lime-700 text-white px-6 py-2 rounded"
            >
              Update
            </button>

            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-6 py-2 rounded"
            >
              Delete
            </button>

            <button className="border px-6 py-2 rounded">
              Sign out
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}