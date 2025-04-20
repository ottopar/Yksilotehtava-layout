import { loginUser } from "../utils/loginService.js";

export const initLoginForm = () => {
  const form = document.querySelector("form");
  const usernameInput = form.querySelector('input[placeholder="Käyttäjänimi"]');
  const passwordInput = form.querySelector('input[placeholder="Salasana"]');
  const submitButton = form.querySelector('button[type="submit"]');

  if (!form || !usernameInput || !passwordInput || !submitButton) {
    console.warn("Login form elements missing");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!usernameInput.value.trim() || !passwordInput.value.trim()) {
      alert("Käyttäjänimi ja salasana ovat pakollisia.");
      return;
    }

    const credentials = {
      username: usernameInput.value.trim(),
      password: passwordInput.value,
    };

    submitButton.disabled = true;
    submitButton.textContent = "Kirjautuminen...";

    try {
      const result = await loginUser(credentials);
      console.log("Login successful:", result);

      localStorage.setItem("token", result.token);

      window.location.href = "Tili.html";
    } catch (error) {
      console.error("Login error:", error);
      alert(
        error.message ||
          "Kirjautuminen epäonnistui. Tarkista käyttäjänimi ja salasana."
      );
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Kirjaudu sisään";
    }
  });
};
