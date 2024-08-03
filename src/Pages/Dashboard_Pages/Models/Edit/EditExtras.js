import "../Models.css";
import React, { useEffect, useState, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import instance from "../../../../axiosConfig/instance";
import Swal from "sweetalert2";
import axios from "axios";

function EditExtra({ visible, item, modalClose }) {
  const imageRef = useRef(null);
  const [staticModalVisible, setStaticModalVisible] = useState(false);
  const [mealCategories, setMealCategories] = useState(false);

  const [extra, setExtra] = useState({
    name: "",
    description: "",
    type: "vegetarian",
    category_id: -1,
    image: null,
    status: 1,
    cost: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    type: "",
    category_id: "",
    image: "",
    status: "",
    cost: "",
  });

  useEffect(() => {
    setStaticModalVisible(visible);
    if (item) {
      setExtra(item);
      setMealCategories(item.categories);
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value, id } = e.target;
    if (name === "type") {
      setExtra((prevData) => ({
        ...prevData,
        type: id === "veg" ? "vegetarian" : "non-vegetarian",
      }));
    } else if (name === "status") {
      setExtra((prevData) => ({
        ...prevData,
        status: id === "active" ? 1 : 0,
      }));
    } else if (name === "image") {
      setExtra({ ...extra, image: e.target.files[0] });
    } else {
      setExtra({ ...extra, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", extra.name);
    formData.append("description", extra.description);
    formData.append("type", extra.type);
    formData.append("cost", extra.cost);
    formData.append("category_id", extra.category_id);
    formData.append("status", extra.status);
    if (extra.image) formData.append("image", extra.image);
    formData.append("_method", "PUT");

    const AdminToken = JSON.parse(localStorage.getItem("AdminToken")) || null;

    try {
      const response = await axios.post(
        `http://localhost:8000/api/admin/extras/${item.id}`,
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${AdminToken}`,
          },
        }
      );

      if (response.data.status === "success") {
        modalClose();
        Swal.fire("Updated!", "The extra has been updated.", "success");
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
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
                    Name <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    value={extra.name}
                    onChange={handleChange}
                    required
                  />
                  {errors.name && (
                    <div className="text-danger">{errors.name}</div>
                  )}
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="category_id" className="form-label">
                    Category <span className="star">*</span>
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
                      selected={extra.category_id === -1}
                    >
                      choose
                    </option>
                    {mealCategories &&
                      mealCategories.map((category) => (
                        <option
                          key={category.id}
                          value={category.id}
                          selected={category.id === extra.category_id}
                        >
                          {category.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="cost" className="form-label">
                    Price <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="cost"
                    id="cost"
                    value={extra.cost}
                    onChange={handleChange}
                    required
                  />
                  {errors.cost && (
                    <div className="text-danger">{errors.cost}</div>
                  )}
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label">
                    Type <span className="star">*</span>
                  </label>
                  <div className="row">
                    <div className="col col-4 d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="type"
                        id="vegetarian"
                        required
                        value="vegetarian"
                        checked={extra.type === "vegetarian"}
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
                        value="non-vegetarian"
                        checked={extra.type === "non-vegetarian"}
                        onChange={handleChange}
                      />
                      <label htmlFor="non-vegetarian">non vegetarian</label>
                    </div>
                  </div>
                  {errors.type && (
                    <div className="text-danger">{errors.type}</div>
                  )}
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label">
                    Status <span className="star">*</span>
                  </label>
                  <div className="row">
                    <div className="col col-4 d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="status"
                        id="active"
                        required
                        value={1}
                        checked={extra.status === 1}
                        onChange={handleChange}
                      />
                      <label htmlFor="active">active</label>
                    </div>
                    <div className="col col-4 d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="status"
                        id="inactive"
                        required
                        value={0}
                        checked={extra.status === 0}
                        onChange={handleChange}
                      />
                      <label htmlFor="inactive">inactive</label>
                    </div>
                  </div>
                </div>
              </div>

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
                    Description <span className="star">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    name="description"
                    id="description"
                    onChange={handleChange}
                    value={extra.description}
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

export default EditExtra;