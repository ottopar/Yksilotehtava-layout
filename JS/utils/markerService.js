import { getRestaurants } from "./restaurantService.js";

export const addRestaurantMarkers = (map) => {
  const restaurants = getRestaurants();
  restaurants.forEach((restaurant) => {
    const [longitude, latitude] = restaurant.location.coordinates;
    const marker = L.marker([latitude, longitude]).addTo(map);

    const popupContent = `

    <div class="popup-content">
      <h3>${restaurant.name}</h3>
      <p>${restaurant.address}</p>
      <p>Distance: ${
        restaurant.distance ? restaurant.distance.toFixed(2) + " km" : "N/A"
      }</p>
      <button onclick="window.showRestaurantMenu('${
        restaurant._id
      }')" class="popup-button">
          Show Menu
        </button>
    </div>
    `;

    marker.bindPopup(popupContent);
  });
};
