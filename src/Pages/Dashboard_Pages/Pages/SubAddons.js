import "./SubModels.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Table, Row, Col } from "antd";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { BiTrash } from "react-icons/bi";
import Swal from "sweetalert2";
import { getData, addData, deleteData } from "../../../axiosConfig/API";

export default function SubAddons({ order_id, data }) {
  const componentRef = useRef();
  const [addons, setAddons] = useState();
  const [addon_id, setAddon_id] = useState();
  const [optionsAddons, setOptionsAddons] = useState();

  const fetchOptionsAddons = useCallback(async (id) => {
    if (!id) return;
    try {
      const result = await getData(`admin/meals/${id}/options-addons`);
      setOptionsAddons(result);
    } catch (error) {
      console.error(error.response.data.message);
    }
  }, []);

  useEffect(() => {
    if (data) setAddons(data);
    if (order_id) fetchOptionsAddons(order_id);
  }, [data, setAddons, fetchOptionsAddons]);

  const handleAddAddon = async (e) => {
    e.preventDefault();

    try {
      const response = await addData("admin/meals/addons", {
        addon_id: addon_id,
        meal_id: order_id,
      });

      if (response.status === "success") {
        refreshAddons();
        setAddon_id("");
        fetchOptionsAddons(order_id);
        Swal.fire("Addon!", response.message, "success");
      }
    } catch (error) {
      Swal.fire("Error!", error.response.data.message, "error");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Delete addon",
      text: "Are you sure you want to delete this addon?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes, delete addon",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteData(
            `admin/addons-meals/${id}/${order_id}`
          );

          if (response.status === "success") {
            refreshAddons();
            Swal.fire("Addon!", response.message, "success");
          }
        } catch (error) {
          Swal.fire("Error!", error.response.data.message, "error");
        }
      }
    });
  };

  const refreshAddons = useCallback(async () => {
    try {
      const result = await getData(`admin/meals/${order_id}/addons`);
      setAddons(result);
    } catch (error) {
      console.error(error.response.data.message);
    }
  }, []);

  const columns = [
    {
      title: "NAME",
      dataIndex: "addon_name",
      key: "addon_name",
    },
    {
      title: "STATUS",
      key: "status",
      render: (text, item) => (
        <span className={item.status === 1 ? "active" : "inactive"}>
          {item.status === 1 ? "active" : "inactive"}
        </span>
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: (text, item) => (
        <Link
          to="#"
          className="trashIcon"
          data-tooltip="delete"
          onClick={() => handleDelete(item.addon_id)}
          style={{ "--c": "#F15353", "--bg": "#FECACA" }}
        >
          <BiTrash />
        </Link>
      ),
    },
  ];

  return (
    <div className="SubModel">
      {Object(optionsAddons).length > 0 ? (
        <Row gutter={16}>
          <Col span={12}>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#addAddon"
            >
              add addon
            </button>
          </Col>
        </Row>
      ) : (
        false
      )}

      <div
        className="modal fade"
        id="addAddon"
        tabIndex="-1"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="addAddonLabel"
      >
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleAddAddon}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addAddonLabel">
                add addon
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col col-12">
                  <div className="mb-3">
                    <label htmlFor="showAddon" className="form-label">
                      Addon <span className="star">*</span>
                    </label>
                    <select
                      className="form-control"
                      name="showAddon"
                      id="showAddon"
                      required
                      value={addon_id}
                      onChange={(e) => setAddon_id(e.target.value)}
                    >
                      <option value="" selected disabled>
                        --
                      </option>
                      {optionsAddons &&
                        optionsAddons.map((addon) => (
                          <option value={addon.id}>{addon.name}</option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                <FaCheckCircle />
                <span>save</span>
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                <HiXMark />
                <span>cancel</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="DataTable mt-3">
        <div className="tableItems" ref={componentRef}>
          <Table columns={columns} dataSource={addons} pagination={true} />
        </div>
      </div>
    </div>
  );
}
