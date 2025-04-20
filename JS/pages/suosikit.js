import { getFavorites } from "../utils/favoriteService.js";
import {
  fetchRestaurants,
  getRestaurants,
} from "../utils/restaurantService.js";
import { showRestaurantMenu } from "../components/showRestaurantMenu.js";
import { renderRestaurantList } from "../components/renderRestaurantList.js";
import { handleFavoriteDomSync } from "../components/handleFavoriteDomSync.js";

const initFavoritesPage = async () => {
  try {
    await fetchRestaurants();
    const restaurants = getRestaurants();
    const favoriteIds = getFavorites();
    const favorites = restaurants.filter((r) => favoriteIds.includes(r._id));

    console.log(favorites);

    renderRestaurantList(favorites, true);
    handleFavoriteDomSync();
  } catch (error) {
    console.log("Error: ", error);
  }
};

window.showRestaurantMenu = showRestaurantMenu;

initFavoritesPage();
