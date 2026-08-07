export default function QuickActions() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-xl font-bold mb-5">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <button className="bg-cyan-600 text-white py-3 rounded-xl hover:bg-cyan-700">
          Add User
        </button>

        <button className="bg-green-600 text-white py-3 rounded-xl hover:bg-green-700">
          Add Job
        </button>

        <button className="bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700">
          Add Company
        </button>

        <button className="bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600">
          Recommendations
        </button>

      </div>

    </div>
  );
}