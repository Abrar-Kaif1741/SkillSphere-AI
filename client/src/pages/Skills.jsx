import { useEffect, useState } from "react";
import api from "../services/api";
import { FaLightbulb } from "react-icons/fa";

export default function Skills() {

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    api.get("/skills")
      .then((res) => setSkills(res.data.skills))
      .catch(console.error)
      .finally(() => setLoading(false));

  }, []);

  if (loading)
    return <h2 className="text-2xl p-8">Loading Skills...</h2>;

  return (

    <div className="p-8">

      <div className="flex items-center gap-3 mb-6">

        <FaLightbulb className="text-3xl text-cyan-600" />

        <h1 className="text-3xl font-bold">
          Skills
        </h1>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-900 text-white">

            <tr>

              <th className="p-4 text-left">ID</th>

              <th>Name</th>

              <th>Category</th>

            </tr>

          </thead>

          <tbody>

            {skills.map((skill) => (

              <tr key={skill.id} className="border-b">

                <td className="p-4">{skill.id}</td>

                <td>{skill.name}</td>

                <td>{skill.category}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}