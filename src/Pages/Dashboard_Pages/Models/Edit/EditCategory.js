import "../Models.css";
import { FaXmark } from "react-icons/fa6";
import React, { useState, useEffect, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import instance from "../../../../axiosConfig/instance";
import Swal from "sweetalert2";
import axios from "axios";

export default function EditCategories({ visible, item, modalClose }) {
  const imageRef = useRef(null);
  const [staticModalVisible, setStaticModalVisible] = useState(false);

  const [category, setCategory] = useState({
    name: "",
    description: "",
    image_file: null,
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    image: "",
    status: "",
  });

  useEffect(() => {
    setStaticModalVisible(visible);
    if (item) setCategory(item);
  }, [item]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setCategory((prevMeal) => ({
      ...prevMeal,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("description", category.description);
    if (category.image_file) formData.append("image_file", category.image_file);
    formData.append("_method", "PUT");

    const AdminToken = JSON.parse(localStorage.getItem("AdminToken")) || null;

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/categories/${item.id}`,
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${AdminToken}`,
          },
        }
      );

      if (response.data.status === "Ok") {
        modalClose();
        Swal.fire("Updated!", "The category has been updated.", "success");
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

  if (!category) {
    return <div>Loading...</div>;
  }

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
                    value={category.name}
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
                  <label htmlFor="description" className="form-label">
                    Description <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    id="description"
                    value={category.description}
                    onChange={handleChange}
                    required
                  />
                  {errors.description && (
                    <div className="text-danger">{errors.description}</div>
                  )}
                </div>
              </div>

              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="image_file" className="form-label">
                    Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="image_file"
                    id="image_file"
                    ref={imageRef}
                    onChange={handleChange}
                  />
                  {errors.image_file && (
                    <div className="text-danger">{errors.image_file}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col d-flex gap-3">
                <button type="submit" className="btn btn-primary">
                  <FaCheckCircle />
                  <span className="ps-2">Save</span>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => modalClose()}
                >
                  <HiXMark />
                  <span className="ps-2">Close</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
