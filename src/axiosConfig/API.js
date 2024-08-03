import axios from "axios";
import Cookies from "js-cookie";

const basicURL = "http://127.0.0.1:8000/api/";

// const retryRequest = async (requestFunction, retries, delay) => {
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await requestFunction();
//     } catch (error) {
//       if (i < retries - 1) {
//         await new Promise((resolve) => setTimeout(resolve, delay));
//       } else {
//         throw error;
//       }
//     }
//   }
// };

// export const getData = async (url) => {
//   const request = async () => {
//     const response = await axios.get(basicURL + url, {
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${Cookies.get("token_foodScan") || null}`,
//       },
//     });
//     return response.data.data;
//   };

//   try {
//     return await retryRequest(request, 3, 7000);
//   } catch (error) {
//     if (error.response) {
//       console.error("Error response:", error.response.data);
//     } else {
//       console.error("Error occurred:", error.message);
//     }
//     throw error;
//   }
// };

// axiosRetry(axios, {
//   retries: 3,
//   retryCondition: (error) => {
//     return error.response.status === 429;
//   },
//   retryDelay: (retryCount) => {
//     console.log("try again");
//     return retryCount * 3000;
//   },
// });

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

/*
const handleDelete = async (id) => {
    Swal.fire({
      title: "Delete meal",
      text: "Are you sure you want to delete this meal?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes, delete meal",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteData(`admin/meals/${id}`);

          if (response) {
            Swal.fire("Meal!", response.message, "success");

            setMeals((prevData) => prevData.filter((meal) => meal.id !== id));
          }
        } catch (error) {
          console.warn(error.response.data.error);
          Swal.fire("Error!", error.response.data.error, "error");
        }
      }
    });
  };
 <Link
            to="#"
            className="trashIcon"
            data-tooltip="delete"
            onClick={() => handleDelete(item.id)}
            style={{ "--c": "#F15353", "--bg": "#FECACA" }}
          >
            <BiTrash />
          </Link>
 */
