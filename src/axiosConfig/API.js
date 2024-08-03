import axios from "axios";
import Cookies from "js-cookie";

const basicURL = "http://127.0.0.1:8000/api/";
const AdminToken = Cookies.get("token_foodScan") || null;

const retryRequest = async (requestFunction, retries, delay) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await requestFunction();
    } catch (error) {
      if (i < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
};

export const getData = async (url) => {
  const request = async () => {
    const response = await axios.get(basicURL + url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${AdminToken}`,
      },
    });
    return response.data.data;
  };

  try {
    return await retryRequest(request, 3, 7000);
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
        Authorization: `Bearer ${AdminToken}`,
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
        Authorization: `Bearer ${AdminToken}`,
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
        Authorization: `Bearer ${AdminToken}`,
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
