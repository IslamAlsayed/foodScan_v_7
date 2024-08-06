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

export const addData = async (url, data, multipart = false) => {
  try {
    const response = await axios.post(basicURL + url, data, {
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

// export const updateData = async (url, data, method) => {
//   try {
//     const response = await axios({
//       method: method,
//       url: basicURL + url,
//       data: data,
//       headers: {
//         Accept: "application/json",
//         // "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${Cookies.get("token_foodScan") || null}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     if (error.response) {
//       console.error("Error response:", error.response.data);
//     } else {
//       console.error("Error occurred:", error.message);
//     }
//     throw error;
//   }
// };

// export const updateData = async (url, data, method) => {
//   try {
//     const formData = new FormData();
//     for (const key in data) {
//       formData.append(key, data[key]);
//     }

//     const response = await axios({
//       method: method,
//       url: basicURL + url,
//       data: formData,
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${Cookies.get("token_foodScan") || null}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     if (error.response) {
//       console.error("Error response:", error.response.data);
//     } else {
//       console.error("Error occurred:", error.message);
//     }
//     throw error;
//   }
// };

export const updateData = async (url, data, multipart = false, method) => {
  try {
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${Cookies.get("token_foodScan") || null}`,
    };

    // if (multipart === "multipart") {
    //   headers["Content-Type"] = "multipart/form-data";
    // } else {
    //   headers["Content-Type"] = "application/json";
    // }

    const response = await axios({
      method: method,
      url: basicURL + url,
      data: data,
      headers: headers,
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

// export const updateData = async (url, data) => {
//   try {
//     // const response = await axios.put(basicURL + url, data, {
//     const response = await axios.patch(basicURL + url, data, {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${Cookies.get("token_foodScan") || null}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error(error.response?.data?.error || "Error occurred");
//     throw error;
//   }
// };

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
          console.error(error.response.data.message);
          Swal.fire("Error!", error.response.data.message, "error");
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
