import { initRegisterForm } from "../components/registerForm.js";

const initRegisterPage = () => {
  try {
    initRegisterForm();
  } catch (error) {
    console.error("Registration initialization failed:", error);
  }
};

initRegisterPage();
