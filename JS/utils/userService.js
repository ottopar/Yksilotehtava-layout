import { apiUrl } from "./variables.js";

export const getLoggedInUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const response = await fetch(`${apiUrl}/users/token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch {
    return null;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};
