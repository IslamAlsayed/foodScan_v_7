import "../DataTable.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";

import { Table } from "antd";
import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import EditExtra from "../../Models/Edit/EditExtras";
import { getData } from "../../../../axiosConfig/API";
import Filtration from "../../Models/Filtration/Customers";
import AddRow from "../../Models/AddRow/Customers";

export default function Extra() {
  const componentRef = useRef();
  const [extras, setExtras] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchExtras = useCallback(async () => {
    try {
      const result = await getData("admin/extra");
      setExtras(result);
    } catch (error) {
      console.warn(error.response.data.error);
    }
  }, []);

  useEffect(() => {
    fetchExtras();
    if (updated) fetchExtras();
    setUpdated(false);
  }, [updated, fetchExtras]);

  const handleModalClose = () => {
    setModalVisible(false);
    setEditItem(null);
    setUpdated(true);
    document.body.style.overflow = "visible";
  };

  const handleEdit = async (item) => {
    try {
      const categories = await getData("categories");
      setEditItem({ ...item, categories });
      setModalVisible(true);
      document.body.style.overflow = "hidden";
    } catch (error) {
      console.warn(error.response.data.error);
    }
  };

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "CATEGORY",
      dataIndex: "category_id",
      key: "category_id",
    },
    {
      title: "PRICE",
      dataIndex: "cost",
      key: "cost",
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
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <img
          src={`http://localhost:8000/storage/${record.image}`}
          alt={record.name}
          style={{ width: "70px" }}
        />
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: (text, item) => (
        <>
          <Link
            to={`/admin/dashboard/extra/show/${item.id}`}
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
        </>
      ),
    },
  ];

  return (
    <div className="DataTable">
      <Breadcrumb />

      {/* Filtration */}
      <Filtration />

      {/* Add Row */}
      <AddRow />

      <div className="tableItems" ref={componentRef}>
        <Table columns={columns} dataSource={extras} pagination={true} />

        {modalVisible && (
          <EditExtra
            visible={modalVisible}
            item={editItem}
            modalClose={handleModalClose}
          />
        )}
      </div>
    </div>
  );
}
