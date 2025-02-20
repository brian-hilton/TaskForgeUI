import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import JobQueuePage from "./pages/JobQueuePage";
import CrewsPage from "./pages/CrewsPage";
import LoginPage from "./pages/LoginPage";
import ManageUserPage from "./pages/ManageUserPage";
import RegisterPage from "./pages/RegisterPage";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
  const { user } = useAuth();

  if (user === undefined) {
    console.log("Waiting for user authentication...");
    return null; // Prevents an unnecessary redirect
  }

  return user ? element : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/"
        element={<ProtectedRoute element={<DashboardLayout />} />}
      >
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="job-queue" element={<JobQueuePage />} />
        <Route path="crews" element={<CrewsPage />} />
        <Route path="users" element={<ManageUserPage />} />
      </Route>

      {/* Default Redirect */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
