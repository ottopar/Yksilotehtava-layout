import { getWeeklyMenu } from "../utils/menuService.js";
import { createWeeklyMenuHtml } from "../utils/menuService.js";
import { createMenuModal } from "./createMenuModal.js";
import { getRestaurantById } from "../utils/restaurantService.js";

export const showRestaurantMenu = async (restaurantId) => {
  try {
    const restaurant = getRestaurantById(restaurantId);
    if (!restaurant) {
      console.error("Restaurant not found:", restaurantId);
      return;
    }

    const weeklyMenuData = await getWeeklyMenu(restaurantId);
    const menuHtml = createWeeklyMenuHtml(weeklyMenuData);
    const modalHtml = createMenuModal(restaurant, menuHtml);

    // Poista olemassa olevat jotta yksi näkyy kerrallaan
    const existingModal = document.querySelector(".menu-modal-overlay");
    if (existingModal) {
      existingModal.remove();
    }

    const modalContainer = document.createElement("div");
    modalContainer.classList.add("menu-modal-overlay");
    modalContainer.innerHTML = modalHtml;
    document.body.appendChild(modalContainer);

    // Sulje modal paianessa nappia, esciä tai pois modalista
    const closeBtn = modalContainer.querySelector(".close-menu-modal");
    closeBtn?.addEventListener("click", () => modalContainer.remove());

    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        modalContainer.remove();
        document.removeEventListener("keydown", handleEscapeKey);
      }
    };
    document.addEventListener("keydown", handleEscapeKey);
  } catch (err) {
    console.error("Error displaying restaurant menu:", err);
    alert("Etsittäessä ruokalistaa tapahtui virhe.");
  }
};
