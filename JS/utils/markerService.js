import { getRestaurants } from "./restaurantService.js";
import { createFavoriteButton } from "../components/favoriteButton.js";

export const addRestaurantMarkers = (map) => {
  const restaurants = getRestaurants();
  restaurants.forEach((restaurant) => {
    const [longitude, latitude] = restaurant.location.coordinates;
    const marker = L.marker([latitude, longitude]).addTo(map);

    const popupContent = document.createElement("div");
    popupContent.className = "popup-content";

    popupContent.innerHTML = `
      <h3>${restaurant.name}</h3>
      <p>${restaurant.address}</p>
      <p>Distance: ${
        restaurant.distance ? restaurant.distance.toFixed(2) + " km" : "N/A"
      }</p>
      <button onclick="window.showRestaurantMenu('${
        restaurant._id
      }')" class="popup-button">
        Katso viikon ruokalista
      </button>
    `;

    const favoriteButton = createFavoriteButton(restaurant);
    popupContent.appendChild(favoriteButton);

    // Event listenerit pois ku suljetaan
    marker.on("popupclose", () => {
      favoriteButton.unsubscribe?.();
    });

    marker.bindPopup(popupContent);
  });
};
