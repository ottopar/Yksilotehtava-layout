import { getLoggedInUser, logoutUser } from "../utils/userService.js";
import { updateUser } from "../utils/updateUserService.js";
import { uploadAvatar } from "../utils/uploadAvatarService.js";
import { deleteUser } from "../utils/deleteUserService.js";

export const initUserProfile = async () => {
  const user = await getLoggedInUser();
  if (!user) {
    alert("Käyttäjätietojen haku epäonnistui. Kirjaudu sisään.");
    logoutUser();
    window.location.href = "Login.html";
    return;
  }

  // Dom elementit
  const usernameElem = document.getElementById("username");
  const emailElem = document.getElementById("email");
  const avatarImg = document.getElementById("avatar");
  const uploadBtn = document.getElementById("upload-avatar-btn");
  const avatarInput = document.getElementById("avatarInput");

  usernameElem.textContent = user.username;
  emailElem.textContent = user.email;

  if (avatarImg && user.avatar) {
    avatarImg.src = `https://media2.edu.metropolia.fi/restaurant/uploads/${user.avatar}`;
  }

  uploadBtn?.addEventListener("click", () => avatarInput?.click());

  avatarInput?.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const result = await uploadAvatar(file);
      if (avatarImg && result.data.avatar) {
        avatarImg.src = `https://media2.edu.metropolia.fi/restaurant/uploads/${result.data.avatar}`;
      }

      alert("Profiilikuva päivitetty!");
    } catch (err) {
      alert(`Virhe profiilikuvan päivityksessä: ${err.message}`);
    }
  });

  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const row = e.target.closest("tr");
      const field = row.querySelector("th").textContent;
      const id = row.querySelector("td").id;
      const currentValue = user[id];
      const newValue = prompt(`Uusi ${field.toLowerCase()}:`, currentValue);
      if (!newValue || newValue === currentValue) return;

      try {
        const updatedData = { [id]: newValue };
        const updatedUser = await updateUser(updatedData);
        document.getElementById(id).textContent = updatedUser[id];
        alert(`${field} päivitetty`);
      } catch (err) {
        alert(`Virhe päivityksessä: ${err.message}`);
      }
    });
  });
};

export const initLogoutButton = () => {
  const btn = document.getElementById("logout-btn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    logoutUser();
    window.location.href = "Login.html";
  });
};

export const initDeleteAccountButton = () => {
  const btn = document.getElementById("delete-account-btn");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const confirmDelete = confirm("Haluatko varmasti poistaa käyttäjätilisi?");
    if (!confirmDelete) return;

    try {
      await deleteUser();
      alert("Käyttäjätili poistettu.");
      localStorage.removeItem("token");
      window.location.href = "Etusivu.html";
    } catch (error) {
      alert(`Virhe käyttäjän poistossa: ${error.message}`);
    }
  });
};
