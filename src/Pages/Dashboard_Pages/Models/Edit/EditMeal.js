import "../Models.css";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import Swal from "sweetalert2";
import { getData, updateData } from "../../../../axiosConfig/API";

export default function EditMeal({ visible, item, modalClose }) {
  const imageRef = useRef(null);
  const [staticModalVisible, setStaticModalVisible] = useState(false);
  const [mealCategories, setMealCategories] = useState(false);
  const [meal, setMeal] = useState({
    name: "",
    description: "",
    type: "vegetarian",
    category_id: -1,
    image: null,
    status: 1,
    price: "",
    size: "",
    number: 1,
  });

  const fetchCategories = useCallback(async () => {
    try {
      const result = await getData("categories");
      setMealCategories(result);
    } catch (error) {
      console.warn(error.response.data.error);
    }
  }, []);

  useEffect(() => {
    setStaticModalVisible(visible);
    if (item) {
      fetchCategories(item.categories);
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value, id, type, files } = e.target;

    setMeal((prevData) => {
      if (name === "type") {
        return {
          ...prevData,
          type: id === "veg" ? "vegetarian" : "non-vegetarian",
        };
      }
      if (name === "status") {
        return {
          ...prevData,
          status: id === "active" ? 1 : 0,
        };
      }
      if (name === "image" && type === "file") {
        return {
          ...prevData,
          image: files[0],
        };
      }
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", meal.name);
    formData.append("description", meal.description);
    formData.append("type", meal.type);
    formData.append("category_id", meal.category_id);
    formData.append("status", meal.status);
    if (meal.image) formData.append("image", meal.image);
    formData.append("meal_size_costs[0][size]", 1);
    formData.append("meal_size_costs[0][cost]", 120);
    formData.append("meal_size_costs[1][size]", 2);
    formData.append("meal_size_costs[1][cost]", 150);
    formData.append("meal_size_costs[3][size]", 3);
    formData.append("meal_size_costs[3][number_of_pieces]", 4);
    formData.append("meal_size_costs[3][cost]", 80);
    formData.append("price", meal.price);
    formData.append("number", meal.number);

    try {
      const response = await updateData(
        `admin/meals/${item.id}`,
        formData,
        "put"
      );

      if (response.status === "success") {
        setMeal({
          name: "",
          description: "",
          type: "vegetarian",
          category_id: -1,
          image: null,
          status: 1,
          price: "",
          size: "",
          number: 1,
        });

        modalClose();

        if (imageRef.current) imageRef.current.value = null;

        Swal.fire("Updated!", response.message, "success");
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        Swal.fire("Error!", "Validation error occurred.", "error");
      } else {
        Swal.fire("Error!", error.response.data.error, "error");
      }
    }
  };

  return (
    <div id="AddTable" className={staticModalVisible ? "visible" : ""}>
      <div className="modal-container">
        <div className="breadcrumb">
          <h3>{window.location.pathname.replace("/admin/dashboard/", "")}</h3>

          <div className="closeSidebar">
            <HiXMark onClick={() => modalClose()} />
          </div>
        </div>

        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    name <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    onChange={(e) => handleChange(e)}
                    value={meal.name}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    category <span className="star">*</span>
                  </label>

                  <select
                    className="form-control"
                    name="category_id"
                    id="category"
                    required
                    onChange={handleChange}
                  >
                    <option
                      value={-1}
                      disabled
                      selected={meal.category_id === -1}
                    >
                      choose
                    </option>
                    {mealCategories &&
                      mealCategories.map((category) => (
                        <option
                          key={category.id}
                          value={category.id}
                          selected={category.id === meal.category_id}
                        >
                          {category.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    price <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="price"
                    id="price"
                    onChange={(e) => handleChange(e)}
                    value={meal.price}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="number" className="form-label">
                    number of pieces <span className="star">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="number"
                    id="number"
                    onChange={(e) => handleChange(e)}
                    value={meal.number}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="vegetarian" className="form-label">
                    type <span className="star">*</span>
                  </label>
                  <div className="row">
                    <div className="col col-4 d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="type"
                        id="vegetarian"
                        required
                        checked={meal.type === "vegetarian"}
                        value="vegetarian"
                        onChange={handleChange}
                      />
                      <label htmlFor="vegetarian">vegetarian</label>
                    </div>
                    <div className="col col-4 d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="type"
                        id="non-vegetarian"
                        required
                        checked={meal.type === "non-vegetarian"}
                        value="non-vegetarian"
                        onChange={handleChange}
                      />
                      <label htmlFor="non-vegetarian">non vegetarian</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="active" className="form-label">
                    status <span className="star">*</span>
                  </label>
                  <div className="row">
                    <div className="col d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="status"
                        id="active"
                        required
                        value={1}
                        checked={meal.status === 1}
                        onChange={handleChange}
                      />
                      <label htmlFor="active">active</label>
                    </div>
                    <div className="col d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="status"
                        id="inactive"
                        required
                        value={0}
                        checked={meal.status === 0}
                        onChange={handleChange}
                      />
                      <label htmlFor="inactive">in active</label>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="active" className="form-label">
                    status <span className="star">*</span>
                  </label>
                  <div className="row">
                    <div className="col d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="status"
                        id="active"
                        required
                        checked={meal.status === "1"}
                        value="1"
                        onChange={handleChange}
                      />
                      <label htmlFor="active">active</label>
                    </div>
                    <div className="col d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="status"
                        id="inactive"
                        required
                        checked={meal.status === "0"}
                        value="0"
                        onChange={handleChange}
                      />
                      <label htmlFor="inactive">in active</label>
                    </div>
                  </div>
                </div>
              </div> */}

              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    id="image"
                    required
                    ref={imageRef}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>

              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    description
                  </label>
                  <textarea
                    className="form-control"
                    name="description"
                    id="description"
                    onChange={(e) => handleChange(e)}
                    value={meal.description}
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col d-flex gap-3">
                <button type="submit" className="btn btn-primary">
                  <FaCheckCircle />
                  <span className="ps-2">save</span>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => modalClose()}
                >
                  <HiXMark />
                  <span className="ps-2">close</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
