import { NavLink } from "react-router-dom";
import {
  FaChartPie,
  FaUsers,
  FaBriefcase,
  FaBuilding,
  FaBook,
  FaLightbulb,
  FaGraduationCap,
} from "react-icons/fa";

const menus = [
  {
    name: "Dashboard",
    icon: <FaChartPie />,
    path: "/",
  },
  {
    name: "Users",
    icon: <FaUsers />,
    path: "/users",
  },
  {
    name: "Jobs",
    icon: <FaBriefcase />,
    path: "/jobs",
  },
  {
    name: "Companies",
    icon: <FaBuilding />,
    path: "/companies",
  },
  {
    name: "Skills",
    icon: <FaLightbulb />,
    path: "/skills",
  },
  {
    name: "Courses",
    icon: <FaGraduationCap />,
    path: "/courses",
  },
  {
    name: "Recommendations",
    icon: <FaBook />,
    path: "/recommendations",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-950 text-white flex flex-col shrink-0">

      {/* LOGO */}

      <div className="px-6 py-7 border-b border-slate-800">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-cyan-600 flex items-center justify-center font-bold text-lg">
            S
          </div>

          <div>
            <h1 className="text-xl font-bold">
              SkillSphere
            </h1>

            <p className="text-xs text-cyan-400">
              AI Platform
            </p>
          </div>

        </div>

      </div>

      {/* MENU */}

      <nav className="flex-1 px-3 py-6">

        <p className="text-[11px] uppercase tracking-wider text-slate-500 px-3 mb-3">
          Main Menu
        </p>

        <div className="space-y-1.5">

          {menus.map((menu) => (

            <NavLink
              key={menu.name}
              to={menu.path}
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive
                    ? "bg-cyan-600 text-white shadow-lg shadow-cyan-900/20"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`
              }
            >

              <span className="text-lg">
                {menu.icon}
              </span>

              <span className="font-medium text-sm">
                {menu.name}
              </span>

            </NavLink>

          ))}

        </div>

      </nav>

      {/* PROFILE */}

      <div className="p-4 border-t border-slate-800">

        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900">

          <img
            src="https://ui-avatars.com/api/?name=Abrar+Kaif&background=0891b2&color=fff"
            alt="Abrar Kaif"
            className="w-10 h-10 rounded-full"
          />

          <div className="min-w-0">

            <p className="font-semibold text-sm truncate">
              Abrar Kaif
            </p>

            <p className="text-xs text-slate-500">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </aside>
  );
}