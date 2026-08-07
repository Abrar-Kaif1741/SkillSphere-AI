import { NavLink } from "react-router-dom";
import {
  FaChartPie,
  FaUsers,
  FaBriefcase,
  FaBuilding,
  FaBook,
  FaLightbulb,
  FaGraduationCap
} from "react-icons/fa";

const menus = [
  {
    name: "Dashboard",
    icon: <FaChartPie />,
    path: "/"
  },
  {
    name: "Users",
    icon: <FaUsers />,
    path: "/users"
  },
  {
    name: "Jobs",
    icon: <FaBriefcase />,
    path: "/jobs"
  },
  {
    name: "Companies",
    icon: <FaBuilding />,
    path: "/companies"
  },
  {
    name: "Skills",
    icon: <FaLightbulb />,
    path: "/skills"
  },
  {
    name: "Courses",
    icon: <FaGraduationCap />,
    path: "/courses"
  },
  {
    name: "Recommendations",
    icon: <FaBook />,
    path: "/recommendations"
  }
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900 text-white flex flex-col">

      <div className="text-3xl font-bold text-center py-8 border-b border-slate-700">

        SkillSphere AI

      </div>

      <div className="flex-1 p-4">

        {menus.map((menu) => (

          <NavLink
            key={menu.name}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-4 p-4 rounded-xl mb-3 transition-all ${
                isActive
                  ? "bg-cyan-600"
                  : "hover:bg-slate-800"
              }`
            }
          >

            <span className="text-xl">
              {menu.icon}
            </span>

            <span className="font-medium">
              {menu.name}
            </span>

          </NavLink>

        ))}

      </div>

      <div className="p-5 border-t border-slate-700">

        <div className="font-semibold">
          Abrar Kaif
        </div>

        <div className="text-sm text-slate-400">
          Administrator
        </div>

      </div>

    </aside>
  );
}