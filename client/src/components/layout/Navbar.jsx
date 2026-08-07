import { FaBell, FaSearch } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm px-8 py-5 flex items-center justify-between">

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Welcome back, Abrar Kaif 👋
        </p>
      </div>

      <div className="flex items-center gap-5">

        <div className="relative">

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            className="pl-11 pr-5 py-3 rounded-xl border w-80 outline-none focus:ring-2 focus:ring-cyan-500"
          />

        </div>

        <button className="relative">

          <FaBell size={24} />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
            3
          </span>

        </button>

        <img
          src="https://ui-avatars.com/api/?name=Abrar+Kaif&background=0891b2&color=fff"
          alt="avatar"
          className="w-12 h-12 rounded-full"
        />

      </div>

    </header>
  );
}