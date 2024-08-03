import "../../SubModels.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Table, Row, Col } from "antd";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { BiTrash } from "react-icons/bi";
import Swal from "sweetalert2";

import { getData, addData, deleteData } from "../../../../../axiosConfig/API";

export default function Addon({ meal_id, data }) {
  const componentRef = useRef();
  const [addons, setAddons] = useState();
  const [optionsAddons, setOptionsAddons] = useState();
  const [addon_id, setAddon_id] = useState();

  const fetchOptionsAddons = useCallback(async (id) => {
    try {
      const result = await getData(
        `admin/meals/${id}/options-addons`,
        handleResponse
      );
      setOptionsAddons(result);
    } catch (error) {
      console.warn(error.response.data.error);
    }
  }, []);

  useEffect(() => {
    fetchOptionsAddons(meal_id);
    if (data) setAddons(data);
  }, [meal_id, data]);

  const handleAddAddon = async (e) => {
    e.preventDefault();

    const handleResponse = (responseData) => {
      return responseData;
    };

    try {
      const response = await addData(
        "admin/meals/addons",
        { addon_id: addon_id, meal_id: meal_id },
        handleResponse
      );

      if (response) {
        setAddon_id("");
        reloadAddons();
        fetchOptionsAddons(meal_id);

        Swal.fire("Addon!", response.message, "success");
      }
    } catch (error) {
      console.warn(error.response.data.error);
      Swal.fire("Error!", error.response.data.error, "error");
    }
  };

  const handleDelete = async (addon) => {
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
        const handleResponse = (responseData) => responseData;

        try {
          const response = await deleteData(
            `admin/addons-meals/${addon.addon_id}/${meal_id}`,
            handleResponse
          );

          if (response) {
            reloadAddons();
            fetchOptionsAddons(meal_id);
            Swal.fire("Addon!", response.message, "success");
          }
        } catch (error) {
          console.warn(error.response.data.error);
          Swal.fire("Error!", error.response.data.error, "error");
        }
      }
    });
  };

  const reloadAddons = useCallback(async () => {
    try {
      const result = await getData(
        `admin/meals/${meal_id}/addons`,
        handleResponse
      );
      setAddons(result);
    } catch (error) {
      console.warn(error.response.data.error);
    }
  }, []);

  const columns = [
    {
      title: "NAME",
      dataIndex: "addon_name",
      key: "addon_name",
    },
    {
      title: "CATEGORY",
      dataIndex: "category_name",
      key: "category_name",
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
          onClick={() => handleDelete(item)}
          style={{ "--c": "#F15353", "--bg": "#FECACA" }}
        >
          <BiTrash />
        </Link>
      ),
    },
  ];

  return (
    <div className="SubModel">
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
                    <label htmlFor="size" className="form-label">
                      SELECT <span className="star">*</span>
                    </label>
                    <select
                      className="form-control"
                      name="size"
                      id="size"
                      required
                      value={addon_id}
                      onChange={(e) => setAddon_id(e.target.value)}
                    >
                      <option value="">--</option>
                      {optionsAddons &&
                        optionsAddons.map((addon) => (
                          <option key={addon.id} value={addon.id}>
                            {addon.name}
                          </option>
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
