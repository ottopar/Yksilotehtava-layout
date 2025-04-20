import { apiUrl } from "./variables.js";

export const updateUser = async (updatedData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Tokenia ei löytynyt");

  const allowedKeys = [
    "username",
    "email",
    "password",
    "favouriteRestaurant",
    "avatar",
  ];
  const payload = Object.fromEntries(
    Object.entries(updatedData).filter(([key]) => allowedKeys.includes(key))
  );

  const response = await fetch(`${apiUrl}/users`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  if (!response.ok)
    throw new Error(result.message || "Käyttäjän päivittäminen epäonnistui");

  return result.data;
};
