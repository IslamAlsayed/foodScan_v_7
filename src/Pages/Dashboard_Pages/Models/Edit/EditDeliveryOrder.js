import "../Models.css";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import Swal from "sweetalert2";
import { updateData } from "../../../../axiosConfig/API";

export default function EditDeliveryOrder({ visible, order, modalClose }) {
  const [staticModalVisible, setStaticModalVisible] = useState(false);
  const [status, setStatus] = useState();

  useEffect(() => {
    setStaticModalVisible(visible);
  }, [order]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateData(
        `admin/orders/${order.id}`,
        { status: status },
        "patch"
      );

      if (response.status === "success") {
        modalClose();
        Swal.fire("Updated!", response.message, "success");
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
    <div id="AddTable" className={staticModalVisible ? "visible" : ""}>
      <div className="modal-container">
        <div className="breadcrumb">
          <h3>{window.location.pathname.replace("/admin/dashboard/", "")}</h3>
          <div className="closeSidebar">
            <HiXMark onClick={modalClose} />
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
                    value={order.status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Accepted">Accepted</option>
                    {/* <option
                      value="Not Started"
                      selected={status === "Not Started"}
                    >
                      Not Started
                    </option>
                    <option
                      value="In Progress"
                      selected={status === "In Progress"}
                    >
                      In Progress
                    </option>
                    <option value="Cancelled" selected={status === "Cancelled"}>
                      Cancelled
                    </option>
                    <option value="Accepted" selected={status === "Accepted"}>
                      Accepted
                    </option> */}
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
                  onClick={modalClose}
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
