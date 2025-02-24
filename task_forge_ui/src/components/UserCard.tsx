import React, { useState } from "react";
import { updateUser, deleteUser } from "../services/userService";

interface User {
  id: number;
  name: string;
  role: string;
}

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div className="card p-3 shadow-sm">
      <h4>{user.name}</h4>
      <p>
        <strong>Role:</strong> {user.role}
      </p>

      <div className="d-flex gap-2">
        <button
          className="btn btn-warning"
          onClick={() => setShowEditModal(true)}
        >
          Edit (Stub)
        </button>
        <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>
          Delete (Stub)
        </button>
      </div>

      <UserEditModal />
    </div>
  );
};

export default UserCard;
