import { useMemo, useState } from "react";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
  FaUsers,
  FaTimes,
} from "react-icons/fa";

import useUsers from "../hooks/useUsers";
import api from "../services/api";

export default function Users() {
  const {
    users,
    loading,
    error,
    fetchUsers,
  } = useUsers();

  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);

  const filteredUsers = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return users;
    }

    return users.filter((user) =>
      `${user.name || ""} ${user.email || ""} ${
        user.experience || ""
      }`
        .toLowerCase()
        .includes(query)
    );
  }, [users, search]);

  // ADD USER
  const addUser = async () => {
    const name = window.prompt("Enter user name:");

    if (!name?.trim()) {
      return;
    }

    const email = window.prompt("Enter email:");

    if (!email?.trim()) {
      return;
    }

    const experience = window.prompt(
      "Enter experience (example: 2 Years):"
    );

    if (!experience?.trim()) {
      return;
    }

    try {
      setSaving(true);

      await api.post("/users", {
        name: name.trim(),
        email: email.trim(),
        experience: experience.trim(),
      });

      await fetchUsers();

      alert("User added successfully.");
    } catch (err) {
      console.error("ADD USER ERROR:", err);

      alert(
        err.response?.data?.message ||
          "Unable to add user."
      );
    } finally {
      setSaving(false);
    }
  };

  // EDIT USER
  const editUser = async (user) => {
    const name = window.prompt(
      "Edit name:",
      user.name || ""
    );

    if (!name?.trim()) {
      return;
    }

    const email = window.prompt(
      "Edit email:",
      user.email || ""
    );

    if (!email?.trim()) {
      return;
    }

    const experience = window.prompt(
      "Edit experience:",
      user.experience || ""
    );

    if (!experience?.trim()) {
      return;
    }

    try {
      setSaving(true);

      await api.put(`/users/${user.id}`, {
        name: name.trim(),
        email: email.trim(),
        experience: experience.trim(),
      });

      await fetchUsers();

      alert("User updated successfully.");
    } catch (err) {
      console.error("UPDATE USER ERROR:", err);

      alert(
        err.response?.data?.message ||
          "Unable to update user."
      );
    } finally {
      setSaving(false);
    }
  };

  // DELETE USER
  const deleteUser = async (user) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.name}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setSaving(true);

      await api.delete(`/users/${user.id}`);

      await fetchUsers();

      alert("User deleted successfully.");
    } catch (err) {
      console.error("DELETE USER ERROR:", err);

      alert(
        err.response?.data?.message ||
          "Unable to delete user."
      );
    } finally {
      setSaving(false);
    }
  };

  // VIEW USER
  const viewUser = (user) => {
    window.alert(
      `USER DETAILS\n\n` +
        `Name: ${user.name}\n` +
        `Email: ${user.email}\n` +
        `Experience: ${user.experience}\n` +
        `ID: ${user.id}`
    );
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />

          <p className="text-gray-500">
            Loading users...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center">
              <FaUsers className="text-cyan-600 text-xl" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Users
              </h1>

              <p className="text-gray-500 mt-1">
                Manage all platform users
              </p>
            </div>

          </div>
        </div>

        <button
          onClick={addUser}
          disabled={saving}
          className="flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white px-5 py-3 rounded-xl font-medium shadow-sm transition"
        >
          <FaPlus />

          {saving ? "Saving..." : "Add User"}
        </button>

      </div>

      {/* ERROR */}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
          <p className="font-medium">
            Unable to load users
          </p>

          <p className="text-sm mt-1">
            {error}
          </p>

          <button
            onClick={fetchUsers}
            className="mt-3 text-sm font-semibold underline"
          >
            Try Again
          </button>
        </div>
      )}

      {/* STATS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-gray-500 text-sm">
                Total Users
              </p>

              <h2 className="text-3xl font-bold text-slate-800 mt-1">
                {users.length}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center">
              <FaUsers className="text-cyan-600 text-xl" />
            </div>

          </div>

        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">

          <p className="text-gray-500 text-sm">
            Active Users
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-1">
            {users.length}
          </h2>

        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">

          <p className="text-gray-500 text-sm">
            Search Results
          </p>

          <h2 className="text-3xl font-bold text-slate-800 mt-1">
            {filteredUsers.length}
          </h2>

        </div>

      </div>

      {/* SEARCH */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">

        <div className="relative">

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search by name, email or experience..."
            className="w-full border border-gray-200 rounded-xl py-3 pl-12 pr-10 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          )}

        </div>

      </div>

      {/* TABLE */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-900 text-white">

              <tr>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  User
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Experience
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredUsers.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="px-6 py-16 text-center"
                  >

                    <FaUsers className="mx-auto text-4xl text-gray-300 mb-4" />

                    <p className="font-semibold text-gray-700">
                      No users found
                    </p>

                    <p className="text-gray-400 text-sm mt-1">
                      Add a user or change your search.
                    </p>

                  </td>

                </tr>

              ) : (

                filteredUsers.map((user) => (

                  <tr
                    key={user.id}
                    className="border-b border-gray-100 hover:bg-slate-50 transition"
                  >

                    {/* USER */}

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-4">

                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user.name || "User"
                          )}&background=0891b2&color=fff`}
                          alt={user.name}
                          className="w-11 h-11 rounded-full"
                        />

                        <div>

                          <p className="font-semibold text-slate-800">
                            {user.name}
                          </p>

                          <p className="text-xs text-gray-400">
                            ID: {user.id}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* EMAIL */}

                    <td className="px-6 py-4 text-gray-600">
                      {user.email}
                    </td>

                    {/* EXPERIENCE */}

                    <td className="px-6 py-4 text-gray-600">
                      {user.experience}
                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-4">

                      <span className="inline-flex bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Active
                      </span>

                    </td>

                    {/* ACTIONS */}

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-4">

                        <button
                          onClick={() =>
                            viewUser(user)
                          }
                          className="text-blue-600 hover:text-blue-800 transition"
                          title="View User"
                        >
                          <FaEye />
                        </button>

                        <button
                          onClick={() =>
                            editUser(user)
                          }
                          disabled={saving}
                          className="text-yellow-500 hover:text-yellow-600 disabled:opacity-50 transition"
                          title="Edit User"
                        >
                          <FaEdit />
                        </button>

                        <button
                          onClick={() =>
                            deleteUser(user)
                          }
                          disabled={saving}
                          className="text-red-600 hover:text-red-700 disabled:opacity-50 transition"
                          title="Delete User"
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

      </div>

    </div>
  );
}