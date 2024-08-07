import "../Models.css";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import Swal from "sweetalert2";
import { updateData } from "../../../../axiosConfig/API";

export default function EditDiningTable({
  visible,
  visibleToggle,
  item,
  updated,
}) {
  const [staticVisible, setStaticVisible] = useState();
  const [diningTable, setDiningTable] = useState({
    num: "",
    size: "",
    floor: "",
    status: "",
  });

  useEffect(() => {
    if (item) setDiningTable(item);
  }, [item]);

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
    formData.append("num", diningTable.num);
    formData.append("size", diningTable.size);
    formData.append("floor", diningTable.floor);
    formData.append("status", diningTable.status);

    try {
      const response = await updateData(
        `admin/dining-tables/${item.id}`,
        formData,
        false,
        "put"
      );

      console.log("diningTable", response);

      if (response.status === "success") {
        updated();
        Swal.fire("Updated!", response.message, "success");
      }
    } catch (error) {
      Swal.fire("Error!", error.response.data.message, "error");
    }
  };

  return (
    <div id="AddTable" className={staticVisible ? "visible" : ""}>
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
                    number
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
                    size
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
                    floor
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
                    status
                  </label>
                  <div className="row">
                    <div className="col d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="status"
                        id="active"
                        value={1}
                        checked={diningTable.status === 1}
                        onChange={handleChange}
                        required
                      />
                      <span>active</span>
                    </div>
                    <div className="col d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="status"
                        id="inactive"
                        value={0}
                        checked={diningTable.status === 0}
                        onChange={handleChange}
                        required
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
