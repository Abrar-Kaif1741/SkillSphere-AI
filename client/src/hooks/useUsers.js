import { useEffect, useState } from "react";
import api from "../services/api";

export default function useUsers() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {

        try {

            const res = await api.get("/users");

            setUsers(res.data.users);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchUsers();

    }, []);

    return {

        users,
        loading,
        fetchUsers

    };

}