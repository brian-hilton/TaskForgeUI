import BASE_URL from "../config/baseUrl"

export const fetchUserById = async (userId: number) => {
  const response = await fetch(`${BASE_URL}/get-user?userId=${userId}`);
  return response.json();
};

export const fetchUserRoles = async (userId: number) => {
  const response = await fetch(`${BASE_URL}/user/roles?userId=${userId}`);
  return response.json();
};
