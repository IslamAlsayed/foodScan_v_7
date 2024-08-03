import "./Profile.css";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Breadcrumb from "../../../../Componenets/Dashboard/Features/Breadcrumb";
import Swal from "sweetalert2";
import axios from "axios";

export function EditProfile() {
  const [admin, setAdmin] = useState(null);
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    Role: "",
  });
  const AdminToken = JSON.parse(localStorage.getItem("AdminToken")) || null;
  const adminData = JSON.parse(localStorage.getItem("AdminData")) || null;

  useEffect(() => {
    if (adminData) {
      setAdmin(adminData);
      setEmployee({
        name: adminData.name,
        email: adminData.email,
        Role: adminData.Role,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("Role", employee.Role);
    formData.append("_method", "PUT");

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/admin/employees/${admin.id}`,
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${AdminToken}`,
          },
        }
      );

      if (response.data.status === "success") {
        const updatedAdmin = { ...admin, ...employee };
        localStorage.setItem("AdminData", JSON.stringify(updatedAdmin));
        Swal.fire("Updated!", "The profile has been updated.", "success");
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        Swal.fire("Error!", "Validation error occurred.", "error");
      } else {
        Swal.fire("Error!", error.response.data.error, "error");
      }
    }
  };

  return (
    <div className="EditProfile">
      <Breadcrumb />
      <form onSubmit={handleSubmit} className="formModal bg-white">
        <div className="title">edit profile</div>

        <div className="row">
          <div className="col col-12 col-md-7">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                NAME <span className="star">*</span>
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

          <div className="col col-12 col-md-7">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                EMAIL <span className="star">*</span>
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

          <div className="col col-12 col-md-7">
            <div>
              <label htmlFor="Role" className="form-label">
                ROLE <span className="star">*</span>
              </label>

              <select
                className="form-control"
                name="Role"
                id="Role"
                required
                onChange={handleChange}
              >
                <option
                  value="chef"
                  disabled
                  selected={employee.Role === "chef"}
                >
                  chef
                </option>
                <option value="admin" selected={employee.Role === "admin"}>
                  admin
                </option>
                <option
                  value="casher"
                  disabled
                  selected={employee.Role === "casher"}
                >
                  casher
                </option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col d-flex gap-3">
            <button type="submit" className="btn btn-primary">
              <FaCheckCircle />
              <span className="ps-2">save</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
