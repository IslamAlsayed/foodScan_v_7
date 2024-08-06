import "../Models.css";
import React, { useState, useRef, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import Swal from "sweetalert2";
import { addData } from "../../../../axiosConfig/API";

function Categories({ visible, updated }) {
  const imageRef = useRef(null);
  const [staticVisible, setStaticVisible] = useState([]);
  const [category, setCategory] = useState({
    name: "",
    description: "",
    image_file: null,
    status: 1,
  });

  useEffect(() => {
    setStaticVisible(visible);
  }, [visible]);

  const closeModal = () => {
    setStaticVisible(false);
    document.body.style.overflow = "visible";
  };

  const handleChange = (e) => {
    const { name, value, id, type, files } = e.target;

    if (name === "status") {
      setCategory((prevData) => ({
        ...prevData,
        status: id === "active" ? 1 : 0,
      }));
    }

    setCategory((prevDate) => ({
      ...prevDate,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("description", category.description);
    if (category.image_file) formData.append("image_file", category.image_file);
    formData.append("status", category.status);

    try {
      const response = await addData("categories", formData);

      if (response.status === "success") {
        updated();
        setCategory({
          name: "",
          description: "",
          image_file: null,
          status: 1,
        });

        if (imageRef.current) imageRef.current.value = null;

        Swal.fire("Saved!", response.message, "success");
      }
    } catch (error) {
      Swal.fire("Error!", error.response.data.message, "error");
    }
  };

  return (
    <div
      id="AddTable"
      className={`Categories ${staticVisible ? "visible" : ""}`}
    >
      <div className="modal-container">
        <div className="breadcrumb">
          <h3>{window.location.pathname.replace("/admin/dashboard/", "")}</h3>

          <div className="closeSidebar">
            <HiXMark onClick={closeModal} />
          </div>
        </div>

        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12">
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

              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Image
                  </label>
                  <input
                    type="file"
                    className="form-control email"
                    name="image"
                    id="image"
                    ref={imageRef}
                    onChange={handleChange}
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
                    value={category.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col d-flex gap-3">
                <button type="submit" className="btn btn-primary">
                  <FaCheckCircle />
                  <span className="ps-2">update</span>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
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
