export const createMenuModal = (restaurant, menuHtml) => {
  const modal = `
    <div class="menu-modal-content">
      <h2>${restaurant.name}</h2>
      <div class="menu-modal-info">
        <p>${restaurant.address}</p>
        <p>${restaurant.city}</p>
      </div>
      ${menuHtml}
      <button class="close-menu-modal">×</button>
    </div>
  `;

  // Add event listeners for tabs after modal is added to DOM
  setTimeout(() => {
    const tabButtons = document.querySelectorAll(".menu-tab-button");
    const dayContents = document.querySelectorAll(".menu-day-content");

    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const dayIndex = button.dataset.day;

        // Remove active class from all buttons and contents
        tabButtons.forEach((btn) => btn.classList.remove("active"));
        dayContents.forEach((content) => content.classList.remove("active"));

        // Add active class to clicked button and corresponding content
        button.classList.add("active");
        document
          .querySelector(`.menu-day-content[data-day="${dayIndex}"]`)
          .classList.add("active");
      });
    });
  }, 0);

  return modal;
};
