import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import JobQueuePage from "./pages/JobQueuePage";
import CrewsPage from "./pages/CrewsPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="job-queue" element={<JobQueuePage />} />
          <Route path="crews" element={<CrewsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
