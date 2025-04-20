import { getClosestRestaurant } from "../utils/restaurantService.js";
import { showRestaurantMenu } from "./showRestaurantMenu.js";
import { setupFavoriteButton } from "./favoriteButton.js";

export const updateClosestRestaurantCard = () => {
  const closestRestaurant = getClosestRestaurant();
  if (!closestRestaurant) return;

  updateCardInfo(closestRestaurant);
  setupMenuButton(closestRestaurant);
  setupFavoriteButton(closestRestaurant, ".favorite-button");
};

const updateCardInfo = (restaurant) => {
  const nameElement = document.querySelector("#closestRestaurant h3");
  const infoElement = document.querySelector("#closestRestaurant p");

  nameElement.textContent = restaurant.name;
  infoElement.textContent = `${restaurant.address}, ${restaurant.city}`;
};

const setupMenuButton = (restaurant) => {
  const openButton = document.querySelector(".week-menu-button");
  openButton.addEventListener("click", () => {
    showRestaurantMenu(restaurant._id);
  });
};
