export const createMenuModal = (restaurant, menuHtml) => {
  const modal = `
    <div class="menu-modal-content">
      <h2>${restaurant.name}</h2>
      <div class="menu-modal-info">
        <p>${restaurant.address}</p>
        <p>${restaurant.city}</p>
      </div>
      <div class="menu-alert">Ei ruokalistaa tälle päivälle</div>
      ${menuHtml}
      <button class="close-menu-modal">×</button>
    </div>
  `;

  setTimeout(() => {
    const today = new Date();
    const currentDay = today.getDay() - 1;

    const tabButtons = document.querySelectorAll(".menu-tab-button");
    const dayContents = document.querySelectorAll(".menu-day-content");
    const alertElement = document.querySelector(".menu-alert");

    const showAlert = () => {
      alertElement.classList.add("show");
      setTimeout(() => {
        alertElement.classList.remove("show");
      }, 3000);
    };

    // Aktiivinen tabi oikealle päivällää
    const currentTab = tabButtons[currentDay] || (tabButtons[0] && showAlert());
    const currentContent = dayContents[currentDay] || dayContents[0];

    currentTab?.classList.add("active");
    currentContent?.classList.add("active");

    // tab click handlerit
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const dayIndex = button.dataset.day;
        tabButtons.forEach((btn) => btn.classList.remove("active"));
        dayContents.forEach((content) => content.classList.remove("active"));
        button.classList.add("active");
        document
          .querySelector(`.menu-day-content[data-day="${dayIndex}"]`)
          ?.classList.add("active");
      });
    });
  }, 0);

  return modal;
};
