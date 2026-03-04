export default function EditUserDrawer({ selectedUser, close }) {
  if (!selectedUser) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl p-6 z-50">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Edit User</h3>
        <button onClick={close}>✕</button>
      </div>

      <div className="text-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto"></div>
      </div>

      <input
        type="text"
        value={selectedUser.username}
        className="w-full border p-2 mb-4 rounded"
        readOnly
      />
      <input
        type="email"
        value={selectedUser.email}
        className="w-full border p-2 mb-4 rounded"
        readOnly
      />

      <select
        className="w-full border p-2 mb-4 rounded"
        defaultValue={selectedUser.role}
      >
        <option>SuperAdmin</option>
        <option>User</option>
        <option>Admin</option>
      </select>

      <button className="w-full bg-lime-600 text-white py-2 rounded">
        Edit User
      </button>
    </div>
  );
}