import "../Models.css";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { HiXMark } from "react-icons/hi2";
import Swal from "sweetalert2";
import { addData } from "../../../../axiosConfig/API";

export default function Customers() {
  const [customer, setCustomers] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    status: 1,
    role: "customer",
  });

  const handleChange = (e) => {
    const { name, value, id } = e.target;

    if (name === "status") {
      setCustomers((prevAdmin) => ({
        ...prevAdmin,
        status: id === "active" ? 1 : 0,
      }));
    } else {
      setCustomers((prevAdmin) => ({
        ...prevAdmin,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", customer.name);
    formData.append("email", customer.email);
    formData.append("phone", customer.phone);
    formData.append("password", customer.password);
    formData.append("password_confirmation", customer.password_confirmation);
    formData.append("Role", customer.role);
    formData.append("status", customer.status);
    formData.append("identity_card", "172001");

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
          const response = await addData("admin/employees", formData);

          if (response.status === "success") {
            setCustomers({
              name: "",
              description: "",
              type: "vegetarian",
              category_id: -1,
              image: null,
              status: 1,
              cost: "",
            });

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
                    value={customer.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    email <span className="star">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control email"
                    name="email"
                    id="email"
                    value={customer.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    phone <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    id="phone"
                    value={customer.phone}
                    onChange={handleChange}
                    required
                  />
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
                        checked={customer.status === 1}
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
                        checked={customer.status === 0}
                        onChange={handleChange}
                      />
                      <span>in active</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    password <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="password"
                    id="password"
                    value={customer.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="password_confirmation" className="form-label">
                    password confirm<span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="password_confirmation"
                    id="password_confirm"
                    value={customer.password_confirm}
                    onChange={handleChange}
                    required
                  />
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
