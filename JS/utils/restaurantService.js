import { apiUrl } from "./variables.js";
import { fetchData } from "../api/fetchData.js";
import { calcDistance } from "./distanceUtils.js";

let restaurants = [];

export const fetchRestaurants = async () => {
  try {
    restaurants = await fetchData(`${apiUrl}/restaurants`);
    console.log(restaurants);
  } catch (error) {
    console.error(error);
  }
};

export const sortRestaurantsByDistance = (lat, lon) => {
  if (!restaurants.length) return;

  restaurants.forEach((restaurant) => {
    const [lon2, lat2] = restaurant.location.coordinates;
    const distance = calcDistance(lat, lon, lat2, lon2);
    restaurant.distance = distance;
  });

  restaurants.sort((a, b) => a.distance - b.distance);
};

export const getClosestRestaurant = () => {
  return restaurants.length ? restaurants[0] : null;
};

export const getRestaurants = () => {
  return restaurants;
};

export const getRestaurantById = (id) => {
  return restaurants.find((restaurant) => restaurant._id === id);
};
