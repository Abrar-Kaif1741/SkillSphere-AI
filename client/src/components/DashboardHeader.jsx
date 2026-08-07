export default function DashboardHeader() {
  return (
    <div className="flex justify-between items-center mb-8">

      <div>

        <h1 className="text-4xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          AI Powered Career Recommendation System
        </p>

      </div>

      <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition">
        + Add User
      </button>

    </div>
  );
}