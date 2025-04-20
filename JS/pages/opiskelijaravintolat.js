import {
  fetchRestaurants,
  getRestaurants,
} from "../utils/restaurantService.js";
import { showRestaurantMenu } from "../components/showRestaurantMenu.js";
import { renderRestaurantList } from "../components/renderRestaurantList.js";
import { setupRestaurantSearch } from "../components/searchRestaurants.js";
import { setupCityFilter } from "../components/filterByCity.js";

const initStudentRestaurantPage = async () => {
  try {
    await fetchRestaurants();

    const restaurants = getRestaurants();

    renderRestaurantList(restaurants);

    const searchForm = document.querySelector(
      ".search-ravintolat form:nth-of-type(1)"
    );
    const filterForm = document.querySelector(
      ".search-ravintolat form:nth-of-type(2)"
    );

    setupRestaurantSearch(searchForm, restaurants, renderRestaurantList);
    setupCityFilter(filterForm, restaurants, renderRestaurantList);
  } catch (error) {
    console.error("Opiskelijaravintolat init failed: ", error);
  }
};

window.showRestaurantMenu = showRestaurantMenu;

initStudentRestaurantPage();
