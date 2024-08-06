import "../Models.css";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import Swal from "sweetalert2";
import { updateData } from "../../../../axiosConfig/API";

export default function EditDeliveryOrder({
  visible,
  visibleToggle,
  item,
  updated,
}) {
  const [staticVisible, setStaticVisible] = useState();
  const [status, setStatus] = useState("Not Started");

  useEffect(() => {
    if (item) setStatus(item.status);
    setStaticVisible(visible);
  }, [item, visible]);

  const handleChange = (e) => {
    const { value } = e.target;
    setStatus({ status: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("status", status);

    try {
      const response = await updateData(
        `admin/orders/${item.id}`,
        { status },
        false,
        "patch"
      );

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
          <h3>
            edit {window.location.pathname.replace("/admin/dashboard/", "")}
          </h3>
          <div className="closeSidebar">
            <HiXMark onClick={visibleToggle} />
          </div>
        </div>
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">
                    STATUS <span className="star">*</span>
                  </label>
                  <select
                    className="form-control"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Accepted">Accepted</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col d-flex gap-3">
                <button type="submit" className="btn btn-primary">
                  <FaCheckCircle />
                  <span className="ps-2">Update</span>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={visibleToggle}
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
