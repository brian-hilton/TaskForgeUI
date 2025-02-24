import React, { useState, useEffect } from "react";
import { updateUser } from "../services/userService";

interface User {
  id: number;
  name: string;
  password: string;
  email: string;
}

const UserEditModal: React.FC<{
  show: boolean;
  handleClose: () => void;
  user: User;
  refreshUsers: () => void;
}> = ({ show, handleClose, user, refreshUsers }) => {
  const [userData, setUserData] = useState({
    name: "",
    password: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name,
        password: user.password,
        email: user.email,
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUser(user.id, userData);
    refreshUsers();
    handleClose();
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Edit User</h4>
            <button type="button" className="close" onClick={handleClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Edit Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>New Email</label>
                <input
                  type="text"
                  className="form-control"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Change Password</label>
                <input
                  type="text"
                  className="form-control"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary mt-3">
                Update User
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEditModal;
