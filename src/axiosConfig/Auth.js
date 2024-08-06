import axios from "axios";
import Cookies from "js-cookie";

const basicURL = "http://127.0.0.1:8000/api/";

export const login = async (email, password) => {
  try {
    const response = await axios.post(basicURL + "admin/login", {
      email: email,
      password: password,
    });

    // Setting cookies
    Cookies.set("token_foodScan", response.data.access_token);
    Cookies.set("admin_foodScan", JSON.stringify(response.data.customer));

    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    throw new Error("An error occurred");
  }
};

export const logout = () => {
  return new Promise((resolve) => {
    Cookies.remove("token_foodScan");
    Cookies.remove("admin_foodScan");
    resolve({ message: "Logged out successfully" });
  });
};

export const getUser = () => {
  const user = Cookies.get("admin_foodScan");
  return user ? JSON.parse(user) : null;
};

export const isAuth = () => {
  return !!Cookies.get("token_foodScan");
};
