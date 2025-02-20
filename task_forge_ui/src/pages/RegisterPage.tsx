import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { fetchUserRoles } from "../services/dashboardService";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    role: 2,
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // pass in role id 2 as default
      await registerUser({ ...userData });

      // Automatically log in the user after registration
      const user = await loginUser({
        email: userData.email,
        password: userData.password,
      });

      if (user) {
        login(user);
        setTimeout(() => navigate("/dashboard"), 500);
      } else {
        setError(
          "Registration successful, but automatic login failed. Please log in manually."
        );
      }
    } catch (err) {
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            value={userData.username}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
