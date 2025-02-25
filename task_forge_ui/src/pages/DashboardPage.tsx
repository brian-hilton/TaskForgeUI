import React from "react";
import UserInfoCard from "../components/UserInfoCard";
import { FaChartPie, FaTasks, FaBell, FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const DashboardPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`flex h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`w-1/4 p-5 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } transition-all`}
      >
        <h2 className="text-lg font-bold">Dashboard</h2>
        <ul className="mt-4 space-y-3">
          <li className="cursor-pointer hover:text-blue-400">Home</li>
          <li className="cursor-pointer hover:text-blue-400">Tasks</li>
          <li className="cursor-pointer hover:text-blue-400">Notifications</li>
          <li className="cursor-pointer hover:text-blue-400">Settings</li>
        </ul>
      </div>

      <div className="flex-1 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Dashboard Overview</h2>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-300 dark:bg-gray-700"
          >
            {theme === "dark" ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-blue-500" />
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <UserInfoCard />

          <div
            className={`p-4 shadow rounded-lg flex items-center space-x-3 ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <FaChartPie className="text-blue-500 text-3xl" />
            <div>
              <h3 className="font-semibold">Analytics</h3>
              <p>View your latest reports</p>
            </div>
          </div>

          <div
            className={`p-4 shadow rounded-lg flex items-center space-x-3 ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <FaTasks className="text-green-500 text-3xl" />
            <div>
              <h3 className="font-semibold">Tasks</h3>
              <p>3 new tasks assigned</p>
            </div>
          </div>

          <div
            className={`p-4 shadow rounded-lg flex items-center space-x-3 ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <FaBell className="text-red-500 text-3xl" />
            <div>
              <h3 className="font-semibold">Notifications</h3>
              <p>5 unread messages</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
