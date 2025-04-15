import { fetchRestaurants } from "../utils/restaurantService.js";
import { sortRestaurantsByDistance } from "../utils/restaurantService.js";
import { updateClosestRestaurantCard } from "../components/closestRestaurantCard.js";
import { getCurrentLocation } from "../utils/locationService.js";
import { initializeMap } from "../utils/mapService.js";
import { addRestaurantMarkers } from "../utils/markerService.js";
import { showRestaurantMenu } from "../components/showRestaurantMenu.js";
import { updateClosestRestaurantDailyMenu } from "../components/closestRestaurantDailyMenu.js";

const initHomePage = async () => {
  try {
    const location = await getCurrentLocation();
    const map = initializeMap(location.latitude, location.longitude);

    await fetchRestaurants();
    sortRestaurantsByDistance(location.latitude, location.longitude);

    await updateClosestRestaurantCard();
    await updateClosestRestaurantDailyMenu();
    addRestaurantMarkers(map);
  } catch (error) {
    console.error(error);
  }
};

window.showRestaurantMenu = showRestaurantMenu;

initHomePage();
