// Funktio datan fetchaamisella, jälleenkäytettävä

export const fetchData = async (url, options = {}) => {
  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(
      json.message
        ? `${json.message}, koodi:${response.status}`
        : `Error ${response.status}`
    );
  }
  return json;
};
