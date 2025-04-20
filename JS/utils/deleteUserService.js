import { apiUrl } from "./variables.js";

export const deleteUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Käyttäjä ei ole kirjautunut sisään.");
  }

  const response = await fetch(`${apiUrl}/users`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Käyttäjän poisto epäonnistui.");
  }

  return result;
};
