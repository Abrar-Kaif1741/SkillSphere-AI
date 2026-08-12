import { useEffect, useRef, useState } from "react";
import {
  FaBell,
  FaSearch,
  FaUserCircle,
  FaTimes,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const pageNames = {
  "/": "Dashboard",
  "/users": "Users",
  "/jobs": "Jobs",
  "/companies": "Companies",
  "/skills": "Skills",
  "/courses": "Courses",
  "/recommendations": "Recommendations",
};

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] =
    useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const pageTitle =
    pageNames[location.pathname] || "SkillSphere AI";

  useEffect(() => {
    const closeMenus = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", closeMenus);

    return () => {
      document.removeEventListener(
        "mousedown",
        closeMenus
      );
    };
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();

    const value = search.trim().toLowerCase();

    if (!value) return;

    const routes = [
      ["users", "/users"],
      ["user", "/users"],
      ["jobs", "/jobs"],
      ["job", "/jobs"],
      ["companies", "/companies"],
      ["company", "/companies"],
      ["skills", "/skills"],
      ["skill", "/skills"],
      ["courses", "/courses"],
      ["course", "/courses"],
      ["recommendations", "/recommendations"],
      ["recommendation", "/recommendations"],
      ["dashboard", "/"],
    ];

    const match = routes.find(([keyword]) =>
      keyword.includes(value)
    );

    if (match) {
      navigate(match[1]);
      setSearch("");
    } else {
      alert(
        "Try searching: Users, Jobs, Companies, Skills, Courses or Recommendations."
      );
    }
  };

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-40">

      <div className="flex items-center justify-between gap-5">

        <div className="hidden md:block min-w-0">
          <h1 className="text-2xl font-bold text-slate-800">
            {pageTitle}
          </h1>

          <p className="text-sm text-gray-500">
            SkillSphere AI platform
          </p>
        </div>

        <div className="flex items-center gap-3 ml-auto">

          {/* SEARCH */}

          <form
            onSubmit={handleSearch}
            className="relative hidden sm:block"
          >

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search..."
              className="w-56 lg:w-72 pl-11 pr-10 py-2.5 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:ring-2 focus:ring-cyan-500 transition"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            )}

          </form>

          {/* NOTIFICATIONS */}

          <div
            ref={notificationRef}
            className="relative"
          >

            <button
              onClick={() =>
                setShowNotifications(
                  !showNotifications
                )
              }
              className="icon-button relative"
              title="Notifications"
            >

              <FaBell />

              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center">
                3
              </span>

            </button>

            {showNotifications && (

              <div className="dropdown-panel right-0">

                <div className="p-4 border-b">

                  <h3 className="font-bold text-slate-800">
                    Notifications
                  </h3>

                  <p className="text-xs text-gray-500">
                    Recent platform activity
                  </p>

                </div>

                <div className="p-4 space-y-3">

                  <div className="p-3 rounded-xl bg-cyan-50">
                    <p className="text-sm font-medium">
                      New user activity
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Check the Users section.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-green-50">
                    <p className="text-sm font-medium">
                      New job listings
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Check the Jobs section.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-purple-50">
                    <p className="text-sm font-medium">
                      Recommendations ready
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      View AI recommendations.
                    </p>
                  </div>

                </div>

              </div>
            )}

          </div>

          {/* PROFILE */}

          <div
            ref={profileRef}
            className="relative"
          >

            <button
              onClick={() =>
                setShowProfile(!showProfile)
              }
              className="flex items-center gap-3 p-1 rounded-xl hover:bg-gray-100 transition"
            >

              <img
                src="https://ui-avatars.com/api/?name=Abrar+Kaif&background=0891b2&color=fff"
                alt="Abrar Kaif"
                className="w-10 h-10 rounded-full"
              />

              <div className="hidden lg:block text-left">

                <p className="text-sm font-semibold text-slate-800">
                  Abrar Kaif
                </p>

                <p className="text-xs text-gray-500">
                  Administrator
                </p>

              </div>

            </button>

            {showProfile && (

              <div className="dropdown-panel right-0 w-60">

                <div className="p-4 border-b">

                  <div className="flex items-center gap-3">

                    <FaUserCircle className="text-cyan-600 text-2xl" />

                    <div>
                      <p className="font-semibold">
                        Abrar Kaif
                      </p>

                      <p className="text-xs text-gray-500">
                        Administrator
                      </p>
                    </div>

                  </div>

                </div>

                <div className="p-2">

                  <button
                    onClick={() => {
                      alert(
                        "SkillSphere AI Administrator Profile"
                      );
                      setShowProfile(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    Profile
                  </button>

                  <button
                    onClick={() =>
                      setShowProfile(false)
                    }
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-red-600"
                  >
                    Close
                  </button>

                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </header>
  );
}