import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Users() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({
    created_at: null,
    email: null,
    id: null,
    password: null,
    profile_pic: null,
    username: null,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleDelete = async (user) => {
    try {
      const { id, profile_pic } = user;

      console.log(id, profile_pic);
      const res = await axios.delete(`http://localhost:3000/api/users/${id}`, {
        data: { profile: profile_pic }, // Send data in the 'data' property
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        setUsers(users.filter((user) => user.id !== id));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user");
    }
  };
  if (!user) return <div>Loading...</div>;
  return (
    <div className="w-2/3 mx-auto shadow-lg p-4 mt-10 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <p>
          <strong>Username:</strong> {user?.username}
        </p>
        <button
          className="bg-cyan-500 text-white px-2 py-1 rounded hover:bg-cyan-600 ml-2"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <h3 className="mb-4 border-b border-gray-200">Users</h3>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="flex flex-col gap-2">
        <table>
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Username</th>
              <th className="p-2">Email</th>
              <th className="p-2">Profile</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-gray-200">
                <td className="p-2">{u.id}</td>
                <td className="p-2">{u.username}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">
                  <img
                    src={`http://localhost:3000/api/users/uploads/${u.profile_pic}`}
                    alt={u.profile_pic}
                    className="w-8 h-8 object-cover rounded"
                  />
                </td>
                <td className="p-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    onClick={() => navigate(`/users/edit/${u.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(u)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2"
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
  );
}
