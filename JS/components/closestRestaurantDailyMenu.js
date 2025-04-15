import { getDailyMenu, createMenuHtml } from "../utils/menuService.js";
import { getClosestRestaurant } from "../utils/restaurantService.js";

export const updateClosestRestaurantDailyMenu = async () => {
  try {
    const restaurant = getClosestRestaurant();
    if (!restaurant) return;

    const menuData = await getDailyMenu(restaurant._id);
    const menuHtml = createMenuHtml(menuData.courses || []);
    updateMenuCard(menuHtml, restaurant);
  } catch (error) {
    console.error("Error updating daily menu:", error);
    showErrorMessage();
  }
};

const updateMenuCard = (menuHtml, restaurant) => {
  const cardElement = document.querySelector(".kortti:nth-child(2)");
  if (!cardElement) return;

  cardElement.innerHTML = `
    <div class="text">
      <h3>${restaurant.name} - Päivän Menu</h3>
      <div class="daily-menu-content">
        ${menuHtml}
      </div>
    </div>
  `;
};

const showErrorMessage = () => {
  const cardElement = document.querySelector(".kortti:nth-child(2)");
  if (!cardElement) return;

  cardElement.innerHTML = `
    <div class="text">
      <h3>Päivän Menu</h3>
      <p class="error-message">Valitettavasti menua ei voitu ladata. Yritä myöhemmin uudelleen.</p>
    </div>
  `;
};
