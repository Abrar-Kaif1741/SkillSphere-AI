import { useEffect, useState } from "react";
import api from "../services/api";
import { FaRobot } from "react-icons/fa";

export default function Recommendations() {

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    api
      .get("/recommendations/jobs/1")
      .then((res) => setRecommendations(res.data.recommendations))
      .catch(console.error)
      .finally(() => setLoading(false));

  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <h2 className="text-2xl font-bold">
          Loading Recommendations...
        </h2>
      </div>
    );
  }

  return (

    <div className="p-8">

      <div className="flex items-center gap-3 mb-6">

        <FaRobot className="text-3xl text-cyan-600" />

        <h1 className="text-3xl font-bold">

          AI Job Recommendations

        </h1>

      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-900 text-white">

            <tr>

              <th className="p-4 text-left">Job</th>

              <th>Company</th>

              <th>Location</th>

              <th>Salary</th>

            </tr>

          </thead>

          <tbody>

            {recommendations.map((item, index) => (

              <tr
                key={index}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4 font-semibold">

                  {item.job}

                </td>

                <td>

                  {item.company}

                </td>

                <td>

                  {item.location}

                </td>

                <td className="text-green-600 font-semibold">

                  {item.salary}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}