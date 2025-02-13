import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import JobDetails from "./components/Job/JobDetails";
import JobList from "./components/Job/JobList";
import Login from "./components/Login/Login";
import WorkerDashboard from "./components/Dashboards/workerDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/worker-dashboard" element={<WorkerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
// <JobList userId={1} />
