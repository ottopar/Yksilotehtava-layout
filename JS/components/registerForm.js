import { registerUser } from "../utils/registerService.js";
import { apiUrl } from "../utils/variables.js";

export const initRegisterForm = () => {
  const form = document.querySelector("form");

  if (!form) {
    console.warn("Form not found");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Kerää form data
    const email = document.querySelector('input[type="email"]').value.trim();
    const username = document.querySelector('input[type="text"]').value.trim();
    const password = document
      .querySelector('input[type="password"]')
      .value.trim();

    // Perus validaatio
    if (!email || !username || !password) {
      alert("Kaikki kentät tulee täyttää.");
      return;
    }

    // Tarkista käyttäjänimen saatavuus
    const isUsernameAvailable = await checkUsernameAvailability(username);
    if (!isUsernameAvailable) {
      alert("Käyttäjänimi on jo käytössä. Valitse toinen.");
      return;
    }

    const userData = { email, username, password };

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    try {
      await registerUser(userData);

      alert("Rekisteröinti onnistui!");
      window.location.href = "Login.html";
    } catch (error) {
      alert(`Virhe: ${error.message}`);
    } finally {
      submitButton.disabled = false;
    }
  });
};

const checkUsernameAvailability = async (username) => {
  try {
    const response = await fetch(`${apiUrl}/users/available/${username}`);
    if (response.ok) {
      const data = await response.json();
      return data.available;
    } else {
      alert("Virhe tarkistaessa käyttäjänimen saatavuutta.");
      return false;
    }
  } catch (error) {
    console.error("Error checking username availability:", error);
    alert("Virhe tarkistaessa käyttäjänimen saatavuutta.");
    return false;
  }
};
