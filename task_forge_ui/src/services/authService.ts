const BASE_URL = "http://192.168.68.110:5000";

export const registerUser = async (userData: { username: string; password: string; email: string; role: number }) => {
  const response = await fetch(`${BASE_URL}/register-user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Username: userData.username,
      Password: userData.password,
      Email: userData.email,
      Role: userData.role,
    }),
  });

  if (!response.ok) {
    throw new Error("Registration failed.");
  }

  return response.json();
};

  // Login user after registration
  export const loginUser = async (credentials: { email: string; password: string }) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) {
        throw new Error("Login failed.");
      }
  
      const data = await response.json();
      console.log("Login response data:", data); 
  
      return data;
    } catch (error) {
      console.error("Login error:", error);
      return null;
    }
  };
  
