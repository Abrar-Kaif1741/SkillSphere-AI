import { useEffect, useState } from "react";
import api from "../services/api";
import { FaBuilding } from "react-icons/fa";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/companies")
      .then((res) => setCompanies(res.data.companies))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <h2 className="text-2xl p-8">Loading Companies...</h2>;

  return (
    <div className="p-8">

      <div className="flex items-center gap-3 mb-6">
        <FaBuilding className="text-3xl text-cyan-600" />
        <h1 className="text-3xl font-bold">Companies</h1>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-900 text-white">

            <tr>
              <th className="p-4 text-left">ID</th>
              <th>Name</th>
              <th>Industry</th>
            </tr>

          </thead>

          <tbody>

            {companies.map((company) => (

              <tr key={company.id} className="border-b">

                <td className="p-4">{company.id}</td>

                <td>{company.name}</td>

                <td>{company.industry}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}