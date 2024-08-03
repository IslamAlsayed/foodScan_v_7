import "../DataTable.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";

import { Table } from "antd";
import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import EditAdministrator from "../../Models/Edit/EditAdministrator";

import { getData } from "../../../../axiosConfig/API";

import Filtration from "../../Models/Filtration/Administrators";
import AddRow from "../../Models/AddRow/Administrators";

export default function Administrators() {
  const componentRef = useRef();
  const [administrators, setAdministrators] = useState([]);

  const [updated, setUpdated] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchAdministrators = useCallback(async () => {
    try {
      const result = await getData("admin/administrators");
      setAdministrators(result);
    } catch (error) {
      console.warn(error.response.data.error);
    }
  }, []);

  useEffect(() => {
    fetchAdministrators();
    if (updated) fetchAdministrators();
    setUpdated(false);
  }, [updated, fetchAdministrators]);

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
        <Table
          columns={columns}
          dataSource={administrators}
          pagination={true}
        />

        {modalVisible && (
          <EditAdministrator
            visible={modalVisible}
            item={editItem}
            modalClose={handleModalClose}
          />
        )}
      </div>
    </div>
  );
}
