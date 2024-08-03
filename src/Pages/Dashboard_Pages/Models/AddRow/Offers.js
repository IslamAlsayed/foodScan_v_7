import "../Models.css";
import React, { useState, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { FaXmark } from "react-icons/fa6";
import Swal from "sweetalert2";
import { addData } from "../../../../axiosConfig/API";

export default function Offers() {
  const imageRef = useRef(null);
  const [offer, setOffer] = useState({
    name: "",
    discount_percentage: "",
    start_date: "",
    end_date: "",
    image: null,
    status: 1,
  });

  const handleChange = (e) => {
    const { name, value, type, files, id } = e.target;
    if (type === "file") {
      setOffer((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else if (type === "radio") {
      setOffer((prevData) => ({
        ...prevData,
        [name]: id === "active" ? "active" : "inactive",
      }));
    } else {
      setOffer((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", offer.name);
    formData.append("discount_percentage", offer.discount_percentage);
    formData.append("start_date", offer.start_date);
    formData.append("end_date", offer.end_date);
    if (offer.image) formData.append("image", offer.image);
    formData.append("status", offer.status);

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
          const response = await addData("admin/offers", formData);

          if (response.status === "success") {
            setOffer({
              name: "",
              discount_percentage: "",
              start_date: "",
              end_date: "",
              image_file: null,
              status: 1,
            });

            if (imageRef.current) imageRef.current.value = null;

            Swal.fire("Saved!", response.data.message, "success");
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
            <FaXmark onClick={closeModel} />
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
                    value={offer.name}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="discount_percentage" className="form-label">
                    discount percentage <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="discount_percentage"
                    id="discount_percentage"
                    onChange={(e) => handleChange(e)}
                    value={offer.name}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="start_date" className="form-label">
                    start date <span className="star">*</span>
                  </label>
                  <input
                    type="data"
                    className="form-control"
                    name="start_date"
                    id="start_date"
                    onChange={(e) => handleChange(e)}
                    value={offer.name}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="end_date" className="form-label">
                    end date <span className="star">*</span>
                  </label>
                  <input
                    type="data"
                    className="form-control"
                    name="end_date"
                    id="end_date"
                    onChange={(e) => handleChange(e)}
                    value={offer.name}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    image (548px,140px) <span className="star">*</span>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    id="image"
                    onChange={(e) => handleChange(e)}
                    value={offer.name}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    status
                  </label>
                  <div className="row">
                    <div className="col d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="status"
                        id="active"
                        required
                        value={1}
                        checked={offer.status === 1}
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
                        checked={offer.status === 0}
                        onChange={handleChange}
                      />
                      <label htmlFor="inactive">in active</label>
                    </div>
                  </div>
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
