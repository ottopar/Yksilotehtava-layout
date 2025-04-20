export const setupCityFilter = (formEl, restaurants, renderCallback) => {
  if (
    !formEl ||
    !Array.isArray(restaurants) ||
    typeof renderCallback !== "function"
  ) {
    console.warn("setupCityFilter: invalid arguments");
    return;
  }

  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = formEl.querySelector("input");
    const query = input?.value.trim().toLowerCase();

    if (!query) {
      renderCallback(restaurants); // Kaikki näytetään tyhjällä haulla
      return;
    }

    const filtered = restaurants.filter((r) =>
      r.city?.toLowerCase().includes(query)
    );

    renderCallback(filtered);
  });
};
