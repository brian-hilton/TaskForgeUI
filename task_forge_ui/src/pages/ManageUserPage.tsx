import React, { useEffect, useState } from "react";
import {
  fetchAllUserRoles,
  fetchUserById,
  fetchAllRoles,
} from "../services/userService";
import UserCard from "../components/UserCard";

interface User {
  id: number;
  name: string;
  role: string;
}

const ManageUserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [rolesMap, setRolesMap] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const rolesData = await fetchAllRoles();
      const roleMapping: { [key: number]: string } = {};

      rolesData.forEach((role: { id: number; name: string }) => {
        roleMapping[role.id] = role.name;
      });
      setRolesMap(roleMapping);

      const rolesList = await fetchAllUserRoles();

      // Ensure userId exists before making a request
      const userPromises = rolesList.map(
        async (roleEntry: { userId?: number; roleId: number }) => {
          if (!roleEntry.userId) {
            console.warn("Skipping user due to missing userId:", roleEntry);
            return null;
          }

          const userData = await fetchUserById(roleEntry.userId);
          if (!userData) return null;

          return {
            id: userData.id,
            name: userData.name,
            role: roleMapping[roleEntry.roleId] || "Unknown Role",
          };
        }
      );

      const usersList = (await Promise.all(userPromises)).filter(Boolean); // ✅ Remove null values
      setUsers(usersList);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Manage Users</h2>
      <div className="row">
        {users.map((user) => (
          <div key={user.id} className="col-md-6 mb-4">
            <UserCard user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUserPage;
