import axios from "axios";
import Cookies from "js-cookie";

const basicURL = "http://127.0.0.1:8000/api/";
// const AdminToken = JSON.parse(Cookies.get("token_foodScan")) || null;
const AdminToken = Cookies.get("token_foodScan") || null;

// const retryRequest = async (fn, times, delay) => {
//   for (let i = 0; i < times; i++) {
//     try {
//       return await fn();
//     } catch (error) {
//       if (i === times - 1) throw error;
//       await new Promise((resolve) => setTimeout(resolve, delay));
//     }
//   }
// };

// export const getData = async (url, handleResponse) => {
//   const request = async () => {
//     const response = await axios.get(basicURL + url, {
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${AdminToken}`,
//       },
//     });
//     return handleResponse(response.data);
//   };

//   try {
//     return await retryRequest(request, 3, 7000);
//   } catch (error) {
//     console.log("error", error);
//     if (error.response) {
//       console.error("Error response:", error.response.data.error);
//     } else {
//       console.error("Error occurred:", error.message);
//     }
//     throw error;
//   }
// };

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

// export const getData = async (url, handleResponse) => {
//   try {
//     const response = await axios.get(basicURL + url, {
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${AdminToken}`,
//       },
//     });
//     return handleResponse(response.data);
//   } catch (error) {
//     if (error.response) {
//       console.error("Error response:", error.response.data);
//     } else {
//       console.error("Error occurred:", error.message);
//     }
//     throw error;
//   }
// };

// export const getData = async (url, handleResponse) => {
//   try {
//     const response = await axios.get(basicURL + url, {
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${AdminToken}`,
//       },
//     });
//     return handleResponse(response.data);
//   } catch (error) {
//     console.error(error.response?.data?.error || "Error occurred");
//     throw error;
//   }
// };

export const addData = async (url, data, handleResponse) => {
  try {
    const response = await axios.post(basicURL + url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${AdminToken}`,
      },
    });
    return handleResponse(response.data);
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
    } else {
      console.error("Error occurred:", error.message);
    }
    throw error;
  }
};

// export const deleteData = async (url, id, handleResponse) => {
//   try {
//     const response = await axios.delete(`${url}/${id}`);
//     return handleResponse(response.data);
//   } catch (error) {
//     console.error("Error deleting data: ", error);
//     throw error;
//   }
// };

export const deleteData = async (url, handleResponse) => {
  try {
    const response = await axios.delete(basicURL + url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${AdminToken}`,
      },
    });
    return handleResponse(response.data);
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
    } else {
      console.error("Error occurred:", error.message);
    }
    throw error;
  }
};

// export const updateData = async (url, id, data, handleResponse) => {
//   try {
//     const response = await axios.put(`${url}/${id}`, data);
//     return handleResponse(response.data);
//   } catch (error) {
//     console.error("Error updating data: ", error);
//     throw error;
//   }
// };

// export const updateData = async (url, data, handleResponse) => {
//   try {
//     const response = await axios.put(basicURL + url, data, {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${AdminToken}`,
//       },
//     });
//     return handleResponse(response.data);
//   } catch (error) {
//     console.error(error.response?.data?.error || "Error occurred");
//     throw error;
//   }
// };

export const updateData = async (url, data, method, handleResponse) => {
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
    return handleResponse(response.data);
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
    } else {
      console.error("Error occurred:", error.message);
    }
    throw error;
  }
};
