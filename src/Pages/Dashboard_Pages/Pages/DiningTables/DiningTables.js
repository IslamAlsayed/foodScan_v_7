import "../DataTable.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";
import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { MdQrCode2 } from "react-icons/md";
import EditDiningTable from "../../Models/Edit/EditDiningTable";
import { getData } from "../../../../axiosConfig/API";
import Filtration from "../../Models/Filtration/DiningTables";
import AddRow from "../../Models/AddRow/DiningTables";

export default function DiningTables() {
  const componentRef = useRef();
  const [DiningTables, setDiningTables] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchDiningTables = useCallback(async () => {
    try {
      const result = await getData("admin/dining-tables");
      setDiningTables(result);
    } catch (error) {
      console.warn(error.response.data.error);
    }
  }, []);

  useEffect(() => {
    fetchDiningTables();
  }, [fetchDiningTables]);

  useEffect(() => {
    if (updated) fetchDiningTables();
    setUpdated(false);
  }, [updated, fetchDiningTables]);

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
      title: "NUMBER",
      dataIndex: "num",
      key: "num",
    },
    {
      title: "SIZE",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "FLOOR",
      dataIndex: "floor",
      key: "floor",
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
          src={`http://127.0.0.1:8000/storage/${record.qr_code}`}
          alt={record.name}
          style={{ width: "70px" }}
        />
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: (text, item) => (
        <div className="actionResource">
          <a
            href={`http://127.0.0.1:8000/storage/${item.qr_code}`}
            download
            className="qrCodeIcon"
            data-tooltip="download"
            style={{ "--c": "#ecbf1d", "--bg": "#fff6c8" }}
          >
            <MdQrCode2 />
          </a>
          <Link
            to={`/admin/dashboard/dining-table/show/${item.key}`}
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
        </div>
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
        <Table columns={columns} dataSource={DiningTables} pagination={true} />

        {modalVisible && (
          <EditDiningTable
            visible={modalVisible}
            item={editItem}
            modalClose={handleModalClose}
          />
        )}
      </div>
    </div>
  );
}
