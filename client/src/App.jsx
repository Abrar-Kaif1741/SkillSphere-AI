import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Skills from "./pages/Skills";
import Jobs from "./pages/Jobs";
import Companies from "./pages/Companies";
import Courses from "./pages/Courses";
import Recommendations from "./pages/Recommendations";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>

        <Route path="/" element={<Dashboard />} />

        <Route path="/users" element={<Users />} />

        <Route path="/skills" element={<Skills />} />

        <Route path="/jobs" element={<Jobs />} />

        <Route
          path="/companies"
          element={<Companies />}
        />

        <Route
          path="/courses"
          element={<Courses />}
        />

        <Route
          path="/recommendations"
          element={<Recommendations />}
        />

      </Route>
    </Routes>
  );
}

export default App;