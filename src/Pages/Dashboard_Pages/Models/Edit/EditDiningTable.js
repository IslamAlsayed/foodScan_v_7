import "../Models.css";
import { FaXmark } from "react-icons/fa6";
import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import instance from "../../../../axiosConfig/instance";
import Swal from "sweetalert2";

export default function EditDiningTable({ visible, item, modalClose }) {
  const [staticModalVisible, setStaticModalVisible] = useState(false);

  const [diningTable, setDiningTable] = useState({
    num: "",
    size: "",
    floor: "",
    status: "",
  });

  const [errors, setErrors] = useState({
    num: "",
    size: "",
    floor: "",
    status: "",
  });

  useEffect(() => {
    setStaticModalVisible(visible);
    if (item) setDiningTable(item);
  }, [item]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (name === "status") {
      setDiningTable((prevDiningTable) => ({
        ...prevDiningTable,
        status: value === "active" ? 1 : 0,
      }));
    } else {
      setDiningTable((prevDiningTable) => ({
        ...prevDiningTable,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let url = "/api/admin/extras";
    let method = "POST"; // Default to POST for new entries

    const formData = new FormData();
    formData.append("num", diningTable.num);
    formData.append("size", diningTable.size);
    formData.append("floor", diningTable.floor);
    formData.append("status", diningTable.status);

    if (item) {
      url = `/api/admin/dining-tables/${item.id}`;
      method = "POST";
      formData.append("_method", "PUT");
    }

    try {
      const response = await instance({
        url,
        method,
        data: formData,

        headers: {
          "Content-Type": "multipart/form-data",
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("AdminToken")), //the token is a variable which holds the token
        },
      });

      if (item) {
        Swal.fire("Updated!", "The extra has been updated.", "success");
      } else {
        Swal.fire("Saved!", "The extra has been saved.", "success");
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

  if (!diningTable) {
    return <div>Loading...</div>;
  }

  return (
    <div id="AddTable" className={staticModalVisible ? "visible" : ""}>
      <div className="modal-container">
        <div className="breadcrumb">
          <span>
            {window.location.pathname.replace("/admin/dashboard/", "")}
          </span>
          <div className="closeSidebar">
            <HiXMark onClick={() => modalClose()} />
          </div>
        </div>
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="number" className="form-label">
                    number <span className="star">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="num"
                    id="number"
                    value={diningTable.num}
                    onClick={() => modalClose()}
                    required
                  />
                  {errors.num && (
                    <div className="text-danger">{errors.num}</div>
                  )}
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="size" className="form-label">
                    size <span className="star">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="size"
                    id="size"
                    value={diningTable.size}
                    onChange={handleChange}
                    required
                  />
                  {errors.size && (
                    <div className="text-danger">{errors.size}</div>
                  )}
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="floor" className="form-label">
                    floor <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="floor"
                    id="floor"
                    onChange={handleChange}
                    value={diningTable.floor}
                    required
                  />
                  {errors.floor && (
                    <div className="text-danger">{errors.floor}</div>
                  )}
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
                        checked={diningTable.status === 1}
                        onChange={handleChange}
                      />
                      <span>active</span>
                    </div>
                    <div className="col d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="status"
                        id="inactive"
                        required
                        value={0}
                        checked={diningTable.status === 0}
                        onChange={handleChange}
                      />
                      <span>inactive</span>
                    </div>
                  </div>
                </div>
                {errors.status && (
                  <div className="text-danger">{errors.status}</div>
                )}
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
