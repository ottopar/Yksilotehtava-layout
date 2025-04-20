// login.js
import { initLoginForm } from "../components/loginForm.js";

const initLoginPage = () => {
  try {
    initLoginForm();
  } catch (error) {
    console.error("Login initialization failed:", error);
  }
};

initLoginPage();
