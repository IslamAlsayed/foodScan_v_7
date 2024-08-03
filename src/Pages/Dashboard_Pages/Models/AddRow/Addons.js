import "../Models.css";
import React, { useEffect, useState, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import instance from "../../../../axiosConfig/instance";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../../../Store/action";
import axios from "axios";

export default function Addons() {
  const imageRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const updated = useSelector((state) => state.updated);
  const [addon, setAddon] = useState({
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

  const closeModel = () => {
    var AddTable = document.getElementById("AddTable");
    if (AddTable) AddTable.classList.remove("visible");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/categories"
        );
        console.log(response.data);
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, id } = e.target;
    if (name === "type") {
      setAddon((prevData) => ({
        ...prevData,
        type: id === "veg" ? "vegetarian" : "non-vegetarian",
      }));
    } else if (name === "status") {
      setAddon((prevData) => ({
        ...prevData,
        status: id === "active" ? 1 : 0,
      }));
    } else if (name === "image") {
      setAddon({ ...addon, image: e.target.files[0] });
    } else {
      setAddon({ ...addon, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", addon.name);
    formData.append("description", addon.description);
    formData.append("type", addon.type);
    formData.append("cost", addon.cost);
    formData.append("category_id", addon.category_id);
    formData.append("status", addon.status);
    if (addon.image) formData.append("image", addon.image);

    const AdminToken = JSON.parse(localStorage.getItem("AdminToken")) || null;

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
          const response = await axios.post(
            "http://127.0.0.1:8000/api/admin/addons",
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
            setAddon({
              name: "",
              description: "",
              type: "vegetarian",
              category_id: -1,
              image: null,
              status: 1,
              cost: "",
            });

            if (imageRef.current) imageRef.current.value = null;

            Swal.fire("Saved!", "The category has been Saved.", "success");
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
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
                    value={addon.name}
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
                  <label htmlFor="category" className="form-label">
                    category <span className="star">*</span>
                  </label>
                  <select
                    className="form-control"
                    name="category_id"
                    id="category"
                    onChange={handleChange}
                    value={addon.category_id}
                    required
                  >
                    <option
                      value={-1}
                      disabled
                      selected={addon.category_id === -1}
                    >
                      choose
                    </option>
                    {categories.map((category) => (
                      <option
                        key={category.id}
                        value={category.id}
                        selected={category.id === addon.category_id}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.category_id && (
                    <div className="text-danger">{errors.category_id}</div>
                  )}
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
                    value={addon.cost}
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
                        checked={addon.type === "vegetarian"}
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
                        checked={addon.type === "non-vegetarian"}
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
                        checked={addon.status === 1}
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
                        checked={addon.status === 0}
                        onChange={handleChange}
                      />
                      <label htmlFor="inactive">inactive</label>
                    </div>
                  </div>
                  {errors.status && (
                    <div className="text-danger">{errors.status}</div>
                  )}
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
                  {errors.image && (
                    <div className="text-danger">{errors.image}</div>
                  )}
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
                    value={addon.description}
                    required
                  ></textarea>
                  {errors.description && (
                    <div className="text-danger">{errors.description}</div>
                  )}
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
