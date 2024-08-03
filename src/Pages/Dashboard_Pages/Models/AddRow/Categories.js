import "../Models.css";
import React, { useState, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import Swal from "sweetalert2";
import { addData } from "../../../../axiosConfig/API";

function Categories() {
  const imageRef = useRef(null);
  const [category, setCategory] = useState({
    name: "",
    description: "",
    image_file: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("description", category.description);
    if (category.image_file) formData.append("image_file", category.image_file);

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
          const response = await addData("categories", formData);

          if (response.status === "Created") {
            setCategory({
              name: "",
              description: "",
              image_file: null,
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
                  onClick={closeModel}
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

export default Categories;
