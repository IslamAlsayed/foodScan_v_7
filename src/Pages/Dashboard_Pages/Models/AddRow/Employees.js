import "../Models.css";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { HiXMark } from "react-icons/hi2";
import Swal from "sweetalert2";
import { addData } from "../../../../axiosConfig/API";

function Employees() {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    status: 1,
    role: "employee",
    identity_card: "",
  });

  const handleChange = (e) => {
    const { name, value, id } = e.target;
    if (name === "status") {
      setEmployee((prevEmployee) => ({
        ...prevEmployee,
        status: id === "active" ? 1 : 0,
      }));
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("phone", employee.phone);
    formData.append("password", employee.password);
    formData.append("password_confirmation", employee.password_confirmation);
    formData.append("Role", employee.role);
    formData.append("status", employee.status);
    formData.append("identity_card", employee.identity_card);

    try {
      const response = await addData("admin/employees", formData);

      if (response.status === "success") {
        setEmployee({
          name: "",
          email: "",
          phone: "",
          password: "",
          password_confirmation: "",
          status: 1,
          role: "",
          identity_card: "",
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
  };

  const closeModel = () => {
    setEmployee({
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      status: 1,
      role: "",
      identity_card: "",
    });

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
                    value={employee.name}
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
                    value={employee.email}
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
                    value={employee.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="Identity_card" className="form-label">
                    Identity card <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="identity_card"
                    id="Identity_card"
                    value={employee.identity_card}
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
                    value={employee.password}
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
                    id="password_confirm"
                    value={employee.password_confirmation}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="role">Role</label>
                  <select
                    className="form-control"
                    name="role"
                    id="role"
                    onChange={handleChange}
                    value={employee.role}
                    required
                  >
                    <option value={-1} disabled>
                      choose
                    </option>
                    <option value="chef">Chef</option>
                    <option value="cashier">Cashier</option>
                  </select>
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
                        checked={employee.status === 1}
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
                        checked={employee.status === 0}
                        onChange={handleChange}
                      />
                      <label htmlFor="inactive">inactive</label>
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

export default Employees;
