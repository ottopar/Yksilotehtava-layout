import {
  addFavorite,
  removeFavorite,
  isFavorite,
} from "../utils/favoriteService.js";
import { EventEmitter } from "../utils/eventService.js";

export const setupFavoriteButton = (restaurant, buttonSelector) => {
  const favoriteButton =
    typeof buttonSelector === "string"
      ? document.querySelector(buttonSelector)
      : buttonSelector;

  if (!favoriteButton) {
    console.error("Favorite button not found:", buttonSelector);
    return null;
  }

  const updateButtonState = () => {
    try {
      const isFavorited = isFavorite(restaurant._id);
      favoriteButton.innerHTML = `
        <i class="fas fa-heart" style="color: ${
          isFavorited ? "#e34234" : "#ccc"
        }"></i>
        ${isFavorited ? "Poista suosikeista" : "Lisää suosikkeihin"}
      `;
      favoriteButton.classList.toggle("active", isFavorited);
    } catch (error) {
      console.error("Error updating favorite button state:", error);
    }
  };

  favoriteButton.addEventListener("click", () => {
    const isCurrentlyFavorite = isFavorite(restaurant._id);
    try {
      if (isCurrentlyFavorite) {
        removeFavorite(restaurant._id);
      } else {
        addFavorite(restaurant._id);
      }
      // Eventti kun ravintola lisätään suosikiksi
      EventEmitter.emit("favoriteStateChanged", restaurant._id);
    } catch (error) {
      console.error("Error toggling favorite state:", error);
    }
  });

  // checkkaa suosikki tila muista napeista
  const unsubscribe = EventEmitter.subscribe(
    "favoriteStateChanged",
    (changedRestaurantId) => {
      // päivitä jos id matchaa
      if (changedRestaurantId === restaurant._id) {
        updateButtonState();
      }
    }
  );

  favoriteButton.unsubscribe = unsubscribe;

  updateButtonState();

  return favoriteButton;
};

export const createFavoriteButton = (restaurant) => {
  const button = document.createElement("button");
  button.className = "favorite-button";
  setupFavoriteButton(restaurant, button);
  return button;
};
