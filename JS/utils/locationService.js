const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const location = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        };
        console.log("Your current position is:");
        console.log(`Latitude : ${location.latitude}`);
        console.log(`Longitude: ${location.longitude}`);
        console.log(`More or less ${location.accuracy} meters.`);
        resolve(location);
      },
      (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        reject(err);
      },
      options
    );
  });
};
