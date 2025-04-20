import { createRestaurantCard } from "./restaurantCard.js";

const showNoRestaurantsMessage = (container, message) => {
  const noRestaurantsMessage = document.createElement("p");
  noRestaurantsMessage.classList.add("no-restaurants-message");
  noRestaurantsMessage.textContent = message;
  container.appendChild(noRestaurantsMessage);
};

export const renderRestaurantList = (restaurants, isFavoritePage = false) => {
  const container = document.querySelector("main.ravintolat");
  if (!container) {
    console.warn("renderRestaurantList: container not found");
    return;
  }

  container.textContent = ""; // clearaa aikaisempi sisältö

  // Käytän tätä kahdella eri sivulla, niin sen perusteella tulee eri viestiä
  if (restaurants.length === 0) {
    const message = isFavoritePage
      ? "Ei suosikkiravintoloita lisätty"
      : "Ei ravintoloita löytynyt";
    showNoRestaurantsMessage(container, message);
  } else {
    const fragment = document.createDocumentFragment();

    restaurants.forEach((restaurant) => {
      const card = createRestaurantCard(restaurant);
      fragment.appendChild(card);
    });

    container.appendChild(fragment);
  }
};
