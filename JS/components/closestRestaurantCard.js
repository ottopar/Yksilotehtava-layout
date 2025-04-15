import { getClosestRestaurant } from "../utils/restaurantService.js";
import { getWeeklyMenu, createWeeklyMenuHtml } from "../utils/menuService.js";

export const updateClosestRestaurantCard = async () => {
  const closestRestaurant = getClosestRestaurant();
  if (!closestRestaurant) return;

  updateCardInfo(closestRestaurant);
  setupWeeklyMenuModal(closestRestaurant);
};

const updateCardInfo = (restaurant) => {
  const nameElement = document.querySelector("#closestRestaurant h3");
  const infoElement = document.querySelector("#closestRestaurant p");

  nameElement.textContent = restaurant.name;
  infoElement.textContent = `${restaurant.address}, ${restaurant.city}`;
};

const setupWeeklyMenuModal = (restaurant) => {
  const modal = document.querySelector("#viikon-ruokalista");
  const openButton = document.querySelector(".week-menu-button");
  const closeButton = modal.querySelector(".close-menu-modal");

  // Show modal
  openButton.addEventListener("click", async () => {
    try {
      const weeklyMenuData = await getWeeklyMenu(restaurant._id);
      const menuHtml = createWeeklyMenuHtml(weeklyMenuData);
      updateMenuContainer(menuHtml);
      modal.showModal(); // Using native dialog methods
      document.body.style.overflow = "hidden";
    } catch (error) {
      console.error("Error fetching weekly menu:", error);
      showErrorMessage();
    }
  });

  // Close modal on X button click
  closeButton.addEventListener("click", () => {
    modal.close(); // Using native dialog methods
    document.body.style.overflow = "";
  });

  // Close modal on click outside
  modal.addEventListener("click", (e) => {
    const rect = modal.getBoundingClientRect();
    const isInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;
    if (!isInDialog) {
      modal.close();
      document.body.style.overflow = "";
    }
  });

  // Prevent closing when clicking inside the modal
  modal.querySelector(".menu-modal-content").addEventListener("click", (e) => {
    e.stopPropagation();
  });
};

const updateMenuContainer = (menuHtml) => {
  const menuContent = document.querySelector(
    "#viikon-ruokalista .menu-content"
  );
  menuContent.innerHTML = menuHtml;

  // Setup tab functionality after content is added
  setupTabFunctionality();
};

const setupTabFunctionality = () => {
  const tabButtons = document.querySelectorAll(".menu-tab-button");
  const dayContents = document.querySelectorAll(".menu-day-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const dayIndex = button.dataset.day;

      tabButtons.forEach((btn) => btn.classList.remove("active"));
      dayContents.forEach((content) => content.classList.remove("active"));

      button.classList.add("active");
      document
        .querySelector(`.menu-day-content[data-day="${dayIndex}"]`)
        .classList.add("active");
    });
  });
};

const showErrorMessage = () => {
  const menuContent = document.querySelector(
    "#viikon-ruokalista .menu-content"
  );
  menuContent.innerHTML = `
    <p class="error-message">Valitettavasti menun lataus epäonnistui. Yritä myöhemmin uudelleen.</p>
  `;
};
