import { useCallback, useEffect, useState } from "react";
import api from "../services/api";

const normalizeId = (id) => {
  if (id && typeof id === "object" && "low" in id) {
    return Number(id.low);
  }

  return Number(id);
};

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = useCallback(async () => {
    try {
      setError("");

      const response = await api.get("/users");

      const data = response.data?.users || [];

      const normalizedUsers = data.map((user) => ({
        ...user,
        id: normalizeId(user.id),
      }));

      setUsers(normalizedUsers);
    } catch (err) {
      console.error("FETCH USERS ERROR:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load users"
      );

      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    fetchUsers,
  };
}