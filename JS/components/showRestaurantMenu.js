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

    // Remove any existing modals first
    document
      .querySelectorAll(".menu-modal-overlay")
      .forEach((el) => el.remove());

    const modalContainer = document.createElement("div");
    modalContainer.classList.add("menu-modal-overlay");
    modalContainer.innerHTML = modalHtml;
    document.body.appendChild(modalContainer);

    // Close modal on click
    modalContainer
      .querySelector(".close-menu-modal")
      .addEventListener("click", () => modalContainer.remove());

    // Close modal on ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") modalContainer.remove();
    });
  } catch (err) {
    console.error("Error displaying restaurant menu:", err);
  }
};
