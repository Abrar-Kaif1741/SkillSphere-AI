import { useEffect, useMemo, useState } from "react";
import {
  FaUsers,
  FaBriefcase,
  FaBuilding,
  FaLightbulb,
  FaGraduationCap,
  FaPlus,
  FaArrowRight,
  FaChartLine,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [skills, setSkills] = useState([]);
  const [courses, setCourses] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const [loading, setLoading] = useState(true);
  const [showAddUser, setShowAddUser] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    experience: "",
  });

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const results = await Promise.allSettled([
        api.get("/users"),
        api.get("/jobs"),
        api.get("/companies"),
        api.get("/skills"),
        api.get("/courses"),
        api.get("/recommendations/jobs/1"),
      ]);

      setUsers(
        results[0].status === "fulfilled"
          ? results[0].value.data?.users || []
          : []
      );

      setJobs(
        results[1].status === "fulfilled"
          ? results[1].value.data?.jobs || []
          : []
      );

      setCompanies(
        results[2].status === "fulfilled"
          ? results[2].value.data?.companies || []
          : []
      );

      setSkills(
        results[3].status === "fulfilled"
          ? results[3].value.data?.skills || []
          : []
      );

      setCourses(
        results[4].status === "fulfilled"
          ? results[4].value.data?.courses || []
          : []
      );

      setRecommendations(
        results[5].status === "fulfilled"
          ? results[5].value.data?.recommendations || []
          : []
      );
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      icon: FaUsers,
      bg: "bg-cyan-100",
      iconColor: "text-cyan-600",
      path: "/users",
    },
    {
      title: "Available Jobs",
      value: jobs.length,
      icon: FaBriefcase,
      bg: "bg-green-100",
      iconColor: "text-green-600",
      path: "/jobs",
    },
    {
      title: "Companies",
      value: companies.length,
      icon: FaBuilding,
      bg: "bg-purple-100",
      iconColor: "text-purple-600",
      path: "/companies",
    },
    {
      title: "Skills",
      value: skills.length,
      icon: FaLightbulb,
      bg: "bg-orange-100",
      iconColor: "text-orange-600",
      path: "/skills",
    },
  ];

  const maxJobSalary = useMemo(() => {
    const values = jobs
      .map((job) =>
        parseFloat(
          String(job.salary || "").replace(/[^0-9.]/g, "")
        )
      )
      .filter((value) => !Number.isNaN(value));

    return Math.max(...values, 1);
  }, [jobs]);

  const addUser = async (event) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.experience.trim()
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setSaving(true);

      await api.post("/users", {
        name: form.name.trim(),
        email: form.email.trim(),
        experience: form.experience.trim(),
      });

      setForm({
        name: "",
        email: "",
        experience: "",
      });

      setShowAddUser(false);

      await loadDashboard();

      alert("User added successfully.");
    } catch (error) {
      console.error("Add user error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to add user."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-7">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <p className="text-cyan-600 font-semibold text-sm mb-1">
            SkillSphere AI
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Welcome back, Abrar Kaif 👋
          </p>
        </div>

        <button
          onClick={() => setShowAddUser(true)}
          className="dashboard-button flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-3 rounded-xl shadow-sm"
        >
          <FaPlus />
          Add User
        </button>

      </div>

      {/* STAT CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <button
              key={stat.title}
              onClick={() => navigate(stat.path)}
              className="stat-card bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-left"
            >

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    {stat.title}
                  </p>

                  <h2 className="text-3xl font-bold text-slate-800 mt-2">
                    {stat.value}
                  </h2>

                  <p className="text-xs text-cyan-600 mt-2 flex items-center gap-1">
                    View details
                    <FaArrowRight />
                  </p>
                </div>

                <div
                  className={`w-14 h-14 ${stat.bg} ${stat.iconColor} rounded-2xl flex items-center justify-center`}
                >
                  <Icon className="text-xl" />
                </div>

              </div>

            </button>
          );
        })}

      </div>

      {/* ANALYTICS */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* DATA OVERVIEW */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

          <div className="flex items-center justify-between mb-6">

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Platform Overview
              </h2>

              <p className="text-sm text-gray-500">
                Current database distribution
              </p>
            </div>

            <FaChartLine className="text-cyan-600 text-xl" />

          </div>

          <div className="space-y-5">

            {[
              ["Users", users.length, "bg-cyan-500"],
              ["Jobs", jobs.length, "bg-green-500"],
              ["Companies", companies.length, "bg-purple-500"],
              ["Skills", skills.length, "bg-orange-500"],
              ["Courses", courses.length, "bg-pink-500"],
            ].map(([name, value, color]) => {

              const total = Math.max(
                users.length,
                jobs.length,
                companies.length,
                skills.length,
                courses.length,
                1
              );

              const width = Math.max(
                (value / total) * 100,
                value > 0 ? 8 : 0
              );

              return (
                <div key={name}>

                  <div className="flex justify-between mb-2">

                    <span className="text-sm font-medium text-gray-600">
                      {name}
                    </span>

                    <span className="text-sm font-bold text-slate-800">
                      {value}
                    </span>

                  </div>

                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">

                    <div
                      className={`h-full ${color} rounded-full transition-all duration-700`}
                      style={{
                        width: `${width}%`,
                      }}
                    />

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        {/* JOB SALARY CHART */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

          <div className="mb-6">

            <h2 className="text-xl font-bold text-slate-800">
              Job Salary Overview
            </h2>

            <p className="text-sm text-gray-500">
              Salary comparison across available jobs
            </p>

          </div>

          {jobs.length === 0 ? (

            <div className="h-52 flex items-center justify-center text-gray-400">
              No job data available
            </div>

          ) : (

            <div className="space-y-5">

              {jobs.map((job) => {

                const salary = parseFloat(
                  String(job.salary || "").replace(
                    /[^0-9.]/g,
                    ""
                  )
                ) || 0;

                const width =
                  (salary / maxJobSalary) * 100;

                return (
                  <div key={job.id}>

                    <div className="flex justify-between mb-2">

                      <span className="font-medium text-sm text-slate-700">
                        {job.title}
                      </span>

                      <span className="font-bold text-sm text-green-600">
                        {job.salary}
                      </span>

                    </div>

                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">

                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-700"
                        style={{
                          width: `${Math.max(width, 8)}%`,
                        }}
                      />

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </div>

      </div>

      {/* RECENT USERS + JOBS */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* USERS */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          <div className="flex justify-between items-center p-6 border-b">

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Recent Users
              </h2>

              <p className="text-sm text-gray-500">
                Latest registered users
              </p>
            </div>

            <button
              onClick={() => navigate("/users")}
              className="text-cyan-600 text-sm font-semibold hover:underline"
            >
              View All
            </button>

          </div>

          <div className="divide-y">

            {users.slice(0, 5).map((user) => (

              <div
                key={user.id?.low ?? user.id}
                className="p-5 flex items-center justify-between hover:bg-gray-50 transition"
              >

                <div className="flex items-center gap-3">

                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.name || "User"
                    )}&background=0891b2&color=fff`}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />

                  <div>
                    <p className="font-semibold text-slate-800">
                      {user.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>

                </div>

                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Active
                </span>

              </div>

            ))}

            {users.length === 0 && (
              <p className="p-8 text-center text-gray-400">
                No users available.
              </p>
            )}

          </div>

        </div>

        {/* JOBS */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          <div className="flex justify-between items-center p-6 border-b">

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Latest Jobs
              </h2>

              <p className="text-sm text-gray-500">
                Current opportunities
              </p>
            </div>

            <button
              onClick={() => navigate("/jobs")}
              className="text-cyan-600 text-sm font-semibold hover:underline"
            >
              View All
            </button>

          </div>

          <div className="divide-y">

            {jobs.slice(0, 5).map((job) => (

              <div
                key={job.id}
                className="p-5 flex items-center justify-between hover:bg-gray-50 transition"
              >

                <div>

                  <p className="font-semibold text-slate-800">
                    {job.title}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {job.location}
                  </p>

                </div>

                <span className="font-semibold text-green-600 text-sm">
                  {job.salary}
                </span>

              </div>

            ))}

            {jobs.length === 0 && (
              <p className="p-8 text-center text-gray-400">
                No jobs available.
              </p>
            )}

          </div>

        </div>

      </div>

      {/* RECOMMENDATIONS */}

      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 text-white">

        <div className="flex justify-between items-center mb-5">

          <div>
            <h2 className="text-xl font-bold">
              AI Recommendations
            </h2>

            <p className="text-slate-400 text-sm">
              Suggested opportunities from your platform data
            </p>
          </div>

          <button
            onClick={() => navigate("/recommendations")}
            className="text-cyan-400 text-sm font-semibold hover:text-cyan-300"
          >
            View All
          </button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {recommendations.slice(0, 4).map(
            (recommendation, index) => (

              <div
                key={index}
                className="bg-white/10 border border-white/10 rounded-xl p-4"
              >

                <p className="font-semibold">
                  {recommendation.job}
                </p>

                <p className="text-sm text-slate-300 mt-1">
                  {recommendation.company}
                </p>

                <div className="flex gap-3 mt-3 text-xs">

                  <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded">
                    {recommendation.salary}
                  </span>

                  <span className="bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded">
                    {recommendation.location}
                  </span>

                </div>

              </div>

            )
          )}

          {recommendations.length === 0 && (
            <p className="text-slate-400">
              No recommendations available.
            </p>
          )}

        </div>

      </div>

      {/* ADD USER MODAL */}

      {showAddUser && (

        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">

            <div className="flex justify-between items-center p-6 border-b">

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Add New User
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Add a user directly to Neo4j
                </p>
              </div>

              <button
                onClick={() => setShowAddUser(false)}
                className="text-gray-400 hover:text-gray-700 text-xl"
              >
                ×
              </button>

            </div>

            <form
              onSubmit={addUser}
              className="p-6 space-y-4"
            >

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>

                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter name"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  placeholder="Enter email"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience
                </label>

                <input
                  value={form.experience}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      experience: e.target.value,
                    })
                  }
                  placeholder="Example: 2 Years"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="flex gap-3 pt-3">

                <button
                  type="button"
                  onClick={() =>
                    setShowAddUser(false)
                  }
                  className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white py-3 rounded-xl font-medium"
                >
                  {saving ? "Saving..." : "Save User"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}