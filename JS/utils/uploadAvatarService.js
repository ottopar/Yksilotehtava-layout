import { apiUrl } from "./variables.js";

export const uploadAvatar = async (file) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Käyttäjä ei ole autentikoitu");

  const formData = new FormData();
  formData.append("avatar", file);

  const response = await fetch(`${apiUrl}/users/avatar`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Profiilikuvan asettaminen epäonnistui");
  }

  const data = await response.json();
  return data;
};
