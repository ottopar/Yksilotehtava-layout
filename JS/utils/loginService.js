import { apiUrl } from "./variables.js";

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Kirjautuminen epäonnistui");
    }

    return result;
  } catch (error) {
    throw new Error(error.message || "Network error");
  }
};
