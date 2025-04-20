import { isFavorite } from "../utils/favoriteService.js";
import { EventEmitter } from "../utils/eventService.js";

export const handleFavoriteDomSync = () => {
  EventEmitter.subscribe("favoriteStateChanged", (restaurantId) => {
    if (!isFavorite(restaurantId)) {
      const card = document.querySelector(
        `.haettu-ravintola[data-id="${restaurantId}"]`
      );
      if (card) {
        card.remove();
      }
    }

    const remainingFavorites = document.querySelectorAll(".haettu-ravintola");

    if (remainingFavorites.length === 0) {
      // Näytä teksti jos ei ole suosikkiravintoloita
      const paragraph = document.createElement("p");
      paragraph.textContent = "Ei suosikkiravintoloita lisätty";
      const main = document.querySelector("main.ravintolat");
      main.appendChild(paragraph);
    }
  });
};
