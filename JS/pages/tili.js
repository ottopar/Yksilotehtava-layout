import {
  initLogoutButton,
  initUserProfile,
  initDeleteAccountButton,
} from "../components/userInfo.js";

const initUserPage = () => {
  try {
    initUserProfile();
    initLogoutButton();
    initDeleteAccountButton();
  } catch (error) {
    console.error("Failed to load user info:", error);
  }
};

initUserPage();
