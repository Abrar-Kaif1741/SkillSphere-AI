import { useEffect, useState } from "react";
import { FaBriefcase } from "react-icons/fa";
import api from "../services/api";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data.jobs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <h2 className="text-2xl font-bold">Loading Jobs...</h2>
      </div>
    );
  }

  return (
    <div className="p-8">

      <div className="flex items-center gap-3 mb-6">
        <FaBriefcase className="text-3xl text-cyan-600" />
        <h1 className="text-3xl font-bold">Jobs</h1>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-900 text-white">

            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="text-left">Job Title</th>
              <th className="text-left">Location</th>
              <th className="text-left">Salary</th>
            </tr>

          </thead>

          <tbody>

            {jobs.length === 0 ? (

              <tr>
                <td
                  colSpan="4"
                  className="text-center py-10 text-gray-500"
                >
                  No Jobs Available
                </td>
              </tr>

            ) : (

              jobs.map((job) => (

                <tr
                  key={job.id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="p-4">{job.id}</td>

                  <td className="font-semibold">
                    {job.title}
                  </td>

                  <td>{job.location}</td>

                  <td className="text-green-600 font-semibold">
                    {job.salary}
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