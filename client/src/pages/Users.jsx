import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Users() {

    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [showEdit, setShowEdit] = useState(false);

    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        setUsers(storedUsers);
    }, []);

    // DELETE USER
    const handleDelete = (email) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        const filteredUsers = users.filter((user) => user.email !== email);
        setUsers(filteredUsers);
        localStorage.setItem("users", JSON.stringify(filteredUsers));
    };

    // OPEN EDIT PANEL
    const openEdit = (user) => {
        setEditUser(user);
        setShowEdit(true);
    };

    // UPDATE USER
    const handleUpdate = () => {

        const updatedUsers = users.map((user) =>
            user.email === editUser.email ? editUser : user
        );

        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        setShowEdit(false);
    };

    // SEARCH + FILTER
    const filteredUsers = users.filter((user) => {

        const searchMatch =
            user.username.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase());

        const roleMatch =
            roleFilter === "All" || user.role === roleFilter;

        return searchMatch && roleMatch;

    });

    // PAGINATION
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;

    const currentUsers = filteredUsers.slice(
        indexOfFirstUser,
        indexOfLastUser
    );

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    return (
        <div className="flex">

            <Sidebar />

            <div className="flex-1 bg-gray-50 min-h-screen">

                <Header title="USERS" />

                <div className="p-6">

                    {/* SEARCH + FILTER + ADD */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">

                        <button
                            onClick={() => alert("Add User feature here")}
                            className="!bg-[#8fa31e] text-white px-4 py-2 rounded"
                        >
                            + Add User
                        </button>


                        <input
                            type="text"
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border p-2 rounded w-full md:w-64"
                        />

                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="border p-2 rounded w-full md:w-48"
                        >
                            <option value="All">All Roles</option>
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                            <option value="SuperAdmin">SuperAdmin</option>
                        </select>


                        {/* PAGINATION */}

                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-3 py-1 rounded border ${currentPage === i + 1
                                        ? "!bg-[#8fa31e] text-white"
                                        : "bg-white"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}


                    </div>

                    <div className="bg-white rounded-xl shadow">

                        {/* TABLE HEADER */}
                        <div className="!bg-[#8fa31e] text-white px-6 py-4 font-semibold rounded-t-xl">
                            SYSTEM USERS
                        </div>

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="text-left text-gray-500 text-sm border-b">
                                    <tr>
                                        <th className="p-4">PROFILE</th>
                                        <th className="p-4">USERNAME</th>
                                        <th className="p-4">EMAIL</th>
                                        <th className="p-4">ROLE</th>
                                        <th className="p-4">ACTION</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {currentUsers.map((user, index) => (
                                        <tr key={index} className="border-b hover:bg-gray-50">

                                            <td className="p-4">
                                                <img
                                                    src={user.image || "/avatar.png"}
                                                    className="w-10 h-10 rounded-full"
                                                />
                                            </td>

                                            <td className="p-4">{user.username}</td>

                                            <td className="p-4 text-gray-500">
                                                {user.email}
                                            </td>

                                            <td className="p-4">
                                                <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded">
                                                    {user.role}
                                                </span>
                                            </td>

                                            <td className="p-4 space-x-2">

                                                <button
                                                    onClick={() => openEdit(user)}
                                                    className="bg-lime-600 text-white px-3 py-1 rounded"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(user.email)}
                                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>
                                    ))}
                                </tbody>

                            </table>

                        </div>

                    </div>

                    

                </div>

            </div>

            {/* EDIT USER PANEL */}
            {showEdit && (
                <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg p-6">

                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold">Edit User</h2>

                        <button onClick={() => setShowEdit(false)}>✕</button>
                    </div>

                    <div className="text-center mb-6">

                        <img
                            src={editUser.image || "/avatar.png"}
                            className="w-24 h-24 rounded-full mx-auto"
                        />

                    </div>

                    <input
                        type="text"
                        value={editUser.username}
                        onChange={(e) =>
                            setEditUser({ ...editUser, username: e.target.value })
                        }
                        className="w-full border p-2 rounded mb-4"
                    />

                    <input
                        type="email"
                        value={editUser.email}
                        onChange={(e) =>
                            setEditUser({ ...editUser, email: e.target.value })
                        }
                        className="w-full border p-2 rounded mb-4"
                    />

                    <select
                        value={editUser.role}
                        onChange={(e) =>
                            setEditUser({ ...editUser, role: e.target.value })
                        }
                        className="w-full border p-2 rounded mb-6"
                    >
                        <option>User</option>
                        <option>Admin</option>
                        <option>SuperAdmin</option>
                    </select>

                    <button
                        onClick={handleUpdate}
                        className="w-full bg-lime-700 text-white py-2 rounded"
                    >
                        Edit User
                    </button>

                </div>
            )}

        </div>
    );
}