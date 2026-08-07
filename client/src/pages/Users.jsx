import { useMemo, useState } from "react";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
} from "react-icons/fa";

import useUsers from "../hooks/useUsers";

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
    <div className="space-y-6 p-6">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold">
            Users
          </h1>

          <p className="text-gray-500">
            Manage all platform users
          </p>

        </div>

        <button className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-3 rounded-xl">

          <FaPlus />

          Add User

        </button>

      </div>

      {/* Search */}

      <div className="bg-white shadow rounded-xl p-5">

        <div className="relative">

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-cyan-500"
          />

        </div>

      </div>

      {/* Users Table */}

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-900 text-white">

            <tr>

              <th className="p-4 text-left">
                User
              </th>

              <th className="text-left">
                Email
              </th>

              <th className="text-left">
                Experience
              </th>

              <th className="text-left">
                Status
              </th>

              <th className="text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredUsers.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="text-center py-8"
                >

                  No Users Found

                </td>

              </tr>

            ) : (

              filteredUsers.map((user, index) => (

                <tr
                  key={user.id?.low ?? user.id ?? index}
                  className="border-b hover:bg-gray-50"
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

                          ID : {user.id?.low ?? user.id}

                        </p>

                      </div>

                    </div>

                  </td>

                  <td>

                    {user.email}

                  </td>

                  <td>

                    {user.experience}

                  </td>

                  <td>

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">

                      Active

                    </span>

                  </td>

                  <td>

                    <div className="flex gap-4">

                      <button className="text-blue-600">

                        <FaEye />

                      </button>

                      <button className="text-yellow-500">

                        <FaEdit />

                      </button>

                      <button className="text-red-600">

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
  );
}