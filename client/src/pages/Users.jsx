import { useMemo, useState } from "react";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
} from "react-icons/fa";
import useUsers from "../hooks/useUsers";
import api from "../services/api";

export default function Users() {
  const { users, loading } = useUsers();

  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      (user.name || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [users, search]);

  const refresh = () => window.location.reload();

  const addUser = async () => {
    const name = prompt("Enter Name");
    if (!name) return;

    const email = prompt("Enter Email");
    if (!email) return;

    const experience = prompt("Enter Experience");
    if (!experience) return;

    try {
      await api.post("/users", {
        name,
        email,
        experience,
      });

      alert("User Added Successfully");
      refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to Add User");
    }
  };

  const editUser = async (user) => {
    const name = prompt("Name", user.name);
    if (!name) return;

    const email = prompt("Email", user.email);
    if (!email) return;

    const experience = prompt(
      "Experience",
      user.experience
    );
    if (!experience) return;

    try {
      await api.put(`/users/${user.id}`, {
        name,
        email,
        experience,
      });

      alert("User Updated Successfully");
      refresh();
    } catch (err) {
      console.error(err);
      alert("Update Failed");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?"))
      return;

    try {
      await api.delete(`/users/${id}`);

      alert("User Deleted Successfully");
      refresh();
    } catch (err) {
      console.error(err);
      alert("Delete Failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-3xl font-bold">
          Loading Users...
        </h2>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold">
            Users
          </h1>

          <p className="text-gray-500">
            Manage all registered users
          </p>

        </div>

        <button
          onClick={addUser}
          className="flex items-center gap-2 bg-cyan-600 text-white px-5 py-3 rounded-xl hover:bg-cyan-700"
        >
          <FaPlus />
          Add User
        </button>

      </div>

      <div className="bg-white p-5 rounded-xl shadow">

        <div className="relative">

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full border rounded-xl py-3 pl-12 pr-4"
          />

        </div>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-900 text-white">

            <tr>

              <th className="p-4 text-left">
                User
              </th>

              <th>Email</th>

              <th>Experience</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>
                        {filteredUsers.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-10 text-gray-500"
                >
                  No Users Found
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-slate-50 transition"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-4">

                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.name
                        )}&background=0891b2&color=fff`}
                        alt={user.name}
                        className="w-12 h-12 rounded-full"
                      />

                      <div>
                        <h3 className="font-semibold">
                          {user.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          ID : {user.id}
                        </p>
                      </div>

                    </div>
                  </td>

                  <td>{user.email}</td>

                  <td>{user.experience}</td>

                  <td>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      Active
                    </span>
                  </td>

                  <td>

                    <div className="flex gap-4">

                      <button
                        onClick={() =>
                          alert(
                            `Name: ${user.name}

Email: ${user.email}

Experience: ${user.experience}`
                          )
                        }
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEye />
                      </button>

                      <button
                        onClick={() => editUser(user)}
                        className="text-yellow-500 hover:text-yellow-600"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => deleteUser(user.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

      <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4">

        <div className="flex justify-between items-center">

          <div>

            <h2 className="font-bold text-cyan-800">
              Total Users
            </h2>

            <p className="text-gray-600">
              {filteredUsers.length} user(s)
            </p>

          </div>

          <div className="text-4xl font-bold text-cyan-600">
            {filteredUsers.length}
          </div>

        </div>

      </div>

    </div>
  );
}