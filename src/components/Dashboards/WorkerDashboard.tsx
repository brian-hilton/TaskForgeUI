import { useEffect, useState } from "react";
import axios from "axios";
import JobList from "../Job/JobList";

const WorkerDashboard = () => {
  const [user, setUser] = useState<{ id: number; name: string } | null>(null);
  const [crew, setCrew] = useState<{ id: number; name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Simulating user data retrieval from local storage or login response
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (!storedUser) {
      setError("User not found.");
      setLoading(false);
      return;
    }
    setUser(storedUser);

    axios
      .get(
        `http://localhost:5272/crews/get-all-crews-for-user?userId=${storedUser.id}`
      )
      .then((res) => {
        const crewList = res.data;
        if (crewList.length === 0) {
          setError("No crew found.");
          setLoading(false);
          return;
        }

        return axios.get(
          `http://localhost:5272/crews/get-crew?crewId=${crewList[0]}`
        );
      })
      .then((res) => {
        if (res) setCrew(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load crew data.");
        setLoading(false);
      });
  }, []);

  return (
    <div
      className="vh-100 vw-100 d-flex flex-column"
      style={{ backgroundColor: "#E6E6FA" }}
    >
      {/* Header Section (Top Left) */}
      <div className="p-4">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <div>
            <h1 className="fw-bold">{crew?.name || "Unnamed Crew"}</h1>
            <h2>Welcome, {user?.name}!</h2>
          </div>
        )}
      </div>

      {/* JobList Component (Takes up remaining space) */}
      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        {user && <JobList userId={user.id} />}
      </div>
    </div>
  );
};

export default WorkerDashboard;
