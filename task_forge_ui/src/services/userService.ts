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
  const response = await fetch(`${BASE_URL}/users/update-user?userId=${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const deleteUser = async (userId: number) => {
  return fetch(`${BASE_URL}/users/delete-user?userId=${userId}`, {method: "DELETE"});
};

export const fetchAllRoles = async () => {
  const response = await fetch(`${BASE_URL}/roles`);
  return response.json();
}
