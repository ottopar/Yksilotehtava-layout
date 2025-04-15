export const toRadians = (degrees) => (degrees * Math.PI) / 180;

export const calcDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in km

  const radian1 = toRadians(lat1);
  const radian2 = toRadians(lat2);
  const delta3 = toRadians(lat2 - lat1);
  const delta4 = toRadians(lon2 - lon1);

  const a =
    Math.sin(delta3 / 2) ** 2 +
    Math.cos(radian1) * Math.cos(radian2) * Math.sin(delta4 / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};
