import { apiUrl } from "./variables.js";
import { fetchData } from "../api/fetchData.js";

const formatPrice = (priceString) =>
  priceString
    ? priceString.split(" / ").join("<br>")
    : "Hinta ei ole saatavilla";

export const getDailyMenu = async (restaurantId, lang = "fi") => {
  try {
    return await fetchData(
      `${apiUrl}/restaurants/daily/${restaurantId}/${lang}`
    );
  } catch (error) {
    console.error(error);
    return { courses: [] }; // Tyhjä array jos erroria
  }
};

export const getWeeklyMenu = async (restaurantId, lang = "fi") => {
  try {
    const menu = await fetchData(
      `${apiUrl}/restaurants/weekly/${restaurantId}/${lang}`
    );
    return menu;
  } catch (error) {
    console.error(error);
    return { courses: [] };
  }
};

export const createMenuHtml = (courses) => {
  if (!courses?.length) {
    return '<p class="error-message">Menu ei ole saatavilla tällä hetkellä.</p>';
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
  if (!weeklyMenu?.days?.length) {
    return '<p class="error-message">Menu ei ole saatavilla tällä hetkellä.</p>';
  }

  const tabButtons = weeklyMenu.days
    .map(
      (day, index) => `
      <button class="menu-tab-button" data-day="${index}">
        ${day.date.split(" ")[0]}
      </button>
    `
    )
    .join("");

  const menuContent = weeklyMenu.days
    .map(
      (day, index) => `
      <div class="menu-day-content" data-day="${index}">
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
