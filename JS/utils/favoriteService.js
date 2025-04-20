const FAVORITES_KEY = "favoriteRestaurants";

export const getFavorites = () => {
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
};

export const addFavorite = (restaurantId) => {
  const favorites = getFavorites();
  if (!favorites.includes(restaurantId)) {
    favorites.push(restaurantId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
};

export const removeFavorite = (restaurantId) => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter((id) => id !== restaurantId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
};

export const isFavorite = (restaurantId) =>
  getFavorites().includes(restaurantId);
