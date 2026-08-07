import { useEffect, useState } from "react";
import api from "../services/api";
import { FaBookOpen } from "react-icons/fa";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/courses")
      .then((res) => setCourses(res.data.courses))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <h2 className="text-2xl font-bold">Loading Courses...</h2>
      </div>
    );
  }

  return (
    <div className="p-8">

      <div className="flex items-center gap-3 mb-6">
        <FaBookOpen className="text-3xl text-cyan-600" />
        <h1 className="text-3xl font-bold">Courses</h1>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-900 text-white">

            <tr>
              <th className="p-4 text-left">ID</th>
              <th>Course</th>
              <th>Platform</th>
            </tr>

          </thead>

          <tbody>

            {courses.map((course) => (

              <tr key={course.id} className="border-b hover:bg-gray-50">

                <td className="p-4">{course.id}</td>

                <td>{course.title}</td>

                <td>{course.platform}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}