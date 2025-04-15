import { apiUrl } from "./variables.js";
import { fetchData } from "../api/fetchData.js";

const formatPrice = (priceString) => {
  if (!priceString) return "Price not available";
  return priceString.split(" / ").join("<br>");
};

export const getDailyMenu = async (restaurantId, lang = "fi") => {
  try {
    return await fetchData(
      `${apiUrl}/restaurants/daily/${restaurantId}/${lang}`
    );
  } catch (error) {
    console.error(error);
    return { courses: [] }; // Return an empty array if there's an error
  }
};

export const getWeeklyMenu = async (restaurantId, lang = "fi") => {
  try {
    const menu = await fetchData(
      `${apiUrl}/restaurants/weekly/${restaurantId}/${lang}`
    );
    console.log(menu);
    return menu;
  } catch (error) {
    console.error(error);
    return { courses: [] }; // Return an empty array if there's an error
  }
};

export const createMenuHtml = (courses) => {
  if (!courses || !courses.length) {
    return '<p class="error-message">Menu not available at the moment.</p>';
  }

  return courses.reduce(
    (html, { name = "Unnamed dish", price, diets = [] }) =>
      html +
      `
      <div class="menu-item">
        <strong>${name}</strong>
        <div class="menu-details">
          <p class="price">${formatPrice(price)}</p>
          ${
            Array.isArray(diets) && diets.length
              ? `<p class="diets">${diets.join(", ")}</p>`
              : ""
          }
        </div>
      </div>
    `,
    ""
  );
};

export const createWeeklyMenuHtml = (weeklyMenu) => {
  if (!weeklyMenu?.days || !weeklyMenu.days.length) {
    return '<p class="error-message">Weekly menu not available at the moment.</p>';
  }

  const tabButtons = weeklyMenu.days
    .map(
      (day, index) => `
      <button class="menu-tab-button ${index === 0 ? "active" : ""}"
              data-day="${index}">
        ${day.date.split(" ")[0]}
      </button>
    `
    )
    .join("");

  const menuContent = weeklyMenu.days
    .map(
      (day, index) => `
      <div class="menu-day-content ${
        index === 0 ? "active" : ""
      }" data-day="${index}">
        <h3 class="menu-day-title">${day.date}</h3>
        ${createMenuHtml(day.courses || [])}
      </div>
    `
    )
    .join("");

  return `
    <div class="menu-tabs-container">
      <div class="menu-tab-buttons">
        ${tabButtons}
      </div>
      <div class="menu-days-content">
        ${menuContent}
      </div>
    </div>
  `;
};
