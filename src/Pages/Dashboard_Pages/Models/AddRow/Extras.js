import "../Models.css";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import Swal from "sweetalert2";
import { getData, addData } from "../../../../axiosConfig/API";

export default function Extras() {
  const imageRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [extra, setExtra] = useState({
    name: "",
    description: "",
    type: "vegetarian",
    category_id: -1,
    image: null,
    status: 1,
    cost: "",
  });

  const fetchCategories = useCallback(async () => {
    try {
      const result = await getData("categories");
      setCategories(result);
    } catch (error) {
      console.warn(error.response.data.error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save the changes?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await addData("admin/extras", formData);

          if (response.status === "success") {
            setExtra({
              name: "",
              description: "",
              type: "vegetarian",
              category_id: -1,
              image: null,
              status: 1,
              cost: "",
            });

            if (imageRef.current) imageRef.current.value = null;

            Swal.fire("Saved!", response.message, "success");
          }
        } catch (error) {
          if (error.response && error.response.status === 422) {
            Swal.fire("Error!", "Validation error occurred.", "error");
          } else {
            Swal.fire("Error!", error.response.data.error, "error");
          }
        }
      }
    });
  };

  const closeModel = () => {
    var AddTable = document.getElementById("AddTable");
    if (AddTable) AddTable.classList.remove("visible");
  };

  return (
    <div id="AddTable">
      <div className="modal-container">
        <div className="breadcrumb">
          <h3>{window.location.pathname.replace("/admin/dashboard/", "")}</h3>
          <div className="closeSidebar">
            <HiXMark onClick={closeModel} />
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
                    value={extra.name}
                    onChange={handleChange}
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
                    onChange={handleChange}
                    value={extra.category_id}
                    required
                  >
                    <option value={-1} disabled>
                      choose
                    </option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    price <span className="star">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="cost"
                    id="cost"
                    value={extra.cost}
                    onChange={handleChange}
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
                        checked={extra.type === "vegetarian"}
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
                        checked={extra.type === "non-vegetarian"}
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
                  <label htmlFor="status" className="form-label">
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
                        checked={extra.status === 1}
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
                    image <span className="star">*</span>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    id="image"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    description <span className="star">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    name="description"
                    id="description"
                    onChange={(e) => handleChange(e)}
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
                  onClick={closeModel}
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
