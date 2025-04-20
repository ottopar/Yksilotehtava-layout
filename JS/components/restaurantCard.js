import { createFavoriteButton } from "./favoriteButton.js";

export const createRestaurantCard = (restaurant) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("haettu-ravintola");
  wrapper.dataset.id = restaurant._id;

  const content = document.createElement("div");
  content.className = "haettu-ravintola-teksti";

  const name = restaurant.name || "Nimi ei saatavilla";
  const address = restaurant.address || "Osoite ei saatavilla";
  const city = restaurant.city || "Kaupunki ei saatavilla";

  content.innerHTML = `
    <h3>${name}</h3>
    <p>${address}</p>
    <p>${city}</p>
  `;

  const menuButton = document.createElement("button");
  menuButton.classList.add("week-menu-button");
  menuButton.setAttribute("popovertarget", "viikon-ruokalista");
  menuButton.textContent = "Katso viikon ruokalista";
  menuButton.addEventListener("click", () =>
    showRestaurantMenu(restaurant._id)
  );

  content.appendChild(menuButton);

  const favButton = createFavoriteButton(restaurant);
  favButton.classList.add("favorite-button");

  content.appendChild(favButton);
  wrapper.appendChild(content);

  return wrapper;
};
