import BASE_URL from "../config/baseUrl"


export const fetchAllUserRoles = async () => {
  const response = await fetch(`${BASE_URL}/get-all-user-roles`);
  return response.json();
};

export const fetchUserById = async (userId: number) => {
  if (!userId) {
    console.error("Error: fetchUserById was called with an undefined userId.");
    return null;
  }
  
  const response = await fetch(`${BASE_URL}/get-user?userId=${userId}`);
  return response.json();
};

// implement this
export const createUser = async (userData: object) => {
  console.log("Stub: Create User", userData);
};

export const updateUser = async (userId: number, userData: object) => {
  console.log("Stub: Update User", userId, userData);
};

export const deleteUser = async (userId: number) => {
  console.log("Stub: Delete User", userId);
};

export const fetchAllRoles = async () => {
  const response = await fetch(`${BASE_URL}/roles`);
  return response.json();
}
