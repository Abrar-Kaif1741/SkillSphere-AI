import {
  FaUsers,
  FaBriefcase,
  FaBuilding,
  FaLightbulb,
} from "react-icons/fa";

import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import QuickActions from "../components/QuickActions";
import RecentUsers from "../components/RecentUsers";
import LatestJobs from "../components/LatestJobs";
import RecommendationPanel from "../components/RecommendationPanel";

import useDashboard from "../hooks/useDashboard";

export default function Dashboard() {
  const { stats, loading } = useDashboard();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <h1 className="text-3xl font-bold animate-pulse">
          Loading Dashboard...
        </h1>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Heading */}

      <div>

        <h1 className="text-4xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back, Abrar Kaif 👋
        </p>

      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Users"
          value={stats.users}
          icon={<FaUsers size={28} />}
          color="bg-blue-600"
        />

        <StatCard
          title="Jobs"
          value={stats.jobs}
          icon={<FaBriefcase size={28} />}
          color="bg-green-600"
        />

        <StatCard
          title="Companies"
          value={stats.companies}
          icon={<FaBuilding size={28} />}
          color="bg-purple-600"
        />

        <StatCard
          title="Skills"
          value={stats.skills}
          icon={<FaLightbulb size={28} />}
          color="bg-orange-500"
        />

      </div>

      {/* Charts */}

      <div className="grid lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2">
          <ChartCard />
        </div>

        <QuickActions />

      </div>

      {/* Tables */}

      <div className="grid lg:grid-cols-2 gap-6">

        <RecentUsers />

        <LatestJobs />

      </div>

      {/* AI */}

      <RecommendationPanel />

    </div>
  );
}