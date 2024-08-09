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
import UpdateMultiStatus from "../Actions/UpdateMultiStatus";

import ImageTest from "../../../../assets/global/profile.png";
import axios from "axios";

export default function DiningTables() {
  const componentRef = useRef();
  const [diningTables, setDiningTables] = useState([]);
  const [imageBlobs, setImageBlobs] = useState({});
  const [editItem, setEditItem] = useState(null);
  const [modalVisibleToggle, setModalVisibleToggle] = useState(false);
  const [modalEditVisibleToggle, setModalEditVisibleToggle] = useState(false);

  const fetchDiningTables = useCallback(async () => {
    try {
      const result = await getData("admin/dining-tables");
      setDiningTables(result);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchDiningTables();
  }, [fetchDiningTables]);

  const handleModalToggle = () => {
    setModalVisibleToggle(!modalVisibleToggle);
    document.body.style.overflow = modalVisibleToggle ? "visible" : "hidden";
  };

  const handleModalEditToggle = () => {
    setModalEditVisibleToggle(!modalEditVisibleToggle);
    document.body.style.overflow = modalEditVisibleToggle
      ? "visible"
      : "hidden";
  };

  const handleEdit = async (item) => {
    setEditItem(item);
    setModalEditVisibleToggle(!modalEditVisibleToggle);
    document.body.style.overflow = modalEditVisibleToggle
      ? "visible"
      : "hidden";
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
        <UpdateMultiStatus
          url={`admin/dining-tables/${item.id}`}
          item={item}
          updated={fetchDiningTables}
          list={[
            { value: 1, label: "active" },
            { value: 0, label: "inactive" },
          ]}
        />
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => {
        record.qr_code ? (
          <img src={record.qr_code} alt={`QR Code for ${record.id}`} />
        ) : (
          <span>No QR Code</span>
        );
      },
    },
    {
      title: "ACTION",
      key: "action",
      render: (text, item) => (
        <div className="actionResource">
          {item.qr_code && (
            <a
              href={item.qr_code}
              download
              className="qrCodeIcon"
              data-tooltip="download"
              style={{ "--c": "#ecbf1d", "--bg": "#fff6c8" }}
            >
              <MdQrCode2 />
            </a>
          )}
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
      <Filtration handleModalToggle={handleModalToggle} />

      {/* Add Row */}
      <AddRow
        visible={modalVisibleToggle}
        visibleToggle={handleModalToggle}
        updated={fetchDiningTables}
      />

      {/* Edit Row */}
      <EditDiningTable
        visible={modalEditVisibleToggle}
        visibleToggle={handleModalEditToggle}
        item={editItem}
        updated={fetchDiningTables}
      />

      <div className="tableItems" ref={componentRef}>
        <Table
          columns={columns}
          dataSource={diningTables}
          pagination={Object(diningTables).length > 10}
        />
      </div>
    </div>
  );
}
