import "./SubModels.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Table, Row, Col } from "antd";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { BiTrash } from "react-icons/bi";
import Swal from "sweetalert2";
import { getData, addData, deleteData } from "../../../axiosConfig/API";

export default function SubExtras({ order_id, data }) {
  const componentRef = useRef();
  const [extras, setExtras] = useState();
  const [extra_id, setExtra_id] = useState();
  const [optionsExtras, setOptionsExtras] = useState();

  const fetchOptionsExtras = useCallback(async (id) => {
    if (!id) return;
    try {
      const result = await getData(`admin/meals/${id}/options-extras`);
      setOptionsExtras(result);
    } catch (error) {
      console.error(error.response.data.message);
    }
  }, []);

  useEffect(() => {
    if (data) setExtras(data);
    if (order_id) fetchOptionsExtras(order_id);
  }, [data, setExtras, fetchOptionsExtras]);

  const handleAddExtra = async (e) => {
    e.preventDefault();

    try {
      const response = await addData("admin/meals/extras", {
        extra_id: extra_id,
        meal_id: order_id,
      });

      if (response.status === "success") {
        refreshExtras();
        setExtra_id("");
        fetchOptionsExtras(order_id);
        Swal.fire("Extra!", response.message, "success");
      }
    } catch (error) {
      Swal.fire("Error!", error.response.data.message, "error");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Delete extra",
      text: "Are you sure you want to delete this extra?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes, delete extra",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteData(
            `admin/extras-meals/${id}/${order_id}`
          );

          if (response.status === "success") {
            refreshExtras();
            Swal.fire("Extra!", response.message, "success");
          }
        } catch (error) {
          Swal.fire("Error!", error.response.data.message, "error");
        }
      }
    });
  };

  const refreshExtras = useCallback(async () => {
    try {
      const result = await getData(`admin/meals/${order_id}/extras`);
      setExtras(result);
    } catch (error) {
      console.error(error.response.data.message);
    }
  }, []);

  const columns = [
    {
      title: "NAME",
      dataIndex: "extra_name",
      key: "extra_name",
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
          onClick={() => handleDelete(item.extra_id)}
          style={{ "--c": "#F15353", "--bg": "#FECACA" }}
        >
          <BiTrash />
        </Link>
      ),
    },
  ];

  return (
    <div className="SubModel">
      {Object(optionsExtras).length > 0 ? (
        <Row gutter={16}>
          <Col span={12}>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#addExtra"
            >
              add extra
            </button>
          </Col>
        </Row>
      ) : (
        false
      )}

      <div
        className="modal fade"
        id="addExtra"
        tabIndex="-1"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="addExtraLabel"
      >
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleAddExtra}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addExtraLabel">
                add extra
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
                    <label htmlFor="showExtra" className="form-label">
                      Extra <span className="star">*</span>
                    </label>
                    <select
                      className="form-control"
                      name="showExtra"
                      id="showExtra"
                      required
                      value={extra_id}
                      onChange={(e) => setExtra_id(e.target.value)}
                    >
                      <option value="" selected disabled>
                        --
                      </option>
                      {optionsExtras &&
                        optionsExtras.map((extra) => (
                          <option value={extra.id}>{extra.name}</option>
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
          <Table columns={columns} dataSource={extras} pagination={true} />
        </div>
      </div>
    </div>
  );
}
