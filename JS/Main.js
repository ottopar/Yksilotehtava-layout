import { getRestaurants } from "./assets/components.js";
import { sortRestaurants } from "./assets/components.js";
import { SetTextClosestRestaurant } from "./assets/components.js";

// Options for retrieving location information (optional)
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

let currentLocation = [];

// A function that is called when location information is retrieved
function success(pos) {
  const crd = pos.coords;

  // Printing location information to the console
  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);

  let currentLat = crd.latitude;
  let currentLon = crd.longitude;

  currentLocation.push(currentLat, currentLon);

  // Use the leaflet.js library to show the location on the map (https://leafletjs.com/)
  const map = L.map("map").setView([crd.latitude, crd.longitude], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
}

// Function to be called if an error occurs while retrieving location information
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

// Starts the location search
navigator.geolocation.getCurrentPosition(success, error, options);

console.log(currentLocation);

const main = async () => {
  try {
    await getRestaurants();
    sortRestaurants(currentLocation[0], currentLocation[1]);
    SetTextClosestRestaurant();
  } catch (error) {
    console.error(error);
  }
};

main();
