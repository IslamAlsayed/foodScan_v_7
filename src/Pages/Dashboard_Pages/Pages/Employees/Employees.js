import "../DataTable.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";

import { Table } from "antd";
import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import EditEmployee from "../../Models/Edit/EditEmployee";
import { getData } from "../../../../axiosConfig/API";
import Filtration from "../../Models/Filtration/Employees";
import AddRow from "../../Models/AddRow/Employees";

export default function Employees() {
  const componentRef = useRef();
  const [employees, setEmployee] = useState([]);

  const [updated, setUpdated] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchEmployees = useCallback(async () => {
    try {
      const result = await getData("admin/employees");
      setEmployee(result);
    } catch (error) {
      console.warn(error.response.data.error);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
    if (updated) fetchEmployees();
    setUpdated(false);
  }, [updated, fetchEmployees]);

  const handleModalClose = () => {
    setModalVisible(false);
    setEditItem(null);
    setUpdated(true);
    document.body.style.overflow = "visible";
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setModalVisible(true);
    document.body.style.overflow = "hidden";
  };

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "PHONE",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "ROLE",
      dataIndex: "role",
      key: "role",
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
        <>
          <Link
            to={`/admin/dashboard/administrator/show/${item.id}`}
            className="eyeIcon"
            data-tooltip="view"
            style={{ "--c": "#1772FF", "--bg": "#E2EDFB" }}
          >
            <BsEye />
          </Link>
          <Link
            to="#"
            className="editIcon"
            data-tooltip="edit"
            onClick={() => handleEdit(item)}
            style={{ "--c": "#35B263", "--bg": "#DCFCE7" }}
          >
            <FiEdit />
          </Link>
          <Link
            to="#"
            className="trashIcon"
            data-tooltip="delete"
            style={{ "--c": "#F15353", "--bg": "#FECACA" }}
          >
            <BiTrash />
          </Link>
        </>
      ),
    },
  ];

  return (
    <div className="DataTable">
      {/* breadcrumb feature */}
      <Breadcrumb />

      {/* Filtration */}
      <Filtration />

      {/* Add Row */}
      <AddRow />

      <div className="tableItems" ref={componentRef}>
        <Table columns={columns} dataSource={employees} pagination={true} />

        {modalVisible && (
          <EditEmployee
            visible={modalVisible}
            item={editItem}
            modalClose={handleModalClose}
          />
        )}
      </div>
    </div>
  );
}
