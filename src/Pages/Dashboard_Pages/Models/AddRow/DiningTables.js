import "../Models.css";
import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import Swal from "sweetalert2";
import { addData } from "../../../../axiosConfig/API";

function DiningTables({ visible, visibleToggle, updated }) {
  const [staticVisible, setStaticVisible] = useState([]);
  const [diningTable, setDiningTable] = useState({
    floor: "",
    size: "",
    num: "",
    status: 1,
  });

  useEffect(() => {
    setStaticVisible(visible);
  }, [visible]);

  const handleChange = (e) => {
    const { name, value, id } = e.target;

    setDiningTable((prevDiningTable) => ({
      ...prevDiningTable,
      [name]: name === "status" ? (id === "active" ? 1 : 0) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("size", diningTable.size);
    formData.append("num", diningTable.num);
    formData.append("floor", diningTable.floor);
    formData.append("status", diningTable.status);

    try {
      const response = await addData("admin/dining-tables", formData);

      if (response.status === "success") {
        updated();
        setDiningTable({
          floor: "",
          size: "",
          num: "",
          status: 1,
        });

        Swal.fire("Saved!", response.message, "success");
      }
    } catch (error) {
      Swal.fire("Error!", error.response.data.message, "error");
    }
  };

  return (
    <div id="AddTable" className={`${staticVisible ? "visible" : ""}`}>
      <div className="modal-container">
        <div className="breadcrumb">
          <span>
            {window.location.pathname.replace("/admin/dashboard/", "")}
          </span>
          <div className="closeSidebar">
            <HiXMark onClick={visibleToggle} />
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
                    onChange={handleChange}
                    required
                  />
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
                  onClick={visibleToggle}
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

export default DiningTables;
