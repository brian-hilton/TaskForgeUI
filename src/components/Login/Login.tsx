import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for redirection

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5272/login", {
        email,
        password,
      });

      const user = response.data; // The user object from backend
      localStorage.setItem("user", JSON.stringify(user)); // Store user data

      // Redirect to worker dashboard
      navigate("/worker-dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f5e6ff" }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{
          borderRadius: "12px",
          width: "350px",
          backgroundColor: "#e8d6ff",
        }}
      >
        <h3 className="text-center" style={{ color: "#6a0dad" }}>
          Login
        </h3>
        {error && (
          <div className="alert alert-danger p-2 text-center">{error}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "#6a0dad",
              color: "white",
              borderRadius: "8px",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
