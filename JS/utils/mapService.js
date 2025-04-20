import { getClosestRestaurant } from "./restaurantService.js";

export const initializeMap = (latitude, longitude) => {
  const map = L.map("map").setView([latitude, longitude], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  return map;
};

export const focusMapOnClosestRestaurant = (map) => {
  const closest = getClosestRestaurant();
  if (closest) {
    const [longitude, latitude] = closest.location.coordinates;
    map.setView([latitude, longitude], 17, {
      animate: true,
      duration: 1,
    });
  }
};
