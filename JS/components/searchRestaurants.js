export const setupRestaurantSearch = (formEl, restaurants, renderCallback) => {
  if (
    !formEl ||
    !Array.isArray(restaurants) ||
    typeof renderCallback !== "function"
  ) {
    console.warn("setupRestaurantSearch: invalid arguments");
    return;
  }

  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = formEl.querySelector("input");
    const query = input?.value.trim().toLowerCase();

    if (!query) {
      renderCallback(restaurants); // Jos tyhjä, näytä kaikki
      return;
    }

    const filtered = restaurants.filter((r) =>
      r.name.toLowerCase().includes(query)
    );

    renderCallback(filtered);
  });
};
