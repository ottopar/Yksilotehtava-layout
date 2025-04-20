import { apiUrl } from "./variables.js";

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${apiUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Tapahtui virhe");
    }

    return result;
  } catch (error) {
    throw new Error("Network error");
  }
};
