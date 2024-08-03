import "../Models.css";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import Swal from "sweetalert2";
import axios from "axios";

export default function EditCustomer({ visible, item, modalClose }) {
  const [staticModalVisible, setStaticModalVisible] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    discount_percentage: "",
    start_date: "",
    end_date: "",
    image: null,
    status: 1,
  });

  const [errors, setErrors] = useState({
    name: "",
    discount_percentage: "",
    start_date: "",
    end_date: "",
    image: "",
    status: "",
  });

  useEffect(() => {
    setStaticModalVisible(visible);
    if (item) setCustomer(item);
  }, [item]);

  const handleChange = (e) => {
    const { name, value, id } = e.target;
    if (name === "type") {
      setCustomer((prevData) => ({
        ...prevData,
        type: id === "veg" ? "vegetarian" : "non-vegetarian",
      }));
    } else if (name === "status") {
      setCustomer((prevData) => ({
        ...prevData,
        status: id === "active" ? 1 : 0,
      }));
    } else if (name === "image") {
      setCustomer({ ...customer, image: e.target.files[0] });
    } else {
      setCustomer({ ...customer, [name]: value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", customer.name);
    formData.append("discount_percentage", customer.discount_percentage);
    formData.append("start_date", customer.start_date);
    formData.append("end_date", customer.end_date);
    formData.append("status", customer.status);
    if (customer.image) formData.append("image", customer.image);
    formData.append("_method", "PUT");

    const AdminToken = JSON.parse(localStorage.getItem("AdminToken")) || null;

    try {
      const response = await axios.post(
        `http://localhost:8000/api/admin/customers/${item.id}`,
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
        Swal.fire("Updated!", "The customer has been updated.", "success");
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
                  <label htmlFor="role" className="form-label">
                    role <span className="star">*</span>
                  </label>
                  <select
                    name="role"
                    id="role"
                    value={customer.role}
                    onChange={handleChange}
                    required
                    className={
                      errors.role ? "form-control is-invalid" : "form-control"
                    }
                  >
                    <option value="chef" selected={customer.role === "chef"}>
                      Chef
                    </option>
                    <option
                      value="cashier"
                      selected={customer.role === "cashier"}
                    >
                      Cashier
                    </option>
                  </select>
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
                    password confirmation <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="password_confirmation"
                    id="password_confirmation"
                    value={customer.password_confirmation}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="active" className="form-label">
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
                      <label htmlFor="active">active</label>
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
