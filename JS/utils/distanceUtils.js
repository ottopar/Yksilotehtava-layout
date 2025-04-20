export const toRadians = (degrees) => (degrees * Math.PI) / 180;

export const calcDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in km

  const radLat1 = toRadians(lat1);
  const radLat2 = toRadians(lat2);
  const deltaLat = toRadians(lat2 - lat1);
  const deltaLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(deltaLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Etäisyys km
};
