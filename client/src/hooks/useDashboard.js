import { useEffect, useState } from "react";
import axios from "axios";

export default function useDashboard() {

    const [loading,setLoading]=useState(true);

    const [stats,setStats]=useState({

        users:0,
        jobs:0,
        companies:0,
        skills:0

    });

    useEffect(()=>{

        loadDashboard();

    },[]);

    async function loadDashboard(){

        try{

            const [

                users,

                jobs,

                companies,

                skills

            ] = await Promise.all([

                axios.get("http://localhost:5000/api/users"),

                axios.get("http://localhost:5000/api/jobs"),

                axios.get("http://localhost:5000/api/companies"),

                axios.get("http://localhost:5000/api/skills")

            ]);

            setStats({

                users:users.data.count || 0,

                jobs:jobs.data.count || 0,

                companies:companies.data.count || 0,

                skills:skills.data.count || 0

            });

        }

        catch(err){

            console.log(err);

        }

        finally{

            setLoading(false);

        }

    }

    return{

        stats,

        loading

    };

}