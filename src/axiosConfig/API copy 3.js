import axios from "axios";
import Cookies from "js-cookie";
const basicURL = "http://127.0.0.1:8000/api/";

export const getData = async (url) => {
  try {
    const response = await axios.get(basicURL + url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Cookies.get("token_foodScan") || null}`,
      },
    });
    return response.data.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
    } else {
      console.error("Error occurred:", error.message);
    }
    throw error;
  }
};

export const addData = async (url, data) => {
  try {
    const response = await axios.post(basicURL + url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${Cookies.get("token_foodScan") || null}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
    } else {
      console.error("Error occurred:", error.message);
    }
    throw error;
  }
};

export const deleteData = async (url) => {
  try {
    const response = await axios.delete(basicURL + url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Cookies.get("token_foodScan") || null}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
    } else {
      console.error("Error occurred:", error.message);
    }
    throw error;
  }
};

export const updateData = async (url, data, method) => {
  try {
    const response = await axios({
      method: method,
      url: basicURL + url,
      data: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${Cookies.get("token_foodScan") || null}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
    } else {
      console.error("Error occurred:", error.message);
    }
    throw error;
  }
};
