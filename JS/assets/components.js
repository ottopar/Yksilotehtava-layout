import { apiUrl } from "./variables.js";
import { fetchData } from "./fetchData.js";
import { sortName } from "./utils.js";

const closestRestaurant = document.getElementById("closestRestaurant");

const popoverRuokalista = document.getElementById("viikon-ruokalista");

const weekMenuButton = document.querySelector(".week-menu-button");

const closestRestaurantText = document.querySelector("#closestRestaurant h3");

let restaurants = [];

let distances = [];

export const getRestaurants = async () => {
  try {
    restaurants = await fetchData(`${apiUrl}/restaurants`);
    console.log(restaurants);
  } catch (error) {
    console.error(error);
  }
};

export const sortRestaurants = (lat1, lon1) => {
  restaurants.forEach(function (restaurant) {
    let restaurantLat = restaurant.location.coordinates[1];
    let restaurantLon = restaurant.location.coordinates[0];
    let distance = calcDistances(lat1, lon1, restaurantLat, restaurantLon);
    restaurant["distance"] = distance;

    console.log("etäisyys: ", restaurant.distance);
  });

  restaurants.sort((a, b) => a.distance - b.distance);
};

const calcDistances = (lat1, lon1, lat2, lon2) => {
  var R = 6371; // km
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
};

const toRad = (Value) => {
  return (Value * Math.PI) / 180;
};

export const SetTextClosestRestaurant = () => {
  if (restaurants.length === 0) {
    console.log("No restaurants available.");
    return null;
  }

  let closestRestaurant = restaurants[0];
  closestRestaurantText.innerHTML = closestRestaurant.name;
};
