import "../Models.css";
import React, { useEffect, useState, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import Swal from "sweetalert2";
import { updateData } from "../../../../axiosConfig/API";

export default function EditCategories({ visible, item, updated }) {
  const imageRef = useRef(null);
  const [staticVisible, setStaticVisible] = useState([]);
  const [category, setCategory] = useState({
    name: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    if (item) {
      const { image, ...rest } = item;
      setCategory({ ...rest, image: null });
    }
  }, [item]);

  useEffect(() => {
    setStaticVisible(visible);
  }, [visible]);

  const closeModal = () => {
    setStaticVisible(false);
    document.body.style.overflow = "visible";
  };

  const handleChange = (e) => {
    const { name, value, id, type, files } = e.target;
    setCategory((prevData) => {
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
    formData.append("name", category.name);
    formData.append("description", category.description);
    if (category.image) formData.append("image", category.image);
    formData.append("_method", "put");

    try {
      const response = await updateData(
        `categories/${item.id}`,
        formData,
        true
      );

      if (response.status === "success") {
        updated();
        if (imageRef.current) imageRef.current.value = null;
        Swal.fire("Updated!", response.message, "success");
      }
    } catch (error) {
      Swal.fire("Error!", error.response?.data?.message, "error");
    }
  };

  return (
    <div
      id="AddTable"
      className={`Categories ${staticVisible ? "visible" : ""}`}
    >
      <div className="modal-container">
        <div className="breadcrumb">
          <h3>
            edit {window.location.pathname.replace("/admin/dashboard/", "")}
          </h3>

          <div className="closeSidebar">
            <HiXMark onClick={closeModal} />
          </div>
        </div>

        <div className="modal-content">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    value={category.name}
                    onChange={handleChange}
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
                    className="form-control"
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
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    name="description"
                    id="description"
                    value={category.description}
                    onChange={handleChange}
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
